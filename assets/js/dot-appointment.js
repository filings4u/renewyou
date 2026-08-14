/**
 * DOT Drug Testing - Responsive Mobile-Friendly Appointment Scheduler Script
 * Location: assets/js/dot-appointment.js
 */
document.addEventListener('DOMContentLoaded', () => {
    // SUPABASE SETUP PARAMETERS
    const SUPABASE_PROJECT_URL = "https://lrbimrlbskjweynxlgas.supabase.co";
    const EDGE_FUNCTION_ENDPOINT = `${SUPABASE_PROJECT_URL}/functions/v1/submit-dot-appointment`;

    const target = document.getElementById('dot-appointment-target');
    if (!target) return;

    target.innerHTML = `
        <style>
            .booking-outer-wrapper {
                max-width: 1100px;
                margin: 40px auto;
                padding: 0 20px;
                box-sizing: border-box;
            }
            .booking-main-title {
                color: var(--purple-primary);
                font-size: clamp(1.8rem, 4vw, 2.3rem);
                font-weight: 800;
                margin: 0 0 10px 0;
            }
            .booking-main-subtitle {
                color: #555;
                font-size: clamp(0.95rem, 2.5vw, 1.05rem);
                max-width: 600px;
                margin: 0 auto;
                line-height: 1.6;
            }
            .booking-card {
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                background: #fff;
                border-radius: 24px;
                border: 1px solid rgba(138, 52, 159, 0.06);
                box-shadow: 0 15px 45px rgba(62,13,95,0.02);
            }
            .booking-form-area {
                flex: 1.4;
                min-width: 300px;
                padding: clamp(20px, 5vw, 45px);
                box-sizing: border-box;
            }
            .booking-sidebar-area {
                flex: 1;
                min-width: 280px;
                background: #fafafa;
                padding: clamp(25px, 5vw, 45px);
                box-sizing: border-box;
                border-left: 1px solid rgba(138, 52, 159, 0.05);
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .form-grid-row {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-bottom: 20px;
            }
            .form-control-label {
                display: block;
                font-weight: 700;
                margin-bottom: 8px;
                font-size: 0.85rem;
                color: #444;
                text-transform: uppercase;
            }
            @media (max-width: 768px) {
                .booking-outer-wrapper {
                    margin: 20px auto;
                    padding: 0 15px;
                }
                .form-grid-row {
                    grid-template-columns: 1fr; /* Stacks inputs completely vertically on mobile devices */
                    gap: 15px;
                    margin-bottom: 15px;
                }
                .booking-card {
                    flex-direction: column; /* Moves the helpful info sidebar right beneath the form */
                }
                .booking-sidebar-area {
                    border-left: none;
                    border-top: 1px solid rgba(138, 52, 159, 0.05);
                }
            }
        </style>
        <div class="booking-outer-wrapper">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 class="booking-main-title">Schedule DOT Medical Screening</h1>
                <p class="booking-main-subtitle">Book your compliant federal screening slot below. All records are processed through certified Medical Review Officers (MRO).</p>
            </div>

            <div class="booking-card">
                <!-- Form Interaction Area -->
                <form id="dotBookingForm" class="booking-form-area">
                    <div class="form-grid-row">
                        <div>
                            <label class="form-control-label">Full Name</label>
                            <input type="text" name="client_name" required class="form-control" placeholder="John Doe">
                        </div>
                        <div>
                            <label class="form-control-label">Commercial License (CDL #)</label>
                            <input type="text" name="cdl_number" required class="form-control" placeholder="ST-123456789">
                        </div>
                    </div>

                    <div class="form-grid-row">
                        <div>
                            <label class="form-control-label">Email Address</label>
                            <input type="email" name="client_email" required class="form-control" placeholder="driver@fleet.com">
                        </div>
                        <div>
                            <label class="form-control-label">Phone Number</label>
                            <input type="tel" name="client_phone" required class="form-control" placeholder="(555) 000-0000">
                        </div>
                    </div>

                    <div style="margin-bottom: 25px;">
                        <label class="form-control-label">Testing Regulatory Category</label>
                        <select name="testing_reason" required class="form-control">
                            <option value="Pre-Employment">Pre-Employment Screening (FMCSA Part 382)</option>
                            <option value="Random-Pool">Random Pool Selection Quota</option>
                            <option value="Post-Accident">Time-Critical Post-Accident Verification</option>
                            <option value="Reasonable-Suspicion">Reasonable Suspicion Testing Path</option>
                            <option value="Follow-Up">Follow Up</option>
                            <option value="Return-to-Duty">Return to Duty</option>
                        </select>
                    </div>

                    <div class="form-grid-row" style="margin-bottom: 30px;">
                        <div>
                            <label class="form-control-label">Select Testing Date</label>
                            <input type="date" id="booking_date" name="booking_date" required class="form-control">
                        </div>
                        <div>
                            <label class="form-control-label">Preferred Arrival Window</label>
                            <input type="hidden" id="selected_time_slot" name="booking_time" required>
                            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;" id="slotGrid">
                                <button type="button" class="time-slot-btn" data-value="08:00 AM">08:00 AM</button>
                                <button type="button" class="time-slot-btn" data-value="10:30 AM">10:30 AM</button>
                                <button type="button" class="time-slot-btn" data-value="01:00 PM">01:00 PM</button>
                                <button type="button" class="time-slot-btn" data-value="03:30 PM">03:30 PM</button>
                            </div>
                        </div>
                    </div>

                    <button type="submit" style="width:100%; background:var(--purple-primary); color:#fff; font-size:1rem; font-weight:700; padding:16px; border:none; border-radius:12px; cursor:pointer; box-shadow:0 5px 15px rgba(62,13,95,0.15);">Confirm Audit-Ready Appointment</button>
                    <div id="formFeedback" style="margin-top:20px; font-weight:600; text-align:center; font-size:0.95rem; display:none;"></div>
                </form>

                <!-- Helpful Compliance Sidebar -->
                <div class="booking-sidebar-area">
                    <h3 style="color:var(--purple-primary); font-size:1.2rem; font-weight:800; margin:0 0 15px 0;">Patient Instructions</h3>
                    <p style="color:#555; font-size:0.9rem; line-height:1.6; margin:0 0 20px 0;">Please bring your valid **Commercial Driver's License (CDL)** alongside any custody documentation templates your fleet manager provided.</p>
                    <div style="background:#fff; border:1px solid rgba(138,52,159,0.06); padding:15px; border-radius:12px;">
                        <span style="font-size:0.8rem; font-weight:800; color:var(--purple-accent); text-transform:uppercase; display:block; margin-bottom:5px;">Processing Speed</span>
                        <p style="margin:0; font-size:0.85rem; color:#666; line-height:1.4;">Completed clinical forms route instantly directly to clearinghouses via paperless digital custody transfers.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Block past calendar tracking days
    const dateInput = document.getElementById('booking_date');
    if (dateInput) { dateInput.min = new Date().toISOString().split('T')[0]; }

    // Click handler for arrival windows
    const slotButtons = document.querySelectorAll('.time-slot-btn');
    const hiddenTimeInput = document.getElementById('selected_time_slot');
    slotButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            slotButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            hiddenTimeInput.value = btn.getAttribute('data-value');
        });
    });

    // Form submission route integration connecting directly with Supabase Edge Ecosystems
    const form = document.getElementById('dotBookingForm');
    const feedback = document.getElementById('formFeedback');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!hiddenTimeInput.value) {
            feedback.style.color = "red";
            feedback.innerText = "Error: Please pick an arrival time window block first.";
            feedback.style.display = "block";
            return;
        }

        feedback.style.color = "var(--purple-accent)";
        feedback.innerText = "Transmitting record payloads safely to secure servers...";
        feedback.style.display = "block";

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(EDGE_FUNCTION_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Network validation route mismatch failed.');

            feedback.style.color = "var(--green-primary)";
            feedback.innerText = "✓ Appointment locked in! Check your email inbox for confirmation details.";
            form.reset();
            slotButtons.forEach(b => b.classList.remove('selected'));
            hiddenTimeInput.value = "";
        } catch (err) {
            feedback.style.color = "red";
            feedback.innerText = "Submission anomaly occurred. Please call dispatch or contact our clinic directly.";
        }
    });
});
