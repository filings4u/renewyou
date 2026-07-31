/** * ReNew You Health & Wellness - Insurance Advantages * Location: assets/js/insurance-benefits.js */
document.addEventListener('DOMContentLoaded', () => {
    renderInsuranceBenefitsModule();
});

function renderInsuranceBenefitsModule() {
    const target = document.getElementById('insurance-benefits-target');
    if (!target) return;

    target.innerHTML = `
        <style>
            .benefits-outer { padding: 40px 20px 60px 20px; box-sizing: border-box; }
            @media (max-width: 991px) {
                .benefits-split { flex-direction: column !important; gap: 40px !important; }
                .benefits-text-side { text-align: center !important; }
                .benefits-text-side span { margin: 0 auto 10px auto !important; }
            }
            @media (max-width: 768px) {
                .benefits-outer { padding: 20px 15px 40px 15px !important; }
                .benefits-panel-card { padding: 30px 20px !important; }
                .benefits-text-side h3 { font-size: 1.85rem !important; }
            }
        </style>
        <div class="benefits-outer">
            <div class="benefits-split" style="max-width: 1450px; margin: 0 auto; display: flex; align-items: center; gap: 80px; box-sizing: border-box;">
                
                <!-- Left Column: Typography Details -->
                <div class="benefits-text-side" style="flex: 1; text-align: left; box-sizing: border-box;">
                    <span style="color: var(--green-secondary); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; margin-bottom: 12px; background: rgba(79, 148, 12, 0.06); padding: 4px 12px; border-radius: 30px;">Why Choose Us</span>
                    <h3 style="font-size: 2.3rem; color: var(--purple-primary); font-weight: 800; margin: 0 0 20px 0; letter-spacing: -0.5px; line-height: 1.2;">Patient-Centered Coverage</h3>
                    <p style="color: #555; font-size: 1.05rem; line-height: 1.6; margin: 0;">Our mission is to prioritize your physiological transformation, completely removing the administrative friction often tied to coverage tracking panels.</p>
                </div>

                <!-- Right Column: Interactive Detail Panel -->
                <div style="flex: 1.3; width: 100%; box-sizing: border-box;">
                    <div class="benefits-panel-card" style="background-color: #ffffff; border: 1px solid rgba(138, 52, 159, 0.06); padding: 45px; border-radius: 24px; display: flex; flex-direction: column; gap: 24px; box-shadow: 0 10px 30px rgba(62,13,95,0.01); box-sizing: border-box;">
                        
                        <div style="display: flex; gap: 18px; align-items: flex-start; text-align: left;">
                            <span style="font-size: 1.4rem; background: #F9F9F8; padding: 10px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.02); line-height: 1;">🗺️</span>
                            <div>
                                <strong style="color: var(--purple-primary); font-size: 1.1rem; display: block; margin-bottom: 4px; font-weight: 800;">Diverse Insurance Options</strong>
                                <p style="margin: 0; font-size: 0.95rem; color: #555; line-height: 1.5;">We maintain clinical contract routing across multiple premier health insurance frameworks to safely serve families throughout the community.</p>
                            </div>
                        </div>

                        <div style="display: flex; gap: 18px; align-items: flex-start; text-align: left;">
                            <span style="font-size: 1.4rem; background: #F9F9F8; padding: 10px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.02); line-height: 1;">💬</span>
                            <div>
                                <strong style="color: var(--purple-primary); font-size: 1.1rem; display: block; margin-bottom: 4px; font-weight: 800;">Transparent Communication</strong>
                                <p style="margin: 0; font-size: 0.95rem; color: #555; line-height: 1.5;">We believe in upfront clarity regarding pricing metrics and network authorizations so you can keep your focus entirely locked on your well-being.</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `;
}
