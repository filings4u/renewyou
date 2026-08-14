/**
 * ReNew You Health & Wellness - Wellness Injections Component Engine (Centered Header Fix)
 * Location: assets/js/wellness-injections.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('wellness-injections-target');
    if (!target) return;

    target.innerHTML = `
        <style>
            .inj-outer-wrap {
                max-width: 1300px;
                margin: 0 auto;
                padding: clamp(40px, 8vw, 80px) 20px;
                box-sizing: border-box;
            }
            .inj-header-block {
                text-align: center; /* Centers the full header block container on desktop */
                margin-bottom: 60px;
                width: 100%;
            }
            .inj-main-title {
                color: var(--purple-primary);
                font-size: clamp(2rem, 5vw, 3rem);
                font-weight: 800;
                margin: 0 0 10px 0;
                letter-spacing: -0.8px;
                text-align: center;
            }
            .inj-tagline {
                color: var(--purple-accent);
                font-weight: 700;
                font-size: clamp(1.1rem, 2.5vw, 1.4rem);
                margin: 0 auto 25px auto; /* FIXED: Centered margin alignments */
                letter-spacing: -0.2px;
                text-align: center;
            }
            .inj-intro-text {
                color: #444;
                font-size: clamp(1rem, 2vw, 1.1rem);
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                text-align: center;
            }
            .inj-menu-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                gap: 25px;
                margin-top: 50px;
            }
            .inj-card {
                background: #ffffff;
                border: 1px solid rgba(138, 52, 159, 0.05);
                border-radius: 22px;
                padding: 30px;
                box-shadow: 0 10px 30px rgba(62,13,95,0.01);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-sizing: border-box;
            }
            .inj-card-title {
                color: var(--purple-primary);
                font-size: 1.3rem;
                font-weight: 800;
                margin: 0 0 10px 0;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .inj-notice-box {
                background: #ffffff;
                border-left: 4px solid var(--purple-accent);
                border-radius: 12px;
                padding: 25px;
                margin-top: 40px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.01);
                box-sizing: border-box;
            }
            @media (max-width: 768px) {
                .inj-outer-wrap { padding: 40px 15px; }
                .inj-header-block { margin-bottom: 35px; }
                .inj-menu-grid { grid-template-columns: 1fr; gap: 20px; margin-top: 30px; }
                .inj-card { padding: 25px 20px; }
                .inj-notice-box { padding: 20px; }
            }
        </style>
        <div class="inj-outer-wrap">
            <!-- Central Header Block -->
            <div class="inj-outer-wrap">
        <!-- ADD THE ID HERE SO IT NEVER GETS OVERWRITTEN -->
        <div class="inj-header-block" id="wellness-menu-target">
            <h1 class="inj-main-title">Wellness Injections</h1>
            <p class="inj-tagline">Wellness Support Made Convenient</p>
            <p class="inj-intro-text">...</p>
        </div>

            <!-- Dynamic Wellness Menu Grid Matrix -->
            <div class="inj-menu-grid">
                <!-- Injection 1: Vitamin B12 -->
                <div class="inj-card">
                    <div>
                        <h3 class="inj-card-title">🔋 Vitamin B12</h3>
                        <p style="color: #555; line-height: 1.6; font-size: 0.95rem; margin: 0;">Supports normal energy metabolism, red blood cell formation, and nervous system function. Ideal for clearing brain fog patterns.</p>
                    </div>
                    <a href="contact.html" style="display: block; width: 100%; border: 1px solid rgba(138, 52, 159, 0.15); color: var(--purple-primary); text-align: center; text-decoration: none; padding: 10px; border-radius: 10px; font-weight: 700; font-size: 0.85rem; margin-top: 25px; box-sizing: border-box;">Inquire About B12</a>
                </div>

                <!-- Injection 2: Lipo -->
                <div class="inj-card">
                    <div>
                        <h3 class="inj-card-title">🌱 Lipo</h3>
                        <p style="color: #555; line-height: 1.6; font-size: 0.95rem; margin: 0;">Contains lipotropic nutrients commonly incorporated into wellness and weight-management programs to support targeted metabolic output loops.</p>
                    </div>
                    <a href="contact.html" style="display: block; width: 100%; border: 1px solid rgba(138, 52, 159, 0.15); color: var(--purple-primary); text-align: center; text-decoration: none; padding: 10px; border-radius: 10px; font-weight: 700; font-size: 0.85rem; margin-top: 25px; box-sizing: border-box;">Inquire About Lipo</a>
                </div>

                <!-- Injection 3: Lipo B+ -->
                <div class="inj-card">
                    <div>
                        <h3 class="inj-card-title">✨ Lipo B+</h3>
                        <p style="color: #555; line-height: 1.6; font-size: 0.95rem; margin: 0;">Combines vital cellular lipotropic fat-burning nutrients with additional complex B vitamin support matrices to stabilize sustained clean energy.</p>
                    </div>
                    <a href="contact.html" style="display: block; width: 100%; border: 1px solid rgba(138, 52, 159, 0.15); color: var(--purple-primary); text-align: center; text-decoration: none; padding: 10px; border-radius: 10px; font-weight: 700; font-size: 0.85rem; margin-top: 25px; box-sizing: border-box;">Inquire About Lipo B+</a>
                </div>

                <!-- Injection 4: NAD+ -->
                <div class="inj-card" style="border-color: rgba(79, 148, 12, 0.2); box-shadow: 0 10px 30px rgba(79,148,12,0.02);">
                    <div>
                        <h3 class="inj-card-title" style="color: var(--green-primary);">🧬 NAD+</h3>
                        <p style="color: #555; line-height: 1.6; font-size: 0.95rem; margin: 0;">A naturally occurring coenzyme involved in critical cellular energy processes and offered as part of select individualized clinical optimization plans.</p>
                    </div>
                    <a href="contact.html" style="display: block; width: 100%; background: var(--purple-primary); color: #fff; text-align: center; text-decoration: none; padding: 10px; border-radius: 10px; font-weight: 700; font-size: 0.85rem; margin-top: 25px; box-sizing: border-box;">Book NAD+ Injection</a>
                </div>
            </div>

            <!-- Future Menu Expansion Banner Block -->
            <div style="background: #ffffff; border: 1px dashed rgba(138, 52, 159, 0.15); border-radius: 20px; padding: 35px 20px; text-align: center; margin-top: 30px; box-sizing: border-box;">
                <h3 style="color: var(--purple-primary); font-weight: 800; font-size: 1.25rem; margin: 0 0 8px 0;">🚀 More Wellness Injections Coming Soon</h3>
                <p style="color: #666; font-size: 0.95rem; line-height: 1.6; max-width: 700px; margin: 0 auto;">Our Wellness Injection menu continues to grow. We are regularly adding new injection options to better meet the needs of our patients. Check back frequently for new wellness injections, or contact our office for the most current options available.</p>
            </div>

            <!-- Mandatory Legal Clinical Care Screening Disclosures Container Panel -->
            <div class="inj-notice-box">
                <h3 style="margin: 0 0 10px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.2rem;">👨‍⚕️ Personalized Medical Care Notice</h3>
                <p style="color: #555; font-size: 0.95rem; line-height: 1.6; margin: 0;">All IV infusions and wellness injections are strictly subject to clinical provider evaluation and baseline medical eligibility check-ins. Our certified healthcare team will thoroughly review your personal health history, current medications list, known structural allergies, and unique wellness goals before authorizing or recommending any specialized clinical treatment pathways.</p>
            </div>
        </div>
    `;
});
