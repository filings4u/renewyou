/** * ReNew You Health & Wellness - Diagnostic Preparation Guide * Location: assets/js/patient-onboarding.js */
document.addEventListener('DOMContentLoaded', () => {
    renderDiagnosticPrepModule();
});

function renderDiagnosticPrepModule() {
    const target = document.getElementById('patient-onboarding-target');
    if (!target) return;

    target.innerHTML = `
        <style>
            .prep-grid-system { 
                display: flex; 
                gap: 25px; 
                flex-wrap: wrap; 
                max-width: 1450px; 
                margin: 0 auto; 
                box-sizing: border-box; 
            }
            @media (max-width: 768px) { 
                .prep-grid-system { flex-direction: column !important; gap: 20px !important; } 
                .prep-outer-wrap h3 { font-size: 1.85rem !important; } 
                .prep-outer-wrap { padding: 20px 15px !important; } 
            }
        </style>
        <div class="prep-outer-wrap" style="max-width: 1450px; margin: 0 auto; box-sizing: border-box;">
            <div style="text-align: center; margin-bottom: 45px;">
                <span style="color: var(--green-secondary); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; background-color: rgba(79, 148, 12, 0.06); padding: 5px 14px; border-radius: 20px; margin-bottom: 12px;">Testing Optimization</span>
                <h3 style="font-size: 2.3rem; color: var(--purple-primary); font-weight: 800; margin: 0; letter-spacing: -0.5px; line-height: 1.2;">Pre-Visit Diagnostic Requirements</h3>
                <p style="color: #555; font-size: 1.05rem; max-width: 700px; margin: 15px auto 0 auto; line-height: 1.6;">To maximize the effectiveness of your diagnostic tests, please follow these guidelines:</p>
            </div>
            
            <div class="prep-grid-system">
                <!-- Fasting Protocol -->
                <div style="flex: 1; min-width: 320px; background: var(--bg-white); border-radius: 24px; padding: 40px 30px; border: 1px solid rgba(138, 52, 159, 0.06); box-shadow: 0 10px 35px rgba(62,13,95,0.01); display: flex; flex-direction: column; text-align: left; box-sizing: border-box;">
                    <div style="margin-bottom: 15px;">
                        <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--purple-accent); background: rgba(138, 52, 159, 0.04); padding: 5px 12px; border-radius: 30px;">8-12 Hours Prior</span>
                    </div>
                    <h4 style="font-size: 1.25rem; color: var(--purple-primary); font-weight: 800; margin: 0 0 12px 0; letter-spacing: -0.2px;">Metabolic & GLP-1 Fasting Protocol</h4>
                    <p style="font-size: 0.95rem; color: #555; line-height: 1.6; margin: 0 0 20px 0; flex: 1;">For the most accurate baseline insulin, glucose, and metabolic panels, a strict fast is required. Please avoid consuming foods, coffee, juices, or sugary mints. Stay hydrated with plenty of plain water.</p>
                    <div style="background-color: #F9F9F8; padding: 12px 16px; border-radius: 12px; border-left: 3px solid var(--purple-accent); font-size: 0.88rem; color: #444; line-height: 1.4; font-weight: 550;">
                        💡 <strong>Medication Reminder</strong>: Continue your regular daily blood pressure or thyroid medications unless instructed otherwise by our team.
                    </div>
                </div>

                <!-- Hormone Testing Window -->
                <div style="flex: 1; min-width: 320px; background: var(--bg-white); border-radius: 24px; padding: 40px 30px; border: 1px solid rgba(138, 52, 159, 0.06); box-shadow: 0 10px 35px rgba(62,13,95,0.01); display: flex; flex-direction: column; text-align: left; box-sizing: border-box;">
                    <div style="margin-bottom: 15px;">
                        <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--purple-accent); background: rgba(138, 52, 159, 0.04); padding: 5px 12px; border-radius: 30px;">Early Morning Preferred</span>
                    </div>
                    <h4 style="font-size: 1.25rem; color: var(--purple-primary); font-weight: 800; margin: 0 0 12px 0; letter-spacing: -0.2px;">Hormone Baseline Testing Window</h4>
                    <p style="font-size: 0.95rem; color: #555; line-height: 1.6; margin: 0 0 20px 0; flex: 1;">Cortisol, testosterone, and other endocrine markers vary throughout the day. We recommend scheduling your blood draw before 10:00 AM to ensure accuracy in your diagnostic results.</p>
                    <div style="background-color: #F9F9F8; padding: 12px 16px; border-radius: 12px; border-left: 3px solid var(--green-secondary); font-size: 0.88rem; color: #444; line-height: 1.4; font-weight: 550;">
                        💡 <strong>Notify Us</strong>: Please inform your clinical specialist if you have used any bio-identical hormones or are currently on an active cycle.
                    </div>
                </div>

                <!-- Body Composition Analysis -->
                <div style="flex: 1; min-width: 320px; background: var(--bg-white); border-radius: 24px; padding: 40px 30px; border: 1px solid rgba(138, 52, 159, 0.06); box-shadow: 0 10px 35px rgba(62,13,95,0.01); display: flex; flex-direction: column; text-align: left; box-sizing: border-box;">
                    <div style="margin-bottom: 15px;">
                        <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--purple-accent); background: rgba(138, 52, 159, 0.04); padding: 5px 12px; border-radius: 30px;">2 Hours Prior</span>
                    </div>
                    <h4 style="font-size: 1.25rem; color: var(--purple-primary); font-weight: 800; margin: 0 0 12px 0; letter-spacing: -0.2px;">Body Composition Analysis (BIA)</h4>
                    <p style="font-size: 0.95rem; color: #555; line-height: 1.6; margin: 0 0 20px 0; flex: 1;">To obtain the best results from our high-precision biological impedance analysis, avoid strenuous exercise and heavy caffeine intake beforehand. It’s also important to ensure your bladder is completely empty before stepping onto the diagnostic plate.</p>
                    <div style="background-color: #F9F9F8; padding: 12px 16px; border-radius: 12px; border-left: 3px solid var(--purple-accent); font-size: 0.88rem; color: #444; line-height: 1.4; font-weight: 550;">
                        💡 <strong>Tip</strong>: Arrive early to complete check-in procedures before stepping on the scanner.
                    </div>
                </div>
            </div>
        </div>
    `;
}
