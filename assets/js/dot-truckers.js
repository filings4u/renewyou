/**
 * DOT Drug Testing - Truckers & Drivers Section
 * Location: assets/js/dot-truckers.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('dot-truckers-target');
    if (!target) return;

    target.innerHTML = `
        <div id="truckers" style="padding:60px 20px; max-width:1100px; margin:0 auto; box-sizing:border-box;">
            <div style="background: #ffffff; border-radius: 28px; border: 1px solid rgba(138, 52, 159, 0.08); padding: 45px; box-shadow: 0 15px 40px rgba(62,13,95,0.02); display: flex; gap: 40px; flex-wrap: wrap;">
                <div style="flex: 1.2; min-width: 300px;">
                    <h2 style="color: var(--purple-primary); font-size: 2rem; font-weight: 800; margin: 0 0 15px 0; letter-spacing: -0.4px;">Commercial Driver Walk-Ins</h2>
                    <p style="color: #555; font-size: 1rem; line-height: 1.6; margin: 0 0 25px 0;">Whether renewing your medical card status or completing a return-to-duty protocol, our clinic prioritizes getting you back on the road safely and without delay.</p>
                    <div style="background: rgba(138,52,159,0.03); padding: 20px; border-radius: 16px; border-left: 4px solid var(--purple-accent);">
                        <strong style="color: var(--purple-primary); display: block; margin-bottom: 5px;">Clearinghouse Reporting</strong>
                        <p style="color: #666; font-size: 0.9rem; margin: 0; line-height: 1.5;">Results are reported promptly to ensure real-time regulatory compliance alignment.</p>
                    </div>
                </div>
                <div style="flex: 1; min-width: 280px; background: #fafafa; padding: 30px; border-radius: 20px; box-sizing: border-box;">
                    <h3 style="color: var(--purple-primary); font-size: 1.15rem; font-weight: 700; margin: 0 0 15px 0;">What to Bring:</h3>
                    <ul style="margin: 0; padding-left: 20px; color: #444; font-size: 0.95rem; line-height: 2;">
                        <li>Valid Commercial Driver's License (CDL)</li>
                        <li>Employer-issued Authorization Form</li>
                        <li>Current Medical Exception Documentation</li>
                        <li>List of Active Prescriptions</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
});
