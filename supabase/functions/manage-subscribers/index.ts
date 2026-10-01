import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, 'Content-Type': 'application/json' }
});

const normalizeEmail = (value: unknown) => String(value || '').trim().toLowerCase();
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const MANAGER_ROLES = new Set(['admin', 'manager', 'marketing']);
const SUBSCRIBERS_TABLE = 'Renew You Health Leads';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    if (!supabaseUrl || !serviceRoleKey) return json({ error: 'Server configuration is incomplete.' }, 500);

    const authorization = req.headers.get('Authorization') || '';
    const token = authorization.replace(/^Bearer\s+/i, '').trim();
    if (!token) return json({ error: 'Authentication required.' }, 401);

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { data: userData, error: userError } = await admin.auth.getUser(token);
    if (userError || !userData?.user) return json({ error: 'Invalid or expired session.' }, 401);

    const { data: profile, error: profileError } = await admin
      .from('admin_profiles')
      .select('id, role, active')
      .eq('id', userData.user.id)
      .maybeSingle();

    const role = String(profile?.role || '').toLowerCase();
    if (profileError || !profile || profile.active === false || !MANAGER_ROLES.has(role)) {
      return json({ error: 'You do not have permission to manage subscribers.' }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const action = String(body?.action || '').toLowerCase();

    if (action === 'update') {
      const id = body?.id;
      const email = normalizeEmail(body?.email);
      const isSubscribed = body?.is_subscribed !== false;
      if (!id || !validEmail(email)) return json({ error: 'A valid subscriber and email address are required.' }, 400);

      const patch: Record<string, unknown> = {
        email,
        is_subscribed: isSubscribed,
        updated_at: new Date().toISOString(),
        unsubscribed_at: isSubscribed ? null : new Date().toISOString()
      };

      const { data, error } = await admin.from(SUBSCRIBERS_TABLE).update(patch).eq('id', id).select('*').single();
      if (error) throw error;

      if (!isSubscribed) {
        await admin.from('email_suppressions').upsert({ email, reason: 'admin_unsubscribed', unsubscribed_at: new Date().toISOString() }, { onConflict: 'email' });
      } else {
        await admin.from('email_suppressions').delete().eq('email', email);
      }
      return json({ subscriber: data });
    }

    if (action === 'delete') {
      const id = body?.id;
      if (!id) return json({ error: 'Subscriber id is required.' }, 400);
      const { data: existing, error: existingError } = await admin.from(SUBSCRIBERS_TABLE).select('id,email,is_subscribed,unsubscribed_at').eq('id', id).maybeSingle();
      if (existingError) throw existingError;
      if (!existing) return json({ deleted: 0 });
      if (existing.is_subscribed === false) {
        await admin.from('email_suppressions').upsert({
          email: normalizeEmail(existing.email),
          reason: 'deleted_unsubscribed',
          unsubscribed_at: existing.unsubscribed_at || new Date().toISOString()
        }, { onConflict: 'email' });
      }
      const { error } = await admin.from(SUBSCRIBERS_TABLE).delete().eq('id', id);
      if (error) throw error;
      return json({ deleted: 1 });
    }

    if (action === 'delete_unsubscribed') {
      const { data: rows, error: loadError } = await admin.from(SUBSCRIBERS_TABLE).select('id,email,unsubscribed_at').eq('is_subscribed', false);
      if (loadError) throw loadError;
      const contacts = Array.isArray(rows) ? rows : [];
      if (!contacts.length) return json({ deleted: 0 });

      const suppressions = contacts
        .map(row => ({ email: normalizeEmail(row.email), reason: 'deleted_unsubscribed', unsubscribed_at: row.unsubscribed_at || new Date().toISOString() }))
        .filter(row => validEmail(row.email));
      if (suppressions.length) {
        const { error: suppressionError } = await admin.from('email_suppressions').upsert(suppressions, { onConflict: 'email' });
        if (suppressionError) throw suppressionError;
      }
      const { error } = await admin.from(SUBSCRIBERS_TABLE).delete().eq('is_subscribed', false);
      if (error) throw error;
      return json({ deleted: contacts.length });
    }

    if (action === 'import') {
      const input = Array.isArray(body?.subscribers) ? body.subscribers.slice(0, 250) : [];
      if (!input.length) return json({ error: 'No subscribers were supplied.' }, 400);

      const candidates = input.map((row: any) => ({
        email: normalizeEmail(row?.email),
        is_subscribed: row?.is_subscribed !== false,
        source: String(row?.source || 'csv_import').trim().slice(0, 120) || 'csv_import'
      })).filter((row: any) => validEmail(row.email));
      const unique = [...new Map(candidates.map((row: any) => [row.email, row])).values()] as Array<{email:string,is_subscribed:boolean,source:string}>;
      if (!unique.length) return json({ error: 'No valid subscriber email addresses were supplied.' }, 400);

      const emails = unique.map(row => row.email);
      const [{ data: existingRows, error: existingError }, { data: suppressionRows, error: suppressionError }] = await Promise.all([
        admin.from(SUBSCRIBERS_TABLE).select('id,email,is_subscribed').in('email', emails),
        admin.from('email_suppressions').select('email').in('email', emails)
      ]);
      if (existingError) throw existingError;
      if (suppressionError) throw suppressionError;

      const existingByEmail = new Map((existingRows || []).map((row: any) => [normalizeEmail(row.email), row]));
      const suppressed = new Set((suppressionRows || []).map((row: any) => normalizeEmail(row.email)));
      let inserted = 0, updated = 0, skipped = 0;

      for (const row of unique) {
        const existing = existingByEmail.get(row.email) as any;
        if (existing) {
          // CSV import is never allowed to reactivate an existing opt-out.
          if (existing.is_subscribed === false) { skipped++; continue; }
          if (row.is_subscribed === false) {
            const now = new Date().toISOString();
            const { error } = await admin.from(SUBSCRIBERS_TABLE).update({ is_subscribed:false, unsubscribed_at:now, updated_at:now }).eq('id', existing.id);
            if (error) throw error;
            await admin.from('email_suppressions').upsert({ email:row.email, reason:'csv_import_unsubscribed', unsubscribed_at:now }, { onConflict:'email' });
            updated++;
          } else {
            skipped++;
          }
          continue;
        }

        if (suppressed.has(row.email)) { skipped++; continue; }
        const now = new Date().toISOString();
        const { error } = await admin.from(SUBSCRIBERS_TABLE).insert({
          email: row.email,
          is_subscribed: row.is_subscribed,
          source: row.source,
          unsubscribe_token: crypto.randomUUID(),
          unsubscribed_at: row.is_subscribed ? null : now,
          updated_at: now
        });
        if (error) throw error;
        if (!row.is_subscribed) {
          await admin.from('email_suppressions').upsert({ email:row.email, reason:'csv_import_unsubscribed', unsubscribed_at:now }, { onConflict:'email' });
        }
        inserted++;
      }
      return json({ inserted, updated, skipped });
    }

    return json({ error: 'Unsupported action.' }, 400);
  } catch (error) {
    console.error('manage-subscribers:', error);
    return json({ error: error?.message || 'Unable to manage subscribers.' }, 500);
  }
});
