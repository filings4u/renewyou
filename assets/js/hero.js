/**
 * ReNew You Health & Wellness - Dynamic Hero Controller
 * Location: assets/js/hero.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderDynamicHero();
});

/**
 * Detects the active page and renders a 50/50 side-by-side text/image layout
 */
function renderDynamicHero() {
    const target = document.getElementById('hero-target');
    if (!target) return;

    // Detect page name from path
    const path = window.location.pathname;
    const page = path.split("/").pop().replace(".html", "") || "index";

    // Configuration object pairing specific copy and visuals for every single page
    const heroData = {
                index: {
            badge: "Welcome to ReNew You Health & Wellness",
            headline: "A New Standard For Local, <br><span style='color: var(--purple-accent);'>Patient-Centered</span> Clinical Care",
            subheadline: "A patient-centered health and wellness clinic providing compassionate care, personalized wellness support, and convenient medical services for individuals and families.",
            image: "images/hero-home.jpg",
            alt: "Angela Y. Martin, APRN, FNP-C providing compassionate care to a patient",
            showButtons: true
        },

        about: {
            badge: "Get To Know Us",
            headline: "Quality care with a personal touch.",
            subheadline: "ReNew You Health & Wellness is a nurse practitioner-led clinic focused on helping patients feel heard, supported, and confident in their care.",
            image: "images/hero-about.jpg",
            alt: "Our welcoming clinical environment",
            showButtons: false
        },
        services: {
            badge: "Clinical & Lifestyle Offerings",
            headline: "Care designed around your needs.",
            subheadline: "Explore our comprehensive health management packages. We mix patient-first values with convenient scheduling options.",
            image: "images/hero-services.jpg",
            alt: "Wellness care diagnostics equipment",
            showButtons: false
        },
        insurance: {
            badge: "Coverage & Billing",
            headline: "Insurance Networks We Accept",
            subheadline: "We are committed to making exceptional healthcare affordable and highly accessible by working directly with major insurance providers.",
            image: "images/hero-insurance.jpg",
            alt: "Health coverage documents and cards",
            showButtons: false
        },
        patients: {
            badge: "Patient Checklist",
            headline: "Before Your Visit",
            subheadline: "We want to make your clinical check-in smooth and worry-free. Please check the preparation list below before visiting our team.",
            image: "images/hero-patients.jpg",
            alt: "Patient intake forms on a clipboard",
            showButtons: false
        },
        contact: {
            badge: "Get In Touch",
            headline: "Reach out to ReNew You Health & Wellness.",
            subheadline: "Have questions or want to secure your session? Send us an inquiry below, visit our clinic location, or pick up the phone.",
            image: "images/hero-contact.jpg",
            alt: "Clinic consultation desk area",
            showButtons: false
        }
    };

    // Grab the dataset for the current page, fallback to index if missing
    const data = heroData[page] || heroData['index'];

    // Conditional button markup string
    const buttonHtml = data.showButtons ? `
        <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 30px;">
            <a href="contact.html" style="text-decoration: none;"><button>Request an Appointment</button></a>
            <a href="services.html" style="text-decoration: none;"><button style="background: transparent; color: var(--purple-accent); border: 2px solid var(--purple-accent); box-shadow: none;">View Services</button></a>
        </div>
    ` : '';

       // Inject side-by-side flex grid layout strings into the target DOM element
    target.innerHTML = `
        <div class="hero-split-container" style="display: flex; flex-wrap: wrap; align-items: center; gap: 40px; max-width: 1450px; margin: 0 auto; padding: 60px 20px;">
            
            <!-- Left Side: Typography Content Area -->
            <div class="hero-text-block" style="flex: 1; min-width: 320px; text-align: left;">
                <div style="margin-bottom: 30px; text-align: left; max-width: 800px;">
                    <span style="color: var(--green-secondary); font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; margin-bottom: 15px; border-bottom: 2px solid var(--green-light); padding-bottom: 4px;">
                        ${data.badge}
                    </span>
                    <h1 style="font-size: 2.3rem; color: var(--purple-primary); line-height: 1.15; font-weight: 800; margin: 0;">
                        ${data.headline}
                    </h1>
                </div>
                <p style="font-size: 1.15rem; color: #555; line-height: 1.6; margin: 0 0 30px 0; max-width: 100%;">
                    ${data.subheadline}
                </p>
                ${buttonHtml}
            </div>

            <!-- Right Side: Frame Visual Area -->
            <div class="hero-image-block" style="flex: 1; min-width: 320px; display: flex; justify-content: center; align-items: center;">
                <div style="width: 100%; max-width: 550px; height: 440px; border-radius: 20px; overflow: hidden; box-shadow: 0 12px 35px rgba(62,13,95,0.08); border: 1px solid rgba(138,52,159,0.1);">
                    <img src="${data.image}" alt="${data.alt}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                </div>
            </div>

        </div>
    `;


}
