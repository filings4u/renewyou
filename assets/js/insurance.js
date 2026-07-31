/**
 * ReNew You Health & Wellness - Insurance Page Controller
 * Location: assets/js/insurance.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderAcceptedInsurance();
});

/**
 * Dynamically builds the healthcare insurance logo array grid matching user assets
 */
function renderAcceptedInsurance() {
    const target = document.getElementById('insurance-logos-target');
    if (!target) return;

    // Array tracking the specific uploaded insurance brand logos
    const providers = [
        { name: "Humana", file: "humana.png" },
        { name: "UnitedHealthcare", file: "united.png" },
        { name: "Cigna", file: "cigna.png" },
        { name: "Blue Cross Blue Shield", file: "bcbs.png" },
        { name: "Aetna", file: "aetna.png" }
    ];

    let htmlContent = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 25px; align-items: center; justify-items: center; margin-top: 30px;">
    `;

    providers.forEach(logo => {
        htmlContent += `
            <div class="card" style="padding: 20px; display: flex; align-items: center; justify-content: center; width: 100%; height: 120px; background-color: var(--bg-white); border: 1px solid rgba(138, 52, 159, 0.1);">
                <!-- Replace src values with your definitive hosted image pathways -->
                <img src="images/${logo.file}" alt="${logo.name} Accepted Insurance Logo" style="max-width: 100%; max-height: 100%; object-fit: contain; filter: grayscale(20%) contrast(100%);">
            </div>
        `;
    });

    htmlContent += `</div>`;
    target.innerHTML = htmlContent;
}
