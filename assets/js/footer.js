/**
 * =========================================================
 * ReNew You Health & Wellness
 * MODERN HEALTHCARE FOOTER
 * =========================================================
 * Location:
 * assets/js/footer.js
 *
 * FOOTER STRUCTURE
 * 1. Brand / Contact
 * 2. Visit Us / Hours
 * 3. Patient Resources
 * 4. Legal & Policies / Connect
 * 5. Centered Disclaimer
 * 6. Footer Bottom
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    renderFooterModule();
});


function renderFooterModule() {

    const target = document.getElementById('footer-target');

    if (!target) {
        return;
    }


    target.innerHTML = `

        <footer
            class="renew-footer"
            aria-label="Website footer"
        >

            <style>

                /* =====================================================
                   FOOTER BASE
                ===================================================== */
.renew-footer {
    background:
        linear-gradient(
            135deg,
            #3E0D5F 0%,
            #4B176B 45%,
            #2F0848 100%
        ) !important;

    color:
        rgba(255,255,255,0.85);

    width:
        100%;

    box-sizing:
        border-box;

    padding:
        78px 20px 18px 20px;

    font-family:
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
}


                .renew-footer *,
                .renew-footer *::before,
                .renew-footer *::after {

                    box-sizing:
                        border-box;

                }


                /* =====================================================
                   MAIN FOUR-COLUMN AREA

                   IMPORTANT:
                   NO BORDER HERE.
                   The ONLY footer divider is below the disclaimer.
                ===================================================== */

                .renew-footer-container {

                    width:
                        100%;

                    max-width:
                        1450px;

                    margin:
                        0 auto;

                    display:
                        grid;

                    grid-template-columns:
                        minmax(260px, 1.25fr)
                        minmax(220px, 1fr)
                        minmax(220px, 1fr)
                        minmax(220px, 1fr);

                    column-gap:
                        70px;

                    padding-bottom:
                        55px;

                }


                /* =====================================================
                   COLUMN
                ===================================================== */

                .renew-footer-column {

                    min-width:
                        0;

                }


                /* =====================================================
                   BRAND
                ===================================================== */

                .renew-footer-brand {

                    display:
                        flex;

                    flex-direction:
                        column;

                    align-items:
                        flex-start;

                }


                .renew-footer-logo-link {

                    display:
                        inline-block;

                    text-decoration:
                        none;

                    margin-bottom:
                        20px;

                    transition:
                        opacity 0.2s ease,
                        transform 0.2s ease;

                }


                .renew-footer-logo-link:hover {

                    opacity:
                        0.88;

                    transform:
                        translateY(-1px);

                }


                .renew-footer-logo {

                    display:
                        block;

                    width:
                        150px;

                    height:
                        65px;

                    object-fit:
                        contain;

                    filter:
                        drop-shadow(
                            0 2px 5px
                            rgba(0,0,0,0.20)
                        );

                }


                .renew-footer-brand-title {

                    color:
                        var(--green-light, #70AD47);

                    margin:
                        0 0 12px 0;

                    font-size:
                        1.08rem;

                    font-weight:
                        800;

                    line-height:
                        1.2;

                }


                .renew-footer-description {

                    color:
                        rgba(255,255,255,0.76);

                    margin:
                        0 0 20px 0;

                    max-width:
                        315px;

                    font-size:
                        0.92rem;

                    line-height:
                        1.65;

                }


                /* =====================================================
                   CONTACT
                ===================================================== */

                .renew-footer-contact {

                    display:
                        flex;

                    flex-direction:
                        column;

                    gap:
                        11px;

                }


                .renew-footer-contact-item {

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        10px;

                    color:
                        rgba(255,255,255,0.82);

                    font-size:
                        0.88rem;

                    line-height:
                        1.4;

                }


                .renew-footer-contact-icon {

                    width:
                        17px;

                    flex:
                        0 0 17px;

                    text-align:
                        center;

                    font-size:
                        0.88rem;

                }


                .renew-footer-contact a {

                    color:
                        rgba(255,255,255,0.82);

                    text-decoration:
                        none;

                    transition:
                        color 0.2s ease;

                }


                .renew-footer-contact a:hover {

                    color:
                        var(--green-light, #70AD47);

                }


                /* =====================================================
                   SECTION HEADINGS
                ===================================================== */

                .renew-footer-heading {

                    color:
                        var(--green-light, #70AD47);

                    margin:
                        0 0 24px 0;

                    font-size:
                        1.02rem;

                    font-weight:
                        800;

                    line-height:
                        1.2;

                }


                /* =====================================================
                   VISIT US
                ===================================================== */

                .renew-footer-business-name {

                    color:
                        #ffffff;

                    margin:
                        0 0 17px 0;

                    font-size:
                        0.88rem;

                    font-weight:
                        800;

                    line-height:
                        1.4;

                }


                .renew-footer-address {

                    color:
                        rgba(255,255,255,0.82);

                    margin:
                        0 0 17px 0;

                    font-size:
                        0.88rem;

                    line-height:
                        1.55;

                }


                .renew-footer-phone {

                    color:
                        rgba(255,255,255,0.82);

                    margin:
                        0;

                    font-size:
                        0.88rem;

                    line-height:
                        1.5;

                }


                .renew-footer-phone strong {

                    color:
                        #ffffff;

                }


                .renew-footer-phone a {

                    color:
                        rgba(255,255,255,0.82);

                    text-decoration:
                        none;

                }


                .renew-footer-phone a:hover {

                    color:
                        var(--green-light, #70AD47);

                }


                /* =====================================================
                   HOURS
                ===================================================== */

                .renew-footer-hours {

                    margin-top:
                        32px;

                }


                .renew-footer-hours-list {

                    display:
                        flex;

                    flex-direction:
                        column;

                    gap:
                        13px;

                }


                .renew-footer-hours-item {

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        10px;

                    color:
                        rgba(255,255,255,0.82);

                    font-size:
                        0.88rem;

                    line-height:
                        1.4;

                }


                .renew-footer-hours-icon {

                    width:
                        18px;

                    flex:
                        0 0 18px;

                    text-align:
                        center;

                    font-size:
                        0.82rem;

                }


                .renew-footer-holiday {

                    margin:
                        18px 0 0 98px;

                    color:
                        rgba(255,255,255,0.45);

                    font-size:
                        0.76rem;

                    font-style:
                        italic;

                }


                /* =====================================================
                   FOOTER LINKS
                ===================================================== */

                .renew-footer-links {

                    display:
                        flex;

                    flex-direction:
                        column;

                    gap:
                        14px;

                    margin:
                        0;

                    padding:
                        0;

                    list-style:
                        none;

                }


                .renew-footer-links li {

                    margin:
                        0;

                    padding:
                        0;

                }


                .renew-footer-links a {

                    display:
                        inline-flex;

                    align-items:
                        center;

                    gap:
                        9px;

                    color:
                        rgba(255,255,255,0.82);

                    text-decoration:
                        none;

                    font-size:
                        0.88rem;

                    line-height:
                        1.35;

                    transition:
                        color 0.2s ease,
                        transform 0.2s ease;

                }


                .renew-footer-links a::before {

                    content:
                        "›";

                    color:
                        var(--green-light, #70AD47);

                    font-size:
                        1rem;

                    font-weight:
                        700;

                    line-height:
                        1;

                }


                .renew-footer-links a:hover {

                    color:
                        #ffffff;

                    transform:
                        translateX(2px);

                }


                /* =====================================================
                   CONNECT WITH US
                ===================================================== */

                .renew-footer-connect {

                    margin-top:
                        34px;

                    padding-top:
                        25px;

                    border-top:
                        1px solid
                        rgba(255,255,255,0.10);

                }


                .renew-footer-connect-heading {

                    color:
                        var(--green-light, #70AD47);

                    margin:
                        0 0 17px 0;

                    font-size:
                        0.88rem;

                    font-weight:
                        800;

                }


                .renew-footer-social {

                    display:
                        flex;

                    flex-direction:
                        column;

                    gap:
                        13px;

                }


                .renew-footer-social a {

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        10px;

                    color:
                        rgba(255,255,255,0.82);

                    text-decoration:
                        none;

                    font-size:
                        0.86rem;

                    transition:
                        color 0.2s ease,
                        transform 0.2s ease;

                }


                .renew-footer-social a:hover {

                    color:
                        #ffffff;

                    transform:
                        translateX(2px);

                }


                .renew-footer-social-icon {

                    width:
                        17px;

                    flex:
                        0 0 17px;

                    text-align:
                        center;

                    font-size:
                        0.85rem;

                }


                /* =====================================================
                   DISCLAIMER

                   THIS IS THE IMPORTANT PART.

                   The disclaimer is:
                   - OUTSIDE the grid
                   - CENTERED
                   - ABOVE the divider
                   - ONLY ONE divider exists
                ===================================================== */

                .renew-footer-disclaimer {

                    width:
                        100%;

                    max-width:
                        1450px;

                    margin:
                        0 auto;

                    padding:
                        0 0 14px 0;

                    color:
                        rgba(255,255,255,0.50);

                    font-size:
                        0.76rem;

                    line-height:
                        1.5;

                    text-align:
                        center;

                    white-space:
                        nowrap;

                    overflow:
                        hidden;

                    text-overflow:
                        clip;

                    border-bottom:
                        1px solid
                        rgba(255,255,255,0.12);

                }


                .renew-footer-disclaimer p {

                    margin:
                        0;

                    padding:
                        0;

                    width:
                        100%;

                    text-align:
                        center;

                }


                /* =====================================================
                   FOOTER BOTTOM

                   No border.
                   No extra divider.
                   Sits directly underneath disclaimer line.
                ===================================================== */

                .renew-footer-bottom {

                    width:
                        100%;

                    max-width:
                        1450px;

                    margin:
                        0 auto;

                    padding:
                        17px 0 0 0;

                }


                .renew-footer-bottom-row {

                    display:
                        flex;

                    justify-content:
                        space-between;

                    align-items:
                        center;

                    gap:
                        25px;

                    flex-wrap:
                        wrap;

                }


                .renew-footer-copyright {

                    margin:
                        0;

                    color:
                        #F9F9F8;

                    font-size:
                        0.80rem;

                    line-height:
                        1.5;

                }


                .renew-footer-bottom-links {

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        flex-end;

                    flex-wrap:
                        wrap;

                    gap:
                        22px;

                }


                .renew-footer-bottom-links a {

                    color:
                        rgba(255,255,255,0.48);

                    text-decoration:
                        none;

                    font-size:
                        0.76rem;

                    transition:
                        color 0.2s ease;

                }


                .renew-footer-bottom-links a:hover {

                    color:
                        #F9F9F8;

                }


                /* =====================================================
                   TABLET
                ===================================================== */

                @media (max-width: 1100px) {

                    .renew-footer-container {

                        grid-template-columns:
                            repeat(2, minmax(250px, 1fr));

                        row-gap:
                            55px;

                        column-gap:
                            50px;

                    }

                }


                /* =====================================================
                   MOBILE
                ===================================================== */

                @media (max-width: 700px) {

                    .renew-footer {

                        padding:
                            45px 18px 18px 18px;

                    }


                    .renew-footer-container {

                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));

                        column-gap:
                            28px;

                        row-gap:
                            38px;

                        padding-bottom:
                            35px;

                    }


                    .renew-footer-brand {

                        grid-column:
                            1 / -1;

                    }


                    .renew-footer-description {

                        max-width:
                            100%;

                    }


                    .renew-footer-heading {

                        font-size:
                            0.96rem;

                        margin-bottom:
                            18px;

                    }


                    .renew-footer-links {

                        gap:
                            11px;

                    }


                    .renew-footer-links a {

                        font-size:
                            0.78rem;

                    }


                    .renew-footer-social a {

                        font-size:
                            0.78rem;

                    }


                    .renew-footer-hours {

                        margin-top:
                            25px;

                    }


                    .renew-footer-holiday {

                        margin-left:
                            0;

                    }


                    /* Allow disclaimer to wrap ONLY on mobile */

                    .renew-footer-disclaimer {

                        white-space:
                            normal;

                        overflow:
                            visible;

                        padding:
                            0 10px 12px 10px;

                        font-size:
                            0.68rem;

                        line-height:
                            1.5;

                    }


                    .renew-footer-bottom {

                        padding:
                            15px 0 0 0;

                    }


                    .renew-footer-bottom-row {

                        flex-direction:
                            column;

                        align-items:
                            center;

                        text-align:
                            center;

                        gap:
                            12px;

                    }


                    .renew-footer-bottom-links {

                        justify-content:
                            center;

                        gap:
                            16px;

                    }

                }


                /* =====================================================
                   SMALL MOBILE
                ===================================================== */

                @media (max-width: 430px) {

                    .renew-footer-container {

                        grid-template-columns:
                            1fr;

                        row-gap:
                            30px;

                    }


                    .renew-footer-brand {

                        grid-column:
                            auto;

                    }


                    .renew-footer-column {

                        width:
                            100%;

                    }


                    .renew-footer-bottom-links {

                        gap:
                            12px;

                    }

                }

            </style>


            <!-- =====================================================
                 FOUR-COLUMN FOOTER CONTENT
            ===================================================== -->

            <div class="renew-footer-container">


                <!-- =================================================
                     COLUMN 1 — BRAND
                ================================================= -->

                <div
                    class="
                        renew-footer-column
                        renew-footer-brand
                    "
                >

                    <a
                        href="index.html"
                        class="renew-footer-logo-link"
                        aria-label="ReNew You Health & Wellness home"
                    >

                        <img
                            src="images/logof.png"
                            alt="ReNew You Health & Wellness"
                            class="renew-footer-logo"
                        >

                    </a>


                    <h3 class="renew-footer-brand-title">
                        ReNew You
                    </h3>


                    <p class="renew-footer-description">
                        Health & Wellness Clinic located in
                        Chicago Heights, IL. Empowering every
                        patient to renew their health from the
                        inside out.
                    </p>


                    <div class="renew-footer-contact">

                        <div class="renew-footer-contact-item">

                            <span
                                class="renew-footer-contact-icon"
                                aria-hidden="true"
                            >
                                📞
                            </span>

                            <a href="tel:7083292155">
                                708-329-2155
                            </a>

                        </div>


                        <div class="renew-footer-contact-item">

                            <span
                                class="renew-footer-contact-icon"
                                aria-hidden="true"
                            >
                                ✉
                            </span>

                            <a href="mailto:info@renewyouhealthwellness.com">
                                Send Us an Email
                            </a>

                        </div>

                    </div>

                </div>


                <!-- =================================================
                     COLUMN 2 — VISIT US / HOURS
                ================================================= -->

                <div class="renew-footer-column">

                    <h3 class="renew-footer-heading">
                        Visit Us
                    </h3>


                    <p class="renew-footer-business-name">
                        ReNew You Health & Wellness
                    </p>


                    <p class="renew-footer-address">
                        500 Ashland Ave., Suite 101<br>
                        Chicago Heights, IL 60411
                    </p>


                    <p class="renew-footer-phone">

                        <strong>Phone:</strong>

                        <a href="tel:7083292155">
                            708-329-2155
                        </a>

                    </p>


                    <div class="renew-footer-hours">

                        <h3 class="renew-footer-heading">
                            Hours
                        </h3>


                        <div class="renew-footer-hours-list">

                            <div class="renew-footer-hours-item">

                                <span class="renew-footer-hours-icon">
                                    🗓️
                                </span>

                                <span>
                                    Mon - Fri: 3pm - 7pm
                                </span>

                            </div>


                            <div class="renew-footer-hours-item">

                                <span class="renew-footer-hours-icon">
                                    🗓️
                                </span>

                                <span>
                                    Sat: 9am - 1pm
                                </span>

                            </div>


                            <div class="renew-footer-hours-item">

                                <span class="renew-footer-hours-icon">
                                    🗓️
                                </span>

                                <span>
                                    Sundays & Holidays: Closed
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                <!-- =================================================
                     COLUMN 3 — PATIENT RESOURCES
                ================================================= -->

                <div class="renew-footer-column">

                    <h3 class="renew-footer-heading">
                        Patient Resources
                    </h3>


                    <ul class="renew-footer-links">

                        <li>
                            <a href="hipaa-notice.html">
                                HIPAA Notice of Privacy Practices
                            </a>
                        </li>

                        <li>
                            <a href="good-faith-estimate.html">
                                Good Faith Estimate
                            </a>
                        </li>

                        <li>
                            <a href="patient-rights.html">
                                Patient Rights & Responsibilities
                            </a>
                        </li>

                        <li>
                            <a href="medical-records.html">
                                Medical Records
                            </a>
                        </li>

                        <li>
                            <a href="medical-disclaimer.html">
                                Medical Disclaimer
                            </a>
                        </li>

                    </ul>

                </div>


                <!-- =================================================
                     COLUMN 4 — LEGAL / CONNECT
                ================================================= -->

                <div class="renew-footer-column">

                    <h3 class="renew-footer-heading">
                        Legal & Policies
                    </h3>


                    <ul class="renew-footer-links">

                        <li>
                            <a href="privacy-policy.html">
                                Privacy Policy
                            </a>
                        </li>

                        <li>
                            <a href="terms-of-service.html">
                                Terms of Service
                            </a>
                        </li>

                        <li>
                            <a href="accessibility.html">
                                Accessibility Statement
                            </a>
                        </li>

                        <li>
                            <a href="sms-terms.html">
                                SMS / Text Messaging Terms
                            </a>
                        </li>

                        <li>
                            <a href="cookie-policy.html">
                                Cookie Policy
                            </a>
                        </li>

                    </ul>


                    <!-- SOCIAL -->

                    <div class="renew-footer-connect">

                        <h4 class="renew-footer-connect-heading">
                            Connect With Us
                        </h4>


                        <div class="renew-footer-social">

                            <a
                                href="https://www.facebook.com/Renewyouhealthwellness/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >

                                <span class="renew-footer-social-icon">
                                    🔗
                                </span>

                                Facebook

                            </a>


                            <a
                                href="https://www.instagram.com/renewyouhealthwellness"
                                target="_blank"
                                rel="noopener noreferrer"
                            >

                                <span class="renew-footer-social-icon">
                                    🔗
                                </span>

                                Instagram

                            </a>


                            <a
                                href="https://renewyouhealthwellness.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >

                                <span class="renew-footer-social-icon">
                                    🌐
                                </span>

                                Website

                            </a>

                        </div>

                    </div>

                </div>

            </div>


            <!-- =====================================================
                 DISCLAIMER

                 THIS IS OUTSIDE THE GRID.

                 TEXT
                 ↓
                 ONE LINE
                 ↓
                 BOTTOM FOOTER
            ===================================================== -->

            <div class="renew-footer-disclaimer">

  
            </div>


            <!-- =====================================================
                 FOOTER BOTTOM

                 NO BORDER HERE.
                 NO SECOND LINE.
            ===================================================== -->

            <div class="renew-footer-bottom">

                <div class="renew-footer-bottom-row">


                    <!-- COPYRIGHT -->

                    <p class="renew-footer-copyright">
                        &copy; 2026 ReNew You Health & Wellness. All rights reserved.
                    </p>


                    <!-- LEGAL LINKS -->

                    <div class="renew-footer-bottom-links">

                        <a href="privacy-policy.html">
                            Privacy
                        </a>

                        <a href="terms-of-service.html">
                            Terms
                        </a>

                        <a href="accessibility.html">
                            Accessibility
                        </a>

                        <a href="admin-dashboard.html">
                            Admin Login
                        </a>

                    </div>

                </div>

            </div>


        </footer>

    `;
}