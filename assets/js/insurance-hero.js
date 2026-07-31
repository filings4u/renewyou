/** * ReNew You Health & Wellness - Insurance Hero Controller * Location: assets/js/insurance-hero.js */
document.addEventListener('DOMContentLoaded', () => {
    renderInsuranceHero();
});

function renderInsuranceHero() {
    const target = document.getElementById('insurance-hero-target');
    if (!target) return;

    target.innerHTML = `
        <style>
            @media (max-width: 768px) {
                .ins-hero-container { flex-direction: column-reverse !important; padding: 40px 20px !important; gap: 30px !important; }
                .ins-hero-img-block { width: 100% !important; min-width: 100% !important; }
                .ins-hero-img-card { width: 100% !important; max-width: 100% !important; height: 260px !important; border-radius: 20px !important; }
                .ins-hero-text-block { text-align: center !important; }
                .ins-hero-text-block h1 { font-size: 1.85rem !important; line-height: 1.25 !important; margin: 12px 0 15px 0 !important; }
                .ins-hero-text-block p { font-size: 1rem !important; line-height: 1.55 !important; }
            }
        </style>
        <div class="ins-hero-container" style="display: flex; flex-wrap: wrap; align-items: center; gap: 60px; max-width: 1450px; margin: 0 auto; padding: 60px 20px; box-sizing: border-box;">
            
            <!-- Left Column: Typography Layout -->
            <div class="ins-hero-text-block" style="flex: 1.2; min-width: 320px; text-align: left; box-sizing: border-box;">
                <span style="background-color: rgba(79, 148, 12, 0.08); color: var(--green-secondary); padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block;">Coverage & Billing</span>
                <h1 style="font-size: 2.6rem; margin: 15px 0 20px 0; color: var(--purple-primary); font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; max-width: 650px;">Insurance Networks We Accept</h1>
                <p style="font-size: 1.15rem; color: #555; max-width: 700px; margin: 0; line-height: 1.6;">We are committed to making exceptional healthcare affordable and highly accessible. Our administrative team works directly with major insurance providers to maximize your benefits and minimize your out-of-pocket costs.</p>
            </div>

            <!-- Right Column: Visual Frame Area -->
            <div class="ins-hero-img-block" style="flex: 1; min-width: 320px; display: flex; justify-content: center; align-items: center; box-sizing: border-box;">
                <div class="ins-hero-img-card" style="width: 100%; max-width: 550px; height: 440px; border-radius: 28px; overflow: hidden; box-shadow: 0 12px 35px rgba(62,13,95,0.06); border: 1px solid rgba(138,52,159,0.08); box-sizing: border-box;">
                    <img src="images/hero-insurance.jpg" alt="Health coverage insurance documents and cards on consultation table" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                </div>
            </div>

        </div>
    `;
}
