/**
 * ReNew You Health & Wellness - GLP-1 Service Content
 * Location: assets/js/glp-1-section.js
 */
document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('glp-1-content-target');
  if (!target) return;

  target.innerHTML = `
    <style>
      .glp-section-layout{max-width:1450px;margin:0 auto;text-align:left;padding:40px 20px;box-sizing:border-box}
      .glp-section-heading{color:var(--purple-primary,#3E0D5F);font-size:28px;font-weight:800;margin:40px 0 20px;border-bottom:2px solid var(--border,#dfe5ec);padding-bottom:10px;letter-spacing:-.5px;text-align:left}
      .glp-feature-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:30px;margin-bottom:40px}
      .glp-feature-card{background:var(--white,#fff);border:1px solid rgba(138,52,159,.08);border-radius:20px;padding:30px;box-shadow:0 10px 35px rgba(62,13,95,.02);transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s ease}
      .glp-feature-card:hover{transform:translateY(-4px);box-shadow:0 15px 35px rgba(62,13,95,.06);border-color:rgba(138,52,159,.15)}
      .glp-feature-card h3{margin:0 0 12px;color:var(--purple-primary,#3E0D5F);font-size:18px;font-weight:700;display:flex;align-items:center;gap:10px}
      .glp-feature-card h3:before{content:"✓";color:var(--green-secondary,#2bb673);font-weight:800}
      .glp-feature-card p{margin:0;font-size:14.5px;line-height:1.65;color:#555}
      .glp-callout{background:rgba(138,52,159,.03);border-left:4px solid var(--purple-primary,#3E0D5F);padding:30px;border-radius:0 16px 16px 0;margin:30px 0;box-shadow:0 4px 15px rgba(62,13,95,.01);text-align:left}
      .glp-callout h3{margin:0 0 10px;color:var(--purple-primary,#3E0D5F);font-size:18px;font-weight:700}.glp-callout p{margin:0;font-size:15.5px;line-height:1.65;color:#4A4A4A}
      .glp-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:25px;margin:25px 0 40px}.glp-step{background:#fff;border:1px solid rgba(138,52,159,.08);border-radius:20px;padding:28px}.glp-step span{display:flex;width:42px;height:42px;border-radius:50%;align-items:center;justify-content:center;background:var(--purple-primary,#3E0D5F);color:#fff;font-weight:800;margin-bottom:15px}.glp-step h3{margin:0 0 8px;color:var(--purple-primary,#3E0D5F);font-size:18px}.glp-step p{margin:0;color:#555;line-height:1.6;font-size:14.5px}
      .glp-book-grid{display:grid;grid-template-columns:1.3fr .7fr;align-items:center;width:100%}.glp-book-content{padding:60px 60px 60px 50px;text-align:left}.glp-book-media{width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:30px;box-sizing:border-box;line-height:0;background:#F9F9F8}.glp-book-media img{width:100%;max-width:360px;height:auto;object-fit:cover;border-radius:10%;border:4px solid #fff;box-shadow:0 8px 25px rgba(62,13,95,.06)}
      .glp-action{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;background:var(--purple-accent,#8A349B);color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:30px;box-shadow:0 6px 20px rgba(138,52,159,.15);transition:.2s ease}.glp-action:hover{background:var(--purple-primary,#3E0D5F);transform:translateY(-2px)}
      @media(max-width:900px){.glp-feature-grid,.glp-steps{grid-template-columns:1fr 1fr}.glp-book-grid{grid-template-columns:1fr}.glp-book-media{order:-1}.glp-book-content{padding:35px 28px 45px}}
      @media(max-width:700px){.glp-section-layout{padding:25px 18px}.glp-feature-grid,.glp-steps{grid-template-columns:1fr}.glp-section-heading{font-size:22px}.glp-book-media{padding:24px}.glp-book-media img{max-width:300px}}
    </style>

    <div class="glp-section-layout">
      <div style="width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center!important;margin:20px auto 60px">
        <div style="max-width:950px;width:100%;padding:0 20px;box-sizing:border-box;text-align:center!important">
          <span style="display:block;width:40px;height:3px;background:var(--purple-accent,#8A349B);margin:0 auto 25px;border-radius:2px"></span>
          <p style="font-size:21px;line-height:1.6;color:#4A4A4A;font-weight:300;font-style:italic;margin:0;letter-spacing:-.3px;text-align:center!important">“GLP-1 care is a medication-management service. It is separate from our broader Medical Weight Management program and begins with an individualized clinical evaluation.”</p>
        </div>
      </div>

      <h2 class="glp-section-heading">What Is GLP-1 Medication Management?</h2>
      <div class="glp-callout">
        <p>GLP-1 receptor agonist medications are prescription treatments that may be considered for certain patients after a medical evaluation. At ReNew You Health & Wellness, GLP-1 care focuses specifically on medication eligibility, education, safe use, tolerance, follow-up, and ongoing clinical monitoring. Medication is prescribed only when clinically appropriate.</p>
      </div>

      <h2 class="glp-section-heading">What Your GLP-1 Visit May Include</h2>
      <div class="glp-feature-grid">
        <div class="glp-feature-card"><h3>Clinical Eligibility Review</h3><p>Your provider reviews your health history, current medications, relevant conditions, prior treatment history, and treatment goals before determining whether GLP-1 therapy may be appropriate.</p></div>
        <div class="glp-feature-card"><h3>Medication Education</h3><p>We explain how the prescribed medication is intended to be used, how it is administered when applicable, important precautions, common side effects, and when to contact your provider.</p></div>
        <div class="glp-feature-card"><h3>Individualized Treatment Plan</h3><p>If treatment is appropriate, your plan is tailored to your clinical needs rather than using a one-size-fits-all medication schedule.</p></div>
        <div class="glp-feature-card"><h3>Ongoing Monitoring</h3><p>Follow-up visits may include review of medication tolerance, response, symptoms, adherence, and whether treatment changes are medically appropriate.</p></div>
      </div>

      <h2 class="glp-section-heading">How GLP-1 Care Works</h2>
      <div class="glp-steps">
        <div class="glp-step"><span>1</span><h3>Schedule a Consultation</h3><p>Meet with a provider to discuss your medical history, goals, previous treatment, and whether GLP-1 medication should be considered.</p></div>
        <div class="glp-step"><span>2</span><h3>Complete Your Evaluation</h3><p>Your provider evaluates medical eligibility and may recommend laboratory testing or additional information when appropriate.</p></div>
        <div class="glp-step"><span>3</span><h3>Begin Follow-Up Care</h3><p>If prescribed, you receive medication education and return for ongoing monitoring, tolerance checks, and treatment-plan review.</p></div>
      </div>

      <div class="glp-callout" style="background:rgba(43,182,115,.02);border-left-color:var(--green-secondary,#2bb673)">
        <h3>GLP-1 Care Is a Separate Service</h3>
        <p>Our GLP-1 medication service is not the same as our comprehensive Medical Weight Management program. Patients who want broader nutrition, lifestyle, metabolic-health, and long-term weight-management support can review our <a href="weight-management.html" style="color:var(--purple-accent,#8A349B);font-weight:700">Medical Weight Management service</a>.</p>
      </div>

      <h2 class="glp-section-heading">Who May Be Considered?</h2>
      <div class="glp-feature-grid">
        <div class="glp-feature-card"><h3>Patients Seeking Medication Evaluation</h3><p>This service is designed for patients who specifically want to discuss whether a GLP-1 medication may be medically appropriate for them.</p></div>
        <div class="glp-feature-card"><h3>Patients Needing Ongoing Medication Monitoring</h3><p>Established patients may use follow-up visits to review tolerance, response, safety concerns, and continued eligibility.</p></div>
      </div>

      <div class="glp-callout" style="background:#fff8f2;border-left-color:#d97706">
        <h3 style="color:#9a5608">Important Medication Safety Information</h3>
        <p>GLP-1 medications are prescription medications and are not appropriate for everyone. Treatment decisions depend on your medical history, current medications, contraindications, provider assessment, and other clinical factors. Results vary, and no specific outcome is guaranteed. Seek urgent medical care for severe or concerning symptoms.</p>
      </div>

      <h2 class="glp-section-heading">Frequently Asked Questions</h2>
      <div class="glp-feature-grid">
        <div class="glp-feature-card"><h3>Do I automatically qualify for GLP-1 medication?</h3><p>No. A provider must first review your medical history and determine whether treatment is clinically appropriate.</p></div>
        <div class="glp-feature-card"><h3>Is this the same as the weight-management program?</h3><p>No. GLP-1 medication management is a separate service focused on medication evaluation and monitoring. Medical Weight Management is a broader program that may include nutrition, lifestyle, metabolic, and other clinical support.</p></div>
        <div class="glp-feature-card"><h3>Will I need follow-up appointments?</h3><p>Yes. Ongoing follow-up is an important part of prescription medication management and helps your provider assess tolerance, response, and safety.</p></div>
        <div class="glp-feature-card"><h3>Are results guaranteed?</h3><p>No. Individual response varies, and treatment outcomes cannot be guaranteed.</p></div>
      </div>

      <div id="consultation" style="max-width:1450px;margin:80px auto 0;background:#fff;border-radius:24px;border:1px solid rgba(138,52,159,.08);box-shadow:0 15px 45px rgba(62,13,95,.03);overflow:hidden;box-sizing:border-box;width:100%">
        <div class="glp-book-grid">
          <div class="glp-book-content">
            <span style="color:var(--purple-accent,#8A349B);font-size:.82rem;font-weight:800;text-transform:uppercase;letter-spacing:1.5px">GLP-1 Consultation</span>
            <h2 style="font-size:clamp(1.8rem,3vw,2.6rem);color:var(--purple-primary,#3E0D5F);font-weight:800;margin:12px 0 16px;line-height:1.15">Talk With a Provider About GLP-1 Care</h2>
            <p style="font-size:16px;line-height:1.7;color:#555;margin:0 0 25px">Schedule an appointment to review your health history, treatment goals, and whether GLP-1 medication management may be appropriate for you.</p>
            <a class="glp-action" href="contact.html?subject=GLP-1%20Consultation">Request a GLP-1 Consultation</a>
          </div>
          <div class="glp-book-media"><img src="images/weight loss.png" alt="GLP-1 consultation and clinical monitoring at ReNew You Health & Wellness"></div>
        </div>
      </div>
    </div>
  `;
});
