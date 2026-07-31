/**
 * ReNew You Health & Wellness - Patient Information Controller
 * Location: assets/js/patients.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderPatientInformation();
});

/**
 * Builds and appends compliance requirements and pre-visit steps to the patient workspace
 */
function renderPatientInformation() {
    const listTarget = document.getElementById('patient-checklist-target');
    const paymentTarget = document.getElementById('patient-payment-target');
    
    if (listTarget) {
        const structuralRequirements = [
            "Please bring a valid photo ID.",
            "Bring a current medication list.",
            "Bring your insurance card if applicable.",
            "Bring any relevant medical records.",
            "Walk-ins and appointments may be available."
        ];

        let listHtml = '<ul style="list-style: none; padding: 0; text-align: left; max-width: 500px; margin: 0 auto;">';
        structuralRequirements.forEach(item => {
            listHtml += `
                <li style="padding: 12px 0; border-bottom: 1px solid rgba(138, 52, 159, 0.1); font-size: 1.05rem; display: flex; align-items: center; gap: 10px;">
                    <span style="color: var(--green-secondary); font-weight: bold;">✔</span> ${item}
                </li>
            `;
        });
        listHtml += '</ul>';
        listTarget.innerHTML = listHtml;
    }

    if (paymentTarget) {
        paymentTarget.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; text-align: left; margin-top: 25px;">
                <div class="card" style="border-top: 4px solid var(--purple-accent);">
                    <h4 style="color: var(--purple-primary); margin-bottom: 10px;">Self-Pay Framework</h4>
                    <p style="font-size: 0.95rem; margin: 0; color: #555;">Affordable cash-pay services and options are available immediately at opening to protect your access to healthcare.</p>
                </div>
                <div class="card" style="border-top: 4px solid var(--green-secondary);">
                    <h4 style="color: var(--purple-primary); margin-bottom: 10px;">Insurance Networks</h4>
                    <p style="font-size: 0.95rem; margin: 0; color: #555;">Insurance is accepted. Our administrative infrastructure is configured and prepared to integrate insurance plans directly.</p>
                </div>
            </div>
        `;
    }
}
