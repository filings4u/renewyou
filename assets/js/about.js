/**
 * ReNew You Health & Wellness - About Page Controller
 * Location: assets/js/about.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderLeadershipTeam();
});

/**
 * Dynamically loads operational and clinical leadership details into the page layout
 */
function renderLeadershipTeam() {
    const container = document.getElementById('leadership-target');
    if (!container) return;

    // Direct object structure matching your brand brief requirements
    const team = [
        {
            name: "Angela Y. Martin, APRN, FNP-C",
            role: "Founder / Board-Certified Family Nurse Practitioner",
            description: "Angela Y. Martin is committed to providing patient-centered care with compassion, professionalism, and respect. She focuses on establishing individual paths to wellness, active community health deployment, and evidence-based medicine."
        },
        {
            name: "LaToya Newman, MBA, CPA, BFA",
            role: "Operations, Finance & Strategic Growth Director",
            description: "LaToya Newman oversees operational efficiencies, financial health, and community partnerships, ensuring an exceptional, unified patient experience and a welcoming professional clinic environment."
        }
    ];

    let htmlContent = '';

    team.forEach(member => {
        htmlContent += `
            <div class="card" style="margin-bottom: 20px; border-left: 5px solid var(--purple-accent);">
                <h3 style="color: var(--purple-primary); margin-bottom: 5px;">${member.name}</h3>
                <h4 style="color: var(--green-secondary); margin-bottom: 15px; font-weight: 600; font-size: 1rem;">${member.role}</h4>
                <p style="font-size: 0.95rem; margin: 0; color: #555; max-width: 100%; text-align: left;">${member.description}</p>
            </div>
        `;
    });

    container.innerHTML = htmlContent;
}
