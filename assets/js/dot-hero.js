/**
 * DOT Drug Testing - Dynamic URL-Based Hero Component (Multi-Page Scale)
 * Location: assets/js/dot-hero.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('dot-hero-target');
    if (!target) return;

    const path = window.location.pathname.toLowerCase();
    
    // Default baseline hero configurations (Overview Services Page)
    let badgeText = "49 CFR Part 40 Compliant";
    let titleText = "Certified DOT Drug & Alcohol Testing";
    let subtitleText = "Fast, fully legal, and audit-ready occupational health testing keeping your fleet compliant and your workplace safe.";

    // URL Routing Evaluation Condition Blocks
    if (path.includes('physical')) {
        badgeText = "FMCSA Certified Medical Examiner";
        titleText = "DOT Physicals & Commercial Cards";
        subtitleText = "Certified driver health examinations. Full-service fitness diagnostics to satisfy federal safety criteria and secure your medical card.";
    } else if (path.includes('driver')) {
        badgeText = "Walk-In Drivers & Owner Operators";
        titleText = "CDL Compliance & Medical Testing";
        subtitleText = "Comprehensive compliance testing. Full-service diagnostics performed by certified collectors to satisfy federal workplace criteria.";
    } else if (path.includes('corporate') || path.includes('employer')) {
        badgeText = "Consortium & Fleet Management";
        titleText = "Corporate Compliance Testing Solutions";
        subtitleText = "Streamlined fleet management. Full-service diagnostic programs structured to insulate operations during DOT audits.";
    }

    target.innerHTML = `
        <style>
            .dot-hero-section {
                padding: 80px 20px;
                background: linear-gradient(135deg, rgba(138, 52, 159, 0.02) 0%, rgba(62, 13, 95, 0.05) 100%);
                box-sizing: border-box;
            }
            .dot-hero-container {
                max-width: 1300px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                gap: 50px;
            }
            .dot-hero-content { flex: 1.2; text-align: left; }
            .dot-hero-media { flex: 1; display: flex; justify-content: center; align-items: center; }
            .dot-hero-image { width: 100%; max-width: 500px; height: auto; border-radius: 24px; object-fit: cover; }
            .dot-badge {
                color: var(--purple-accent);
                font-weight: 700;
                font-size: clamp(0.75rem, 2vw, 0.85rem);
                text-transform: uppercase;
                letter-spacing: 2px;
                display: inline-block;
                background-color: rgba(138, 52, 159, 0.05);
                padding: 6px 16px;
                border-radius: 30px;
                margin-bottom: 20px;
            }
            .dot-hero-title {
                font-size: clamp(1.8rem, 5vw, 3.2rem);
                color: var(--purple-primary);
                font-weight: 800;
                line-height: 1.2;
                margin: 0 0 20px 0;
                letter-spacing: -0.8px;
            }
            .dot-hero-subtitle {
                color: #444;
                font-size: clamp(0.95rem, 2.5vw, 1.15rem);
                line-height: 1.6;
                margin: 0 0 35px 0;
                max-width: 650px;
            }
            .dot-hero-cta-group { display: flex; gap: 15px; justify-content: flex-start; flex-wrap: wrap; }
            @media (max-width: 992px) {
                .dot-hero-container { flex-direction: column-reverse; gap: 30px; }
                .dot-hero-content { text-align: center; flex: unset; }
                .dot-hero-media { flex: unset; width: 100%; }
                .dot-hero-image { max-width: 320px; }
                .dot-hero-cta-group { justify-content: center; }
            }
            @media (max-width: 768px) {
                .dot-hero-section { padding: 40px 15px; }
                .dot-hero-image { max-width: 85%; }
                .dot-hero-cta-group a { width: 100%; text-align: center; box-sizing: border-box; }
            }
        </style>
        <div class="dot-hero-section">
            <div class="dot-hero-container">
                <div class="dot-hero-content">
                    <span class="dot-badge">${badgeText}</span>
                    <h1 class="dot-hero-title">${titleText}</h1>
                    <p class="dot-hero-subtitle">${subtitleText}</p>
                    <div class="dot-hero-cta-group">
                        <a href="dot-employers.html" style="background: var(--purple-primary); color: #fff; padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 0.95rem;">Employer Programs</a>
                        <a href="dot-appointment.html" style="background: #fff; color: var(--purple-primary); padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 0.95rem; border: 1px solid rgba(138, 52, 159, 0.15);">Driver Walk-Ins</a>
                    </div>
                </div>
                <div class="dot-hero-media">
                    <img src="images/dot-hero.png" alt="DOT drug and alcohol testing services for employers and commercial drivers in Chicago Heights" class="dot-hero-image" />
                </div>
            </div>
        </div>
    `;
});
