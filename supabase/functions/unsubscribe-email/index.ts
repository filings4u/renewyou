import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type, authorization, apikey, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type':'application/json' } });
const TABLE = 'Renew You Health Leads';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error:'Method not allowed.' }, 405);
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const db = createClient(supabaseUrl, serviceKey, { auth:{ persistSession:false } });
    const requestUrl = new URL(req.url);
    let bodyToken = '';
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await req.json().catch(() => ({}));
      bodyToken = String(body?.token || '');
    }
    const cleanToken = String(requestUrl.searchParams.get('token') || bodyToken || '').trim();
    if (!cleanToken) return json({ error:'This unsubscribe link is invalid or incomplete.' }, 400);

    const { data: subscriber, error: findError } = await db.from(TABLE).select('id,email,is_subscribed,unsubscribed_at').eq('unsubscribe_token', cleanToken).maybeSingle();
    if (findError) throw findError;
    if (!subscriber) return json({ error:'This unsubscribe link is no longer valid.' }, 404);

    const now = subscriber.unsubscribed_at || new Date().toISOString();
    const { error: updateError } = await db.from(TABLE).update({ is_subscribed:false, unsubscribed_at:now, updated_at:new Date().toISOString() }).eq('id', subscriber.id);
    if (updateError) throw updateError;

    const email = String(subscriber.email || '').trim().toLowerCase();
    if (email) {
      const { error: suppressionError } = await db.from('email_suppressions').upsert({ email, reason:'email_unsubscribe', unsubscribed_at:now }, { onConflict:'email' });
      if (suppressionError) throw suppressionError;
    }
    return json({ success:true, already_unsubscribed:subscriber.is_subscribed === false });
  } catch (error) {
    console.error('unsubscribe-email:', error);
    return json({ error:error?.message || 'Unable to update your email preferences.' }, 500);
  }
});
