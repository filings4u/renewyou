/**
 * ReNew You Health & Wellness
 * DOT Screening Registry + Administrative Scheduling System
 *
 * Location:
 * assets/js/admin-dashboard.js
 *
 * Supabase tables used:
 *
 * scheduling_settings
 * -----------------------------------------
 * id
 * buffer_minutes
 * blocked_date_slots
 * updated_at
 *
 * dot_appointments
 * -----------------------------------------
 * id
 * created_at
 * client_name
 * cdl_number
 * client_email
 * client_phone
 * testing_reason
 * booking_date
 * booking_time
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       SUPABASE CONFIGURATION
    ========================================================= */

    const SUPABASE_PROJECT_URL =
        "https://lrbimrlbskjweynxlgas.supabase.co";

    const SUPABASE_ANON_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyYmltcmxic2tqd2V5bnhsZ2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjQ0NTYsImV4cCI6MjA5NDEwMDQ1Nn0.I8fQ6ZjA9oaTqJCF-7Z7vUboXC8zv2cogBv4PC_1ihU";

    const supabaseClientInstance =
        window.supabase.createClient(
            SUPABASE_PROJECT_URL,
            SUPABASE_ANON_KEY
        );

    const target =
        document.getElementById('admin-dashboard-target');

    if (!target) {
        return;
    }

    /* =========================================================
   BRANDED ADMIN MODAL
========================================================= */

function ensureAdminModal() {

    if (document.getElementById('adminBrandedModal')) {
        return;
    }

    const modal = document.createElement('div');

    modal.id = 'adminBrandedModal';

    modal.innerHTML = `
        <div class="admin-modal-overlay" id="adminModalOverlay">

            <div
                class="admin-modal-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="adminModalTitle"
            >

            <button
    type="button"
    class="admin-modal-close"
    id="adminModalClose"
    aria-label="Close"
>
    <span aria-hidden="true">&times;</span>
</button>

<style>
/* =========================================================
   ADMIN BRANDED MODAL - CLOSE BUTTON
========================================================= */

.admin-modal-close {
    position: absolute;
    top: 16px;
    right: 16px;

    width: 42px;
    height: 42px;

    padding: 0;
    margin: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid rgba(80, 20, 110, 0.12);
    border-radius: 50%;

    background: #ffffff;
    color: #4f235f;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 28px;
    font-weight: 400;
    line-height: 1;

    cursor: pointer;

    box-shadow:
        0 4px 14px rgba(62, 13, 95, 0.12);

    transition:
        background 0.2s ease,
        color 0.2s ease,
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.admin-modal-close span {
    display: block;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    line-height: 1;

    transform: translateY(-1px);
}

.admin-modal-close:hover {
    background: #f7f1fa;
    color: var(--purple-primary, #4f176d);

    transform: scale(1.05);

    box-shadow:
        0 6px 18px rgba(62, 13, 95, 0.18);
}

.admin-modal-close:active {
    transform: scale(0.96);
}

.admin-modal-close:focus-visible {
    outline: 3px solid rgba(138, 52, 159, 0.25);
    outline-offset: 3px;
}
    </style>

                <div
                    class="admin-modal-icon"
                    id="adminModalIcon"
                >
                    ✓
                </div>

                <div class="admin-modal-content">

                    <h3 id="adminModalTitle">
                        Notice
                    </h3>

                    <p id="adminModalMessage"></p>

                </div>

                <button
                    type="button"
                    class="admin-modal-button"
                    id="adminModalOk"
                >
                    OK
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    const style = document.createElement('style');

    style.id = 'adminBrandedModalStyles';

    style.textContent = `

        .admin-modal-overlay {
            position: fixed;
            inset: 0;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;

            background:
                rgba(37, 12, 52, 0.48);

            backdrop-filter:
                blur(5px);

            -webkit-backdrop-filter:
                blur(5px);

            opacity: 0;
            visibility: hidden;

            transition:
                opacity 0.22s ease,
                visibility 0.22s ease;
        }

        .admin-modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .admin-modal-card {
            position: relative;
            width: min(440px, 100%);
            box-sizing: border-box;

            background: #ffffff;

            border-radius: 22px;

            padding: 32px 30px 28px;

            text-align: center;

            box-shadow:
                0 25px 70px
                rgba(62, 13, 95, 0.22);

            border:
                1px solid
                rgba(138, 52, 159, 0.08);

            transform:
                translateY(12px)
                scale(0.97);

            transition:
                transform 0.22s ease;
        }

        .admin-modal-overlay.active
        .admin-modal-card {
            transform:
                translateY(0)
                scale(1);
        }

        .admin-modal-close {
            position: absolute;
            top: 12px;
            right: 14px;

            width: 34px;
            height: 34px;

            border: none;
            border-radius: 50%;

            background: transparent;

            color: #888;

            font-size: 26px;
            line-height: 1;

            cursor: pointer;

            transition:
                background 0.2s ease,
                color 0.2s ease;
        }

        .admin-modal-close:hover {
            background:
                rgba(138, 52, 159, 0.07);

            color:
                var(--purple-primary, #8a349b);
        }

        .admin-modal-icon {
            width: 58px;
            height: 58px;

            margin: 0 auto 18px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            background:
                rgba(79, 148, 12, 0.10);

            color:
                #4f940c;

            font-size: 27px;
            font-weight: 800;
        }

        .admin-modal-card.error
        .admin-modal-icon {
            background:
                rgba(217, 4, 41, 0.09);

            color:
                #d90429;
        }

        .admin-modal-card.warning
        .admin-modal-icon {
            background:
                rgba(247, 127, 0, 0.10);

            color:
                #f77f00;
        }

        .admin-modal-card.info
        .admin-modal-icon {
            background:
                rgba(138, 52, 159, 0.09);

            color:
                var(--purple-primary, #8a349b);
        }

        .admin-modal-content h3 {
            margin: 0 0 9px;

            color:
                var(--purple-primary, #8a349b);

            font-size: 1.2rem;
            font-weight: 800;
        }

        .admin-modal-content p {
            margin: 0;

            color: #666;

            font-size: 0.9rem;
            line-height: 1.6;

            white-space: pre-line;
        }

        .admin-modal-button {
            width: 100%;

            margin-top: 24px;

            padding: 13px 18px;

            border: none;
            border-radius: 10px;

            background:
                var(--purple-primary, #8a349b);

            color: #ffffff;

            font-size: 0.9rem;
            font-weight: 800;

            cursor: pointer;

            transition:
                opacity 0.2s ease,
                transform 0.15s ease;
        }

        .admin-modal-button:hover {
            opacity: 0.93;
        }

        .admin-modal-button:active {
            transform: scale(0.98);
        }

        @media (max-width: 480px) {

            .admin-modal-card {
                padding:
                    30px 22px 22px;

                border-radius: 18px;
            }

            .admin-modal-icon {
                width: 52px;
                height: 52px;
                font-size: 24px;
            }

            .admin-modal-content h3 {
                font-size: 1.1rem;
            }

            .admin-modal-content p {
                font-size: 0.86rem;
            }
        }

    `;

    document.head.appendChild(style);

    const closeModal = () => {

        const overlay =
            document.getElementById(
                'adminModalOverlay'
            );

        if (overlay) {
            overlay.classList.remove('active');
        }

        document.body.style.overflow = '';
    };

    document
        .getElementById('adminModalClose')
        .addEventListener(
            'click',
            closeModal
        );

    document
        .getElementById('adminModalOk')
        .addEventListener(
            'click',
            closeModal
        );

    document
        .getElementById('adminModalOverlay')
        .addEventListener(
            'click',
            function (event) {

                if (
                    event.target ===
                    event.currentTarget
                ) {
                    closeModal();
                }
            }
        );

    document.addEventListener(
        'keydown',
        function (event) {

            if (
                event.key === 'Escape'
            ) {

                const overlay =
                    document.getElementById(
                        'adminModalOverlay'
                    );

                if (
                    overlay &&
                    overlay.classList.contains(
                        'active'
                    )
                ) {
                    closeModal();
                }
            }
        }
    );
}


function showAdminModal(
    message,
    type = 'info',
    title = null
) {

    ensureAdminModal();

    const overlay =
        document.getElementById(
            'adminModalOverlay'
        );

    const card =
        overlay.querySelector(
            '.admin-modal-card'
        );

    const icon =
        document.getElementById(
            'adminModalIcon'
        );

    const modalTitle =
        document.getElementById(
            'adminModalTitle'
        );

    const modalMessage =
        document.getElementById(
            'adminModalMessage'
        );

    card.classList.remove(
        'success',
        'error',
        'warning',
        'info'
    );

    card.classList.add(
        type
    );

    if (!title) {

        if (type === 'success') {
            title = 'Success';
        }

        else if (type === 'error') {
            title = 'Something went wrong';
        }

        else if (type === 'warning') {
            title = 'Please Note';
        }

        else {
            title = 'Scheduling Notice';
        }
    }

    if (type === 'success') {
        icon.textContent = '✓';
    }

    else if (type === 'error') {
        icon.textContent = '!';
    }

    else if (type === 'warning') {
        icon.textContent = '!';
    }

    else {
        icon.textContent = 'i';
    }

    modalTitle.textContent =
        title;

    modalMessage.textContent =
        message;

    overlay.classList.add(
        'active'
    );

    document.body.style.overflow =
        'hidden';

    setTimeout(
        function () {

            const button =
                document.getElementById(
                    'adminModalOk'
                );

            if (button) {
                button.focus();
            }

        },
        50
    );
}

    /* =========================================================
       APPLICATION STATE
    ========================================================= */

    let appointmentsData = [];

    let activeFilter = 'All';

    let searchQuery = '';

    let schedulingSettings = {
        id: 'dot_config',
        buffer_minutes: 30,
        blocked_date_slots: {}
    };

    let selectedScheduleDate = getTodayLocalDate();

    /* =========================================================
       DEFAULT CLINIC SCHEDULE
       These are generated dynamically.
       
       IMPORTANT:
       The four old hard-coded appointment buttons are gone.
       
       The buffer setting controls the generated interval.
       
       Example:
       30 minutes =
       8:00
       8:30
       9:00
       9:30
       etc.
    ========================================================= */

    const CLINIC_OPEN_MINUTES = 8 * 60;

    const CLINIC_CLOSE_MINUTES = 17 * 60;

    /* =========================================================
       AUTHENTICATION GUARD
    ========================================================= */

    checkAuthenticationGuard();

    async function checkAuthenticationGuard() {

        try {

            const {
                data: { session }
            } = await supabaseClientInstance.auth.getSession();

            if (session) {

                renderDashboardStructure();

                await loadSchedulingSystemSettings();

                await fetchAppointments();

                renderScheduleManager();

            } else {

                renderSecureLoginForm();

            }

        } catch (error) {

            console.error(
                'Authentication initialization error:',
                error
            );

            renderSecureLoginForm();
        }
    }

    /* =========================================================
       LOGIN
    ========================================================= */

    function renderSecureLoginForm() {

        target.innerHTML = `
            <div style="
                display:flex;
                align-items:center;
                justify-content:center;
                min-height:100vh;
                padding:15px;
                box-sizing:border-box;
                background:#fafafa;
            ">

                <div style="
                    background:#ffffff;
                    border:1px solid rgba(138,52,159,0.1);
                    border-radius:20px;
                    padding:clamp(20px,5vw,40px);
                    width:100%;
                    max-width:420px;
                    box-shadow:0 15px 40px rgba(62,13,95,0.04);
                    box-sizing:border-box;
                ">

                    <div style="
                        text-align:center;
                        margin-bottom:25px;
                    ">

                        <div style="
                            display:inline-block;
                            margin-bottom:15px;
                        ">

                            <img
                                src="images/logo2.png"
                                alt="ReNew You Health & Wellness Logo"
                                style="
                                    max-width:160px;
                                    height:auto;
                                    display:block;
                                    object-fit:contain;
                                    margin:0 auto;
                                "
                                onerror="
                                    this.style.display='none';
                                    this.nextElementSibling.style.display='flex';
                                "
                            />

                            <div style="
                                display:none;
                                width:54px;
                                height:54px;
                                background:rgba(138,52,159,0.04);
                                color:var(--purple-primary);
                                border-radius:14px;
                                align-items:center;
                                justify-content:center;
                                font-size:1.6rem;
                                margin:0 auto;
                            ">
                                🏥
                            </div>

                        </div>

                        <h2 style="
                            color:var(--purple-primary);
                            margin:0 0 8px 0;
                            font-weight:800;
                            font-size:clamp(1.3rem,4vw,1.6rem);
                        ">
                            Staff Console Sign-In
                        </h2>

                        <p style="
                            color:#666;
                            font-size:0.9rem;
                            margin:0;
                        ">
                            Authorized clinic personnel authentication gateway.
                        </p>

                    </div>

                    <form id="clinicLoginForm">

                        <div style="margin-bottom:16px;">

                            <label style="
                                display:block;
                                font-size:0.8rem;
                                font-weight:700;
                                text-transform:uppercase;
                                margin-bottom:6px;
                                color:#444;
                            ">
                                Clinic Email
                            </label>

                            <input
                                type="email"
                                id="loginEmail"
                                required
                                style="
                                    width:100%;
                                    padding:12px 16px;
                                    border:1px solid #ddd;
                                    border-radius:10px;
                                    font-size:1rem;
                                    box-sizing:border-box;
                                "
                                placeholder="admin@renewyou.com"
                            />

                        </div>

                        <div style="margin-bottom:20px;">

                            <label style="
                                display:block;
                                font-size:0.8rem;
                                font-weight:700;
                                text-transform:uppercase;
                                margin-bottom:6px;
                                color:#444;
                            ">
                                Account Password
                            </label>

                            <input
                                type="password"
                                id="loginPassword"
                                required
                                style="
                                    width:100%;
                                    padding:12px 16px;
                                    border:1px solid #ddd;
                                    border-radius:10px;
                                    font-size:1rem;
                                    box-sizing:border-box;
                                "
                                placeholder="••••••••"
                            />

                        </div>

                        <button
                            type="submit"
                            id="loginSubmitBtn"
                            style="
                                width:100%;
                                background:var(--purple-primary);
                                color:#fff;
                                padding:14px;
                                border:none;
                                border-radius:10px;
                                font-weight:700;
                                font-size:0.95rem;
                                cursor:pointer;
                            "
                        >
                            Sign In to Registry
                        </button>

                        <p
                            id="loginErrorMsg"
                            style="
                                color:#d90429;
                                font-size:0.85rem;
                                font-weight:600;
                                text-align:center;
                                margin:15px 0 0 0;
                                display:none;
                            "
                        ></p>

                    </form>

                </div>

            </div>
        `;

        const loginForm =
            document.getElementById('clinicLoginForm');

        const submitBtn =
            document.getElementById('loginSubmitBtn');

        const errorMsg =
            document.getElementById('loginErrorMsg');

        loginForm.addEventListener('submit', async (event) => {

            event.preventDefault();

            submitBtn.disabled = true;

            errorMsg.style.display = 'none';

            const email =
                document.getElementById('loginEmail')
                    .value
                    .trim();

            const password =
                document.getElementById('loginPassword')
                    .value;

            const { error } =
                await supabaseClientInstance.auth.signInWithPassword({
                    email: email,
                    password: password
                });

            if (error) {

                errorMsg.innerText = error.message;

                errorMsg.style.display = 'block';

                submitBtn.disabled = false;

                return;
            }

            renderDashboardStructure();

            await loadSchedulingSystemSettings();

            await fetchAppointments();

            renderScheduleManager();
        });
    }

/* =========================================================
   MAIN DASHBOARD
   ========================================================= */

function renderDashboardStructure() {

    target.innerHTML = `

        <style>

            .dash-outer-wrap {
                max-width:1400px;
                margin:0 auto;
                padding:30px 20px;
                box-sizing:border-box;
            }

            /* =====================================================
               TOP HEADER
            ===================================================== */

            .dash-header-row {
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:20px;
                flex-wrap:wrap;
                gap:20px;
            }

            .dash-title-block h1 {
                color:var(--purple-primary);
                margin:0 0 5px 0;
                font-weight:800;
                font-size:clamp(1.6rem,4vw,2.2rem);
            }

            .dash-title-block p {
                color:#666;
                margin:0;
                font-size:0.95rem;
            }

            /* =====================================================
               MAIN NAVIGATION
            ===================================================== */

            .admin-page-nav {
                display:flex;
                gap:8px;
                background:#fff;
                border:1px solid rgba(138,52,159,0.08);
                border-radius:14px;
                padding:7px;
                margin-bottom:25px;
                box-shadow:0 4px 15px rgba(62,13,95,0.03);
                overflow-x:auto;
            }

            .admin-page-tab {
                border:none;
                background:transparent;
                color:#555;
                padding:11px 18px;
                border-radius:10px;
                font-weight:700;
                cursor:pointer;
                white-space:nowrap;
                transition:all .2s ease;
                font-size:.88rem;
            }

            .admin-page-tab:hover {
                background:#f7f4f9;
                color:var(--purple-primary);
            }

            .admin-page-tab.active {
                background:var(--purple-primary);
                color:#fff;
            }

            .admin-page {
                display:none;
            }

            .admin-page.active {
                display:block;
            }

            /* =====================================================
               METRICS
            ===================================================== */

            .dash-metrics-grid {
                display:grid;
                grid-template-columns:
                    repeat(auto-fit,minmax(160px,1fr));
                gap:15px;
                margin-bottom:25px;
            }

            /* =====================================================
               CARDS
            ===================================================== */

            .admin-card {
                background:#fff;
                border:1px solid rgba(138,52,159,0.08);
                border-radius:16px;
                padding:22px;
                margin-bottom:20px;
                box-sizing:border-box;
                box-shadow:0 6px 20px rgba(62,13,95,0.025);
            }

            .admin-card h2,
            .admin-card h3 {
                color:var(--purple-primary);
            }

            /* =====================================================
               SETTINGS
            ===================================================== */

            .admin-settings-panel {
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:20px;
            }

            .setting-inner-card {
                background:#fff;
                border:1px solid rgba(138,52,159,0.08);
                padding:25px;
                border-radius:16px;
                box-shadow:0 10px 30px rgba(62,13,95,0.02);
            }

            /* =====================================================
               FILTERS
            ===================================================== */

            .dash-control-card {
                background:#fff;
                border:1px solid rgba(138,52,159,0.06);
                padding:20px;
                border-radius:16px;
                margin-bottom:20px;
                display:flex;
                flex-direction:column;
                gap:15px;
            }

            .dash-tab-row {
                display:flex;
                gap:8px;
                flex-wrap:wrap;
            }

            .filter-tab {
                padding:8px 16px;
                border:none;
                border-radius:30px;
                font-weight:600;
                cursor:pointer;
                font-size:.85rem;
                background:#eee;
                color:#333;
            }

            .filter-tab.active {
                background:var(--purple-primary)!important;
                color:#fff!important;
            }

            /* =====================================================
               SCHEDULE
            ===================================================== */

            .schedule-manager-card {
                background:#fff;
                border:1px solid rgba(138,52,159,0.08);
                border-radius:18px;
                padding:25px;
                margin-bottom:20px;
                box-sizing:border-box;
            }

            .schedule-layout {
                display:grid;
                grid-template-columns:350px 1fr;
                gap:25px;
            }

            .schedule-calendar-panel {
                border:1px solid #eee;
                border-radius:14px;
                padding:18px;
                background:#fafafa;
            }

            .schedule-times-panel {
                border:1px solid #eee;
                border-radius:14px;
                padding:18px;
                background:#fff;
            }

            .schedule-calendar-header {
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:10px;
                margin-bottom:15px;
            }

            .schedule-date-input {
                width:100%;
                padding:12px;
                border:1px solid #ddd;
                border-radius:10px;
                font-size:1rem;
                box-sizing:border-box;
                background:#fff;
            }

            .schedule-action-btn {
                border:none;
                border-radius:9px;
                padding:10px 14px;
                font-weight:700;
                cursor:pointer;
                font-size:.85rem;
            }

            .schedule-primary-btn {
                background:var(--purple-primary);
                color:#fff;
            }

            .schedule-danger-btn {
                background:#d90429;
                color:#fff;
            }

            .schedule-neutral-btn {
                background:#eee;
                color:#333;
            }

            .schedule-time-grid {
                display:grid;
                grid-template-columns:
                    repeat(3,1fr);
                gap:10px;
                margin-top:15px;
            }

            .schedule-time-btn {
                padding:13px 8px;
                border:1px solid rgba(138,52,159,.15);
                background:#fff;
                color:var(--purple-primary);
                border-radius:10px;
                font-weight:700;
                cursor:pointer;
                transition:all .2s;
            }

            .schedule-time-btn:hover {
                border-color:var(--purple-accent);
                transform:translateY(-1px);
            }

            .schedule-time-btn.booked {
                background:#f1f1f1;
                border-color:#ddd;
                color:#888;
                cursor:not-allowed;
            }

            .schedule-time-btn.blocked {
                background:#fff0f2;
                border-color:#d90429;
                color:#d90429;
            }

            .schedule-time-btn.past {
                background:#f1f1f1;
                border-color:#ddd;
                color:#999;
                cursor:not-allowed;
                opacity:.75;
            }

            .schedule-time-status {
                display:block;
                font-size:.65rem;
                margin-top:4px;
                text-transform:uppercase;
            }

            /* =====================================================
               MOBILE
            ===================================================== */

            @media(max-width:992px) {

                .admin-settings-panel {
                    grid-template-columns:1fr;
                }

                .schedule-layout {
                    grid-template-columns:1fr;
                }

            }

            @media(max-width:768px) {

                .dash-outer-wrap {
                    padding:20px 12px;
                }

                .admin-page-nav {
                    margin-left:-4px;
                    margin-right:-4px;
                }

                .admin-page-tab {
                    padding:10px 13px;
                    font-size:.8rem;
                }

                .schedule-time-grid {
                    grid-template-columns:repeat(2,1fr);
                }

            }

            /* =========================================================
   MOBILE RESPONSIVE ADMIN DASHBOARD
   Visual/layout only — no functionality changes
========================================================= */

/* ---------------------------------------------------------
   TABLET / SMALL LAPTOP
--------------------------------------------------------- */

@media (max-width: 1100px) {

    .dash-outer-wrap {
        width: 100%;
        max-width: 100%;
        padding: 24px 16px;
    }

    .schedule-layout {
        grid-template-columns: 280px 1fr;
        gap: 18px;
    }

    .schedule-time-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

}


/* ---------------------------------------------------------
   TABLET
--------------------------------------------------------- */

@media (max-width: 900px) {

    .dash-header-row {
        align-items: flex-start;
    }

    .dash-title-block {
        flex: 1 1 100%;
    }

    .dash-header-row > div:last-child {
        width: 100%;
    }

    .dash-header-row > div:last-child button {
        flex: 1;
        min-width: 140px;
    }

    .admin-settings-panel {
        grid-template-columns: 1fr;
    }

    .schedule-layout {
        grid-template-columns: 1fr;
    }

    .schedule-calendar-panel,
    .schedule-times-panel {
        width: 100%;
        box-sizing: border-box;
    }

}


/* ---------------------------------------------------------
   MOBILE
--------------------------------------------------------- */

@media (max-width: 768px) {

    html,
    body {
        max-width: 100%;
        overflow-x: hidden;
    }

    .dash-outer-wrap {
        width: 100%;
        max-width: 100%;
        padding: 18px 12px 30px;
        box-sizing: border-box;
    }


    /* =====================================================
       HEADER
    ===================================================== */

    .dash-header-row {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 15px;
        margin-bottom: 16px;
    }

    .dash-title-block h1 {
        font-size: 1.55rem;
        line-height: 1.2;
    }

    .dash-title-block p {
        font-size: 0.82rem;
        line-height: 1.45;
        margin-top: 5px;
    }

    .dash-header-row > div:last-child {
        display: grid !important;
        grid-template-columns: 1fr 1fr;
        gap: 8px !important;
        width: 100%;
    }

    .dash-header-row > div:last-child button {
        width: 100%;
        min-width: 0;
        padding: 11px 8px !important;
        font-size: 0.78rem !important;
        white-space: nowrap;
    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    .admin-page-nav {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 18px;
        padding: 5px;

        display: flex;
        gap: 4px;

        overflow-x: auto;
        overflow-y: hidden;

        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
    }

    .admin-page-nav::-webkit-scrollbar {
        display: none;
    }

    .admin-page-tab {
        flex: 0 0 auto;

        padding: 10px 13px;

        font-size: 0.76rem;
        border-radius: 9px;

        min-height: 40px;
    }


    /* =====================================================
       METRICS
    ===================================================== */

    .dash-metrics-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 9px;
        margin-bottom: 18px;
    }

    .dash-metrics-grid > div {
        min-width: 0;
        padding: 13px !important;
    }

    .dash-metrics-grid span {
        font-size: 0.64rem !important;
        line-height: 1.25;
    }

    .dash-metrics-grid h3 {
        font-size: 1.35rem !important;
        margin-top: 5px !important;
    }


    /* =====================================================
       GENERAL CARDS
    ===================================================== */

    .admin-card {
        padding: 17px;
        border-radius: 14px;
        margin-bottom: 15px;
    }

    .admin-card h2 {
        font-size: 1.05rem !important;
    }

    .admin-card p {
        font-size: 0.82rem !important;
    }


    /* =====================================================
       APPOINTMENT FILTERS
    ===================================================== */

    .dash-control-card {
        padding: 14px;
        border-radius: 14px;
        gap: 12px;
    }

    .dash-tab-row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 7px;
    }

    .filter-tab {
        width: 100%;
        min-height: 40px;
        padding: 9px 7px;

        font-size: 0.72rem;
        line-height: 1.2;
    }

    #dashboardSearch {
        min-height: 44px;
        padding-left: 40px !important;
        font-size: 0.9rem !important;
    }


    /* =====================================================
       APPOINTMENT CARDS
    ===================================================== */

    #dataListTarget {
        gap: 10px !important;
    }

    #dataListTarget > div {
        padding: 15px !important;
        border-radius: 13px !important;

        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
    }

    #dataListTarget > div > div {
        min-width: 0 !important;
        width: 100% !important;
    }

    #dataListTarget h3 {
        font-size: 1rem !important;
        line-height: 1.3;
        word-break: break-word;
    }

    #dataListTarget span {
        word-break: break-word;
    }


    /* =====================================================
       APPOINTMENT SCHEDULE BOX
    ===================================================== */

    #dataListTarget > div > div:last-child {
        min-width: 0 !important;
        width: 100% !important;

        display: grid;
        grid-template-columns: 1fr 1fr;

        padding: 11px !important;
    }

    #dataListTarget > div > div:last-child strong {
        font-size: 0.82rem !important;
    }

    #dataListTarget > div > div:last-child span {
        font-size: 0.78rem !important;
    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    .admin-settings-panel {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .setting-inner-card {
        padding: 17px;
        border-radius: 14px;
    }

    .setting-inner-card h3 {
        font-size: 1rem !important;
        line-height: 1.3;
    }

    .setting-inner-card p {
        font-size: 0.8rem !important;
        line-height: 1.5;
    }

    .setting-inner-card > div {
        flex-wrap: wrap;
    }

    #bufferSettingSelect {
        min-height: 44px;
        font-size: 0.85rem;
    }

    #saveBufferBtn {
        min-height: 44px;
        padding-left: 18px !important;
        padding-right: 18px !important;
    }


    /* =====================================================
       SCHEDULE MANAGER
    ===================================================== */

    .schedule-manager-card {
        padding: 12px;
        border-radius: 15px;
        margin-bottom: 15px;
    }

    .schedule-layout {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .schedule-calendar-panel,
    .schedule-times-panel {
        padding: 14px;
        border-radius: 13px;
    }


    /* =====================================================
       DATE PICKER
    ===================================================== */

    .schedule-date-input {
        width: 100%;
        min-height: 46px;
        padding: 11px;
        font-size: 0.95rem;
    }

    #todayScheduleBtn,
    #toggleWholeDateBtn {
        min-height: 44px;
        font-size: 0.78rem;
    }


    /* =====================================================
       SCHEDULE HEADER
    ===================================================== */

    .block-date-banner {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .block-date-banner > div:last-child {
        width: 100%;
        text-align: left !important;

        display: flex;
        gap: 18px;
    }


    /* =====================================================
       TIME GRID
    ===================================================== */

    .schedule-time-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
        margin-top: 13px;
    }

    .schedule-time-btn {
        min-height: 58px;

        padding: 9px 5px;

        border-radius: 10px;

        font-size: 0.78rem;
        line-height: 1.2;
    }

    .schedule-time-status {
        font-size: 0.58rem;
        margin-top: 4px;
    }


    /* =====================================================
       SCHEDULE LEGEND
    ===================================================== */

    .schedule-legend {
        gap: 10px 16px;
        margin-top: 13px;
        padding-top: 11px;
    }

    .schedule-legend-item {
        font-size: 0.7rem;
    }

    .schedule-legend-dot {
        width: 9px;
        height: 9px;
    }


    /* =====================================================
       MOBILE TOUCH TARGETS
    ===================================================== */

    button,
    select,
    input {
        touch-action: manipulation;
    }

    button {
        -webkit-tap-highlight-color: transparent;
    }

}


/* ---------------------------------------------------------
   SMALL PHONES
--------------------------------------------------------- */

@media (max-width: 480px) {

    .dash-outer-wrap {
        padding: 14px 9px 25px;
    }


    /* =====================================================
       HEADER
    ===================================================== */

    .dash-title-block h1 {
        font-size: 1.35rem;
    }

    .dash-title-block p {
        font-size: 0.76rem;
    }

    .dash-header-row > div:last-child {
        grid-template-columns: 1fr;
    }

    .dash-header-row > div:last-child button {
        min-height: 43px;
    }


    /* =====================================================
       NAV
    ===================================================== */

    .admin-page-nav {
        margin-left: 0;
        margin-right: 0;
    }

    .admin-page-tab {
        padding: 9px 11px;
        font-size: 0.7rem;
    }


    /* =====================================================
       METRICS
    ===================================================== */

    .dash-metrics-grid {
        gap: 7px;
    }

    .dash-metrics-grid > div {
        padding: 11px !important;
    }

    .dash-metrics-grid h3 {
        font-size: 1.2rem !important;
    }


    /* =====================================================
       FILTERS
    ===================================================== */

    .dash-tab-row {
        grid-template-columns: 1fr 1fr;
    }

    .filter-tab {
        min-height: 42px;
        font-size: 0.68rem;
        padding: 8px 5px;
    }


    /* =====================================================
       SCHEDULE
    ===================================================== */

    .schedule-calendar-panel,
    .schedule-times-panel {
        padding: 12px;
    }

    .schedule-time-grid {
        gap: 6px;
    }

    .schedule-time-btn {
        min-height: 55px;
        font-size: 0.72rem;
    }

    .schedule-time-status {
        font-size: 0.54rem;
    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    .setting-inner-card {
        padding: 14px;
    }

    .setting-inner-card > div {
        display: flex !important;
        flex-direction: column;
        align-items: stretch !important;
    }

    #bufferSettingSelect,
    #saveBufferBtn {
        width: 100%;
    }


    /* =====================================================
       APPOINTMENT CARDS
    ===================================================== */

    #dataListTarget > div > div:last-child {
        display: block;
    }

}


/* ---------------------------------------------------------
   VERY SMALL PHONES
--------------------------------------------------------- */

@media (max-width: 360px) {

    .dash-outer-wrap {
        padding-left: 7px;
        padding-right: 7px;
    }

    .admin-page-tab {
        padding-left: 9px;
        padding-right: 9px;
    }

    .dash-metrics-grid {
        grid-template-columns: 1fr 1fr;
    }

    .schedule-time-grid {
        grid-template-columns: 1fr 1fr;
    }

    .schedule-time-btn {
        font-size: 0.68rem;
    }

}

        </style>

        <div class="dash-outer-wrap">

            <!-- =================================================
                 HEADER
            ================================================= -->

            <div class="dash-header-row">

                <div class="dash-title-block">

                    <h1>
                        DOT Screening Registry
                    </h1>

                    <p>
                        Appointment registry and scheduling control center.
                    </p>

                </div>

                <div
                    style="
                        display:flex;
                        gap:10px;
                        flex-wrap:wrap;
                    "
                >

                    <button
                        id="exportCsvBtn"
                        style="
                            background:#fff;
                            color:var(--green-primary);
                            border:1px solid var(--green-primary);
                            padding:10px 18px;
                            border-radius:10px;
                            font-weight:700;
                            cursor:pointer;
                        "
                    >
                        📊 Export CSV
                    </button>

                    <button
                        id="logoutBtn"
                        style="
                            background:transparent;
                            color:#666;
                            border:1px solid #ddd;
                            padding:10px 18px;
                            border-radius:10px;
                            font-weight:600;
                            cursor:pointer;
                        "
                    >
                        Sign Out
                    </button>

                </div>

            </div>

            <!-- =================================================
                 PAGE NAVIGATION
            ================================================= -->

            <nav class="admin-page-nav">

                <button
                    class="admin-page-tab active"
                    data-page="dashboardPage"
                >
                    📊 Dashboard
                </button>

                <button
                    class="admin-page-tab"
                    data-page="appointmentsPage"
                >
                    📋 Appointments
                </button>

                <button
                    class="admin-page-tab"
                    data-page="schedulePage"
                >
                    📅 Schedule
                </button>

                <button
                    class="admin-page-tab"
                    data-page="settingsPage"
                >
                    ⚙️ Settings
                </button>

            </nav>

            <!-- =================================================
                 DASHBOARD PAGE
            ================================================= -->

            <section
                id="dashboardPage"
                class="admin-page active"
            >

                <div
                    class="dash-metrics-grid"
                    id="metricsCounterMatrix"
                >

                    ${createMetricCard(
                        'Total Forms',
                        'statTotal',
                        'var(--purple-primary)'
                    )}

                    ${createMetricCard(
                        'DOT Physical',
                        'statPhysical',
                        'var(--purple-accent)'
                    )}

                    ${createMetricCard(
                        'Pre-Emp',
                        'statPre',
                        '#4f940c'
                    )}

                    ${createMetricCard(
                        'Random',
                        'statRandom',
                        'var(--purple-accent)'
                    )}

                    ${createMetricCard(
                        'Accident',
                        'statUrgent',
                        '#d90429'
                    )}

                    ${createMetricCard(
                        'Return Duty',
                        'statReturn',
                        '#0077b6'
                    )}

                    ${createMetricCard(
                        'Follow Up',
                        'statFollow',
                        '#f77f00'
                    )}

                </div>

                <div class="admin-card">

                    <h2 style="
                        margin:0 0 8px 0;
                        font-size:1.2rem;
                    ">
                        Scheduling Overview
                    </h2>

                    <p style="
                        color:#666;
                        margin:0;
                        line-height:1.5;
                    ">
                        Use the Schedule tab to manage appointment
                        availability, block individual times, or
                        close an entire date.
                    </p>

                </div>

            </section>

            <!-- =================================================
                 APPOINTMENTS PAGE
            ================================================= -->

            <section
                id="appointmentsPage"
                class="admin-page"
            >

                <div class="dash-control-card">

                    <div
                        class="dash-tab-row"
                        id="filterRow"
                    >

                        ${createFilterButton(
                            'All',
                            'All Forms',
                            true
                        )}

                        ${createFilterButton(
                            'DOT-Physical',
                            'DOT Physical'
                        )}

                        ${createFilterButton(
                            'Pre-Employment',
                            'Pre-Employment'
                        )}

                        ${createFilterButton(
                            'Random-Pool',
                            'Random Pool'
                        )}

                        ${createFilterButton(
                            'Post-Accident',
                            'Post-Accident'
                        )}

                        ${createFilterButton(
                            'Return-To-Duty',
                            'Return To Duty'
                        )}

                        ${createFilterButton(
                            'Follow-Up',
                            'Follow Up'
                        )}

                    </div>

                    <div style="
                        position:relative;
                        width:100%;
                    ">

                        <input
                            type="text"
                            id="dashboardSearch"
                            style="
                                width:100%;
                                padding:12px 16px 12px 40px;
                                border-radius:10px;
                                border:1px solid rgba(0,0,0,.08);
                                font-size:.95rem;
                                box-sizing:border-box;
                                background:#fafafa;
                            "
                            placeholder="Search name or CDL..."
                        />

                        <div style="
                            position:absolute;
                            left:14px;
                            top:13px;
                            color:#777;
                        ">
                            🔎
                        </div>

                    </div>

                </div>

                <div
                    id="dataListTarget"
                    style="
                        display:grid;
                        grid-template-columns:1fr;
                        gap:15px;
                    "
                >
                    <p style="
                        color:#666;
                        text-align:center;
                        padding:40px;
                    ">
                        Querying database secure tables...
                    </p>
                </div>

            </section>

            <!-- =================================================
                 SCHEDULE PAGE
            ================================================= -->

            <section
                id="schedulePage"
                class="admin-page"
            >

                <div
                    id="scheduleManagerTarget"
                >
                    <div class="schedule-manager-card">
                        Loading scheduling manager...
                    </div>
                </div>

            </section>

            <!-- =================================================
                 SETTINGS PAGE
            ================================================= -->

            <section
                id="settingsPage"
                class="admin-page"
            >

                <div class="admin-settings-panel">

                    <div class="setting-inner-card">

                        <h3 style="
                            margin:0 0 10px 0;
                            font-size:1.1rem;
                            font-weight:800;
                        ">
                            Appointment Buffer / Time Interval
                        </h3>

                        <p style="
                            font-size:.85rem;
                            color:#666;
                            margin:0 0 15px 0;
                            line-height:1.5;
                        ">
                            Controls how frequently appointment times
                            are generated throughout the clinic schedule.
                        </p>

                        <div style="
                            display:flex;
                            gap:10px;
                            align-items:center;
                        ">

                            <select
                                id="bufferSettingSelect"
                                style="
                                    flex:1;
                                    padding:10px;
                                    border-radius:8px;
                                    border:1px solid #ddd;
                                    font-weight:600;
                                "
                            >

                                <option value="15">
                                    Every 15 Minutes
                                </option>

                                <option value="30">
                                    Every 30 Minutes
                                </option>

                                <option value="45">
                                    Every 45 Minutes
                                </option>

                                <option value="60">
                                    Every 60 Minutes
                                </option>

                            </select>

                            <button
                                id="saveBufferBtn"
                                class="schedule-action-btn schedule-primary-btn"
                            >
                                Save
                            </button>

                        </div>

                    </div>

                    <div class="setting-inner-card">

                        <h3 style="
                            margin:0 0 10px 0;
                            font-size:1.1rem;
                            font-weight:800;
                        ">
                            Clinic Schedule
                        </h3>

                        <p style="
                            font-size:.85rem;
                            color:#666;
                            margin:0 0 15px 0;
                            line-height:1.5;
                        ">
                            Appointment availability currently generates
                            from 8:00 AM through 5:00 PM.
                        </p>

                        <div style="
                            background:#f7f4f9;
                            border-radius:10px;
                            padding:12px;
                            font-size:.85rem;
                            color:#555;
                        ">

                            <strong style="
                                color:var(--purple-primary);
                            ">
                                Current Hours:
                            </strong>

                            8:00 AM – 5:00 PM

                        </div>

                    </div>

                </div>

            </section>

        </div>
    `;

    bindDashboardEvents();
    bindAdminPageNavigation();
}

/* =========================================================
   ADMIN PAGE NAVIGATION
   ========================================================= */

function bindAdminPageNavigation() {

    const pageTabs =
        document.querySelectorAll(
            '.admin-page-tab'
        );

    const pages =
        document.querySelectorAll(
            '.admin-page'
        );

    pageTabs.forEach(tab => {

        tab.addEventListener(
            'click',
            () => {

                const targetPage =
                    tab.getAttribute(
                        'data-page'
                    );

                pageTabs.forEach(button => {

                    button.classList.remove(
                        'active'
                    );

                });

                pages.forEach(page => {

                    page.classList.remove(
                        'active'
                    );

                });

                tab.classList.add(
                    'active'
                );

                const page =
                    document.getElementById(
                        targetPage
                    );

                if (page) {

                    page.classList.add(
                        'active'
                    );

                }

                /*
                 * Refresh schedule whenever
                 * the Schedule tab is opened.
                 */

                if (
                    targetPage ===
                    'schedulePage'
                ) {

                    renderScheduleManager();

                }

            }
        );

    });

}

/* =========================================================
   CHECK IF SLOT HAS PASSED
   ========================================================= */

function isPastAppointmentSlot(
    date,
    slot
) {

    const today =
        getTodayLocalDate();

    if (date !== today) {
        return false;
    }

    const match =
        normalizeTimeLabel(slot)
            .match(
                /^(\d{2}):(\d{2})\s*(AM|PM)$/
            );

    if (!match) {
        return false;
    }

    let hours =
        parseInt(
            match[1],
            10
        );

    const minutes =
        parseInt(
            match[2],
            10
        );

    const period =
        match[3];

    if (
        period === 'PM' &&
        hours !== 12
    ) {
        hours += 12;
    }

    if (
        period === 'AM' &&
        hours === 12
    ) {
        hours = 0;
    }

    const slotDate =
        new Date();

    slotDate.setHours(
        hours,
        minutes,
        0,
        0
    );

    return (
        slotDate.getTime() <=
        Date.now()
    );
}

    /* =========================================================
       HTML HELPERS
    ========================================================= */

    function createMetricCard(label, id, color) {

        return `
            <div style="
                background:#fff;
                padding:15px;
                border-radius:14px;
                border:1px solid rgba(138,52,159,0.06);
                box-shadow:0 4px 15px rgba(0,0,0,0.01);
            ">

                <span style="
                    font-size:0.72rem;
                    font-weight:700;
                    color:#666;
                    text-transform:uppercase;
                    display:block;
                ">
                    ${label}
                </span>

                <h3
                    id="${id}"
                    style="
                        margin:5px 0 0 0;
                        font-size:1.5rem;
                        color:${color};
                        font-weight:800;
                    "
                >
                    0
                </h3>

            </div>
        `;
    }

    function createFilterButton(
        value,
        label,
        active
    ) {

        return `
            <button
                class="filter-tab ${active ? 'active' : ''}"
                data-filter="${value}"
            >
                ${label}
            </button>
        `;
    }

    /* =========================================================
       DASHBOARD EVENTS
    ========================================================= */

    function bindDashboardEvents() {

        const tabs =
            document.querySelectorAll('.filter-tab');

        tabs.forEach(tabButton => {

            tabButton.addEventListener(
                'click',
                () => {

                    tabs.forEach(button => {
                        button.classList.remove('active');
                    });

                    tabButton.classList.add('active');

                    activeFilter =
                        tabButton.getAttribute(
                            'data-filter'
                        );

                    populateDataGrid();
                }
            );

        });

        const searchInput =
            document.getElementById(
                'dashboardSearch'
            );

        if (searchInput) {

            searchInput.addEventListener(
                'input',
                event => {

                    searchQuery =
                        event.target.value
                            .toLowerCase()
                            .trim();

                    populateDataGrid();
                }
            );

        }

        const exportButton =
            document.getElementById(
                'exportCsvBtn'
            );

        if (exportButton) {

            exportButton.addEventListener(
                'click',
                exportRegistryToCsv
            );

        }

        const logoutButton =
            document.getElementById(
                'logoutBtn'
            );

        if (logoutButton) {

            logoutButton.addEventListener(
                'click',
                async () => {

                    await supabaseClientInstance
                        .auth
                        .signOut();

                    window.location.href =
                        'index.html';
                }
            );

        }

        const saveBufferButton =
            document.getElementById(
                'saveBufferBtn'
            );

        if (saveBufferButton) {

            saveBufferButton.addEventListener(
                'click',
                saveBufferRuleConfig
            );

        }

    }

    /* =========================================================
       LOAD SCHEDULING SETTINGS
    ========================================================= */

    async function loadSchedulingSystemSettings() {

        try {

            const {
                data,
                error
            } = await supabaseClientInstance
                .from('scheduling_settings')
                .select('*')
                .eq('id', 'dot_config')
                .maybeSingle();

            if (error) {

                console.error(
                    'Scheduling settings error:',
                    error
                );

                return;
            }

            if (data) {

                schedulingSettings = {
                    id: data.id,
                    buffer_minutes:
                        parseInt(
                            data.buffer_minutes,
                            10
                        ) || 30,
                    blocked_date_slots:
                        normalizeBlockedSlots(
                            data.blocked_date_slots
                        )
                };

            } else {

                /*
                 * If the configuration row does not yet exist,
                 * create the expected dot_config record.
                 */

                const defaultConfig = {
                    id: 'dot_config',
                    buffer_minutes: 30,
                    blocked_date_slots: {}
                };

                const {
                    error: insertError
                } = await supabaseClientInstance
                    .from('scheduling_settings')
                    .insert(defaultConfig);

                if (insertError) {

                    console.error(
                        'Unable to create scheduling configuration:',
                        insertError
                    );

                } else {

                    schedulingSettings =
                        defaultConfig;
                }

            }

            const bufferSelect =
                document.getElementById(
                    'bufferSettingSelect'
                );

            if (bufferSelect) {

                bufferSelect.value =
                    String(
                        schedulingSettings.buffer_minutes
                    );
            }

        } catch (error) {

            console.error(
                'Scheduling configuration load failed:',
                error
            );
        }
    }

    /* =========================================================
       NORMALIZE JSONB BLOCK STRUCTURE
       
       Expected format:
       
       {
           "2026-08-20": [
               "08:00 AM",
               "09:30 AM"
           ],
           "2026-08-21": [
               "10:00 AM"
           ]
       }
    ========================================================= */

    function normalizeBlockedSlots(value) {

        if (
            !value ||
            typeof value !== 'object' ||
            Array.isArray(value)
        ) {
            return {};
        }

        const normalized = {};

        Object.keys(value).forEach(dateKey => {

            if (Array.isArray(value[dateKey])) {

                normalized[dateKey] =
                    value[dateKey].map(
                        slot => String(slot)
                    );

            }

        });

        return normalized;
    }

    /* =========================================================
       SAVE BUFFER
    ========================================================= */

    async function saveBufferRuleConfig() {

        const select =
            document.getElementById(
                'bufferSettingSelect'
            );

        if (!select) {
            return;
        }

        const value =
            parseInt(
                select.value,
                10
            );

        if (
            ![15, 30, 45, 60].includes(value)
        ) {

       showAdminModal(
    'Please select a valid appointment interval.',
    'warning',
    'Invalid Interval'
);

            return;
        }

        const button =
            document.getElementById(
                'saveBufferBtn'
            );

        if (button) {
            button.disabled = true;
            button.innerText = 'Saving...';
        }

        const {
            error
        } = await supabaseClientInstance
            .from('scheduling_settings')
            .update({
                buffer_minutes: value,
                updated_at: new Date().toISOString()
            })
            .eq('id', 'dot_config');

        if (button) {
            button.disabled = false;
            button.innerText = 'Save';
        }

        if (error) {

       showAdminModal(
    `Error saving schedule interval:\n\n${error.message}`,
    'error',
    'Unable to Save Schedule'
);

            return;
        }

        schedulingSettings.buffer_minutes =
            value;

        renderScheduleManager();

       showAdminModal(
    `Appointment schedule now generates every ${value} minutes.`,
    'success',
    'Schedule Updated'
);
    }

    /* =========================================================
       FETCH APPOINTMENTS
    ========================================================= */

    async function fetchAppointments() {

        try {

            const {
                data,
                error
            } = await supabaseClientInstance
                .from('dot_appointments')
                .select('*')
                .order(
                    'booking_date',
                    { ascending: true }
                )
                .order(
                    'booking_time',
                    { ascending: true }
                );

            if (error) {
                throw error;
            }

            appointmentsData =
                data || [];

            calculateMetrics();

            populateDataGrid();

        } catch (error) {

            console.error(
                'Appointment retrieval error:',
                error
            );

            const grid =
                document.getElementById(
                    'dataListTarget'
                );

            if (grid) {

                grid.innerHTML = `
                    <p style="
                        color:#d90429;
                        font-weight:600;
                        text-align:center;
                        padding:30px;
                        border:1px dashed #d90429;
                        border-radius:12px;
                        background:#fff5f6;
                    ">
                        Error reading appointment records:
                        ${escapeHtml(error.message)}
                    </p>
                `;
            }
        }
    }

    /* =========================================================
       METRICS
    ========================================================= */

    function calculateMetrics() {

        const getCount = reason => {

            return appointmentsData.filter(
                appointment => {

                    const databaseValue =
                        (
                            appointment.testing_reason ||
                            ''
                        )
                            .toLowerCase()
                            .replace(
                                /[\s_-]/g,
                                ''
                            );

                    const targetValue =
                        reason
                            .toLowerCase()
                            .replace(
                                /[\s_-]/g,
                                ''
                            );

                    return (
                        databaseValue ===
                        targetValue
                    );
                }
            ).length;
        };

        setElementText(
            'statTotal',
            appointmentsData.length
        );

        setElementText(
            'statPhysical',
            getCount('DOT-Physical')
        );

        setElementText(
            'statPre',
            getCount('Pre-Employment')
        );

        setElementText(
            'statRandom',
            getCount('Random-Pool')
        );

        setElementText(
            'statUrgent',
            getCount('Post-Accident')
        );

        setElementText(
            'statReturn',
            getCount('Return-To-Duty')
        );

        setElementText(
            'statFollow',
            getCount('Follow-Up')
        );
    }

    /* =========================================================
       REGISTRY DATA GRID
    ========================================================= */

    function populateDataGrid() {

        const outputContainer =
            document.getElementById(
                'dataListTarget'
            );

        if (!outputContainer) {
            return;
        }

        const filtered =
            appointmentsData.filter(
                appointment => {

                    const databaseReason =
                        (
                            appointment.testing_reason ||
                            ''
                        )
                            .toLowerCase()
                            .replace(
                                /[\s_-]/g,
                                ''
                            );

                    const currentTab =
                        activeFilter
                            .toLowerCase()
                            .replace(
                                /[\s_-]/g,
                                ''
                            );

                    const matchesTab =
                        (
                            activeFilter === 'All' ||
                            databaseReason ===
                                currentTab
                        );

                    const matchesSearch =
                        (
                            (
                                appointment.client_name ||
                                ''
                            )
                                .toLowerCase()
                                .includes(
                                    searchQuery
                                )
                            ||
                            (
                                appointment.cdl_number ||
                                ''
                            )
                                .toLowerCase()
                                .includes(
                                    searchQuery
                                )
                        );

                    return (
                        matchesTab &&
                        matchesSearch
                    );
                }
            );

        if (filtered.length === 0) {

            outputContainer.innerHTML = `
                <div style="
                    background:#fff;
                    border:1px solid rgba(0,0,0,0.04);
                    text-align:center;
                    padding:40px 20px;
                    color:#666;
                    border-radius:12px;
                    font-weight:500;
                    font-size:0.95rem;
                ">
                    No screening appointments match your
                    filter criteria or search terms.
                </div>
            `;

            return;
        }

        outputContainer.innerHTML =
            filtered.map(
                appointment => {

                    let badgeColor =
                        '#8a349b';

                    let readableLabel =
                        appointment.testing_reason;

                    if (
                        appointment.testing_reason ===
                        'Pre-Employment'
                    ) {
                        badgeColor =
                            '#4f940c';
                    }

                    if (
                        appointment.testing_reason ===
                        'Post-Accident'
                    ) {
                        badgeColor =
                            '#d90429';
                    }

                    if (
                        appointment.testing_reason ===
                        'Return-To-Duty'
                    ) {

                        badgeColor =
                            '#0077b6';

                        readableLabel =
                            'Return to Duty';
                    }

                    if (
                        appointment.testing_reason ===
                        'Follow-Up'
                    ) {

                        badgeColor =
                            '#f77f00';

                        readableLabel =
                            'Follow Up';
                    }

                    if (
                        appointment.testing_reason ===
                        'DOT-Physical'
                    ) {

                        badgeColor =
                            '#4f940c';

                        readableLabel =
                            'DOT Physical';
                    }

                    return `
                        <div style="
                            background:#ffffff;
                            border:1px solid rgba(138,52,159,0.05);
                            border-radius:14px;
                            padding:clamp(15px,4vw,22px);
                            display:flex;
                            flex-wrap:wrap;
                            justify-content:space-between;
                            align-items:flex-start;
                            gap:15px;
                            box-shadow:0 4px 15px rgba(62,13,95,0.01);
                            box-sizing:border-box;
                            width:100%;
                        ">

                            <div style="
                                flex:1;
                                min-width:240px;
                            ">

                                <div style="
                                    display:flex;
                                    align-items:center;
                                    gap:10px;
                                    margin-bottom:8px;
                                    flex-wrap:wrap;
                                ">

                                    <h3 style="
                                        margin:0;
                                        color:var(--purple-primary);
                                        font-size:clamp(1.1rem,3vw,1.25rem);
                                        font-weight:800;
                                    ">
                                        ${escapeHtml(
                                            appointment.client_name
                                        )}
                                    </h3>

                                    <span style="
                                        font-size:0.7rem;
                                        background:rgba(138,52,159,0.02);
                                        color:${badgeColor};
                                        padding:3px 8px;
                                        border-radius:20px;
                                        font-weight:700;
                                        text-transform:uppercase;
                                        border:1px solid ${badgeColor}25;
                                        white-space:nowrap;
                                    ">
                                        ${escapeHtml(
                                            readableLabel
                                        )}
                                    </span>

                                </div>

                                <div style="
                                    font-size:0.85rem;
                                    color:#555;
                                    display:flex;
                                    flex-direction:column;
                                    gap:4px;
                                ">

                                    <span>
                                        🆔
                                        <strong>CDL:</strong>
                                        ${escapeHtml(
                                            appointment.cdl_number
                                        )}
                                    </span>

                                    <span>
                                        📞
                                        <strong>Phone:</strong>
                                        ${escapeHtml(
                                            appointment.client_phone
                                        )}
                                    </span>

                                    <span>
                                        ✉️
                                        <strong>Email:</strong>
                                        ${escapeHtml(
                                            appointment.client_email
                                        )}
                                    </span>

                                </div>

                            </div>

                            <div style="
                                text-align:left;
                                min-width:140px;
                                background:#fafafa;
                                padding:10px 14px;
                                border-radius:10px;
                                border:1px solid rgba(0,0,0,0.02);
                                box-sizing:border-box;
                                flex-shrink:0;
                            ">

                                <span style="
                                    font-size:0.7rem;
                                    font-weight:700;
                                    color:#777;
                                    text-transform:uppercase;
                                    display:block;
                                    margin-bottom:2px;
                                ">
                                    Schedule
                                </span>

                                <strong style="
                                    color:var(--purple-primary);
                                    font-size:0.95rem;
                                    display:block;
                                ">
                                    ${escapeHtml(
                                        appointment.booking_date
                                    )}
                                </strong>

                                <span style="
                                    color:var(--purple-accent);
                                    font-size:0.85rem;
                                    font-weight:600;
                                ">
                                    ⏱️
                                    ${escapeHtml(
                                        appointment.booking_time
                                    )}
                                </span>

                            </div>

                        </div>
                    `;
                }
            ).join('');
    }

    /* =========================================================
       SCHEDULE MANAGER
    ========================================================= */

    function renderScheduleManager() {

        const manager =
            document.getElementById(
                'scheduleManagerTarget'
            );

        if (!manager) {
            return;
        }

        const selectedDate =
            selectedScheduleDate;

        const dateBlocked =
            isDateBlocked(
                selectedDate
            );

        const blockedSlots =
            getBlockedSlotsForDate(
                selectedDate
            );

        const bookedSlots =
            getBookedSlotsForDate(
                selectedDate
            );

        const buffer =
            schedulingSettings.buffer_minutes ||
            30;

        const slots =
            generateTimeSlots(buffer);

        const readableDate =
            formatDateForDisplay(
                selectedDate
            );

        manager.innerHTML = `


                <div class="schedule-layout">

                    <!-- DATE PANEL -->

                    <div class="schedule-calendar-panel">

                        <div class="schedule-calendar-header">

                            <strong style="
                                color:var(--purple-primary);
                                font-size:0.95rem;
                            ">
                                Select Date
                            </strong>

                        </div>

                        <input
                            type="date"
                            id="scheduleDatePicker"
                            class="schedule-date-input"
                            value="${selectedDate}"
                            min="${getTodayLocalDate()}"
                        />

                        <div style="
                            margin-top:15px;
                            background:#fff;
                            border:1px solid #eee;
                            border-radius:12px;
                            padding:14px;
                        ">

                            <span style="
                                display:block;
                                font-size:0.7rem;
                                text-transform:uppercase;
                                font-weight:700;
                                color:#777;
                                margin-bottom:5px;
                            ">
                                Selected Date
                            </span>

                            <strong style="
                                display:block;
                                color:var(--purple-primary);
                                font-size:1.05rem;
                            ">
                                ${escapeHtml(
                                    readableDate
                                )}
                            </strong>

                        </div>

                        <div style="margin-top:15px;">

                            <button
                                type="button"
                                id="todayScheduleBtn"
                                class="schedule-action-btn schedule-neutral-btn"
                                style="width:100%;"
                            >
                                Go to Today
                            </button>

                        </div>

                        <div style="
                            margin-top:15px;
                        ">

                            <button
                                type="button"
                                id="toggleWholeDateBtn"
                                class="
                                    schedule-action-btn
                                    ${dateBlocked
                                        ? 'schedule-primary-btn'
                                        : 'schedule-danger-btn'}
                                "
                                style="width:100%;"
                            >
                                ${
                                    dateBlocked
                                        ? 'Unblock Entire Date'
                                        : 'Block Entire Date'
                                }
                            </button>

                        </div>

                        <div style="
                            margin-top:18px;
                            padding:12px;
                            border-radius:10px;
                            background:${
                                dateBlocked
                                    ? '#fff0f2'
                                    : '#f4faf0'
                            };
                            color:${
                                dateBlocked
                                    ? '#d90429'
                                    : '#4f940c'
                            };
                            font-size:0.8rem;
                            line-height:1.45;
                        ">

                            ${
                                dateBlocked
                                    ? '<strong>DATE BLOCKED</strong><br>Customers will not be able to select appointment times on this date.'
                                    : '<strong>DATE OPEN</strong><br>Individual appointment times can be blocked below.'
                            }

                        </div>

                    </div>

                    <!-- TIME PANEL -->

                    <div class="schedule-times-panel">

                        <div class="block-date-banner">

                            <div>

                                <strong style="
                                    display:block;
                                    color:var(--purple-primary);
                                    margin-bottom:4px;
                                ">
                                    ${escapeHtml(
                                        readableDate
                                    )}
                                </strong>

                                <span style="
                                    color:#666;
                                    font-size:0.8rem;
                                ">
                                    ${slots.length}
                                    generated appointment times
                                </span>

                            </div>

                            <div style="
                                font-size:0.75rem;
                                color:#666;
                                text-align:right;
                            ">

                                <div>
                                    <strong>
                                        ${bookedSlots.length}
                                    </strong>
                                    booked
                                </div>

                                <div>
                                    <strong>
                                        ${blockedSlots.length}
                                    </strong>
                                    blocked
                                </div>

                            </div>

                        </div>

                        <div class="schedule-day-status">

                            <strong>How this works:</strong>

                            Click an available time to block it.
                            Click a blocked time to make it available again.
                            Booked appointments cannot be altered from
                            the scheduling grid.

                        </div>

                        <div
                            id="scheduleTimeGrid"
                            class="schedule-time-grid"
                        >

                            ${
                                slots.length
                                    ? slots.map(
                                        slot =>
                                            createScheduleTimeButton(
                                                selectedDate,
                                                slot,
                                                dateBlocked,
                                                blockedSlots,
                                                bookedSlots
                                            )
                                      ).join('')
                                    : `
                                        <div style="
                                            grid-column:1/-1;
                                            padding:30px;
                                            text-align:center;
                                            color:#666;
                                        ">
                                            No appointment times generated.
                                        </div>
                                    `
                            }

                        </div>

                       <div class="schedule-legend">

    <div class="schedule-legend-item">
        <span class="schedule-legend-dot available"></span>
        <span>Available</span>
    </div>

    <div class="schedule-legend-item">
        <span class="schedule-legend-dot booked"></span>
        <span>Booked</span>
    </div>

    <div class="schedule-legend-item">
        <span class="schedule-legend-dot blocked"></span>
        <span>Blocked</span>
    </div>

</div>

<style>
.schedule-legend {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    margin-top: 15px;
    padding-top: 12px;
    border-top: 1px solid rgba(0,0,0,0.06);
}

.schedule-legend-item {
    display: flex;
    align-items: center;
    gap: 7px;
    color: #555;
    font-size: 0.78rem;
    font-weight: 700;
}

.schedule-legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
}

.schedule-legend-dot.available {
    background: #70ad47;
}

.schedule-legend-dot.booked {
    background: #d90429;
}

.schedule-legend-dot.blocked {
    background: #777;
}
    </style>

                    </div>

                </div>

            </div>
        `;

        bindScheduleManagerEvents();
    }

 function createScheduleTimeButton(
    date,
    slot,
    dateBlocked,
    blockedSlots,
    bookedSlots
) {

    const isBooked =
        bookedSlots.includes(slot);

    const isBlocked =
        blockedSlots.includes(slot);

    const isPast =
        isPastAppointmentSlot(
            date,
            slot
        );

    let status =
        'Available';

    let className =
        'schedule-time-btn';

    let disabled =
        false;

    if (dateBlocked) {

        status =
            'Date Blocked';

        className +=
            ' blocked';

        disabled = true;

    } else if (isBooked) {

        status =
            'Booked';

        className +=
            ' booked';

        disabled = true;

    } else if (isBlocked) {

        status =
            'Blocked';

        className +=
            ' blocked';

    } else if (isPast) {

        status =
            'Past';

        className +=
            ' past';

        disabled = true;

    }

    return `
        <button
            type="button"
            class="${className}"
            data-schedule-slot="${escapeHtml(slot)}"
            data-schedule-date="${escapeHtml(date)}"
            ${disabled ? 'disabled' : ''}
        >

            ${escapeHtml(slot)}

            <span class="schedule-time-status">
                ${status}
            </span>

        </button>
    `;
}

    /* =========================================================
       SCHEDULE EVENT BINDING
    ========================================================= */

    function bindScheduleManagerEvents() {

        const datePicker =
            document.getElementById(
                'scheduleDatePicker'
            );

        if (datePicker) {

            datePicker.addEventListener(
                'change',
                event => {

                    if (!event.target.value) {
                        return;
                    }

                    selectedScheduleDate =
                        event.target.value;

                    renderScheduleManager();
                }
            );
        }

        const todayButton =
            document.getElementById(
                'todayScheduleBtn'
            );

        if (todayButton) {

            todayButton.addEventListener(
                'click',
                () => {

                    selectedScheduleDate =
                        getTodayLocalDate();

                    renderScheduleManager();
                }
            );
        }

        const blockDateButton =
            document.getElementById(
                'toggleWholeDateBtn'
            );

        if (blockDateButton) {

            blockDateButton.addEventListener(
                'click',
                toggleEntireDate
            );
        }

        const timeButtons =
            document.querySelectorAll(
                '[data-schedule-slot]'
            );

        timeButtons.forEach(button => {

            button.addEventListener(
                'click',
                async () => {

                    const slot =
                        button.getAttribute(
                            'data-schedule-slot'
                        );

                    await toggleScheduleSlot(
                        selectedScheduleDate,
                        slot
                    );
                }
            );

        });
    }

async function toggleScheduleSlot(
    date,
    slot
) {

    if (
        isDateBlocked(date)
    ) {

      showAdminModal(
    'This entire date is blocked. Unblock the date before managing individual times.',
    'warning',
    'Date Currently Blocked'
);

        return;
    }

    if (
        isPastAppointmentSlot(
            date,
            slot
        )
    ) {

      showAdminModal(
    'This appointment time has already passed and cannot be changed.',
    'warning',
    'Appointment Time Passed'
);

        return;
    }

    const booked =
        getBookedSlotsForDate(
            date
        );

    if (
        booked.includes(slot)
    ) {

   showAdminModal(
    'This appointment time is already booked and cannot be blocked from the scheduling grid.',
    'warning',
    'Appointment Already Booked'
);

        return;
    }

    const current =
        getBlockedSlotsForDate(
            date
        );

    const exists =
        current.includes(slot);

    let updated;

    if (exists) {

        updated =
            current.filter(
                value =>
                    value !== slot
            );

    } else {

        updated =
            current.concat(slot);

    }

    const updatedObject = {
        ...schedulingSettings.blocked_date_slots
    };

    if (updated.length > 0) {

        updatedObject[date] =
            updated;

    } else {

        delete updatedObject[date];

    }

    await saveBlockedDateSlots(
        updatedObject
    );
}

async function toggleEntireDate() {

    const date = selectedScheduleDate;

    try {

        /*
         * Get the CURRENT database value first.
         * This prevents the browser's local state from
         * becoming out of sync with Supabase.
         */
        const {
            data,
            error: readError
        } = await supabaseClientInstance
            .from('scheduling_settings')
            .select('id, blocked_date_slots')
            .eq('id', 'dot_config')
            .single();

        if (readError) {

            console.error(
                'Unable to read scheduling settings:',
                readError
            );

          showAdminModal(
    `Unable to read scheduling settings:\n\n${readError.message}`,
    'error',
    'Unable to Load Schedule'
);

            return;
        }

        let blockedSlots =
            normalizeBlockedSlots(
                data.blocked_date_slots
            );

        const currentlyBlocked =
            Array.isArray(blockedSlots[date]) &&
            blockedSlots[date].includes('__ALL__');

        /*
         * ================================================
         * UNBLOCK ENTIRE DATE
         * ================================================
         */

        if (currentlyBlocked) {

            delete blockedSlots[date];

        }

        /*
         * ================================================
         * BLOCK ENTIRE DATE
         * ================================================
         */

        else {

            blockedSlots[date] = ['__ALL__'];

        }

        console.log(
            'Saving new blocked_date_slots:',
            blockedSlots
        );

        /*
         * Write the modified JSON back to Supabase.
         */

        const {
            data: updatedData,
            error: updateError
        } = await supabaseClientInstance
            .from('scheduling_settings')
            .update({
                blocked_date_slots: blockedSlots,
                updated_at: new Date().toISOString()
            })
            .eq('id', 'dot_config')
            .select('id, blocked_date_slots')
            .single();

        if (updateError) {

            console.error(
                'Unable to save scheduling settings:',
                updateError
            );

          showAdminModal(
    `Unable to save schedule change:\n\n${updateError.message}`,
    'error',
    'Unable to Save Schedule'
);

            return;
        }

        /*
         * IMPORTANT:
         * Use the value Supabase actually returned.
         */

        schedulingSettings.blocked_date_slots =
            normalizeBlockedSlots(
                updatedData.blocked_date_slots
            );

        console.log(
            'Confirmed database value:',
            schedulingSettings.blocked_date_slots
        );

        /*
         * Re-render the schedule.
         */

        renderScheduleManager();

   if (currentlyBlocked) {

    showAdminModal(
        `${formatDateForDisplay(date)} is now unblocked.`,
        'success',
        'Date Unblocked'
    );

} else {

    showAdminModal(
        `${formatDateForDisplay(date)} is now blocked.`,
        'success',
        'Date Blocked'
    );
}

    } catch (error) {

        console.error(
            'Entire date toggle failed:',
            error
        );

       showAdminModal(
    `Schedule change failed:\n\n${error.message}`,
    'error',
    'Schedule Change Failed'
);
    }
}

/* =========================================================
   SAVE BLOCKED DATE/TIME JSON
========================================================= */

async function saveBlockedDateSlots(blockedDateSlots) {

    try {

        console.log(
            'Saving scheduling settings:',
            blockedDateSlots
        );

        const {
            data,
            error
        } = await supabaseClientInstance
            .from('scheduling_settings')
            .update({
                blocked_date_slots: blockedDateSlots,
                updated_at: new Date().toISOString()
            })
            .eq('id', 'dot_config')
            .select('id, buffer_minutes, blocked_date_slots, updated_at')
            .single();

        if (error) {

            console.error(
                'Scheduling settings update failed:',
                error
            );

      showAdminModal(
    `Unable to update scheduling settings:\n\n${error.message}`,
    'error',
    'Unable to Update Schedule'
);

            return false;
        }

        console.log(
            'Scheduling settings saved:',
            data
        );

        /*
         * IMPORTANT:
         * Replace the local state with exactly what
         * Supabase returned.
         */

        schedulingSettings = {
            id: data.id,
            buffer_minutes:
                parseInt(
                    data.buffer_minutes,
                    10
                ) || 30,
            blocked_date_slots:
                normalizeBlockedSlots(
                    data.blocked_date_slots
                )
        };

        /*
         * Re-render using the confirmed database state.
         */

        renderScheduleManager();

        return true;

    } catch (error) {

        console.error(
            'Unexpected scheduling save error:',
            error
        );

      showAdminModal(
    `Unexpected scheduling error:\n\n${error.message}`,
    'error',
    'Unexpected Scheduling Error'
);

        return false;
    }
}
    /* =========================================================
       DATE BLOCK HELPERS
    ========================================================= */

    function isDateBlocked(date) {

        const slots =
            schedulingSettings
                .blocked_date_slots[date];

        return (
            Array.isArray(slots) &&
            slots.includes('__ALL__')
        );
    }

    function getBlockedSlotsForDate(
        date
    ) {

        const slots =
            schedulingSettings
                .blocked_date_slots[date];

        if (!Array.isArray(slots)) {
            return [];
        }

        return slots.filter(
            slot => slot !== '__ALL__'
        );
    }

    /* =========================================================
       GET BOOKED TIMES
    ========================================================= */

    function getBookedSlotsForDate(
        date
    ) {

        return appointmentsData
            .filter(
                appointment =>
                    appointment.booking_date ===
                    date
            )
            .map(
                appointment =>
                    normalizeTimeLabel(
                        appointment.booking_time
                    )
            );
    }

    /* =========================================================
       GENERATE TIME SLOTS
       
       Default:
       8:00 AM through 5:00 PM.
       
       The buffer/interval determines the increments.
    ========================================================= */

    function generateTimeSlots(
        intervalMinutes
    ) {

        const slots = [];

        let current =
            CLINIC_OPEN_MINUTES;

        while (
            current <=
            CLINIC_CLOSE_MINUTES
        ) {

            slots.push(
                minutesToTimeLabel(
                    current
                )
            );

            current +=
                intervalMinutes;
        }

        return slots;
    }

    /* =========================================================
       TIME FORMATTING
    ========================================================= */

    function minutesToTimeLabel(
        totalMinutes
    ) {

        let hours =
            Math.floor(
                totalMinutes / 60
            );

        const minutes =
            totalMinutes % 60;

        const suffix =
            hours >= 12
                ? 'PM'
                : 'AM';

        if (hours === 0) {
            hours = 12;
        }

        if (hours > 12) {
            hours -= 12;
        }

        return `
            ${String(hours).padStart(2, '0')}:
            ${String(minutes).padStart(2, '0')}
            ${suffix}
        `.replace(/\s+/g, ' ').trim();
    }

    function normalizeTimeLabel(
        value
    ) {

        if (!value) {
            return '';
        }

        const raw =
            String(value)
                .trim()
                .toUpperCase();

        const match =
            raw.match(
                /^(\d{1,2}):(\d{2})\s*(AM|PM)$/
            );

        if (!match) {
            return raw;
        }

        let hours =
            parseInt(
                match[1],
                10
            );

        const minutes =
            parseInt(
                match[2],
                10
            );

        const period =
            match[3];

        return `
            ${String(hours).padStart(2, '0')}:
            ${String(minutes).padStart(2, '0')}
            ${period}
        `.replace(/\s+/g, ' ').trim();
    }

    /* =========================================================
       DATE HELPERS
    ========================================================= */

    function getTodayLocalDate() {

        const now =
            new Date();

        const year =
            now.getFullYear();

        const month =
            String(
                now.getMonth() + 1
            ).padStart(2, '0');

        const day =
            String(
                now.getDate()
            ).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    function formatDateForDisplay(
        dateString
    ) {

        const parts =
            dateString.split('-');

        if (parts.length !== 3) {
            return dateString;
        }

        const date =
            new Date(
                Number(parts[0]),
                Number(parts[1]) - 1,
                Number(parts[2])
            );

        return date.toLocaleDateString(
            'en-US',
            {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }
        );
    }

    /* =========================================================
       CSV EXPORT
    ========================================================= */

    function exportRegistryToCsv() {

        if (
            appointmentsData.length === 0
        ) {

        showAdminModal(
    'There are currently no appointment entries available to export.',
    'info',
    'Nothing to Export'
);

            return;
        }

        const headers = [
            'Driver Name',
            'CDL Number',
            'Email',
            'Phone Number',
            'DOT Category',
            'Appointment Date',
            'Appointment Time'
        ];

        const csvRows = [
            headers.join(',')
        ];

        appointmentsData.forEach(
            appointment => {

                const rowData = [

                    `"${escapeCsv(
                        appointment.client_name
                    )}"`,

                    `"${escapeCsv(
                        appointment.cdl_number
                    )}"`,

                    `"${escapeCsv(
                        appointment.client_email
                    )}"`,

                    `"${escapeCsv(
                        appointment.client_phone
                    )}"`,

                    `"${escapeCsv(
                        appointment.testing_reason
                    )}"`,

                    `"${escapeCsv(
                        appointment.booking_date
                    )}"`,

                    `"${escapeCsv(
                        appointment.booking_time
                    )}"`
                ];

                csvRows.push(
                    rowData.join(',')
                );
            }
        );

        const csvContent =
            "data:text/csv;charset=utf-8," +
            csvRows.join('\n');

        const encodedUri =
            encodeURI(csvContent);

        const downloadLink =
            document.createElement('a');

        downloadLink.setAttribute(
            'href',
            encodedUri
        );

        downloadLink.setAttribute(
            'download',
            `DOT_Screening_Registry_${getTodayLocalDate()}.csv`
        );

        document.body.appendChild(
            downloadLink
        );

        downloadLink.click();

        document.body.removeChild(
            downloadLink
        );
    }

    /* =========================================================
       UTILITY FUNCTIONS
    ========================================================= */

    function setElementText(
        elementId,
        value
    ) {

        const element =
            document.getElementById(
                elementId
            );

        if (element) {
            element.innerText =
                String(value);
        }
    }

    function escapeHtml(
        value
    ) {

        return String(
            value == null
                ? ''
                : value
        )
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function escapeCsv(
        value
    ) {

        return String(
            value == null
                ? ''
                : value
        ).replace(
            /"/g,
            '""'
        );
    }

});