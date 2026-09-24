(function () {
  'use strict';

  const ROLES = [
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Manager' },
    { value: 'clinician', label: 'Clinician' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'staff', label: 'Staff' }
  ];

  const roleLabels = Object.fromEntries(ROLES.map(r => [r.value, r.label]));
  const state = { employees: [], ready: false };

  function esc(v) {
    return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  function formatDate(v) {
    if (!v) return '—';
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleString([], { month:'short', day:'numeric', year:'numeric', hour:'numeric', minute:'2-digit' });
  }

  function currentRole() {
    return String(window.RENEW_ADMIN_PROFILE?.role || '').toLowerCase();
  }

  function roleOptions(selected) {
    return ROLES.map(r => `<option value="${r.value}" ${r.value === selected ? 'selected' : ''}>${r.label}</option>`).join('');
  }

  function injectStyles() {
    if (document.getElementById('employeeManagementStyles')) return;
    const style = document.createElement('style');
    style.id = 'employeeManagementStyles';
    style.textContent = `
      .employee-shell{display:grid;gap:20px}.employee-card{background:#fff;border:1px solid #ece5ef;border-radius:18px;padding:22px;box-shadow:0 10px 30px rgba(62,13,95,.04)}
      .employee-card h3{margin:0 0 5px}.employee-card p{margin:0;color:#777;line-height:1.5}.employee-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:18px}
      .employee-field{display:grid;gap:7px}.employee-field.full{grid-column:1/-1}.employee-field label{font-size:.76rem;font-weight:800;color:#4d3656;text-transform:uppercase;letter-spacing:.04em}.employee-field input,.employee-field select{width:100%;box-sizing:border-box;border:1px solid #ddd0e3;border-radius:10px;padding:11px 12px;background:#fff;color:#2a1731;font:inherit}
      .employee-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:18px}.employee-btn{border:0;border-radius:10px;padding:10px 15px;font-weight:800;cursor:pointer}.employee-btn.primary{background:#3e0d5f;color:#fff}.employee-btn.secondary{background:#f3edf5;color:#3e0d5f}.employee-btn.danger{background:#fff0f1;color:#a21d2f}.employee-btn:disabled{opacity:.55;cursor:not-allowed}
      .employee-table-wrap{overflow:auto;margin-top:16px}.employee-table{width:100%;border-collapse:collapse;min-width:920px}.employee-table th,.employee-table td{text-align:left;padding:13px 11px;border-bottom:1px solid #eee7f0;font-size:.82rem;vertical-align:middle}.employee-table th{font-size:.69rem;text-transform:uppercase;letter-spacing:.06em;color:#76677d;background:#faf8fb}.employee-person strong{display:block;color:#26152d}.employee-person span{display:block;color:#85768b;font-size:.74rem;margin-top:2px}.employee-role-select{border:1px solid #d9cde0;border-radius:8px;padding:8px;background:#fff}.employee-status{display:inline-flex;align-items:center;gap:6px;padding:6px 9px;border-radius:999px;font-size:.69rem;font-weight:800}.employee-status.active{background:#eaf8ef;color:#237443}.employee-status.pending{background:#fff6df;color:#8b6400}.employee-status.inactive{background:#f5ecee;color:#8f3541}.employee-msg{display:none;margin-top:13px;padding:10px 12px;border-radius:9px;font-size:.8rem}.employee-msg.show{display:block}.employee-msg.ok{background:#edf9f0;color:#286c3a}.employee-msg.err{background:#fff0f1;color:#9b2735}.employee-topline{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap}.employee-search{border:1px solid #ddd0e3;border-radius:10px;padding:9px 11px;min-width:250px}.employee-summary{display:flex;gap:10px;flex-wrap:wrap;margin-top:15px}.employee-summary span{background:#f7f3f8;border:1px solid #eadfed;border-radius:999px;padding:7px 11px;font-size:.72rem;font-weight:700;color:#5e4967}
      @media(max-width:760px){.employee-form-grid{grid-template-columns:1fr}.employee-field.full{grid-column:auto}.employee-search{min-width:0;width:100%}}
    `;
    document.head.appendChild(style);
  }

  function applyRoleVisibility() {
    const role = currentRole();
    const rules = {
      admin: null,
      manager: ['dashboardPage','contactInboxPage','appointmentsPage','mailingListPage','campaignsPage','wellnessOffersPage','blogPage','randomPoolPage','schedulePage','settingsPage'],
      clinician: ['dashboardPage','contactInboxPage','appointmentsPage','wellnessOffersPage','randomPoolPage','schedulePage'],
      marketing: ['dashboardPage','mailingListPage','campaignsPage','blogPage'],
      staff: ['dashboardPage','contactInboxPage','appointmentsPage','mailingListPage','schedulePage']
    };
    const allowed = rules[role];
    if (!allowed) return;
    document.querySelectorAll('.admin-page-tab[data-page]').forEach(btn => {
      const page = btn.getAttribute('data-page');
      if (!allowed.includes(page)) btn.style.display = 'none';
    });
  }

  function buildPage() {
    if (state.ready) return true;
    const nav = document.querySelector('.admin-page-nav');
    const hostPage = document.querySelector('.admin-page');
    if (!nav || !hostPage) return false;

    applyRoleVisibility();
    if (currentRole() !== 'admin') { state.ready = true; return true; }

    const btn = document.createElement('button');
    btn.className = 'admin-page-tab';
    btn.setAttribute('data-page', 'employeesPage');
    btn.innerHTML = '🧑‍💼 Employees';
    const settingsBtn = nav.querySelector('[data-page="settingsPage"]');
    nav.insertBefore(btn, settingsBtn || null);

    const page = document.createElement('section');
    page.id = 'employeesPage';
    page.className = 'admin-page';
    page.innerHTML = `
      <div class="employee-shell">
        <div class="workspace-section-title"><div><h2 style="margin:0 0 5px">Employees & Access</h2><p>Invite employees, assign roles, resend invitations, and control access to the ReNew You management workspace.</p></div></div>
        <div class="employee-card">
          <div class="employee-topline"><div><h3>Invite Employee</h3><p>The employee receives a secure branded invitation email to activate their workspace account.</p></div></div>
          <form id="employeeInviteForm">
            <div class="employee-form-grid">
              <div class="employee-field"><label for="employeeFirstName">First Name</label><input id="employeeFirstName" autocomplete="given-name"></div>
              <div class="employee-field"><label for="employeeLastName">Last Name</label><input id="employeeLastName" autocomplete="family-name"></div>
              <div class="employee-field full"><label for="employeeEmail">Email Address *</label><input id="employeeEmail" type="email" required autocomplete="email" placeholder="employee@example.com"></div>
              <div class="employee-field"><label for="employeePhone">Phone</label><input id="employeePhone" type="tel" autocomplete="tel"></div>
              <div class="employee-field"><label for="employeeRole">Role *</label><select id="employeeRole">${roleOptions('staff')}</select></div>
            </div>
            <div class="employee-actions"><button id="sendEmployeeInviteBtn" class="employee-btn primary" type="submit">Send Invite Email</button><span style="font-size:.73rem;color:#84758a">Roles can be changed later by an administrator.</span></div>
            <div id="employeeInviteMsg" class="employee-msg"></div>
          </form>
        </div>
        <div class="employee-card">
          <div class="employee-topline"><div><h3>Employee Directory</h3><p>Active and invited workspace users.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><input id="employeeSearch" class="employee-search" placeholder="Search name or email"><button id="refreshEmployeesBtn" type="button" class="employee-btn secondary">↻ Refresh</button></div></div>
          <div id="employeeSummary" class="employee-summary"></div>
          <div class="employee-table-wrap"><table class="employee-table"><thead><tr><th>Employee</th><th>Role</th><th>Status</th><th>Last Sign In</th><th>Invited</th><th>Actions</th></tr></thead><tbody id="employeeRows"><tr><td colspan="6">Loading employees…</td></tr></tbody></table></div>
          <div id="employeeDirectoryMsg" class="employee-msg"></div>
        </div>
      </div>`;
    const settingsPage = document.getElementById('settingsPage');
    (settingsPage?.parentNode || hostPage.parentNode).insertBefore(page, settingsPage || null);

    // Re-bind navigation because the original navigation binder ran before this new page existed.
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-page-tab').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.admin-page').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      page.classList.add('active');
      loadEmployees();
    });

    document.getElementById('employeeInviteForm')?.addEventListener('submit', inviteEmployee);
    document.getElementById('refreshEmployeesBtn')?.addEventListener('click', loadEmployees);
    document.getElementById('employeeSearch')?.addEventListener('input', renderEmployees);
    state.ready = true;
    return true;
  }

  function showMsg(id, text, ok) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.className = `employee-msg show ${ok ? 'ok' : 'err'}`;
  }

  async function callManageEmployees(body) {
    if (!window.supabaseClientInstance) throw new Error('Supabase client is not ready.');
    const { data, error } = await window.supabaseClientInstance.functions.invoke('manage-employees', { body });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  }

  async function loadEmployees() {
    const rows = document.getElementById('employeeRows');
    if (!rows || currentRole() !== 'admin') return;
    rows.innerHTML = '<tr><td colspan="6">Loading employees…</td></tr>';
    try {
      const data = await callManageEmployees({ action: 'list' });
      state.employees = data?.employees || [];
      renderEmployees();
    } catch (err) {
      rows.innerHTML = `<tr><td colspan="6">${esc(err?.message || 'Unable to load employees.')}</td></tr>`;
    }
  }

  function renderEmployees() {
    const rows = document.getElementById('employeeRows');
    if (!rows) return;
    const q = String(document.getElementById('employeeSearch')?.value || '').trim().toLowerCase();
    const filtered = state.employees.filter(e => `${e.first_name || ''} ${e.last_name || ''} ${e.email_address || ''} ${e.role || ''}`.toLowerCase().includes(q));
    const activeCount = state.employees.filter(e => e.active).length;
    const pendingCount = state.employees.filter(e => e.invitation_pending).length;
    const summary = document.getElementById('employeeSummary');
    if (summary) summary.innerHTML = `<span>${state.employees.length} total</span><span>${activeCount} active</span><span>${pendingCount} invite pending</span>`;
    if (!filtered.length) {
      rows.innerHTML = '<tr><td colspan="6">No employees found.</td></tr>';
      return;
    }
    rows.innerHTML = filtered.map(e => {
      const name = `${e.first_name || ''} ${e.last_name || ''}`.trim() || 'Team Member';
      const pending = e.invitation_pending;
      const statusClass = !e.active ? 'inactive' : pending ? 'pending' : 'active';
      const statusText = !e.active ? 'Inactive' : pending ? 'Invite Pending' : 'Active';
      const isSelf = e.id === window.RENEW_ADMIN_PROFILE?.id;
      return `<tr data-id="${esc(e.id)}">
        <td><div class="employee-person"><strong>${esc(name)}</strong><span>${esc(e.email_address)}</span>${e.phone_number ? `<span>${esc(e.phone_number)}</span>` : ''}</div></td>
        <td><select class="employee-role-select" data-role-id="${esc(e.id)}" ${isSelf ? 'disabled title="You cannot change your own administrator role here"' : ''}>${roleOptions(String(e.role || 'staff').toLowerCase())}</select></td>
        <td><span class="employee-status ${statusClass}">${statusText}</span></td>
        <td>${formatDate(e.last_sign_in_at)}</td>
        <td>${formatDate(e.last_invited_at || e.invited_at)}</td>
        <td><div style="display:flex;gap:7px;flex-wrap:wrap"><button class="employee-btn secondary" data-action="resend" data-id="${esc(e.id)}">Resend Invite</button>${isSelf ? '' : `<button class="employee-btn ${e.active ? 'danger' : 'secondary'}" data-action="toggle" data-id="${esc(e.id)}" data-active="${e.active ? 'false' : 'true'}" data-role="${esc(e.role || 'staff')}">${e.active ? 'Deactivate' : 'Activate'}</button>`}</div></td>
      </tr>`;
    }).join('');

    rows.querySelectorAll('[data-role-id]').forEach(select => select.addEventListener('change', updateRole));
    rows.querySelectorAll('[data-action="resend"]').forEach(btn => btn.addEventListener('click', resendInvite));
    rows.querySelectorAll('[data-action="toggle"]').forEach(btn => btn.addEventListener('click', toggleEmployee));
  }

  async function inviteEmployee(ev) {
    ev.preventDefault();
    const btn = document.getElementById('sendEmployeeInviteBtn');
    if (btn) btn.disabled = true;
    try {
      const payload = {
        action: 'invite',
        first_name: document.getElementById('employeeFirstName')?.value,
        last_name: document.getElementById('employeeLastName')?.value,
        email_address: document.getElementById('employeeEmail')?.value,
        phone_number: document.getElementById('employeePhone')?.value,
        role: document.getElementById('employeeRole')?.value
      };
      const data = await callManageEmployees(payload);
      showMsg('employeeInviteMsg', data?.message || 'Employee invitation sent.', true);
      ev.target.reset();
      const role = document.getElementById('employeeRole'); if (role) role.value = 'staff';
      await loadEmployees();
    } catch (err) {
      showMsg('employeeInviteMsg', err?.message || 'Unable to send invitation.', false);
    } finally { if (btn) btn.disabled = false; }
  }

  async function updateRole(ev) {
    const select = ev.currentTarget;
    const previous = state.employees.find(e => e.id === select.dataset.roleId)?.role || 'staff';
    select.disabled = true;
    try {
      await callManageEmployees({ action:'update_role', id:select.dataset.roleId, role:select.value });
      showMsg('employeeDirectoryMsg', 'Employee role updated.', true);
      await loadEmployees();
    } catch (err) {
      select.value = previous;
      showMsg('employeeDirectoryMsg', err?.message || 'Unable to update role.', false);
      select.disabled = false;
    }
  }

  async function resendInvite(ev) {
    const btn = ev.currentTarget; btn.disabled = true;
    try {
      const data = await callManageEmployees({ action:'resend_invite', id:btn.dataset.id });
      showMsg('employeeDirectoryMsg', data?.message || 'Invitation resent.', true);
      await loadEmployees();
    } catch (err) {
      showMsg('employeeDirectoryMsg', err?.message || 'Unable to resend invitation.', false);
      btn.disabled = false;
    }
  }

  async function toggleEmployee(ev) {
    const btn = ev.currentTarget;
    const activate = btn.dataset.active === 'true';
    const verb = activate ? 'activate' : 'deactivate';
    if (!window.confirm(`Are you sure you want to ${verb} this employee's workspace access?`)) return;
    btn.disabled = true;
    try {
      const data = await callManageEmployees({ action:'set_active', id:btn.dataset.id, active:activate, role:btn.dataset.role });
      showMsg('employeeDirectoryMsg', data?.message || `Employee ${verb}d.`, true);
      await loadEmployees();
    } catch (err) {
      showMsg('employeeDirectoryMsg', err?.message || `Unable to ${verb} employee.`, false);
      btn.disabled = false;
    }
  }

  injectStyles();
  const timer = setInterval(() => {
    if (buildPage()) clearInterval(timer);
  }, 250);
  setTimeout(() => clearInterval(timer), 20000);
})();
