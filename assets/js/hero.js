/**
 * ReNew You Health & Wellness - Centralized Multi-Page Dynamic Hero & Slideshow Controller
 * Location: assets/js/hero.js
 */
document.addEventListener('DOMContentLoaded', () => {
    renderDynamicHero();
});

/**
 * Detects the active page and renders an optimized side-by-side or rotating slider layout
 */
function renderDynamicHero() {
    const target = document.getElementById('hero-target');
    if (!target) return;

    // Detect page name from path
    const path = window.location.pathname;
    const page = path.split("/").pop().replace(".html", "") || "index";

    // Complete Page State Mapping Dictionary
    const heroData = {
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
        "iv-therapy": {
            badge: "Revitalize Your Body",
            headline: "Premium IV Therapy & Hydration Infusions",
            subheadline: "Replenish fluids, boost metabolic tracking loops, and support cellular energy directly with customized vitamin drips managed by certified healthcare pros.",
            image: "images/hero-iv.jpg",
            alt: "Intravenous vitamin infusion process in our clean wellness center",
            showButtons: true,
            customCta: "iv"
        },
        "wellness-injections": {
            badge: "Convenient Health Support",
            headline: "Targeted Vitamin & Nutrient Injections",
            subheadline: "Optimize your system with fast, effective injections including Vitamin B12, Lipo B+, and cell-rejuvenating NAD+ tailored to your lifestyle parameters.",
            image: "images/hero-injections.jpg",
            alt: "Patient receiving a wellness vitamin injection screening",
            showButtons: true,
            customCta: "injections"
        },
        "dot-physicals": {
            badge: "FMCSA Certified Medical Examiner",
            headline: "Fast, Certified DOT Physical Examinations",
            subheadline: "Keep your commercial driver's license clear and active. Walk-in and owner-operator physicals completed quickly to secure your audit-ready medical card.",
            image: "images/hero-physicals.jpg",
            alt: "Certified DOT health assessment exam check-in",
            showButtons: true,
            customCta: "dot"
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

    // Homepage Multi-Slide Array Matrices Definition
    const indexSlides = [
        {
            badge: "Welcome to ReNew You Health & Wellness",
            headline: "A New Standard For Local, <br><span style='color: var(--purple-accent);'>Patient-Centered</span> Clinical Care",
            subheadline: "A patient-centered health and wellness clinic providing compassionate care, personalized wellness support, and convenient medical services for individuals and families.",
            image: "images/hero-home.jpg",
            alt: "Angela Y. Martin, APRN, FNP-C providing compassionate care to a patient"
        },
        {
            badge: "Injections & IV Hydration Menu",
            headline: "Replenish From Within with <br><span style='color: var(--purple-accent);'>Premium IV Therapy</span> Drips",
            subheadline: "Restore your cellular hydration baseline safely. Explore our curated portfolio of B Lean, Quench, and specialized performance wellness formulations.",
            image: "images/hero-iv.jpg",
            alt: "IV therapy drip process lines in clinic environment"
        },
        {
            badge: "FMCSA Compliance Headquarters",
            headline: "Certified DOT Physicals & <br><span style='color: var(--purple-accent);'>Occupational Testing</span> Registry",
            subheadline: "Keep your commercial driver records audit-ready. Walk-ins, owner-operators, and corporate logistics fleet pools processed immediately.",
            image: "images/hero-physicals.jpg",
            alt: "Certified commercial vehicle operator health verification exam"
        }
    ];
    // Dynamic Button Template Routing Module
    let buttonHtml = '';
    const activeData = heroData[page];

    if (page === 'index' || !activeData) {
        buttonHtml = `
            <div class="hero-buttons" style="display: flex; gap: 12px; flex-wrap: nowrap; margin-top: 25px; width: 100%;">
                <a href="contact.html" style="text-decoration: none; flex: 1;"><button style="width: 100%; padding: 14px 10px; font-size: 0.95rem; font-weight: 600; cursor: pointer;">Request An Appointment</button></a>
                <a href="services.html" style="text-decoration: none; flex: 1;"><button style="background: transparent; color: var(--purple-accent); border: 2px solid var(--purple-accent); box-shadow: none; width: 100%; padding: 14px 10px; font-size: 0.95rem; font-weight: 600; cursor: pointer;">View Services</button></a>
            </div>
        `;
    } else if (activeData && activeData.showButtons) {
        // FIXED: Change targets to section ID hashes for seamless internal scroll routing
        let targetCtaRoute = "dot-appointment.html";
        let targetCtaLabel = "Book Appointment";
        let isScrollAnchor = false;

        if (activeData.customCta === 'iv') { targetCtaRoute = "#iv-menu-target"; targetCtaLabel = "View Drip Menu"; isScrollAnchor = true; }
        if (activeData.customCta === 'injections') { targetCtaRoute = "#wellness-menu-target"; targetCtaLabel = "View Vitamin Menu"; isScrollAnchor = true; }

        buttonHtml = `
            <div class="hero-buttons" style="display: flex; gap: 12px; flex-wrap: nowrap; margin-top: 25px; width: 100%;">
                <a href="${targetCtaRoute}" ${isScrollAnchor ? 'class="scroll-hero-btn"' : ''} style="text-decoration: none; flex: 1;"><button style="width: 100%; padding: 14px 10px; font-size: 0.95rem; font-weight: 600; cursor: pointer;">${targetCtaLabel}</button></a>
                <a href="contact.html" style="text-decoration: none; flex: 1;"><button style="background: transparent; color: var(--purple-accent); border: 2px solid var(--purple-accent); box-shadow: none; width: 100%; padding: 14px 10px; font-size: 0.95rem; font-weight: 600; cursor: pointer;">Contact Clinic</button></a>
            </div>
        `;
    }

    const initialData = activeData || indexSlides[0];

    target.innerHTML = `
        <style>
            .hero-split-container { display: flex; flex-wrap: wrap; align-items: center; gap: 40px; max-width: 1450px; margin: 0 auto; padding: 60px 20px; transition: opacity 0.5s ease-in-out; }
            @media (max-width: 768px) {
                .hero-split-container { flex-direction: column-reverse !important; padding: 30px 20px !important; gap: 30px !important; }
                .hero-image-block { width: 100% !important; min-width: 100% !important; }
                .hero-image-container { width: 100% !important; max-width: 100% !important; height: 320px !important; }
                .hero-text-block { text-align: center !important; }
                .hero-text-block div { text-align: center !important; margin-bottom: 15px !important; }
                .hero-text-block h1 { font-size: 1.8rem !important; line-height: 1.2 !important; }
                .hero-text-block p { font-size: 1.05rem !important; line-height: 1.55 !important; margin-bottom: 0 !important; }
                .hero-buttons { flex-wrap: nowrap !important; }
            }
        </style>
        <div class="hero-split-container" id="heroInnerFrame">
            <div class="hero-text-block" style="flex: 1; min-width: 320px; text-align: left;">
                <div style="margin-bottom: 30px; text-align: left; max-width: 800px;">
                    <span id="heroBadge" style="color: var(--green-secondary); font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; margin-bottom: 15px; border-bottom: 2px solid var(--green-light); padding-bottom: 4px;">
                        ${initialData.badge}
                    </span>
                    <h1 id="heroHeadline" style="font-size: 2.3rem; color: var(--purple-primary); line-height: 1.15; font-weight: 800; margin: 0;">
                        ${initialData.headline}
                    </h1>
                </div>
                <p id="heroSubheadline" style="font-size: 1.15rem; color: #555; line-height: 1.6; margin: 0 0 30px 0; max-width: 100%;">
                    ${initialData.subheadline}
                </p>
                <div id="heroButtonTarget" style="width:100%; display:block;">
                    ${buttonHtml}
                </div>
            </div>
            <div class="hero-image-block" style="flex: 1; min-width: 320px; display: flex; justify-content: center; align-items: center;">
                <div class="hero-image-container" style="width: 100%; max-width: 550px; height: 440px; border-radius: 20px; overflow: hidden; box-shadow: 0 12px 35px rgba(62,13,95,0.08); border: 1px solid rgba(138,52,159,0.1);">
                    <img id="heroImage" src="${initialData.image}" alt="${initialData.alt}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                </div>
            </div>
        </div>
    `;

    // INTERACTIVE SMOOTH SCROLL SCRIPT LOGIC
    document.querySelectorAll('.scroll-hero-btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    if (page === 'index' || page === '') {
        let currentSlideIndex = 0;
        const frame = document.getElementById('heroInnerFrame');
        const badge = document.getElementById('heroBadge');
        const headline = document.getElementById('heroHeadline');
        const subheadline = document.getElementById('heroSubheadline');
        const image = document.getElementById('heroImage');

        setInterval(() => {
            if (!frame || !badge || !headline || !subheadline || !image) return;
            frame.style.opacity = '0';
            setTimeout(() => {
                currentSlideIndex = (currentSlideIndex + 1) % indexSlides.length;
                const slide = indexSlides[currentSlideIndex];
                badge.innerText = slide.badge;
                headline.innerHTML = slide.headline;
                subheadline.innerText = slide.subheadline;
                image.src = slide.image;
                image.alt = slide.alt;
                frame.style.opacity = '1';
            }, 500);
        }, 6000);
    }
}
