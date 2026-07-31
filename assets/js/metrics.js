/**
 * ReNew You Health & Wellness - Healthcare Metrics Controller
 * Location: assets/js/metrics.js
 */

document.addEventListener('DOMContentLoaded', () => {
    renderMetricsPanel();
});

/**
 * Renders a data-driven clinical and wellness metrics dashboard panel
 */
function renderMetricsPanel() {
    // Looks for a target div with id 'metrics-target' right below your hero container
    const target = document.getElementById('metrics-target');
    if (!target) return;

    // Core clinic impact metrics data array
    const metricsData = [
        {
            value: "98%",
            label: "Patient Satisfaction",
            description: "Consistently rated excellent for compassionate care and clear medical guidance.",
            icon: "🧬" // Can be swapped out for an SVG icon
        },
        {
            value: "15 Min",
            label: "Average Wait Time",
            description: "Direct-to-provider structural workflows that completely respect your daily schedule.",
            icon: "⏱️"
        },
        {
            value: "1,200+",
            label: "Patients Supported",
            description: "Proudly optimizing metabolic, weight, and preventative health profiles locally.",
            icon: "🩺"
        }
    ];

    // Generate inner grid items
    const metricsHtml = metricsData.map(metric => `
        <div class="metric-card" style="flex: 1; min-width: 280px; background: var(--bg-white); padding: 30px; border-radius: 20px; border: 1px solid rgba(138, 52, 159, 0.08); box-shadow: 0 10px 30px rgba(62, 13, 95, 0.02); display: flex; gap: 20px; align-items: flex-start; box-sizing: border-box;">
            <!-- Icon Container -->
            <div style="font-size: 1.8rem; background: rgba(138, 52, 159, 0.05); padding: 12px; border-radius: 14px; line-height: 1; display: flex; align-items: center; justify-content: center;">
                ${metric.icon}
            </div>
            <!-- Text Content -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 2.2rem; font-weight: 800; color: var(--purple-accent); line-height: 1.1;">
                    ${metric.value}
                </span>
                <strong style="font-size: 1.1rem; color: var(--purple-primary); font-weight: 700; margin-top: 2px;">
                    ${metric.label}
                </strong>
                <p style="font-size: 0.95rem; color: #666; line-height: 1.5; margin: 6px 0 0 0;">
                    ${metric.description}
                </p>
            </div>
        </div>
    `).join('');

    // Inject layout wrapper matching the 1450px alignment
    target.innerHTML = `
        <div style="background-color: var(--bg-offwhite); padding: 40px 20px; border-top: 1px solid rgba(138, 52, 159, 0.05); border-bottom: 1px solid rgba(138, 52, 159, 0.05); width: 100%; box-sizing: border-box;">
            <div class="metrics-container" style="max-width: 1450px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 25px; justify-content: space-between;">
                ${metricsHtml}
            </div>
        </div>
    `;
}
