/**
 * DOT Compliance - Responsive Corporate Programs Section Component
 * Location: assets/js/dot-corporate.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('dot-corporate-target');
    if (!target) return;

    target.innerHTML = `
        <style>
            .corporate-outer-wrap {
                max-width: 1200px;
                margin: 0 auto;
                padding: 60px 20px;
                box-sizing: border-box;
            }
            .corporate-flex-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 40px;
            }
            .corporate-main-panel {
                flex: 1.5;
                min-width: 320px;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            .corporate-service-card {
                background: #fff;
                padding: 30px;
                border-radius: 20px;
                border: 1px solid rgba(138,52,159,0.06);
                box-shadow: 0 10px 30px rgba(62,13,95,0.01);
            }
            .corporate-action-sidebar {
                flex: 1;
                min-width: 280px;
                background: var(--purple-primary);
                color: #fff;
                border-radius: 24px;
                padding: 40px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            @media (max-width: 768px) {
                .corporate-outer-wrap {
                    padding: 30px 15px; /* Shaves off extreme margins on phone edges */
                }
                .corporate-flex-grid {
                    flex-direction: column; /* Forces vertical container stacking on mobile */
                    gap: 25px;
                }
                .corporate-main-panel {
                    min-width: 100%;
                }
                .corporate-service-card {
                    padding: 22px; /* Tightens text padding containers */
                }
                .corporate-action-sidebar {
                    min-width: 100%;
                    padding: 30px 22px;
                }
            }
        </style>
        <div class="corporate-outer-wrap">
            <div class="corporate-flex-grid">
                <!-- Main Service Cards -->
                <div class="corporate-main-panel">
                    <div class="corporate-service-card">
                        <h3 style="color: var(--purple-primary); margin: 0 0 10px 0; font-weight: 800; font-size: 1.3rem;">Random Pool Selection Programs</h3>
                        <p style="color: #555; line-height: 1.6; margin: 0; font-size: 0.95rem;">We manage scientifically randomized screening pools to maintain full compliance with annual DOT testing quotas. Automated employee rosters ensure audit readiness for federal inspections.</p>
                    </div>

                    <div class="corporate-service-card">
                        <h3 style="color: var(--purple-primary); margin: 0 0 10px 0; font-weight: 800; font-size: 1.3rem;">Electronic CCF & Clearinghouse Integration</h3>
                        <p style="color: #555; line-height: 1.6; margin: 0; font-size: 0.95rem;">Paperless Chains of Custody (eCCF) eliminate document delivery delays. Verified screening results sync instantly to federal databases to minimize truck downtime.</p>
                    </div>
                </div>

                <!-- Account Management Action Block -->
                <div class="corporate-action-sidebar">
                    <div>
                        <h3 style="color: #fff; font-size: 1.4rem; font-weight: 800; margin: 0 0 15px 0;">Setup Corporate Account</h3>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.95rem; line-height: 1.6; margin-bottom: 25px;">Simplify onboarding with custom business invoicing options and a unified dashboard interface built for multi-regional logistics fleets.</p>
                        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                            <span style="display: block; font-size: 0.85rem; font-weight: bold; text-transform: uppercase; color: rgba(255,255,255,0.6);">Immediate Inquiries</span>
                            <span style="font-size: 1.2rem; font-weight: bold; display: block; margin-top: 5px;">📞 708-329-2155</span>
                        </div>
                    </div>
                    <a href="contact.html" style="display: block; width: 100%; background: #fff; color: var(--purple-primary); text-align: center; text-decoration: none; padding: 14px; border-radius: 12px; font-weight: 700; font-size: 0.95rem; margin-top: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); box-sizing: border-box;">Contact Corporate Sales</a>
                </div>
            </div>
        </div>
    `;
});
