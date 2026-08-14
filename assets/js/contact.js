/**
 * ReNew You Health & Wellness - Contact Form & Map Controller (Supabase Connected)
 * Location: assets/js/contact.js
 */
document.addEventListener('DOMContentLoaded', () => {
    prefillSubjectFromUrl();
    initContactForm();
    initGoogleMap();
});

// Configure your active Supabase function routing tokens here
const SUPABASE_PROJECT_URL = "https://lrbimrlbskjweynxlgas.supabase.co";
const CONTACT_FUNCTION_ENDPOINT = `${SUPABASE_PROJECT_URL}/functions/v1/submit-contact-inquiry`;

/**
 * Automatically prefills the message box if a patient clicks "Request Info" on a specific service
 */
function prefillSubjectFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject');
    const messageTextarea = document.getElementById('contactMessage');
    if (subject && messageTextarea) {
        messageTextarea.value = `Hello, I would like to request more information regarding your ${decodeURIComponent(subject)} services.`;
    }
}
/**
 * Handles validation, locking, and asynchronous delivery to your secure Supabase endpoint
 */
function initContactForm() {
    const form = document.getElementById('clinicContactForm');
    const submitBtn = document.getElementById('contactSubmitBtn');
    const messageDiv = document.getElementById('contactFormMessage');
    if (!form || !submitBtn || !messageDiv) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Lock inputs to prevent multi-click mutation submission loops
        submitBtn.disabled = true;
        messageDiv.innerText = "Transmitting inquiry payload safely to secure clinic servers...";
        messageDiv.style.color = 'var(--purple-accent)';
        messageDiv.style.display = 'block';

        // Collect fields dynamically matching your edge receiver map rules
        const payload = {
            name: document.getElementById('contactName').value.trim(),
            phone: document.getElementById('contactPhone').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            message: document.getElementById('contactMessage').value.trim()
        };

        try {
            const response = await fetch(CONTACT_FUNCTION_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Secure network routing transaction failed.');

            // Success feedback initialization
            messageDiv.textContent = "Thank you! Your message has been sent successfully. We will reach out to you shortly.";
            messageDiv.style.color = 'var(--green-primary)';
            form.reset();

        } catch (error) {
            // Anomaly fallback mitigation logic path
            messageDiv.textContent = "Unable to deliver message right now. Please call our clinic directly at 708-329-2155.";
            messageDiv.style.color = '#d32f2f';
        } finally {
            submitBtn.disabled = false;
        }
    });
}

/**
 * Injects a highly responsive, clean embedded Google Map iframe matching the clinic coordinates
 */
function initGoogleMap() {
    const mapContainer = document.getElementById('map-iframe-target');
    if (!mapContainer) return;

    // Direct clinical embed pointer for 500 Ashland Ave, Chicago Heights, IL
    mapContainer.innerHTML = `
        <iframe 
            src="https://google.com" 
            width="100%" 
            height="450" 
            style="border:0; border-radius:15px; box-shadow:0 4px 15px rgba(0,0,0,0.05);" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    `;
}
