/**
 * ReNew You Health & Wellness
 * DOT Drug Testing Appointment Scheduler
 *
 * Location:
 * assets/js/dot-appointment.js
 *
 * Uses:
 * - Supabase scheduling_settings
 * - Supabase dot_appointments
 * - Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // =========================================================
    // SUPABASE CONFIGURATION
    // =========================================================

    var SUPABASE_PROJECT_URL =
        'https://lrbimrlbskjweynxlgas.supabase.co';

    var SUPABASE_ANON_KEY =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyYmltcmxic2tqd2V5bnhsZ2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjQ0NTYsImV4cCI6MjA5NDEwMDQ1Nn0.I8fQ6ZjA9oaTqJCF-7Z7vUboXC8zv2cogBv4PC_1ihU';

    var EDGE_FUNCTION_ENDPOINT =
        SUPABASE_PROJECT_URL +
        '/functions/v1/submit-dot-appointment';

    // =========================================================
    // TARGET
    // =========================================================

    var target =
        document.getElementById(
            'dot-appointment-target'
        );

    if (!target) {
        return;
    }

    if (!window.supabase) {

        target.innerHTML =
            '<p style="padding:30px;text-align:center;color:#d90429;">' +
            'Scheduling system could not initialize. Supabase is unavailable.' +
            '</p>';

        return;
    }

    var supabaseClient =
        window.supabase.createClient(
            SUPABASE_PROJECT_URL,
            SUPABASE_ANON_KEY
        );

    // =========================================================
    // SCHEDULING SETTINGS
    // =========================================================

    var schedulingSettings = {

        /*
         * Appointment duration.
         *
         * Change this to the actual amount of time
         * required for one DOT appointment.
         */
        appointment_duration_minutes: 30,

        /*
         * Required buffer between appointments.
         */
        buffer_minutes: 30,

        /*
         * Clinic operating hours.
         */
        opening_time: '08:00 AM',
        closing_time: '05:00 PM',

        /*
         * Optional future booking limit.
         *
         * null = unlimited.
         *
         * Example:
         * 60 = customers can book up to 60 days ahead.
         */
        booking_window_days: null,

        /*
         * Structure:
         *
         * {
         *     "2026-08-20": [
         *         "08:00 AM",
         *         "10:00 AM"
         *     ],
         *
         *     "2026-08-21": true
         * }
         */
        blocked_date_slots: {}
    };

    // =========================================================
    // STATE
    // =========================================================

    var selectedDate = '';
    var selectedTime = '';

    var appointments = [];

    var calendarDate = new Date();

    calendarDate.setDate(1);

    // =========================================================
    // INITIAL RENDER
    // =========================================================

    renderScheduler();

    initializeScheduler();

    // =========================================================
    // INITIALIZATION
    // =========================================================

    async function initializeScheduler() {

        try {

            setFeedback(
                'Loading appointment availability...',
                'info'
            );

            console.log(
                'DOT Scheduler: Starting initialization...'
            );

            await loadSchedulingSettings();

            await loadAppointments();

            initializeDateRestrictions();

            renderCalendar();

            renderTimeSlots();

            setFeedback('', '');

            console.log(
                'DOT Scheduler: Initialization completed successfully.'
            );

        } catch (error) {

            console.error(
                'DOT Scheduler initialization FAILED:',
                error
            );

            setFeedback(
                error.message ||
                'Unable to load appointment availability.',
                'error'
            );
        }
    }

    // =========================================================
    // PAGE HTML
    // =========================================================

    function renderScheduler() {

        target.innerHTML = `

            <style>

                .dot-scheduler-wrapper {
                    max-width: 1150px;
                    margin: 40px auto;
                    padding: 0 20px;
                    box-sizing: border-box;
                }

                .dot-scheduler-header {
                    text-align: center;
                    margin-bottom: 35px;
                }

                .dot-scheduler-header h1 {
                    color: var(--purple-primary);
                    font-size: clamp(1.8rem, 4vw, 2.4rem);
                    font-weight: 800;
                    margin: 0 0 10px 0;
                }

                .dot-scheduler-header p {
                    max-width: 700px;
                    margin: 0 auto;
                    color: #666;
                    line-height: 1.6;
                    font-size: 0.95rem;
                }

                .dot-scheduler-card {
                    background: #fff;
                    border: 1px solid rgba(138,52,159,0.07);
                    border-radius: 24px;
                    box-shadow: 0 15px 45px rgba(62,13,95,0.04);
                    overflow: hidden;
                }

                .dot-scheduler-form {
                    padding: clamp(20px, 5vw, 45px);
                }

                .dot-section-title {
                    color: var(--purple-primary);
                    font-size: 1.15rem;
                    font-weight: 800;
                    margin: 0 0 6px 0;
                }

                .dot-section-description {
                    color: #666;
                    font-size: 0.85rem;
                    margin: 0 0 20px 0;
                    line-height: 1.5;
                }

                .dot-form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .dot-form-field {
                    min-width: 0;
                    margin-bottom: 20px;
                }

                .dot-form-label {
                    display: block;
                    margin-bottom: 7px;
                    color: #444;
                    font-size: 0.78rem;
                    font-weight: 800;
                    text-transform: uppercase;
                }

                .dot-form-control {
                    width: 100%;
                    padding: 13px 14px;
                    box-sizing: border-box;
                    border: 1px solid rgba(0,0,0,0.10);
                    border-radius: 10px;
                    background: #fff;
                    color: #222;
                    font-size: 0.95rem;
                    transition:
                        border-color 0.2s,
                        box-shadow 0.2s;
                }

                .dot-form-control:focus {
                    outline: none;
                    border-color: var(--purple-accent);
                    box-shadow:
                        0 0 0 3px rgba(138,52,159,0.08);
                }

                .dot-calendar-section {
                    margin-top: 30px;
                    padding-top: 30px;
                    border-top: 1px solid rgba(0,0,0,0.06);
                }

                .dot-calendar-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 25px;
                }

                .dot-calendar-panel,
                .dot-times-panel {
                    background: #fafafa;
                    border: 1px solid rgba(138,52,159,0.06);
                    border-radius: 16px;
                    padding: 20px;
                }

                .dot-calendar-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }

                .dot-calendar-header strong {
                    color: var(--purple-primary);
                    font-size: 1rem;
                }

                .dot-calendar-nav {
                    display: flex;
                    gap: 6px;
                }

                .dot-calendar-nav button {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    border: 1px solid rgba(138,52,159,0.12);
                    background: #fff;
                    color: var(--purple-primary);
                    cursor: pointer;
                    font-weight: 800;
                    font-size: 1.1rem;
                }

                .dot-calendar-nav button:hover:not(:disabled) {
                    background: rgba(138,52,159,0.06);
                }

                .dot-calendar-nav button:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .dot-calendar-weekdays {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 5px;
                    margin-bottom: 5px;
                }

                .dot-calendar-weekday {
                    text-align: center;
                    color: #777;
                    font-size: 0.68rem;
                    font-weight: 800;
                    padding: 5px 0;
                    text-transform: uppercase;
                }

                .dot-calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 5px;
                }

                .dot-calendar-day {
                    min-height: 40px;
                    border: 1px solid transparent;
                    border-radius: 8px;
                    background: #fff;
                    color: #333;
                    cursor: pointer;
                    font-size: 0.82rem;
                    font-weight: 700;
                }

                .dot-calendar-day:hover:not(:disabled) {
                    border-color: var(--purple-accent);
                    color: var(--purple-primary);
                }

                .dot-calendar-day.other-month {
                    color: #bbb;
                    background: transparent;
                }

                .dot-calendar-day.today {
                    border-color: var(--purple-accent);
                }

                .dot-calendar-day.selected {
                    background: var(--purple-primary);
                    color: #fff;
                    border-color: var(--purple-primary);
                }

                .dot-calendar-day.unavailable {
                    color: #aaa;
                    background: #f1f1f1;
                    cursor: not-allowed;
                    text-decoration: line-through;
                }

                .dot-times-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                }

                .dot-time-btn {
                    min-height: 46px;
                    padding: 10px;
                    border: 1px solid rgba(138,52,159,0.15);
                    border-radius: 9px;
                    background: #fff;
                    color: var(--purple-primary);
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .dot-time-btn:hover:not(:disabled) {
                    border-color: var(--purple-accent);
                    background: rgba(138,52,159,0.04);
                }

                .dot-time-btn.selected {
                    background: var(--purple-primary);
                    color: #fff;
                    border-color: var(--purple-primary);
                }

                .dot-time-btn:disabled {
                    background: #eee;
                    color: #aaa;
                    border-color: #eee;
                    cursor: not-allowed;
                    text-decoration: line-through;
                }

                .dot-no-date {
                    color: #777;
                    font-size: 0.85rem;
                    line-height: 1.5;
                    text-align: center;
                    padding: 30px 10px;
                    grid-column: 1 / -1;
                }

                .dot-selected-summary {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 15px;
                }

                .dot-summary-pill {
                    background: rgba(138,52,159,0.07);
                    color: var(--purple-primary);
                    padding: 8px 12px;
                    border-radius: 20px;
                    font-size: 0.78rem;
                    font-weight: 700;
                }

                .dot-submit-btn {
                    width: 100%;
                    margin-top: 30px;
                    padding: 16px;
                    border: none;
                    border-radius: 11px;
                    background: var(--purple-primary);
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 800;
                    cursor: pointer;
                }

                .dot-submit-btn:hover {
                    opacity: 0.94;
                }

                .dot-submit-btn:disabled {
                    opacity: 0.55;
                    cursor: not-allowed;
                }

                .dot-feedback {
                    display: none;
                    margin-top: 18px;
                    padding: 12px 14px;
                    border-radius: 9px;
                    text-align: center;
                    font-size: 0.88rem;
                    font-weight: 700;
                }

                .dot-feedback.error {
                    display: block;
                    background: #fff1f2;
                    color: #d90429;
                    border: 1px solid #ffd6dc;
                }

                .dot-feedback.success {
                    display: block;
                    background: #f2faed;
                    color: var(--green-primary);
                    border: 1px solid #d9efc8;
                }

                .dot-feedback.info {
                    display: block;
                    background: #f5f2f8;
                    color: var(--purple-primary);
                    border: 1px solid rgba(138,52,159,0.10);
                }

                .dot-buffer-note {
                    margin-top: 12px;
                    color: #777;
                    font-size: 0.75rem;
                    line-height: 1.5;
                }

                .dot-availability-note {
                    margin-top: 12px;
                    padding: 10px 12px;
                    background: #fff;
                    border-radius: 8px;
                    color: #666;
                    font-size: 0.76rem;
                    line-height: 1.5;
                    border: 1px solid rgba(0,0,0,0.05);
                }

                @media (max-width: 768px) {

                    .dot-scheduler-wrapper {
                        margin: 20px auto;
                        padding: 0 12px;
                    }

                    .dot-form-grid {
                        grid-template-columns: 1fr;
                        gap: 0;
                    }

                    .dot-calendar-layout {
                        grid-template-columns: 1fr;
                    }

                    .dot-times-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

            </style>

            <div class="dot-scheduler-wrapper">

                <div class="dot-scheduler-header">

                    <h1>
                        Schedule Your DOT Testing Appointment
                    </h1>

                    <p>
                        Select an available date and appointment time below.
                        Appointment availability is automatically updated
                        based on clinic scheduling rules and existing
                        appointments.
                    </p>

                </div>

                <div class="dot-scheduler-card">

                    <form
                        id="dotBookingForm"
                        class="dot-scheduler-form"
                    >

                        <div class="dot-section-title">
                            Driver Information
                        </div>

                        <p class="dot-section-description">
                            Please enter the information exactly as it appears
                            on your identification and CDL documentation.
                        </p>

                        <div class="dot-form-grid">

                            <div class="dot-form-field">

                                <label class="dot-form-label">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="client_name"
                                    id="client_name"
                                    class="dot-form-control"
                                    placeholder="John Doe"
                                    required
                                >

                            </div>

                            <div class="dot-form-field">

                                <label class="dot-form-label">
                                    Commercial Driver License
                                </label>

                                <input
                                    type="text"
                                    name="cdl_number"
                                    id="cdl_number"
                                    class="dot-form-control"
                                    placeholder="CDL Number"
                                    required
                                >

                            </div>

                        </div>

                        <div class="dot-form-grid">

                            <div class="dot-form-field">

                                <label class="dot-form-label">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="client_email"
                                    id="client_email"
                                    class="dot-form-control"
                                    placeholder="driver@example.com"
                                    required
                                >

                            </div>

                            <div class="dot-form-field">

                                <label class="dot-form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="client_phone"
                                    id="client_phone"
                                    class="dot-form-control"
                                    placeholder="(555) 555-5555"
                                    required
                                >

                            </div>

                        </div>

                        <div class="dot-form-field">

                            <label class="dot-form-label">
                                Testing Type
                            </label>

                            <select
                                name="testing_reason"
                                id="testing_reason"
                                class="dot-form-control"
                                required
                            >

                                <option value="">
                                    Select testing type
                                </option>

                                <option value="Pre-Employment">
                                    Pre-Employment Screening
                                </option>

                                <option value="Random-Pool">
                                    Random Pool
                                </option>

                                <option value="Post-Accident">
                                    Post-Accident
                                </option>

                                <option value="Reasonable-Suspicion">
                                    Reasonable Suspicion
                                </option>

                                <option value="Follow-Up">
                                    Follow Up
                                </option>

                                <option value="Return-To-Duty">
                                    Return To Duty
                                </option>


                            </select>

                        </div>

                        <div class="dot-calendar-section">

                            <div class="dot-section-title">
                                Choose Appointment Date & Time
                            </div>

                            <p class="dot-section-description">
                                Available appointment times are generated
                                automatically from the clinic scheduling
                                configuration.
                            </p>

                            <div class="dot-calendar-layout">

                                <div class="dot-calendar-panel">

                                    <div class="dot-calendar-header">

                                        <strong
                                            id="calendarMonthLabel"
                                        >
                                            Loading...
                                        </strong>

                                        <div class="dot-calendar-nav">

                                            <button
                                                type="button"
                                                id="previousMonthBtn"
                                                aria-label="Previous month"
                                            >
                                                ‹
                                            </button>

                                            <button
                                                type="button"
                                                id="nextMonthBtn"
                                                aria-label="Next month"
                                            >
                                                ›
                                            </button>

                                        </div>

                                    </div>

                                    <div class="dot-calendar-weekdays">

                                        <div class="dot-calendar-weekday">
                                            Sun
                                        </div>

                                        <div class="dot-calendar-weekday">
                                            Mon
                                        </div>

                                        <div class="dot-calendar-weekday">
                                            Tue
                                        </div>

                                        <div class="dot-calendar-weekday">
                                            Wed
                                        </div>

                                        <div class="dot-calendar-weekday">
                                            Thu
                                        </div>

                                        <div class="dot-calendar-weekday">
                                            Fri
                                        </div>

                                        <div class="dot-calendar-weekday">
                                            Sat
                                        </div>

                                    </div>

                                    <div
                                        id="calendarGrid"
                                        class="dot-calendar-grid"
                                    ></div>

                                </div>

                                <div class="dot-times-panel">

                                    <div class="dot-section-title">
                                        Available Times
                                    </div>

                                    <p
                                        id="selectedDateLabel"
                                        class="dot-section-description"
                                    >
                                        Select a date from the calendar.
                                    </p>

                                    <div
                                        id="timeSlotGrid"
                                        class="dot-times-grid"
                                    >

                                        <div class="dot-no-date">
                                            Choose a date to see available
                                            appointment times.
                                        </div>

                                    </div>

                                    <div
                                        id="selectedSummary"
                                        class="dot-selected-summary"
                                    ></div>

                                    <div class="dot-buffer-note">
                                        Appointment availability automatically
                                        respects the clinic appointment
                                        duration and configured buffer time.
                                    </div>

                                    <div
                                        class="dot-availability-note"
                                        id="availabilityNote"
                                    ></div>

                                </div>

                            </div>

                        </div>

                        <input
                            type="hidden"
                            name="booking_date"
                            id="booking_date"
                            required
                        >

                        <input
                            type="hidden"
                            name="booking_time"
                            id="booking_time"
                            required
                        >

                        <button
                            type="submit"
                            id="submitAppointmentBtn"
                            class="dot-submit-btn"
                        >
                            Confirm Appointment
                        </button>

                        <div
                            id="formFeedback"
                            class="dot-feedback"
                        ></div>

                    </form>

                </div>

            </div>
        `;

        bindSchedulerEvents();
    }

    // =========================================================
    // EVENT BINDINGS
    // =========================================================

    function bindSchedulerEvents() {

        var previousButton =
            document.getElementById(
                'previousMonthBtn'
            );

        var nextButton =
            document.getElementById(
                'nextMonthBtn'
            );

        var form =
            document.getElementById(
                'dotBookingForm'
            );

        if (previousButton) {

            previousButton.addEventListener(
                'click',
                function () {
                    changeMonth(-1);
                }
            );
        }

        if (nextButton) {

            nextButton.addEventListener(
                'click',
                function () {
                    changeMonth(1);
                }
            );
        }

        if (form) {

            form.addEventListener(
                'submit',
                submitAppointment
            );
        }
    }

    // =========================================================
    // LOAD SCHEDULING SETTINGS
    // =========================================================

    async function loadSchedulingSettings() {

        var result =
            await supabaseClient
                .from('scheduling_settings')
                .select(
                    'id, buffer_minutes, blocked_date_slots'
                )
                .eq(
                    'id',
                    'dot_config'
                )
                .maybeSingle();

        if (result.error) {
            throw new Error(
                'Scheduling settings error: ' +
                result.error.message
            );
        }

        if (!result.data) {

            throw new Error(
                'Scheduling settings error: ' +
                'The dot_config row does not exist.'
            );
        }

        schedulingSettings.buffer_minutes =
            parseInt(
                result.data.buffer_minutes,
                10
            ) || 30;

        schedulingSettings.blocked_date_slots =
            result.data.blocked_date_slots || {};

        console.log(
            'DOT Scheduler settings:',
            schedulingSettings
        );
    }

    // =========================================================
    // LOAD APPOINTMENTS
    // =========================================================

    async function loadAppointments() {

        var result =
            await supabaseClient
                .from('dot_appointments')
                .select(
                    'booking_date, booking_time'
                );

        if (result.error) {

            throw new Error(
                'Appointment availability error: ' +
                result.error.message
            );
        }

        appointments =
            result.data || [];

        console.log(
            'DOT Scheduler appointments:',
            appointments.length
        );
    }

    // =========================================================
    // DATE RESTRICTIONS
    // =========================================================

    function initializeDateRestrictions() {
        /*
         * Calendar controls date selection.
         */
    }

    // =========================================================
    // CALENDAR RENDERING
    // =========================================================

    function renderCalendar() {

        var grid =
            document.getElementById(
                'calendarGrid'
            );

        var monthLabel =
            document.getElementById(
                'calendarMonthLabel'
            );

        if (!grid || !monthLabel) {
            return;
        }

        var year =
            calendarDate.getFullYear();

        var month =
            calendarDate.getMonth();

        var monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        monthLabel.textContent =
            monthNames[month] +
            ' ' +
            year;

        grid.innerHTML = '';

        var firstDay =
            new Date(
                year,
                month,
                1
            ).getDay();

        var daysInMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();

        var daysInPreviousMonth =
            new Date(
                year,
                month,
                0
            ).getDate();

        // -----------------------------------------------------
        // PREVIOUS MONTH
        // -----------------------------------------------------

        for (
            var i = firstDay - 1;
            i >= 0;
            i--
        ) {

            var previousDay =
                daysInPreviousMonth - i;

            var previousButton =
                document.createElement(
                    'button'
                );

            previousButton.type =
                'button';

            previousButton.className =
                'dot-calendar-day other-month';

            previousButton.disabled =
                true;

            previousButton.textContent =
                previousDay;

            grid.appendChild(
                previousButton
            );
        }

        // -----------------------------------------------------
        // CURRENT MONTH
        // -----------------------------------------------------

        for (
            var day = 1;
            day <= daysInMonth;
            day++
        ) {

            var button =
                document.createElement(
                    'button'
                );

            button.type =
                'button';

            button.className =
                'dot-calendar-day';

            button.textContent =
                day;

            var dateString =
                formatDate(
                    new Date(
                        year,
                        month,
                        day
                    )
                );

            button.setAttribute(
                'data-date',
                dateString
            );

            if (isToday(dateString)) {

                button.classList.add(
                    'today'
                );
            }

            if (
                isDateUnavailable(
                    dateString
                )
            ) {

                button.classList.add(
                    'unavailable'
                );

                button.disabled =
                    true;

            } else {

                button.addEventListener(
                    'click',
                    function () {

                        selectDate(
                            this.getAttribute(
                                'data-date'
                            )
                        );
                    }
                );
            }

            if (
                selectedDate ===
                dateString
            ) {

                button.classList.add(
                    'selected'
                );
            }

            grid.appendChild(
                button
            );
        }

        // -----------------------------------------------------
        // NEXT MONTH FILLER
        // -----------------------------------------------------

        var totalCells =
            firstDay +
            daysInMonth;

        var remainingCells =
            totalCells % 7 === 0
                ? 0
                : 7 - (
                    totalCells % 7
                );

        for (
            var j = 1;
            j <= remainingCells;
            j++
        ) {

            var nextButton =
                document.createElement(
                    'button'
                );

            nextButton.type =
                'button';

            nextButton.className =
                'dot-calendar-day other-month';

            nextButton.disabled =
                true;

            nextButton.textContent =
                j;

            grid.appendChild(
                nextButton
            );
        }

        updateMonthNavigation();
    }

    // =========================================================
    // MONTH NAVIGATION
    // =========================================================

    function changeMonth(direction) {

        var newMonth =
            new Date(
                calendarDate.getFullYear(),
                calendarDate.getMonth() +
                    direction,
                1
            );

        var today =
            new Date();

        today.setDate(1);
        today.setHours(
            0,
            0,
            0,
            0
        );

        if (newMonth < today) {
            return;
        }

        /*
         * Optional future booking window.
         */

        if (
            schedulingSettings.booking_window_days !==
            null
        ) {

            var maximumDate =
                new Date();

            maximumDate.setHours(
                0,
                0,
                0,
                0
            );

            maximumDate.setDate(
                maximumDate.getDate() +
                schedulingSettings.booking_window_days
            );

            maximumDate.setDate(1);

            if (
                newMonth >
                maximumDate
            ) {
                return;
            }
        }

        calendarDate =
            newMonth;

        renderCalendar();
    }

    function updateMonthNavigation() {

        var previousButton =
            document.getElementById(
                'previousMonthBtn'
            );

        var nextButton =
            document.getElementById(
                'nextMonthBtn'
            );

        if (!previousButton) {
            return;
        }

        var today =
            new Date();

        today.setDate(1);
        today.setHours(
            0,
            0,
            0,
            0
        );

        previousButton.disabled =
            calendarDate <= today;

        previousButton.style.opacity =
            previousButton.disabled
                ? '0.4'
                : '1';

        if (
            nextButton &&
            schedulingSettings.booking_window_days !==
                null
        ) {

            var maximumDate =
                new Date();

            maximumDate.setHours(
                0,
                0,
                0,
                0
            );

            maximumDate.setDate(
                maximumDate.getDate() +
                schedulingSettings.booking_window_days
            );

            maximumDate.setDate(1);

            nextButton.disabled =
                calendarDate >=
                maximumDate;

            nextButton.style.opacity =
                nextButton.disabled
                    ? '0.4'
                    : '1';
        }
    }

    // =========================================================
    // DATE SELECTION
    // =========================================================

    function selectDate(dateString) {

        selectedDate =
            dateString;

        selectedTime =
            '';

        document.getElementById(
            'booking_date'
        ).value =
            dateString;

        document.getElementById(
            'booking_time'
        ).value =
            '';

        renderCalendar();

        renderTimeSlots();

        renderSelectedSummary();
    }

    // =========================================================
    // TIME SLOT GENERATION
    // =========================================================

    function generateTimeSlots() {

        var openingMinutes =
            parseTimeToMinutes(
                schedulingSettings.opening_time
            );

        var closingMinutes =
            parseTimeToMinutes(
                schedulingSettings.closing_time
            );

        var duration =
            parseInt(
                schedulingSettings.appointment_duration_minutes,
                10
            ) || 30;

        var buffer =
            parseInt(
                schedulingSettings.buffer_minutes,
                10
            ) || 30;

        if (duration < 5) {
            duration = 5;
        }

        if (buffer < 0) {
            buffer = 0;
        }

        /*
         * Slot interval = appointment duration + buffer.
         *
         * Example:
         *
         * Appointment = 30 minutes
         * Buffer = 30 minutes
         *
         * Slots:
         *
         * 8:00
         * 9:00
         * 10:00
         * 11:00
         */

        var interval =
            duration +
            buffer;

        var slots = [];

        /*
         * The appointment itself must finish before
         * the clinic closing time.
         */

        for (
            var minutes =
                openingMinutes;

            minutes +
                duration <=
                closingMinutes;

            minutes += interval
        ) {

            slots.push(
                formatTime(minutes)
            );
        }

        return slots;
    }

    // =========================================================
    // TIME SLOT RENDERING
    // =========================================================

    function renderTimeSlots() {

        var grid =
            document.getElementById(
                'timeSlotGrid'
            );

        var label =
            document.getElementById(
                'selectedDateLabel'
            );

        var availabilityNote =
            document.getElementById(
                'availabilityNote'
            );

        if (!grid || !label) {
            return;
        }

        if (!selectedDate) {

            label.textContent =
                'Select a date from the calendar.';

            grid.innerHTML =
                '<div class="dot-no-date">' +
                'Choose a date to see available ' +
                'appointment times.' +
                '</div>';

            if (availabilityNote) {
                availabilityNote.textContent =
                    '';
            }

            return;
        }

        label.textContent =
            formatDisplayDate(
                selectedDate
            );

        grid.innerHTML =
            '';

        var blockedSlots =
            getBlockedSlotsForDate(
                selectedDate
            );

        var generatedSlots =
            generateTimeSlots();

        if (
            generatedSlots.length === 0
        ) {

            grid.innerHTML =
                '<div class="dot-no-date">' +
                'No appointment times are configured.' +
                '</div>';

            return;
        }

        var availableCount = 0;

        generatedSlots.forEach(
            function (timeValue) {

                var button =
                    document.createElement(
                        'button'
                    );

                button.type =
                    'button';

                button.className =
                    'dot-time-btn';

                button.textContent =
                    timeValue;

                var isBlocked =
                    blockedSlots.indexOf(
                        timeValue
                    ) !== -1;

                var isBooked =
                    isAppointmentBooked(
                        selectedDate,
                        timeValue
                    );

                var isPast =
                    isPastCustomerAppointmentSlot(
                        selectedDate,
                        timeValue
                    );

                var conflicts =
                    appointmentConflicts(
                        selectedDate,
                        timeValue
                    );

                if (
                    isBlocked ||
                    isBooked ||
                    isPast ||
                    conflicts
                ) {

                    button.disabled =
                        true;

                    if (isBlocked) {

                        button.title =
                            'This time has been blocked by the clinic.';

                    } else if (isBooked) {

                        button.title =
                            'This appointment time has already been booked.';

                    } else if (isPast) {

                        button.title =
                            'This appointment time has already passed.';

                    } else {

                        button.title =
                            'This time conflicts with another appointment.';
                    }

                } else {

                    availableCount++;

                    button.addEventListener(
                        'click',
                        function () {

                            selectTime(
                                timeValue
                            );
                        }
                    );
                }

                if (
                    selectedTime ===
                    timeValue
                ) {

                    button.classList.add(
                        'selected'
                    );
                }

                grid.appendChild(
                    button
                );
            }
        );

        if (availabilityNote) {

            availabilityNote.textContent =
                availableCount +
                ' appointment ' +
                (
                    availableCount === 1
                        ? 'time'
                        : 'times'
                ) +
                ' available for this date.';
        }
    }

    // =========================================================
    // TIME SELECTION
    // =========================================================

    function selectTime(timeValue) {

        /*
         * Re-check availability immediately before
         * allowing the selection.
         */

        if (
            isDateUnavailable(
                selectedDate
            ) ||
            isPastCustomerAppointmentSlot(
                selectedDate,
                timeValue
            ) ||
            isAppointmentBooked(
                selectedDate,
                timeValue
            ) ||
            getBlockedSlotsForDate(
                selectedDate
            ).indexOf(timeValue) !== -1 ||
            appointmentConflicts(
                selectedDate,
                timeValue
            )
        ) {

            setFeedback(
                'That appointment time is no longer available. Please select another time.',
                'error'
            );

            renderTimeSlots();

            return;
        }

        selectedTime =
            timeValue;

        document.getElementById(
            'booking_time'
        ).value =
            timeValue;

        renderTimeSlots();

        renderSelectedSummary();

        setFeedback(
            '',
            ''
        );
    }

    // =========================================================
    // SELECTED SUMMARY
    // =========================================================

    function renderSelectedSummary() {

        var summary =
            document.getElementById(
                'selectedSummary'
            );

        if (!summary) {
            return;
        }

        summary.innerHTML =
            '';

        if (selectedDate) {

            var datePill =
                document.createElement(
                    'div'
                );

            datePill.className =
                'dot-summary-pill';

            datePill.textContent =
                'Date: ' +
                formatDisplayDate(
                    selectedDate
                );

            summary.appendChild(
                datePill
            );
        }

        if (selectedTime) {

            var timePill =
                document.createElement(
                    'div'
                );

            timePill.className =
                'dot-summary-pill';

            timePill.textContent =
                'Time: ' +
                selectedTime;

            summary.appendChild(
                timePill
            );
        }
    }

// =========================================================
// BLOCKED DATE/TIME LOGIC
// =========================================================

function getBlockedSlotsForDate(
    dateString
) {

    var blocked =
        schedulingSettings.blocked_date_slots;

    if (
        !blocked ||
        typeof blocked !== 'object'
    ) {
        return [];
    }

    var slots =
        blocked[dateString];

    /*
     * Entire date blocked.
     *
     * Admin scheduler stores this as:
     *
     * {
     *     "2026-08-15": ["__ALL__"]
     * }
     *
     * Convert that into all generated appointment
     * times so every customer-facing slot is blocked.
     */
    if (
        Array.isArray(slots) &&
        slots.includes('__ALL__')
    ) {
        return generateTimeSlots();
    }

    /*
     * Support the older boolean format as well.
     */
    if (slots === true) {
        return generateTimeSlots();
    }

    /*
     * Individual blocked times.
     */
    if (Array.isArray(slots)) {
        return slots;
    }

    return [];
}

function isDateUnavailable(
    dateString
) {

    var date =
        parseDate(
            dateString
        );

    var today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    /*
     * Past dates.
     */

    if (date < today) {
        return true;
    }

    /*
     * Optional future booking window.
     */

    if (
        schedulingSettings.booking_window_days !==
        null
    ) {

        var maximumDate =
            new Date();

        maximumDate.setHours(
            0,
            0,
            0,
            0
        );

        maximumDate.setDate(
            maximumDate.getDate() +
            schedulingSettings.booking_window_days
        );

        if (
            date >
            maximumDate
        ) {
            return true;
        }
    }

    /*
     * Entire date manually blocked.
     *
     * Admin scheduler stores a full-day block as:
     *
     * {
     *     "2026-08-15": ["__ALL__"]
     * }
     *
     * Also support the older boolean format:
     *
     * {
     *     "2026-08-15": true
     * }
     */

    var blocked =
        schedulingSettings.blocked_date_slots;

    if (
        blocked &&
        typeof blocked === 'object'
    ) {

        var dateBlock =
            blocked[dateString];

        if (
            dateBlock === true ||
            (
                Array.isArray(dateBlock) &&
                dateBlock.includes('__ALL__')
            )
        ) {

            return true;
        }
    }

    /*
     * No usable appointment times.
     */

    var generatedSlots =
        generateTimeSlots();

    if (
        generatedSlots.length === 0
    ) {
        return true;
    }

    var blockedSlots =
        getBlockedSlotsForDate(
            dateString
        );

    var usableSlots =
        generatedSlots.filter(
            function (slot) {

                return (
                    blockedSlots.indexOf(
                        slot
                    ) === -1 &&
                    !isAppointmentBooked(
                        dateString,
                        slot
                    ) &&
                    !isPastCustomerAppointmentSlot(
                        dateString,
                        slot
                    ) &&
                    !appointmentConflicts(
                        dateString,
                        slot
                    )
                );
            }
        );

    return (
        usableSlots.length === 0
    );
}

    // =========================================================
    // APPOINTMENT AVAILABILITY
    // =========================================================

    function isAppointmentBooked(
        dateString,
        timeValue
    ) {

        return appointments.some(
            function (appointment) {

                if (!appointment) {
                    return false;
                }

                return (
                    appointment.booking_date ===
                        dateString &&
                    normalizeTime(
                        appointment.booking_time
                    ) ===
                        normalizeTime(
                            timeValue
                        )
                );
            }
        );
    }

    /*
     * Checks whether the proposed appointment overlaps
     * an existing appointment when appointment duration
     * and buffer are taken into account.
     */

    function appointmentConflicts(
        dateString,
        proposedTime
    ) {

        var proposedStart =
            parseTimeToMinutes(
                proposedTime
            );

        var duration =
            parseInt(
                schedulingSettings.appointment_duration_minutes,
                10
            ) || 30;

        var buffer =
            parseInt(
                schedulingSettings.buffer_minutes,
                10
            ) || 30;

        var proposedEnd =
            proposedStart +
            duration +
            buffer;

        return appointments.some(
            function (appointment) {

                if (!appointment) {
                    return false;
                }

                if (
                    appointment.booking_date !==
                    dateString
                ) {
                    return false;
                }

                var existingStart =
                    parseTimeToMinutes(
                        appointment.booking_time
                    );

                var existingEnd =
                    existingStart +
                    duration +
                    buffer;

                /*
                 * Overlap test.
                 */

                return (
                    proposedStart <
                        existingEnd &&
                    proposedEnd >
                        existingStart
                );
            }
        );
    }

    // =========================================================
    // FORM SUBMISSION
    // =========================================================

    async function submitAppointment(
        event
    ) {

        event.preventDefault();

        var form =
            document.getElementById(
                'dotBookingForm'
            );

        var submitButton =
            document.getElementById(
                'submitAppointmentBtn'
            );

        if (!form) {
            return;
        }

        var formData =
            new FormData(form);

        var clientName =
            String(
                formData.get(
                    'client_name'
                ) || ''
            ).trim();

        var cdlNumber =
            String(
                formData.get(
                    'cdl_number'
                ) || ''
            ).trim();

        var clientEmail =
            String(
                formData.get(
                    'client_email'
                ) || ''
            ).trim();

        var clientPhone =
            String(
                formData.get(
                    'client_phone'
                ) || ''
            ).trim();

        var testingReason =
            String(
                formData.get(
                    'testing_reason'
                ) || ''
            ).trim();

        if (
            !clientName ||
            !cdlNumber ||
            !clientEmail ||
            !clientPhone ||
            !testingReason
        ) {

            setFeedback(
                'Please complete all required driver information fields.',
                'error'
            );

            return;
        }

        if (!selectedDate) {

            setFeedback(
                'Please select an appointment date.',
                'error'
            );

            return;
        }

        if (!selectedTime) {

            setFeedback(
                'Please select an available appointment time.',
                'error'
            );

            return;
        }

        /*
         * Final availability check.
         */

        var blockedSlots =
            getBlockedSlotsForDate(
                selectedDate
            );

        if (
            isDateUnavailable(
                selectedDate
            ) ||
            isPastCustomerAppointmentSlot(
                selectedDate,
                selectedTime
            ) ||
            isAppointmentBooked(
                selectedDate,
                selectedTime
            ) ||
            blockedSlots.indexOf(
                selectedTime
            ) !== -1 ||
            appointmentConflicts(
                selectedDate,
                selectedTime
            )
        ) {

            setFeedback(
                'That appointment time is no longer available. Please select another time.',
                'error'
            );

            try {

                await loadAppointments();

            } catch (refreshError) {

                console.error(
                    refreshError
                );
            }

            renderCalendar();

            renderTimeSlots();

            return;
        }

        var payload = {

            client_name:
                clientName,

            cdl_number:
                cdlNumber,

            client_email:
                clientEmail,

            client_phone:
                clientPhone,

            testing_reason:
                testingReason,

            booking_date:
                selectedDate,

            booking_time:
                selectedTime
        };

        if (submitButton) {

            submitButton.disabled =
                true;

            submitButton.textContent =
                'Submitting Appointment...';
        }

        setFeedback(
            'Submitting your appointment...',
            'info'
        );

        try {

            var response =
                await fetch(
                    EDGE_FUNCTION_ENDPOINT,
                    {
                        method:
                            'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body:
                            JSON.stringify(
                                payload
                            )
                    }
                );

            var responseData =
                null;

            try {

                responseData =
                    await response.json();

            } catch (
                jsonError
            ) {

                responseData =
                    null;
            }

            if (!response.ok) {

                var errorMessage =
                    responseData &&
                    (
                        responseData.error ||
                        responseData.message
                    );

                throw new Error(
                    errorMessage ||
                    'Appointment submission failed.'
                );
            }

            setFeedback(
                '✓ Your appointment has been successfully scheduled. Please check your email for confirmation details.',
                'success'
            );

            form.reset();

            selectedDate =
                '';

            selectedTime =
                '';

            document.getElementById(
                'booking_date'
            ).value =
                '';

            document.getElementById(
                'booking_time'
            ).value =
                '';

            await loadAppointments();

            renderCalendar();

            renderTimeSlots();

            renderSelectedSummary();

        } catch (error) {

            console.error(
                'Appointment submission error:',
                error
            );

            setFeedback(
                error.message ||
                'Unable to schedule your appointment. Please try again or contact the clinic.',
                'error'
            );

        } finally {

            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    'Confirm Appointment';
            }
        }
    }

    // =========================================================
    // FEEDBACK
    // =========================================================

    function setFeedback(
        message,
        type
    ) {

        var feedback =
            document.getElementById(
                'formFeedback'
            );

        if (!feedback) {
            return;
        }

        feedback.className =
            'dot-feedback';

        if (!message) {

            feedback.textContent =
                '';

            feedback.style.display =
                'none';

            return;
        }

        feedback.classList.add(
            type || 'info'
        );

        feedback.textContent =
            message;

        feedback.style.display =
            'block';
    }

    // =========================================================
    // DATE HELPERS
    // =========================================================

    function formatDate(
        date
    ) {

        var year =
            date.getFullYear();

        var month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                '0'
            );

        var day =
            String(
                date.getDate()
            ).padStart(
                2,
                '0'
            );

        return (
            year +
            '-' +
            month +
            '-' +
            day
        );
    }

    function parseDate(
        dateString
    ) {

        var parts =
            dateString.split('-');

        return new Date(
            parseInt(
                parts[0],
                10
            ),
            parseInt(
                parts[1],
                10
            ) - 1,
            parseInt(
                parts[2],
                10
            )
        );
    }

    function formatDisplayDate(
        dateString
    ) {

        var date =
            parseDate(
                dateString
            );

        return date.toLocaleDateString(
            'en-US',
            {
                weekday:
                    'long',

                month:
                    'long',

                day:
                    'numeric',

                year:
                    'numeric'
            }
        );
    }

    function isToday(
        dateString
    ) {

        return (
            dateString ===
            formatDate(
                new Date()
            )
        );
    }

    // =========================================================
    // TIME HELPERS
    // =========================================================

    function formatTime(
        totalMinutes
    ) {

        var hours =
            Math.floor(
                totalMinutes / 60
            );

        var minutes =
            totalMinutes % 60;

        var suffix =
            hours >= 12
                ? 'PM'
                : 'AM';

        var displayHour =
            hours % 12;

        if (
            displayHour === 0
        ) {
            displayHour =
                12;
        }

        return (
            String(
                displayHour
            ).padStart(
                2,
                '0'
            ) +
            ':' +
            String(
                minutes
            ).padStart(
                2,
                '0'
            ) +
            ' ' +
            suffix
        );
    }

    function parseTimeToMinutes(
        timeValue
    ) {

        if (!timeValue) {
            return 0;
        }

        var normalized =
            String(
                timeValue
            )
                .trim()
                .toUpperCase();

        var match =
            normalized.match(
                /^(\d{1,2}):(\d{2})\s*(AM|PM)$/
            );

        if (!match) {
            return 0;
        }

        var hours =
            parseInt(
                match[1],
                10
            );

        var minutes =
            parseInt(
                match[2],
                10
            );

        var period =
            match[3];

        if (
            period === 'PM' &&
            hours !== 12
        ) {
            hours += 12;
        }

        if (
            period === 'AM' &&
            hours === 12
        ) {
            hours = 0;
        }

        return (
            hours * 60 +
            minutes
        );
    }

    function normalizeTime(
        timeValue
    ) {

        if (!timeValue) {
            return '';
        }

        return String(
            timeValue
        )
            .trim()
            .toUpperCase()
            .replace(
                /\s+/g,
                ' '
            );
    }
});

// =============================================================
// PAST TIME PROTECTION
// =============================================================

function isPastCustomerAppointmentSlot(
    date,
    slot
) {

    var now =
        new Date();

    var today =
        now.getFullYear() +
        '-' +
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            '0'
        ) +
        '-' +
        String(
            now.getDate()
        ).padStart(
            2,
            '0'
        );

    /*
     * Future dates are never considered past.
     */

    if (
        date !== today
    ) {
        return false;
    }

    var normalized =
        String(
            slot
        )
            .trim()
            .toUpperCase();

    var match =
        normalized.match(
            /^(\d{1,2}):(\d{2})\s*(AM|PM)$/
        );

    if (!match) {
        return false;
    }

    var hours =
        parseInt(
            match[1],
            10
        );

    var minutes =
        parseInt(
            match[2],
            10
        );

    var period =
        match[3];

    if (
        period === 'PM' &&
        hours !== 12
    ) {
        hours += 12;
    }

    if (
        period === 'AM' &&
        hours === 12
    ) {
        hours = 0;
    }

    var slotTime =
        new Date();

    slotTime.setHours(
        hours,
        minutes,
        0,
        0
    );

    return (
        slotTime.getTime() <=
        now.getTime()
    );
}