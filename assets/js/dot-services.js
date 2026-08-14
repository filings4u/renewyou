/**
 * DOT Drug Testing - Services Component
 * Location: assets/js/dot-services.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('dot-services-target');
    if (!target) return;

    const services = [
        {
            title: "Pre-Employment Screening",
            desc: "Verified rapid screenings required prior to placing any safety-sensitive professional into active service rotation.",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px;color:var(--purple-accent);"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11l-3 3-2-2"/></svg>`
        },
        {
            title: "Random Testing Pools",
            desc: "Scientifically randomized selection program management satisfying annual agency quota thresholds cleanly.",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px;color:var(--purple-accent);"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>`
        },
        {
            title: "Post-Accident Protocol",
            desc: "Time-critical collection services executed securely to fulfill legal mandates following road or operations incidents.",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px;color:var(--purple-accent);"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
        },
        {
            title: "Reasonable Suspicion",
            desc: "Objective, regulatory-aligned diagnostic support to safely handle supervisor-referred workplace scenarios.",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px;color:var(--purple-accent);"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`
        }
    ];

    const gridHtml = services.map(s => `
        <div style="background:#fff; border-radius:20px; padding:35px 25px; border:1px solid rgba(138,52,159,0.06); box-shadow:0 10px 30px rgba(62,13,95,0.01);">
            <div style="width:48px; height:48px; background:rgba(138,52,159,0.04); border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:20px;">
                ${s.icon}
            </div>
            <h3 style="color:var(--purple-primary); font-size:1.25rem; font-weight:800; margin:0 0 12px 0;">${s.title}</h3>
            <p style="color:#555; font-size:0.95rem; line-height:1.6; margin:0;">${s.desc}</p>
        </div>
    `).join('');

    target.innerHTML = `
        <div style="padding:60px 20px; max-width:1450px; margin:0 auto; box-sizing:border-box;">
            <div style="text-align:center; margin-bottom:45px;">
                <h2 style="font-size:2.2rem; color:var(--purple-primary); font-weight:800; margin:0 0 10px 0;">Comprehensive Compliance Testing</h2>
                <p style="color:#555; font-size:1.05rem; max-width:650px; margin:0 auto; line-height:1.6;">Full-service diagnostics performed by certified collectors to satisfy federal workplace criteria.</p>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:25px;">${gridHtml}</div>
        </div>
    `;
});
