/**
 * ReNew You Health & Wellness - Services Page Controller
 * Location: assets/js/services.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderMedicalServices();
});

/**
 * Generates and injects the comprehensive clinical care catalog into the layout target
 */
function renderMedicalServices() {
    const gridTarget = document.getElementById('services-grid-target');
    if (!gridTarget) return;

    // Ordered catalog mapping all structured services from your brand brief
    const services = [
        {
            title: "Weight Management",
            description: "Personalized support, nutrition guidance, follow-up care, body composition tracking, and wellness injections.",
            icon: "⚖️"
        },
        {
            title: "Acute Care",
            description: "Convenient care for common illnesses including flu-like symptoms, sinus infections, ear infections, bronchitis, conjunctivitis, UTIs, and more.",
            icon: "🩺"
        },
        {
            title: "Preventative Care",
            description: "Screenings and wellness support including blood pressure, diabetes, cholesterol, and routine health checks.",
            icon: "🛡️"
        },
        {
            title: "Vitamin Therapy",
            description: "B12, MIC, Vitamin D, and wellness injection options to support energy and overall wellness goals.",
            icon: "💧"
        },
        {
            title: "Physicals & Testing",
            description: "Sports physicals, employment physicals, drug testing, DOT testing, and other required screenings.",
            icon: "📋"
        },
        {
            title: "Telemedicine",
            description: "Convenient virtual visits for eligible services, follow-ups, and ongoing care support.",
            icon: "💻"
        }
    ];

    let htmlContent = '';

    services.forEach(item => {
        htmlContent += `
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="font-size: 2.5rem; margin-bottom: 15px; color: var(--purple-accent);">${item.icon}</div>
                    <h3 style="color: var(--purple-primary); margin-bottom: 12px; font-size: 1.3rem;">${item.title}</h3>
                    <p style="font-size: 0.95rem; line-height: 1.6; color: #555; margin-bottom: 25px; text-align: left;">${item.description}</p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <a href="contact.html" style="text-decoration: none; flex: 1;">
                        <button style="width: 100%; padding: 10px 15px; font-size: 0.9rem;">Book Appointment</button>
                    </a>
                    <a href="contact.html?subject=${encodeURIComponent(item.title)}" style="text-decoration: none; flex: 1;">
                        <button style="width: 100%; padding: 10px 15px; font-size: 0.9rem; background: transparent; color: var(--purple-accent); border: 2px solid var(--purple-accent); box-shadow: none;">Request Info</button>
                    </a>
                </div>
            </div>
        `;
    });

    gridTarget.innerHTML = htmlContent;
}
