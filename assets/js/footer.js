/** * ReNew You Health & Wellness - Modernized Footer Controller (Strict Structural Alignment) * Location: assets/js/footer.js */ 
document.addEventListener('DOMContentLoaded', () => { 
    renderFooterModule(); 
}); 

/** * Renders an advanced, semantic footer matching the global 1450px responsive architecture */ 
function renderFooterModule() { 
    const target = document.getElementById('footer-target'); 
    if (!target) return; 
    target.innerHTML = ` 
        <footer style="background-color: var(--purple-primary); color: var(--bg-white); padding: 80px 20px 30px 20px; font-family: system-ui, -apple-system, sans-serif; box-sizing: border-box; width: 100%;"> 
            <style>
                /* Desktop & General Variables Fallback */
                .footer-container {
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); 
                    gap: 50px;
                }

                /* Mobile Layout Tightening & 2x2 Grid Adaptation */
                @media (max-width: 768px) {
                    /* Strip outer margins and padding blocks entirely */
                    footer {
                        padding: 30px 15px 15px 15px !important;
                    }
                    
                    /* Transform main structure into a tight 2x2 layout with 0px spacing gaps */
                    .footer-container {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 0px !important;
                        row-gap: 25px !important; 
                        padding-bottom: 20px !important;
                        border-bottom: none !important; 
                    }
                    
                    /* Strip inner text block margins and column spacing gaps completely */
                    .footer-col {
                        gap: 0px !important;
                        padding: 0px !important;
                        margin: 0px !important;
                       
                    }
                    
                    /* Push the second column (Contact Info) down to match the logo spacing */
                    .footer-container .footer-col:nth-child(2) {
                        margin-top: 90px !important; /* Perfect 90px logo box + 20px desktop gap alignment */
                    }
                    
                    /* Re-scale headings and clear absolute bottom layout height profiles */
                    .footer-col h3 {
                        min-height: auto !important;
                        padding-bottom: 8px !important;
                        margin-bottom: 6px !important;
                        font-size: 1.05rem !important;
                    }
                    
                    /* Compress textual list item spacing constraints */
                    .footer-col div {
                        gap: 6px !important;
                        font-size: 0.88rem !important;
                    }
                    
                    /* Compress company bio text bounds */
                    .footer-col p {
                        font-size: 0.88rem !important;
                        line-height: 1.5 !important;
                    }

                    /* Footer Bottom Layout Adaptations */
                    .footer-bottom {
                        padding-top: 15px !important;
                    }
                    .footer-bottom-inner {
                        flex-direction: column !important;
                        gap: 10px !important;
                        text-align: center !important;
                    }
                    .footer-bottom-inner p {
                        text-align: center !important;
                    }
                    .footer-bottom-links {
                        justify-content: center !important;
                        gap: 15px !important;
                    }
                }
            </style>

            <!-- Global 1450px Structural Container Grid --> 
            <div class="footer-container" style="max-width: 1450px; margin: 0 auto; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 50px; box-sizing: border-box;"> 
          
          
<!-- Brand Column with Perfected 10px Rounded Logo Box --> 
<div class="footer-col" style="display: flex; flex-direction: column; gap: 10px; align-items: flex-start; justify-content: flex-start; padding-top: 0; margin-top: 0; text-align: left;"> 
  <img src="images/logof.png" alt="ReNew You Health & Wellness Logo" style="max-width: 150px; height: 65px; object-fit: contain; display: block;  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.2));"> 
  
  <!-- FIX: Reduced top margin/gap by adjusting layout spacing --> 
  <div style="display: flex; flex-direction: column; gap: 10px; text-align: left; width: 100%; margin-top: 5px;"> 
    <h3 style="color: var(--green-light); margin: 0; font-size: 1.2rem; font-weight: 700; letter-spacing: -0.2px; line-height: 1.2;"> ReNew You </h3> 
    <p style="color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.7; margin: 0; max-width: 300px;"> Health & Wellness Clinic located in Chicago Heights, Illinois. Empowering every single patient to renew their health from the inside out. </p> 
  </div> 
</div>



                <!-- Contact Information Column --> 
                <div class="footer-col" style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start; justify-content: flex-start; padding-top: 0; margin-top: 0; text-align: left;"> 
                    <h3 style="color: var(--green-light); margin: 0; font-size: 1.2rem; font-weight: 700; letter-spacing: -0.2px; line-height: 1.2; min-height: 90px; display: flex; align-items: flex-end; padding-bottom: 4px; box-sizing: border-box;"> Contact Info </h3> 
                    <div style="display: flex; flex-direction: column; gap: 12px; color: rgba(255,255,255,0.85); font-size: 0.95rem; line-height: 1.5;"> 
                        <p style="margin: 0; display: flex; align-items: flex-start; gap: 10px;"> <span>📍</span> 500 Ashland Ave., Suite 101<br>Chicago Heights, IL 60411 </p> 
                        <p style="margin: 0; display: flex; align-items: center; gap: 10px;"> <span>📞</span> Phone: <a href="tel:7083292155" style="color: inherit; text-decoration: none; transition: color 0.2s;">708-329-2155</a> </p> 
                        <p style="margin: 0; display: flex; align-items: center; gap: 10px;"> <span>✉️</span> <a href="mailto:info@renewyouhealthwellness.com" style="color: inherit; text-decoration: none; transition: color 0.2s; word-break: break-all;">Send Us an Email</a> </p> 
                    </div> 
                </div> 
                <!-- Hours of Operation Column --> 
                <div class="footer-col" style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start; justify-content: flex-start; padding-top: 0; margin-top: 0; text-align: left;"> 
                    <h3 style="color: var(--green-light); margin: 0; font-size: 1.2rem; font-weight: 700; letter-spacing: -0.2px; line-height: 1.2; min-height: 90px; display: flex; align-items: flex-end; padding-bottom: 4px; box-sizing: border-box;"> Hours of Operation </h3> 
                    <div style="display: flex; flex-direction: column; gap: 10px; color: rgba(255,255,255,0.85); font-size: 0.95rem;"> 
                        <p style="margin: 0; display: flex; align-items: center; gap: 10px;"> <span>🗓️</span> Mon - Fri: 3pm - 7pm </p> 
                        <p style="margin: 0; display: flex; align-items: center; gap: 10px;"> <span>🗓️</span> Sat: 9am - 1pm </p> 
                        <p style="margin: 0; display: flex; align-items: center; gap: 10px;"> <span>🗓️</span> Sun: Closed </p> 
                        <p style="font-size: 0.82rem; color: rgba(255,255,255,0.45); margin: 5px 0 0 0; font-style: italic;"> *Closed on holidays </p> 
                    </div> 
                </div> 

                <!-- Social Connect Column --> 
                <div class="footer-col" style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start; justify-content: flex-start; padding-top: 0; margin-top: 0; text-align: left;"> 
                    <h3 style="color: var(--green-light); margin: 0; font-size: 1.2rem; font-weight: 700; letter-spacing: -0.2px; line-height: 1.2; min-height: 90px; display: flex; align-items: flex-end; padding-bottom: 4px; box-sizing: border-box;"> Connect With Us </h3> 
                    <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem;"> 
                        <p style="margin: 0;"> <a href="#" target="_blank" rel="noopener" style="color: rgba(255,255,255,0.85); text-decoration: none; display: flex; align-items: center; gap: 10px; transition: color 0.2s;"> <span>🔗</span> Facebook </a> </p> 
                        <p style="margin: 0;"> <a href="#" target="_blank" rel="noopener" style="color: rgba(255,255,255,0.85); text-decoration: none; display: flex; align-items: center; gap: 10px; transition: color 0.2s;"> <span>🔗</span> Instagram </a> </p> 
                        <p style="margin: 0;"> <a href="http://renewyouhealthwellness.com" style="color: var(--green-light); text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: 600; transition: opacity 0.2s;"> <span>🌐</span> Website </a> </p> 
                    </div> 
                </div> 
            </div> 
            <!-- STRETCHED 1450PX BOTTOM CONTAINER WITH ALIGNED LEGAL LINKS --> 
            <div class="footer-bottom" style="width: 100%; padding-top: 30px; font-size: 0.85rem; box-sizing: border-box; display: block; clear: both;"> 
                <div class="footer-bottom-inner" style="max-width: 1450px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; box-sizing: border-box;"> 
                    <p style="margin: 0; color: #F9F9F8; text-align: left; font-size: 0.85rem;"> 
                        &copy; 2026 ReNew You Health & Wellness. All rights reserved. 
                    </p> 
                    <div class="footer-bottom-links" style="display: flex; gap: 20px; justify-content: flex-end; align-items: center;"> 
                        <a href="privacy-policy.html" style="color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#F9F9F8'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">Privacy Policy</a> 
                        <a href="terms-of-service.html" style="color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#F9F9F8'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">Terms of Service</a> 
                    </div> 
                </div> 
            </div> 
        </footer> 
    `; 
}
