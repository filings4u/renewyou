/**
 * ReNew You Health & Wellness - Centralized Multi-Page Dynamic Static Hero Controller
 * Location: assets/js/hero.js
 */
document.addEventListener('DOMContentLoaded', () => {
  renderDynamicHero();
});

/**
 * Detects the active page and renders an optimized static 50/50 side-by-side text/image layout
 */
function renderDynamicHero() {
  const target = document.getElementById('hero-target');
  if (!target) return;

  // Detect page name from path strings cleanly
  const path = window.location.pathname;
  let page = path.split("/").pop().replace(".html", "") || "index";

  // If on homepage, check URL parameters to render targeted variants statically
  const urlParams = new URLSearchParams(window.location.search);
  const viewParam = urlParams.get('view');

  // Supports index.html?view=iv, view=injections, view=dot, view=weight, view=wellness, view=acute
  if (page === 'index' && viewParam) {
    if (viewParam === 'iv') page = 'iv-therapy';
    if (viewParam === 'injections') page = 'wellness-injections';
    if (viewParam === 'dot') page = 'dot-physicals';
    if (viewParam === 'weight') page = 'weight-management';
    if (viewParam === 'wellness') page = 'wellness-services';
    if (viewParam === 'acute') page = 'acute-care';
  }


  // Complete Static Page State Mapping Dictionary
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
      subheadline: "ReNew You Health & Wellness is a nurse practitioner-led clinic focused on helping patients feel heard, supported, and confident in their care. Our goal is to provide accessible services that support your health, wellness, prevention, and lifestyle goals. Whether you need help with weight management, routine screenings, acute illness visits, physicals, testing, or wellness injections, our team is here to provide professional care in a welcoming environment.",
      image: "images/about-hero.png",
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
    "weight-management": {
      badge: "Lifestyle Architecture",
      headline: "Medical Weight Loss<br>Management",
      subheadline: "Personalized Support for a Healthier You. At ReNew You Health & Wellness, we understand that weight management is not one-size-fits-all. Our Medical Weight Loss Management Program provides personalized, provider-guided care designed to help eligible patients work toward realistic and sustainable weight-loss goals.",
      image: "images/weight-management.png",
      alt: "Medical Weight Loss Management Process Overview",
      showButtons: true,
      customCta: "weight"
    },
    "acute-care": {
      badge: "Immediate Clinical Relief",
      headline: "Same-Day Diagnostic<br>Evaluations & Care",
      subheadline: "Prompt evaluation and customized relief treatments for a broad array of common medical symptoms and unexpected illness flare-ups. Get compassionate, professional medical attention when you need it most.",
      image: "images/hero-acute.png",
      alt: "Compassionate same-day diagnostic evaluation and treatment center environment",
      showButtons: true,
      customCta: "acute"
    },
    "iv-therapy": {
      badge: "Revitalize Your Body",
      headline: "Premium IV Therapy & Hydration Infusions",
      subheadline: "Replenish fluids, boost metabolic tracking loops, and support cellular energy directly with customized vitamin drips managed by certified healthcare pros.",
      image: "images/hero-iv.png",
      alt: "Intravenous vitamin infusion process in our clean wellness center",
      showButtons: true,
      customCta: "iv"
    },
    "wellness": {
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
      image: "images/hero-insurance.png",
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

 // Dynamic Button Template Routing Module 
let buttonHtml = ''; 
const activeData = heroData[page] || heroData['index']; 

if (page === 'index') { 
    buttonHtml = ` 
        <div class="hero-buttons" style="display: flex; gap: 12px; flex-wrap: nowrap; margin-top: 25px; width: 100%;"> 
            <a href="contact.html" style="text-decoration: none; flex: 1;"><button style="width: 100%; padding: 14px 10px; font-size: 0.95rem; font-weight: 600; cursor: pointer;">Request An Appointment</button></a> 
            <a href="services.html" style="text-decoration: none; flex: 1;"><button style="background: transparent; color: var(--purple-accent); border: 2px solid var(--purple-accent); box-shadow: none; width: 100%; padding: 14px 10px; font-size: 0.95rem; font-weight: 600; cursor: pointer;">View Services</button></a> 
        </div> 
    `; 
} else if (activeData && activeData.showButtons) { 
    let targetCtaRoute = "dot-appointment.html"; 
    let targetCtaLabel = "Book Appointment"; 
    let isScrollAnchor = false; 

    // All medical page routes are unified to point directly to the bottom booking block anchor 
    if (activeData.customCta === 'weight') { 
        targetCtaRoute = "#consultation"; 
        targetCtaLabel = "Schedule Initial Visit"; 
        isScrollAnchor = true; 
    } else if (activeData.customCta === 'iv') { 
        targetCtaRoute = "#consultation"; 
        targetCtaLabel = "Book Your Drip Visit"; 
        isScrollAnchor = true; 
    } else if (activeData.customCta === 'injections') { 
        targetCtaRoute = "#consultation"; 
        targetCtaLabel = "Book Your Injection Visit"; 
        isScrollAnchor = true; 
    } else if (activeData.customCta === 'wellness') { 
        targetCtaRoute = "#consultation"; 
        targetCtaLabel = "Schedule Wellness Visit"; 
        isScrollAnchor = true; 
    } else if (activeData.customCta === 'acute') { 
        targetCtaRoute = "#consultation"; 
        targetCtaLabel = "Book Your Acute Visit"; 
        isScrollAnchor = true; 
    } else if (activeData.customCta === 'dot') { 
        targetCtaRoute = "#consultation"; 
        targetCtaLabel = "Book DOT Physical"; 
        isScrollAnchor = true; 
    } 

    buttonHtml = ` 
        <div class="hero-buttons" style="display: flex; gap: 12px; flex-wrap: nowrap; margin-top: 25px; width: 100%;"> 
            <a href="${targetCtaRoute}" 
               ${isScrollAnchor ? 'class="scroll-hero-btn" onclick="event.preventDefault(); window.scrollTo({top: document.body.scrollHeight, behavior: \'smooth\'});"' : ''} 
               style="text-decoration: none; flex: 1;"> 
                <button style="width: 100%; padding: 14px 10px; font-size: 0.95rem; font-weight: 600; cursor: pointer;">${targetCtaLabel}</button> 
            </a> 
            <a href="${targetCtaRoute}"
               ${isScrollAnchor ? 'class="scroll-hero-btn" onclick="event.preventDefault(); window.scrollTo({top: document.body.scrollHeight, behavior: \'smooth\'});"' : ''} 
               style="text-decoration: none; flex: 1;"> 

                <button style="background: transparent; color: var(--purple-accent); border: 2px solid var(--purple-accent); box-shadow: none; width: 100%; padding: 14px 10px; font-size: 0.95rem; font-weight: 600; cursor: pointer;">Book Online</button> 
            </a> 
        </div> 
    `; 
}

    // Inject the dynamically mapped elements into the frame container layout target
  target.innerHTML = `
    <style>
      .hero-split-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 40px;
        max-width: 1450px;
        margin: 0 auto;
        padding: 60px 20px;
      }
@media (max-width: 768px) {

  /* =========================================================
     MOBILE HERO LAYOUT
     Keep desktop sizing intact.
     Only change layout/centering for mobile.
     ========================================================= */

  .hero-split-container {
    flex-direction: column-reverse !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    max-width: 100% !important;
    padding: 35px 18px !important;
    gap: 30px !important;
    box-sizing: border-box !important;
  }


  /* =========================================================
     MOBILE IMAGE
     Keep the image LARGE.
     ========================================================= */

  .hero-image-block {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .hero-image-container {
    width: 100% !important;
    max-width: 550px !important;
    height: 320px !important;
  }


  /* =========================================================
     MOBILE TEXT
     Center everything.
     ========================================================= */

  .hero-text-block {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 700px !important;
    text-align: center !important;
    margin: 0 auto !important;
  }


  /* Header area containing badge + headline */

  .hero-text-block > div:first-child {
    width: 100% !important;
    max-width: 700px !important;
    margin: 0 auto 18px auto !important;
    text-align: center !important;
  }


  /* =========================================================
     MOBILE BADGE
     ========================================================= */

  #heroBadge {
    display: inline-block !important;
    margin: 0 auto 12px auto !important;
    font-size: 0.78rem !important;
    line-height: 1.35 !important;
    letter-spacing: 1.3px !important;
    text-align: center !important;
  }


  /* =========================================================
     MOBILE HEADLINE
     
     Still large enough to look like a real hero headline.
     ========================================================= */

  #heroHeadline {
    width: 100% !important;
    max-width: 700px !important;
    margin: 0 auto !important;
    font-size: 1.8rem !important;
    line-height: 1.2 !important;
    font-weight: 800 !important;
    text-align: center !important;
  }


  /* =========================================================
     MOBILE SUBHEADLINE
     ========================================================= */

  #heroSubheadline {
    width: 100% !important;
    max-width: 650px !important;
    margin: 0 auto 25px auto !important;
    font-size: 1rem !important;
    line-height: 1.55 !important;
    text-align: center !important;
  }


  /* =========================================================
     MOBILE BUTTONS
     Keep the two buttons side-by-side.
     ========================================================= */

  #heroButtonTarget {
    width: 100% !important;
    max-width: 650px !important;
    margin: 0 auto !important;
    text-align: center !important;
  }

  .hero-buttons {
    width: 100% !important;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    justify-content: center !important;
    align-items: stretch !important;
    gap: 10px !important;
    margin: 20px auto 0 auto !important;
  }

  .hero-buttons a {
    flex: 1 1 0 !important;
    min-width: 0 !important;
  }

  .hero-buttons button {
    width: 100% !important;
    padding: 13px 8px !important;
    font-size: 0.82rem !important;
    line-height: 1.25 !important;
  }
}


/* =========================================================
   SMALL PHONES
   ========================================================= */

@media (max-width: 480px) {

  .hero-split-container {
    padding: 28px 14px !important;
    gap: 25px !important;
  }


  /* Keep image substantial on phones */

  .hero-image-container {
    width: 100% !important;
    max-width: 550px !important;
    height: 280px !important;
  }


  /* Badge */

  #heroBadge {
    font-size: 0.7rem !important;
    letter-spacing: 1px !important;
    margin-bottom: 10px !important;
  }


  /* Headline */

  #heroHeadline {
    font-size: 1.65rem !important;
    line-height: 1.2 !important;
  }


  /* Paragraph */

  #heroSubheadline {
    font-size: 0.95rem !important;
    line-height: 1.5 !important;
    margin-bottom: 22px !important;
  }


  /* Buttons */

  .hero-buttons {
    gap: 8px !important;
    margin-top: 18px !important;
  }

  .hero-buttons button {
    padding: 12px 7px !important;
    font-size: 0.76rem !important;
  }
}


/* =========================================================
   VERY SMALL PHONES
   ========================================================= */

@media (max-width: 360px) {

  .hero-split-container {
    padding: 25px 12px !important;
    gap: 22px !important;
  }


  .hero-image-container {
    height: 250px !important;
  }


  #heroBadge {
    font-size: 0.64rem !important;
    letter-spacing: 0.8px !important;
  }


  #heroHeadline {
    font-size: 1.5rem !important;
    line-height: 1.2 !important;
  }


  #heroSubheadline {
    font-size: 0.9rem !important;
    line-height: 1.48 !important;
  }


  .hero-buttons {
    gap: 7px !important;
  }


  .hero-buttons button {
    padding: 11px 5px !important;
    font-size: 0.7rem !important;
  }
}

    </style>
    
    <div class="hero-split-container" id="heroInnerFrame">
      <div class="hero-text-block" style="flex: 1; min-width: 320px; text-align: left;">
        <div style="margin-bottom: 30px; text-align: left; max-width: 800px;">
          <span id="heroBadge" style="color: var(--green-secondary); font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; margin-bottom: 15px; border-bottom: 2px solid var(--green-light); padding-bottom: 4px;">
            ${activeData.badge}
          </span>
          <h1 id="heroHeadline" style="font-size: 2.3rem; color: var(--purple-primary); line-height: 1.15; font-weight: 800; margin: 0;">
            ${activeData.headline}
          </h1>
        </div>
        <p id="heroSubheadline" style="font-size: 1.15rem; color: #555; line-height: 1.6; margin: 0 0 30px 0; max-width: 100%;">
          ${activeData.subheadline}
        </p>
        <div id="heroButtonTarget" style="width:100%; display:block;">
          ${buttonHtml}
        </div>
      </div>
      <div class="hero-image-block" style="flex: 1; min-width: 320px; display: flex; justify-content: center; align-items: center;">
        <div class="hero-image-container" style="width: 100%; max-width: 550px; height: 440px; border-radius: 20px; overflow: hidden; box-shadow: 0 12px 35px rgba(62,13,95,0.08); border: 1px solid rgba(138,52,159,0.1);">
          <img id="heroImage" src="${activeData.image}" alt="${activeData.alt}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
        </div>
      </div>
    </div>
  `;

  // Interactive smooth scroll logic for anchor links
  setTimeout(() => {
    document.querySelectorAll('.scroll-hero-btn').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.getElementById(targetId.replace('#', ''));
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }, 100);


  // INTERACTIVE SMOOTH SCROLL SCRIPT LOGIC
  setTimeout(() => {
    document.querySelectorAll('.scroll-hero-btn').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.getElementById(targetId.replace('#', ''));
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }, 100);
}
