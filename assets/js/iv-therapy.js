/**
 * ReNew You Health & Wellness - IV Therapy Infusions Component Engine (Centered Header Fix)
 * Location: assets/js/iv-therapy.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('iv-therapy-target');
    if (!target) return;

    target.innerHTML = `
        <style>
            .iv-outer-wrap {
                max-width: 1300px;
                margin: 0 auto;
                padding: clamp(40px, 8vw, 80px) 20px;
                box-sizing: border-box;
            }
            .iv-header-block {
                text-align: center; /* Centers container layouts across desktop and mobile screens */
                margin-bottom: 60px;
                width: 100%;
            }
            .iv-main-title {
                color: var(--purple-primary);
                font-size: clamp(2rem, 5vw, 3rem);
                font-weight: 800;
                margin: 0 0 10px 0;
                letter-spacing: -0.8px;
                text-align: center;
            }
            .iv-tagline {
                color: var(--purple-accent);
                font-weight: 700;
                font-size: clamp(1.1rem, 2.5vw, 1.4rem);
                margin: 0 auto 25px auto; /* FIXED: Centered on desktop */
                letter-spacing: -0.2px;
                text-align: center;
            }
            .iv-intro-text {
                color: #444;
                font-size: clamp(1rem, 2vw, 1.1rem);
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                text-align: center;
            }
            .iv-menu-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                gap: 25px;
                margin-top: 50px;
            }
            .iv-card {
                background: #ffffff;
                border: 1px solid rgba(138, 52, 159, 0.05);
                border-radius: 24px;
                padding: 35px;
                box-shadow: 0 10px 30px rgba(62,13,95,0.01);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-sizing: border-box;
            }
            .iv-card-title {
                color: var(--purple-primary);
                font-size: 1.4rem;
                font-weight: 800;
                margin: 0 0 12px 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            @media (max-width: 768px) {
                .iv-outer-wrap { padding: 40px 15px; }
                .iv-header-block { margin-bottom: 35px; }
                .iv-menu-grid { grid-template-columns: 1fr; gap: 20px; margin-top: 30px; }
                .iv-card { padding: 25px 20px; }
            }
        </style>
        <div class="iv-outer-wrap">
            <!-- Central Header Block -->
            <!-- ADD THE ID HERE SO IT NEVER GETS OVERWRITTEN -->
        <div class="iv-header-block" id="iv-menu-target">
            <h1 class="iv-main-title">IV Therapy Infusions</h1>
            <p class="iv-tagline">Restore. Rehydrate. ReNew You.</p>
            <p class="iv-intro-text">...</p>
        </div>

            <!-- Dynamic IV Menu Grid Matrix -->
            <div class="iv-menu-grid">
                <!-- Infusion 1: B Lean -->
                <div class="iv-card">
                    <div>
                        <h3 class="iv-card-title">⚡ B Lean IV</h3>
                        <p style="color: #555; line-height: 1.6; font-size: 0.95rem; margin: 0;">Designed to support hydration, energy, metabolism, and overall wellness. A masterfully balanced formula engineered to kickstart sluggish metabolic indicators and refresh baseline cognitive vitality loops.</p>
                    </div>
                    <a href="contact.html" style="display: block; width: 100%; border: 1px solid var(--purple-accent); color: var(--purple-primary); text-align: center; text-decoration: none; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-top: 25px; box-sizing: border-box;">Inquire About B Lean</a>
                </div>

                <!-- Infusion 2: Quench -->
                <div class="iv-card">
                    <div>
                        <h3 class="iv-card-title">💧 Quench IV</h3>
                        <p style="color: #555; line-height: 1.6; font-size: 0.95rem; margin: 0;">A hydration-focused infusion created to help replenish fluids and provide nutrient support. Formulated specifically to completely reverse severe clinical cellular hydration deficits and clear physical fatigue structures rapidly.</p>
                    </div>
                    <a href="contact.html" style="display: block; width: 100%; border: 1px solid var(--purple-accent); color: var(--purple-primary); text-align: center; text-decoration: none; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-top: 25px; box-sizing: border-box;">Inquire About Quench</a>
                </div>

                <!-- Infusion 3: Recovery & Performance -->
                <div class="iv-card" style="border-color: rgba(79, 148, 12, 0.2); box-shadow: 0 10px 30px rgba(79,148,12,0.02);">
                    <div>
                        <h3 class="iv-card-title" style="color: var(--green-primary);">🏋️‍♂️ Recovery & Performance IV</h3>
                        <p style="color: #555; line-height: 1.6; font-size: 0.95rem; margin: 0;">Designed for active lifestyles and may help support hydration, energy, muscle recovery, and physical performance. Features targeted amino acid configurations to cut recovery times post-exertion loops.</p>
                    </div>
                    <a href="contact.html" style="display: block; width: 100%; background: linear-gradient(135deg, var(--purple-accent), var(--purple-primary)); color: #fff; text-align: center; text-decoration: none; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-top: 25px; box-shadow: 0 4px 12px rgba(62,13,95,0.1); box-sizing: border-box;">Book Performance Drip</a>
                </div>
            </div>

            <!-- Future Menu Growth Segment -->
            <div style="background: #ffffff; border: 1px dashed rgba(138, 52, 159, 0.15); border-radius: 24px; padding: 40px 20px; text-align: center; margin-top: 40px; box-sizing: border-box;">
                <h3 style="color: var(--purple-primary); font-weight: 800; font-size: 1.3rem; margin: 0 0 10px 0;">🚀 More IV Infusions Coming Soon</h3>
                <p style="color: #666; font-size: 0.95rem; line-height: 1.6; max-width: 700px; margin: 0 auto;">We are continuously expanding our IV Therapy menu to provide our patients with additional options based on their wellness needs and goals. New IV infusions are regularly being added, so check back often or contact our office to learn about our latest customized formulations.</p>
            </div>
        </div>
    `;
});
