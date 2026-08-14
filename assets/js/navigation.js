/**
 * ReNew You Health & Wellness - Modern Responsive Navigation Component Engine
 * Location: assets/js/navigation.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
});

/**
 * Builds and injects the complete navigation header block into the HTML target
 */
function renderNavigation() {
    const target = document.getElementById('navigation-target');
    if (!target) return;

    target.innerHTML = `
        <!-- Quick Contact Utility Strip --> 
  <div class="global-top-bar" style="background-color: var(--purple-accent); color: var(--bg-white); padding: 10px 20px; font-size: 0.9rem; font-family: system-ui, -apple-system, sans-serif; box-sizing: border-box; width: 100%;"> 
    <style>
        /* Mobile responsive rule to remove the top bar */
        @media (max-width: 768px) {
            .global-top-bar {
                display: none !important;
            }
        }
    </style>
    <div style="max-width: 1450px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; box-sizing: border-box;"> 
        <span style="display: flex; align-items: center; gap: 6px;">📍 500 Ashland Ave., Suite 101, Chicago Heights, IL 60411</span> 
        <div style="display: flex; flex-wrap: wrap; gap: 15px;"> 
            <span style="display: flex; align-items: center; gap: 6px;">📞 708-329-2155</span> 
            <span style="display: flex; align-items: center; gap: 6px;">✉️ info@renewyouhealthwellness.com</span> 
        </div> 
    </div> 
</div>


        <header style="background-color: var(--bg-white); box-shadow: 0 2px 10px rgba(62, 13, 95, 0.05); position: sticky; top: 0; z-index: 1000; width: 100%; box-sizing: border-box;">
            <div class="nav-container" style="max-width: 1450px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; position: relative; box-sizing: border-box;">
                
                <!-- Logo -->
                <a href="index.html" class="nav-logo" style="display: block;">
                    <img src="images/logo2.png" alt="ReNew You Health & Wellness Logo" style="height: 50px; width: auto; display: block;">
                </a>

                <!-- STSTRICT UNBREAKABLE HORIZONTAL FLEX TOGGLE RECTANGLE -->
                <button class="menu-toggle" id="mobileMenuBtn" aria-label="Toggle Navigation" style="display: none; align-items: center !important; justify-content: center !important; flex-direction: row !important; gap: 10px !important; background-color: var(--bg-offwhite) !important; border: 1px solid rgba(138, 52, 159, 0.2) !important; border-radius: 6px !important; padding: 6px 14px !important; height: 38px !important; width: auto !important; min-width: 90px !important; max-width: 110px !important; cursor: pointer; box-sizing: border-box !important; overflow: hidden !important;">
                    <span style="font-size: 0.85rem !important; font-weight: 700 !important; color: #ffffff !important; text-transform: uppercase !important; letter-spacing: 1px !important; font-family: system-ui, -apple-system, sans-serif !important; display: inline-block !important; line-height: 1 !important; margin: 0 !important; padding: 0 !important; white-space: nowrap !important;">Menu</span>
                    <div style="display: flex !important; flex-direction: column !important; justify-content: center !important; gap: 3px !important; width: 16px !important; height: 12px !important; min-width: 16px !important; margin: 0 !important; padding: 0 !important; box-sizing: border-box !important;">
                        <span style="display: block !important; width: 100% !important; height: 2px !important; background-color: var(--purple-primary) !important; border-radius: 1px !important;"></span>
                        <span style="display: block !important; width: 100% !important; height: 2px !important; background-color: var(--purple-primary) !important; border-radius: 1px !important;"></span>
                        <span style="display: block !important; width: 100% !important; height: 2px !important; background-color: var(--purple-primary) !important; border-radius: 1px !important;"></span>
                    </div>
                </button>

                <!-- Navigation Links List Menu -->
                <ul class="nav-menu" id="navMenu" style="display: flex; align-items: center; gap: 25px; list-style: none; margin: 0; padding: 0; box-sizing: border-box;">
                    <li><a href="index.html" class="nav-link" data-page="index" style="color: var(--purple-primary); text-decoration: none; font-weight: 600; font-size: 1rem; transition: color 0.3s ease;">Home</a></li>
                    <li><a href="about.html" class="nav-link" data-page="about" style="color: var(--purple-primary); text-decoration: none; font-weight: 600; font-size: 1rem; transition: color 0.3s ease;">About</a></li>
                    <li><a href="services.html" class="nav-link" data-page="services" style="color: var(--purple-primary); text-decoration: none; font-weight: 600; font-size: 1rem; transition: color 0.3s ease;">Services</a></li>
                    <li><a href="insurance.html" class="nav-link" data-page="insurance" style="color: var(--purple-primary); text-decoration: none; font-weight: 600; font-size: 1rem; transition: color 0.3s ease;">Insurance</a></li>
                    <li><a href="patients.html" class="nav-link" data-page="patients" style="color: var(--purple-primary); text-decoration: none; font-weight: 600; font-size: 1rem; transition: color 0.3s ease;">Patients</a></li>
                    <li><a href="payment Plans.html" class="nav-link" data-page="patients" style="color: var(--purple-primary); text-decoration: none; font-weight: 600; font-size: 1rem; transition: color 0.3s ease;">Payment Plans</a></li>
                    <li><a href="contact.html" class="nav-link" data-page="contact" style="color: var(--purple-primary); text-decoration: none; font-weight: 600; font-size: 1rem; transition: color 0.3s ease;">Contact</a></li>
                    <li style="margin-left: 5px;"><a href="contact.html" class="btn-nav" style="background: linear-gradient(135deg, var(--green-secondary), var(--green-primary)); color: var(--bg-white); padding: 10px 22px; border-radius: 25px; text-decoration: none; font-weight: 600; font-size: 0.95rem; display: inline-block; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(79, 148, 12, 0.15);">Book Appointment</a></li>
                </ul>

            </div>
        </header>

        <!-- Inject Adaptive Responsive Layout Break Rules -->
        <style>
            @media (max-width: 991px) {
                #mobileMenuBtn { display: inline-flex !important; } 
                #navMenu {
                    display: none !important;
                    flex-direction: column !important;
                    align-items: stretch !important;
                    position: absolute !important;
                    top: 100%;
                    right: 20px !important;
                    width: 280px !important;
                    background-color: var(--bg-white) !important;
                    padding: 25px !important;
                    border-radius: 16px !important;
                    border: 1px solid rgba(138, 52, 159, 0.08) !important;
                    box-shadow: 0 15px 40px rgba(62, 13, 95, 0.15) !important;
                    z-index: 999 !important;
                    gap: 16px !important;
                }
                #navMenu.show-mobile-dropdown { display: flex !important; }
                #navMenu li { width: 100% !important; text-align: left !important; }
                #navMenu .btn-nav { display: block !important; text-align: center !important; margin-top: 5px !important; }
                #mobileMenuBtn:hover { background-color: rgba(138, 52, 159, 0.05) !important; border-color: var(--purple-accent) !important; }
                
            }
        </style>
    `;

    initMobileMenu();
    highlightActiveLink();
}

/**
 * Toggles responsive right-hand floating dropdown menu display visibility rules
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        navMenu.classList.toggle('show-mobile-dropdown');
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && event.target !== menuToggle) {
            navMenu.classList.remove('show-mobile-dropdown');
        }
    });
}

/**
 * Automatically calculates and tags the active page item matching the URL path
 */
function highlightActiveLink() {
    const path = window.location.pathname;
    const page = path.split("/").pop().replace(".html", "") || "index";
    const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
    if (activeLink) {
        activeLink.style.color = "var(--purple-accent)";
    }
}
