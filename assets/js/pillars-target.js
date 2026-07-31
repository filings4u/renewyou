/**
 * ReNew You Health & Wellness - Core Pillars Module
 * Location: assets/js/section-2.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderCorePillars();
});

/**
 * Renders an alternating structural narrative highlighting clinical pillars
 */
function renderCorePillars() {
    const target = document.getElementById('pillars-target');
    if (!target) return;

    target.innerHTML = `
        <div style="width: 100%; display: flex; flex-direction: column; background-color: #F9F9F8;">
            
            <!-- SECTION HEADER BANNER -->
            <div style="background-color: #F9F9F8; padding: 120px 20px 60px 20px; text-align: center; width: 100%; box-sizing: border-box;">
                <div style="max-width: 1450px; margin: 0 auto;">
                    <span style="color: var(--green-secondary); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; background-color: rgba(79, 148, 12, 0.06); padding: 6px 16px; border-radius: 20px; margin-bottom: 20px;">
                        The ReNew You Difference
                    </span>
                    <h2 style="font-size: 2.6rem; color: var(--purple-primary); font-weight: 800; margin: 0; letter-spacing: -0.5px; line-height: 1.2;">
                        Why Choose Our Clinic?
                    </h2>
                    <p style="color: #555; font-size: 1.15rem; max-width: 650px; margin: 20px auto 0 auto; line-height: 1.6;">
                        Discover the clinical principles and specialized patient-first advantages that define our diagnostic workflows and medical philosophy every single day.
                    </p>
                </div>
            </div>

            <!-- ROW 1: Image Left / Text Right (Personalized Care) -->
            <div style="width: 100%; padding: 40px 20px 100px 20px; box-sizing: border-box;">
                <div style="max-width: 1450px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; gap: 80px;">
                    
                    <!-- Left Side: Modern Image Area with Clean Border Radius -->
                    <div style="flex: 1; min-width: 400px; height: 520px; overflow: hidden; border-radius: 28px; box-shadow: 0 15px 45px rgba(62, 13, 95, 0.05); border: 1px solid rgba(138, 52, 159, 0.08); box-sizing: border-box;">
                        <img src="images/Core-Pillar-01.png" alt="Personalized Care at ReNew You" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                    </div>

                    <!-- Right Side: Content Area -->
                    <div style="flex: 1; min-width: 400px; padding: 0; text-align: left; box-sizing: border-box;">
                        <div style="max-width: 600px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                <span style="font-size: 0.85rem; font-weight: 700; color: var(--purple-accent); background: rgba(138, 52, 159, 0.06); padding: 4px 12px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Core Pillar 01
                                </span>
                            </div>
                            
                            <h3 style="color: var(--purple-primary); font-size: 2.2rem; font-weight: 800; margin: 0 0 25px 0; letter-spacing: -0.5px; line-height: 1.2;">
                                Personalized Medical Architecture
                            </h3>
                            
                            <p style="font-size: 1.15rem; line-height: 1.8; color: #444; margin: 0 0 20px 0;">
                                Every treatment plan we construct is customized to align directly with your individual anatomy, health markers, and lifestyle goals. We do not use cookie-cutter primary templates or universal drug recommendations because we know your biology is completely unique.
                            </p>
                            
                            <p style="font-size: 1.15rem; line-height: 1.8; color: #555; margin: 0;">
                                Our clinicians spend extensive time evaluating your personal history, baseline nutrition patterns, sleep cycles, and daily stress factors. By tracking subtle body metric indicators over time, we adjust our strategies fluidly to maximize your performance, build confidence, and ensure you achieve permanent health results.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `;
}
