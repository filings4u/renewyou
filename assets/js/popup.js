/**
 * ============================================================
 * ReNew You Health & Wellness
 * Wellness Offer Email Grabber
 *
 * Offer:
 * 10% Off GLP-1 Vitamin Injection
 *
 * File:
 * assets/js/popup.js
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    initRenewYouOfferPopup();

});


/* ============================================================
   CONFIGURATION
============================================================ */

const RENEW_YOU_POPUP_CONFIG = {

    /*
     * Supabase Edge Function endpoint.
     */
    edgeFunctionUrl:
        'https://lrbimrlbskjweynxlgas.supabase.co/functions/v1/send-wellness-offer',

    /*
     * Delay before popup appears.
     */
    delayMilliseconds: 4000,

    /*
     * How long a successful subscriber should wait
     * before seeing the offer again.
     *
     * 30 days = 30 * 24 * 60 * 60 * 1000
     */
    submittedCooldownMilliseconds:
        30 * 24 * 60 * 60 * 1000,

    /*
     * Stores the date/time when the visitor successfully
     * received an offer code.
     */
    storageKey:
        'renewYouWellnessOfferSubmittedAt',

    /*
     * Prevents the popup from immediately reopening
     * after the visitor closes it during the same session.
     */
    sessionKey:
        'renewYouWellnessOfferDismissed'

};


/* ============================================================
   INITIALIZE
============================================================ */

function initRenewYouOfferPopup() {

    const target =
        document.getElementById(
            'renewYouOfferPopupTarget'
        );

    if (!target) {

        console.warn(
            'ReNew You offer popup target was not found.'
        );

        return;
    }


/*
 * Don't show the popup again if the visitor
 * successfully received a code recently.
 *
 * After the cooldown expires, the offer becomes
 * eligible to appear again.
 */
const submittedAt =
    Number(
        localStorage.getItem(
            RENEW_YOU_POPUP_CONFIG.storageKey
        ) || 0
    );


if (
    submittedAt > 0
) {

    const elapsed =
        Date.now() -
        submittedAt;


    if (
        elapsed <
        RENEW_YOU_POPUP_CONFIG
            .submittedCooldownMilliseconds
    ) {

        return;

    }


    /*
     * Cooldown expired.
     * Remove the old timestamp so the popup
     * can become active again.
     */
    localStorage.removeItem(
        RENEW_YOU_POPUP_CONFIG.storageKey
    );

}

    /*
     * Don't immediately show again if the visitor
     * already closed it during this session.
     */
    if (
        sessionStorage.getItem(
            RENEW_YOU_POPUP_CONFIG.sessionKey
        ) === 'true'
    ) {
        return;
    }


    createRenewYouOfferPopup(
        target
    );


    /*
     * Give the visitor a few seconds on the page
     * before showing the offer.
     */
    window.setTimeout(
        () => {

            openRenewYouOfferPopup();

        },
        RENEW_YOU_POPUP_CONFIG.delayMilliseconds
    );

}


/* ============================================================
   CREATE POPUP
============================================================ */

function createRenewYouOfferPopup(
    target
) {

    target.innerHTML = `

        <div
            id="renewYouOfferOverlay"
            class="renew-you-offer-overlay"
            aria-hidden="true"
        >

            <div
                class="renew-you-offer-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="renewYouOfferTitle"
            >

                <!-- CLOSE BUTTON -->

                <button
                    type="button"
                    id="renewYouOfferClose"
                    class="renew-you-offer-close"
                    aria-label="Close offer"
                >
                    &times;
                </button>


                <!-- OFFER HEADER -->

            <div class="renew-you-offer-header">

    <div class="renew-you-offer-logo-wrap">
        <img
            src="https://lrbimrlbskjweynxlgas.supabase.co/storage/v1/object/public/public-assets/logo2.png"
            alt="ReNew You Health & Wellness"
            class="renew-you-offer-logo"
        />
    </div>

    <div class="renew-you-offer-eyebrow">
        LIMITED WELLNESS OFFER
    </div>

    <div
        class="renew-you-offer-discount"
    >
        10%
    </div>

    <style>
    /* ====================================================
   LOGO
==================================================== */

.renew-you-offer-logo-wrap {

    position:relative;

    z-index:2;

    display:flex;

    align-items:center;

    justify-content:center;

    margin:
        0 auto 20px;

    padding:
        10px 18px;

    width:
        fit-content;

    background:#ffffff;

    border-radius:14px;

    box-shadow:
        0 8px 25px
        rgba(0,0,0,.14);

}


.renew-you-offer-logo {

    display:block;

    width:
        clamp(
            145px,
            42vw,
            210px
        );

    max-width:100%;

    height:auto;

    object-fit:contain;

}

/* ====================================================
   SUCCESS STATE — COMPACT MOBILE LAYOUT
==================================================== */

.renew-you-offer-modal.success-state
.renew-you-offer-footer {

    display:none;

}


.renew-you-offer-modal.success-state
.renew-you-offer-content {

    padding:
        18px 20px 20px;

}


.renew-you-offer-modal.success-state
.renew-you-offer-success {

    padding:
        4px 0 0;

}


.renew-you-offer-modal.success-state
.renew-you-offer-success-icon {

    width:52px;

    height:52px;

    margin:
        0 auto 10px;

    font-size:25px;

}


.renew-you-offer-modal.success-state
.renew-you-offer-success h3 {

    margin:
        0 0 6px;

    font-size:1.25rem;

}


.renew-you-offer-modal.success-state
.renew-you-offer-success p {

    margin:
        0 auto 5px;

    font-size:.8rem;

    line-height:1.4;

}


.renew-you-offer-modal.success-state
.renew-you-offer-success-small {

    font-size:.68rem !important;

}


.renew-you-offer-modal.success-state
.renew-you-offer-done {

    display:block;

    width:100%;

    min-height:44px;

    margin:
        12px 0 0;

    padding:
        10px 20px;

    border:0;

    border-radius:9px;

    background:
        #8a349b;

    color:#ffffff;

    font-size:.75rem;

    font-weight:800;

    letter-spacing:.04em;

    cursor:pointer;

}
    </style>

                    <h2
                        id="renewYouOfferTitle"
                        class="renew-you-offer-title"
                    >
                        Save on Your
                        <br>
                        GLP-1 or Vitamin Injections
                    </h2>

                    <p class="renew-you-offer-subtitle">
                        Get your exclusive 10% off code
                        delivered directly to your email.
                    </p>

                </div>


                <!-- OFFER CONTENT -->

                <div class="renew-you-offer-content">

                    <div class="renew-you-offer-benefits">

                        <div class="renew-you-offer-benefit">

                            <span class="renew-you-offer-icon">
                                ✓
                            </span>

                            <span>
                                Receive your exclusive
                                discount code by email
                            </span>

                        </div>


                        <div class="renew-you-offer-benefit">

                            <span class="renew-you-offer-icon">
                                ✓
                            </span>

                            <span>
                                Redeem in person or
                                over the phone
                            </span>

                        </div>


                        <div class="renew-you-offer-benefit">

                            <span class="renew-you-offer-icon">
                                ✓
                            </span>

                            <span>
                                ReNew You Health &
                                Wellness
                            </span>

                        </div>

                    </div>


                    <!-- FORM -->

                    <form
                        id="renewYouOfferForm"
                        class="renew-you-offer-form"
                        novalidate
                    >

                        <label
                            for="renewYouOfferEmail"
                            class="renew-you-offer-label"
                        >
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="renewYouOfferEmail"
                            name="email"
                            class="renew-you-offer-input"
                            placeholder="you@example.com"
                            autocomplete="email"
                            required
                        />


                        <div
                            id="renewYouOfferError"
                            class="renew-you-offer-error"
                            role="alert"
                        ></div>


                        <button
                            type="submit"
                            id="renewYouOfferSubmit"
                            class="renew-you-offer-submit"
                        >
                            <span
                                id="renewYouOfferSubmitText"
                            >
                                GET MY 10% OFF CODE
                            </span>

                            <span
                                id="renewYouOfferSpinner"
                                class="renew-you-offer-spinner"
                                aria-hidden="true"
                            ></span>

                        </button>


                        <p class="renew-you-offer-privacy">
                            Enter your email to receive your
                            discount code and offer instructions.
                        </p>

                    </form>


                    <!-- SUCCESS STATE -->

                    <div
                        id="renewYouOfferSuccess"
                        class="renew-you-offer-success"
                        hidden
                    >

                        <div class="renew-you-offer-success-icon">
                            ✓
                        </div>

                        <h3>
                            Check Your Email
                        </h3>

                        <p>
                            Your exclusive 10% off code
                            has been sent to your email.
                        </p>

                        <p class="renew-you-offer-success-small">
                            Check your inbox for your code
                            and redemption instructions.
                        </p>

                        <button
                            type="button"
                            id="renewYouOfferDone"
                            class="renew-you-offer-done"
                        >
                            DONE
                        </button>

                    </div>

                </div>


                <!-- FOOTER -->

                <div class="renew-you-offer-footer">

                    <strong>
                        ReNew You Health & Wellness
                    </strong>

                    <span>
                        500 Ashland Ave., Suite 101
                        Chicago Heights, IL 60411
                    </span>

                    <a
                        href="tel:7083292155"
                    >
                        (708) 329-2155
                    </a>

                </div>

            </div>

        </div>


        <style>

            /* ====================================================
               OVERLAY
            ==================================================== */

            .renew-you-offer-overlay {

                position:fixed;

                inset:0;

                z-index:999999;

                display:flex;

                align-items:center;

                justify-content:center;

                padding:20px;

                background:
                    rgba(35, 17, 43, 0.72);

                backdrop-filter:
                    blur(7px);

                -webkit-backdrop-filter:
                    blur(7px);

                opacity:0;

                visibility:hidden;

                transition:
                    opacity .3s ease,
                    visibility .3s ease;

                box-sizing:border-box;

            }


            .renew-you-offer-overlay.is-visible {

                opacity:1;

                visibility:visible;

            }


            /* ====================================================
               MODAL
            ==================================================== */

       .renew-you-offer-modal {

    position:relative;

    width:
        min(100%, 520px);

    max-height:
        calc(100vh - 20px);

    background:#ffffff;

    border-radius:24px;

    box-shadow:
        0 30px 90px
        rgba(40, 10, 50, .28);

    transform:
        translateY(25px)
        scale(.96);

    transition:
        transform .35s ease;

    overflow:hidden;

    box-sizing:border-box;

}


            .renew-you-offer-overlay.is-visible
            .renew-you-offer-modal {

                transform:
                    translateY(0)
                    scale(1);

            }


            /* ====================================================
               CLOSE
            ==================================================== */

            .renew-you-offer-close {

                position:absolute;

                top:15px;

                right:15px;

                width:38px;

                height:38px;

                border:0;

                border-radius:50%;

                background:
                    rgba(255,255,255,.18);

                color:#ffffff;

                font-size:27px;

                line-height:1;

                cursor:pointer;

                z-index:5;

                display:flex;

                align-items:center;

                justify-content:center;

                transition:
                    background .2s ease,
                    transform .2s ease;

            }


            .renew-you-offer-close:hover {

                background:
                    rgba(255,255,255,.3);

                transform:
                    rotate(90deg);

            }


            /* ====================================================
               HEADER
            ==================================================== */

            .renew-you-offer-header {

                position:relative;

                text-align:center;

                padding:
                    42px
                    35px
                    30px;

                color:#ffffff;

                background:
                    linear-gradient(
                        145deg,
                        #6f2b82 0%,
                        #8a349b 48%,
                        #a950b8 100%
                    );

                overflow:hidden;

            }


            .renew-you-offer-header::before {

                content:"";

                position:absolute;

                width:220px;

                height:220px;

                border-radius:50%;

                background:
                    rgba(255,255,255,.08);

                top:-100px;

                right:-70px;

            }


            .renew-you-offer-header::after {

                content:"";

                position:absolute;

                width:160px;

                height:160px;

                border-radius:50%;

                background:
                    rgba(255,255,255,.06);

                bottom:-90px;

                left:-50px;

            }


            .renew-you-offer-eyebrow {

                position:relative;

                z-index:1;

                display:inline-block;

                padding:
                    6px
                    13px;

                border:
                    1px solid
                    rgba(255,255,255,.3);

                border-radius:50px;

                font-size:10px;

                font-weight:800;

                letter-spacing:
                    .16em;

                margin-bottom:13px;

            }


            .renew-you-offer-discount {

                position:relative;

                z-index:1;

                font-size:4.5rem;

                line-height:.9;

                font-weight:900;

                letter-spacing:-.06em;

                margin-bottom:12px;

            }


            .renew-you-offer-title {

                position:relative;

                z-index:1;

                margin:0;

                font-size:
                    clamp(
                        1.55rem,
                        5vw,
                        2.15rem
                    );

                line-height:1.1;

                font-weight:850;

                letter-spacing:-.025em;

            }


            .renew-you-offer-subtitle {

                position:relative;

                z-index:1;

                max-width:390px;

                margin:
                    14px auto 0;

                font-size:.92rem;

                line-height:1.55;

                color:
                    rgba(255,255,255,.9);

            }


            /* ====================================================
               CONTENT
            ==================================================== */

            .renew-you-offer-content {

                padding:
                    28px 30px 25px;

            }


            .renew-you-offer-benefits {

                display:grid;

                gap:10px;

                margin-bottom:23px;

            }


            .renew-you-offer-benefit {

                display:flex;

                align-items:center;

                gap:10px;

                font-size:.84rem;

                line-height:1.4;

                color:#555;

            }


            .renew-you-offer-icon {

                flex:
                    0 0 24px;

                width:24px;

                height:24px;

                border-radius:50%;

                display:flex;

                align-items:center;

                justify-content:center;

                background:
                    rgba(138,52,159,.1);

                color:
                    #8a349b;

                font-size:13px;

                font-weight:900;

            }


            /* ====================================================
               FORM
            ==================================================== */

            .renew-you-offer-form {

                display:block;

            }


            .renew-you-offer-label {

                display:block;

                margin-bottom:7px;

                color:#383838;

                font-size:.78rem;

                font-weight:800;

                letter-spacing:.02em;

            }


            .renew-you-offer-input {

                display:block;

                width:100%;

                height:52px;

                padding:
                    0 15px;

                border:
                    1px solid #ded9e1;

                border-radius:11px;

                outline:none;

                background:#ffffff;

                color:#27212a;

                font-size:.95rem;

                box-sizing:border-box;

                transition:
                    border-color .2s ease,
                    box-shadow .2s ease;

            }


            .renew-you-offer-input:focus {

                border-color:
                    #8a349b;

                box-shadow:
                    0 0 0 4px
                    rgba(138,52,159,.1);

            }


            .renew-you-offer-error {

                min-height:18px;

                margin-top:7px;

                color:#c62828;

                font-size:.76rem;

                font-weight:600;

            }


            .renew-you-offer-submit {

                width:100%;

                min-height:53px;

                border:0;

                border-radius:11px;

                background:
                    linear-gradient(
                        135deg,
                        #8a349b,
                        #6f2b82
                    );

                color:#ffffff;

                font-size:.84rem;

                font-weight:850;

                letter-spacing:.04em;

                cursor:pointer;

                box-shadow:
                    0 7px 18px
                    rgba(111,43,130,.2);

                transition:
                    transform .2s ease,
                    box-shadow .2s ease,
                    opacity .2s ease;

                display:flex;

                align-items:center;

                justify-content:center;

                gap:10px;

            }


            .renew-you-offer-submit:hover {

                transform:
                    translateY(-1px);

                box-shadow:
                    0 10px 23px
                    rgba(111,43,130,.25);

            }


            .renew-you-offer-submit:disabled {

                cursor:
                    not-allowed;

                opacity:.7;

                transform:none;

            }


            .renew-you-offer-spinner {

                width:16px;

                height:16px;

                border:
                    2px solid
                    rgba(255,255,255,.35);

                border-top-color:
                    #ffffff;

                border-radius:50%;

                display:none;

                animation:
                    renewYouSpin
                    .7s linear infinite;

            }


            .renew-you-offer-submit.is-loading
            .renew-you-offer-spinner {

                display:block;

            }


            @keyframes renewYouSpin {

                to {
                    transform:rotate(360deg);
                }

            }


            .renew-you-offer-privacy {

                margin:
                    10px 0 0;

                text-align:center;

                color:#888;

                font-size:.68rem;

                line-height:1.45;

            }


            /* ====================================================
               SUCCESS
            ==================================================== */

            .renew-you-offer-success {

                text-align:center;

                padding:
                    8px 0 3px;

            }


            .renew-you-offer-success[hidden] {

                display:none;

            }


            .renew-you-offer-success-icon {

                width:58px;

                height:58px;

                margin:
                    0 auto 14px;

                border-radius:50%;

                display:flex;

                align-items:center;

                justify-content:center;

                background:
                    rgba(79,148,12,.1);

                color:#4f940c;

                font-size:27px;

                font-weight:900;

            }


            .renew-you-offer-success h3 {

                margin:
                    0 0 8px;

                color:#342338;

                font-size:1.35rem;

            }


            .renew-you-offer-success p {

                margin:
                    0 auto 7px;

                max-width:360px;

                color:#666;

                font-size:.88rem;

                line-height:1.5;

            }


            .renew-you-offer-success-small {

                font-size:.76rem !important;

                color:#888 !important;

            }


            .renew-you-offer-done {

                margin-top:16px;

                padding:
                    11px 25px;

                border:0;

                border-radius:9px;

                background:#8a349b;

                color:#ffffff;

                font-weight:800;

                cursor:pointer;

            }


            /* ====================================================
               FOOTER
            ==================================================== */

            .renew-you-offer-footer {

                display:flex;

                flex-direction:column;

                align-items:center;

                gap:3px;

                padding:
                    15px 20px 18px;

                border-top:
                    1px solid #f0edf1;

                text-align:center;

                color:#777;

                font-size:.69rem;

                line-height:1.45;

            }


            .renew-you-offer-footer strong {

                color:#5e2b69;

                font-size:.73rem;

            }


            .renew-you-offer-footer a {

                color:#7a318b;

                font-weight:800;

                text-decoration:none;

            }


            /* ====================================================
               MOBILE
            ==================================================== */

@media (max-width:600px) {

    .renew-you-offer-overlay {

        padding:10px;

        align-items:center;

    }


    .renew-you-offer-modal {

        width:
            min(100%, 480px);

        max-height:
            calc(100vh - 20px);

        border-radius:20px;

        transform:
            translateY(20px)
            scale(.94);

    }


    .renew-you-offer-overlay.is-visible
    .renew-you-offer-modal {

        transform:
            translateY(0)
            scale(.94);

    }


    .renew-you-offer-header {

        padding:
            22px 20px 20px;

    }


    .renew-you-offer-logo-wrap {

        margin-bottom:11px;

        padding:
            6px 12px;

        border-radius:10px;

    }


    .renew-you-offer-logo {

        width:
            min(145px, 52vw);

    }


    .renew-you-offer-eyebrow {

        font-size:9px;

        padding:
            5px 10px;

        margin-bottom:7px;

    }


    .renew-you-offer-discount {

        font-size:3.2rem;

        margin-bottom:5px;

    }


    .renew-you-offer-title {

        font-size:1.35rem;

        line-height:1.05;

    }


    .renew-you-offer-subtitle {

        font-size:.75rem;

        line-height:1.35;

        margin-top:8px;

    }


    .renew-you-offer-content {

        padding:
            17px 18px 15px;

    }


    .renew-you-offer-benefits {

        gap:6px;

        margin-bottom:13px;

    }


    .renew-you-offer-benefit {

        font-size:.72rem;

    }


    .renew-you-offer-icon {

        flex:
            0 0 20px;

        width:20px;

        height:20px;

        font-size:11px;

    }


    .renew-you-offer-label {

        font-size:.7rem;

        margin-bottom:4px;

    }


    .renew-you-offer-input {

        height:45px;

        font-size:.82rem;

    }


    .renew-you-offer-error {

        min-height:13px;

        margin-top:3px;

        font-size:.68rem;

    }


    .renew-you-offer-submit {

        min-height:45px;

        font-size:.72rem;

    }


    .renew-you-offer-privacy {

        margin-top:6px;

        font-size:.6rem;

    }


    .renew-you-offer-footer {

        padding:
            10px 12px 11px;

        font-size:.6rem;

        line-height:1.3;

    }

}
.renew-you-offer-logo-wrap {

    margin-bottom:16px;

    padding:
        8px 14px;

    border-radius:11px;

}


.renew-you-offer-logo {

    width:
        min(165px, 58vw);

}
            }

            @media (max-width:600px) {

    .renew-you-offer-modal.success-state {

        max-height:
            calc(100vh - 20px);

    }


    .renew-you-offer-modal.success-state
    .renew-you-offer-content {

        padding:
            15px 18px 18px;

    }


    .renew-you-offer-modal.success-state
    .renew-you-offer-success-icon {

        width:48px;

        height:48px;

        margin-bottom:8px;

        font-size:23px;

    }


    .renew-you-offer-modal.success-state
    .renew-you-offer-success h3 {

        font-size:1.18rem;

        margin-bottom:5px;

    }


    .renew-you-offer-modal.success-state
    .renew-you-offer-success p {

        font-size:.75rem;

        line-height:1.35;

    }


    .renew-you-offer-modal.success-state
    .renew-you-offer-done {

        min-height:42px;

        margin-top:10px;

    }

}
        </style>
    `;


    bindRenewYouOfferEvents();

}


/* ============================================================
   EVENT BINDING
============================================================ */

function bindRenewYouOfferEvents() {

    const overlay =
        document.getElementById(
            'renewYouOfferOverlay'
        );


    const closeButton =
        document.getElementById(
            'renewYouOfferClose'
        );


    const doneButton =
        document.getElementById(
            'renewYouOfferDone'
        );


    const form =
        document.getElementById(
            'renewYouOfferForm'
        );


    /*
     * CLOSE BUTTON
     */
    if (closeButton) {

        closeButton.addEventListener(
            'click',
            closeRenewYouOfferPopup
        );

    }


    /*
     * DONE BUTTON
     */
    if (doneButton) {

        doneButton.addEventListener(
            'click',
            closeRenewYouOfferPopup
        );

    }


    /*
     * CLICK OUTSIDE MODAL
     */
    if (overlay) {

        overlay.addEventListener(
            'click',
            event => {

                if (
                    event.target === overlay
                ) {

                    closeRenewYouOfferPopup();

                }

            }
        );

    }


    /*
     * ESCAPE KEY
     */
    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Escape' &&
                overlay &&
                overlay.classList.contains(
                    'is-visible'
                )
            ) {

                closeRenewYouOfferPopup();

            }

        }
    );


    /*
     * FORM SUBMISSION
     */
    if (form) {

        form.addEventListener(
            'submit',
            handleRenewYouOfferSubmit
        );

    }

}


/* ============================================================
   OPEN
============================================================ */

function openRenewYouOfferPopup() {

    const overlay =
        document.getElementById(
            'renewYouOfferOverlay'
        );


    if (!overlay) {

        return;

    }


    overlay.classList.add(
        'is-visible'
    );


    overlay.setAttribute(
        'aria-hidden',
        'false'
    );


    document.body.style.overflow =
        'hidden';


    window.setTimeout(
        () => {

            const emailInput =
                document.getElementById(
                    'renewYouOfferEmail'
                );


            if (emailInput) {

                emailInput.focus();

            }

        },
        250
    );

}


/* ============================================================
   CLOSE
============================================================ */

function closeRenewYouOfferPopup() {

    const overlay =
        document.getElementById(
            'renewYouOfferOverlay'
        );


    if (!overlay) {

        return;

    }


    overlay.classList.remove(
        'is-visible'
    );


    overlay.setAttribute(
        'aria-hidden',
        'true'
    );


    document.body.style.overflow =
        '';


    /*
     * Don't immediately show it again during
     * this browser session.
     */
    sessionStorage.setItem(
        RENEW_YOU_POPUP_CONFIG.sessionKey,
        'true'
    );

}


/* ============================================================
   SUBMIT
============================================================ */

async function handleRenewYouOfferSubmit(
    event
) {

    event.preventDefault();


    const emailInput =
        document.getElementById(
            'renewYouOfferEmail'
        );


    const submitButton =
        document.getElementById(
            'renewYouOfferSubmit'
        );


    const submitText =
        document.getElementById(
            'renewYouOfferSubmitText'
        );


    const errorBox =
        document.getElementById(
            'renewYouOfferError'
        );


    const form =
        document.getElementById(
            'renewYouOfferForm'
        );


    const success =
        document.getElementById(
            'renewYouOfferSuccess'
        );


    if (
        !emailInput ||
        !submitButton
    ) {

        return;

    }


    const email =
        emailInput.value
            .trim()
            .toLowerCase();


    if (!isValidEmail(email)) {

        if (errorBox) {

            errorBox.textContent =
                'Please enter a valid email address.';

        }


        emailInput.focus();

        return;

    }


    if (errorBox) {

        errorBox.textContent =
            '';

    }


    submitButton.disabled =
        true;


    submitButton.classList.add(
        'is-loading'
    );


    if (submitText) {

        submitText.textContent =
            'SENDING YOUR CODE...';

    }


    try {

        const response =
            await fetch(
                RENEW_YOU_POPUP_CONFIG
                    .edgeFunctionUrl,
                {
                    method:'POST',

                    headers:{
                        'Content-Type':
                            'application/json'
                    },

                    body:
                        JSON.stringify({
                            email:
                                email
                        })
                }
            );


        let result =
            null;


        try {

            result =
                await response.json();

        } catch (
            jsonError
        ) {

            result =
                null;

        }


        if (!response.ok) {

            throw new Error(
                result?.error ||
                'Unable to generate your discount code.'
            );

        }


        /*
         * Store the exact time the visitor successfully
         * received their offer code.
         */
        localStorage.setItem(
            RENEW_YOU_POPUP_CONFIG.storageKey,
            String(
                Date.now()
            )
        );


        /*
         * Hide the form.
         */
        if (form) {

            form.style.display =
                'none';

        }


        /*
         * Show the success message.
         */
        if (success) {

            success.hidden =
                false;

        }


        /*
         * Switch the modal into the compact
         * success-state layout.
         */
        const modal =
            document.querySelector(
                '.renew-you-offer-modal'
            );


        if (modal) {

            modal.classList.add(
                'success-state'
            );

        }


    } catch (
        error
    ) {

        console.error(
            'Wellness offer submission error:',
            error
        );


        if (errorBox) {

            errorBox.textContent =
                error.message ||
                'Something went wrong. Please try again.';

        }


        submitButton.disabled =
            false;


        submitButton.classList.remove(
            'is-loading'
        );


        if (submitText) {

            submitText.textContent =
                'GET MY 10% OFF CODE';

        }

    }

}

/* ============================================================
   EMAIL VALIDATION
============================================================ */

function isValidEmail(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}