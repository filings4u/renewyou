/**
 * DOT Compliance - Corporate Programs Section Component
 * Location: assets/js/dot-corporate.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('dot-corporate-target');
    if (!target) return;

    target.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; padding: 60px 20px; box-sizing: border-box;">
            <!-- Corporate Header Section -->
            <div style="text-align: center; margin-bottom: 50px;">
                <span style="color: var(--purple-accent); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; background: rgba(138,52,159,0.04); padding: 5px 14px; border-radius: 30px;">Consortium & Fleet Management</span>
                <h1 style="font-size: 2.5rem; color: var(--purple-primary); font-weight: 800; margin: 10px 0 0 0; letter-spacing: -0.5px;">Corporate Compliance Testing Solutions</h1>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: 40px;">
                <!-- Main Service Cards -->
                <div style="flex: 1.5; min-width: 320px; display: flex; flex-direction: column; gap: 20px;">
                    <div style="background: #fff; padding: 30px; border-radius: 20px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 10px 30px rgba(62,13,95,0.01);">
                        <h3 style="color: var(--purple-primary); margin: 0 0 10px 0; font-weight: 800;">Random Pool Selection Programs</h3>
                        <p style="color: #555; line-height: 1.6; margin: 0;">We manage scientifically randomized screening pools to maintain full compliance with annual DOT testing quotas. Automated employee rosters ensure audit readiness for federal inspections.</p>
                    </div>

                    <div style="background: #fff; padding: 30px; border-radius: 20px; border: 1px solid rgba(138,52,159,0.06); box-shadow: 0 10px 30px rgba(62,13,95,0.01);">
                        <h3 style="color: var(--purple-primary); margin: 0 0 10px 0; font-weight: 800;">Electronic CCF & Clearinghouse Integration</h3>
                        <p style="color: #555; line-height: 1.6; margin: 0;">Paperless Chains of Custody (eCCF) eliminate document delivery delays. Verified screening results sync instantly to federal databases to minimize truck downtime.</p>
                    </div>
                </div>

                <!-- Account Management Action Block -->
                <div style="flex: 1; min-width: 280px; background: var(--purple-primary); color: #fff; border-radius: 24px; padding: 40px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="color: #fff; font-size: 1.4rem; font-weight: 800; margin: 0 0 15px 0;">Setup Corporate Account</h3>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.95rem; line-height: 1.6; margin-bottom: 25px;">Simplify onboarding with custom business invoicing options and a unified dashboard interface built for multi-regional logistics fleets.</p>
                        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                            <span style="display: block; font-size: 0.85rem; font-weight: bold; text-transform: uppercase; color: rgba(255,255,255,0.6);">Immediate Inquiries</span>
                            <span style="font-size: 1.2rem; font-weight: bold; display: block; margin-top: 5px;">📞 708-329-2155</span>
                        </div>
                    </div>
                    <a href="contact.html" style="display: block; width: 100%; background: #fff; color: var(--purple-primary); text-align: center; text-decoration: none; padding: 14px; border-radius: 12px; font-weight: 700; font-size: 0.95rem; margin-top: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">Contact Corporate Sales</a>
                </div>
            </div>
        </div>
    `;
});
