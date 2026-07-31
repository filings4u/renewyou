/** * ReNew You Health & Wellness - Healthcare Metrics Controller * Location: assets/js/metrics.js */ 
document.addEventListener('DOMContentLoaded', () => { 
    renderMetricsPanel(); 
}); 

/** * Renders a data-driven clinical and wellness metrics dashboard panel */ 
function renderMetricsPanel() { 
    const target = document.getElementById('metrics-target'); 
    if (!target) return; 

    // Core clinic impact metrics data array 
    const metricsData = [ 
        { 
            value: "98%", 
            label: "Patient Satisfaction", 
            description: "Consistently rated excellent for compassionate care and clear medical guidance.", 
            icon: "🧬" 
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
            <div class="metric-icon-box" style="font-size: 1.8rem; padding: 12px; border-radius: 14px; line-height: 1; display: flex; align-items: center; justify-content: center;"> 
                ${metric.icon} 
            </div> 
            <!-- Text Content --> 
            <div class="metric-text-box" style="display: flex; flex-direction: column; gap: 4px;"> 
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
        <div class="metrics-section-outer" style="background-color: var(--bg-offwhite); padding: 40px 20px; border-top: 1px solid rgba(138, 52, 159, 0.05); border-bottom: 1px solid rgba(138, 52, 159, 0.05); width: 100%; box-sizing: border-box;"> 
            <style>
                /* Mobile Architecture Match for Metrics Module */
                @media (max-width: 768px) {
                    .metrics-section-outer {
                        padding: 25px 15px !important;
                    }
                    .metrics-container {
                        flex-direction: column !important;
                        gap: 15px !important;
                    }
                    
                    /* Reconfigure card to use a balanced vertical alignment mapping */
                    .metric-card {
                        flex-direction: column !important;
                        align-items: center !important;
                        text-align: center !important;
                        padding: 25px 20px !important;
                        gap: 12px !important;
                    }
                    
                    /* Align icons perfectly on the center line */
                    .metric-icon-box {
                        font-size: 1.6rem !important;
                        padding: 0 !important;
                        margin: 0 auto !important;
                    }
                    
                    /* Fluid typography compression adjustments */
                    .metric-text-box span {
                        font-size: 1.85rem !important;
                    }
                    .metric-text-box strong {
                        font-size: 1.05rem !important;
                    }
                    .metric-text-box p {
                        font-size: 0.9rem !important;
                        margin-top: 4px !important;
                        line-height: 1.45 !important;
                    }
                }
            </style>

            <div class="metrics-container" style="max-width: 1450px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 25px; justify-content: space-between;"> 
                ${metricsHtml} 
            </div> 
        </div> 
    `; 
}
