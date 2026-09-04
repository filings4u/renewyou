/** * ReNew You Health & Wellness - Patient Preparation Hero Controller * Location: assets/js/patients-hero.js */ 
document.addEventListener('DOMContentLoaded', () => { 
    renderPatientsHero(); 
}); 

/** * Renders a premium 50/50 side-by-side split hero for the Patient Checklist page */ 
function renderPatientsHero() { 
    const target = document.getElementById('patients-hero-target'); 
    if (!target) return; 

    target.innerHTML = ` 
        <style>
            /* Mobile Optimization Rules for Patients Hero */
            @media (max-width: 768px) {
                .patients-hero-container {
                    flex-direction: column-reverse !important; /* Pushes the image container cleanly to the top */
                    padding: 40px 20px !important;
                    gap: 30px !important;
                }
                
                .patients-hero-image-block {
                    width: 100% !important;
                    min-width: 100% !important;
                }
                
                /* Match image layout parameters across core platform components */
                .patients-hero-image-card {
                    width: 100% !important;
                    max-width: 100% !important;
                    height: 260px !important; /* Proportional mobile viewport restrictions */
                    border-radius: 20px !important; 
                }
                
                /* Balanced Mobile Typography Centering */
                .patients-hero-text-block {
                    text-align: center !important;
                }
                
                .patients-hero-text-block h1 {
                    font-size: 1.85rem !important;
                    line-height: 1.25 !important;
                    letter-spacing: -0.5px !important;
                    margin: 12px 0 15px 0 !important;
                }
                
                .patients-hero-text-block p {
                    font-size: 1rem !important;
                    line-height: 1.55 !important;
                }
            }
        </style>

        <div class="patients-hero-container" style="display: flex; flex-wrap: wrap; align-items: center; gap: 60px; max-width: 1450px; margin: 0 auto; padding: 60px 20px; box-sizing: border-box;"> 
            
            <!-- Left Side: Typography Content Area --> 
            <div class="patients-hero-text-block" style="flex: 1.2; min-width: 320px; text-align: left; box-sizing: border-box;"> 
                <span style="background-color: rgba(62, 13, 95, 0.05); color: var(--purple-primary); padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block;">
                    Patient Checklist
                </span> 
                <h1 style="font-size: 2.6rem; margin: 15px 0 20px 0; color: var(--purple-primary); font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; max-width: 650px;">
                    Patient Information & Visit Preparation
                </h1> 
                <p style="font-size: 1.15rem; color: #555; max-width: 700px; margin: 0; line-height: 1.6;"> 
                    We want to make your clinical check-in smooth and worry-free. Please check the preparation list below before visiting our team.
                </p> 
            </div> 

            <!-- Right Side: Frame Visual Area --> 
            <div class="patients-hero-image-block" style="flex: 1; min-width: 320px; display: flex; justify-content: center; align-items: center; box-sizing: border-box;"> 
                <div class="patients-hero-image-card" style="width: 100%; max-width: 550px; height: 440px; border-radius: 28px; overflow: hidden; box-shadow: 0 12px 35px rgba(62,13,95,0.06); border: 1px solid rgba(138,52,159,0.08); box-sizing: border-box;"> 
                    <img src="images/hero-patients.png" alt="Patient forms and visit preparation information for ReNew You Health & Wellness in Chicago Heights" style="width: 100%; height: 100%; object-fit: cover; display: block;"> 
                </div> 
            </div>

        </div> 
    `; 
}
