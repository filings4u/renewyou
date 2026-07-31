/** * ReNew You Health & Wellness - Care Delivery Pipeline Section * Location: assets/js/services-1.js */ 
document.addEventListener('DOMContentLoaded', () => { 
    renderCareDeliveryPipeline(); 
}); 

/** * Renders a data-driven 3-step timeline detailing the patient clinical journey */ 
function renderCareDeliveryPipeline() { 
    const target = document.getElementById('services-1-target'); 
    if (!target) return; 

    target.innerHTML = ` 
        <style>
            /* Mobile Layout Rules for Care Delivery Pipeline Section */
            @media (max-width: 768px) {
                .pipeline-section-outer {
                    padding: 40px 15px !important;
                }
                .pipeline-grid {
                    flex-direction: column !important; /* Stacks components cleanly */
                    gap: 30px !important;
                }
                .pipeline-step-card {
                    text-align: center !important;
                }
                .pipeline-step-badge {
                    margin: 0 auto 12px auto !important;
                }
                .pipeline-step-card h4 {
                    font-size: 1.2rem !important;
                }
                .pipeline-step-card p {
                    font-size: 0.92rem !important;
                }
            }
        </style>

        <div class="pipeline-section-outer" style="background-color: #F9F9F8; padding: 60px 20px 40px 20px; width: 100%; box-sizing: border-box; border-bottom: 1px solid rgba(138, 52, 159, 0.04);"> 
            <!-- Global Architectural Container Wrapper -->
            <div class="pipeline-grid" style="max-width: 1450px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 40px; box-sizing: border-box;"> 
                
                <!-- Step 1 Card Component -->
                <div class="pipeline-step-card" style="flex: 1; min-width: 280px; box-sizing: border-box; text-align: left;">
                    <div class="pipeline-step-badge" style="width: 44px; height: 44px; background: var(--purple-primary); color: white; font-weight: 800; font-size: 1.1rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; box-shadow: 0 4px 12px rgba(62,13,95,0.15);">
                        1
                    </div>
                    <h4 style="font-size: 1.3rem; color: var(--purple-primary); font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.2px;">
                        Select Your Treatment Track
                    </h4>
                    <p style="font-size: 0.98rem; color: #555; line-height: 1.6; margin: 0;">
                        Review our options from medical weight monitoring pathways to preventative screening analytics or acute symptom management care.
                    </p>
                </div>

                <!-- Step 2 Card Component -->
                <div class="pipeline-step-card" style="flex: 1; min-width: 280px; box-sizing: border-box; text-align: left;">
                    <div class="pipeline-step-badge" style="width: 44px; height: 44px; background: var(--green-secondary); color: white; font-weight: 800; font-size: 1.1rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; box-shadow: 0 4px 12px rgba(79,148,12,0.15);">
                        2
                    </div>
                    <h4 style="font-size: 1.3rem; color: var(--purple-primary); font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.2px;">
                        Diagnostic Metric Mapping
                    </h4>
                    <p style="font-size: 0.98rem; color: #555; line-height: 1.6; margin: 0;">
                        Consult face-to-face with your Nurse Practitioner to isolate historical metrics, build anatomy baselines, and confirm your specific biology profile.
                    </p>
                </div>

                <!-- Step 3 Card Component -->
                <div class="pipeline-step-card" style="flex: 1; min-width: 280px; box-sizing: border-box; text-align: left;">
                    <div class="pipeline-step-badge" style="width: 44px; height: 44px; background: var(--purple-accent); color: white; font-weight: 800; font-size: 1.1rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; box-shadow: 0 4px 12px rgba(138,52,159,0.15);">
                        3
                    </div>
                    <h4 style="font-size: 1.3rem; color: var(--purple-primary); font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.2px;">
                        Continuous Provider Monitoring
                    </h4>
                    <p style="font-size: 0.98rem; color: #555; line-height: 1.6; margin: 0;">
                        Stay protected with flexible scheduling parameters, monthly performance follow-ups, and telemedicine support for medication modifications.
                    </p>
                </div>

            </div> 
        </div> 
    `; 
}
