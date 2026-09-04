/**
 * ReNew You Health & Wellness - IV Therapy Content Sections
 * Location: assets/js/iv-therapy-section.js
 */
function renderIvTherapyContent() {
  const contentTarget = document.getElementById('iv-therapy-content-target');
  if (!contentTarget) return;

  contentTarget.innerHTML = `
    <style>
      /* ==========================================================================
         BLOCK A: LAYOUT DECK & CORE ARCHITECTURE
         ========================================================================== */
      .iv-section-layout {
        max-width: 1450px;
        margin: 0 auto;
        text-align: left;
        padding: 40px 20px;
        box-sizing: border-box;
      }
      .iv-section-heading {
        color: var(--purple-primary, #3E0D5F);
        font-size: 28px;
        font-weight: 800;
        margin: 40px 0 20px 0;
        border-bottom: 2px solid var(--border, #dfe5ec);
        padding-bottom: 10px;
        letter-spacing: -0.5px;
        text-align: left;
      }
      .iv-feature-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
        margin-bottom: 40px;
      }
      /* ==========================================================================
         BLOCK B: MODULAR IV CARD INTERACTION STYLES
         ========================================================================== */
      .iv-feature-card {
        background: var(--white, #fff);
        border: 1px solid rgba(138, 52, 159, 0.08);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 35px rgba(62,13,95,0.02);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
      }
      .iv-feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 35px rgba(62,13,95,0.06);
        border-color: rgba(138, 52, 159, 0.15);
      }
      .iv-feature-card h3 {
        margin: 0 0 12px 0;
        color: var(--purple-primary, #3E0D5F);
        font-size: 18px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .iv-feature-card h3::before {
        content: "✓";
        color: var(--green-secondary, #2bb673);
        font-weight: 800;
      }
      .iv-feature-card p {
        margin: 0;
        font-size: 14.5px;
        line-height: 1.6;
        color: #555555;
      }
      /* ==========================================================================
         BLOCK C: CUSTOM LIST LAYOUTS & REFINED TOOLTIP ACCENTS
         ========================================================================== */
      .iv-list-group {
        list-style: none;
        padding: 0;
        margin: 20px 0 40px 0;
      }
      .iv-list-item {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 14px;
        align-items: start;
        padding: 12px 0;
        border-bottom: 1px solid var(--border, #dfe5ec);
        font-size: 15px;
        color: #333333;
        font-weight: 550;
      }
      .iv-bullet-marker {
        color: var(--purple-accent, #8A349B);
        font-weight: 800;
      }
      
      /* Dynamic Unified Callout Tooltip Format styling */
      .iv-callout-box {
        background: rgba(138, 52, 159, 0.03); /* Soft brand purple backdrop tint */
        border-left: 4px solid var(--purple-primary, #2bb673);
        padding: 30px;
        border-radius: 0 16px 16px 0;
        margin: 30px 0;
        box-shadow: 0 4px 15px rgba(62,13,95,0.01);
        text-align: left;
      }
      .iv-callout-box h3 {
        margin: 0 0 10px 0;
        color: #2bb673);
        font-weight: 700;
        font-size: 18px;
      }
      .iv-callout-box p {
        margin: 0;
        font-size: 15.5px;
        line-height: 1.65;
        color: #4A4A4A;
      }
      /* ==========================================================================
         BLOCK D: COMPACT SCHEDULING ACTION FOOTER PANEL
         ========================================================================== */
      .iv-action-footer-btn {
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
      .iv-action-footer-btn:hover {
        background: var(--purple-primary, #3E0D5F);
        transform: translateY(-2px);
      }
      @media(max-width: 992px) {
        .iv-feature-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
      @media(max-width: 768px) {
        .iv-feature-grid {
          grid-template-columns: 1fr !important;
          gap: 20px !important;
        }
        .iv-section-heading {
          font-size: 22px !important;
        }
      }
    </style>
        <!-- ==========================================================================
         BLOCK E: MAIN STRUCTURAL ENTRY MARKUP WITH CENTERED LEAD STATEMENT
         ========================================================================== -->
    <div class="iv-section-layout">
      
  <!-- Transformed Intro: Centered High-Impact Lead Statement -->
<div class="iv-centered-lead-statement" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; max-width: 950px; margin: 20px auto 60px auto; padding: 0 20px; width: 100%; box-sizing: border-box;">
  <span style="display: block; width: 40px; height: 3px; background: var(--purple-accent, #8A349B); margin: 0 auto 25px auto; border-radius: 2px;"></span>
  <p style="font-size: 21px; line-height: 1.6; color: var(--purple-primary, #3E0D5F); font-weight: 600; font-style: italic; margin: 0 auto 15px auto; letter-spacing: -0.3px; text-align: center; width: 100%;">
    "At ReNew You Health & Wellness, our IV Therapy Infusions are engineered to deliver vital fluids and select target nutrients directly into the bloodstream."
  </p>

</div>


      <h2 class="iv-section-heading">Why Choose IV Therapy?</h2>
      
      <!-- Transformed Intro Box 2 (Styled identically to the Infusion Time Tooltip) -->
      <div class="iv-callout-box" style="background: rgba(43, 182, 115, 0.02); border-left-color: var(--green-secondary);">
        <h3>The Intravenous Advantage</h3>
        <p>Because IV fluids and nutrients are delivered directly into the bloodstream, IV therapy allows for efficient administration without relying on the digestive system. Depending on the selected infusion and your individual needs, IV therapy may support:</p>
      </div>
      
      <div class="iv-feature-grid">
        <div class="iv-feature-card"><h3>Hydration Support</h3><p>Replenishes essential fluids rapidly and efficiently directly into your circulation system loop.</p></div>
        <div class="iv-feature-card"><h3>Energy & Metabolism</h3><p>Supports normal energy metabolism and overall wellness.</p></div>
        <div class="iv-feature-card"><h3>Nutrient Replenishment</h3><p>Supplements selected nutrients through intravenous administration.</p></div>
        <div class="iv-feature-card"><h3>Physical Performance</h3><p>Provides general replenishment and strategic recovery support following intense physical exertion.</p></div>
      </div>

      <!-- ==========================================================================
           BLOCK F: CLINICAL CARD MENU SYSTEM INJECTION
           ========================================================================== -->
      <h2 class="iv-section-heading" id="iv-menu-target">Our IV Therapy Options</h2>
      <div class="iv-feature-grid">
        <!-- Drip Option 1 -->
        <div class="iv-feature-card" style="border-top: 4px solid var(--purple-accent);">
          <h3 style="color: var(--purple-primary);">B Lean IV Infusion</h3>
          <p style="font-weight:700; color:var(--purple-accent); margin-bottom:8px;">Support Your Wellness Journey</p>
          <p>Designed for patients looking for hydration and nutrient support as part of an overall wellness or weight-management routine. Helps support healthy metabolic processes, natural energy baseline configurations, and routine exercise recovery parameters.</p>
        </div>
        <!-- Drip Option 2 -->
        <div class="iv-feature-card" style="border-top: 4px solid var(--purple-accent);">
          <h3 style="color: var(--purple-primary);">Quench IV Infusion</h3>
          <p style="font-weight:700; color:var(--purple-accent); margin-bottom:8px;">Hydration Starts Here</p>
          <p>A hydration-focused infusion engineered to replenish vital fluids and provide support after travel, demanding schedules, or intense athletic exhaustion loops. Promotes holistic fluid equilibrium to keep you feeling refreshed.</p>
        </div>
        <!-- Drip Option 3 -->
        <div class="iv-feature-card" style="border-top: 4px solid var(--purple-accent); grid-column: span 2;">
          <h3 style="color: var(--purple-primary);">Recovery & Performance IV Infusion</h3>
          <p style="font-weight:700; color:var(--purple-accent); margin-bottom:8px;">Recharge After the Work</p>
          <p>Designed with active lifestyles in mind. Whether you participate in rigorous sports, target complex workout trends, or seek fluid balance post-activity, this infusion scales energy output, targets muscle recovery support channels, and safeguards baseline parameters.</p>
        </div>
      </div>

      <div class="iv-callout-box" style="background: rgba(43, 182, 115, 0.02); border-left-color: var(--green-secondary);">
        <h3>More IV Infusions Are Being Added</h3>
        <p>Our IV Therapy menu continues to grow. New IV infusion options are regularly being added to better meet the wellness needs of our patients. Check back often or contact our office for the most current menu and available formulations.</p>
      </div>
      <!-- ==========================================================================
           BLOCK G: CLINICAL STEPS COLS & SCREENING DISCLOSURES
           ========================================================================== -->
      <h2 class="iv-section-heading">What to Expect During Your IV Therapy Visit</h2>
      <div class="iv-feature-grid" style="grid-template-columns: repeat(4, 1fr);">
        <div class="iv-feature-card" style="padding:20px;"><h3>1. Medical Review</h3><p>A healthcare professional will review your medical history, active medications, and safety profiles.</p></div>
        <div class="iv-feature-card" style="padding:20px;"><h3>2. Selection</h3><p>Your clinician will align the appropriate infusion option based on your health history and eligibility.</p></div>
        <div class="iv-feature-card" style="padding:20px;"><h3>3. Infusion</h3><p>A catheter is securely placed and administered comfortably within a professional medical environment.</p></div>
        <div class="iv-feature-card" style="padding:20px;"><h3>4. Aftercare</h3><p>The line is removed securely and aftercare guidance is reviewed with you before you leave.</p></div>
      </div>

      <div class="iv-callout-box" style="background: rgba(43, 182, 115, 0.02); border-left-color: var(--green-secondary);">
        <h3>How Long Does an IV Infusion Take?</h3>
        <p>Treatment times vary depending on the type of infusion, volume of fluids, and individual patient needs. Most patients can relax comfortably during their infusion. Our team will provide an estimated treatment time when your infusion is selected.</p>
      </div>

      <h2 class="iv-section-heading">Patient Eligibility & Safety Screens</h2>
      <div class="iv-feature-grid">
        <div class="iv-feature-card" style="border-left: 4px solid var(--orange, #3E0D5F);">
          <h3 style="color: var(--purple-primary);">Who May Benefit From IV Therapy?</h3>
          <p>IV therapy may be considered for adults looking for additional hydration or nutrient support to complement demanding routines, extensive business travel schedules, wellness lifestyles, or athletic rehabilitation protocols.</p>
        </div>
        <div class="iv-feature-card" style="border-left: 4px solid var(--orange, #3E0D5F);">
          <h3 style="color: var(--text);">Is IV Therapy Right for Everyone?</h3>
          <p>No. Certain medical conditions, medications, allergies, pregnancy status, kidney or heart conditions, or other health factors may affect whether IV therapy is appropriate. For your safety, all patients are screened before receiving treatment.</p>
        </div>
      </div>

      <div class="iv-callout-box" style="background: rgba(43, 182, 115, 0.02); border-left-color: var(--green-secondary);">
        <h3>Personalized Care in a Comfortable Setting</h3>
        <p>At ReNew You Health & Wellness, IV therapy is more than selecting an infusion from a menu. We believe in providing personalized care based on your health history, wellness goals, and individual needs. Our team is here to make your experience comfortable, professional, and supportive from your initial evaluation through the completion of your infusion.</p>
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
  aspect-ratio: 0;
  /* FIXED: Set to cover to naturally zoom the subject back in and fill the frame */
  object-fit: cover; 
  /* FIXED: Preserves your requested 10% structural corner rounding */
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
            Schedule Your IV Therapy Appointment
          </h3>
          <p style="max-width: 650px; font-size: 16px; color: var(--muted); line-height: 1.65; margin: 0 0 32px 0; font-weight: 400;">
            Ready to add IV hydration and nutrient support to your wellness routine? Schedule your appointment today. Walk-ins welcome based on provider availability.
          </p>
<!-- New zero-redirect popup trigger line -->
<button class="iv-action-footer-btn" onclick="if(typeof openBookingModal === 'function'){ openBookingModal(); } else { window.location.href='contact.html'; }">
            Book Your Drip Visit
          </button>
        </div>

        <!-- Right Side: Fully Rounded Avatar Asset Panel -->
        <div class="iv-book-hero-media">
          <img src="images/martin, a.png" alt="Schedule an initial visit with Angela Martin at ReNew You Health & Wellness" loading="lazy" decoding="async">
        </div>
      </div>
    </div>

  `;
}
