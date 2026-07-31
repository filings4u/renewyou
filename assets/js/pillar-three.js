/** * ReNew You Health & Wellness - Core Pillars Module (Pillar 03) * Location: assets/js/pillar-three.js */ 
document.addEventListener('DOMContentLoaded', () => { 
    renderCorePillarThree(); 
}); 

/** * Renders the third structural narrative row with Image Left / Text Right layout */ 
function renderCorePillarThree() { 
    const target = document.getElementById('pillar-three-target'); 
    if (!target) return; 
    
    target.innerHTML = ` 
        <!-- ROW 3: Image Left / Text Right (Compassionate Provider) --> 
        <div class="pillar-three-container" style="width: 100%; background-color: #F9F9F8; padding: 100px 20px 120px 20px; box-sizing: border-box;"> 
            <style>
                /* Mobile Architecture Match for Pillar 03 */
                @media (max-width: 768px) {
                    /* Condense Section padding */
                    .pillar-three-container {
                        padding: 40px 20px !important;
                    }
                    
                    /* Stacks elements chronologically, keeping the image on top */
                    .pillar-three-inner {
                        flex-direction: column !important;
                        gap: 25px !important;
                    }
                    
                    /* Match compact image layout parameters from Pillar 02 */
                    .pillar-three-image-block {
                        width: 100% !important;
                        min-width: 100% !important;
                        height: 220px !important; /* Matches compact 220px sizing */
                        border-radius: 20px !important; /* Softens standard 28px layout corners */
                    }
                    
                    /* Balanced Typography Text Centering */
                    .pillar-three-text-block {
                        min-width: 100% !important;
                        text-align: center !important;
                    }
                    .pillar-three-text-block .pillar-badge-wrapper {
                        justify-content: center !important;
                        margin-bottom: 12px !important;
                    }
                    .pillar-three-text-block h3 {
                        font-size: 1.6rem !important;
                        margin-bottom: 15px !important;
                    }
                    .pillar-three-text-block p {
                        font-size: 1rem !important;
                        line-height: 1.55 !important;
                    }
                    .pillar-three-text-block p:first-of-type {
                        margin-bottom: 12px !important;
                    }
                }
            </style>

            <div class="pillar-three-inner" style="max-width: 1450px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; gap: 80px;"> 
                <!-- Left Side: Modern Image Area with Clean Border Radius Matching Prior Pillars --> 
                <div class="pillar-three-image-block" style="flex: 1; min-width: 400px; height: 520px; overflow: hidden; border-radius: 28px; box-shadow: 0 15px 45px rgba(62, 13, 95, 0.05); border: 1px solid rgba(138, 52, 159, 0.08); box-sizing: border-box;"> 
                    <img src="images/Core-Pillar-03.png" alt="Compassionate Care Provider Interactions" style="width: 100%; height: 100%; object-fit: cover; display: block;"> 
                </div> 

                <!-- Right Side: Content Area --> 
                <div class="pillar-three-text-block" style="flex: 1; min-width: 400px; padding: 0; text-align: left; box-sizing: border-box;"> 
                    <div style="max-width: 600px; margin: 0 auto;"> 
                        <div class="pillar-badge-wrapper" style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;"> 
                            <span style="font-size: 0.85rem; font-weight: 700; color: var(--purple-accent); background: rgba(138, 52, 159, 0.06); padding: 4px 12px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;"> Core Pillar 03 </span> 
                        </div> 
                        <h3 style="color: var(--purple-primary); font-size: 2.2rem; font-weight: 800; margin: 0 0 25px 0; letter-spacing: -0.5px; line-height: 1.2;"> Empathetic, Relationship-First Care </h3> 
                        <p style="font-size: 1.15rem; line-height: 1.8; color: #444; margin: 0 0 20px 0;"> True healing begins with a trusting relationship. Here, you will receive focused, one-on-one attention from an experienced Family Nurse Practitioner who listens intently, treats with deep professional empathy, and actively respects your voice in the clinical space. </p> 
                        <p style="font-size: 1.15rem; line-height: 1.8; color: #555; margin: 0;"> We are fundamentally committed to maintaining a warm, non-judgmental community environment where you feel fully validated, safely educated, and supported at every stage. We step beyond basic triage to provide collaborative guidance, celebrating your milestones and driving you toward lasting, sustainable transformation. </p> 
                    </div> 
                </div> 
            </div> 
        </div> 
    `; 
}
