// --- 1. CONFIGURATION ---
const SUPABASE_URL = "https://lrbimrlbskjweynxlgas.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyYmltcmxic2tqd2V5bnhsZ2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjQ0NTYsImV4cCI6MjA5NDEwMDQ1Nn0.I8fQ6ZjA9oaTqJCF-7Z7vUboXC8zv2cogBv4PC_1ihU"; 
const LAUNCH_DATE_STRING = "December 31, 2026 00:00:00";

// --- 2. INITIALIZATION (Fixed: Renamed variable to avoid naming conflicts) ---
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const targetDate = new Date(LAUNCH_DATE_STRING).getTime();

// --- 3. DOM ELEMENT REFERENCES ---
const form = document.getElementById('signupForm');
const emailInput = document.getElementById('emailInput');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

// --- 4. DATA HANDLING (SUPABASE) ---
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailValue = emailInput.value.trim();
    
    // Set Pending State UI
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";
    formMessage.className = "message";
    formMessage.innerText = "";

    try {
        // Using our renamed distinct database client instance
        const { error } = await supabaseClient
            .from('Renew You Health Leads')
            .insert([{ email: emailValue }]);

        if (error) {
            if (error.code === '23505') throw new Error("This email is already registered!");
            throw error;
        }

        // Handle Success State
        formMessage.innerText = "Thank you! We will notify you when we launch.";
        formMessage.classList.add('success');
        form.reset();

    } catch (err) {
        // Handle Error State
        formMessage.innerText = err.message || "An unexpected error occurred. Please try again.";
        formMessage.classList.add('error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Notify Me";
    }
});

// --- 5. TIMER ENGINE ---
function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.querySelector(".countdown-container").innerHTML = 
            "<div class='countdown-box' style='flex:1;'><span class='countdown-number'>We are live!</span></div>";
        clearInterval(timerInterval);
        return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d < 10 ? "0" + d : d;
    document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
    document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
    document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
}

// Start Timer
updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);
