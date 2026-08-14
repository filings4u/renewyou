/**
 * DOT Drug Testing - Hero Component
 * Location: assets/js/dot-hero.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('dot-hero-target');
    if (!target) return;

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
            .dot-hero-content {
                flex: 1.2;
                text-align: left;
            }
            .dot-hero-media {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .dot-hero-image {
                width: 100%;
                max-width: 500px;
                height: auto;
                border-radius: 24px;
                object-fit: cover;
            }
            .dot-badge {
                color: var(--purple-accent);
                font-weight: 700;
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                display: inline-block;
                background-color: rgba(138, 52, 159, 0.05);
                padding: 6px 16px;
                border-radius: 30px;
                margin-bottom: 20px;
            }
            .dot-hero-title {
                font-size: 3.2rem;
                color: var(--purple-primary);
                font-weight: 800;
                line-height: 1.15;
                margin: 0 0 20px 0;
                letter-spacing: -0.8px;
            }
            .dot-hero-subtitle {
                color: #444;
                font-size: 1.15rem;
                line-height: 1.6;
                margin: 0 0 35px 0;
                max-width: 650px;
            }
            .dot-hero-cta-group {
                display: flex;
                gap: 15px;
                justify-content: flex-start;
                flex-wrap: wrap;
            }
            @media (max-width: 992px) {
                .dot-hero-container {
                    flex-direction: column;
                    gap: 40px;
                }
                .dot-hero-content {
                    text-align: center;
                    flex: unset;
                }
                .dot-hero-media {
                    flex: unset;
                    width: 100%;
                }
                .dot-hero-image {
                    max-width: 420px;
                }
                .dot-hero-cta-group {
                    justify-content: center;
                }
                .dot-hero-title {
                    font-size: 2.5rem;
                }
            }
            @media (max-width: 768px) {
                .dot-hero-title {
                    font-size: 2.1rem;
                }
                .dot-hero-section {
                    padding: 50px 15px;
                }
                .dot-hero-image {
                    max-width: 100%;
                }
            }
        </style>
        <div class="dot-hero-section">
            <div class="dot-hero-container">
                <div class="dot-hero-content">
                    <span class="dot-badge">49 CFR Part 40 Compliant</span>
                    <h1 class="dot-hero-title">Certified DOT Drug & Alcohol Testing</h1>
                    <p class="dot-hero-subtitle">Fast, fully legal, and audit-ready occupational health testing keeping your fleet compliant and your workplace safe.</p>
                    <div class="dot-hero-cta-group">
                        <a href="#employers" style="background: var(--purple-primary); color: #fff; padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 0.95rem;">Employer Programs</a>
                        <a href="#truckers" style="background: #fff; color: var(--purple-primary); padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 0.95rem; border: 1px solid rgba(138, 52, 159, 0.15);">Driver Walk-Ins</a>
                    </div>
                </div>
                <div class="dot-hero-media">
                    <img src="images/dot-hero.png" alt="DOT Certified Drug and Alcohol Testing Infrastructure" class="dot-hero-image" />
                </div>
            </div>
        </div>
    `;
});
