/**
 * DOT Compliance - Commercial Drivers Section Component
 * Location: assets/js/dot-drivers.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('dot-drivers-target');
    if (!target) return;

    target.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; padding: 60px 20px; box-sizing: border-box;">
            <!-- Hero Header -->
            <div style="text-align: center; margin-bottom: 50px;">
                <span style="color: var(--purple-accent); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; background: rgba(138,52,159,0.04); padding: 5px 14px; border-radius: 30px;">Walk-In Drivers & Owner Operators</span>
                <h1 style="font-size: 2.5rem; color: var(--purple-primary); font-weight: 800; margin: 10px 0 0 0; letter-spacing: -0.5px;">CDL Compliance & Medical Testing</h1>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: 40px; margin-bottom: 50px;">
                <!-- Main Content Panel -->
                <div style="flex: 1.4; min-width: 320px;">
                    <h2 style="color: var(--purple-primary); font-size: 1.6rem; font-weight: 800; margin-top: 0;">Federal 49 CFR Part 40 Requirements</h2>
                    <p style="color: #555; line-height: 1.6; font-size: 1.05rem;">We provide fast, uncompromised occupational health testing to keep your commercial driver's license active and fully compliant with FMCSA standards. Our certified collectors handle your physical checks quickly so you can return to active dispatch tracking loops.</p>
                    
                    <!-- 5 Panel Grid Wrapper -->
                    <div style="background: #ffffff; border: 1px solid rgba(138,52,159,0.06); padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(62,13,95,0.01); margin-top: 30px;">
                        <h3 style="margin: 0 0 20px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.2rem;">What the Official DOT 5-Panel Screens For:</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px;">
                            <div style="background:#fafafa; padding:15px; border-radius:10px; font-weight:600; font-size:0.9rem; color:#444;">🌿 Marijuana (THC)</div>
                            <div style="background:#fafafa; padding:15px; border-radius:10px; font-weight:600; font-size:0.9rem; color:#444;">❄️ Cocaine Metabolites</div>
                            <div style="background:#fafafa; padding:15px; border-radius:10px; font-weight:600; font-size:0.9rem; color:#444;">💊 Opioids & Heroin</div>
                            <div style="background:#fafafa; padding:15px; border-radius:10px; font-weight:600; font-size:0.9rem; color:#444;">⚡ Amphetamines/Meth</div>
                            <div style="background:#fafafa; padding:15px; border-radius:10px; font-weight:600; font-size:0.9rem; color:#444;">🧪 Phencyclidine (PCP)</div>
                        </div>
                    </div>
                </div>

                <!-- Driver Checklist Sidebar -->
                <div style="flex: 1; min-width: 280px; background: #ffffff; border: 1px solid rgba(138,52,159,0.06); border-radius: 24px; padding: 35px; box-shadow: 0 10px 35px rgba(62,13,95,0.01); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="color: var(--purple-primary); font-size: 1.3rem; font-weight: 800; margin: 0 0 15px 0;">Pre-Arrival Checklist</h3>
                        <p style="color: #666; font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px;">Ensure you bring the following items to guarantee immediate, hassle-free processing on the counter line:</p>
                        <ul style="margin: 0; padding-left: 20px; color: #444; font-size: 0.95rem; line-height: 2;">
                            <li>Valid Commercial License (CDL)</li>
                            <li>Employer Custody Form (CCF)</li>
                            <li>Current Medical Variance Logs</li>
                            <li>List of Legal Prescriptions</li>
                        </ul>
                    </div>
                    <a href="dot-appointment.html" style="display: block; width: 100%; background: var(--purple-primary); color: #fff; text-align: center; text-decoration: none; padding: 14px; border-radius: 12px; font-weight: 700; font-size: 0.95rem; margin-top: 30px; box-shadow: 0 5px 15px rgba(62,13,95,0.1);">Book Driver Test Now</a>
                </div>
            </div>
        </div>
    `;
});
