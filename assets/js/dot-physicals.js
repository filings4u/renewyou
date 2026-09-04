/**
 * DOT Compliance - Responsive DOT Physicals Exam Component
 * Location: assets/js/dot-physicals.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('dot-physicals-target');
    if (!target) return;

    target.innerHTML = `
        <style>
            .phys-outer-wrap {
                max-width: 1200px;
                margin: 0 auto;
                padding: 60px 20px;
                box-sizing: border-box;
            }
            .phys-hero-block {
                text-align: center;
                margin-bottom: 50px;
            }
            .phys-flex-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 40px;
            }
            .phys-main-panel {
                flex: 1.4;
                min-width: 320px;
            }
            .phys-checklist-sidebar {
                flex: 1;
                min-width: 280px;
                background: #ffffff;
                border: 1px solid rgba(138,52,159,0.06);
                border-radius: 24px;
                padding: 35px;
                box-shadow: 0 10px 35px rgba(62,13,95,0.01);
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .phys-requirement-box {
                background: #ffffff;
                border: 1px solid rgba(138,52,159,0.06);
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(62,13,95,0.01);
                margin-top: 30px;
            }
            @media (max-width: 768px) {
                .phys-outer-wrap { padding: 30px 15px; }
                .phys-flex-grid { flex-direction: column; gap: 25px; }
                .phys-main-panel { min-width: 100%; }
                .phys-requirement-box { padding: 20px; margin-top: 20px; }
                .phys-checklist-sidebar { min-width: 100%; padding: 25px 20px; }
                .phys-checklist-sidebar a { box-sizing: border-box; }
            }
        </style>
        <div class="phys-outer-wrap">
        

            <div class="phys-flex-grid">
                <!-- Main Content Panel -->
                <div class="phys-main-panel">
                    <h2 style="color: var(--purple-primary); font-size: 1.4rem; font-weight: 800; margin-top: 0;">FMCSA DOT Physical Exams & Medical Certification</h2>
                    <p style="color: #555; line-height: 1.6; font-size: 1.05rem; margin: 0 0 20px 0;">Our clinic provides fully certified DOT physical examinations executed by registered medical examiners. We ensure commercial operators satisfy all federal fitness rules efficiently to lock down valid medical certificates without dispatch interruption loop delays.</p>
                    
                    <!-- 4 Examination Metric Core Requirements Grid Box -->
                    <div class="phys-requirement-box">
                        <h3 style="margin: 0 0 20px 0; color: var(--purple-primary); font-weight: 800; font-size: 1.2rem;">What the Physical Examination Evaluates:</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                            <div style="background:#fafafa; padding:15px; border-radius:10px; font-size:0.9rem; color:#444; line-height:1.5;">👁️ <strong>Vision Check:</strong> At least 20/40 acuity in each eye with or without corrective lenses.</div>
                            <div style="background:#fafafa; padding:15px; border-radius:10px; font-size:0.9rem; color:#444; line-height:1.5;">👂 <strong>Hearing Test:</strong> Must perceive a forced whisper at a distance of 5 feet successfully.</div>
                            <div style="background:#fafafa; padding:15px; border-radius:10px; font-size:0.9rem; color:#444; line-height:1.5;">🩺 <strong>Blood Pressure:</strong> Screened safely to check for controlled, sustainable baseline metrics.</div>
                            <div style="background:#fafafa; padding:15px; border-radius:10px; font-size:0.9rem; color:#444; line-height:1.5;">🧪 <strong>Urinalysis:</strong> Quick sample check looking for protein, blood, or glucose anomalies.</div>
                        </div>
                    </div>
                </div>

                <!-- Driver Checklist Sidebar -->
                <div class="phys-checklist-sidebar">
                    <div>
                        <h3 style="color: var(--purple-primary); font-size: 1.3rem; font-weight: 800; margin: 0 0 15px 0;">DOT Driver Exam Checklist</h3>
                        <p style="color: #666; font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px;">Bring these items to help your DOT physical move smoothly and avoid preventable certification delays:</p>
                        <ul style="margin: 0 0 20px 0; padding-left: 20px; color: #444; font-size: 0.95rem; line-height: 2;">
                            <li>Valid Driver's License (CDL)</li>
                            <li>Current Medical Examiner Card (if renewing)</li>
                            <li>Glasses, contacts, or hearing aids</li>
                            <li>Exemption waiver clearances (SPE or details)</li>
                        </ul>
                    </div>
                    <a href="dot-appointment.html" style="display: block; width: 100%; background: var(--purple-primary); color: #fff; text-align: center; text-decoration: none; padding: 14px; border-radius: 12px; font-weight: 700; font-size: 0.95rem; margin-top: 20px; box-shadow: 0 5px 15px rgba(62,13,95,0.1);">Book DOT Physical Now</a>
                </div>
            </div>
        </div>
    `;
});
