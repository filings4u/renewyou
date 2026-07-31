/** * ReNew You Health & Wellness - Services Hero Controller * Location: assets/js/services-hero.js */ 
document.addEventListener('DOMContentLoaded', () => { 
    renderServicesHero(); 
}); 

/** * Renders a premium 50/50 side-by-side split hero for the Services Catalog */ 
function renderServicesHero() { 
    const target = document.getElementById('services-hero-target'); 
    if (!target) return; 

    target.innerHTML = ` 
        <style>
            /* Mobile Optimization Rules for Services Hero */
            @media (max-width: 768px) {
                .services-hero-container {
                    flex-direction: column-reverse !important; /* Forces right-side markup image to the top */
                    padding: 40px 20px !important;
                    gap: 30px !important;
                }
                
                .services-hero-image-block {
                    width: 100% !important;
                    min-width: 100% !important;
                }
                
                /* Match image layout parameters across your core system modules */
                .services-hero-image-card {
                    width: 100% !important;
                    max-width: 100% !important;
                    height: 260px !important; /* Proportional vertical view limits */
                    border-radius: 20px !important; 
                }
                
                /* Balanced Typography Text Centering */
                .services-hero-text-block {
                    text-align: center !important;
                }
                
                .services-hero-text-block h1 {
                    font-size: 1.85rem !important;
                    line-height: 1.25 !important;
                    letter-spacing: -0.5px !important;
                    margin: 12px 0 15px 0 !important;
                }
                
                .services-hero-text-block p {
                    font-size: 1rem !important;
                    line-height: 1.55 !important;
                }
            }
        </style>

        <div class="services-hero-container" style="display: flex; flex-wrap: wrap; align-items: center; gap: 60px; max-width: 1450px; margin: 0 auto; padding: 60px 20px; box-sizing: border-box;"> 
            
            <!-- Left Side: Typography Content Area --> 
            <div class="services-hero-text-block" style="flex: 1.2; min-width: 320px; text-align: left; box-sizing: border-box;"> 
                <span style="background-color: rgba(79, 148, 12, 0.08); color: var(--green-secondary); padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block;">
                    Clinical & Lifestyle Offerings
                </span> 
                <h1 style="font-size: 2.6rem; margin: 15px 0 20px 0; color: var(--purple-primary); font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; max-width: 650px;">
                    Care designed around your needs.
                </h1> 
                <p style="font-size: 1.15rem; color: #555; max-width: 700px; margin: 0; line-height: 1.6;"> 
                    Explore our comprehensive health management packages. We mix patient-first values with convenient scheduling options to optimize your long-term health outcome. 
                </p> 
            </div> 

            <!-- Right Side: Frame Visual Area --> 
            <div class="services-hero-image-block" style="flex: 1; min-width: 320px; display: flex; justify-content: center; align-items: center; box-sizing: border-box;"> 
                <div class="services-hero-image-card" style="width: 100%; max-width: 550px; height: 440px; border-radius: 28px; overflow: hidden; box-shadow: 0 12px 35px rgba(62,13,95,0.06); border: 1px solid rgba(138,52,159,0.08); box-sizing: border-box;"> 
                    <img src="images/services-hero.png" alt="Clinical offerings and medical support diagnostics" style="width: 100%; height: 100%; object-fit: cover; display: block;"> 
                </div> 
            </div>

        </div> 
    `; 
}
