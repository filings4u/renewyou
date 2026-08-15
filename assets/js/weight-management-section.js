/**
 * ReNew You Health & Wellness - Weight Management Content Sections
 * Location: assets/js/weight-management-section.js
 */
function renderWeightManagementContent() {
  const contentTarget = document.getElementById('weight-management-content-target');
  if (!contentTarget) return;

  contentTarget.innerHTML = `
    <style>
      /* ==========================================================================
         BLOCK 1: CARD COMPONENT & STRUCTURE LAYOUTS
         ========================================================================== */
      .wm-section-layout {
        max-width: 1450px; /* Aligns with central 1450px design layout */
        margin: 0 auto;
        text-align: left;
        padding: 40px 20px;
        box-sizing: border-box;
      }
      .wm-intro-lead {
        font-size: 17px;
        line-height: 1.65;
        color: var(--text, #12213a);
        margin-bottom: 50px;
      }
      .wm-section-heading {
        color: var(--purple-primary, #3E0D5F); /* Color matched to central system */
        font-size: 28px;
        font-weight: 800;
        margin: 40px 0 20px 0;
        border-bottom: 2px solid var(--border, #dfe5ec);
        padding-bottom: 10px;
        letter-spacing: -0.5px;
      }
      .wm-feature-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
        margin-bottom: 40px;
      }
      /* ==========================================================================
         BLOCK 2: DYNAMIC INLINE CARD COMPONENT OVERRIDES
         ========================================================================== */
      .wm-feature-card {
        background: var(--white, #fff);
        border: 1px solid rgba(138, 52, 159, 0.08); /* Matches service card metrics */
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 35px rgba(62,13,95,0.02);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
      }
      .wm-feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 35px rgba(62,13,95,0.06);
        border-color: rgba(138, 52, 159, 0.15);
      }
      .wm-feature-card h3 {
        margin: 0 0 12px 0;
        color: var(--purple-primary, #3E0D5F);
        font-size: 18px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .wm-feature-card h3::before {
        content: "✓";
        color: var(--green-secondary, #2bb673); /* Matched checkmark styling tokens */
        font-weight: 800;
      }
      .wm-feature-card p {
        margin: 0;
        font-size: 14.5px;
        line-height: 1.6;
        color: #555555;
      }
      /* ==========================================================================
         BLOCK 3: CUSTOM UTILITY & CALLOUT PANEL INDICATORS
         ========================================================================== */
      .wm-list-group {
        list-style: none;
        padding: 0;
        margin: 20px 0 40px 0;
      }
      .wm-list-item {
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
      .wm-bullet-marker {
        color: var(--purple-accent, #8A349B); /* Adjusted bullet vectors */
        font-weight: 800;
      }
      .wm-callout-box {
        background: rgba(138, 52, 159, 0.03); /* Soft translucent brand purple backdrop */
        border-left: 4px solid var(--purple-primary, #3E0D5F);
        padding: 30px;
        border-radius: 0 16px 16px 0;
        margin: 40px 0;
        box-shadow: 0 4px 15px rgba(62,13,95,0.01);
      }
      .wm-callout-box h3 {
        margin: 0 0 10px 0;
        color: var(--purple-primary, #3E0D5F);
        font-weight: 700;
      }
      .wm-callout-box p {
        margin: 0;
        font-size: 15px;
        line-height: 1.6;
        color: #4A4A4A;
      }
      /* ==========================================================================
         BLOCK 4: GRID SUB-BREAKPOINTS & INLINE COMPACT FOOTER STYLES
         ========================================================================== */
      .wm-action-footer-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        background: var(--purple-accent, #8A349B); /* Matching theme system variables */
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
      .wm-action-footer-btn:hover {
        background: var(--purple-primary, #3E0D5F);
        transform: translateY(-2px);
      }
      @media(max-width: 992px) {
        .wm-feature-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
      @media(max-width: 768px) {
        .wm-feature-grid {
          grid-template-columns: 1fr !important;
          gap: 20px !important;
        }
        .wm-section-heading {
          font-size: 22px !important;
        }
      }
    </style>
    <!-- ==========================================================================
         BLOCK 5: SERVICE MAIN PANEL DOCUMENT MARKUP
         ========================================================================== -->



</div>
    <div class="wm-section-layout">

      <!-- Transformed Intro: Centered High-Impact Lead Statement -->
<div class="iv-centered-lead-statement" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; max-width: 950px; margin: 20px auto 60px auto; padding: 0 20px; width: 100%; box-sizing: border-box;">
  <span style="display: block; width: 40px; height: 3px; background: var(--purple-accent, #8A349B); margin: 0 auto 25px auto; border-radius: 2px;"></span>
  <p style="font-size: 21px; line-height: 1.6; color: #4A4A4A); font-weight: 300; font-style: italic; margin: 0 auto 15px auto; letter-spacing: -0.3px; text-align: center; width: 100%;">
  "Your journey begins with a comprehensive evaluation so our healthcare provider can better understand your medical history, current health, lifestyle, challenges, and individual goals. From there, we develop a treatment plan tailored specifically to you."
  </p>
</div>

      <h2 class="wm-section-heading">Our Weight Management Program May Include</h2>
      <div class="wm-feature-grid">
        <div class="wm-feature-card">
          <h3>Comprehensive Medical Evaluation</h3>
          <p>Your provider will review your medical history, current medications, previous weight-loss efforts, health concerns, and personal goals to determine the most appropriate approach for you.</p>
        </div>
        <div class="wm-feature-card">
          <h3>Personalized Weight-Loss Plan</h3>
          <p>Your treatment plan is developed around your individual needs. Recommendations may include nutrition guidance, lifestyle modifications, physical activity recommendations, behavioral strategies, and medical treatment when appropriate.</p>
        </div>
        <div class="wm-feature-card">
          <h3>Prescription Weight-Loss Medication</h3>
          <p>For eligible patients, prescription medication may be incorporated into the program following a medical evaluation. Medication selection is based on your health history, treatment goals, provider recommendations, availability, and medical appropriateness.</p>
        </div>
        <div class="wm-feature-card">
          <h3>Injectable & Oral Options</h3>
          <p>Depending on eligibility and provider recommendations, certain weight-management treatments may be available in injectable or oral formulations.</p>
        </div>
        <div class="wm-feature-card">
          <h3>Ongoing Follow-Up & Monitoring</h3>
          <p>Successful weight management requires continued support. Follow-up appointments allow your provider to monitor progress, discuss side effects or concerns, evaluate your response to treatment, and make adjustments when medically appropriate.</p>
        </div>
        <div class="wm-feature-card">
          <h3>Lifestyle & Wellness Support</h3>
          <p>Medication is only one component of successful weight management. We encourage healthy habits that can support long-term results, including balanced nutrition, appropriate physical activity, hydration, sleep, and other lifestyle changes.</p>
        </div>
      </div

      <!-- ==========================================================================
           BLOCK 6: INTERACTIVE BULLET SEGMENTS & MEDICATION CONFIGURATIONS
           ========================================================================== -->

     
 <div class="iv-callout-box" style="background: rgba(43, 182, 115, 0.02); border-left: 4px solid var(--green-secondary); padding: 30px; border-radius: 0 16px 16px 0; margin: 30px 0; box-shadow: 0 4px 15px rgba(62,13,95,0.01); text-align: left; width: 100%; box-sizing: border-box;">
  <h2 class="wm-section-heading" style="color: var(--purple-primary); font-size: 24px; font-weight: 800; margin: 0 0 15px 0; padding: 0; border: none; text-align: left;">Your Journey Is Personal</h2>
  <p style="font-size: 15.5px; line-height: 1.6; margin: 0 0 20px 0; color: #4A4A4A; text-align: left;">Weight loss can look different for every person. Our goal is not simply to focus on a number on the scale. We want to help you develop healthier habits, improve your overall wellness, and create a plan that can be maintained beyond short-term weight loss.</p>
</div>

  <p style="font-size: 15.5px; font-weight: 700; margin: 0; color: var(--purple-primary); text-align: left;">Throughout your program, our healthcare team will work with you to:</p>

      <div class="wm-list-group">
        <div class="wm-list-item"><span class="wm-bullet-marker">■</span><span>Establish realistic and individualized goals</span></div>
        <div class="wm-list-item"><span class="wm-bullet-marker">■</span><span>Track your progress</span></div>
        <div class="wm-list-item"><span class="wm-bullet-marker">■</span><span>Monitor your response to treatment</span></div>
        <div class="wm-list-item"><span class="wm-bullet-marker">■</span><span>Address challenges along the way</span></div>
        <div class="wm-list-item"><span class="wm-bullet-marker">■</span><span>Adjust your treatment plan when appropriate</span></div>
        <div class="wm-list-item"><span class="wm-bullet-marker">■</span><span>Provide continued education and encouragement</span></div>
        <div class="wm-list-item"><span class="wm-bullet-marker">■</span><span>Support long-term weight-management strategies</span></div>
      </div>

   <div class="iv-callout-box" style="background: rgba(43, 182, 115, 0.02); border-left: 4px solid var(--green-secondary); padding: 30px; border-radius: 0 16px 16px 0; margin: 30px 0; box-shadow: 0 4px 15px rgba(62,13,95,0.01); text-align: left; width: 100%; box-sizing: border-box;">
  <h2 class="wm-section-heading" style="color: var(--purple-primary); font-size: 24px; font-weight: 800; margin: 0 0 15px 0; padding: 0; border: none; text-align: left;">Weight-Loss Medication Options</h2>
  <p style="font-size: 15.5px; line-height: 1.6; margin: 0; color: #4A4A4A; text-align: left;">We offer multiple weight-management treatment options based on medical eligibility and provider recommendations. Current options may include:</p>
</div>

      <div class="wm-feature-grid">
        <div class="wm-feature-card" style="border-top: 4px solid var(--purple-accent);">
          <h3 style="color: var(--purple-primary);">Semaglutide-Based Treatment</h3>
          <p>Available in select injectable and oral treatment plans.</p>
        </div>


        <div class="wm-feature-card" style="border-top: 4px solid var(--purple-accent);">
          <h3 style="color: var(--purple-primary);">Tirzepatide-Based Treatment</h3>
          <p>Available in select injectable and oral treatment plans.</p>
        </div>
      </div>
      <p style="font-size:13.5px; font-style:italic; color: #4A4A4A; margin-top:-10px;">Treatment options, formulations, dosages, and availability may change. Additional weight-management options are continuously being evaluated and added to our program.</p>
     
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
      background-color: #ffffff;
    }
    .iv-book-hero-media img {
      width: 100%;
      max-width: 320px;
      /* Proportional dimension scaling */
      height: auto;
      aspect-ratio: 0;
      /* FIXED: Set to cover to naturally zoom the subject back in and fill the frame */
      object-fit: cover;
      /* FIXED: Preserves your requested 10% structural corner rounding */
      border-radius: 10%;
      border: 4px solid var(--white);
      /* White border framing line crisp contrast */
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
        Schedule Your Weight Loss Consultation
      </h3>
      <p style="max-width: 650px; font-size: 16px; color: var(--muted); line-height: 1.65; margin: 0 0 32px 0; font-weight: 400;">
        Ready to start your customized, provider-supervised health transformation? Secure an initial diagnostic evaluation with our medical team today. Walk-ins are parsed fluidly based on active provider availability blocks.
      </p>
      <button class="iv-action-footer-btn" onclick="window.location.href='contact.html'">
        Schedule Initial Visit
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
