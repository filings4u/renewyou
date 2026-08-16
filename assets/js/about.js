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
          .about-split-grid {
            display: grid;
            grid-template-columns: 0.8fr 1.2fr;
            align-items: center;
            gap: 50px;
            width: 100%;
          }
          .about-media-frame {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .about-media-frame img {
            width: 100%;
            max-width: 480px;
            height: auto;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(62,13,95,0.04);
            display: block;
          }
          .about-content-frame {
            text-align: left;
          }
            @media (max-width: 992px) {
      .about-split-grid {
        grid-template-columns: 1fr !important;
        gap: 35px !important;
      }
      .about-split-grid.reverse-mobile {
        display: flex !important;
        flex-direction: column-reverse !important;
      }
      .about-content-frame {
        text-align: center !important;
      }
      /* FIXED: Targets headings inside the split layout to gracefully downsize on mobile screens */
      .about-content-frame h1 {
        font-size: 1.85rem !important;
        margin-bottom: 15px !important;
      }
      .about-content-frame h2 {
        font-size: 1.65rem !important;
        margin-bottom: 15px !important;
      }
      .about-content-frame h3 {
        font-size: 1.45rem !important;
      }
      /* FIXED: Tightens body paragraph type sizing and internal padding for tight viewports */
      .about-content-frame p {
        font-size: 0.95rem !important;
        line-height: 1.55 !important;
      }
      /* FIXED: Specifically scales down the text sizes inside the centered mission tooltip box */
      .iv-callout-box p {
        font-size: 1.15rem !important; /* Shrunk down from 1.4rem quote size */
      }
      .iv-callout-box p + p {
        font-size: 0.9rem !important; /* Shrunk down from 15.5px description size */
        line-height: 1.5 !important;
      }
      .about-media-frame img {
        max-width: 310px !important; /* Marginally downsized for a tighter layout aspect ratio */
      }
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
            <img src="images/martin, a.png" style="box-shadow: 0 8px 25px rgba(62,13,95,0.06); border-radius: 24px;" alt="Angela Y. Martin, MSN, APRN-FPA, FNP-C Profile Portrait">
          </div>
          <!-- Text RIGHT -->
          <div class="about-content-frame">
            <h3 style="color: var(--purple-primary, #3E0D5F); font-size: 1.8rem; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.5px;">Angela Y. Martin, MSN, APRN-FPA, FNP-C</h3>
            <h4 style="color: var(--green-secondary, #2bb673); font-weight: 700; font-size: 1.05rem; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.5px;">Founder / Board-Certified Family Nurse Practitioner</h4>
            <p style="font-size: 15px; line-height: 1.65; color: #4A4A4A; margin: 0;">
              Angela Y. Martin, MSN, APRN-FPA, FNP-C is a dedicated and experienced Family Nurse Practitioner with more than 15 years of experience in the healthcare field. Throughout her career, she has remained committed to helping individuals improve their health, feel their best, and receive compassionate, personalized care. Angela believes that quality healthcare begins with listening. She takes the time to understand each patient’s concerns, health goals, lifestyle, and individual needs while creating realistic and personalized plans of care. Her approach focuses not only on treating current health concerns but also on prevention, education, and empowering patients to take an active role in their overall well-being. With experience caring for patients across a variety of healthcare settings, Angela brings a strong clinical background and a patient-centered approach to every visit. She is passionate about preventive care, weight management, wellness, acute care, and helping patients achieve sustainable improvements in their health. As the Nurse Practitioner behind ReNew You Health & Wellness, Angela’s goal is to provide a welcoming and supportive environment where patients feel heard, respected, and confident in their healthcare decisions. Her philosophy is simple: healthcare should be personal, accessible, compassionate, and focused on the whole person—not just the condition. At ReNew You Health & Wellness, Angela is committed to helping every patient take meaningful steps toward renewed health, confidence, and overall wellness.
            </p>
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
  <h4 style="color: var(--green-secondary, #2bb673); font-weight: 700; font-size: 1.05rem; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.5px;">Operations, Finance & Strategic Growth Director</h4>
  <p style="font-size: 15px; line-height: 1.65; color: #4A4A4A; margin: 0;">
    LaToya Newman is the Co-Owner and Director of Operations at ReNew You Health & Wellness. With a strong background in business management, finance, accounting, and entrepreneurship, she helps oversee the practice’s operations, financial management, and continued growth.

Working alongside Angela Martin, APRN, FNP-C, LaToya is committed to creating a professional, welcoming, and patient centered healthcare experience.

LaToya also brings healthcare experience as a Medical Assistant and Certified DOT Drug & Alcohol Collector, allowing her to support patient services and contribute to the continued growth of ReNew You Health & Wellness.

By combining her business and financial expertise with hands-on healthcare experience, LaToya helps strengthen both the operational and patient-service sides of the practice while supporting its mission to provide quality, compassionate care to the community.
  </p>
</div>

            <!-- Image RIGHT -->
            <div class="about-media-frame">
              <img src="images/newman, l.png" style="box-shadow: 0 8px 25px rgba(62,13,95,0.06); border-radius: 24px;" alt="LaToya Newman, MBA, CPA, BFA Profile Portrait">
            </div>
          </div>
        </section>
      </div>
    </main>
  `;

  container.innerHTML = htmlContent;
}
