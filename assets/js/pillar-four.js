/**
 * ReNew You Health & Wellness - Core Pillars Module (Pillar 04)
 * Location: assets/js/pillar-four.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderCorePillarFour();
});

/**
 * Renders the fourth structural narrative row with Text Left / Image Right layout
 */
function renderCorePillarFour() {
    const target = document.getElementById('pillar-four-target');
    if (!target) return;

    target.innerHTML = `
        <!-- ROW 4: Text Left / Image Right (Modern Healthcare) -->
        <div style="width: 100%; background-color: #ffffff; padding: 100px 20px; box-sizing: border-box; border-top: 1px solid rgba(138, 52, 159, 0.04); border-bottom: 1px solid rgba(138, 52, 159, 0.04); margin-bottom: 0;">
            <div style="max-width: 1450px; margin: 0 auto; display: flex; flex-wrap: wrap-reverse; align-items: center; gap: 80px;">
                
                <!-- Left Side: Content Area -->
                <div style="flex: 1; min-width: 400px; padding: 0; text-align: left; box-sizing: border-box;">
                    <div style="max-width: 600px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                            <span style="font-size: 0.85rem; font-weight: 700; color: var(--purple-accent); background: rgba(138, 52, 159, 0.06); padding: 4px 12px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                                Core Pillar 04
                            </span>
                        </div>
                        
                        <h3 style="color: var(--purple-primary); font-size: 2.2rem; font-weight: 800; margin: 0 0 25px 0; letter-spacing: -0.5px; line-height: 1.2;">
                            Evidence-Based Clinical Innovation
                        </h3>
                        
                        <p style="font-size: 1.15rem; line-height: 1.8; color: #444; margin: 0 0 20px 0;">
                            We marry sophisticated, evidence-based medical diagnostics with continuous patient lifestyle support and health literacy. Our practice integrates the latest clinical developments in metabolism monitoring, preventative screening analytics, and nutritional injection metrics.
                        </p>
                        
                        <p style="font-size: 1.15rem; line-height: 1.8; color: #555; margin: 0;">
                            By emphasizing whole-person medicine and wellness education, we don't just treat your active baseline symptoms—we isolate root physical causes and equip you with the practical tools needed to prevent illness, reclaim metabolic energy, and protect your physical longevity.
                        </p>
                    </div>
                </div>

                <!-- Right Side: Modern Image Area with Clean Border Radius Matching All Prior Pillars -->
                <div style="flex: 1; min-width: 400px; height: 520px; overflow: hidden; border-radius: 28px; box-shadow: 0 15px 45px rgba(62, 13, 95, 0.04); border: 1px solid rgba(138, 52, 159, 0.06); box-sizing: border-box;">
                    <img src="images/Core-Pillar-04.png" alt="Modern Diagnostics and Medical Technologies" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                </div>

            </div>
        </div>
    `;
}
