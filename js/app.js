document.addEventListener('DOMContentLoaded', () => {
    // State
    let isFasting = false;
    let timerInterval = null;
    let startTime = null;
    let goalHours = 16;
    let goalMs = goalHours * 60 * 60 * 1000;
    
    // Elements
    const timeDisplay = document.getElementById('time-display');
    const toggleBtn = document.getElementById('toggle-timer-btn');
    const ringProgress = document.querySelector('.ring-progress');
    const timeLabel = document.querySelector('.time-label');
    const goalDisplay = document.querySelector('.fasting-goal');
    const planCards = document.querySelectorAll('.plan-card');
    
    // SVG Circle Math
    const radius = ringProgress.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    // Initialize ring
    ringProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    ringProgress.style.strokeDashoffset = circumference;

    function updateDisplay(ms) {
        // Calculate hours, mins, secs
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        // Format
        const h = hours.toString().padStart(2, '0');
        const m = minutes.toString().padStart(2, '0');
        const s = seconds.toString().padStart(2, '0');
        
        timeDisplay.textContent = `${h}:${m}:${s}`;
        
        // Update Ring Progress
        // Capped at 100% of goal
        const progress = Math.min(ms / goalMs, 1);
        const offset = circumference - (progress * circumference);
        ringProgress.style.strokeDashoffset = offset;
        
        // Color change if goal reached
        if (progress >= 1) {
            ringProgress.style.stroke = 'var(--success-color)';
        } else {
            ringProgress.style.stroke = 'var(--timer-color-active)';
        }
    }

    function toggleTimer() {
        if (isFasting) {
            // Stop Fasting
            clearInterval(timerInterval);
            isFasting = false;
            
            // Update UI
            toggleBtn.textContent = 'Start Fasting';
            toggleBtn.classList.remove('stop');
            toggleBtn.classList.add('pulse');
            timeLabel.textContent = 'Ready to start';
            
            // Reset for demo purposes (usually you'd save this to history)
            updateDisplay(0);
            
        } else {
            // Start Fasting
            isFasting = true;
            startTime = Date.now();
            
            // Update UI
            toggleBtn.textContent = 'End Fast';
            toggleBtn.classList.add('stop');
            toggleBtn.classList.remove('pulse');
            timeLabel.textContent = 'Elapsed Time';
            
            updateDisplay(0); // initial tick
            
            timerInterval = setInterval(() => {
                const now = Date.now();
                const elapsed = now - startTime;
                updateDisplay(elapsed);
            }, 1000);
        }
    }

    // Event Listeners
    toggleBtn.addEventListener('click', toggleTimer);
    
    // Navigation interaction
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            // Logic to switch views would go here
        });
    });
    // Slide view elements
    const planDetailView = document.getElementById('plan-detail-view');
    const closePlanBtn = document.getElementById('close-plan-btn');
    const startWeekBtn = document.getElementById('start-week-btn');
    const detailTitle = document.getElementById('detail-plan-title');
    const detailDesc = document.getElementById('detail-plan-desc');
    const chartBarsContainer = document.getElementById('chart-bars-container');
    const scheduleListContainer = document.getElementById('schedule-list-container');
    let pendingGoalHours = 16;
    
    function formatTime(hour24) {
        if (hour24 === 0 || hour24 === 24) return '12:00 AM';
        if (hour24 === 12) return '12:00 PM';
        if (hour24 > 12) return `${hour24 - 12}:00 PM`;
        return `${hour24}:00 AM`;
    }

    function renderPlanDetails(goalHours) {
        const startHour = 20; // 8 PM
        const endHour = (startHour + goalHours) % 24;
        
        // Render Chart
        const days = ['Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu'];
        let chartHTML = '';
        
        days.forEach((day, index) => {
            let barHTML = '';
            if (index === 0) {
                // First day: Eating 0-start, Fasting start-24
                const eatPct = (startHour / 24) * 100;
                const fastPct = ((24 - startHour) / 24) * 100;
                barHTML = `<div class="bar-segment eating" style="height: ${eatPct}%;"></div><div class="bar-segment fasting" style="height: ${fastPct}%;"></div>`;
            } else if (index === 7) {
                // Last day: Fasting 0-end, Eating end-24
                const fastPct = (endHour / 24) * 100;
                const eatPct = ((24 - endHour) / 24) * 100;
                barHTML = `<div class="bar-segment fasting" style="height: ${fastPct}%;"></div><div class="bar-segment eating" style="height: ${eatPct}%;"></div>`;
            } else {
                // Middle days: Fasting 0-end, Eating end-start, Fasting start-24
                const fast1Pct = (endHour / 24) * 100;
                let eatPct = ((startHour - endHour) / 24) * 100;
                let fast2Pct = ((24 - startHour) / 24) * 100;
                
                if (startHour <= endHour) {
                    // if fast is extremely long, handle differently (e.g. 23 hours)
                    // End hour is e.g. 19. Start is 20.
                    // Fasting from 0-19 (fast1), Eating 19-20 (eatPct), Fasting 20-24 (fast2)
                    eatPct = ((startHour - endHour) / 24) * 100;
                }
                // For goal = 24, endHour = 20, eatPct = 0
                
                barHTML = `<div class="bar-segment fasting" style="height: ${fast1Pct}%;"></div><div class="bar-segment eating" style="height: ${eatPct}%;"></div><div class="bar-segment fasting" style="height: ${fast2Pct}%;"></div>`;
            }
            
            chartHTML += `<div class="day-col"><div class="bar-wrapper">${barHTML}</div><span class="x-label">${day}</span></div>`;
        });
        
        chartBarsContainer.innerHTML = chartHTML;
        
        // Render Schedule List
        const fullDays = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
        let scheduleHTML = '';
        const startTimeStr = formatTime(startHour);
        const endTimeStr = formatTime(endHour);
        
        for (let i = 0; i < 7; i++) {
            scheduleHTML += `<div class="schedule-item"><strong>Period ${i+1}:</strong> <span>${fullDays[i]} ${startTimeStr} – ${fullDays[i+1]} ${endTimeStr}</span></div>`;
        }
        
        scheduleListContainer.innerHTML = scheduleHTML;
    }

    // Plan Selection interaction
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            if (isFasting) return; // Don't allow changing plan while fasting
            
            // Remove active class from all
            planCards.forEach(c => c.classList.remove('active-plan'));
            // Add active class to clicked
            card.classList.add('active-plan');
            
            // Set pending goal
            pendingGoalHours = parseInt(card.getAttribute('data-hours'), 10);
            
            // Update detail view text
            const detailRatio = document.getElementById('detail-plan-ratio');
            if (detailRatio) detailRatio.textContent = card.querySelector('.plan-title').textContent;
            detailTitle.textContent = card.querySelector('.plan-desc').textContent;
            detailDesc.textContent = card.getAttribute('data-long-desc');
            
            // Render dynamic content
            renderPlanDetails(pendingGoalHours);
            
            // Slide in the view
            planDetailView.classList.add('active');
        });
    });

    closePlanBtn.addEventListener('click', () => {
        planDetailView.classList.remove('active');
    });

    startWeekBtn.addEventListener('click', () => {
        // Apply goal
        goalHours = pendingGoalHours;
        goalMs = goalHours * 60 * 60 * 1000;
        
        // Update UI
        goalDisplay.textContent = `Goal: ${goalHours} Hours`;
        updateDisplay(0);
        
        // Close view
        planDetailView.classList.remove('active');
    });
});
