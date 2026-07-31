/** * ReNew You Health & Wellness - Core Pillars Module (Pillar 02) * Location: assets/js/section-3.js */ 
document.addEventListener('DOMContentLoaded', () => { 
    renderCorePillarTwo(); 
}); 

/** * Renders the second structural narrative row with Text Left / Image Right layout */ 
function renderCorePillarTwo() { 
    const target = document.getElementById('pillar-two-target'); 
    if (!target) return; 
    
    target.innerHTML = ` 
        <!-- ROW 2: Text Left / Image Right (Convenient Appointments) --> 
        <div class="pillar-two-container" style="width: 100%; background-color: #ffffff; padding: 100px 20px; box-sizing: border-box; border-top: 1px solid rgba(138, 52, 159, 0.04); border-bottom: 1px solid rgba(138, 52, 159, 0.04);"> 
            <style>
                /* Mobile Architecture Match for Pillar 02 */
                @media (max-width: 768px) {
                    /* Condense Section padding */
                    .pillar-two-container {
                        padding: 40px 20px !important;
                    }
                    
                    /* Forces the image block to the top of the column text area */
                    .pillar-two-inner {
                        flex-direction: column-reverse !important;
                        gap: 25px !important;
                    }
                    
                    /* Match image layout constraints from Hero and Pillar 01 */
                    .pillar-two-image-block {
                        width: 100% !important;
                        min-width: 100% !important;
                        height: 220px !important; /* Scaled down from 300px for a more compact look */
                        border-radius: 20px !important; /* Softens standard 28px layout corners */
                    }
                    
                    /* Balanced Typography Text Centering */
                    .pillar-two-text-block {
                        min-width: 100% !important;
                        text-align: center !important;
                    }
                    .pillar-two-text-block .pillar-badge-wrapper {
                        justify-content: center !important;
                        margin-bottom: 12px !important;
                    }
                    .pillar-two-text-block h3 {
                        font-size: 1.6rem !important;
                        margin-bottom: 15px !important;
                    }
                    .pillar-two-text-block p {
                        font-size: 1rem !important;
                        line-height: 1.55 !important;
                    }
                    .pillar-two-text-block p:first-of-type {
                        margin-bottom: 12px !important;
                    }
                }
            </style>

            <div class="pillar-two-inner" style="max-width: 1450px; margin: 0 auto; display: flex; flex-wrap: wrap-reverse; align-items: center; gap: 80px;"> 
                <!-- Left Side: Content Area --> 
                <div class="pillar-two-text-block" style="flex: 1; min-width: 400px; padding: 0; text-align: left; box-sizing: border-box;"> 
                    <div style="max-width: 600px; margin: 0 auto;"> 
                        <div class="pillar-badge-wrapper" style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;"> 
                            <span style="font-size: 0.85rem; font-weight: 700; color: var(--purple-accent); background: rgba(138, 52, 159, 0.06); padding: 4px 12px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;"> Core Pillar 02 </span> 
                        </div> 
                        <h3 style="color: var(--purple-primary); font-size: 2.2rem; font-weight: 800; margin: 0 0 25px 0; letter-spacing: -0.5px; line-height: 1.2;"> Frictionless Medical Access </h3> 
                        <p style="font-size: 1.15rem; line-height: 1.8; color: #444; margin: 0 0 20px 0;"> Modern life is fast and demanding, which means accessing medical care should never feel like an administrative chore or a scheduling conflict. We offer flexible session times designed around busy professional routines and family commitments, minimizing waiting room times to get you seen rapidly. </p> 
                        <p style="font-size: 1.15rem; line-height: 1.8; color: #555; margin: 0;"> Our integrated medical framework includes advanced telemedicine access for eligible follow-ups, medication reviews, and ongoing weight metrics. You can consult directly with your dedicated care practitioner right from your computer or smartphone, entirely eliminating unnecessary travel time without sacrificing provider quality. </p> 
                    </div> 
                </div> 

                <!-- Right Side: Modern Image Area with Clean Border Radius Matching Pillar 1 --> 
                <div class="pillar-two-image-block" style="flex: 1; min-width: 400px; height: 520px; overflow: hidden; border-radius: 28px; box-shadow: 0 15px 45px rgba(62, 13, 95, 0.04); border: 1px solid rgba(138, 52, 159, 0.06); box-sizing: border-box;"> 
                    <img src="images/Core-Pillar-02.png" alt="Convenient Scheduling and Telemedicine Options" style="width: 100%; height: 100%; object-fit: cover; display: block;"> 
                </div> 
            </div> 
        </div> 
    `; 
}
