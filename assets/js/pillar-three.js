/**
 * ReNew You Health & Wellness - Core Pillars Module (Pillar 03)
 * Location: assets/js/pillar-three.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderCorePillarThree();
});

/**
 * Renders the third structural narrative row with Image Left / Text Right layout
 */
function renderCorePillarThree() {
    const target = document.getElementById('pillar-three-target');
    if (!target) return;

    target.innerHTML = `
        <!-- ROW 3: Image Left / Text Right (Compassionate Provider) -->
        <div style="width: 100%; background-color: #F9F9F8; padding: 100px 20px 120px 20px; box-sizing: border-box;">
            <div style="max-width: 1450px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; gap: 80px;">
                
                <!-- Left Side: Modern Image Area with Clean Border Radius Matching Prior Pillars -->
                <div style="flex: 1; min-width: 400px; height: 520px; overflow: hidden; border-radius: 28px; box-shadow: 0 15px 45px rgba(62, 13, 95, 0.05); border: 1px solid rgba(138, 52, 159, 0.08); box-sizing: border-box;">
                    <img src="images/Core-Pillar-03.png" alt="Compassionate Care Provider Interactions" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                </div>

                <!-- Right Side: Content Area -->
                <div style="flex: 1; min-width: 400px; padding: 0; text-align: left; box-sizing: border-box;">
                    <div style="max-width: 600px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                            <span style="font-size: 0.85rem; font-weight: 700; color: var(--purple-accent); background: rgba(138, 52, 159, 0.06); padding: 4px 12px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                                Core Pillar 03
                            </span>
                        </div>
                        
                        <h3 style="color: var(--purple-primary); font-size: 2.2rem; font-weight: 800; margin: 0 0 25px 0; letter-spacing: -0.5px; line-height: 1.2;">
                            Empathetic, Relationship-First Care
                        </h3>
                        
                        <p style="font-size: 1.15rem; line-height: 1.8; color: #444; margin: 0 0 20px 0;">
                            True healing begins with a trusting relationship. Here, you will receive focused, one-on-one attention from an experienced Family Nurse Practitioner who listens intently, treats with deep professional empathy, and actively respects your voice in the clinical space.
                        </p>
                        
                        <p style="font-size: 1.15rem; line-height: 1.8; color: #555; margin: 0;">
                            We are fundamentally committed to maintaining a warm, non-judgmental community environment where you feel fully validated, safely educated, and supported at every stage. We step beyond basic triage to provide collaborative guidance, celebrating your milestones and driving you toward lasting, sustainable transformation.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    `;
}
