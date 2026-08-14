/**
 * ReNew You Health & Wellness - Protected Admin Registry Dashboard (Supabase Auth System)
 * Location: assets/js/admin-dashboard.js
 */
document.addEventListener('DOMContentLoaded', () => {
    // SUPABASE CONFIGURATION - Using project client library framework
    const SUPABASE_PROJECT_URL = "https://lrbimrlbskjweynxlgas.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyYmltcmxic2tqd2V5bnhsZ2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjQ0NTYsImV4cCI6MjA5NDEwMDQ1Nn0.I8fQ6ZjA9oaTqJCF-7Z7vUboXC8zv2cogBv4PC_1ihU"; 
    
    // Instantiates official client controller via global window variable context
    const supabaseClientInstance = window.supabase.createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

    const target = document.getElementById('admin-dashboard-target');
    if (!target) return;

    let appointmentsData = [];
    let activeFilter = 'All';
    let searchQuery = '';

    // AUTH GUARD: Query active session state directly from Supabase token storage ecosystem
    checkAuthenticationGuard();

    async function checkAuthenticationGuard() {
        const { data: { session } } = await supabaseClientInstance.auth.getSession();
        if (session) {
            renderDashboardStructure();
            fetchAppointments();
        } else {
            renderSecureLoginForm();
        }
    }

    /**
     * Renders a secure, responsive administrative login interface
     */
function renderSecureLoginForm() {
    target.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 15px; box-sizing: border-box; background: #fafafa;">
            <div style="background: #ffffff; border: 1px solid rgba(138, 52, 159, 0.1); border-radius: 20px; padding: clamp(20px, 5vw, 40px); width: 100%; max-width: 420px; box-shadow: 0 15px 40px rgba(62,13,95,0.04); box-sizing: border-box;">
                
                <!-- Centralized Corporate Branding -->
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="display: inline-block; margin-bottom: 15px;">
                        <img src="images/logo2.png" 
                             alt="ReNew You Health & Wellness Logo" 
                             style="max-width: 160px; height: auto; display: block; object-fit: contain; margin: 0 auto;"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                        
                        <!-- Professional Fallback Box if Image Fails to Load -->
                        <div style="display: none; width: 54px; height: 54px; background: rgba(138,52,159,0.04); color: var(--purple-primary); border-radius: 14px; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto;">
                            🏥
                        </div>
                    </div>
                    <h2 style="color: var(--purple-primary); margin: 0 0 8px 0; font-weight: 800; font-size: clamp(1.3rem, 4vw, 1.6rem);">Staff Console Sign-In</h2>
                    <p style="color: #666; font-size: 0.9rem; margin: 0;">Authorized clinic personnel authentication gateway.</p>
                </div>

                <form id="clinicLoginForm">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 6px; color: #444;">Clinic Email</label>
                        <input type="email" id="loginEmail" required style="width: 100%; padding: 12px 16px; border: 1px solid #ddd; border-radius: 10px; font-size: 1rem; box-sizing: border-box;" placeholder="admin@renewyou.com">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 6px; color: #444;">Account Password</label>
                        <input type="password" id="loginPassword" required style="width: 100%; padding: 12px 16px; border: 1px solid #ddd; border-radius: 10px; font-size: 1rem; box-sizing: border-box;" placeholder="••••••••">
                    </div>
                    <button type="submit" id="loginSubmitBtn" style="width: 100%; background: var(--purple-primary); color: #fff; padding: 14px; border: none; border-radius: 10px; font-weight: 700; font-size: 0.95rem; cursor: pointer; box-sizing: border-box;">Sign In to Registry</button>
                    <p id="loginErrorMsg" style="color: #d90429; font-size: 0.85rem; font-weight: 600; text-align: center; margin: 15px 0 0 0; display: none;"></p>
                </form>
            </div>
        </div>
    `;

        const loginForm = document.getElementById('clinicLoginForm');
        const submitBtn = document.getElementById('loginSubmitBtn');
        const errorMsg = document.getElementById('loginErrorMsg');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            errorMsg.style.display = 'none';

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            // Execute account authentication handshake directly through Supabase Auth endpoints
            const { error } = await supabaseClientInstance.auth.signInWithPassword({ email, password });

            if (error) {
                errorMsg.innerText = error.message;
                errorMsg.style.display = 'block';
                submitBtn.disabled = false;
            } else {
                renderDashboardStructure();
                fetchAppointments();
            }
        });
    }
    /**
     * Builds main dashboard data frame layout shell with mobile responsive classes
     */
    function renderDashboardStructure() {
        target.innerHTML = `
            <style>
                .dash-outer-wrap { max-width: 1400px; margin: 0 auto; padding: 40px 20px; box-sizing: border-box; }
                .dash-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px; flex-wrap: wrap; gap: 20px; }
                .dash-title-block h1 { color: var(--purple-primary); margin: 0 0 5px 0; font-weight: 800; font-size: clamp(1.6rem, 4vw, 2.2rem); letter-spacing: -0.5px; }
                .dash-metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px; margin-bottom: 35px; }
                .dash-control-card { background: #ffffff; border: 1px solid rgba(138, 52, 159, 0.06); padding: 20px; border-radius: 16px; margin-bottom: 25px; display: flex; flex-direction: column; gap: 15px; }
                .dash-tab-row { display: flex; gap: 8px; flex-wrap: wrap; }
                .filter-tab { padding: 8px 16px; border: none; border-radius: 30px; font-weight: 600; cursor: pointer; font-size: 0.85rem; background: #eee; color: #333; transition: all 0.2s ease; white-space: nowrap; }
                .filter-tab.active { background: var(--purple-primary) !important; color: #fff !important; }
                @media (max-width: 992px) {
                    .dash-metrics-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
                }
                @media (max-width: 768px) {
                    .dash-outer-wrap { padding: 20px 12px; }
                    .dash-header-row { flex-direction: column; align-items: stretch; text-align: center; gap: 15px; margin-bottom: 25px; }
                    .dash-header-actions { display: flex; gap: 10px; width: 100%; }
                    .dash-header-actions button { flex: 1; text-align: center; justify-content: center; }
                    .dash-metrics-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 25px; }
                    .dash-control-card { padding: 12px; margin-bottom: 15px; gap: 12px; }
                    .dash-tab-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; width: 100%; }
                    .filter-tab { text-align: center; padding: 10px 5px; font-size: 0.8rem; border-radius: 8px; }
                }
            </style>
            <div class="dash-outer-wrap">
                <div class="dash-header-row">
                    <div class="dash-title-block">
                        <h1>DOT Screening Registry</h1>
                        <p style="color: #666; margin: 0; font-size: 0.95rem;">Active occupational testing queues and driver manifests.</p>
                    </div>
                    <div class="dash-header-actions" style="display: flex; gap: 12px; flex-wrap: wrap;">
                        <button id="exportCsvBtn" style="background: #ffffff; color: var(--green-primary); border: 1px solid var(--green-primary); padding: 10px 18px; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;">📊 Export CSV</button>
                        <button id="logoutBtn" style="background: transparent; color: #666; border: 1px solid #ddd; padding: 10px 18px; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 0.9rem;">Sign Out</button>
                    </div>
                </div>

                <!-- 7-Card Expanded Metrics Counter Grid Matrix -->
                <div class="dash-metrics-grid" id="metricsCounterMatrix">
                    <div style="background: #fff; padding: 15px; border-radius: 14px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                        <span style="font-size: 0.72rem; font-weight: 700; color: #666; text-transform: uppercase; display: block;">Total Forms</span>
                        <h3 id="statTotal" style="margin: 5px 0 0 0; font-size: 1.5rem; color: var(--purple-primary); font-weight: 800;">0</h3>
                    </div>
                    <div style="background: #fff; padding: 15px; border-radius: 14px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                        <span style="font-size: 0.72rem; font-weight: 700; color: #666; text-transform: uppercase; display: block;">DOT Physical</span>
                        <h3 id="statPhysical" style="margin: 5px 0 0 0; font-size: 1.5rem; color: var(--purple-accent); font-weight: 800;">0</h3>
                    </div>
                    <div style="background: #fff; padding: 15px; border-radius: 14px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                        <span style="font-size: 0.72rem; font-weight: 700; color: #666; text-transform: uppercase; display: block;">Pre-Emp</span>
                        <h3 id="statPre" style="margin: 5px 0 0 0; font-size: 1.5rem; color: #4f940c; font-weight: 800;">0</h3>
                    </div>
                    <div style="background: #fff; padding: 15px; border-radius: 14px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                        <span style="font-size: 0.72rem; font-weight: 700; color: #666; text-transform: uppercase; display: block;">Random</span>
                        <h3 id="statRandom" style="margin: 5px 0 0 0; font-size: 1.5rem; color: var(--purple-accent); font-weight: 800;">0</h3>
                    </div>
                    <div style="background: #fff; padding: 15px; border-radius: 14px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                        <span style="font-size: 0.72rem; font-weight: 700; color: #666; text-transform: uppercase; display: block;">Accident</span>
                        <h3 id="statUrgent" style="margin: 5px 0 0 0; font-size: 1.5rem; color: #d90429; font-weight: 800;">0</h3>
                    </div>
                    <div style="background: #fff; padding: 15px; border-radius: 14px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                        <span style="font-size: 0.72rem; font-weight: 700; color: #666; text-transform: uppercase; display: block;">Return Duty</span>
                        <h3 id="statReturn" style="margin: 5px 0 0 0; font-size: 1.5rem; color: #0077b6; font-weight: 800;">0</h3>
                    </div>
                    <div style="background: #fff; padding: 15px; border-radius: 14px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                        <span style="font-size: 0.72rem; font-weight: 700; color: #666; text-transform: uppercase; display: block;">Follow Up</span>
                        <h3 id="statFollow" style="margin: 5px 0 0 0; font-size: 1.5rem; color: #f77f00; font-weight: 800;">0</h3>
                    </div>
                </div>

                <div class="dash-control-card">
                    <div class="dash-tab-row" id="filterRow">
                        <button class="filter-tab active" data-filter="All">All Forms</button>
                        <button class="filter-tab" data-filter="DOT-Physical">DOT Physical</button>
                        <button class="filter-tab" data-filter="Pre-Employment">Pre-Employment</button>
                        <button class="filter-tab" data-filter="Random-Pool">Random Pool</button>
                        <button class="filter-tab" data-filter="Post-Accident">Post-Accident</button>
                        <button class="filter-tab" data-filter="Return-To-Duty">Return To Duty</button>
                        <button class="filter-tab" data-filter="Follow-Up">Follow Up</button>
                    </div>
                    
                    <div style="position: relative; width: 100%;">
                        <input type="text" id="dashboardSearch" style="width: 100%; padding: 12px 16px 12px 40px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08); font-size: 0.95rem; box-sizing: border-box; background-color: #fafafa;" placeholder="Search name or CDL string...">
                        <div style="position: absolute; left: 14px; top: 13px; color: #777; display: flex; align-items: center;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </div>
                    </div>
                </div>

                <div id="dataListTarget" style="display: grid; grid-template-columns: 1fr; gap: 15px;">
                    <p style="color: #666; text-align: center; padding: 40px;">Querying database secure tables...</p>
                </div>
            </div>
        `;

        const tabs = document.querySelectorAll('.filter-tab');
        tabs.forEach(tabBtn => {
            tabBtn.addEventListener('click', () => {
                tabs.forEach(b => b.classList.remove('active'));
                tabBtn.classList.add('active');
                activeFilter = tabBtn.getAttribute('data-filter');
                populateDataGrid();
            });
        });

        document.getElementById('dashboardSearch').addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            populateDataGrid();
        });

        document.getElementById('exportCsvBtn').addEventListener('click', () => {
            exportRegistryToCsv();
        });

        document.getElementById('logoutBtn').addEventListener('click', async () => {
            await supabaseClientInstance.auth.signOut();
            window.location.href = 'index.html';
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
                grid.innerHTML = `<p style="color:#d90429; font-weight:600; text-align:center; padding:30px; border:1px dashed #d90429; border-radius:12px; background:#fff5f6;">Error reading records: ${err.message}. Verify network table status configs.</p>`;
            }
        }
    }

    /**
     * Calculates processing indicators matrix for all 7 categories
     */
    function calculateMetrics() {
        const getCount = (reason) => appointmentsData.filter(a => {
            const dbVal = (a.testing_reason || '').toLowerCase().replace(/[\s_-]/g, '');
            const targetVal = reason.toLowerCase().replace(/[\s_-]/g, '');
            return dbVal === targetVal;
        }).length;

        document.getElementById('statTotal').innerText = appointmentsData.length;
        document.getElementById('statPhysical').innerText = getCount('DOT-Physical');
        document.getElementById('statPre').innerText = getCount('Pre-Employment');
        document.getElementById('statRandom').innerText = getCount('Random-Pool');
        document.getElementById('statUrgent').innerText = getCount('Post-Accident');
        document.getElementById('statReturn').innerText = getCount('Return-To-Duty');
        document.getElementById('statFollow').innerText = getCount('Follow-Up');
    }

    /**
     * Filters, searches, and outputs data arrays to screen viewport components
     */
    function populateDataGrid() {
        const outputContainer = document.getElementById('dataListTarget');
        if (!outputContainer) return;

        const filtered = appointmentsData.filter(app => {
            const dbReason = (app.testing_reason || '').toLowerCase().replace(/[\s_-]/g, '');
            const currentTab = activeFilter.toLowerCase().replace(/[\s_-]/g, '');
            
            const matchesTab = (activeFilter === 'All' || dbReason === currentTab);
            const matchesSearch = (
                (app.client_name || '').toLowerCase().includes(searchQuery) || 
                (app.cdl_number || '').toLowerCase().includes(searchQuery)
            );
            return matchesTab && matchesSearch;
        });

        if (filtered.length === 0) {
            outputContainer.innerHTML = `<div style="background:#fff; border:1px solid rgba(0,0,0,0.04); text-align:center; padding:40px 20px; color:#666; border-radius:12px; font-weight:500; font-size:0.95rem;">No screening appointments match your filter criteria or search terms.</div>`;
            return;
        }

        outputContainer.innerHTML = filtered.map(app => {
            let regulatoryBadgeColor = '#8a349b'; 
            let readableLabel = app.testing_reason;

            if (app.testing_reason === 'Pre-Employment') regulatoryBadgeColor = '#4f940c';
            if (app.testing_reason === 'Post-Accident') regulatoryBadgeColor = '#d90429';
            if (app.testing_reason === 'Return-To-Duty') { regulatoryBadgeColor = '#0077b6'; readableLabel = 'Return to Duty'; }
            if (app.testing_reason === 'Follow-Up') { regulatoryBadgeColor = '#f77f00'; readableLabel = 'Follow Up'; }
            if (app.testing_reason === 'DOT-Physical') { regulatoryBadgeColor = '#4f940c'; readableLabel = 'DOT Physical'; }

            return `
                <div style="background: #ffffff; border: 1px solid rgba(138, 52, 159, 0.05); border-radius: 14px; padding: clamp(15px, 4vw, 22px); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 15px; box-shadow: 0 4px 15px rgba(62,13,95,0.01); box-sizing: border-box; width: 100%;">
                    <div style="flex: 1; min-width: 240px;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap;">
                            <h3 style="margin: 0; color: var(--purple-primary); font-size: clamp(1.1rem, 3vw, 1.25rem); font-weight: 800;">${app.client_name}</h3>
                            <span style="font-size: 0.7rem; background: rgba(138,52,159,0.02); color: ${regulatoryBadgeColor}; padding: 3px 8px; border-radius: 20px; font-weight: 700; text-transform: uppercase; border: 1px solid ${regulatoryBadgeColor}25; white-space: nowrap;">${readableLabel}</span>
                        </div>
                        <div style="font-size: 0.85rem; color: #555; display: flex; flex-direction: column; gap: 4px; margin: 0;">
                            <span>🆔 <strong>CDL:</strong> ${app.cdl_number}</span>
                            <span>📞 <strong>Phone:</strong> ${app.client_phone}</span>
                            <span>✉️ <strong>Email:</strong> ${app.client_email}</span>
                        </div>
                    </div>
                    
                    <div style="text-align: left; min-width: 140px; background: #fafafa; padding: 10px 14px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.02); box-sizing: border-box; flex-shrink: 0;">
                        <span style="font-size: 0.7rem; font-weight: 700; color: #777; text-transform: uppercase; display: block; margin-bottom: 2px;">Schedule</span>
                        <strong style="color: var(--purple-primary); font-size: 0.95rem; display: block;">${app.booking_date}</strong>
                        <span style="color: var(--purple-accent); font-size: 0.85rem; font-weight: 600;">⏱️ ${app.booking_time}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Parses the current data array and downloads an audit-ready CSV sheet file
     */
    function exportRegistryToCsv() {
        if (appointmentsData.length === 0) {
            alert("No appointment entries available to export.");
            return;
        }

        const headers = ["Driver Name", "CDL String", "Email Context", "Phone Number", "DOT Category", "Target Date", "Target Window"];
        const csvRows = [headers.join(",")];

        appointmentsData.forEach(app => {
            const rowData = [
                `"${(app.client_name || '').replace(/"/g, '""')}"`,
                `"${(app.cdl_number || '').replace(/"/g, '""')}"`,
                `"${(app.client_email || '').replace(/"/g, '""')}"`,
                `"${(app.client_phone || '').replace(/"/g, '""')}"`,
                `"${(app.testing_reason || '').replace(/"/g, '""')}"`,
                `"${app.booking_date || ''}"`,
                `"${app.booking_time || ''}"`
            ];
            csvRows.push(rowData.join(","));
        });

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const downloadLink = document.createElement("a");
        
        downloadLink.setAttribute("href", encodedUri);
        downloadLink.setAttribute("download", `DOT_Screening_Registry_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(downloadLink);
        
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
});
