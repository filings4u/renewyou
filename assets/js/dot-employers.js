/**
 * DOT Drug Testing - Corporate Employers Section
 * Location: assets/js/dot-employers.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('dot-employers-target');
    if (!target) return;

    target.innerHTML = `
        <div id="employers" style="background: #fafafa; padding: 70px 20px; box-sizing: border-box;">
            <div style="max-width: 1200px; margin: 0 auto; display: flex; gap: 50px; flex-wrap: wrap; align-items: center;">
                <div style="flex: 1; min-width: 300px;">
                    <span style="color: var(--purple-accent); font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 10px;">Consortium & Fleet Management</span>
                    <h2 style="color: var(--purple-primary); font-size: 2.1rem; font-weight: 800; margin: 0 0 20px 0; letter-spacing: -0.5px;">Corporate Testing Partnerships</h2>
                    <p style="color: #555; font-size: 1rem; line-height: 1.6; margin: 0 0 20px 0;">Streamline your occupational health administration. We partner with logistics operations, safety directors, and third-party administrators (TPAs) to secure completely airtight audit histories.</p>
                    <p style="color: #555; font-size: 1rem; line-height: 1.6; margin: 0;">We fully support federal random testing selection pools, electronic CCF tracking, and expert Medical Review Officer (MRO) oversight.</p>
                </div>
                <div style="flex: 1; min-width: 300px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: #fff; padding: 25px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.03);">
                        <h4 style="margin: 0 0 8px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.1rem;">MRO Review</h4>
                        <p style="color: #666; font-size: 0.85rem; margin: 0; line-height: 1.5;">Every single non-negative result is double-checked by a medical officer.</p>
                    </div>
                    <div style="background: #fff; padding: 25px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.03);">
                        <h4 style="margin: 0 0 8px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.1rem;">Electronic CCF</h4>
                        <p style="color: #666; font-size: 0.85rem; margin: 0; line-height: 1.5;">Paperless chains of custody mean fewer validation layout errors.</p>
                    </div>
                    <div style="background: #fff; padding: 25px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.03);">
                        <h4 style="margin: 0 0 8px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.1rem;">DOT Clearinghouse</h4>
                        <p style="color: #666; font-size: 0.85rem; margin: 0; line-height: 1.5;">Immediate sync guarantees compliance with federal reporting mandates.</p>
                    </div>
                    <div style="background: #fff; padding: 25px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.03);">
                        <h4 style="margin: 0 0 8px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.1rem;">Volume Pricing</h4>
                        <p style="color: #666; font-size: 0.85rem; margin: 0; line-height: 1.5;">Flexible corporate structures built specifically for large active fleets.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
});
