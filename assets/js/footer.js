/**
 * ReNew You Health & Wellness - Modernized Footer Controller (Strict Structural Alignment)
 * Location: assets/js/footer.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderFooterModule();
});

/**
 * Renders an advanced, semantic footer matching the global 1450px responsive architecture
 */
function renderFooterModule() {
    const target = document.getElementById('footer-target');
    if (!target) return;

    target.innerHTML = `
        <footer style="background-color: var(--purple-primary); color: var(--bg-white); padding: 80px 20px 30px 20px; font-family: system-ui, -apple-system, sans-serif; box-sizing: border-box; width: 100%;">
            
            <!-- Global 1450px Structural Container Grid -->
            <div class="footer-container" style="max-width: 1450px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 50px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 50px; box-sizing: border-box;">
                
                <!-- Brand Column with Perfected 10px Rounded Logo Box -->
                <div class="footer-col" style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start; justify-content: flex-start; padding-top: 0; margin-top: 0; text-align: left;">
                    
                    <!-- LOGO IS PERFECTLY CENTERED EXCLUSIVELY INSIDE THIS CONTAINER -->
                    <div style="width: 90px; height: 90px; background-color: #F9F9F8; border-radius: 10px; display: flex; align-items: center; justify-content: center; padding: 6px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); box-sizing: border-box; overflow: hidden; margin-left: 0;">
                        <img src="images/logo.png" alt="ReNew You Health & Wellness Logo" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; margin: 0 auto;">
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px; text-align: left; width: 100%;">
                        <h3 style="color: var(--green-light); margin: 0; font-size: 1.2rem; font-weight: 700; letter-spacing: -0.2px; line-height: 1.2;">
                            ReNew You
                        </h3>
                        <p style="color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.7; margin: 0; max-width: 300px;">
                            Health & Wellness Clinic located in Chicago Heights, Illinois. Empowering every single patient to renew their health from the inside out.
                        </p>
                    </div>
                </div>

                <!-- Contact Information Column -->
                <div class="footer-col" style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start; justify-content: flex-start; padding-top: 0; margin-top: 0; text-align: left;">
                    <h3 style="color: var(--green-light); margin: 0; font-size: 1.2rem; font-weight: 700; letter-spacing: -0.2px; line-height: 1.2; min-height: 90px; display: flex; align-items: flex-end; padding-bottom: 4px; box-sizing: border-box;">
                        Contact Info
                    </h3>
                    <div style="display: flex; flex-direction: column; gap: 12px; color: rgba(255,255,255,0.85); font-size: 0.95rem; line-height: 1.5;">
                        <p style="margin: 0; display: flex; align-items: flex-start; gap: 10px;">
                            <span>📍</span> 500 Ashland Ave., Suite 101<br>Chicago Heights, IL 60411
                        </p>
                        <p style="margin: 0; display: flex; align-items: center; gap: 10px;">
                            <span>📞</span> Phone: <a href="tel:7083292155" style="color: inherit; text-decoration: none; font-weight: 600; transition: color 0.2s;">708-329-2155</a>
                        </p>
                        <p style="margin: 0; display: flex; align-items: center; gap: 10px;">
                            <span>✉️</span> <a href="mailto:info@renewyouhealthwellness.com" style="color: inherit; text-decoration: none; transition: color 0.2s; word-break: break-all;">info@renewyouhealthwellness.com</a>
                        </p>
                    </div>
                </div>

                <!-- Hours of Operation Column -->
                <div class="footer-col" style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start; justify-content: flex-start; padding-top: 0; margin-top: 0; text-align: left;">
                    <h3 style="color: var(--green-light); margin: 0; font-size: 1.2rem; font-weight: 700; letter-spacing: -0.2px; line-height: 1.2; min-height: 90px; display: flex; align-items: flex-end; padding-bottom: 4px; box-sizing: border-box;">
                        Hours of Operation
                    </h3>
                    <div style="display: flex; flex-direction: column; gap: 10px; color: rgba(255,255,255,0.85); font-size: 0.95rem;">
                        <p style="margin: 0; display: flex; align-items: center; gap: 10px;">
                            <span>🗓️</span> Monday - Friday: 3:00 PM - 7:00 PM
                        </p>
                        <p style="margin: 0; display: flex; align-items: center; gap: 10px;">
                            <span>🗓️</span> Saturday: 9:00 AM - 1:00 PM
                        </p>
                        <p style="margin: 0; display: flex; align-items: center; gap: 10px;">
                            <span>🗓️</span> Sunday: Closed
                        </p>
                        <p style="font-size: 0.82rem; color: rgba(255,255,255,0.45); margin: 5px 0 0 0; font-style: italic;">
                            *Closed on all major holidays
                        </p>
                    </div>
                </div>

                <!-- Social Connect Column -->
                <div class="footer-col" style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start; justify-content: flex-start; padding-top: 0; margin-top: 0; text-align: left;">
                    <h3 style="color: var(--green-light); margin: 0; font-size: 1.2rem; font-weight: 700; letter-spacing: -0.2px; line-height: 1.2; min-height: 90px; display: flex; align-items: flex-end; padding-bottom: 4px; box-sizing: border-box;">
                        Connect With Us
                    </h3>
                    <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem;">
                        <p style="margin: 0;">
                            <a href="#" target="_blank" rel="noopener" style="color: rgba(255,255,255,0.85); text-decoration: none; display: flex; align-items: center; gap: 10px; transition: color 0.2s;">
                                <span>🔗</span> Facebook: @renewyouhealthwellness
                            </a>
                        </p>
                        <p style="margin: 0;">
                            <a href="#" target="_blank" rel="noopener" style="color: rgba(255,255,255,0.85); text-decoration: none; display: flex; align-items: center; gap: 10px; transition: color 0.2s;">
                                <span>🔗</span> Instagram: @renewyouhealthwellness
                            </a>
                        </p>
                        <p style="margin: 0;">
                            <a href="http://renewyouhealthwellness.com" style="color: var(--green-light); text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: 600; transition: opacity 0.2s;">
                                <span>🌐</span> renewyouhealthwellness.com
                            </a>
                        </p>
                    </div>
                </div>

            </div>

            <!-- COPYRIGHT CENTERED IN THE EXACT MIDDLE OF THE VIEWPORT PAGE -->
            <div class="footer-bottom" style="width: 100%; text-align: center; padding-top: 30px; font-size: 0.85rem; color: rgba(255,255,255,0.5); box-sizing: border-box; display: block; clear: both;">
                <p style="margin: 0; text-align: center; width: 100%;">
                    &copy; 2026 ReNew You Health & Wellness. All rights reserved.
                </p>
            </div>

        </footer>
    `;
}
