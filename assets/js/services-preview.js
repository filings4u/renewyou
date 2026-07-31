/**
 * ReNew You Health & Wellness - Clinical Offerings Preview Controller
 * Location: assets/js/services-preview.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderServicesPreview();
});

/**
 * Renders a modern, grid-based preview of primary clinical focus areas
 */
function renderServicesPreview() {
    const target = document.getElementById('services-preview-target');
    if (!target) return;

    const services = [
        {
            title: "Medical Weight Management",
            tag: "Metabolic Health",
            description: "Evidence-based medical treatments and biological health monitoring engineered to unlock safe, sustainable fat loss and restore your optimal energy levels.",
            link: "services.html#weight",
            icon: "🩺"
        },
        {
            title: "Chronic Care Management",
            tag: "Preventative",
            description: "Proactive interception and routine tracking of complex long-term health risks including hypertension, insulin resistance, and elevated metabolic profiles.",
            link: "services.html#chronic",
            icon: "🧬"
        },
        {
            title: "Acute Care & Diagnostics",
            tag: "Same-Day Treatment",
            description: "Rapid clinical testing and compassionate care for non-emergent seasonal illnesses, sudden infections, and point-of-care medical lab configurations.",
            link: "services.html#acute",
            icon: "📋"
        }
    ];

    const cardsHtml = services.map(service => `
        <div class="service-preview-card" style="background: #F9F9F8; padding: 45px 35px; border-radius: 24px; border: 1px solid rgba(138, 52, 159, 0.06); box-shadow: 0 10px 35px rgba(62, 13, 95, 0.01); display: flex; flex-direction: column; justify-content: space-between; position: relative; box-sizing: border-box; transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div>
                <!-- Top Badge & Icon Line -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                    <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--green-secondary); background: rgba(79, 148, 12, 0.06); padding: 5px 12px; border-radius: 12px; letter-spacing: 1px;">
                        ${service.tag}
                    </span>
                    <div style="font-size: 1.5rem; width: 45px; height: 45px; background: rgba(138, 52, 159, 0.04); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--purple-accent);">
                        ${service.icon}
                    </div>
                </div>
                
                <!-- Service Content -->
                <h3 style="font-size: 1.45rem; color: var(--purple-primary); font-weight: 800; margin: 0 0 15px 0; letter-spacing: -0.3px;">
                    ${service.title}
                </h3>
                <p style="font-size: 1rem; color: #555; line-height: 1.6; margin: 0 0 30px 0;">
                    ${service.description}
                </p>
            </div>

            <!-- Action Link -->
            <div style="margin-top: auto;">
                <a href="${service.link}" style="text-decoration: none; color: var(--purple-accent); font-weight: 700; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 8px; transition: gap 0.2s ease;">
                    Learn About Protocols &nbsp;&rarr;
                </a>
            </div>
        </div>
    `).join('');

    target.innerHTML = `
        <div style="background-color: #ffffff; padding: 120px 20px; width: 100%; box-sizing: border-box; border-top: 1px solid rgba(138, 52, 159, 0.04);">
            <div style="max-width: 1450px; margin: 0 auto;">
                
                <!-- Section Header Layout -->
                <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 30px; margin-bottom: 60px;">
                    <div style="max-width: 650px;">
                        <span style="color: var(--purple-accent); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; margin-bottom: 12px;">
                            Clinical Excellence
                        </span>
                        <h2 style="font-size: 2.5rem; color: var(--purple-primary); font-weight: 800; margin: 0; line-height: 1.2; letter-spacing: -0.5px;">
                            Comprehensive Care Built Around Your Long-Term Goals
                        </h2>
                    </div>
                    <div style="padding-bottom: 5px;">
                        <a href="services.html" style="text-decoration: none;">
                            <button style="padding: 14px 28px; font-size: 0.95rem; font-weight: 700; border-radius: 50px; background: transparent; color: var(--purple-primary); border: 2px solid var(--purple-primary); cursor: pointer; transition: all 0.3s ease;">
                                View All Clinical Services
                            </button>
                        </a>
                    </div>
                </div>

                <!-- 3-Column Advanced Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 30px;">
                    ${cardsHtml}
                </div>

            </div>
        </div>
    `;
}
