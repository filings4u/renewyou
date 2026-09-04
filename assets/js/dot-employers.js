/**
 * DOT Drug Testing - Expanded Corporate Employers Section (Mobile-Friendly)
 * Location: assets/js/dot-employers.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('dot-employers-target');
    if (!target) return;

    target.innerHTML = `
        <style>
            .emp-section-wrap {
                background: #fafafa;
                padding: clamp(40px, 8vw, 80px) 20px;
                box-sizing: border-box;
                width: 100%;
            }
            .emp-container {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                gap: 50px;
            }
            .emp-hero-split {
                display: flex;
                gap: 40px;
                flex-wrap: wrap;
                align-items: center;
            }
            .emp-info-pane {
                flex: 1.2;
                min-width: 320px;
            }
            .emp-features-pane {
                flex: 1;
                min-width: 320px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 20px;
            }
            .emp-feature-card {
                background: #fff;
                padding: 28px;
                border-radius: 20px;
                border: 1px solid rgba(138, 52, 159, 0.05);
                box-shadow: 0 10px 30px rgba(62,13,95,0.01);
                transition: transform 0.2s ease;
            }
            .emp-detail-row {
                background: #ffffff;
                border: 1px solid rgba(138, 52, 159, 0.05);
                border-radius: 24px;
                padding: 35px;
                margin-top: 20px;
            }
            @media (max-width: 992px) {
                .emp-hero-split {
                    flex-direction: column;
                }
                .emp-info-pane, .emp-features-pane {
                    width: 100%;
                }
            }
            @media (max-width: 768px) {
                .emp-section-wrap { padding: 40px 15px; }
                .emp-features-pane { grid-template-columns: 1fr; gap: 15px; }
                .emp-feature-card { padding: 22px; }
                .emp-detail-row { padding: 22px; }
            }
        </style>
        <div id="employers" class="emp-section-wrap">
            <div class="emp-container">
                <!-- Top Split: Description & Feature Grid -->
                <div class="emp-hero-split">
                    <div class="emp-info-pane">
                        <span style="color: var(--purple-accent); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 12px;">Consortium & Fleet Management</span>
                        <h2 style="color: var(--purple-primary); font-size: clamp(2rem, 4vw, 2.5rem); font-weight: 800; margin: 0 0 20px 0; letter-spacing: -0.6px; line-height: 1.2;">DOT Drug & Alcohol Testing Programs for Employers</h2>
                        <p style="color: #555; font-size: 1.05rem; line-height: 1.6; margin: 0 0 20px 0;">Streamline your occupational health administration. We partner directly with safety directors, logistics coordinators, and Third-Party Administrators (TPAs) to secure completely airtight, audit-ready testing histories across your workforce.</p>
                        <p style="color: #555; font-size: 1.05rem; line-height: 1.6; margin: 0 0 25px 0;">Our certified testing laboratory staff fully supports multi-agency compliance frameworks ensuring your commercial operations stay on the road without federal intervention or costly downtime penalties.</p>
                        
                        <!-- Modal Agency Badges -->
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 15px;">
                            <span style="background: rgba(138,52,159,0.04); color: var(--purple-primary); padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; border: 1px solid rgba(138,52,159,0.08);">FMCSA (Trucking)</span>
                            <span style="background: rgba(138,52,159,0.04); color: var(--purple-primary); padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; border: 1px solid rgba(138,52,159,0.08);">FAA (Aviation)</span>
                            <span style="background: rgba(138,52,159,0.04); color: var(--purple-primary); padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; border: 1px solid rgba(138,52,159,0.08);">FRA (Railroad)</span>
                            <span style="background: rgba(138,52,159,0.04); color: var(--purple-primary); padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; border: 1px solid rgba(138,52,159,0.08);">FTA (Transit)</span>
                            <span style="background: rgba(138,52,159,0.04); color: var(--purple-primary); padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; border: 1px solid rgba(138,52,159,0.08);">PHMSA (Pipeline)</span>
                        </div>
                    </div>

                    <div class="emp-features-pane">
                        <div class="emp-feature-card">
                            <h4 style="margin: 0 0 10px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.15rem;">MRO Oversight</h4>
                            <p style="color: #666; font-size: 0.9rem; margin: 0; line-height: 1.5;">All laboratory results run under strict Medical Review Officer protocols, insulating your business against regulatory validation gaps.</p>
                        </div>
                        <div class="emp-feature-card">
                            <h4 style="margin: 0 0 10px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.15rem;">eCCF Electronic Tracking</h4>
                            <p style="color: #666; font-size: 0.9rem; margin: 0; line-height: 1.5;">Paperless chains of custody eliminate traditional handwritten transcriptions, dropping collection-site document errors to zero.</p>
                        </div>
                        <div class="emp-feature-card">
                            <h4 style="margin: 0 0 10px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.15rem;">Clearinghouse Syncing</h4>
                            <p style="color: #666; font-size: 0.9rem; margin: 0; line-height: 1.5;">Direct, priority reporting paths transmit records straight to federal repositories within mandated compliance timelines.</p>
                        </div>
                        <div class="emp-feature-card">
                            <h4 style="margin: 0 0 10px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.15rem;">Consortium Matrix</h4>
                            <p style="color: #666; font-size: 0.9rem; margin: 0; line-height: 1.5;">Volume pricing packages and continuous random selection integrations tailored specifically for local logistics fleets.</p>
                        </div>
                    </div>
                </div>
                <!-- Bottom Full-Width Section: Audit Preparedness Guide -->
                <div class="emp-detail-row">
                    <h3 style="margin: 0 0 15px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.3rem;">Audit Preparedness & MIS Data Reports</h3>
                    <p style="color: #555; line-height: 1.6; font-size: 0.95rem; margin: 0 0 20px 0;">During a Department of Transportation safety audit, inspectors require clean, structured documentation verifying your drug and alcohol testing program history. We provide completely transparent Management Information System (MIS) reports and secure document retention frameworks that give your safety team greater peace of mind.</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; border-top: 1px solid rgba(138,52,159,0.06); padding-top: 25px;">
                        <div>
                            <strong style="color: var(--purple-primary); display: block; margin-bottom: 6px; font-size: 1rem;">Complete Chain of Custody (CCF) logs</strong>
                            <p style="color: #666; font-size: 0.85rem; margin: 0; line-height: 1.5;">Every sample includes bulletproof digital trails verifying processing timeline legitimacy.</p>
                        </div>
                        <div>
                            <strong style="color: var(--purple-primary); display: block; margin-bottom: 6px; font-size: 1rem;">Random Pool Statistics Summaries</strong>
                            <p style="color: #666; font-size: 0.85rem; margin: 0; line-height: 1.5;">Instantly print records proving your fleet satisfied its annual quota thresholds perfectly.</p>
                        </div>
                        <div>
                            <strong style="color: var(--purple-primary); display: block; margin-bottom: 6px; font-size: 1rem;">MRO Certified Medical Logs</strong>
                            <p style="color: #666; font-size: 0.85rem; margin: 0; line-height: 1.5;">All test verifications are cataloged safely under medical supervision profiles.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
});
