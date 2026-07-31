/** * ReNew You Health & Wellness - Insurance Networks Catalog * Location: assets/js/insurance.js */
document.addEventListener('DOMContentLoaded', () => {
    renderInsuranceCatalog();
});

function renderInsuranceCatalog() {
    const target = document.getElementById('insurance-logos-target');
    if (!target) return;

    const networks = [
        { name: "Humana", text: "Comprehensive plans that cover a wide range of preventive health and chronic management services.", icon: "🏥" },
        { name: "UnitedHealthcare", text: "Offers a vast array of individual, family, and employer-sponsored medical policy plans.", icon: "🏢" },
        { name: "Cigna", text: "Known for their extensive regional medical network and dedicated health-focused care programs.", icon: "🩺" },
        { name: "Blue Cross Blue Shield", text: "A highly trusted name in health insurance with a variety of flexible local and national options.", icon: "🛡️" },
        { name: "Aetna", text: "Provides customizable coverage plans tailored precisely to fit your ongoing family lifestyle needs.", icon: "💎" }
    ];

    const gridHtml = networks.map(network => `
        <div class="insurance-brand-card" style="background-color: #ffffff; border-radius: 24px; padding: 40px 30px; border: 1px solid rgba(138, 52, 159, 0.06); box-shadow: 0 10px 35px rgba(62,13,95,0.01); display: flex; flex-direction: column; text-align: left; box-sizing: border-box;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="font-size: 1.6rem; width: 44px; height: 44px; background: rgba(138,52,159,0.04); border-radius: 12px; display: flex; align-items: center; justify-content: center; line-height: 1;">
                    ${network.icon}
                </div>
                <h3 style="color: var(--purple-primary); font-size: 1.3rem; font-weight: 800; margin: 0; letter-spacing: -0.2px;">${network.name}</h3>
            </div>
            <p style="color: #555; font-size: 0.95rem; line-height: 1.6; margin: 0; flex: 1;">${network.text}</p>
        </div>
    `).join('');

    target.innerHTML = `
        <style>
            .ins-catalog-outer-wrap { padding: 60px 20px 40px 20px; box-sizing: border-box; }
            .ins-catalog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; max-width: 1450px; margin: 0 auto; box-sizing: border-box; }
            @media (max-width: 768px) { .ins-catalog-grid { grid-template-columns: 1fr !important; gap: 20px !important; } .ins-catalog-outer-wrap h2 { font-size: 1.85rem !important; } .ins-catalog-outer-wrap { padding: 40px 15px 20px 15px !important; } }
        </style>
        <div class="ins-catalog-outer-wrap">
            <div style="text-align: center; margin-bottom: 45px;">
                <span style="color: var(--purple-accent); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; background-color: rgba(138, 52, 159, 0.04); padding: 5px 14px; border-radius: 30px; margin-bottom: 12px;">Accepted Providers</span>
                <h2 style="font-size: 2.3rem; color: var(--purple-primary); font-weight: 800; margin: 0; letter-spacing: -0.5px; line-height: 1.2;">Supported Health Networks</h2>
                <p style="color: #555; font-size: 1.05rem; max-width: 700px; margin: 15px auto 0 auto; line-height: 1.6;">We proudly partner with major commercial providers to make sure you receive the premium care you need:</p>
            </div>
            <div class="ins-catalog-grid">${gridHtml}</div>
        </div>
    `;
}
