
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

let mailingListData = [];

let activeFilter = 'All';

let searchQuery = '';

let mailingListSearchQuery = '';

let wellnessOfferCodes = [];

let wellnessOfferSearchQuery = '';

/* =========================================================
   RANDOM POOL STATE
========================================================= */

let randomPoolMembers = [];
let activeRandomPoolType = 'DOT';
let randomPoolSearchQuery = '';
let randomPoolLoading = false;
let editingRandomPoolMemberId = null;
let randomPoolSettings = [];
let randomPoolSyncing = false;

let schedulingSettings = {
    id: 'dot_config',
    buffer_minutes: 30,
    blocked_date_slots: {},
    opening_time: '08:00',
    closing_time: '17:00'
};

let selectedScheduleDate = getTodayLocalDate();

/* =========================================================
   DEFAULT CLINIC SCHEDULE
========================================================= */

const DEFAULT_CLINIC_OPEN_TIME = '08:00';

const DEFAULT_CLINIC_CLOSE_TIME = '17:00';

function normalizeClinicTime(
    value,
    fallback
) {

    if (!value) {
        return fallback;
    }

    const raw =
        String(value)
            .trim();

    const match =
        raw.match(
            /^(\d{2}):(\d{2})(?::\d{2})?$/
        );

    if (!match) {
        return fallback;
    }

    const hours =
        parseInt(
            match[1],
            10
        );

    const minutes =
        parseInt(
            match[2],
            10
        );

    if (
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {
        return fallback;
    }

    return (
        String(hours).padStart(2, '0') +
        ':' +
        String(minutes).padStart(2, '0')
    );
}

function clinicTimeToMinutes(
    value
) {

    const normalized =
        normalizeClinicTime(
            value,
            DEFAULT_CLINIC_OPEN_TIME
        );

    const parts =
        normalized.split(':');

    return (
        parseInt(parts[0], 10) * 60 +
        parseInt(parts[1], 10)
    );
}

function formatClinicTimeForDisplay(
    value
) {

    const minutes =
        clinicTimeToMinutes(value);

    return minutesToTimeLabel(
        minutes
    );
}

  /* =========================================================
   AUTHENTICATION GUARD
========================================================= */

checkAuthenticationGuard();

async function checkAuthenticationGuard() {

    try {

        const {
            data: { session }
        } = await supabaseClientInstance.auth.getSession();

        if (!session) {

            renderSecureLoginForm();

            return;
        }

        /*
         * Build the dashboard first so all target
         * containers exist before database data is loaded.
         */
        renderDashboardStructure();

        /*
         * Load scheduling configuration.
         */
        await loadSchedulingSystemSettings();

        /*
         * IMPORTANT:
         *
         * Appointments and mailing list are loaded
         * independently.
         *
         * If one table fails, the other table will
         * still be allowed to load.
         */
        await Promise.allSettled([
            fetchAppointments(),
            fetchMailingList(),
            fetchRandomPoolMembers()
        ]);

        /*
         * Update all dashboard displays after
         * database loading has completed.
         */
        calculateMetrics();

        calculateMailingListMetrics();

        populateDataGrid();

        populateMailingList();

        renderScheduleManager();

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

            await Promise.allSettled([
                fetchAppointments(),
                fetchRandomPoolMembers()
            ]);

            renderScheduleManager();
            renderRandomPoolPage();
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
               RANDOM POOL
            ===================================================== */

            [data-random-member-card] > div:first-child {
                flex-direction:column;
            }

            [data-random-member-card] > div:first-child > div:last-child {
                width:100%;
            }

            [data-random-member-card] > div:first-child > div:last-child button {
                flex:1;
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

    #clinicOpeningTime,
    #clinicClosingTime,
    #saveClinicHoursBtn {
        width:100%;
        box-sizing:border-box;
        min-height:44px;
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
    #saveBufferBtn,
    #clinicOpeningTime,
    #clinicClosingTime,
    #saveClinicHoursBtn {
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
        data-page="mailingListPage"
    >
        📧 Mailing List
    </button>


    <button
        class="admin-page-tab"
        data-page="wellnessOffersPage"
    >
        🎟️ Wellness Offers
    </button>


    <button
        class="admin-page-tab"
        data-page="randomPoolPage"
    >
        🎲 Random Pool
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
     MAILING LIST PAGE
================================================= -->

<section
    id="mailingListPage"
    class="admin-page"
>

    <div class="dash-metrics-grid">

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
                Total Subscribers
            </span>

            <h3
                id="mailingListCount"
                style="
                    margin:5px 0 0 0;
                    font-size:1.5rem;
                    color:var(--purple-primary);
                    font-weight:800;
                "
            >
                0
            </h3>

        </div>

    </div>

    <div class="admin-card">

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            flex-wrap:wrap;
            margin-bottom:18px;
        ">

            <div>

                <h2 style="
                    margin:0 0 5px 0;
                    font-size:1.2rem;
                ">
                    Mailing List Subscribers
                </h2>

                <p style="
                    margin:0;
                    color:#666;
                    font-size:.85rem;
                ">
                    Everyone who has subscribed to the ReNew You
                    Health & Wellness mailing list.
                </p>

            </div>

            <button
                type="button"
                id="exportMailingListBtn"
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
                📊 Export Subscribers
            </button>

        </div>

        <div style="
            position:relative;
            width:100%;
            margin-bottom:18px;
        ">

            <input
                type="text"
                id="mailingListSearch"
                style="
                    width:100%;
                    padding:12px 16px 12px 40px;
                    border-radius:10px;
                    border:1px solid rgba(0,0,0,.08);
                    font-size:.95rem;
                    box-sizing:border-box;
                    background:#fafafa;
                "
                placeholder="Search subscriber email..."
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

        <div
            id="mailingListTarget"
            style="
                display:grid;
                grid-template-columns:1fr;
                gap:10px;
            "
        >
            <p style="
                color:#666;
                text-align:center;
                padding:30px;
            ">
                Loading mailing list...
            </p>
        </div>

    </div>

</section>



<!-- =================================================
     WELLNESS OFFERS PAGE
================================================= -->

<section
    id="wellnessOffersPage"
    class="admin-page"
>

    <!-- =================================================
         WELLNESS OFFER METRICS
    ================================================== -->

    <div
        class="dash-metrics-grid"
        style="
            margin-bottom:18px;
        "
    >

        <!-- TOTAL -->

        <div
            style="
                background:#fff;
                padding:18px;
                border-radius:14px;
                border:1px solid rgba(138,52,159,.06);
                box-shadow:0 4px 15px rgba(0,0,0,.03);
            "
        >

            <span
                style="
                    display:block;
                    font-size:.72rem;
                    font-weight:700;
                    color:#666;
                    text-transform:uppercase;
                "
            >
                Total Codes
            </span>


            <h3
                id="wellnessOfferTotalCount"
                style="
                    margin:6px 0 0;
                    font-size:1.7rem;
                    color:var(--purple-primary);
                    font-weight:800;
                "
            >
                0
            </h3>

        </div>


        <!-- UNUSED -->

        <div
            style="
                background:#fff;
                padding:18px;
                border-radius:14px;
                border:1px solid rgba(79,148,12,.08);
                box-shadow:0 4px 15px rgba(0,0,0,.03);
            "
        >

            <span
                style="
                    display:block;
                    font-size:.72rem;
                    font-weight:700;
                    color:#666;
                    text-transform:uppercase;
                "
            >
                Unredeemed
            </span>


            <h3
                id="wellnessOfferUnusedCount"
                style="
                    margin:6px 0 0;
                    font-size:1.7rem;
                    color:#4f940c;
                    font-weight:800;
                "
            >
                0
            </h3>

        </div>


        <!-- REDEEMED -->

        <div
            style="
                background:#fff;
                padding:18px;
                border-radius:14px;
                border:1px solid rgba(217,4,41,.08);
                box-shadow:0 4px 15px rgba(0,0,0,.03);
            "
        >

            <span
                style="
                    display:block;
                    font-size:.72rem;
                    font-weight:700;
                    color:#666;
                    text-transform:uppercase;
                "
            >
                Redeemed
            </span>


            <h3
                id="wellnessOfferRedeemedCount"
                style="
                    margin:6px 0 0;
                    font-size:1.7rem;
                    color:#d90429;
                    font-weight:800;
                "
            >
                0
            </h3>

        </div>

    </div>


    <!-- =================================================
         OFFER CODES CARD
    ================================================== -->

    <div
        class="admin-card"
    >

        <div
            style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                flex-wrap:wrap;
                margin-bottom:18px;
            "
        >

            <div>

                <h2
                    style="
                        margin:0 0 6px;
                        font-size:1.2rem;
                    "
                >
                    Wellness Offer Codes
                </h2>


                <p
                    style="
                        margin:0;
                        color:#666;
                        font-size:.85rem;
                    "
                >
                    Manage 10% GLP-1 Vitamin Injection
                    discount codes and redemptions.
                </p>

            </div>


            <button
                type="button"
                id="refreshWellnessOffersBtn"
                style="
                    background:#fff;
                    color:var(--purple-primary);
                    border:1px solid var(--purple-primary);
                    padding:10px 16px;
                    border-radius:10px;
                    font-weight:700;
                    cursor:pointer;
                "
            >
                ↻ Refresh
            </button>

        </div>


        <!-- SEARCH -->

        <div
            style="
                position:relative;
                margin-bottom:18px;
            "
        >

            <input
                type="text"
                id="wellnessOfferSearch"
                placeholder="Search email or discount code..."
                style="
                    width:100%;
                    box-sizing:border-box;
                    padding:12px 15px;
                    border-radius:10px;
                    border:1px solid #ddd;
                    background:#fafafa;
                    font-size:.9rem;
                    outline:none;
                "
            />

        </div>


        <!-- OFFER LIST -->

        <div
            id="wellnessOffersTarget"
        >

            <div
                style="
                    text-align:center;
                    color:#666;
                    padding:35px;
                "
            >
                Loading wellness offer codes...
            </div>

        </div>

    </div>

</section>


            <!-- =================================================
                 RANDOM POOL PAGE
            ================================================= -->

            <section
                id="randomPoolPage"
                class="admin-page"
            >

                <div class="admin-card" style="margin-bottom:20px;">

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:flex-start;
                        gap:18px;
                        flex-wrap:wrap;
                    ">

                        <div>
                            <h2 style="
                                margin:0 0 7px 0;
                                font-size:1.3rem;
                            ">
                                🎲 Random Testing Pool
                            </h2>

                            <p style="
                                margin:0;
                                color:#666;
                                font-size:.88rem;
                                line-height:1.55;
                                max-width:760px;
                            ">
                                Manage separate DOT and NON-DOT random
                                testing populations. Add, edit, activate,
                                or deactivate pool members.
                            </p>
                        </div>

                        <button
                            type="button"
                            id="addRandomPoolMemberBtn"
                            class="schedule-action-btn schedule-primary-btn"
                            style="
                                min-height:44px;
                                padding:11px 18px;
                                white-space:nowrap;
                            "
                        >
                            + Add Pool Member
                        </button>

                    </div>

                </div>


                <div
                    class="dash-metrics-grid"
                    style="margin-bottom:20px;"
                >

                    <div style="
                        background:#fff;
                        padding:18px;
                        border-radius:14px;
                        border:1px solid rgba(138,52,159,.06);
                        box-shadow:0 4px 15px rgba(0,0,0,.03);
                    ">
                        <span style="
                            display:block;
                            font-size:.72rem;
                            font-weight:700;
                            color:#666;
                            text-transform:uppercase;
                        ">
                            Active Members
                        </span>

                        <h3
                            id="randomPoolActiveCount"
                            style="
                                margin:6px 0 0;
                                font-size:1.7rem;
                                color:var(--purple-primary);
                                font-weight:800;
                            "
                        >
                            0
                        </h3>
                    </div>


                    <div style="
                        background:#fff;
                        padding:18px;
                        border-radius:14px;
                        border:1px solid rgba(79,148,12,.08);
                        box-shadow:0 4px 15px rgba(0,0,0,.03);
                    ">
                        <span style="
                            display:block;
                            font-size:.72rem;
                            font-weight:700;
                            color:#666;
                            text-transform:uppercase;
                        ">
                            Drug Eligible
                        </span>

                        <h3
                            id="randomPoolDrugCount"
                            style="
                                margin:6px 0 0;
                                font-size:1.7rem;
                                color:#4f940c;
                                font-weight:800;
                            "
                        >
                            0
                        </h3>
                    </div>


                    <div style="
                        background:#fff;
                        padding:18px;
                        border-radius:14px;
                        border:1px solid rgba(0,119,182,.08);
                        box-shadow:0 4px 15px rgba(0,0,0,.03);
                    ">
                        <span style="
                            display:block;
                            font-size:.72rem;
                            font-weight:700;
                            color:#666;
                            text-transform:uppercase;
                        ">
                            Alcohol Eligible
                        </span>

                        <h3
                            id="randomPoolAlcoholCount"
                            style="
                                margin:6px 0 0;
                                font-size:1.7rem;
                                color:#0077b6;
                                font-weight:800;
                            "
                        >
                            0
                        </h3>
                    </div>


                    <div style="
                        background:#fff;
                        padding:18px;
                        border-radius:14px;
                        border:1px solid rgba(217,4,41,.08);
                        box-shadow:0 4px 15px rgba(0,0,0,.03);
                    ">
                        <span style="
                            display:block;
                            font-size:.72rem;
                            font-weight:700;
                            color:#666;
                            text-transform:uppercase;
                        ">
                            Inactive / Removed
                        </span>

                        <h3
                            id="randomPoolInactiveCount"
                            style="
                                margin:6px 0 0;
                                font-size:1.7rem;
                                color:#d90429;
                                font-weight:800;
                            "
                        >
                            0
                        </h3>
                    </div>

                </div>


                <div class="admin-card" style="margin-bottom:20px;">

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:12px;
                        flex-wrap:wrap;
                        margin-bottom:15px;
                    ">

                        <div>
                            <h3 style="
                                margin:0 0 5px 0;
                                font-size:1.05rem;
                            ">
                                Pool Type
                            </h3>

                            <p style="
                                margin:0;
                                color:#777;
                                font-size:.8rem;
                            ">
                                DOT and NON-DOT populations remain separate.
                            </p>
                        </div>

                        <button
                            type="button"
                            id="refreshRandomPoolBtn"
                            class="schedule-action-btn schedule-neutral-btn"
                        >
                            ↻ Refresh
                        </button>

                    </div>


                    <div
                        id="randomPoolTypeTabs"
                        style="
                            display:flex;
                            gap:8px;
                            flex-wrap:wrap;
                        "
                    >

                        <button
                            type="button"
                            class="filter-tab active"
                            data-random-pool-type="DOT"
                        >
                            🚛 DOT Pool
                        </button>

                        <button
                            type="button"
                            class="filter-tab"
                            data-random-pool-type="NON_DOT"
                        >
                            👥 NON-DOT Pool
                        </button>

                    </div>

                </div>


                <div class="admin-card" style="margin-bottom:20px;">

                    <div style="
                        display:grid;
                        grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
                        gap:12px;
                    ">

                        <div style="
                            background:#f7f4f9;
                            border-radius:10px;
                            padding:13px;
                        ">
                            <span style="
                                display:block;
                                font-size:.68rem;
                                font-weight:700;
                                color:#777;
                                text-transform:uppercase;
                                margin-bottom:4px;
                            ">
                                Current Pool
                            </span>

                            <strong
                                id="randomPoolCurrentType"
                                style="
                                    color:var(--purple-primary);
                                    font-size:.95rem;
                                "
                            >
                                DOT
                            </strong>
                        </div>


                        <div style="
                            background:#f7f4f9;
                            border-radius:10px;
                            padding:13px;
                        ">
                            <span style="
                                display:block;
                                font-size:.68rem;
                                font-weight:700;
                                color:#777;
                                text-transform:uppercase;
                                margin-bottom:4px;
                            ">
                                Drug Rate
                            </span>

                            <strong
                                id="randomPoolDrugRate"
                                style="
                                    color:var(--purple-primary);
                                    font-size:.95rem;
                                "
                            >
                                —
                            </strong>
                        </div>


                        <div style="
                            background:#f7f4f9;
                            border-radius:10px;
                            padding:13px;
                        ">
                            <span style="
                                display:block;
                                font-size:.68rem;
                                font-weight:700;
                                color:#777;
                                text-transform:uppercase;
                                margin-bottom:4px;
                            ">
                                Alcohol Rate
                            </span>

                            <strong
                                id="randomPoolAlcoholRate"
                                style="
                                    color:var(--purple-primary);
                                    font-size:.95rem;
                                "
                            >
                                —
                            </strong>
                        </div>


                        <div style="
                            background:#f7f4f9;
                            border-radius:10px;
                            padding:13px;
                        ">
                            <span style="
                                display:block;
                                font-size:.68rem;
                                font-weight:700;
                                color:#777;
                                text-transform:uppercase;
                                margin-bottom:4px;
                            ">
                                Agency
                            </span>

                            <strong
                                id="randomPoolAgency"
                                style="
                                    color:var(--purple-primary);
                                    font-size:.95rem;
                                "
                            >
                                —
                            </strong>
                        </div>

                    </div>

                </div>


                <div class="admin-card">

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:15px;
                        flex-wrap:wrap;
                        margin-bottom:18px;
                    ">

                        <div>
                            <h2 style="
                                margin:0 0 5px 0;
                                font-size:1.15rem;
                            ">
                                Pool Members
                            </h2>

                            <p
                                id="randomPoolDescription"
                                style="
                                    margin:0;
                                    color:#666;
                                    font-size:.82rem;
                                "
                            >
                                Active DOT random pool members.
                            </p>
                        </div>

                    </div>


                    <div style="
                        position:relative;
                        width:100%;
                        margin-bottom:18px;
                    ">

                        <input
                            type="text"
                            id="randomPoolSearch"
                            style="
                                width:100%;
                                padding:12px 16px 12px 40px;
                                border-radius:10px;
                                border:1px solid rgba(0,0,0,.08);
                                font-size:.95rem;
                                box-sizing:border-box;
                                background:#fafafa;
                            "
                            placeholder="Search name, employer, CDL, email..."
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


                    <div
                        id="randomPoolTarget"
                        style="
                            display:grid;
                            grid-template-columns:1fr;
                            gap:10px;
                        "
                    >
                        <div style="
                            color:#666;
                            text-align:center;
                            padding:35px;
                        ">
                            Loading random pool...
                        </div>
                    </div>

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

                        <p
                            id="clinicHoursDescription"
                            style="
                                font-size:.85rem;
                                color:#666;
                                margin:0 0 15px 0;
                                line-height:1.5;
                            "
                        >
                            Appointment availability generates
                            from 8:00 AM – 5:00 PM.
                        </p>

                        <div style="
                            display:grid;
                            grid-template-columns:1fr 1fr auto;
                            gap:10px;
                            align-items:end;
                        ">

                            <div>

                                <label
                                    for="clinicOpeningTime"
                                    style="
                                        display:block;
                                        font-size:.75rem;
                                        font-weight:700;
                                        color:#555;
                                        margin-bottom:6px;
                                    "
                                >
                                    Opening Time
                                </label>

                                <input
                                    type="time"
                                    id="clinicOpeningTime"
                                    value="08:00"
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:10px;
                                        border-radius:8px;
                                        border:1px solid #ddd;
                                        font-weight:600;
                                        background:#fff;
                                    "
                                />

                            </div>

                            <div>

                                <label
                                    for="clinicClosingTime"
                                    style="
                                        display:block;
                                        font-size:.75rem;
                                        font-weight:700;
                                        color:#555;
                                        margin-bottom:6px;
                                    "
                                >
                                    Closing Time
                                </label>

                                <input
                                    type="time"
                                    id="clinicClosingTime"
                                    value="17:00"
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:10px;
                                        border-radius:8px;
                                        border:1px solid #ddd;
                                        font-weight:600;
                                        background:#fff;
                                    "
                                />

                            </div>

                            <button
                                type="button"
                                id="saveClinicHoursBtn"
                                class="schedule-action-btn schedule-primary-btn"
                                style="
                                    min-height:42px;
                                    white-space:nowrap;
                                "
                            >
                                Save Hours
                            </button>

                        </div>

                        <div style="
                            background:#f7f4f9;
                            border-radius:10px;
                            padding:12px;
                            margin-top:15px;
                            font-size:.85rem;
                            color:#555;
                        ">

                            <strong style="
                                color:var(--purple-primary);
                            ">
                                Current Hours:
                            </strong>

                            <span id="clinicHoursDisplay">
                                8:00 AM – 5:00 PM
                            </span>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    `;

    bindDashboardEvents();
    bindAdminPageNavigation();

    /*
     * Random Pool controls are rendered dynamically.
     * Bind them after the dashboard HTML exists.
     */
    bindRandomPoolEvents();
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


if (
    targetPage ===
    'mailingListPage'
) {

    fetchMailingList();

}


if (
    targetPage ===
    'appointmentsPage'
) {

    fetchAppointments();

}


if (
    targetPage ===
    'wellnessOffersPage'
) {

    fetchWellnessOfferCodes();

}



if (
    targetPage ===
    'randomPoolPage'
) {

    fetchRandomPoolMembers();

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
                        String(
                            event.target?.value || ''
                        )
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

        const saveClinicHoursButton =
            document.getElementById(
                'saveClinicHoursBtn'
            );

        if (saveClinicHoursButton) {

            saveClinicHoursButton.addEventListener(
                'click',
                saveClinicHours
            );

        }

const mailingListSearch =
    document.getElementById(
        'mailingListSearch'
    );

if (mailingListSearch) {

    mailingListSearch.addEventListener(
        'input',
        event => {

            mailingListSearchQuery =
                String(
                    event.target?.value || ''
                )
                    .toLowerCase()
                    .trim();

            populateMailingList();

        }
    );
}


const exportMailingListButton =
    document.getElementById(
        'exportMailingListBtn'
    );

if (exportMailingListButton) {

    exportMailingListButton.addEventListener(
        'click',
        exportMailingListToCsv
    );
}

const wellnessOfferSearch =
    document.getElementById(
        'wellnessOfferSearch'
    );


if (
    wellnessOfferSearch
) {

    wellnessOfferSearch.addEventListener(
        'input',
        event => {

            wellnessOfferSearchQuery =
                String(
                    event.target?.value || ''
                )
                    .toLowerCase()
                    .trim();


            populateWellnessOffers();

        }
    );

}


const refreshWellnessOffersButton =
    document.getElementById(
        'refreshWellnessOffersBtn'
    );


if (
    refreshWellnessOffersButton
) {

    refreshWellnessOffersButton.addEventListener(
        'click',
        fetchWellnessOfferCodes
    );

}


/* =========================================================
   RANDOM POOL EVENTS
   Bound after the dashboard is dynamically rendered.
========================================================= */

}

/* =========================================================
   RANDOM POOL EVENTS
   DYNAMIC DASHBOARD BINDINGS
========================================================= */

function bindRandomPoolEvents() {

    const randomPoolSearch =
        document.getElementById(
            'randomPoolSearch'
        );

    if (randomPoolSearch) {

        randomPoolSearch.oninput =
            event => {

                randomPoolSearchQuery =
                    String(
                        event.target?.value || ''
                    )
                        .toLowerCase()
                        .trim();

                populateRandomPool();

            };

    }


    const addRandomPoolMemberButton =
        document.getElementById(
            'addRandomPoolMemberBtn'
        );

    if (addRandomPoolMemberButton) {

        addRandomPoolMemberButton.onclick =
            () => openRandomPoolMemberForm();

    }


    const refreshRandomPoolButton =
        document.getElementById(
            'refreshRandomPoolBtn'
        );

    if (refreshRandomPoolButton) {

        refreshRandomPoolButton.onclick =
            () => fetchRandomPoolMembers();

    }


    document
        .querySelectorAll(
            '[data-random-pool-type]'
        )
        .forEach(
            button => {

                button.onclick =
                    () => {

                        const poolType =
                            button.getAttribute(
                                'data-random-pool-type'
                            );

                        if (
                            poolType !== 'DOT' &&
                            poolType !== 'NON_DOT'
                        ) {
                            return;
                        }

                        activeRandomPoolType =
                            poolType;

                        randomPoolSearchQuery =
                            '';

                        const search =
                            document.getElementById(
                                'randomPoolSearch'
                            );

                        if (search) {
                            search.value = '';
                        }

                        document
                            .querySelectorAll(
                                '[data-random-pool-type]'
                            )
                            .forEach(
                                tab => {

                                    tab.classList.toggle(
                                        'active',
                                        tab === button
                                    );

                                }
                            );

                        populateRandomPool();

                    };

            }
        );

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
                        ),

                    opening_time:
                        normalizeClinicTime(
                            data.opening_time,
                            DEFAULT_CLINIC_OPEN_TIME
                        ),

                    closing_time:
                        normalizeClinicTime(
                            data.closing_time,
                            DEFAULT_CLINIC_CLOSE_TIME
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
                    blocked_date_slots: {},
                    opening_time: DEFAULT_CLINIC_OPEN_TIME,
                    closing_time: DEFAULT_CLINIC_CLOSE_TIME
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

            const openingTimeInput =
                document.getElementById(
                    'clinicOpeningTime'
                );

            if (openingTimeInput) {

                openingTimeInput.value =
                    schedulingSettings.opening_time;
            }

            const closingTimeInput =
                document.getElementById(
                    'clinicClosingTime'
                );

            if (closingTimeInput) {

                closingTimeInput.value =
                    schedulingSettings.closing_time;
            }

            updateClinicHoursDisplay();

        } catch (error) {

            console.error(
                'Scheduling configuration load failed:',
                error
            );
        }
    }

    /* =========================================================
       SAVE CLINIC HOURS
    ========================================================= */

    async function saveClinicHours() {

        const openingInput =
            document.getElementById(
                'clinicOpeningTime'
            );

        const closingInput =
            document.getElementById(
                'clinicClosingTime'
            );

        const saveButton =
            document.getElementById(
                'saveClinicHoursBtn'
            );

        if (
            !openingInput ||
            !closingInput
        ) {
            return;
        }

        const openingTime =
            normalizeClinicTime(
                openingInput.value,
                DEFAULT_CLINIC_OPEN_TIME
            );

        const closingTime =
            normalizeClinicTime(
                closingInput.value,
                DEFAULT_CLINIC_CLOSE_TIME
            );

        const openingMinutes =
            clinicTimeToMinutes(
                openingTime
            );

        const closingMinutes =
            clinicTimeToMinutes(
                closingTime
            );

        if (
            openingMinutes >=
            closingMinutes
        ) {

            showAdminModal(
                'The opening time must be earlier than the closing time.',
                'warning',
                'Invalid Clinic Hours'
            );

            return;
        }

        if (saveButton) {

            saveButton.disabled = true;

            saveButton.innerText =
                'Saving...';
        }

        const {
            data,
            error
        } = await supabaseClientInstance
            .from('scheduling_settings')
            .update({
                opening_time:
                    openingTime,

                closing_time:
                    closingTime,

                updated_at:
                    new Date().toISOString()
            })
            .eq('id', 'dot_config')
            .select(
                'id, buffer_minutes, blocked_date_slots, opening_time, closing_time, updated_at'
            )
            .single();

        if (saveButton) {

            saveButton.disabled = false;

            saveButton.innerText =
                'Save Hours';
        }

        if (error) {

            console.error(
                'Error saving clinic hours:',
                error
            );

            showAdminModal(
                `Error saving clinic hours:\n\n${error.message}`,
                'error',
                'Unable to Save Clinic Hours'
            );

            return;
        }

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
                ),

            opening_time:
                normalizeClinicTime(
                    data.opening_time,
                    DEFAULT_CLINIC_OPEN_TIME
                ),

            closing_time:
                normalizeClinicTime(
                    data.closing_time,
                    DEFAULT_CLINIC_CLOSE_TIME
                )
        };

        openingInput.value =
            schedulingSettings.opening_time;

        closingInput.value =
            schedulingSettings.closing_time;

        updateClinicHoursDisplay();

        renderScheduleManager();

        showAdminModal(
            `Clinic appointment hours are now ${formatClinicTimeForDisplay(schedulingSettings.opening_time)} – ${formatClinicTimeForDisplay(schedulingSettings.closing_time)}.`,
            'success',
            'Clinic Hours Updated'
        );
    }

    /* =========================================================
       UPDATE CLINIC HOURS DISPLAY
    ========================================================= */

    function updateClinicHoursDisplay() {

        const hoursDisplay =
            document.getElementById(
                'clinicHoursDisplay'
            );

        const hoursDescription =
            document.getElementById(
                'clinicHoursDescription'
            );

        const openingTime =
            schedulingSettings.opening_time ||
            DEFAULT_CLINIC_OPEN_TIME;

        const closingTime =
            schedulingSettings.closing_time ||
            DEFAULT_CLINIC_CLOSE_TIME;

        const displayText =
            `${formatClinicTimeForDisplay(openingTime)} – ${formatClinicTimeForDisplay(closingTime)}`;

        if (hoursDisplay) {

            hoursDisplay.textContent =
                displayText;
        }

        if (hoursDescription) {

            hoursDescription.textContent =
                `Appointment availability generates from ${displayText}.`;
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

    const grid =
        document.getElementById(
            'dataListTarget'
        );

    try {

        if (grid) {

            grid.innerHTML = `
                <p style="
                    color:#666;
                    text-align:center;
                    padding:40px;
                ">
                    Loading appointment records...
                </p>
            `;

        }

        const {
            data,
            error
        } = await supabaseClientInstance

            .from('dot_appointments')

            .select('*')

            .order(
                'booking_date',
                {
                    ascending: true
                }
            )

            .order(
                'booking_time',
                {
                    ascending: true
                }
            );

        if (error) {

            console.error(
                'Supabase appointment error:',
                error
            );

            throw error;
        }

        appointmentsData =
            Array.isArray(data)
                ? data
                : [];

        console.log(
            'Appointments loaded:',
            appointmentsData.length,
            appointmentsData
        );

        calculateMetrics();

        populateDataGrid();

        return appointmentsData;

    } catch (error) {

        console.error(
            'Appointment retrieval error:',
            error
        );

        appointmentsData = [];

        if (grid) {

            grid.innerHTML = `
                <div style="
                    color:#d90429;
                    font-weight:600;
                    text-align:center;
                    padding:30px;
                    border:1px dashed #d90429;
                    border-radius:12px;
                    background:#fff5f6;
                ">

                    <strong>
                        Error reading appointment records
                    </strong>

                    <br><br>

                    ${escapeHtml(
                        error?.message ||
                        'Unknown database error.'
                    )}

                </div>
            `;

        }

        return [];
    }
}

/* =========================================================
   POPULATE WELLNESS OFFERS
========================================================= */

function populateWellnessOffers() {

    const target =
        document.getElementById(
            'wellnessOffersTarget'
        );


    if (!target) {

        return;

    }


    const search =
        String(
            wellnessOfferSearchQuery || ''
        )
            .toLowerCase()
            .trim();


    const filtered =
        wellnessOfferCodes.filter(
            offer => {

                const email =
                    String(
                        offer.email || ''
                    )
                    .toLowerCase();


                const code =
                    String(
                        offer.code || ''
                    )
                    .toLowerCase();


                return (
                    !search ||
                    email.includes(search) ||
                    code.includes(search)
                );

            }
        );


    if (
        filtered.length === 0
    ) {

        target.innerHTML = `

            <div
                style="
                    background:#fff;
                    border:1px solid rgba(0,0,0,.04);
                    text-align:center;
                    padding:40px 20px;
                    color:#666;
                    border-radius:12px;
                "
            >

                ${
                    wellnessOfferCodes.length === 0
                        ? 'No wellness offer codes yet.'
                        : 'No offer codes match your search.'
                }

            </div>

        `;

        return;

    }


    target.innerHTML =
        filtered.map(
            offer => {

                const created =
                    offer.created_at
                        ? new Date(
                            offer.created_at
                        ).toLocaleString(
                            'en-US'
                        )
                        : 'Unknown';


                const redeemedAt =
                    offer.redeemed_at
                        ? new Date(
                            offer.redeemed_at
                        ).toLocaleString(
                            'en-US'
                        )
                        : '';


                const isRedeemed =
                    offer.is_redeemed === true;


                return `

                    <div
                        style="
                            background:#fff;
                            border:1px solid rgba(138,52,159,.06);
                            border-radius:14px;
                            padding:17px;
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                            gap:18px;
                            flex-wrap:wrap;
                            box-shadow:
                                0 4px 15px
                                rgba(62,13,95,.02);
                        "
                    >

                        <div
                            style="
                                display:flex;
                                align-items:center;
                                gap:13px;
                                min-width:0;
                                flex:1;
                            "
                        >

                            <div
                                style="
                                    width:44px;
                                    height:44px;
                                    border-radius:50%;
                                    background:
                                        rgba(138,52,159,.08);
                                    color:
                                        var(--purple-primary);
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                    flex-shrink:0;
                                "
                            >
                                🎟️
                            </div>


                            <div
                                style="
                                    min-width:0;
                                "
                            >

                                <div
                                    style="
                                        color:
                                            var(--purple-primary);
                                        font-weight:800;
                                        font-size:.92rem;
                                        word-break:break-word;
                                    "
                                >
                                    ${escapeHtml(
                                        offer.email
                                    )}
                                </div>


                                <div
                                    style="
                                        margin-top:4px;
                                        font-size:.78rem;
                                        color:#666;
                                    "
                                >
                                    Code:
                                    <strong
                                        style="
                                            color:
                                                var(--purple-primary);
                                            letter-spacing:1px;
                                        "
                                    >
                                        ${escapeHtml(
                                            offer.code
                                        )}
                                    </strong>
                                </div>


                                <div
                                    style="
                                        margin-top:3px;
                                        font-size:.72rem;
                                        color:#888;
                                    "
                                >
                                    Created:
                                    ${escapeHtml(
                                        created
                                    )}
                                </div>


                                ${
                                    isRedeemed
                                        ? `
                                            <div
                                                style="
                                                    margin-top:4px;
                                                    font-size:.72rem;
                                                    color:#666;
                                                "
                                            >
                                                Redeemed:
                                                ${escapeHtml(
                                                    redeemedAt
                                                )}

                                                ${
                                                    offer.redeemed_location
                                                        ? ` · ${escapeHtml(
                                                            offer.redeemed_location
                                                        )}`
                                                        : ''
                                                }

                                            </div>
                                        `
                                        : ''
                                }

                            </div>

                        </div>


                        <div
                            style="
                                display:flex;
                                align-items:center;
                                gap:10px;
                                flex-wrap:wrap;
                            "
                        >

                            ${
                                isRedeemed

                                    ? `

                                        <span
                                            style="
                                                display:inline-flex;
                                                align-items:center;
                                                padding:8px 12px;
                                                border-radius:20px;
                                                background:#eef8e9;
                                                color:#4f940c;
                                                font-size:.72rem;
                                                font-weight:800;
                                            "
                                        >
                                            ✓ REDEEMED
                                        </span>

                                        <button
                                            type="button"
                                            class="wellness-undo-btn"
                                            data-offer-id="${escapeHtml(
                                                offer.id
                                            )}"
                                            style="
                                                border:1px solid #ddd;
                                                background:#fff;
                                                color:#777;
                                                padding:8px 12px;
                                                border-radius:8px;
                                                font-size:.72rem;
                                                font-weight:700;
                                                cursor:pointer;
                                            "
                                        >
                                            Undo
                                        </button>

                                    `

                                    : `

                                        <button
                                            type="button"
                                            class="wellness-redeem-btn"
                                            data-offer-id="${escapeHtml(
                                                offer.id
                                            )}"
                                            style="
                                                border:0;
                                                background:
                                                    linear-gradient(
                                                        135deg,
                                                        #8a349b,
                                                        #6f2b82
                                                    );
                                                color:#fff;
                                                padding:10px 17px;
                                                border-radius:9px;
                                                font-size:.75rem;
                                                font-weight:800;
                                                cursor:pointer;
                                                box-shadow:
                                                    0 5px 14px
                                                    rgba(
                                                        111,
                                                        43,
                                                        130,
                                                        .18
                                                    );
                                            "
                                        >
                                            ✓ REDEEM
                                        </button>

                                    `

                            }

                        </div>

                    </div>

                `;

            }
        )
        .join('');


    bindWellnessOfferButtons();

}

/* =========================================================
   WELLNESS OFFER BUTTONS
========================================================= */

function bindWellnessOfferButtons() {

    const redeemButtons =
        document.querySelectorAll(
            '.wellness-redeem-btn'
        );


    redeemButtons.forEach(
        button => {

            button.addEventListener(
                'click',
                () => {

                    const offerId =
                        button.getAttribute(
                            'data-offer-id'
                        );


                    openWellnessRedeemChoice(
                        offerId
                    );

                }
            );

        }
    );


    const undoButtons =
        document.querySelectorAll(
            '.wellness-undo-btn'
        );


    undoButtons.forEach(
        button => {

            button.addEventListener(
                'click',
                () => {

                    const offerId =
                        button.getAttribute(
                            'data-offer-id'
                        );


                    undoWellnessRedemption(
                        offerId
                    );

                }
            );

        }
    );

}

function openWellnessRedeemChoice(
    offerId
) {

    const offer =
        wellnessOfferCodes.find(
            item =>
                item.id === offerId
        );


    if (!offer) {

        return;

    }


    const overlay =
        document.createElement(
            'div'
        );


    overlay.id =
        'wellnessRedeemChoiceModal';


    overlay.style.cssText = `
        position:fixed;
        inset:0;
        z-index:1000000;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
        background:rgba(35,17,43,.65);
        backdrop-filter:blur(6px);
    `;


    overlay.innerHTML = `

        <div
            style="
                width:min(100%,430px);
                background:#fff;
                border-radius:18px;
                padding:28px;
                box-shadow:
                    0 25px 80px
                    rgba(0,0,0,.25);
                box-sizing:border-box;
            "
        >

            <div
                style="
                    width:55px;
                    height:55px;
                    margin:0 auto 15px;
                    border-radius:50%;
                    background:
                        rgba(138,52,159,.1);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:25px;
                "
            >
                🎟️
            </div>


            <h3
                style="
                    margin:0 0 8px;
                    text-align:center;
                    color:#4f176d;
                    font-size:1.2rem;
                "
            >
                Redeem Wellness Offer
            </h3>


            <p
                style="
                    margin:0 0 5px;
                    text-align:center;
                    color:#555;
                    font-size:.88rem;
                "
            >
                ${escapeHtml(
                    offer.email
                )}
            </p>


            <p
                style="
                    margin:0 0 22px;
                    text-align:center;
                    color:#777;
                    font-size:.78rem;
                "
            >
                Code:
                <strong>
                    ${escapeHtml(
                        offer.code
                    )}
                </strong>
            </p>


            <p
                style="
                    margin:0 0 10px;
                    text-align:center;
                    color:#444;
                    font-weight:700;
                    font-size:.82rem;
                "
            >
                How was this offer redeemed?
            </p>


            <div
                style="
                    display:grid;
                    grid-template-columns:1fr 1fr;
                    gap:10px;
                "
            >

                <button
                    type="button"
                    id="redeemInPersonBtn"
                    style="
                        border:0;
                        border-radius:10px;
                        padding:13px 10px;
                        background:#8a349b;
                        color:#fff;
                        font-weight:800;
                        cursor:pointer;
                    "
                >
                    IN PERSON
                </button>


                <button
                    type="button"
                    id="redeemPhoneBtn"
                    style="
                        border:0;
                        border-radius:10px;
                        padding:13px 10px;
                        background:#6f2b82;
                        color:#fff;
                        font-weight:800;
                        cursor:pointer;
                    "
                >
                    OVER PHONE
                </button>

            </div>


            <button
                type="button"
                id="cancelRedeemBtn"
                style="
                    width:100%;
                    margin-top:10px;
                    padding:11px;
                    border:1px solid #ddd;
                    border-radius:10px;
                    background:#fff;
                    color:#666;
                    font-weight:700;
                    cursor:pointer;
                "
            >
                CANCEL
            </button>

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    document
        .getElementById(
            'redeemInPersonBtn'
        )
        .addEventListener(
            'click',
            async () => {

                await redeemWellnessOffer(
                    offerId,
                    'In Person'
                );

                overlay.remove();

            }
        );


    document
        .getElementById(
            'redeemPhoneBtn'
        )
        .addEventListener(
            'click',
            async () => {

                await redeemWellnessOffer(
                    offerId,
                    'Over the Phone'
                );

                overlay.remove();

            }
        );


    document
        .getElementById(
            'cancelRedeemBtn'
        )
        .addEventListener(
            'click',
            () => {

                overlay.remove();

            }
        );

}


/* =========================================================
   REDEEM WELLNESS OFFER
========================================================= */

async function redeemWellnessOffer(
    offerId,
    location
) {

    try {

        const {
            error
        } =
            await supabaseClientInstance

                .from(
                    'wellness_offer_codes'
                )

                .update({

                    is_redeemed:
                        true,

                    redeemed_at:
                        new Date()
                            .toISOString(),

                    redeemed_location:
                        location

                })

                .eq(
                    'id',
                    offerId
                );


        if (error) {

            throw error;

        }


        showAdminModal(
            `The wellness offer has been marked as redeemed.\n\nLocation: ${location}`,
            'success',
            'Offer Redeemed'
        );


        await fetchWellnessOfferCodes();


    } catch (error) {

        console.error(
            'Wellness redemption error:',
            error
        );


        showAdminModal(
            `Unable to redeem this offer:\n\n${error.message}`,
            'error',
            'Redemption Failed'
        );

    }

}

/* =========================================================
   UNDO WELLNESS REDEMPTION
========================================================= */

/* =========================================================
   WELLNESS REDEMPTION CONFIRMATION POPUP
========================================================= */

function showWellnessUndoConfirmation() {

    return new Promise(
        resolve => {

            const existing =
                document.getElementById(
                    'wellnessUndoConfirmOverlay'
                );

            if (existing) {
                existing.remove();
            }


            const overlay =
                document.createElement(
                    'div'
                );


            overlay.id =
                'wellnessUndoConfirmOverlay';


            overlay.setAttribute(
                'role',
                'dialog'
            );

            overlay.setAttribute(
                'aria-modal',
                'true'
            );

            overlay.setAttribute(
                'aria-labelledby',
                'wellnessUndoConfirmTitle'
            );


            overlay.style.cssText = `
                position:fixed;
                inset:0;
                z-index:1000000;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:20px;
                box-sizing:border-box;
                background:rgba(37,12,52,.58);
                backdrop-filter:blur(6px);
            `;


            overlay.innerHTML = `

                <div
                    class="wellness-undo-confirm-card"
                    style="
                        width:min(470px,100%);
                        box-sizing:border-box;
                        background:#fff;
                        border-radius:20px;
                        padding:28px;
                        box-shadow:0 25px 80px rgba(0,0,0,.25);
                        text-align:center;
                        animation:wellnessUndoConfirmIn .18s ease-out;
                    "
                >

                    <div style="
                        width:58px;
                        height:58px;
                        margin:0 auto 15px;
                        border-radius:50%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        background:#f7f4f9;
                        color:var(--purple-primary,#3E0D5F);
                        font-size:27px;
                        font-weight:800;
                    ">
                        ↶
                    </div>


                    <h2
                        id="wellnessUndoConfirmTitle"
                        style="
                            margin:0 0 10px;
                            color:var(--purple-primary,#3E0D5F);
                            font-size:1.2rem;
                            font-weight:800;
                        "
                    >
                        Undo Redemption?
                    </h2>


                    <p style="
                        margin:0 auto;
                        max-width:380px;
                        color:#666;
                        font-size:.92rem;
                        line-height:1.6;
                    ">
                        Are you sure you want to mark this
                        wellness offer as unused again?
                    </p>


                    <div style="
                        display:flex;
                        justify-content:center;
                        gap:10px;
                        flex-wrap:wrap;
                        margin-top:24px;
                    ">

                        <button
                            type="button"
                            id="wellnessUndoConfirmCancel"
                            style="
                                min-width:120px;
                                padding:11px 18px;
                                border:1px solid #ddd;
                                border-radius:10px;
                                background:#fff;
                                color:#555;
                                font-weight:700;
                                font-size:.85rem;
                                cursor:pointer;
                            "
                        >
                            Cancel
                        </button>


                        <button
                            type="button"
                            id="wellnessUndoConfirmYes"
                            style="
                                min-width:150px;
                                padding:11px 18px;
                                border:none;
                                border-radius:10px;
                                background:var(--purple-primary,#3E0D5F);
                                color:#fff;
                                font-weight:700;
                                font-size:.85rem;
                                cursor:pointer;
                                box-shadow:0 5px 15px rgba(62,13,95,.18);
                            "
                        >
                            Yes, Undo Redemption
                        </button>

                    </div>

                </div>
            `;


            if (
                !document.getElementById(
                    'wellnessUndoConfirmAnimation'
                )
            ) {

                const style =
                    document.createElement(
                        'style'
                    );

                style.id =
                    'wellnessUndoConfirmAnimation';

                style.textContent = `
                    @keyframes wellnessUndoConfirmIn {
                        from {
                            opacity:0;
                            transform:translateY(8px) scale(.98);
                        }

                        to {
                            opacity:1;
                            transform:translateY(0) scale(1);
                        }
                    }

                    #wellnessUndoConfirmYes:hover {
                        filter:brightness(1.08);
                    }

                    #wellnessUndoConfirmCancel:hover {
                        background:#f7f4f9;
                    }

                    @media (max-width:480px) {
                        .wellness-undo-confirm-card {
                            padding:23px !important;
                        }

                        #wellnessUndoConfirmCancel,
                        #wellnessUndoConfirmYes {
                            width:100%;
                        }
                    }
                `;

                document.head.appendChild(
                    style
                );

            }


            document.body.appendChild(
                overlay
            );


            const finish =
                value => {

                    overlay.remove();

                    document.body.style.overflow =
                        '';

                    resolve(value);

                };


            const cancelButton =
                overlay.querySelector(
                    '#wellnessUndoConfirmCancel'
                );


            const confirmButton =
                overlay.querySelector(
                    '#wellnessUndoConfirmYes'
                );


            cancelButton?.addEventListener(
                'click',
                () => finish(false)
            );


            confirmButton?.addEventListener(
                'click',
                () => finish(true)
            );


            overlay.addEventListener(
                'click',
                event => {

                    if (
                        event.target ===
                        overlay
                    ) {

                        finish(false);

                    }

                }
            );


            const keyHandler =
                event => {

                    if (
                        event.key ===
                        'Escape'
                    ) {

                        document.removeEventListener(
                            'keydown',
                            keyHandler
                        );

                        finish(false);

                    }

                };


            document.addEventListener(
                'keydown',
                keyHandler
            );


            document.body.style.overflow =
                'hidden';


            setTimeout(
                () => {

                    confirmButton?.focus();

                },
                50
            );

        }
    );

}


/* =========================================================
   UNDO WELLNESS REDEMPTION
========================================================= */

async function undoWellnessRedemption(
    offerId
) {

    const confirmed =
        await showWellnessUndoConfirmation();


    if (!confirmed) {

        return;

    }


    try {

        const {
            error
        } =
            await supabaseClientInstance

                .from(
                    'wellness_offer_codes'
                )

                .update({

                    is_redeemed:
                        false,

                    redeemed_at:
                        null,

                    redeemed_location:
                        null

                })

                .eq(
                    'id',
                    offerId
                );


        if (error) {

            throw error;

        }


        showAdminModal(
            'The wellness offer has been returned to unused status.',
            'success',
            'Redemption Reversed'
        );


        await fetchWellnessOfferCodes();


    } catch (error) {

        console.error(
            'Undo redemption error:',
            error
        );


        showAdminModal(
            `Unable to reverse this redemption:\n\n${error.message}`,
            'error',
            'Unable to Update Offer'
        );

    }

}
/* =========================================================
   FETCH WELLNESS OFFER CODES
========================================================= */

async function fetchWellnessOfferCodes() {

    const target =
        document.getElementById(
            'wellnessOffersTarget'
        );


    try {

        if (target) {

            target.innerHTML = `
                <div style="
                    text-align:center;
                    padding:40px;
                    color:#666;
                ">
                    Loading wellness offer codes...
                </div>
            `;

        }


        const {
            data,
            error
        } =
            await supabaseClientInstance

                .from(
                    'wellness_offer_codes'
                )

                .select(`
                    id,
                    email,
                    code,
                    offer_name,
                    discount_percent,
                    created_at,
                    expires_at,
                    redeemed_at,
                    redeemed_location,
                    is_redeemed
                `)

                .order(
                    'created_at',
                    {
                        ascending:false
                    }
                );


        if (error) {

            throw error;

        }


        wellnessOfferCodes =
            data || [];


        calculateWellnessOfferMetrics();

        populateWellnessOffers();


    } catch (error) {

        console.error(
            'Wellness offer code retrieval error:',
            error
        );


        wellnessOfferCodes = [];


        if (target) {

            target.innerHTML = `

                <div style="
                    color:#d90429;
                    font-weight:600;
                    text-align:center;
                    padding:30px;
                    border:1px dashed #d90429;
                    border-radius:12px;
                    background:#fff5f6;
                ">

                    Unable to load wellness offer codes:

                    <br><br>

                    ${escapeHtml(
                        error.message
                    )}

                </div>

            `;

        }


        calculateWellnessOfferMetrics();

    }

}
 /* =========================================================
   FETCH MAILING LIST
========================================================= */

async function fetchMailingList() {

    const target =
        document.getElementById(
            'mailingListTarget'
        );

    try {

        if (target) {

            target.innerHTML = `
                <p style="
                    color:#666;
                    text-align:center;
                    padding:30px;
                ">
                    Loading mailing list...
                </p>
            `;

        }

        const {
            data,
            error
        } = await supabaseClientInstance

            .from('Renew You Health Leads')

            .select(
                'id, email, created_at'
            )

            .order(
                'created_at',
                {
                    ascending: false
                }
            );

        if (error) {

            console.error(
                'Supabase mailing-list error:',
                error
            );

            throw error;
        }

        mailingListData =
            Array.isArray(data)
                ? data
                : [];

        console.log(
            'Mailing-list subscribers loaded:',
            mailingListData.length,
            mailingListData
        );

        calculateMailingListMetrics();

        populateMailingList();

        return mailingListData;

    } catch (error) {

        console.error(
            'Mailing list retrieval error:',
            error
        );

        mailingListData = [];

        if (target) {

            target.innerHTML = `
                <div style="
                    color:#d90429;
                    font-weight:600;
                    text-align:center;
                    padding:30px;
                    border:1px dashed #d90429;
                    border-radius:12px;
                    background:#fff5f6;
                ">

                    <strong>
                        Unable to load mailing list
                    </strong>

                    <br><br>

                    ${escapeHtml(
                        error?.message ||
                        'Unknown database error.'
                    )}

                </div>
            `;

        }

        calculateMailingListMetrics();

        return [];
    }
}

/* =========================================================
   WELLNESS OFFER METRICS
========================================================= */

function calculateWellnessOfferMetrics() {

    const total =
        wellnessOfferCodes.length;


    const redeemed =
        wellnessOfferCodes.filter(
            offer =>
                offer.is_redeemed === true
        ).length;


    const unused =
        total -
        redeemed;


    setElementText(
        'wellnessOfferTotalCount',
        total
    );


    setElementText(
        'wellnessOfferUnusedCount',
        unused
    );


    setElementText(
        'wellnessOfferRedeemedCount',
        redeemed
    );

}
 /* =========================================================
   APPOINTMENT METRICS
========================================================= */

function calculateMetrics() {

    const getCount = reason => {

        const targetValue =
            String(reason || '')
                .toLowerCase()
                .replace(
                    /[\s_-]/g,
                    ''
                );

        return appointmentsData.filter(
            appointment => {

                const databaseValue =
                    String(
                        appointment.testing_reason ||
                        ''
                    )
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
        getCount(
            'DOT-Physical'
        )
    );

    setElementText(
        'statPre',
        getCount(
            'Pre-Employment'
        )
    );

    setElementText(
        'statRandom',
        getCount(
            'Random-Pool'
        )
    );

    setElementText(
        'statUrgent',
        getCount(
            'Post-Accident'
        )
    );

    setElementText(
        'statReturn',
        getCount(
            'Return-To-Duty'
        )
    );

    setElementText(
        'statFollow',
        getCount(
            'Follow-Up'
        )
    );
}

/* =========================================================
   MAILING LIST METRICS
========================================================= */

function calculateMailingListMetrics() {

    setElementText(
        'mailingListCount',
        mailingListData.length
    );

}

    /* =========================================================
   MAILING LIST DATA GRID
========================================================= */

function populateMailingList() {

    const outputContainer =
        document.getElementById(
            'mailingListTarget'
        );

    if (!outputContainer) {
        return;
    }

    const filtered =
        mailingListData.filter(
            subscriber => {

                const email =
                    (
                        subscriber.email ||
                        ''
                    )
                        .toLowerCase();

                return email.includes(
                    mailingListSearchQuery
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
                ${
                    mailingListData.length === 0
                        ? 'No mailing list subscribers yet.'
                        : 'No subscribers match your search.'
                }
            </div>
        `;

        return;
    }

    outputContainer.innerHTML =
        filtered.map(
            subscriber => {

                const email =
                    subscriber.email || '';

                const createdDate =
                    subscriber.created_at
                        ? new Date(
                            subscriber.created_at
                        ).toLocaleDateString(
                            'en-US',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }
                        )
                        : 'Unknown';

                const createdTime =
                    subscriber.created_at
                        ? new Date(
                            subscriber.created_at
                        ).toLocaleTimeString(
                            'en-US',
                            {
                                hour: 'numeric',
                                minute: '2-digit'
                            }
                        )
                        : '';

                return `
                    <div style="
                        background:#fff;
                        border:1px solid rgba(138,52,159,0.06);
                        border-radius:14px;
                        padding:16px 18px;
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:15px;
                        flex-wrap:wrap;
                        box-shadow:0 4px 15px rgba(62,13,95,0.02);
                    ">

                        <div style="
                            display:flex;
                            align-items:center;
                            gap:12px;
                            min-width:0;
                            flex:1;
                        ">

                            <div style="
                                width:42px;
                                height:42px;
                                border-radius:50%;
                                background:rgba(138,52,159,0.08);
                                color:var(--purple-primary);
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                font-size:1.1rem;
                                flex-shrink:0;
                            ">
                                ✉️
                            </div>

                            <div style="
                                min-width:0;
                            ">

                                <div style="
                                    color:var(--purple-primary);
                                    font-weight:800;
                                    font-size:.95rem;
                                    word-break:break-word;
                                ">
                                    ${escapeHtml(email)}
                                </div>

                                <div style="
                                    color:#777;
                                    font-size:.76rem;
                                    margin-top:4px;
                                ">
                                    Subscriber #${escapeHtml(
                                        subscriber.id
                                    )}
                                </div>

                            </div>

                        </div>

                        <div style="
                            text-align:right;
                            background:#fafafa;
                            border-radius:10px;
                            padding:9px 13px;
                            flex-shrink:0;
                        ">

                            <span style="
                                display:block;
                                color:#777;
                                font-size:.65rem;
                                font-weight:700;
                                text-transform:uppercase;
                                margin-bottom:3px;
                            ">
                                Subscribed
                            </span>

                            <strong style="
                                display:block;
                                color:#555;
                                font-size:.8rem;
                            ">
                                ${escapeHtml(createdDate)}
                            </strong>

                            <span style="
                                color:#888;
                                font-size:.72rem;
                            ">
                                ${escapeHtml(createdTime)}
                            </span>

                        </div>

                    </div>
                `;
            }
        ).join('');
}

/* =========================================================
   WELLNESS OFFER CODE GRID
========================================================= */

function populateWellnessOfferCodes() {

    const target =
        document.getElementById(
            'wellnessOffersTarget'
        );


    if (!target) {

        return;

    }


    const search =
        String(
            wellnessOfferSearchQuery || ''
        )
            .toLowerCase()
            .trim();


    const filtered =
        wellnessOfferCodes.filter(
            offer => {

                const email =
                    String(
                        offer.email || ''
                    )
                    .toLowerCase();


                const code =
                    String(
                        offer.code || ''
                    )
                    .toLowerCase();


                return (
                    !search ||
                    email.includes(search) ||
                    code.includes(search)
                );

            }
        );


    if (
        filtered.length === 0
    ) {

        target.innerHTML = `

            <div
                class="admin-card"
                style="
                    text-align:center;
                    padding:45px 20px;
                    color:#666;
                "
            >

                ${
                    wellnessOfferCodes.length === 0
                        ? 'No wellness offer codes have been generated yet.'
                        : 'No offer codes match your search.'
                }

            </div>

        `;

        return;

    }


    target.innerHTML = `

        <div
            class="admin-card"
            style="
                padding:0;
                overflow:hidden;
            "
        >

            <div
                style="
                    overflow-x:auto;
                "
            >

                <table
                    style="
                        width:100%;
                        border-collapse:collapse;
                        min-width:850px;
                    "
                >

                    <thead>

                        <tr
                            style="
                                background:#f7f4f9;
                                border-bottom:1px solid #eee;
                            "
                        >

                            <th
                                style="
                                    padding:14px;
                                    text-align:left;
                                    font-size:.75rem;
                                    color:#666;
                                "
                            >
                                EMAIL
                            </th>


                            <th
                                style="
                                    padding:14px;
                                    text-align:left;
                                    font-size:.75rem;
                                    color:#666;
                                "
                            >
                                CODE
                            </th>


                            <th
                                style="
                                    padding:14px;
                                    text-align:left;
                                    font-size:.75rem;
                                    color:#666;
                                "
                            >
                                OFFER
                            </th>


                            <th
                                style="
                                    padding:14px;
                                    text-align:left;
                                    font-size:.75rem;
                                    color:#666;
                                "
                            >
                                CREATED
                            </th>


                            <th
                                style="
                                    padding:14px;
                                    text-align:left;
                                    font-size:.75rem;
                                    color:#666;
                                "
                            >
                                STATUS
                            </th>


                            <th
                                style="
                                    padding:14px;
                                    text-align:left;
                                    font-size:.75rem;
                                    color:#666;
                                "
                            >
                                REDEEMED
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${

                            filtered.map(
                                offer => {

                                    const created =
                                        offer.created_at
                                            ? new Date(
                                                offer.created_at
                                            ).toLocaleString(
                                                'en-US'
                                            )
                                            : '—';


                                    const redeemed =
                                        offer.redeemed_at
                                            ? new Date(
                                                offer.redeemed_at
                                            ).toLocaleString(
                                                'en-US'
                                            )
                                            : '—';


                                    const status =
                                        offer.is_redeemed
                                            ? `
                                                <span
                                                    style="
                                                        display:inline-block;
                                                        padding:5px 9px;
                                                        border-radius:20px;
                                                        background:#fff0f1;
                                                        color:#d90429;
                                                        font-size:.7rem;
                                                        font-weight:800;
                                                    "
                                                >
                                                    REDEEMED
                                                </span>
                                            `
                                            : `
                                                <span
                                                    style="
                                                        display:inline-block;
                                                        padding:5px 9px;
                                                        border-radius:20px;
                                                        background:#eef8e9;
                                                        color:#4f940c;
                                                        font-size:.7rem;
                                                        font-weight:800;
                                                    "
                                                >
                                                    UNUSED
                                                </span>
                                            `;


                                    return `

                                        <tr
                                            style="
                                                border-bottom:1px solid #f0edf2;
                                            "
                                        >

                                            <td
                                                style="
                                                    padding:15px 14px;
                                                    font-size:.84rem;
                                                    color:#333;
                                                "
                                            >
                                                ${escapeHtml(
                                                    offer.email
                                                )}
                                            </td>


                                            <td
                                                style="
                                                    padding:15px 14px;
                                                "
                                            >

                                                <strong
                                                    style="
                                                        color:var(--purple-primary);
                                                        letter-spacing:1px;
                                                    "
                                                >
                                                    ${escapeHtml(
                                                        offer.code
                                                    )}
                                                </strong>

                                            </td>


                                            <td
                                                style="
                                                    padding:15px 14px;
                                                    font-size:.8rem;
                                                    color:#555;
                                                "
                                            >

                                                ${escapeHtml(
                                                    offer.offer_name
                                                )}

                                                <br>

                                                <strong>
                                                    ${escapeHtml(
                                                        offer.discount_percent
                                                    )}% OFF
                                                </strong>

                                            </td>


                                            <td
                                                style="
                                                    padding:15px 14px;
                                                    font-size:.78rem;
                                                    color:#666;
                                                "
                                            >
                                                ${escapeHtml(
                                                    created
                                                )}
                                            </td>


                                            <td
                                                style="
                                                    padding:15px 14px;
                                                "
                                            >
                                                ${status}
                                            </td>


                                            <td
                                                style="
                                                    padding:15px 14px;
                                                    font-size:.78rem;
                                                    color:#666;
                                                "
                                            >

                                                ${
                                                    offer.is_redeemed
                                                        ? escapeHtml(
                                                            redeemed
                                                        )
                                                        : 'Not redeemed'
                                                }

                                            </td>

                                        </tr>

                                    `;

                                }
                            ).join('')

                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;

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
                        String(
                            activeFilter || 'All'
                        )
                            .toLowerCase()
                            .replace(
                                /[\s_-]/g,
                                ''
                            );

                    const matchesTab =
                        (
                            String(
                                activeFilter || 'All'
                            ) === 'All' ||
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

/* =========================================================
   RANDOM POOL MANAGEMENT
========================================================= */

async function fetchRandomPoolMembers() {

    const target =
        document.getElementById(
            'randomPoolTarget'
        );

    randomPoolLoading = true;

    if (target) {

        target.innerHTML = `
            <div style="
                color:#666;
                text-align:center;
                padding:35px;
            ">
                Loading random pool members...
            </div>
        `;

    }

    try {

        /*
         * Load the actual random_pool_members table first.
         */
        const {
            data,
            error
        } = await supabaseClientInstance
            .from('random_pool_members')
            .select(`
                id,
                pool_type,
                employee_name,
                employee_identifier,
                cdl_number,
                employer_name,
                email,
                phone,
                dot_agency,
                drug_eligible,
                alcohol_eligible,
                status,
                date_added,
                date_removed,
                notes,
                created_at,
                updated_at
            `)
            .order(
                'employee_name',
                {
                    ascending:true
                }
            );

        if (error) {
            throw error;
        }

        randomPoolMembers =
            Array.isArray(data)
                ? data.map(
                    normalizeRandomPoolMember
                )
                : [];


        /*
         * Repair the connection between the public DOT
         * appointment form and the admin random pool.
         *
         * If the public page could not insert into
         * random_pool_members because of RLS, the appointment
         * itself still exists in dot_appointments. An
         * authenticated admin session can safely synchronize
         * that appointment into the real pool.
         */
        await syncRandomPoolAppointments();


        /*
         * Re-read the source of truth after synchronization.
         */
        const refreshed =
            await supabaseClientInstance
                .from('random_pool_members')
                .select(`
                    id,
                    pool_type,
                    employee_name,
                    employee_identifier,
                    cdl_number,
                    employer_name,
                    email,
                    phone,
                    dot_agency,
                    drug_eligible,
                    alcohol_eligible,
                    status,
                    date_added,
                    date_removed,
                    notes,
                    created_at,
                    updated_at
                `)
                .order(
                    'employee_name',
                    {
                        ascending:true
                    }
                );

        if (refreshed.error) {
            throw refreshed.error;
        }

        randomPoolMembers =
            Array.isArray(refreshed.data)
                ? refreshed.data.map(
                    normalizeRandomPoolMember
                )
                : [];


        /*
         * Keep the dashboard cards connected to the appointment
         * system even if the public appointment insert into
         * random_pool_members was blocked by RLS.
         *
         * The appointment itself is still a valid source for the
         * Random Pool dashboard. When the admin can write to the
         * pool table, syncRandomPoolAppointments() creates the
         * permanent row. When it cannot, this fallback keeps the
         * member visible in the current dashboard session.
         */
        await mergeRandomPoolAppointmentFallbacks();


        await loadRandomPoolSettings();

        updateRandomPoolMetrics();

        populateRandomPool();

        return randomPoolMembers;

    } catch (error) {

        console.error(
            'Random pool retrieval error:',
            error
        );

        randomPoolMembers = [];

        if (target) {

            target.innerHTML = `
                <div style="
                    color:#d90429;
                    font-weight:600;
                    text-align:center;
                    padding:30px;
                    border:1px dashed #d90429;
                    border-radius:12px;
                    background:#fff5f6;
                ">

                    <strong>
                        Unable to load random pool
                    </strong>

                    <br><br>

                    ${escapeHtml(
                        error?.message ||
                        'Unknown database error.'
                    )}

                </div>
            `;

        }

        updateRandomPoolMetrics();

        return [];

    } finally {

        randomPoolLoading = false;

    }
}


/* =========================================================
   RANDOM POOL APPOINTMENT FALLBACK
========================================================= */

async function mergeRandomPoolAppointmentFallbacks() {

    try {

        const {
            data,
            error
        } = await supabaseClientInstance
            .from('dot_appointments')
            .select(`
                id,
                client_name,
                cdl_number,
                client_email,
                client_phone,
                testing_reason,
                dot_agency,
                created_at
            `)
            .order(
                'created_at',
                {
                    ascending:true
                }
            );


        if (error) {
            throw error;
        }


        const randomAppointments =
            (
                Array.isArray(data)
                    ? data
                    : []
            ).filter(
                appointment => {

                    const reason =
                        String(
                            appointment?.testing_reason ||
                            ''
                        )
                            .trim()
                            .toLowerCase()
                            .replace(
                                /[\s_-]+/g,
                                ''
                            );


                    return [
                        'random',
                        'randompool',
                        'randomtestingpool',
                        'randomtesting'
                    ].includes(
                        reason
                    );

                }
            );


        for (
            const appointment
            of randomAppointments
        ) {

            const name =
                String(
                    appointment?.client_name ||
                    ''
                ).trim();


            if (!name) {
                continue;
            }


            const email =
                String(
                    appointment?.client_email ||
                    ''
                )
                    .trim()
                    .toLowerCase();


            const cdl =
                String(
                    appointment?.cdl_number ||
                    ''
                ).trim();


            const phone =
                String(
                    appointment?.client_phone ||
                    ''
                ).trim();


            const exists =
                randomPoolMembers.some(
                    member => {

                        const memberEmail =
                            String(
                                member?.email ||
                                ''
                            )
                                .trim()
                                .toLowerCase();


                        const memberCdl =
                            String(
                                member?.cdl_number ||
                                ''
                            ).trim();


                        const memberName =
                            String(
                                member?.employee_name ||
                                ''
                            )
                                .trim()
                                .toLowerCase();


                        const memberPhone =
                            String(
                                member?.phone ||
                                ''
                            ).trim();


                        if (
                            email &&
                            memberEmail &&
                            email === memberEmail
                        ) {
                            return true;
                        }


                        if (
                            cdl &&
                            memberCdl &&
                            cdl === memberCdl
                        ) {
                            return true;
                        }


                        return (
                            memberName ===
                                name
                                    .toLowerCase() &&
                            Boolean(phone) &&
                            Boolean(memberPhone) &&
                            phone === memberPhone
                        );

                    }
                );


            if (exists) {
                continue;
            }


            /*
             * Virtual fallback row.
             *
             * This is intentionally NOT inserted a second time.
             * It only guarantees that the dashboard reflects the
             * appointment when the public-to-pool insert was blocked.
             */
            randomPoolMembers.push(
                normalizeRandomPoolMember({
                    id:
                        `appointment-fallback-${appointment.id}`,

                    pool_type:
                        'DOT',

                    employee_name:
                        name,

                    employee_identifier:
                        null,

                    cdl_number:
                        cdl || null,

                    employer_name:
                        null,

                    email:
                        email || null,

                    phone:
                        phone || null,

                    dot_agency:
                        String(
                            appointment?.dot_agency ||
                            ''
                        ).trim() || null,

                    drug_eligible:
                        true,

                    alcohol_eligible:
                        true,

                    status:
                        'active',

                    date_added:
                        appointment?.created_at
                            ? String(
                                appointment.created_at
                            ).slice(
                                0,
                                10
                            )
                            : null,

                    date_removed:
                        null,

                    notes:
                        'Displayed from DOT Random Pool appointment. Permanent pool row pending database synchronization.',

                    created_at:
                        appointment?.created_at ||
                        null,

                    updated_at:
                        null

                })
            );

        }

    } catch (error) {

        /*
         * Do not break the Random Pool dashboard if the
         * appointment table cannot be queried.
         */
        console.warn(
            'Random Pool appointment fallback unavailable:',
            error
        );

    }

}


/* =========================================================
   RANDOM POOL DATA NORMALIZATION
========================================================= */

function normalizeRandomPoolType(
    value
) {

    const normalized =
        String(
            value || ''
        )
            .trim()
            .toUpperCase()
            .replace(
                /[\s-]+/g,
                '_'
            );

    if (
        normalized === 'NONDOT' ||
        normalized === 'NON_DOT'
    ) {
        return 'NON_DOT';
    }

    return normalized === 'DOT'
        ? 'DOT'
        : normalized;

}


function normalizeRandomPoolStatus(
    value
) {

    const normalized =
        String(
            value || 'active'
        )
            .trim()
            .toLowerCase();

    if (
        normalized === 'inactive' ||
        normalized === 'removed'
    ) {
        return normalized;
    }

    return 'active';

}


function normalizeRandomPoolBoolean(
    value
) {

    if (
        value === true ||
        value === 1 ||
        value === '1'
    ) {
        return true;
    }

    return String(
        value || ''
    )
        .trim()
        .toLowerCase() === 'true';

}


function normalizeRandomPoolMember(
    member
) {

    return {
        ...member,
        pool_type:
            normalizeRandomPoolType(
                member?.pool_type
            ),
        status:
            normalizeRandomPoolStatus(
                member?.status
            ),
        drug_eligible:
            normalizeRandomPoolBoolean(
                member?.drug_eligible
            ),
        alcohol_eligible:
            normalizeRandomPoolBoolean(
                member?.alcohol_eligible
            )
    };

}


/* =========================================================
   SYNC RANDOM-POOL APPOINTMENTS INTO THE POOL
========================================================= */

async function syncRandomPoolAppointments() {

    if (randomPoolSyncing) {
        return;
    }

    randomPoolSyncing = true;

    try {

        const {
            data: appointmentRows,
            error
        } = await supabaseClientInstance
            .from('dot_appointments')
            .select(`
                id,
                client_name,
                cdl_number,
                client_email,
                client_phone,
                testing_reason,
                dot_agency,
                created_at
            `)
            .order(
                'created_at',
                {
                    ascending:true
                }
            );

        if (error) {
            throw error;
        }

        const randomAppointments =
            (
                Array.isArray(
                    appointmentRows
                )
                    ? appointmentRows
                    : []
            ).filter(
                appointment => {

                    const reason =
                        String(
                            appointment.testing_reason ||
                            ''
                        )
                            .trim()
                            .toLowerCase()
                            .replace(
                                /[\s_-]+/g,
                                ''
                            );

                    return [
                        'random',
                        'randompool',
                        'randomtestingpool',
                        'randomtesting'
                    ].includes(
                        reason
                    );

                }
            );


        if (
            randomAppointments.length === 0
        ) {
            return;
        }


        for (
            const appointment
            of randomAppointments
        ) {

            const name =
                String(
                    appointment.client_name ||
                    ''
                ).trim();

            const cdl =
                String(
                    appointment.cdl_number ||
                    ''
                ).trim();

            const email =
                String(
                    appointment.client_email ||
                    ''
                )
                    .trim()
                    .toLowerCase();

            const phone =
                String(
                    appointment.client_phone ||
                    ''
                ).trim();


            if (!name) {
                continue;
            }


            const alreadyExists =
                randomPoolMembers.some(
                    member => {

                        const memberEmail =
                            String(
                                member.email ||
                                ''
                            )
                                .trim()
                                .toLowerCase();

                        const memberCdl =
                            String(
                                member.cdl_number ||
                                ''
                            ).trim();

                        const memberName =
                            String(
                                member.employee_name ||
                                ''
                            )
                                .trim()
                                .toLowerCase();

                        const memberPhone =
                            String(
                                member.phone ||
                                ''
                            ).trim();


                        if (
                            email &&
                            memberEmail &&
                            email === memberEmail
                        ) {
                            return true;
                        }


                        if (
                            cdl &&
                            memberCdl &&
                            cdl === memberCdl
                        ) {
                            return true;
                        }


                        const normalizedAppointmentName =
                            String(
                                name || ''
                            )
                                .trim()
                                .toLowerCase();

                        return (
                            memberName ===
                            normalizedAppointmentName &&
                            Boolean(phone) &&
                            Boolean(memberPhone) &&
                            phone === memberPhone
                        );

                    }
                );


            if (alreadyExists) {
                continue;
            }


            const {
                error: insertError
            } = await supabaseClientInstance
                .from('random_pool_members')
                .insert({
                    pool_type:'DOT',
                    employee_name:name,
                    employee_identifier:null,
                    cdl_number:
                        cdl || null,
                    employer_name:null,
                    email:
                        email || null,
                    phone:
                        phone || null,
                    dot_agency:
                        String(
                            appointment.dot_agency ||
                            ''
                        ).trim() || null,
                    status:'active',
                    drug_eligible:true,
                    alcohol_eligible:true,
                    notes:
                        'Automatically synced from DOT Random Pool appointment.',
                    date_added:
                        appointment.created_at
                            ? String(
                                appointment.created_at
                            ).slice(
                                0,
                                10
                            )
                            : new Date()
                                .toISOString()
                                .slice(
                                    0,
                                    10
                                )
                });


            if (insertError) {

                console.warn(
                    'Random Pool appointment sync failed:',
                    {
                        appointmentId:
                            appointment.id,
                        error:
                            insertError
                    }
                );

                continue;

            }

            /*
             * Add it to the local array immediately so the
             * metrics can reflect the synchronization during
             * this refresh cycle as well.
             */
            randomPoolMembers.push(
                normalizeRandomPoolMember({
                    id:
                        `appointment-sync-${appointment.id}`,
                    pool_type:'DOT',
                    employee_name:name,
                    employee_identifier:null,
                    cdl_number:
                        cdl || null,
                    employer_name:null,
                    email:
                        email || null,
                    phone:
                        phone || null,
                    dot_agency:
                        String(
                            appointment.dot_agency ||
                            ''
                        ).trim() || null,
                    status:'active',
                    drug_eligible:true,
                    alcohol_eligible:true,
                    date_added:
                        appointment.created_at
                            ? String(
                                appointment.created_at
                            ).slice(
                                0,
                                10
                            )
                            : null,
                    date_removed:null,
                    notes:
                        'Automatically synced from DOT Random Pool appointment.',
                    created_at:
                        appointment.created_at ||
                        null,
                    updated_at:null
                })
            );

        }

    } catch (error) {

        /*
         * Synchronization failure should never prevent the
         * authenticated dashboard from displaying the existing
         * random pool.
         */
        console.warn(
            'Random Pool appointment synchronization unavailable:',
            error
        );

    } finally {

        randomPoolSyncing = false;

    }

}


async function loadRandomPoolSettings() {

    try {

        const {
            data,
            error
        } = await supabaseClientInstance

            .from('random_pool_settings')

            .select(`
                id,
                pool_type,
                dot_agency,
                drug_rate,
                alcohol_rate,
                selection_frequency,
                active,
                updated_at
            `)

            .order(
                'pool_type',
                {
                    ascending:true
                }
            );


        if (error) {
            throw error;
        }


        randomPoolSettings =
            Array.isArray(data)
                ? data
                : [];


    } catch (error) {

        console.error(
            'Random pool settings retrieval error:',
            error
        );

        randomPoolSettings = [];

    }

}


function getRandomPoolSetting(
    poolType
) {

    return (
        randomPoolSettings.find(
            setting =>
                setting.pool_type ===
                poolType
        ) ||
        null
    );

}


function updateRandomPoolMetrics() {

    const members =
        randomPoolMembers.filter(
            member =>
                normalizeRandomPoolType(
                    member?.pool_type
                ) ===
                activeRandomPoolType
        );


    const active =
        members.filter(
            member =>
                normalizeRandomPoolStatus(
                    member?.status
                ) === 'active'
        );


    const drugEligible =
        active.filter(
            member =>
                normalizeRandomPoolBoolean(
                    member?.drug_eligible
                ) === true
        );


    const alcoholEligible =
        active.filter(
            member =>
                normalizeRandomPoolBoolean(
                    member?.alcohol_eligible
                ) === true
        );


    const inactive =
        members.filter(
            member =>
                normalizeRandomPoolStatus(
                    member?.status
                ) !== 'active'
        );


    setElementText(
        'randomPoolActiveCount',
        active.length
    );

    setElementText(
        'randomPoolDrugCount',
        drugEligible.length
    );

    setElementText(
        'randomPoolAlcoholCount',
        alcoholEligible.length
    );

    setElementText(
        'randomPoolInactiveCount',
        inactive.length
    );

    setElementText(
        'randomPoolCurrentType',
        activeRandomPoolType === 'DOT'
            ? 'DOT'
            : 'NON-DOT'
    );


    const setting =
        getRandomPoolSetting(
            activeRandomPoolType
        );


    setElementText(
        'randomPoolDrugRate',
        setting
            ? `${Number(setting.drug_rate || 0)}%`
            : '—'
    );


    setElementText(
        'randomPoolAlcoholRate',
        setting
            ? `${Number(setting.alcohol_rate || 0)}%`
            : '—'
    );


    setElementText(
        'randomPoolAgency',
        setting?.dot_agency ||
        (
            activeRandomPoolType === 'DOT'
                ? (
                    active.length
                        ? 'Multiple / Member Specific'
                        : 'Not configured'
                )
                : 'N/A'
        )
    );

}


function populateRandomPool() {

    const target =
        document.getElementById(
            'randomPoolTarget'
        );

    if (!target) {
        return;
    }


    const poolMembers =
        randomPoolMembers.filter(
            member =>
                normalizeRandomPoolType(
                    member?.pool_type
                ) ===
                activeRandomPoolType
        );


    const filtered =
        poolMembers.filter(
            member => {

                if (!randomPoolSearchQuery) {
                    return true;
                }


                const searchable =
                    [
                        member.employee_name,
                        member.employee_identifier,
                        member.cdl_number,
                        member.employer_name,
                        member.email,
                        member.phone
                    ]
                        .map(
                            value =>
                                String(
                                    value || ''
                                ).toLowerCase()
                        )
                        .join(' ');


                return searchable.includes(
                    randomPoolSearchQuery
                );

            }
        );


    updateRandomPoolMetrics();


    const description =
        document.getElementById(
            'randomPoolDescription'
        );


    if (description) {

        description.textContent =
            activeRandomPoolType === 'DOT'
                ? 'DOT random pool members.'
                : 'NON-DOT random pool members.';

    }


    if (filtered.length === 0) {

        target.innerHTML = `
            <div style="
                background:#fff;
                border:1px dashed #ddd;
                border-radius:12px;
                padding:35px;
                text-align:center;
                color:#777;
            ">

                <div style="
                    font-size:2rem;
                    margin-bottom:8px;
                ">
                    ${activeRandomPoolType === 'DOT'
                        ? '🚛'
                        : '👥'}
                </div>

                <strong>
                    No ${activeRandomPoolType === 'DOT'
                        ? 'DOT'
                        : 'NON-DOT'} pool members found.
                </strong>

                <p style="
                    margin:8px 0 0;
                    font-size:.82rem;
                ">
                    Use “+ Add Pool Member” to add the first person.
                </p>

            </div>
        `;

        return;

    }


    target.innerHTML =
        filtered
            .map(
                renderRandomPoolMemberCard
            )
            .join('');


    bindRandomPoolMemberCardEvents();

}


function renderRandomPoolPage() {

    updateRandomPoolMetrics();
    populateRandomPool();

}


function renderRandomPoolMemberCard(
    member
) {

    const status =
        normalizeRandomPoolStatus(
            member?.status
        );


    const statusStyles =
        status === 'active'
            ? {
                background:'#eef8e8',
                color:'#4f940c',
                label:'Active'
            }
            : status === 'inactive'
                ? {
                    background:'#fff7e8',
                    color:'#b26a00',
                    label:'Inactive'
                }
                : {
                    background:'#fff0f2',
                    color:'#d90429',
                    label:'Removed'
                };


    return `
        <div
            data-random-member-card="${escapeHtml(member.id)}"
            style="
                background:#fff;
                border:1px solid rgba(138,52,159,.08);
                border-radius:14px;
                padding:17px;
                box-shadow:0 4px 15px rgba(0,0,0,.025);
            "
        >

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:flex-start;
                gap:15px;
                flex-wrap:wrap;
            ">

                <div style="
                    min-width:0;
                    flex:1;
                ">

                    <div style="
                        display:flex;
                        align-items:center;
                        gap:8px;
                        flex-wrap:wrap;
                        margin-bottom:6px;
                    ">

                        <h3 style="
                            margin:0;
                            color:var(--purple-primary);
                            font-size:1rem;
                            font-weight:800;
                        ">
                            ${escapeHtml(
                                member.employee_name
                            )}
                        </h3>

                        <span style="
                            display:inline-flex;
                            padding:4px 8px;
                            border-radius:999px;
                            background:${statusStyles.background};
                            color:${statusStyles.color};
                            font-size:.66rem;
                            font-weight:800;
                            text-transform:uppercase;
                        ">
                            ${statusStyles.label}
                        </span>

                    </div>


                    <div style="
                        display:flex;
                        gap:8px 18px;
                        flex-wrap:wrap;
                        color:#666;
                        font-size:.78rem;
                        line-height:1.5;
                    ">

                        ${
                            member.employer_name
                                ? `<span>🏢 <strong>Employer:</strong> ${escapeHtml(member.employer_name)}</span>`
                                : ''
                        }

                        ${
                            member.cdl_number
                                ? `<span>🪪 <strong>CDL:</strong> ${escapeHtml(member.cdl_number)}</span>`
                                : ''
                        }

                        ${
                            member.employee_identifier
                                ? `<span>🆔 <strong>ID:</strong> ${escapeHtml(member.employee_identifier)}</span>`
                                : ''
                        }

                        ${
                            member.email
                                ? `<span>✉️ ${escapeHtml(member.email)}</span>`
                                : ''
                        }

                        ${
                            member.phone
                                ? `<span>📞 ${escapeHtml(member.phone)}</span>`
                                : ''
                        }

                    </div>

                </div>


                <div style="
                    display:flex;
                    gap:7px;
                    flex-wrap:wrap;
                ">

                    <button
                        type="button"
                        class="schedule-action-btn schedule-neutral-btn"
                        data-edit-random-member="${escapeHtml(member.id)}"
                    >
                        Edit
                    </button>


                    ${
                        status === 'active'
                            ? `
                                <button
                                    type="button"
                                    class="schedule-action-btn"
                                    style="
                                        background:#fff0f2;
                                        color:#d90429;
                                        border:1px solid rgba(217,4,41,.15);
                                    "
                                    data-deactivate-random-member="${escapeHtml(member.id)}"
                                >
                                    Deactivate
                                </button>
                            `
                            : `
                                <button
                                    type="button"
                                    class="schedule-action-btn"
                                    style="
                                        background:#eef8e8;
                                        color:#4f940c;
                                        border:1px solid rgba(79,148,12,.15);
                                    "
                                    data-activate-random-member="${escapeHtml(member.id)}"
                                >
                                    Activate
                                </button>
                            `
                    }

                </div>

            </div>


            <div style="
                display:grid;
                grid-template-columns:repeat(auto-fit,minmax(130px,1fr));
                gap:8px;
                margin-top:14px;
            ">

                <div style="
                    background:#fafafa;
                    border-radius:9px;
                    padding:9px;
                ">
                    <span style="
                        display:block;
                        font-size:.64rem;
                        color:#777;
                        text-transform:uppercase;
                        font-weight:700;
                    ">
                        Drug
                    </span>

                    <strong style="
                        color:${member.drug_eligible ? '#4f940c' : '#999'};
                        font-size:.78rem;
                    ">
                        ${member.drug_eligible ? 'Eligible' : 'Not Eligible'}
                    </strong>
                </div>


                <div style="
                    background:#fafafa;
                    border-radius:9px;
                    padding:9px;
                ">
                    <span style="
                        display:block;
                        font-size:.64rem;
                        color:#777;
                        text-transform:uppercase;
                        font-weight:700;
                    ">
                        Alcohol
                    </span>

                    <strong style="
                        color:${member.alcohol_eligible ? '#0077b6' : '#999'};
                        font-size:.78rem;
                    ">
                        ${member.alcohol_eligible ? 'Eligible' : 'Not Eligible'}
                    </strong>
                </div>


                <div style="
                    background:#fafafa;
                    border-radius:9px;
                    padding:9px;
                ">
                    <span style="
                        display:block;
                        font-size:.64rem;
                        color:#777;
                        text-transform:uppercase;
                        font-weight:700;
                    ">
                        Added
                    </span>

                    <strong style="
                        color:#555;
                        font-size:.78rem;
                    ">
                        ${escapeHtml(member.date_added || '—')}
                    </strong>
                </div>

            </div>

        </div>
    `;

}


function bindRandomPoolMemberCardEvents() {

    document
        .querySelectorAll(
            '[data-edit-random-member]'
        )
        .forEach(
            button => {

                button.addEventListener(
                    'click',
                    () => openRandomPoolMemberForm(
                        button.getAttribute(
                            'data-edit-random-member'
                        )
                    )
                );

            }
        );


    document
        .querySelectorAll(
            '[data-deactivate-random-member]'
        )
        .forEach(
            button => {

                button.addEventListener(
                    'click',
                    () => updateRandomPoolMemberStatus(
                        button.getAttribute(
                            'data-deactivate-random-member'
                        ),
                        'inactive'
                    )
                );

            }
        );


    document
        .querySelectorAll(
            '[data-activate-random-member]'
        )
        .forEach(
            button => {

                button.addEventListener(
                    'click',
                    () => updateRandomPoolMemberStatus(
                        button.getAttribute(
                            'data-activate-random-member'
                        ),
                        'active'
                    )
                );

            }
        );

}


function openRandomPoolMemberForm(
    memberId = null
) {

    const existingMember =
        memberId
            ? randomPoolMembers.find(
                member =>
                    member.id ===
                    memberId
            )
            : null;


    editingRandomPoolMemberId =
        existingMember?.id ||
        null;


    const poolType =
        existingMember?.pool_type ||
        activeRandomPoolType;


    document
        .getElementById(
            'randomPoolMemberFormModal'
        )
        ?.remove();


    const modal =
        document.createElement(
            'div'
        );


    modal.id =
        'randomPoolMemberFormModal';


    modal.innerHTML = `
        <div
            data-random-form-overlay
            style="
                position:fixed;
                inset:0;
                z-index:999998;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:16px;
                background:rgba(37,12,52,.48);
                backdrop-filter:blur(5px);
                box-sizing:border-box;
            "
        >

            <div
                role="dialog"
                aria-modal="true"
                style="
                    position:relative;
                    width:min(620px,100%);
                    max-height:92vh;
                    overflow-y:auto;
                    background:#fff;
                    border-radius:20px;
                    padding:25px;
                    box-sizing:border-box;
                    box-shadow:0 25px 70px rgba(62,13,95,.22);
                "
            >

                <button
                    type="button"
                    data-random-form-close
                    aria-label="Close"
                    style="
                        position:absolute;
                        top:12px;
                        right:14px;
                        width:34px;
                        height:34px;
                        border:none;
                        border-radius:50%;
                        background:#f7f4f9;
                        color:#666;
                        font-size:24px;
                        cursor:pointer;
                    "
                >
                    &times;
                </button>


                <h2 style="
                    margin:0 38px 6px 0;
                    color:var(--purple-primary);
                    font-size:1.25rem;
                ">
                    ${existingMember
                        ? 'Edit Random Pool Member'
                        : 'Add Random Pool Member'}
                </h2>


                <p style="
                    margin:0 0 20px;
                    color:#666;
                    font-size:.82rem;
                    line-height:1.5;
                ">
                    ${
                        poolType === 'DOT'
                            ? 'DOT pool member'
                            : 'NON-DOT pool member'
                    }
                </p>


                <form id="randomPoolMemberForm">

                    <div style="
                        display:grid;
                        grid-template-columns:1fr 1fr;
                        gap:12px;
                    ">

                        <div style="grid-column:1 / -1;">
                            <label style="
                                display:block;
                                margin-bottom:5px;
                                font-size:.74rem;
                                font-weight:700;
                                color:#555;
                                text-transform:uppercase;
                            ">
                                Pool Type
                            </label>

                            <select
                                id="randomPoolMemberPoolType"
                                required
                                ${existingMember ? 'disabled' : ''}
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #ddd;
                                    border-radius:9px;
                                    background:#fff;
                                    font-weight:600;
                                "
                            >
                                <option
                                    value="DOT"
                                    ${poolType === 'DOT' ? 'selected' : ''}
                                >
                                    DOT
                                </option>

                                <option
                                    value="NON_DOT"
                                    ${poolType === 'NON_DOT' ? 'selected' : ''}
                                >
                                    NON-DOT
                                </option>
                            </select>
                        </div>


                        <div style="grid-column:1 / -1;">
                            <label style="
                                display:block;
                                margin-bottom:5px;
                                font-size:.74rem;
                                font-weight:700;
                                color:#555;
                                text-transform:uppercase;
                            ">
                                Employee Name *
                            </label>

                            <input
                                type="text"
                                id="randomPoolMemberName"
                                required
                                value="${escapeHtml(existingMember?.employee_name || '')}"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #ddd;
                                    border-radius:9px;
                                "
                            />
                        </div>


                        <div>
                            <label style="
                                display:block;
                                margin-bottom:5px;
                                font-size:.74rem;
                                font-weight:700;
                                color:#555;
                                text-transform:uppercase;
                            ">
                                Employee / ID #
                            </label>

                            <input
                                type="text"
                                id="randomPoolMemberIdentifier"
                                value="${escapeHtml(existingMember?.employee_identifier || '')}"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #ddd;
                                    border-radius:9px;
                                "
                            />
                        </div>


                        <div>
                            <label style="
                                display:block;
                                margin-bottom:5px;
                                font-size:.74rem;
                                font-weight:700;
                                color:#555;
                                text-transform:uppercase;
                            ">
                                CDL Number
                            </label>

                            <input
                                type="text"
                                id="randomPoolMemberCdl"
                                value="${escapeHtml(existingMember?.cdl_number || '')}"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #ddd;
                                    border-radius:9px;
                                "
                            />
                        </div>


                        <div style="grid-column:1 / -1;">
                            <label style="
                                display:block;
                                margin-bottom:5px;
                                font-size:.74rem;
                                font-weight:700;
                                color:#555;
                                text-transform:uppercase;
                            ">
                                Employer / Company
                            </label>

                            <input
                                type="text"
                                id="randomPoolMemberEmployer"
                                value="${escapeHtml(existingMember?.employer_name || '')}"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #ddd;
                                    border-radius:9px;
                                "
                            />
                        </div>


                        <div>
                            <label style="
                                display:block;
                                margin-bottom:5px;
                                font-size:.74rem;
                                font-weight:700;
                                color:#555;
                                text-transform:uppercase;
                            ">
                                Email
                            </label>

                            <input
                                type="email"
                                id="randomPoolMemberEmail"
                                value="${escapeHtml(existingMember?.email || '')}"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #ddd;
                                    border-radius:9px;
                                "
                            />
                        </div>


                        <div>
                            <label style="
                                display:block;
                                margin-bottom:5px;
                                font-size:.74rem;
                                font-weight:700;
                                color:#555;
                                text-transform:uppercase;
                            ">
                                Phone
                            </label>

                            <input
                                type="tel"
                                id="randomPoolMemberPhone"
                                value="${escapeHtml(existingMember?.phone || '')}"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #ddd;
                                    border-radius:9px;
                                "
                            />
                        </div>


                        <div>
                            <label style="
                                display:block;
                                margin-bottom:5px;
                                font-size:.74rem;
                                font-weight:700;
                                color:#555;
                                text-transform:uppercase;
                            ">
                                DOT Agency
                            </label>

                            <input
                                type="text"
                                id="randomPoolMemberAgency"
                                value="${escapeHtml(
                                    existingMember?.dot_agency ||
                                    (poolType === 'DOT' ? 'FMCSA' : '')
                                )}"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #ddd;
                                    border-radius:9px;
                                "
                            />
                        </div>


                        <div>
                            <label style="
                                display:block;
                                margin-bottom:5px;
                                font-size:.74rem;
                                font-weight:700;
                                color:#555;
                                text-transform:uppercase;
                            ">
                                Status
                            </label>

                            <select
                                id="randomPoolMemberStatus"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #ddd;
                                    border-radius:9px;
                                    background:#fff;
                                "
                            >
                                <option
                                    value="active"
                                    ${(existingMember?.status || 'active') === 'active' ? 'selected' : ''}
                                >
                                    Active
                                </option>

                                <option
                                    value="inactive"
                                    ${existingMember?.status === 'inactive' ? 'selected' : ''}
                                >
                                    Inactive
                                </option>

                                <option
                                    value="removed"
                                    ${existingMember?.status === 'removed' ? 'selected' : ''}
                                >
                                    Removed
                                </option>
                            </select>
                        </div>


                        <div style="
                            grid-column:1 / -1;
                            display:flex;
                            gap:18px;
                            flex-wrap:wrap;
                            padding:12px;
                            background:#f7f4f9;
                            border-radius:10px;
                        ">

                            <label style="
                                display:flex;
                                align-items:center;
                                gap:8px;
                                font-size:.8rem;
                                font-weight:700;
                                color:#555;
                                cursor:pointer;
                            ">
                                <input
                                    type="checkbox"
                                    id="randomPoolMemberDrug"
                                    ${existingMember
                                        ? (existingMember.drug_eligible ? 'checked' : '')
                                        : 'checked'}
                                />
                                Drug Eligible
                            </label>


                            <label style="
                                display:flex;
                                align-items:center;
                                gap:8px;
                                font-size:.8rem;
                                font-weight:700;
                                color:#555;
                                cursor:pointer;
                            ">
                                <input
                                    type="checkbox"
                                    id="randomPoolMemberAlcohol"
                                    ${existingMember?.alcohol_eligible ? 'checked' : ''}
                                />
                                Alcohol Eligible
                            </label>

                        </div>


                        <div style="grid-column:1 / -1;">
                            <label style="
                                display:block;
                                margin-bottom:5px;
                                font-size:.74rem;
                                font-weight:700;
                                color:#555;
                                text-transform:uppercase;
                            ">
                                Notes
                            </label>

                            <textarea
                                id="randomPoolMemberNotes"
                                rows="3"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #ddd;
                                    border-radius:9px;
                                    resize:vertical;
                                    font-family:inherit;
                                "
                            >${escapeHtml(existingMember?.notes || '')}</textarea>
                        </div>

                    </div>


                    <div style="
                        display:flex;
                        justify-content:flex-end;
                        gap:9px;
                        margin-top:20px;
                        flex-wrap:wrap;
                    ">

                        <button
                            type="button"
                            data-random-form-cancel
                            class="schedule-action-btn schedule-neutral-btn"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            id="saveRandomPoolMemberBtn"
                            class="schedule-action-btn schedule-primary-btn"
                        >
                            ${existingMember ? 'Save Changes' : 'Add to Pool'}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    `;


    document.body.appendChild(
        modal
    );


    const closeForm = () => {

        modal.remove();

        editingRandomPoolMemberId =
            null;

    };


    modal
        .querySelector(
            '[data-random-form-close]'
        )
        ?.addEventListener(
            'click',
            closeForm
        );


    modal
        .querySelector(
            '[data-random-form-cancel]'
        )
        ?.addEventListener(
            'click',
            closeForm
        );


    modal
        .querySelector(
            '[data-random-form-overlay]'
        )
        ?.addEventListener(
            'click',
            event => {

                if (
                    event.target ===
                    event.currentTarget
                ) {
                    closeForm();
                }

            }
        );


    modal
        .querySelector(
            '#randomPoolMemberForm'
        )
        ?.addEventListener(
            'submit',
            async event => {

                event.preventDefault();

                await saveRandomPoolMember(
                    closeForm
                );

            }
        );


    setTimeout(
        () => {

            document
                .getElementById(
                    'randomPoolMemberName'
                )
                ?.focus();

        },
        50
    );

}


async function saveRandomPoolMember(
    closeForm
) {

    const saveButton =
        document.getElementById(
            'saveRandomPoolMemberBtn'
        );


    const nameInput =
        document.getElementById(
            'randomPoolMemberName'
        );


    const poolTypeInput =
        document.getElementById(
            'randomPoolMemberPoolType'
        );


    if (
        !saveButton ||
        !nameInput ||
        !poolTypeInput
    ) {
        return;
    }


    const employeeName =
        nameInput.value.trim();


    const poolType =
        poolTypeInput.value;


    if (!employeeName) {

        showAdminModal(
            'Employee name is required.',
            'warning',
            'Missing Employee Name'
        );

        return;

    }


    if (
        poolType !== 'DOT' &&
        poolType !== 'NON_DOT'
    ) {

        showAdminModal(
            'Please select a valid pool type.',
            'warning',
            'Invalid Pool Type'
        );

        return;

    }


    const isEditing =
        Boolean(
            editingRandomPoolMemberId
        );


    saveButton.disabled =
        true;

    saveButton.innerText =
        'Saving...';


    const payload = {

        pool_type:
            poolType,

        employee_name:
            employeeName,

        employee_identifier:
            document.getElementById(
                'randomPoolMemberIdentifier'
            )?.value.trim() ||
            null,

        cdl_number:
            document.getElementById(
                'randomPoolMemberCdl'
            )?.value.trim() ||
            null,

        employer_name:
            document.getElementById(
                'randomPoolMemberEmployer'
            )?.value.trim() ||
            null,

        email:
            String(
                document.getElementById(
                    'randomPoolMemberEmail'
                )?.value || ''
            ).trim().toLowerCase() ||
            null,

        phone:
            document.getElementById(
                'randomPoolMemberPhone'
            )?.value.trim() ||
            null,

        dot_agency:
            document.getElementById(
                'randomPoolMemberAgency'
            )?.value.trim() ||
            null,

        status:
            document.getElementById(
                'randomPoolMemberStatus'
            )?.value ||
            'active',

        drug_eligible:
            document.getElementById(
                'randomPoolMemberDrug'
            )?.checked === true,

        alcohol_eligible:
            document.getElementById(
                'randomPoolMemberAlcohol'
            )?.checked === true,

        notes:
            document.getElementById(
                'randomPoolMemberNotes'
            )?.value.trim() ||
            null,

        updated_at:
            new Date().toISOString()

    };


    try {

        let query;


        if (isEditing) {

            query =
                supabaseClientInstance

                    .from(
                        'random_pool_members'
                    )

                    .update(
                        payload
                    )

                    .eq(
                        'id',
                        editingRandomPoolMemberId
                    );

        } else {

            query =
                supabaseClientInstance

                    .from(
                        'random_pool_members'
                    )

                    .insert(
                        payload
                    );

        }


        const {
            error
        } = await query;


        if (error) {
            throw error;
        }


        closeForm();


        showAdminModal(
            isEditing
                ? 'The random pool member has been updated.'
                : `The employee has been added to the ${poolType === 'DOT' ? 'DOT' : 'NON-DOT'} random pool.`,
            'success',
            isEditing
                ? 'Pool Member Updated'
                : 'Pool Member Added'
        );


        editingRandomPoolMemberId =
            null;


        await fetchRandomPoolMembers();


    } catch (error) {

        console.error(
            'Random pool member save error:',
            error
        );


        saveButton.disabled =
            false;

        saveButton.innerText =
            isEditing
                ? 'Save Changes'
                : 'Add to Pool';


        showAdminModal(
            `Unable to save this pool member:\n\n${error.message}`,
            'error',
            'Unable to Save Pool Member'
        );

    }

}


async function updateRandomPoolMemberStatus(
    memberId,
    newStatus
) {

    const member =
        randomPoolMembers.find(
            item =>
                item.id ===
                memberId
        );


    if (!member) {
        return;
    }


    const actionLabel =
        newStatus === 'active'
            ? 'reactivate'
            : 'deactivate';


    if (
        !window.confirm(
            `Are you sure you want to ${actionLabel} ${member.employee_name}?`
        )
    ) {
        return;
    }


    try {

        const updatePayload = {

            status:
                newStatus,

            date_removed:
                newStatus === 'active'
                    ? null
                    : new Date()
                        .toISOString()
                        .slice(
                            0,
                            10
                        ),

            updated_at:
                new Date().toISOString()

        };


        const {
            error
        } =
            await supabaseClientInstance

                .from(
                    'random_pool_members'
                )

                .update(
                    updatePayload
                )

                .eq(
                    'id',
                    memberId
                );


        if (error) {
            throw error;
        }


        showAdminModal(
            newStatus === 'active'
                ? `${member.employee_name} is active in the random pool again.`
                : `${member.employee_name} has been deactivated.`,
            'success',
            newStatus === 'active'
                ? 'Pool Member Activated'
                : 'Pool Member Deactivated'
        );


        await fetchRandomPoolMembers();


    } catch (error) {

        console.error(
            'Random pool member status update error:',
            error
        );


        showAdminModal(
            `Unable to update this pool member:\n\n${error.message}`,
            'error',
            'Unable to Update Pool Member'
        );

    }

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

        const openingTime =
            schedulingSettings.opening_time ||
            DEFAULT_CLINIC_OPEN_TIME;

        const closingTime =
            schedulingSettings.closing_time ||
            DEFAULT_CLINIC_CLOSE_TIME;

        const openingMinutes =
            clinicTimeToMinutes(
                openingTime
            );

        const closingMinutes =
            clinicTimeToMinutes(
                closingTime
            );

        let current =
            openingMinutes;

        while (
            current <=
            closingMinutes
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
   MAILING LIST CSV EXPORT
========================================================= */

function exportMailingListToCsv() {

    if (
        mailingListData.length === 0
    ) {

        showAdminModal(
            'There are currently no mailing list subscribers available to export.',
            'info',
            'Nothing to Export'
        );

        return;
    }

    const headers = [
        'ID',
        'Email',
        'Subscribed At'
    ];

    const csvRows = [
        headers.join(',')
    ];

    mailingListData.forEach(
        subscriber => {

            const rowData = [

                `"${escapeCsv(
                    subscriber.id
                )}"`,

                `"${escapeCsv(
                    subscriber.email
                )}"`,

                `"${escapeCsv(
                    subscriber.created_at
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
        `Renew_You_Mailing_List_${getTodayLocalDate()}.csv`
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