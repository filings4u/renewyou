/** * ReNew You Health & Wellness - Care Access FAQ * Location: assets/js/patient-faq.js */
document.addEventListener('DOMContentLoaded', () => {
    renderAccessFaq();
});

function renderAccessFaq() {
    const target = document.getElementById('patient-faq-target');
    if (!target) return;

    target.innerHTML = `
        <style>
            @media (max-width: 768px) {
                .faq-outer-wrapper { padding: 40px 15px !important; }
                .faq-card-premium { padding: 25px !important; }
                .faq-card-premium h4 { font-size: 1.1rem !important; }
                .faq-card-premium p { font-size: 0.92rem !important; }
                .faq-outer-wrapper h3 { font-size: 1.85rem !important; }
            }
        </style>
        <div class="faq-outer-wrapper" style="max-width: 1450px; margin: 0 auto; padding: 40px 20px 60px 20px; box-sizing: border-box;">
            <div style="text-align: center; margin-bottom: 45px;">
                <span style="color: var(--green-secondary); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; background-color: rgba(79, 148, 12, 0.06); padding: 5px 14px; border-radius: 20px; margin-bottom: 12px;">Logistics & Continuity</span>
                <h3 style="font-size: 2.3rem; color: var(--purple-primary); font-weight: 800; margin: 0; letter-spacing: -0.5px; line-height: 1.2;">Care Coordination Framework</h3>
            </div>
            
            <div style="max-width: 850px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; box-sizing: border-box;">
                <!-- After-Hours Care -->
                <div class="faq-card-premium" style="background: #ffffff; padding: 35px; border-radius: 20px; border: 1px solid rgba(138, 52, 159, 0.06); box-shadow: 0 10px 30px rgba(62, 13, 95, 0.01); text-align: left; box-sizing: border-box;">
                    <h4 style="color: var(--purple-primary); font-size: 1.2rem; font-weight: 800; margin: 0 0 12px 0; line-height: 1.3;">After-Hours Care</h4>
                    <p style="color: #555; font-size: 0.98rem; line-height: 1.6; margin: 0 0 12px 0;">If you experience urgent issues after hours, simply contact our main portal to reach the provider on call for immediate assistance.</p>
                    <div style="background-color: rgba(217, 119, 6, 0.04); padding: 12px 16px; border-radius: 12px; border-left: 3px solid #d97706; font-size: 0.88rem; color: #444; line-height: 1.4; font-weight: 550;">
                        🚨 In case of life-threatening symptoms, please head straight to your nearest emergency facility.
                    </div>
                </div>

                <!-- Collaborative Healthcare -->
                <div class="faq-card-premium" style="background: #ffffff; padding: 35px; border-radius: 20px; border: 1px solid rgba(138, 52, 159, 0.06); box-shadow: 0 10px 30px rgba(62, 13, 95, 0.01); text-align: left; box-sizing: border-box;">
                    <h4 style="color: var(--purple-primary); font-size: 1.2rem; font-weight: 800; margin: 0 0 12px 0; line-height: 1.3;">Collaborative Healthcare</h4>
                    <p style="color: #555; font-size: 0.98rem; line-height: 1.6; margin: 0;">We believe in comprehensive healthcare tracking. If you wish to share your wellness updates with your primary care physician, simply sign our standard HIPAA medical data release form. Our system will handle the rest and automatically send your lab results and progress reports to your external doctors.</p>
                </div>
            </div>
        </div>
    `;
}
