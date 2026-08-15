/**
 * ReNew You Health & Wellness - Wellness Injections Content Sections
 * Location: assets/js/wellness-injections-section.js
 */
function renderWellnessInjectionsContent() {
  const contentTarget = document.getElementById('wellness-injections-content-target');
  if (!contentTarget) return;

  contentTarget.innerHTML = `
    <style>
      /* ==========================================================================
         BLOCK A: LAYOUT DECK & CORE ARCHITECTURE
         ========================================================================== */
      .wi-section-layout {
        max-width: 1450px;
        margin: 0 auto;
        text-align: left;
        padding: 40px 20px;
        box-sizing: border-box;
      }
      .wi-section-heading {
        color: var(--purple-primary, #3E0D5F);
        font-size: 28px;
        font-weight: 800;
        margin: 40px 0 20px 0;
        border-bottom: 2px solid var(--border, #dfe5ec);
        padding-bottom: 10px;
        letter-spacing: -0.5px;
        text-align: left;
      }
      .wi-feature-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
        margin-bottom: 40px;
      }
      .wi-feature-card {
        background: var(--white, #fff);
        border: 1px solid rgba(138, 52, 159, 0.08);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 35px rgba(62,13,95,0.02);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
      }
      .wi-feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 35px rgba(62,13,95,0.06);
        border-color: rgba(138, 52, 159, 0.15);
      }
      .wi-feature-card h3 {
        margin: 0 0 12px 0;
        color: var(--purple-primary, #3E0D5F);
        font-size: 18px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .wi-feature-card h3::before {
        content: "✓";
        color: var(--green-secondary, #2bb673);
        font-weight: 800;
      }
      .wi-feature-card p {
        margin: 0;
        font-size: 14.5px;
        line-height: 1.6;
        color: #555555;
      }
      /* ==========================================================================
         BLOCK B: CALLOUT BOXES & SCHEDULING INTERACTION STYLES
         ========================================================================== */
      .wi-callout-box {
        background: rgba(138, 52, 159, 0.03);
        border-left: 4px solid var(--purple-primary, #3E0D5F);
        padding: 30px;
        border-radius: 0 16px 16px 0;
        margin: 30px 0;
        box-shadow: 0 4px 15px rgba(62,13,95,0.01);
        text-align: left;
      }
      .wi-callout-box h3 {
        margin: 0 0 10px 0;
        color: var(--purple-primary, #3E0D5F);
        font-weight: 700;
        font-size: 18px;
      }
      .wi-callout-box p {
        margin: 0;
        font-size: 15.5px;
        line-height: 1.65;
        color: #4A4A4A;
      }
      .wi-action-footer-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        background: var(--purple-accent, #8A349B);
        color: var(--white, #fff);
        font-size: 14px;
        font-weight: 700;
        padding: 14px 32px;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(138, 52, 159, 0.15);
        transition: background 0.2s ease, transform 0.2s ease;
      }
      .wi-action-footer-btn:hover {
        background: var(--purple-primary, #3E0D5F);
        transform: translateY(-2px);
      }
      @media(max-width: 992px) {
        .wi-feature-grid { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @media(max-width: 768px) {
        .wi-feature-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        .wi-section-heading { font-size: 22px !important; }
      }
    </style>
    <!-- ==========================================================================
         BLOCK C: FORCE-CENTERED HIGH-IMPACT INTRO STATEMENT
         ========================================================================== -->
    <div class="wi-section-layout">
      
<div class="wi-unified-center-wrapper" style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center !important; margin: 20px auto 60px auto;">
  <div class="wi-centered-lead-statement" style="max-width: 950px; width: 100%; padding: 0 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center !important;">
    <span style="display: block; width: 40px; height: 3px; background: var(--purple-accent, #8A349B); margin: 0 auto 25px auto; border-radius: 2px;"></span>
    <p style="font-size: 21px; line-height: 1.6; color: #4A4A4A); font-weight: 300; font-style: italic; margin: 0 0 15px 0; letter-spacing: -0.3px; text-align: center !important; width: 100%;">
      "At ReNew You Health & Wellness, our Wellness Injections are designed to provide selected vitamins, nutrients, and wellness-supportive compounds through quick and convenient care."
    </p>
  </div>
</div>

    <!-- ==========================================================================
         BLOCK D: MENU OFFERINGS WITH SPECIFIED GREEN LEFT-ACCENT TOOLTIPS
         ========================================================================== -->
      <h2 class="wi-section-heading" id="wellness-menu-target">Our Current Wellness Injection Options</h2>
      
      <div class="wi-feature-grid">
        <!-- Injection Option 1 -->
        <div class="wi-feature-card" style="border-top: 4px solid var(--purple-accent);">
          <h3 style="color: var(--purple-primary);">Vitamin B12 Injection</h3>
          <p>An essential vitamin that plays an important role in many normal body functions. Helps support normal energy metabolism pathways, red blood cell formation, robust nervous system operations, DNA synthesis, and overall nutrition wellness baselines.</p>
        </div>
        <!-- Injection Option 2 -->
        <div class="wi-feature-card" style="border-top: 4px solid var(--purple-accent);">
          <h3 style="color: var(--purple-primary);">Lipo Injection</h3>
          <p>Contains lipotropic nutrients commonly incorporated into targeted wellness and weight management structures. Lipotropic compounds aid metabolic tracking processes and function optimally alongside balanced nutrition, hydration, and active habits.</p>
        </div>
        <!-- Injection Option 3 -->
        <div class="wi-feature-card" style="border-top: 4px solid var(--purple-accent);">
          <h3 style="color: var(--purple-primary);">Lipo B+ Injection</h3>
          <p style="font-weight:700; color:var(--purple-accent); margin-bottom:8px;">Lipotropic Support With Added B Vitamins</p>
          <p>Combines lipotropic nutrients with extra B-vitamin compounds. Ideal for patients seeking coordinated support with energy metabolism metrics and cell replenishment lifestyle efforts.</p>
        </div>
        <!-- Injection Option 4 -->
        <div class="wi-feature-card" style="border-top: 4px solid var(--purple-accent);">
          <h3 style="color: var(--purple-primary);">NAD+ Injection</h3>
          <p style="font-weight:700; color:var(--purple-accent); margin-bottom:8px;">Cellular Wellness Support</p>
          <p>A naturally occurring coenzyme found throughout the body that plays a crucial role in cellular energy production loops. Offered as an individualized choice to safeguard general wellness parameters and healthy lifestyle longevity goals.</p>
        </div>
      </div>

      <div class="wi-callout-box" style="background: var(--pale); border-left-color: #2bb673;">
        <h3>More Wellness Injections Are Being Added</h3>
        <p>Our Wellness Injection menu is continuing to grow. We regularly evaluate and add new option formulations so our patients have access to an expanding range of medical tracking options. Check back often or contact our office to learn about the current availability.</p>
      </div>
    <!-- ==========================================================================
         BLOCK E: VISIT GUIDELINES & SPECIFIED LEFT TOOLTIP REPLICATIONS
         ========================================================================== -->
      <h2 class="wi-section-heading">What to Expect During Your Visit</h2>
      <div class="wi-feature-grid" style="grid-template-columns: repeat(4, 1fr);">
        <div class="wi-feature-card" style="padding:20px;"><h3>1. Health Review</h3><p>Our medical team reviews your history, medication lines, allergies, and active symptoms.</p></div>
        <div class="wi-feature-card" style="padding:20px;"><h3>2. Alignment</h3><p>Your healthcare provider confirms the accurate dosage matching your personal parameters.</p></div>
        <div class="wi-feature-card" style="padding:20px;"><h3>3. Injection</h3><p>The solution is administered quickly and professionally by a licensed clinician.</p></div>
        <div class="wi-feature-card" style="padding:20px;"><h3>4. Follow-Up</h3><p>Periodic monitoring schedules or laboratory tracking sequences are determined if applicable.</p></div>
      </div>

        <h2 class="wi-section-heading">Frequently Asked Questions</h2>
      <div class="wi-callout-box">
        <h3>How Often Can I Receive Wellness Injections?</h3>
        <p>Frequency varies depending on the type of injection, your health status, your provider’s recommendations, and your individual wellness goals. There is no single schedule that is appropriate for everyone. Your healthcare provider will recommend a schedule based on your needs and medical eligibility.</p>
      </div>

      <div class="wi-callout-box" style="background: rgba(43, 182, 115, 0.02); border-left: 4px solid var(--green-secondary); padding: 30px; border-radius: 0 16px 16px 0; margin: 30px 0; box-shadow: 0 4px 15px rgba(62,13,95,0.01); text-align: left; width: 100%; box-sizing: border-box;">
        <h3>Are Wellness Injections Right for Everyone?</h3>
        <p>No. Certain health conditions, active medications, allergy histories, pregnancy tracking metrics, or lab findings directly affect clinical appropriateness parameters. Universal safety screenings are managed for all incoming patients prior to dosing.</p>
      </div>

      <!-- Left-Aligned Green Tooltip Box Replications matching requested criteria -->
      <div class="wi-callout-box">
        <h3>Wellness Injections & Weight Management</h2>
        <p style="font-size: 15.5px; line-height: 1.6; margin: 0; color: #4A4A4A; text-align: left;">Certain wellness injections may be offered alongside our Medical Weight Loss Management Program as supportive services when medically appropriate. Wellness injections are separate from prescription weight-loss medications and should not be considered a substitute for provider-guided medical weight management, healthy nutrition, or physical activity.</p>
      </div>

      <div class="wi-callout-box" style="background: rgba(43, 182, 115, 0.02); border-left: 4px solid var(--green-secondary); padding: 30px; border-radius: 0 16px 16px 0; margin: 30px 0; box-shadow: 0 4px 15px rgba(62,13,95,0.01); text-align: left; width: 100%; box-sizing: border-box;">
        <h3>A Personalized Approach to Wellness</h2>
        <p style="font-size: 15.5px; line-height: 1.6; margin: 0; color: #4A4A4A; text-align: left;">At ReNew You Health & Wellness, we do not believe in a one-size-fits-all approach. Our goal is to help you understand your options and develop a wellness plan based on your individual health history, needs, and goals. Whether you are interested in nutrient support, energy support, weight-management wellness services, or simply adding another component to your wellness routine, our team is here to guide you.</p>
      </div>
      
<!-- ==========================================================================
     BLOCK G: FINAL CONVERSION BOOKING HERO PANEL (ROUNDED AVATAR IMAGE RIGHT)
     ========================================================================== -->
<div id="consultation" style="max-width: 1450px; margin: 80px auto 0 auto; background: var(--white); border-radius: 24px; border: 1px solid rgba(138, 52, 159, 0.08); box-shadow: 0 15px 45px rgba(62,13,95,0.03); overflow: hidden; box-sizing: border-box; width: 100%;">
  <style>
    .iv-book-hero-grid {
      display: grid;
      grid-template-columns: 1.3fr 0.7fr;
      align-items: center;
      width: 100%;
    }
    .iv-book-hero-content {
      padding: 60px 60px 60px 50px;
      text-align: left;
    }
    .iv-book-hero-media {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;
      box-sizing: border-box;
      line-height: 0;
      background-color: #F9F9F8;
    }
    .iv-book-hero-media img {
      width: 100%;
      max-width: 320px; /* Proportional dimension scaling */
      height: auto;
      aspect-ratio: 0; /* FIXED: Set to cover to naturally zoom the subject back in and fill the frame */
      object-fit: cover; /* FIXED: Preserves your requested 10% structural corner rounding */
      border-radius: 10%;
      border: 4px solid var(--white); /* White border framing line crisp contrast */
      box-shadow: 0 8px 25px rgba(62,13,95,0.06);
      display: block;
    }
     @media (max-width: 992px) {
      .iv-book-hero-grid {
        grid-template-columns: 1fr !important;
        display: flex !important;
        flex-direction: column-reverse !important; /* Flips order to force image block to the top */
      }
      .iv-book-hero-content {
        padding: 35px 25px !important;
        text-align: center !important;
        width: 100% !important;
        box-sizing: border-box;
      }
      /* FIXED: Downsizes massive title heading sizes cleanly on smaller viewports */
      .iv-book-hero-content h3 {
        font-size: 24px !important; 
        margin-bottom: 12px !important;
      }
      /* FIXED: Optimizes body copy scaling for smooth screen fitting boundaries */
      .iv-book-hero-content p {
        font-size: 14.5px !important;
        margin-bottom: 24px !important;
      }
      .iv-book-hero-media {
        padding: 35px 25px 10px 25px !important; /* Adjusted layout spacing for mobile stack balance */
        width: 100% !important;
        box-sizing: border-box;
      }
      .iv-book-hero-media img {
        max-width: 220px !important; /* Marginally shrunk down to perfectly balance smaller text size elements */
        margin: 0 auto;
      }
    }

  </style>

  <div class="iv-book-hero-grid">
    <!-- Left Side: Content Architecture -->
    <div class="iv-book-hero-content">
      <span style="color: var(--green-secondary, #2bb673); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 12px;">
        Secure Your Session
      </span>
      <h3 style="color: var(--purple-primary); font-size: 36px; margin: 0 0 16px 0; font-weight: 800; line-height: 1.2; letter-spacing: -0.5px;">
        Schedule Your Wellness Injection
      </h3>
      <p style="max-width: 650px; font-size: 16px; color: var(--muted); line-height: 1.65; margin: 0 0 32px 0; font-weight: 400;">
        Ready to add vitamin and advanced nutrient optimization formulas to your calendar? Secure your session with our care team today. Walk-ins are parsed fluidly based on active provider availability blocks.
      </p>
      <button class="iv-action-footer-btn" onclick="window.location.href='contact.html'">
        Book Your Injection Visit
      </button>
    </div>

    <!-- Right Side: Fully Rounded Avatar Asset Panel -->
    <div class="iv-book-hero-media">
      <img src="images/martin, a.png" alt="Schedule an initial visit with Angela Martin at ReNew You Health & Wellness">
    </div>
  </div>
</div>

  `;
}
