/** * ReNew You Health & Wellness - Core Pillars Module (Pillar 04) * Location: assets/js/pillar-four.js */ 
document.addEventListener('DOMContentLoaded', () => { 
    renderCorePillarFour(); 
}); 

/** * Renders the fourth structural narrative row with Text Left / Image Right layout */ 
function renderCorePillarFour() { 
    const target = document.getElementById('pillar-four-target'); 
    if (!target) return; 
    
    target.innerHTML = ` 
        <!-- ROW 4: Text Left / Image Right (Modern Healthcare) --> 
        <div class="pillar-four-container" style="width: 100%; background-color: #ffffff; padding: 100px 20px; box-sizing: border-box; border-top: 1px solid rgba(138, 52, 159, 0.04); border-bottom: 1px solid rgba(138, 52, 159, 0.04); margin-bottom: 0;"> 
            <style>
                /* Mobile Architecture Match for Pillar 04 */
                @media (max-width: 768px) {
                    /* Condense Section padding */
                    .pillar-four-container {
                        padding: 40px 20px !important;
                    }
                    
                    /* Forces the right-side image block to stack on top */
                    .pillar-four-inner {
                        flex-direction: column-reverse !important;
                        gap: 25px !important;
                    }
                    
                    /* Match compact image layout parameters from prior sections */
                    .pillar-four-image-block {
                        width: 100% !important;
                        min-width: 100% !important;
                        height: 220px !important; /* Compact 220px scaling */
                        border-radius: 20px !important; /* Softens standard 28px layout corners */
                    }
                    
                    /* Balanced Typography Text Centering */
                    .pillar-four-text-block {
                        min-width: 100% !important;
                        text-align: center !important;
                    }
                    .pillar-four-text-block .pillar-badge-wrapper {
                        justify-content: center !important;
                        margin-bottom: 12px !important;
                    }
                    .pillar-four-text-block h3 {
                        font-size: 1.6rem !important;
                        margin-bottom: 15px !important;
                    }
                    .pillar-four-text-block p {
                        font-size: 1rem !important;
                        line-height: 1.55 !important;
                    }
                    .pillar-four-text-block p:first-of-type {
                        margin-bottom: 12px !important;
                    }
                }
            </style>

            <div class="pillar-four-inner" style="max-width: 1450px; margin: 0 auto; display: flex; flex-wrap: wrap-reverse; align-items: center; gap: 80px;"> 
                <!-- Left Side: Content Area --> 
                <div class="pillar-four-text-block" style="flex: 1; min-width: 400px; padding: 0; text-align: left; box-sizing: border-box;"> 
                    <div style="max-width: 600px; margin: 0 auto;"> 
                        <div class="pillar-badge-wrapper" style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;"> 
                            <span style="font-size: 0.85rem; font-weight: 700; color: var(--purple-accent); background: rgba(138, 52, 159, 0.06); padding: 4px 12px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;"> Core Pillar 04 </span> 
                        </div> 
                        <h3 style="color: var(--purple-primary); font-size: 2.2rem; font-weight: 800; margin: 0 0 25px 0; letter-spacing: -0.5px; line-height: 1.2;"> Evidence-Based Clinical Innovation </h3> 
                        <p style="font-size: 1.15rem; line-height: 1.8; color: #444; margin: 0 0 20px 0;"> We marry sophisticated, evidence-based medical diagnostics with continuous patient lifestyle support and health literacy. Our practice integrates the latest clinical developments in metabolism monitoring, preventative screening analytics, and nutritional injection metrics. </p> 
                        <p style="font-size: 1.15rem; line-height: 1.8; color: #555; margin: 0;"> By emphasizing whole-person medicine and wellness education, we don't just treat your active baseline symptoms—we isolate root physical causes and equip you with the practical tools needed to prevent illness, reclaim metabolic energy, and protect your physical longevity. </p> 
                    </div> 
                </div> 

                <!-- Right Side: Modern Image Area with Clean Border Radius Matching All Prior Pillars --> 
                <div class="pillar-four-image-block" style="flex: 1; min-width: 400px; height: 520px; overflow: hidden; border-radius: 28px; box-shadow: 0 15px 45px rgba(62, 13, 95, 0.04); border: 1px solid rgba(138, 52, 159, 0.06); box-sizing: border-box;"> 
                    <img src="images/Core-Pillar-04.png" alt="Modern Diagnostics and Medical Technologies" style="width: 100%; height: 100%; object-fit: cover; display: block;" loading="lazy" decoding="async"> 
                </div> 
            </div> 
        </div> 
    `; 
}
