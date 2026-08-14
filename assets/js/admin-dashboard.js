/**
 * ReNew You Health & Wellness - Protected Admin Registry Dashboard
 * Location: assets/js/admin-dashboard.js
 */
document.addEventListener('DOMContentLoaded', () => {
    // SUPABASE ACCESS PARAMETERS - UPDATE TO MATCH YOUR PROJECT ASSIGNMENTS
    const SUPABASE_PROJECT_URL = "https://lrbimrlbskjweynxlgas.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyYmltcmxic2tqd2V5bnhsZ2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjQ0NTYsImV4cCI6MjA5NDEwMDQ1Nn0.I8fQ6ZjA9oaTqJCF-7Z7vUboXC8zv2cogBv4PC_1ihU"; 

    const target = document.getElementById('admin-dashboard-target');
    if (!target) return;

    // Local state variables 
    let appointmentsData = [];
    let activeFilter = 'All';

    // Verify session state inside SessionStorage to prevent lockouts on page refresh
    if (sessionStorage.getItem('clinic_admin_authenticated') === 'true') {
        renderDashboardStructure();
        fetchAppointments();
    } else {
        renderGatekeeperForm();
    }

    /**
     * Renders a secure clinical gatekeeper gateway
     */
    function renderGatekeeperForm() {
        target.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; box-sizing: border-box;">
                <div style="background: #ffffff; border: 1px solid rgba(138, 52, 159, 0.1); border-radius: 20px; padding: 40px; width: 100%; max-width: 420px; box-shadow: 0 15px 40px rgba(62,13,95,0.04);">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h2 style="color: var(--purple-primary); margin: 0 0 8px 0; font-weight: 800;">Staff Verification</h2>
                        <p style="color: #666; font-size: 0.9rem; margin: 0;">Enter clinic credentials to query patient screening records.</p>
                    </div>
                    <form id="gatekeeperForm">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 6px; color: #444;">Access Passcode</label>
                            <input type="password" id="passcodeField" required style="width: 100%; padding: 12px 16px; border: 1px solid #ddd; border-radius: 10px; font-size: 1rem; box-sizing: border-box;" placeholder="••••••••">
                        </div>
                        <button type="submit" style="width: 100%; background: var(--purple-primary); color: #fff; padding: 14px; border: none; border-radius: 10px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: background 0.2s;">Authenticate Access</button>
                        <p id="gatekeeperError" style="color: #d90429; font-size: 0.85rem; font-weight: 600; text-align: center; margin: 15px 0 0 0; display: none;">Invalid internal passcode credential.</p>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('gatekeeperForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('passcodeField').value;
            
            // Set your desired dashboard access password string here
            if (input === 'RenewYouAdmin2026') { 
                sessionStorage.setItem('clinic_admin_authenticated', 'true');
                renderDashboardStructure();
                fetchAppointments();
            } else {
                document.getElementById('gatekeeperError').style.display = 'block';
            }
        });
    }
    /**
     * Builds main dashboard data frame layout shell
     */
    function renderDashboardStructure() {
        target.innerHTML = `
            <div style="max-width: 1400px; margin: 0 auto; padding: 40px 20px; box-sizing: border-box;">
                <!-- Header Control Center -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px; flex-wrap: wrap; gap: 20px;">
                    <div>
                        <h1 style="color: var(--purple-primary); margin: 0 0 5px 0; font-weight: 800; font-size: 2.2rem; letter-spacing: -0.5px;">DOT Screening Registry</h1>
                        <p style="color: #666; margin: 0; font-size: 1rem;">Active occupational testing queues and driver manifests.</p>
                    </div>
                    <button id="logoutBtn" style="background: transparent; color: #666; border: 1px solid #ddd; padding: 10px 18px; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 0.9rem;">Sign Out</button>
                </div>

                <!-- Statistics Metrics Overview Matrix -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px;" id="metricsCounterMatrix">
                    <div style="background: #fff; padding: 25px; border-radius: 16px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                        <span style="font-size: 0.8rem; font-weight: 700; color: #666; text-transform: uppercase;">Total Registries</span>
                        <h3 id="statTotal" style="margin: 10px 0 0 0; font-size: 2rem; color: var(--purple-primary); font-weight: 800;">0</h3>
                    </div>
                    <div style="background: #fff; padding: 25px; border-radius: 16px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                        <span style="font-size: 0.8rem; font-weight: 700; color: #666; text-transform: uppercase;">Pre-Employment</span>
                        <h3 id="statPre" style="margin: 10px 0 0 0; font-size: 2rem; color: #4f940c; font-weight: 800;">0</h3>
                    </div>
                    <div style="background: #fff; padding: 25px; border-radius: 16px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                        <span style="font-size: 0.8rem; font-weight: 700; color: #666; text-transform: uppercase;">Random Pools</span>
                        <h3 id="statRandom" style="margin: 10px 0 0 0; font-size: 2rem; color: var(--purple-accent); font-weight: 800;">0</h3>
                    </div>
                    <div style="background: #fff; padding: 25px; border-radius: 16px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                        <span style="font-size: 0.8rem; font-weight: 700; color: #666; text-transform: uppercase;">Urgent Incidents</span>
                        <h3 id="statUrgent" style="margin: 10px 0 0 0; font-size: 2rem; color: #d90429; font-weight: 800;">0</h3>
                    </div>
                </div>

                <!-- Navigation Sorter Filters -->
                <div style="display: flex; gap: 10px; margin-bottom: 25px; flex-wrap: wrap;" id="filterRow">
                    <button class="filter-tab active" data-filter="All" style="padding: 10px 20px; border: none; border-radius: 30px; font-weight: 600; cursor: pointer; font-size: 0.9rem; background: var(--purple-primary); color: #fff;">All Forms</button>
                    <button class="filter-tab" data-filter="Pre-Employment" style="padding: 10px 20px; border: none; border-radius: 30px; font-weight: 600; cursor: pointer; font-size: 0.9rem; background: #eee; color: #333;">Pre-Employment</button>
                    <button class="filter-tab" data-filter="Random-Pool" style="padding: 10px 20px; border: none; border-radius: 30px; font-weight: 600; cursor: pointer; font-size: 0.9rem; background: #eee; color: #333;">Random Pool</button>
                    <button class="filter-tab" data-filter="Post-Accident" style="padding: 10px 20px; border: none; border-radius: 30px; font-weight: 600; cursor: pointer; font-size: 0.9rem; background: #eee; color: #333;">Post-Accident</button>
                </div>

                <!-- Master Application Tracking Grid Output Box -->
                <div id="dataListTarget" style="display: grid; grid-template-columns: 1fr; gap: 15px;">
                    <p style="color: #666; text-align: center; padding: 40px;">Querying database secure tables...</p>
                </div>
            </div>
        `;

        // Attach Logout Event Action
        document.getElementById('logoutBtn').addEventListener('click', () => {
            sessionStorage.removeItem('clinic_admin_authenticated');
            window.location.reload();
        });

        // Attach Filter Action Hooks
        document.getElementById('filterRow').addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-tab')) {
                document.querySelectorAll('.filter-tab').forEach(b => {
                    b.style.background = '#eee';
                    b.style.color = '#333';
                });
                e.target.style.background = 'var(--purple-primary)';
                e.target.style.color = '#fff';
                activeFilter = e.target.getAttribute('data-filter');
                populateDataGrid();
            }
        });
    }
    /**
     * Executes asynchronous direct REST calls to database endpoints safely
     */
    async function fetchAppointments() {
        try {
            const response = await fetch(`${SUPABASE_PROJECT_URL}/rest/v1/dot_appointments?select=*&order=booking_date.asc,booking_time.asc`, {
                method: 'GET',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Database secure authorization connection rejected.');
            appointmentsData = await response.json();
            
            calculateMetrics();
            populateDataGrid();
        } catch (err) {
            const grid = document.getElementById('dataListTarget');
            if (grid) {
                grid.innerHTML = `<p style="color:#d90429; font-weight:600; text-align:center; padding:30px; border:1px dashed #d90429; border-radius:12px; background:#fff5f6;">Error reading records: ${err.message}. Ensure your public table RLS policies grant read authorization, or verify your project endpoint strings.</p>`;
            }
        }
    }

    /**
     * Calculates processing indicators matrix
     */
    function calculateMetrics() {
        document.getElementById('statTotal').innerText = appointmentsData.length;
        document.getElementById('statPre').innerText = appointmentsData.filter(a => a.testing_reason === 'Pre-Employment').length;
        document.getElementById('statRandom').innerText = appointmentsData.filter(a => a.testing_reason === 'Random-Pool').length;
        document.getElementById('statUrgent').innerText = appointmentsData.filter(a => a.testing_reason === 'Post-Accident').length;
    }

    /**
     * Filters, structures, and outputs data arrays to screen viewport components
     */
    function populateDataGrid() {
        const outputContainer = document.getElementById('dataListTarget');
        if (!outputContainer) return;

        const filtered = appointmentsData.filter(app => {
            if (activeFilter === 'All') return true;
            return app.testing_reason === activeFilter;
        });

        if (filtered.length === 0) {
            outputContainer.innerHTML = `<p style="background:#fff; border:1px solid rgba(0,0,0,0.04); text-align:center; padding:50px; color:#666; border-radius:16px; font-weight:500;">No screening appointments match this filter criteria block.</p>`;
            return;
        }

        outputContainer.innerHTML = filtered.map(app => {
            // Calculate a color tag matched cleanly to specific severity rules 
            let regulatoryBadgeColor = '#8a349b';
            if (app.testing_reason === 'Pre-Employment') regulatoryBadgeColor = '#4f940c';
            if (app.testing_reason === 'Post-Accident') regulatoryBadgeColor = '#d90429';

            return `
                <div style="background: #ffffff; border: 1px solid rgba(138, 52, 159, 0.05); border-radius: 16px; padding: 25px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px; box-shadow: 0 4px 15px rgba(62,13,95,0.01); box-sizing: border-box;">
                    <div style="flex: 1; min-width: 250px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                            <h3 style="margin: 0; color: var(--purple-primary); font-size: 1.25rem; font-weight: 800;">${app.client_name}</h3>
                            <span style="font-size: 0.75rem; background: rgba(138,52,159,0.04); color: ${regulatoryBadgeColor}; padding: 4px 10px; border-radius: 20px; font-weight: 700; text-transform: uppercase; border: 1px solid rgba(138,52,159,0.06);">${app.testing_reason}</span>
                        </div>
                        <div style="font-size: 0.9rem; color: #555; display: flex; flex-wrap: wrap; gap: 15px; margin: 0;">
                            <span>🆔 <strong>CDL:</strong> ${app.cdl_number}</span>
                            <span>📞 <strong>Phone:</strong> ${app.client_phone}</span>
                            <span>✉️ <strong>Email:</strong> ${app.client_email}</span>
                        </div>
                    </div>
                    
                    <div style="text-align: right; min-width: 180px; background: #fafafa; padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.02); box-sizing: border-box;">
                        <span style="font-size: 0.8rem; font-weight: 700; color: #777; text-transform: uppercase; display: block; margin-bottom: 2px;">Target Schedule</span>
                        <strong style="color: var(--purple-primary); font-size: 1.05rem; display: block;">${app.booking_date}</strong>
                        <span style="color: var(--purple-accent); font-size: 0.9rem; font-weight: 600;">⏱️ ${app.booking_time}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
});
