/**
 * ReNew You Health & Wellness - Acute Care Content Sections
 * Location: assets/js/acute-care-section.js
 */
function renderAcuteCareContent() {
  const contentTarget = document.getElementById('acute-care-content-target');
  if (!contentTarget) return;

  contentTarget.innerHTML = `
    <style>
      /* ==========================================================================
         BLOCK A: LAYOUT DECK & CORE ARCHITECTURE
         ========================================================================== */
      .ac-section-layout {
        max-width: 1450px;
        margin: 0 auto;
        text-align: left;
        padding: 40px 20px;
        box-sizing: border-box;
      }
      .ac-section-heading {
        color: var(--purple-primary, #3E0D5F);
        font-size: 28px;
        font-weight: 800;
        margin: 40px 0 20px 0;
        border-bottom: 2px solid var(--border, #dfe5ec);
        padding-bottom: 10px;
        letter-spacing: -0.5px;
        text-align: left;
      }
      .ac-feature-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
        margin-bottom: 40px;
      }
      .ac-feature-card {
        background: var(--white, #fff);
        border: 1px solid rgba(138, 52, 159, 0.08);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 35px rgba(62,13,95,0.02);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
      }
      .ac-feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 35px rgba(62,13,95,0.06);
        border-color: rgba(138, 52, 159, 0.15);
      }
      .ac-feature-card h3 {
        margin: 0 0 12px 0;
        color: var(--purple-primary, #3E0D5F);
        font-size: 18px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .ac-feature-card h3::before {
        content: "✓";
        color: var(--green-secondary, #2bb673);
        font-weight: 800;
      }
      .ac-feature-card p {
        margin: 0;
        font-size: 14.5px;
        line-height: 1.6;
        color: #555555;
      }
      /* ==========================================================================
         BLOCK B: CALLOUT BOXES & SCHEDULING ACTION BUTTON STYLES
         ========================================================================== */
      .ac-callout-box {
        background: rgba(138, 52, 159, 0.03);
        border-left: 4px solid var(--purple-primary, #3E0D5F);
        padding: 30px;
        border-radius: 0 16px 16px 0;
        margin: 30px 0;
        box-shadow: 0 4px 15px rgba(62,13,95,0.01);
        text-align: left;
      }
      .ac-callout-box h3 {
        margin: 0 0 10px 0;
        color: var(--purple-primary, #3E0D5F);
        font-weight: 700;
        font-size: 18px;
      }
      .ac-callout-box p {
        margin: 0;
        font-size: 15.5px;
        line-height: 1.65;
        color: #4A4A4A;
      }
      .ac-action-footer-btn {
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
      .ac-action-footer-btn:hover {
        background: var(--purple-primary, #3E0D5F);
        transform: translateY(-2px);
      }
      @media(max-width: 992px) {
        .ac-feature-grid { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @media(max-width: 768px) {
        .ac-feature-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        .ac-section-heading { font-size: 22px !important; }
      }
    </style>
    <!-- ==========================================================================
         BLOCK C: FORCE-CENTERED HIGH-IMPACT INTRO STATEMENT
         ========================================================================== -->
    <div class="ac-section-layout">
      
      <div class="wi-unified-center-wrapper" style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center !important; margin: 20px auto 60px auto;">
        <div class="wi-centered-lead-statement" style="max-width: 950px; width: 100%; padding: 0 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center !important;">
          <span style="display: block; width: 40px; height: 3px; background: var(--purple-accent, #8A349B); margin: 0 auto 25px auto; border-radius: 2px;"></span>
          <p style="font-size: 21px; line-height: 1.6; color: #4A4A4A;; font-weight: 300; font-style: italic; margin: 0 0 15px 0; letter-spacing: -0.3px; text-align: center !important; width: 100%;">
            "At ReNew You Health & Wellness, we provide acute care services for common, non-emergency illnesses and health concerns that require timely medical attention."
          </p>
       
        </div>
      </div>
    <!-- ==========================================================================
         BLOCK D: CONDITIONS DECK WITH SPECIFIED GREEN LEFT-ACCENT TOOLTIPS
         ========================================================================== -->
      <h2 class="ac-section-heading" id="acute-menu-target">Acute Conditions We Evaluate & Treat</h2>
      
      <div class="ac-feature-grid">
        <div class="ac-feature-card">
          <h3>Cold, Flu & Respiratory Symptoms</h3>
          <p>We evaluate common respiratory concerns including: cough, congestion, runny nose, sore throat, fever, chills, body aches, fatigue, and mild respiratory ailments. Based on your examination, targeted tests or treatments may be recommended.</p>
        </div>
        <div class="ac-feature-card">
          <h3>COVID-19 Evaluation</h3>
          <p>If you are experiencing symptoms associated with COVID-19, our team can comprehensively evaluate your condition and determine whether advanced diagnostic testing or additional supportive care paths are clinically appropriate.</p>
        </div>
        <div class="ac-feature-card">
          <h3>Influenza Diagnosis</h3>
          <p>Flu symptoms can develop quickly and may include fever, chills, headaches, body aches, and deep fatigue. We provide immediate evaluation and flu testing when appropriate to determine optimal treatment recommendations.</p>
        </div>
        <div class="ac-feature-card">
          <h3>Strep Throat & Sore Throat</h3>
          <p>A sore throat can stem from multiple distinct physiological conditions. We offer dedicated evaluation and rapid strep testing to distinguish viral irritation from bacterial infections that require antibiotic treatment plans.</p>
        </div>
        <div class="ac-feature-card">
          <h3>Ear Infections & Ear Pain</h3>
          <p>We evaluate ear pain, acute fluid pressure, possible outer or middle ear infections, and mild hearing changes associated with illness to locate the issue and determine your necessary next steps.</p>
        </div>
        <div class="ac-feature-card">
          <h3>Sinus Symptoms & Sinus Infections</h3>
          <p>Persistent sinus pressure, facial discomfort, drainage, and congestion can disrupt your daily routine. We evaluate your symptoms to determine whether supportive care, prescription treatments, or deep clearing strategies are medically required.</p>
        </div>
        <div class="ac-feature-card">
          <h3>Bronchitis & Cough</h3>
          <p>A lingering cough can have several underlying causes. Our medical providers examine your lungs and respiratory pathways to differentiate simple irritation from bronchitis to configure an optimal healing roadmap.</p>
        </div>
        <div class="ac-feature-card">
          <h3>Pink Eye / Conjunctivitis</h3>
          <p>Red, irritated, itchy, or watery eyes can stem from infections, seasonal allergies, or foreign irritants. We evaluate symptoms consistent with conjunctivitis and supply safe, prescription eye drop treatments when indicated.</p>
        </div>
      </div>
    <!-- ==========================================================================
         BLOCK E: VISITS GRID & IN-OFFICE ADVANCED TESTING SECTIONS
         ========================================================================== -->
      <div class="wi-callout-box" style="background: rgba(43, 182, 115, 0.02); border-left: 4px solid var(--purple-accent, #8A349B); padding: 30px; border-radius: 0 16px 16px 0; margin: 30px 0; box-shadow: 0 4px 15px rgba(62,13,95,0.01); text-align: left; width: 100%; box-sizing: border-box;">
        <h2 class="ac-section-heading" style="color: var(--purple-primary); font-size: 24px; font-weight: 800; margin: 0 0 15px 0; padding: 0; border: none; text-align: left;">Urinary Tract Infection Symptoms</h2>
        <p style="font-size: 15.5px; line-height: 1.6; margin: 0; color: #4A4A4A; text-align: left;">We provide evaluation for common UTI symptoms including burning or discomfort with urination, frequent urination, urgency, lower abdominal discomfort, and other uncomplicated urinary symptoms. Quick urine testing may be recommended to help determine the appropriate targeted treatment.</p>
      </div>

      <div class="wi-callout-box" style="background: rgba(43, 182, 115, 0.02); border-left: 4px solid var(--green-secondary); padding: 30px; border-radius: 0 16px 16px 0; margin: 30px 0; box-shadow: 0 4px 15px rgba(62,13,95,0.01); text-align: left; width: 100%; box-sizing: border-box;">
        <h2 class="ac-section-heading" style="color: var(--purple-primary); font-size: 24px; font-weight: 800; margin: 0 0 15px 0; padding: 0; border: none; text-align: left;">In-Office Pregnancy Testing</h2>
        <p style="font-size: 15.5px; line-height: 1.6; margin: 0; color: #4A4A4A; text-align: left;">Pregnancy testing is available for patients who need immediate clinical confirmation of a possible pregnancy. Our compassionate healthcare team can also provide clear, supportive guidance regarding appropriate next steps based on your laboratory results.</p>
      </div>

      <h2 class="ac-section-heading">Diagnostic Point-of-Care Testing Available</h2>
      <div class="ac-feature-grid" style="grid-template-columns: repeat(4, 1fr);">
        <div class="ac-feature-card" style="padding:20px; text-align:center;"><h3>COVID-19</h3><p>Rapid Swab Testing</p></div>
        <div class="ac-feature-card" style="padding:20px; text-align:center;"><h3>Influenza A/B</h3><p>Respiratory Panels</p></div>
        <div class="ac-feature-card" style="padding:20px; text-align:center;"><h3>Strep Throat</h3><p>Bacterial Cultures</p></div>
        <div class="ac-feature-card" style="padding:20px; text-align:center;"><h3>Urinalysis</h3><p>Pregnancy & Infection</p></div>
      </div>
      <p style="font-size:13.5px; font-style:italic; color: var(--muted); margin-top:-10px; margin-bottom:30px;">Additional testing, specialty laboratory services, external imaging, or focused specialist evaluation may be recommended when necessary.</p>

      <h2 class="ac-section-heading">Your Acute Care Visit Roadmap</h2>
      <div class="ac-feature-grid" style="grid-template-columns: repeat(3, 1fr);">
        <div class="ac-feature-card" style="padding:22px;"><p><strong>Evaluation:</strong> Review of active symptoms, vital signs tracking, and focused physical examinations.</p></div>
        <div class="ac-feature-card" style="padding:22px;"><p><strong>Diagnostics:</strong> Processing appropriate in-office testing and cross-referencing your medication lines.</p></div>
        <div class="ac-feature-card" style="padding:22px;"><p><strong>Treatment:</strong> Personalized care plans, prescription medications when indicated, and follow-up guidance.</p></div>
      </div>
      <!-- ==========================================================================
           BLOCK F: TELEMEDICINE OUTLINES & CRITICAL CARE WARNING BOXES
           ========================================================================== -->
      <div class="ac-callout-box">
        <h3>Telemedicine Acute Care</h3>
        <p>Some acute health concerns can be evaluated through a telemedicine appointment. Telemedicine may be appropriate for selected symptoms and conditions that do not require an in-person physical examination or immediate testing. If your provider determines that an in-person examination, laboratory testing, or additional evaluation is necessary, you may be asked to come into the office or seek another appropriate level of care.</p>
      </div>

      <div class="ac-callout-box" style="background: rgba(138, 52, 159, 0.01); border-left-color: var(--green-secondary);">
        <h3>Walk-Ins Welcome</h3>
        <p>We understand that illnesses do not always happen according to schedule. Walk-ins are welcome based on provider availability. Appointments are encouraged when possible to help reduce your wait time. You can also schedule your visit through our online appointment system.</p>
      </div>

      <div class="ac-callout-box" style="background: #fff5f5; border-left-color: #ef4444;">
        <h3 style="color:#dc2626;">When Acute Care Is NOT Appropriate</h3>
        <p style="color:#991b1b;">ReNew You Health & Wellness provides care for non-emergency medical concerns. <strong>For severe or potentially life-threatening symptoms, call 911 or seek emergency medical care immediately.</strong> Emergency symptoms include severe difficulty breathing, chest pain, stroke-like symptoms, uncontrolled bleeding, severe allergic anaphylaxis, or loss of consciousness.</p>
      </div>

      <div class="ac-callout-box">
        <h2 class="ac-section-heading" style="color: var(--purple-primary); font-size: 24px; font-weight: 800; margin: 0 0 15px 0; padding: 0; border: none; text-align: left;">Care Designed Around You</h2>
        <p style="font-size: 15.5px; line-height: 1.6; margin: 0; color: #4A4A4A; text-align: left;">At ReNew You Health & Wellness, we believe healthcare should be convenient, compassionate, and personalized. Whether you need testing, treatment for a minor illness, or guidance about new symptoms, our team is here to help. Services are based on provider evaluation and medical necessity. Available testing and treatment options may vary.</p>
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
        Get Timely Relief
      </span>
      <h3 style="color: var(--purple-primary); font-size: 36px; margin: 0 0 16px 0; font-weight: 800; line-height: 1.2; letter-spacing: -0.5px;">
        Schedule Your Acute Care Visit
      </h3>
      <p style="max-width: 650px; font-size: 16px; color: var(--muted); line-height: 1.65; margin: 0 0 32px 0; font-weight: 400;">
        Struggling with a sudden illness or a minor health flare-up? Secure an in-office or telemedicine session with our medical team today. Walk-ins are welcome based on provider availability.
      </p>
<!-- New zero-redirect popup trigger line -->
<button class="iv-action-footer-btn" onclick="if(typeof openBookingModal === 'function'){ openBookingModal(); } else { window.location.href='contact.html'; }">
        Book Your Acute Visit
      </button>
    </div>

    <!-- Right Side: Fully Rounded Avatar Asset Panel -->
    <div class="iv-book-hero-media">
      <img src="images/martin, a.png" alt="Schedule an acute care consultation with Angela Martin at ReNew You Health & Wellness">
    </div>
  </div>
</div>

  `;
}
