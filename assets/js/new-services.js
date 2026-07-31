/** * ReNew You Health & Wellness - Medical Catalog Controller * Location: assets/js/services.js */ 
document.addEventListener('DOMContentLoaded', () => { 
    renderMedicalCatalog(); 
}); 

/** * Dynamically renders the brochure offerings panel inside the 1450px structural template */ 
function renderMedicalCatalog() { 
    const gridTarget = document.getElementById('services-grid-target'); 
    if (!gridTarget) return; 

    // Catalog source array capturing all items directly from the provided print brochure
    const catalogData = [
        {
            id: "weight-management",
            badge: "Lifestyle Architecture",
            title: "Weight Management",
            accentColor: "var(--purple-accent)",
            summary: "Comprehensive, provider-supervised structures to rebuild metabolic performance and establish sustainable wellness results.",
            items: [
                "Medical Weight Loss Programs",
                "GLP-1 Medication Management <span style='font-size: 0.82rem; color: #777; font-style: italic; font-weight: 500;'>(when clinically appropriate)</span>",
                "Personalized Nutrition Guidance",
                "Metabolic Health Assessments",
                "Lifestyle Coaching",
                "Monthly Follow-Ups"
            ]
        },
        {
            id: "wellness-services",
            badge: "Preventative Medicine",
            title: "Wellness Services",
            accentColor: "var(--green-secondary)",
            summary: "Proactive care testing systems designed to evaluate physiological parameters and monitor underlying biological baselines.",
            items: [
                "Annual Wellness Exams",
                "Sports & School Physicals",
                "Employment Physicals",
                "Preventive Health Screenings",
                "Blood Pressure Management",
                "Diabetes Screening",
                "Cholesterol Screening",
                "Health Coaching"
            ]
        },
        {
            id: "acute-care",
            badge: "Immediate Clinical Relief",
            title: "Acute Care",
            accentColor: "#d97706", // Premium Amber Gold accent color 
            summary: "Same-day diagnostic evaluations and customized relief treatments for a broad array of common medical symptoms.",
            items: [
                "Cold & Flu Symptoms",
                "COVID-19 Evaluation",
                "Strep Throat Swabs",
                "Sinus Infections",
                "Ear Infections",
                "Urinary Tract Infections (UTIs)",
                "Pink Eye Treatment",
                "Minor Skin Conditions",
                "Allergies & Respiratory Flare-ups",
                "Medication Refills <span style='font-size: 0.82rem; color: #777; font-style: italic; font-weight: 500;'>(when appropriate)</span>"
            ]
        }
    ]; 

    // Turn array nodes into interactive card templates
    const gridCardsHtml = catalogData.map(card => `
        <div class="service-catalog-card" style="background-color: #ffffff; border-radius: 24px; padding: 45px 35px; border: 1px solid rgba(138, 52, 159, 0.06); box-shadow: 0 10px 35px rgba(62,13,95,0.02); display: flex; flex-direction: column; box-sizing: border-box; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow: 0 3s ease;">
            
            <!-- Card Header Badge Wrapper -->
            <div style="margin-bottom: 15px;">
                <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: ${card.accentColor}; background-color: rgba(138, 52, 159, 0.04); padding: 5px 12px; border-radius: 30px; display: inline-block;">
                    ${card.badge}
                </span>
            </div>

            <!-- Card Heading Title -->
            <h2 style="color: var(--purple-primary); font-size: 1.7rem; font-weight: 800; margin: 0 0 15px 0; letter-spacing: -0.3px;">
                ${card.title}
            </h2>

            <!-- Summary Intro -->
            <p style="color: #666; font-size: 0.95rem; line-height: 1.5; margin: 0 0 30px 0; border-bottom: 1px dashed rgba(0,0,0,0.06); padding-bottom: 20px;">
                ${card.summary}
            </p>

            <!-- Semantic Bullet Feature List -->
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px;">
                ${card.items.map(item => `
                    <li style="display: flex; align-items: flex-start; gap: 12px; font-size: 1rem; color: #333; line-height: 1.4; font-weight: 550;">
                        <span style="color: var(--green-secondary); font-size: 1.1rem; line-height: 1; user-select: none;">✓</span>
                        <span style="flex: 1;">${item}</span>
                    </li>
                `).join('')}
            </ul>

        </div>
    `).join(''); 

    // Wrap with embedded layout styles and target element 
    gridTarget.parentElement.innerHTML = `
        <style>
            /* Desktop Layout Grid Configuration */
            .catalog-grid-system {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 30px;
                max-width: 1450px;
                margin: 0 auto;
                box-sizing: border-box;
            }

            /* Premium Desktop Hover Layout Micro-Interactions */
            .service-catalog-card:hover {
                transform: translateY(-6px);
                box-shadow: 0 20px 45px rgba(62,13,95,0.07) !important;
                border-color: rgba(138, 52, 159, 0.15) !important;
            }

            /* Mobile Structural & Typography Overrides */
            @media (max-width: 1024px) {
                .catalog-grid-system {
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 25px;
                }
            }

            @media (max-width: 768px) {
                .catalog-grid-system {
                    grid-template-columns: 1fr !important;
                    gap: 20px !important;
                }
                .service-catalog-card {
                    padding: 35px 25px !important;
                    border-radius: 20px !important;
                }
                .service-catalog-card h2 {
                    font-size: 1.45rem !important;
                }
                .service-catalog-card ul gap {
                    gap: 12px !important;
                }
                .service-catalog-card li {
                    font-size: 0.95rem !important;
                }
            }
        </style>

        <div class="catalog-grid-system" id="services-grid-target">
            ${gridCardsHtml}
        </div>
    `;
}
