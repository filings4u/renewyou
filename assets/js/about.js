/**
 * ReNew You Health & Wellness - About Page Controller
 * Location: assets/js/about.js
 */

document.addEventListener('DOMContentLoaded', () => {
  renderAboutPageContent();
});

/**
 * Dynamically updates the document body and loads operational and clinical leadership details
 */
function renderAboutPageContent() {
  // Target the structural container slot for dynamic content injection
  const container = document.getElementById('leadership-target');
  if (!container) return;

  let htmlContent = `
    <main style="background-color: #F9F9F8; width: 100%;">
      

<style>
/* =========================================================
   ABOUT PAGE
   DESKTOP + TABLET + MOBILE
   MASTER CONTENT WIDTH: 1450px
========================================================= */


/* =========================================================
   GLOBAL
========================================================= */

#leadership-target,
#leadership-target main {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden;
}


/* =========================================================
   DESKTOP
   993px+
========================================================= */

.about-split-grid {
  width: 100%;
  max-width: 1450px;

  margin-left: auto;
  margin-right: auto;

  padding-left: 30px;
  padding-right: 30px;

  display: grid;

  /*
     KEEP THE ORIGINAL TWO-COLUMN STRUCTURE
  */
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

  align-items: center;

  gap: 70px;

  box-sizing: border-box;
}


/* =========================================================
   REVERSE DESKTOP SECTION

   LaToya:
   TEXT LEFT
   IMAGE RIGHT
========================================================= */

.about-split-grid.reverse-mobile {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}


/* =========================================================
   CONTENT
========================================================= */

.about-content-frame {
  width: 100%;
  max-width: 650px;
  box-sizing: border-box;
}


/* =========================================================
   HEADINGS
========================================================= */

.about-content-frame h2 {
  font-size: 2.5rem;
  line-height: 1.2;

  margin: 0 0 24px;

  text-align: left;
}


.about-content-frame h3 {
  font-size: 2.1rem;
  line-height: 1.25;

  margin: 0 0 10px;

  text-align: left;
}


.about-content-frame h4 {
  font-size: 1rem;
  line-height: 1.45;

  margin: 0 0 20px;

  text-align: left;

  letter-spacing: 0.3px;
}


.about-content-frame p {
  font-size: 1.08rem;
  line-height: 1.75;

  margin: 0 0 18px;

  text-align: left;
}


/* =========================================================
   DESKTOP IMAGE CONTAINER

   IMPORTANT:
   The container can occupy its grid column,
   but the IMAGE itself stays small.
========================================================= */

.about-media-frame {
  width: 100%;

  display: flex;

  justify-content: center;
  align-items: center;

  box-sizing: border-box;
}


/* =========================================================
   DESKTOP IMAGES

   CONTROLLED WIDTH
========================================================= */

.about-media-frame img {
  display: block;

  width: 420px;

  max-width: 420px;

  height: auto;

  margin-left: auto;
  margin-right: auto;

  border-radius: 24px;

  object-fit: cover;

  box-sizing: border-box;
}


/* =========================================================
   MISSION CALLOUT
========================================================= */

.iv-callout-box {
  width: 100%;
  max-width: 1450px;

  margin-left: auto;
  margin-right: auto;

  padding: 35px 40px;

  box-sizing: border-box;
}


.iv-callout-box p {
  font-size: 1.1rem;

  line-height: 1.7;

  margin: 0;
}


/* =========================================================
   LARGE DESKTOP
   1200px+
========================================================= */

@media (min-width: 1200px) {

  /*
     KEEP THE FULL PAGE AT 1450px
  */

  .about-split-grid {
    width: 100%;
    max-width: 1450px;

    padding-left: 30px;
    padding-right: 30px;

    /*
       ORIGINAL TWO-COLUMN LAYOUT
    */

    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 1fr);

    gap: 80px;
  }


  .about-content-frame {
    max-width: 650px;
  }


  .about-content-frame h2 {
    font-size: 2.5rem;
  }


  .about-content-frame h3 {
    font-size: 2.1rem;
  }


  .about-content-frame p {
    font-size: 1.08rem;
  }


  /*
     DESKTOP IMAGE SIZE

     350px is the maximum.
  */

  .about-media-frame img {
    width: 350px;

    max-width: 350px;
  }
}


/* =========================================================
   EXTRA LARGE DESKTOP
   1500px+
========================================================= */

@media (min-width: 1500px) {

  .about-split-grid {
    max-width: 1450px;
  }


  .about-media-frame img {
    width: 350px;

    max-width: 350px;
  }
}


/* =========================================================
   TABLET
   601px – 992px
========================================================= */

@media (max-width: 992px) {

  .about-split-grid {
    width: 100% !important;

    max-width: 900px !important;

    padding-left: 30px !important;
    padding-right: 30px !important;

    /*
       STACK CONTENT
    */

    grid-template-columns: 1fr !important;

    gap: 40px !important;

    margin-left: auto !important;
    margin-right: auto !important;
  }


  /*
     LaToya:
     TEXT FIRST
     IMAGE SECOND
  */

  .about-split-grid.reverse-mobile {
    display: flex !important;

    flex-direction: column-reverse !important;

    gap: 40px !important;
  }


  /* =======================================================
     TABLET CONTENT
  ======================================================= */

  .about-content-frame {
    width: 100% !important;

    max-width: 750px !important;

    margin-left: auto !important;
    margin-right: auto !important;

    text-align: center !important;
  }


  .about-content-frame h2 {
    font-size: 2rem !important;

    line-height: 1.25 !important;

    text-align: center !important;
  }


  .about-content-frame h3 {
    font-size: 1.75rem !important;

    line-height: 1.3 !important;

    text-align: center !important;
  }


  .about-content-frame h4 {
    font-size: 0.95rem !important;

    line-height: 1.45 !important;

    text-align: center !important;
  }


  .about-content-frame p {
    font-size: 1rem !important;

    line-height: 1.7 !important;

    text-align: center !important;
  }


  /* =======================================================
     TABLET IMAGE
  ======================================================= */

  .about-media-frame {
    width: 100% !important;

    display: flex !important;

    justify-content: center !important;

    align-items: center !important;
  }


  .about-media-frame img {
    width: 350px !important;

    max-width: 350px !important;

    height: auto !important;

    margin-left: auto !important;
    margin-right: auto !important;
  }


  /* =======================================================
     TABLET CALLOUT
  ======================================================= */

  .iv-callout-box {
    width: 100% !important;

    max-width: 900px !important;

    padding: 30px !important;
  }


  .iv-callout-box p {
    font-size: 1.05rem !important;

    line-height: 1.65 !important;
  }
}


/* =========================================================
   MOBILE
   401px – 600px
========================================================= */

@media (max-width: 600px) {

  #leadership-target,
  #leadership-target main {
    width: 100% !important;

    max-width: 100% !important;

    overflow-x: hidden !important;
  }


  /* =======================================================
     MOBILE GRID
  ======================================================= */

  .about-split-grid {
    width: 100% !important;

    max-width: 100% !important;

    padding-left: 15px !important;
    padding-right: 15px !important;

    grid-template-columns: 1fr !important;

    gap: 30px !important;

    box-sizing: border-box !important;
  }


  /*
     LaToya:
     TEXT FIRST
     IMAGE SECOND
  */

  .about-split-grid.reverse-mobile {
    display: flex !important;

    flex-direction: column-reverse !important;

    gap: 30px !important;
  }


  /* =======================================================
     MOBILE CONTENT
  ======================================================= */

  .about-content-frame {
    width: 100% !important;

    max-width: 100% !important;

    text-align: center !important;
  }


  .about-content-frame h2 {
    font-size: 1.75rem !important;

    line-height: 1.25 !important;

    margin-bottom: 18px !important;

    text-align: center !important;
  }


  .about-content-frame h3 {
    font-size: 1.5rem !important;

    line-height: 1.3 !important;

    margin-bottom: 10px !important;

    text-align: center !important;
  }


  .about-content-frame h4 {
    font-size: 0.88rem !important;

    line-height: 1.45 !important;

    letter-spacing: 0.3px !important;

    margin-bottom: 18px !important;

    text-align: center !important;
  }


  .about-content-frame p {
    font-size: 0.98rem !important;

    line-height: 1.65 !important;

    text-align: center !important;
  }


  /* =======================================================
     MOBILE IMAGE
  ======================================================= */

  .about-media-frame {
    width: 100% !important;

    display: flex !important;

    justify-content: center !important;

    align-items: center !important;
  }


  .about-media-frame img {
    width: 100% !important;

    max-width: 330px !important;

    height: auto !important;

    margin-left: auto !important;
    margin-right: auto !important;

    border-radius: 22px !important;
  }


  /* =======================================================
     MOBILE CALLOUT
  ======================================================= */

  .iv-callout-box {
    width: 100% !important;

    max-width: 100% !important;

    padding: 25px 20px !important;

    border-left-width: 4px !important;

    box-sizing: border-box !important;
  }


  .iv-callout-box p {
    font-size: 1rem !important;

    line-height: 1.6 !important;
  }
}


/* =========================================================
   VERY SMALL PHONES
   400px and below
========================================================= */

@media (max-width: 400px) {

  .about-split-grid {
    padding-left: 12px !important;

    padding-right: 12px !important;

    gap: 25px !important;
  }


  .about-content-frame h2 {
    font-size: 1.6rem !important;
  }


  .about-content-frame h3 {
    font-size: 1.35rem !important;
  }


  .about-content-frame h4 {
    font-size: 0.82rem !important;
  }


  .about-content-frame p {
    font-size: 0.95rem !important;

    line-height: 1.6 !important;
  }


  .iv-callout-box {
    padding: 22px 17px !important;
  }


  .iv-callout-box p {
    font-size: 0.95rem !important;
  }


  .about-media-frame img {
    width: 100% !important;

    max-width: 280px !important;

    border-radius: 18px !important;
  }
}


/* =========================================================
   BOX SIZING
========================================================= */

.about-split-grid *,
.about-split-grid *::before,
.about-split-grid *::after,
.iv-callout-box *,
.iv-callout-box *::before,
.iv-callout-box *::after {
  box-sizing: border-box;
}


/* =========================================================
   IMAGE SAFETY
========================================================= */

.about-media-frame img {
  max-width: 100%;
}


/* =========================================================
   PREVENT HORIZONTAL SCROLL
========================================================= */

#leadership-target {
  max-width: 100%;

  overflow-x: hidden;
}
</style>



 <!-- Section 2: Mission Statement Highlight Block (Centered Tooltip Style) -->
<div style="background-color: #ffffff; width: 100%; padding: 80px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); display: flex; justify-content: center;">
  <section style="max-width: 1450px; width: 100%; margin: 0 auto; padding: 0 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    
    <!-- Centralized Container Wrapper (Bypasses side grids entirely) -->
    <div class="about-content-frame" style="max-width: 950px; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center !important;">
      
      <h2 style="color: var(--purple-primary, #3E0D5F); margin: 0 auto 20px auto; font-weight: 800; font-size: 2.2rem; letter-spacing: -0.5px; text-align: center !important;">Our Mission Statement</h2>
      
      <!-- Transformed Tooltip Card (Centered Frame Context with requested 4px left line) -->
      <div class="iv-callout-box" style="background: rgba(138, 52, 159, 0.03); border-left: 4px solid var(--green-secondary, #2bb673); padding: 40px 35px; border-radius: 0 16px 16px 0; box-shadow: 0 10px 35px rgba(62,13,95,0.02); box-sizing: border-box; width: 100%; text-align: center !important; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <p style="font-size: 1.1rem; font-style: italic; color: var(--purple-accent); line-height: 1.65; margin: 0 0 15px 0; font-weight: 600; text-align: center !important; width: 100%;">
          "At ReNew You Health & Wellness, our mission is to deliver elite, compassionate, and personalized clinical care that seamlessly integrates whole-person prevention metrics with modern convenience."
        </p>
      </div>

    </div>

  </section>
</div>

      <!-- Section 3: Founders Intro Banner -->
      <section style="max-width: 1450px; margin: 0 auto; padding: 80px 20px 20px 20px; box-sizing: border-box; text-align: center;">
        <h2 style="margin: 0 0 10px 0; font-weight: 800; color: var(--purple-primary); font-size: 2.4rem; letter-spacing: -0.5px;">Founders & Leadership</h2>
        <p style="color: #666; max-width: 650px; margin: 0 auto; font-size: 16px; line-height: 1.5;">
          Together, our focus is helping patients feel comfortable, educated, and supported while working toward better health and wellness.
        </p>
      </section>

      <!-- Section 4: Angela Y. Martin Bio Panel (Image LEFT) -->
      <section style="max-width: 1450px; margin: 0 auto; padding: 40px 20px; box-sizing: border-box;">
        <div class="about-split-grid">
          <!-- Image LEFT -->
          <div class="about-media-frame">
            <img src="images/martin, a.png" style="box-shadow: 0 8px 25px rgba(62,13,95,0.06); border-radius: 24px;" alt="Angela Y. Martin, MSN, APRN-FPA, FNP-C at ReNew You Health & Wellness" loading="lazy" decoding="async">
          </div>
          <!-- Text RIGHT -->
          <div class="about-content-frame">
            <h3 style="color: var(--purple-primary, #3E0D5F); font-size: 1.8rem; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.5px;">Angela Y. Martin, MSN, APRN-FPA, FNP-C</h3>
            <h4 style="color: var(--green-secondary, #2bb673); font-weight: 700; font-size: 1.05rem; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.5px;">Founder / Board-Certified Family Nurse Practitioner</h4>
            <p style="font-size: 15px; line-height: 1.65; color: #4A4A4A; margin: 0;">
Angela Y. Martin, MSN, APRN-FPA, FNP-C, is an experienced Family Nurse Practitioner with over 15 years in healthcare. She is dedicated to helping individuals improve their health through compassionate, personalized care. Angela believes quality healthcare begins with listening, taking time to understand each patient’s concerns and health goals. Her approach includes not only treating current issues but also focusing on prevention, education, and empowering patients in their well-being. With a strong clinical background, she cares for patients in various settings. As the Nurse Practitioner at ReNew You Health & Wellness, her goal is to create a welcoming environment where patients feel heard and confident. Angela’s philosophy is that healthcare should be personal, accessible, and compassionate, focusing on the whole person.  She is committed to helping every patient achieve renewed health and overall wellness.</p>
          </div>
        </div>
      </section>
      <!-- Section 5: LaToya Newman Bio Panel (Image RIGHT) -->
      <div style="background-color: #ffffff; width: 100%; padding: 60px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
        <section style="max-width: 1450px; margin: 0 auto; padding: 0 20px; box-sizing: border-box;">
          <div class="about-split-grid reverse-mobile" style="grid-template-columns: 1.2fr 0.8fr;">
            <!-- Text LEFT -->
        <div class="about-content-frame">
  <h3 style="color: var(--purple-primary, #3E0D5F); font-size: 1.8rem; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.5px;">LaToya Newman, MBA, CPA, BFA</h3>
  <h4 style="color: var(--green-secondary, #2bb673); font-weight: 700; font-size: 1.05rem; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.5px;">Co-Founder, Operations, Finance & Strategic Growth Director</h4>
  <p style="font-size: 15px; line-height: 1.65; color: #4A4A4A; margin: 0;">
    LaToya Newman is the Co-Founder, Director of Operations and Finance, and Strategic Growth Director at ReNew You Health & Wellness. With a strong background in business management, finance, accounting, and entrepreneurship, she helps oversee the practice’s operations, financial management, and continued growth.

Working alongside Angela Martin, APRN, FNP-C, LaToya is committed to creating a professional, welcoming, and patient centered healthcare experience.

LaToya also brings healthcare experience as a Medical Assistant and Certified DOT Drug & Alcohol Collector, allowing her to support patient services and contribute to the continued growth of ReNew You Health & Wellness.

By combining her business and financial expertise with hands-on healthcare experience, LaToya helps strengthen both the operational and patient-service sides of the practice while supporting its mission to provide quality, compassionate care to the community.
  </p>
</div>

            <!-- Image RIGHT -->
            <div class="about-media-frame">
              <img src="images/newman, l.png" style="box-shadow: 0 8px 25px rgba(62,13,95,0.06); border-radius: 24px;" alt="LaToya Newman, MBA, CPA, BFA, ReNew You Health & Wellness leadership" loading="lazy" decoding="async">
            </div>
          </div>
        </section>
      </div>
    </main>
  `;

  container.innerHTML = htmlContent;
}
