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

    function startFasting() {
        if (isFasting) return;
        isFasting = true;
        startTime = Date.now();
        
        // Update UI
        toggleBtn.style.display = 'block'; // Show the "End Fasting" button
        toggleBtn.textContent = 'End Fasting';
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

    function endFasting() {
        if (!isFasting) return;
        clearInterval(timerInterval);
        isFasting = false;
        
        // Update UI
        toggleBtn.style.display = 'none'; // Hide the button
        timeLabel.textContent = 'Ready to start';
        
        updateDisplay(0);
    }

    // Event Listeners
    toggleBtn.addEventListener('click', endFasting);
    
    // Navigation interaction
    const navItems = document.querySelectorAll('.nav-item');
    const views = {
        'fasting-view': document.getElementById('fasting-view'),
        'stats-view': document.getElementById('stats-view'),
        'me-view': document.getElementById('me-view')
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active to clicked
            item.classList.add('active');
            
            // Switch views
            const target = item.getAttribute('data-target');
            if (target && views[target]) {
                Object.values(views).forEach(v => {
                    if (v) v.classList.add('hidden-view');
                });
                views[target].classList.remove('hidden-view');
            }
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

    const CUSTOM_SCHEDULES = {
        'power-week': {
            goalHours: 18,
            days: [
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
                { fast1Pct: 0, eatPct: (10/24)*100, fast2Pct: (14/24)*100 },
                { fast1Pct: (6/24)*100, eatPct: (14/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 }
            ],
            periods: [
                "Tue 8:00 PM – Wed 12:00 PM",
                "Wed 8:00 PM – Thu 12:00 PM",
                "Fri 10:00 AM – Sat 6:00 AM",
                "Sat 8:00 PM – Sun 12:00 PM",
                "Mon 12:00 AM – Tue 6:00 AM"
            ]
        },
        'power-week-2': {
            goalHours: 18,
            days: [
                { eatPct: (20/24)*100, fastPct: (4/24)*100 }, // Tu
                { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 }, // We
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 }, // Th
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 }, // Fr: 12am to 12am is 24h
                { fast1Pct: 0, eatPct: (14/24)*100, fast2Pct: (10/24)*100 }, // Sa: 2pm to 12pm Sun
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 }, // Su: finish fast at 12pm
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 }, // Mo: 12am to 12am
                { fast1Pct: 0, eatPct: 100, fast2Pct: 0 } // Tu
            ],
            periods: [
                "Tue 8:00 PM – Wed 12:00 PM",
                "Wed 8:00 PM – Thu 12:00 PM",
                "Fri 12:00 AM – Sat 12:00 AM",
                "Sat 2:00 PM – Sun 12:00 PM",
                "Mon 12:00 AM – Tue 12:00 AM"
            ]
        }
    };

    function renderPlanDetails(planIdOrHours) {
        let chartHTML = '';
        let scheduleHTML = '';
        const days = ['Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu'];
        
        if (typeof planIdOrHours === 'string' && CUSTOM_SCHEDULES[planIdOrHours]) {
            // Custom Schedule Logic
            const custom = CUSTOM_SCHEDULES[planIdOrHours];
            
            // Render Custom Chart
            custom.days.forEach((dayData, index) => {
                let barHTML = '';
                if (dayData.fast1Pct !== undefined) {
                    barHTML = `<div class="bar-segment fasting" style="height: ${dayData.fast1Pct}%;"></div>` +
                              `<div class="bar-segment eating" style="height: ${dayData.eatPct}%;"></div>` +
                              `<div class="bar-segment fasting" style="height: ${dayData.fast2Pct}%;"></div>`;
                } else {
                    barHTML = `<div class="bar-segment eating" style="height: ${dayData.eatPct}%;"></div>` +
                              `<div class="bar-segment fasting" style="height: ${dayData.fastPct}%;"></div>`;
                }
                chartHTML += `<div class="day-col"><div class="bar-wrapper">${barHTML}</div><span class="x-label">${days[index]}</span></div>`;
            });
            
            // Render Custom Schedule
            custom.periods.forEach((periodStr, i) => {
                scheduleHTML += `<div class="schedule-item"><strong>Period ${i+1}:</strong> <span>${periodStr}</span></div>`;
            });
            
        } else {
            // Regular Math-Based Schedule Logic
            const goalHours = parseInt(planIdOrHours, 10);
            const startHour = 20; // 8 PM
            const endHour = (startHour + goalHours) % 24;
            
            days.forEach((day, index) => {
                let barHTML = '';
                if (index === 0) {
                    const eatPct = (startHour / 24) * 100;
                    const fastPct = ((24 - startHour) / 24) * 100;
                    barHTML = `<div class="bar-segment eating" style="height: ${eatPct}%;"></div><div class="bar-segment fasting" style="height: ${fastPct}%;"></div>`;
                } else if (index === 7) {
                    const fastPct = (endHour / 24) * 100;
                    const eatPct = ((24 - endHour) / 24) * 100;
                    barHTML = `<div class="bar-segment fasting" style="height: ${fastPct}%;"></div><div class="bar-segment eating" style="height: ${eatPct}%;"></div>`;
                } else {
                    const fast1Pct = (endHour / 24) * 100;
                    let eatPct = ((startHour - endHour) / 24) * 100;
                    let fast2Pct = ((24 - startHour) / 24) * 100;
                    
                    if (startHour <= endHour) {
                        eatPct = ((startHour - endHour) / 24) * 100;
                    }
                    barHTML = `<div class="bar-segment fasting" style="height: ${fast1Pct}%;"></div><div class="bar-segment eating" style="height: ${eatPct}%;"></div><div class="bar-segment fasting" style="height: ${fast2Pct}%;"></div>`;
                }
                chartHTML += `<div class="day-col"><div class="bar-wrapper">${barHTML}</div><span class="x-label">${day}</span></div>`;
            });
            
            const fullDays = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
            const startTimeStr = formatTime(startHour);
            const endTimeStr = formatTime(endHour);
            
            for (let i = 0; i < 7; i++) {
                scheduleHTML += `<div class="schedule-item"><strong>Period ${i+1}:</strong> <span>${fullDays[i]} ${startTimeStr} – ${fullDays[i+1]} ${endTimeStr}</span></div>`;
            }
        }
        
        // Apply HTML to DOM
        chartBarsContainer.innerHTML = chartHTML;
        const editorChartBarsContainer = document.getElementById('editor-chart-bars-container');
        if (editorChartBarsContainer) editorChartBarsContainer.innerHTML = chartHTML;
        
        scheduleListContainer.innerHTML = scheduleHTML;
        const editorScheduleListContainer = document.getElementById('editor-schedule-list-container');
        if (editorScheduleListContainer) editorScheduleListContainer.innerHTML = scheduleHTML;
    }

    // Plan Editor View Navigation
    const planEditorView = document.getElementById('plan-editor-view');
    const openEditorBtn = document.getElementById('open-editor-btn');
    const cancelEditorBtn = document.getElementById('cancel-editor-btn');
    const doneEditorBtn = document.getElementById('done-editor-btn');

    if (openEditorBtn) {
        openEditorBtn.addEventListener('click', () => {
            planEditorView.classList.add('active');
        });
    }

    if (cancelEditorBtn) {
        cancelEditorBtn.addEventListener('click', () => {
            planEditorView.classList.remove('active');
        });
    }

    if (doneEditorBtn) {
        doneEditorBtn.addEventListener('click', () => {
            planEditorView.classList.remove('active');
            // Normally this would save any changes made in the editor
        });
    }

    // Special Plans View Navigation
    const specialPlansView = document.getElementById('special-plans-view');
    const openSpecialPlansBtn = document.getElementById('open-special-plans-btn');
    const closeSpecialPlansBtn = document.getElementById('close-special-plans-btn');

    if (openSpecialPlansBtn) {
        openSpecialPlansBtn.addEventListener('click', () => {
            specialPlansView.classList.add('active');
        });
    }

    if (closeSpecialPlansBtn) {
        closeSpecialPlansBtn.addEventListener('click', () => {
            specialPlansView.classList.remove('active');
        });
    }

    // Plan Selection interaction
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            if (isFasting) return; // Don't allow changing plan while fasting
            
            // Remove active class from all
            planCards.forEach(c => c.classList.remove('active-plan'));
            // Add active class to clicked
            card.classList.add('active-plan');
            
            // Update detail view text
            const detailRatio = document.getElementById('detail-plan-ratio');
            if (detailRatio) detailRatio.textContent = card.querySelector('.plan-title').textContent;
            detailTitle.textContent = card.querySelector('.plan-desc').textContent;
            detailDesc.textContent = card.getAttribute('data-long-desc');

            // Set pending goal
            if (card.hasAttribute('data-plan-id')) {
                const planId = card.getAttribute('data-plan-id');
                pendingGoalHours = CUSTOM_SCHEDULES[planId] ? CUSTOM_SCHEDULES[planId].goalHours : 16;
                // Render dynamic content
                renderPlanDetails(planId);
            } else {
                pendingGoalHours = parseInt(card.getAttribute('data-hours'), 10);
                // Render dynamic content
                renderPlanDetails(pendingGoalHours);
            }
            
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
        
        // Close views
        planDetailView.classList.remove('active');
        if (typeof specialPlansView !== 'undefined' && specialPlansView) {
            specialPlansView.classList.remove('active');
        }
        
        // Switch to Fasting tab
        navItems.forEach(i => i.classList.remove('active'));
        document.querySelector('[data-target="fasting-view"]').classList.add('active');
        Object.values(views).forEach(v => v.classList.add('hidden-view'));
        views['fasting-view'].classList.remove('hidden-view');

        // Start the timer!
        startFasting();
    });

    // --- Profile & Water Logic ---
    const weightInput = document.getElementById('user-weight');
    const heightInput = document.getElementById('user-height');
    const bmiDisplay = document.getElementById('user-bmi');
    const saveStatsBtn = document.getElementById('save-stats-btn');

    const waterCurrentDisplay = document.getElementById('water-current');
    const waterProgressFill = document.getElementById('water-progress-fill');
    const waterBtns = document.querySelectorAll('.water-btn');
    const WATER_GOAL = 2000;
    
    // Load saved stats
    const savedWeight = localStorage.getItem('fastwise_weight');
    const savedHeight = localStorage.getItem('fastwise_height');
    let currentWater = parseInt(localStorage.getItem('fastwise_water') || '0', 10);
    
    if (savedWeight) weightInput.value = savedWeight;
    if (savedHeight) heightInput.value = savedHeight;
    updateBMI();
    updateWaterUI();

    function updateBMI() {
        const w = parseFloat(weightInput.value);
        const h = parseFloat(heightInput.value) / 100; // cm to m
        if (w > 0 && h > 0) {
            const bmi = (w / (h * h)).toFixed(1);
            bmiDisplay.textContent = bmi;
        } else {
            bmiDisplay.textContent = '--';
        }
    }

    if (saveStatsBtn) {
        saveStatsBtn.addEventListener('click', () => {
            localStorage.setItem('fastwise_weight', weightInput.value);
            localStorage.setItem('fastwise_height', heightInput.value);
            updateBMI();
            
            // Brief visual feedback
            const originalText = saveStatsBtn.textContent;
            saveStatsBtn.textContent = 'Saved!';
            setTimeout(() => saveStatsBtn.textContent = originalText, 2000);
        });
    }

    function updateWaterUI() {
        if (!waterCurrentDisplay) return;
        waterCurrentDisplay.textContent = currentWater;
        const pct = Math.min((currentWater / WATER_GOAL) * 100, 100);
        waterProgressFill.style.width = `${pct}%`;
        localStorage.setItem('fastwise_water', currentWater.toString());
    }

    waterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = parseInt(btn.getAttribute('data-amount'), 10);
            currentWater += amount;
            updateWaterUI();
        });
    });

    const shareProgressBtn = document.getElementById('share-progress-btn');
    if (shareProgressBtn) {
        shareProgressBtn.addEventListener('click', async () => {
            const currentBMI = bmiDisplay.textContent;
            const water = currentWater;
            
            const shareData = {
                title: 'My Fasting Progress',
                text: `I've been using FastWise! My current BMI is ${currentBMI} and I've drank ${water}ml of water today. Join me!`,
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            } else {
                // Fallback
                alert(`Share this info: \n\n${shareData.text}`);
            }
        });
    }
});
