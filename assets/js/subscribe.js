/** * ReNew You Health & Wellness - Email Subscription List Capture Controller * Location: assets/js/subscribe.js */ 
document.addEventListener('DOMContentLoaded', () => { 
    renderSubscribeModule(); 
    setupNewsletterForm(); 
}); 

/** * Renders a modern healthcare email subscription capture banner on a single row */ 
function renderSubscribeModule() { 
    const target = document.getElementById('subscribe-target'); 
    if (!target) return; 
    target.innerHTML = ` 
        <!-- EMAIL SUBSCRIPTION LIST CAPTURE MODULE --> 
        <div style="background-color: #F9F9F8; padding: 20px 20px 20px; width: 100%; box-sizing: border-box; border-top: 1px solid rgba(138, 52, 159, 0.04); position: relative; overflow: hidden;"> 
            <!-- Soft Clinic Background Blur Accent --> 
            <div style="position: absolute; bottom: -50px; left: -50px; width: 350px; height: 350px; background: radial-gradient(circle, rgba(79,148,12,0.02) 0%, rgba(255,255,255,0) 70%); pointer-events: none;"></div> 
            
            <style>
                /* Mobile Architecture Match for Subscription Module */
                @media (max-width: 768px) {
                    /* Condense inner container padding */
                    .subscribe-inner-box {
                        padding: 35px 20px !important;
                        gap: 30px !important;
                    }
                    
                    /* Balanced Text Area Adjustments */
                    .subscribe-text-block {
                        min-width: 100% !important;
                        text-align: center !important;
                    }
                    .subscribe-text-block h2 {
                        font-size: 1.65rem !important;
                        margin-bottom: 10px !important;
                    }
                    .subscribe-text-block p {
                        font-size: 0.95rem !important;
                        line-height: 1.5 !important;
                    }
                    
                    /* Form Container Adjustments */
                    .subscribe-form-block {
                        min-width: 100% !important;
                    }
                    
                    /* Flatten pill container into stacked fields for ease of input */
                    .subscribe-form-block .form-group {
                        flex-direction: column !important;
                        background-color: transparent !important;
                        border: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                        gap: 12px !important;
                    }
                    
                    /* Separate input style layout */
                    .subscribe-form-block input {
                        width: 100% !important;
                        background-color: var(--bg-white) !important;
                        border: 1px solid rgba(138, 52, 159, 0.15) !important;
                        border-radius: 50px !important;
                        padding: 14px 20px !important;
                        text-align: center !important;
                    }
                    
                    /* Separate action button style layout */
                    .subscribe-form-block button {
                        width: 100% !important;
                        padding: 14px 20px !important;
                    }
                    
                    #newsletterMessage {
                        font-size: 0.88rem !important;
                    }
                }
            </style>
            <div style="max-width: 1450px; margin: 0 auto;"> 
                <!-- NEW SINGLE ROW FLEX WRAPPER --> 
                <div class="subscribe-inner-box" style="background: #F9F9F8; border: 0px solid rgba(138, 52, 159, 0.06); padding: 60px 50px; border-radius: 32px; box-shadow: 0 15px 45px rgba(62,13,95,0.01); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 50px; box-sizing: border-box;"> 
                    
                    <!-- Left Side Column: Narrative Typography Block --> 
                    <div class="subscribe-text-block" style="flex: 1.2; min-width: 400px; text-align: left; box-sizing: border-box;"> 
                        <span style="color: var(--green-secondary); font-weight: 700; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 2px; display: inline-block; background-color: rgba(79, 148, 12, 0.06); padding: 5px 14px; border-radius: 20px; margin-bottom: 16px;"> Stay Connected </span> 
                        <h2 style="font-size: 2.2rem; color: var(--purple-primary); font-weight: 800; margin: 0 0 12px 0; letter-spacing: -0.5px; line-height: 1.2;"> Join Our Wellness Community </h2> 
                        <p style="color: #555; font-size: 1.05rem; margin: 0; line-height: 1.6;"> Sign up to receive clinic announcements, preventative health insights, medical updates, and modern wellness advice delivered directly from our medical providers. </p> 
                    </div> 

                    <!-- Right Side Column: Form Field Interaction Block --> 
                    <div class="subscribe-form-block" style="flex: 1; min-width: 380px; box-sizing: border-box;"> 
                        <form id="homeNewsletterForm" style="margin: 0;"> 
                            <div class="form-group" style="display: flex; gap: 12px; align-items: center; background-color: var(--bg-white); padding: 6px; border: 1px solid rgba(138, 52, 159, 0.15); border-radius: 50px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.01);"> 
                                <!-- Modern Borderless Embedded Input Field --> 
                                <input type="email" id="newsletterEmail" placeholder="Enter your email address" required aria-label="Email address" style="flex: 1; padding: 14px 20px; border: none; font-size: 1rem; outline: none; background: transparent; color: var(--purple-primary); box-sizing: border-box;"> 
                                <!-- Modern Premium Pill Action Button --> 
                                <button type="submit" id="newsletterSubmitBtn" style="padding: 16px 28px; font-size: 1rem; font-weight: 700; border-radius: 50px; background: linear-gradient(135deg, var(--purple-primary), var(--purple-accent)); color: white; border: none; cursor: pointer; box-shadow: 0 6px 15px rgba(62,13,95,0.1); white-space: nowrap; box-sizing: border-box; transition: all 0.3s ease;"> Subscribe Now </button> 
                            </div> 
                        </form> 
                        <!-- Status Notification Box --> 
                        <div id="newsletterMessage" class="message" style="margin-top: 15px; font-size: 0.95rem; font-weight: 600; padding: 10px; border-radius: 12px; display: none; text-align: center;"></div> 
                    </div> 
                </div> 
            </div> 
        </div> 
    `; 
} 
/** * Handles newsletter frontend form validation and database insertion mapping */ 
function setupNewsletterForm() { 
    const form = document.getElementById('homeNewsletterForm'); 
    const msgBox = document.getElementById('newsletterMessage'); 
    if (!form || !msgBox) return; 
    
    form.addEventListener('submit', async (e) => { 
        e.preventDefault(); 
        const emailInput = document.getElementById('newsletterEmail'); 
        const submitBtn = document.getElementById('newsletterSubmitBtn'); 
        if (!emailInput || !submitBtn) return; 
        
        const emailValue = emailInput.value.trim(); 
        if (emailValue === "") return; 
        
        // Visual loading state 
        submitBtn.disabled = true; 
        submitBtn.innerText = "Connecting..."; 
        
        // Define credentials accurately within block 
        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyYmltcmxic2tqd2V5bnhsZ2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjQ0NTYsImV4cCI6MjA5NDEwMDQ1Nn0.I8fQ6ZjA9oaTqJCF-7Z7vUboXC8zv2cogBv4PC_1ihU'; 
        const API_ENDPOINT = 'https://lrbimrlbskjweynxlgas.supabase.co'; 
        try { 
            const payload = { email: emailValue }; 
            const response = await fetch(API_ENDPOINT, { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json', 
                    'Prefer': 'return=minimal', 
                    'apikey': SUPABASE_KEY, 
                    'Authorization': `Bearer ${SUPABASE_KEY}` 
                }, 
                body: JSON.stringify(payload) 
            }); 
            
            // Reveal notification element 
            msgBox.style.display = "block"; 
            if (response.ok) { 
                // Success State 
                msgBox.style.backgroundColor = "rgba(79, 148, 12, 0.08)"; 
                msgBox.style.color = "var(--green-secondary)"; 
                msgBox.style.border = "1px solid rgba(79, 148, 12, 0.15)"; 
                msgBox.innerText = "✓ Welcome! You have been successfully added to our clinical wellness network."; 
                form.reset(); 
            } else { 
                // Parse potential error codes sent back by PostgREST 
                const errorData = await response.json(); 
                if (errorData.code === "23505" || (errorData.message && errorData.message.includes("unique"))) { 
                    msgBox.style.backgroundColor = "rgba(138, 52, 159, 0.06)"; 
                    msgBox.style.color = "var(--purple-accent)"; 
                    msgBox.style.border = "1px solid rgba(138, 52, 159, 0.15)"; 
                    msgBox.innerText = "This email address is already subscribed to our network."; 
                } else { 
                    throw new Error("Database insertion failure."); 
                } 
            } 
        } catch (error) { 
            // General Network/Server Fallback Error State 
            msgBox.style.display = "block"; 
            msgBox.style.backgroundColor = "rgba(255, 0, 0, 0.05)"; 
            msgBox.style.color = "#cc0000"; 
            msgBox.style.border = "1px solid rgba(255, 0, 0, 0.1)"; 
            msgBox.innerText = "⚠️ Connection error. Please try again or contact support."; 
            console.error("Database Error:", error); 
        } finally { 
            // Reset button visual state 
            submitBtn.disabled = false; 
            submitBtn.innerText = "Subscribe Now"; 
        } 
    }); 
}
