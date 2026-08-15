/**
 * ReNew You Health & Wellness - Insurance Networks Catalog
 * Location: assets/js/insurance.js
 */
document.addEventListener('DOMContentLoaded', () => {
    renderInsuranceCatalog();
});

function renderInsuranceCatalog() {
    const target = document.getElementById('insurance-logos-target');
    if (!target) return;

    // Inline SVG Icon definitions for a professional medical look
    const icons = {
        medicare: `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px; color: var(--purple-accent);"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
        medicaid: `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px; color: var(--purple-accent);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
        tricare: `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px; color: var(--purple-accent);"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><polyline points="12 22 12 12 22 8.5"/><polyline points="12 12 2 8.5"/></svg>`,
        bcbs: `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px; color: var(--purple-accent);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        uhc: `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px; color: var(--purple-accent);"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="16"/><line x1="15" y1="22" x2="15" y2="16"/><line x1="9" y1="16" x2="15" y2="16"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/></svg>`,
        humana: `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px; color: var(--purple-accent);"><path d="M3 9H1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2"/><path d="M21 9h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2"/><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M12 7v10"/><path d="M8 12h8"/></svg>`,
        cigna: `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px; color: var(--purple-accent);"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
        aetna: `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px; color: var(--purple-accent);"><path d="M6 3h12l4 6-10 13L2 9z"/></svg>`
    };

    const networks = [
        { 
            name: "Medicare", 
            text: "Accepting traditional Medicare and various Medicare Advantage plans for comprehensive senior and preventative care.", 
            svg: icons.medicare 
        },
    
        { 
            name: "Tricare Military", 
            text: "Proudly honoring network benefits for active duty service members, military retirees, and their eligible dependents.", 
            svg: icons.tricare 
        },
        { 
            name: "Blue Cross Blue Shield", 
            text: "A highly trusted network offering versatile local and national PPO and HMO coverage options for your primary needs.", 
            svg: icons.bcbs 
        },
        { 
            name: "UnitedHealthcare", 
            text: "Provides a vast network of employer-sponsored, individual, and managed care medical policy plans.", 
            svg: icons.uhc 
        },
   
        { 
            name: "Cigna", 
            text: "Known for extensive regional networks and specialized wellness coordination programs.", 
            svg: icons.cigna 
        },
        { 
            name: "Aetna", 
            text: "Flexible medical coverage plans tailored precisely to fit preventative care and regular health maintenance.", 
            svg: icons.aetna 
        }
    ];

    const gridHtml = networks.map(network => `
        <div class="insurance-brand-card" style="background-color: #ffffff; border-radius: 24px; padding: 40px 30px; border: 1px solid rgba(138, 52, 159, 0.06); box-shadow: 0 10px 35px rgba(62,13,95,0.01); display: flex; flex-direction: column; text-align: left; box-sizing: border-box;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="width: 44px; height: 44px; background: rgba(138,52,159,0.04); border-radius: 12px; display: flex; align-items: center; justify-content: center; line-height: 1; flex-shrink: 0;">
                    ${network.svg}
                </div>
                <h3 style="color: var(--purple-primary); font-size: 1.3rem; font-weight: 800; margin: 0; letter-spacing: -0.2px;">${network.name}</h3>
            </div>
            <p style="color: #555; font-size: 0.95rem; line-height: 1.6; margin: 0; flex: 1;">${network.text}</p>
        </div>
    `).join('');

    target.innerHTML = `
        <style>
            .ins-catalog-outer-wrap {
                padding: 60px 20px 40px 20px;
                box-sizing: border-box;
            }
            .ins-catalog-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                gap: 30px;
                max-width: 1450px;
                margin: 0 auto;
                box-sizing: border-box;
            }
            @media (max-width: 768px) {
                .ins-catalog-grid {
                    grid-template-columns: 1fr !important;
                    gap: 20px !important;
                }
                .ins-catalog-outer-wrap h2 {
                    font-size: 1.85rem !important;
                }
                .ins-catalog-outer-wrap {
                    padding: 40px 15px 20px 15px !important;
                }
            }
        </style>
        <div class="ins-catalog-outer-wrap">
            <div style="text-align: center; margin-bottom: 45px;">
                <span style="color: var(--purple-accent); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; background-color: rgba(138, 52, 159, 0.04); padding: 5px 14px; border-radius: 30px; margin-bottom: 12px;">Accepted Insurance</span>
                <h2 style="font-size: 2.3rem; color: var(--purple-primary); font-weight: 800; margin: 0; letter-spacing: -0.5px; line-height: 1.2;">Supported Health Networks</h2>
                <p style="color: #555; font-size: 1.05rem; max-width: 700px; margin: 15px auto 0 auto; line-height: 1.6;">We proudly partner with major government, military, and commercial health networks to ensure you receive reliable, comprehensive primary care:</p>
            </div>
            <div class="ins-catalog-grid">${gridHtml}</div>
        </div>
    `;
}
