/** * ReNew You Health & Wellness - Prescription Compliance Framework * Location: assets/js/patient-docs.js */
document.addEventListener('DOMContentLoaded', () => {
    renderPrescriptionCompliance();
});

function renderPrescriptionCompliance() {
    const target = document.getElementById('patient-docs-target');
    if (!target) return;

    target.innerHTML = `
        <style>
            @media (max-width: 991px) {
                .compliance-split { flex-direction: column !important; gap: 40px !important; }
                .compliance-text-side { text-align: center !important; }
                .compliance-text-side span { margin: 0 auto 10px auto !important; }
            }
            @media (max-width: 768px) {
                .compliance-outer { padding: 40px 15px !important; }
                .compliance-panel-card { padding: 30px 20px !important; }
                .compliance-text-side h3 { font-size: 1.85rem !important; }
            }
        </style>
        <div class="compliance-outer" style="max-width: 1450px; margin: 0 auto; padding: 40px 20px; box-sizing: border-box;">
            <div class="compliance-split" style="display: flex; align-items: center; gap: 80px; box-sizing: border-box;">
                
                <!-- Left Column: Core Healthcare Regulation Text -->
                <div class="compliance-text-side" style="flex: 1; text-align: left; box-sizing: border-box;">
                    <span style="color: var(--purple-accent); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; margin-bottom: 12px; background: rgba(138,52,159,0.04); padding: 4px 12px; border-radius: 30px;">Pharmacy & Safety</span>
                    <h3 style="font-size: 2.3rem; color: var(--purple-primary); font-weight: 800; margin: 0 0 20px 0; letter-spacing: -0.5px; line-height: 1.2;">Prescription Management Policies</h3>
                    <p style="color: #555; font-size: 1.05rem; line-height: 1.6; margin: 0;">Your safety is our priority! We maintain rigorous clinical workflows to track, verify, and authorized treatment allocations.</p>
                </div>

                <!-- Right Column: Operational Rules Panel -->
                <div style="flex: 1.3; width: 100%; box-sizing: border-box;">
                    <div class="compliance-panel-card" style="background-color: #F9F9F8; border: 1px solid rgba(138,52,159,0.06); padding: 45px; border-radius: 24px; display: flex; flex-direction: column; gap: 24px; box-sizing: border-box;">
                        
                        <!-- Safety Protocols -->
                        <div style="display: flex; gap: 18px; align-items: flex-start; text-align: left;">
                            <span style="font-size: 1.4rem; background: #ffffff; padding: 10px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.03); line-height: 1; box-shadow: 0 3px 10px rgba(0,0,0,0.01);">💊</span>
                            <div>
                                <strong style="color: var(--purple-primary); font-size: 1.1rem; display: block; margin-bottom: 4px; font-weight: 800;">Cross-Border Safety Protocols</strong>
                                <p style="margin: 0; font-size: 0.95rem; color: #555; line-height: 1.5;">We adhere to stringent safety measures for specialized medications, weight management injections, and chronic therapeutic prescriptions.</p>
                            </div>
                        </div>

                        <!-- Refill Notice -->
                        <div style="display: flex; gap: 18px; align-items: flex-start; text-align: left;">
                            <span style="font-size: 1.4rem; background: #ffffff; padding: 10px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.03); line-height: 1; box-shadow: 0 3px 10px rgba(0,0,0,0.01);">🔍</span>
                            <div>
                                <strong style="color: var(--purple-primary); font-size: 1.1rem; display: block; margin-bottom: 4px; font-weight: 800;">72-Hour Refill Routing Notice</strong>
                                <p style="margin: 0; font-size: 0.95rem; color: #555; line-height: 1.5;">Routine prescription changes and refill requests require 3 business days for processing to ensure all safety protocols are upheld.</p>
                            </div>
                        </div>

                        <!-- Lab Requirements -->
                        <div style="display: flex; gap: 18px; align-items: flex-start; text-align: left;">
                            <span style="font-size: 1.4rem; background: #ffffff; padding: 10px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.03); line-height: 1; box-shadow: 0 3px 10px rgba(0,0,0,0.01);">🔬</span>
                            <div>
                                <strong style="color: var(--purple-primary); font-size: 1.1rem; display: block; margin-bottom: 4px; font-weight: 800;">Periodic Lab Valuation Requirements</strong>
                                <p style="margin: 0; font-size: 0.95rem; color: #555; line-height: 1.5;">To maintain active supervision over your medication, follow-up blood tests must be completed every 3 to 6 months.</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `;
}
