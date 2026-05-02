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
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
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
                "Fri 8:00 PM – Sat 12:00 PM",
                "Sat 8:00 PM – Sun 12:00 PM",
                "Mon 10:00 AM – Tue 6:00 AM",
                "Tue 8:00 PM – Wed 12:00 PM",
                "Thu 12:00 AM – Fri 6:00 AM"
            ]
        },
        'power-week-2': {
            goalHours: 18,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { eatPct: (14/24)*100, fastPct: (10/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { eatPct: 100, fastPct: 0 }
            ],
            periods: [
                "Fri 8:00 PM – Sat 12:00 PM",
                "Sat 8:00 PM – Sun 12:00 PM",
                "Mon 12:00 AM – Tue 12:00 AM",
                "Tue 2:00 PM – Wed 12:00 PM",
                "Thu 12:00 AM – Fri 12:00 AM"
            ]
        },
        'ice-dive': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: (15/24)*100, eatPct: (5/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (14/24)*100, eatPct: (6/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (13/24)*100, eatPct: (7/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (11/24)*100, eatPct: (9/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (10/24)*100, eatPct: (14/24)*100, fast2Pct: 0 },
                { eatPct: 100, fastPct: 0 }
            ],
            periods: [
                "Fri 8:00 PM – Sat 3:00 PM",
                "Sat 8:00 PM – Sun 2:00 PM",
                "Sun 8:00 PM – Mon 1:00 PM",
                "Mon 8:00 PM – Tue 12:00 PM",
                "Tue 8:00 PM – Wed 11:00 AM",
                "Wed 8:00 PM – Thu 10:00 AM"
            ]
        },
        'fast-in-peace': {
            goalHours: 14,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { fast1Pct: (10/24)*100, eatPct: (4/24)*100, fast2Pct: (10/24)*100 },
                { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 }
            ],
            periods: [
                "Fri 8:00 PM – Sat 10:00 AM",
                "Sat 8:00 PM – Sun 10:00 AM",
                "Sun 8:00 PM – Mon 10:00 AM",
                "Mon 8:00 PM – Tue 10:00 AM",
                "Tue 8:00 PM – Thu 10:00 AM",
                "Thu 2:00 PM – Fri 6:00 AM"
            ]
        },
        'weekend-faster-2': {
            goalHours: 14,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (10/24)*100, eatPct: (4/24)*100, fast2Pct: (10/24)*100 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 }
            ],
            periods: [
                "Fri 8:00 PM – Sat 10:00 AM",
                "Sat 8:00 PM – Sun 10:00 AM",
                "Sun 8:00 PM – Mon 10:00 AM",
                "Mon 8:00 PM – Tue 10:00 AM",
                "Tue 8:00 PM – Wed 10:00 AM",
                "Wed 2:00 PM – Fri 6:00 AM"
            ]
        },
        'feel-good': {
            goalHours: 18,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                { eatPct: 100, fastPct: 0 },
                { eatPct: (14/24)*100, fastPct: (10/24)*100 },
                { fast1Pct: (8/24)*100, eatPct: (16/24)*100, fast2Pct: 0 },
                { fast1Pct: (18/24)*100, eatPct: (6/24)*100, fast2Pct: 0 },
                { eatPct: 100, fastPct: 0 },
                { eatPct: (14/24)*100, fastPct: (10/24)*100 },
                { fast1Pct: (8/24)*100, eatPct: (16/24)*100, fast2Pct: 0 },
                { eatPct: 100, fastPct: 0 }
            ],
            periods: [
                "Sat 2:00 PM – Sun 8:00 AM",
                "Mon 12:00 AM – Mon 6:00 PM",
                "Wed 2:00 PM – Thu 8:00 AM"
            ]
        },
        'joy-in-the-evening': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (10/24)*100, fast2Pct: (2/24)*100 },
                { fast1Pct: (16/24)*100, eatPct: (6/24)*100, fast2Pct: (2/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (10/24)*100, fast2Pct: (2/24)*100 },
                { fast1Pct: (16/24)*100, eatPct: (6/24)*100, fast2Pct: (2/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (10/24)*100, fast2Pct: (2/24)*100 },
                { fast1Pct: (16/24)*100, eatPct: (8/24)*100, fast2Pct: 0 },
                { eat1Pct: (10/24)*100, fastPct: (6/24)*100, eat2Pct: (8/24)*100 }
            ],
            periods: [
                "Fri 8:00 PM – Sat 12:00 PM",
                "Sat 10:00 PM – Sun 4:00 PM",
                "Sun 10:00 PM – Mon 12:00 PM",
                "Mon 10:00 PM – Tue 4:00 PM",
                "Tue 10:00 PM – Wed 12:00 PM",
                "Wed 10:00 PM – Thu 4:00 PM",
                "Fri 10:00 AM – Fri 4:00 PM"
            ]
        },
        'dynamic-duo-breakfast': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 }
            ],
            periods: [
                "Fri 8:00 PM – Sat 12:00 PM",
                "Sun 12:00 AM – Mon 12:00 AM",
                "Mon 8:00 PM – Tue 12:00 PM",
                "Wed 12:00 AM – Thu 12:00 AM",
                "Thu 8:00 PM – Fri 12:00 PM"
            ]
        },
        'dynamic-duo-dinner': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                { eatPct: (14/24)*100, fastPct: (10/24)*100 },
                { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { eatPct: (14/24)*100, fastPct: (10/24)*100 },
                { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { eatPct: (14/24)*100, fastPct: (10/24)*100 },
                { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 }
            ],
            periods: [
                "Fri 2:00 PM – Sat 6:00 AM",
                "Sun 12:00 AM – Mon 12:00 AM",
                "Mon 2:00 PM – Tue 6:00 AM",
                "Wed 12:00 AM – Thu 12:00 AM",
                "Thu 2:00 PM – Fri 6:00 AM"
            ]
        },
        'dynamic-duo-plus': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 }
            ],
            periods: [
                "Fri 8:00 PM – Sun 12:00 PM",
                "Sun 8:00 PM – Mon 12:00 PM",
                "Mon 8:00 PM – Wed 12:00 PM",
                "Wed 8:00 PM – Thu 12:00 PM",
                "Thu 8:00 PM – Fri 12:00 PM"
            ]
        },
        'spring-fasting': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
                { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
                { eatPct: (20/24)*100, fastPct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
                { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 }
            ],
            periods: [
                "Fri 8:00 PM – Sat 12:00 PM",
                "Sat 8:00 PM – Sun 12:00 PM",
                "Mon 12:00 AM – Tue 12:00 AM",
                "Tue 8:00 PM – Wed 12:00 PM",
                "Wed 8:00 PM – Thu 12:00 PM",
                "Thu 8:00 PM – Fri 12:00 PM"
            ]
        },
        'stone-age': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
                [ {type: 'eating', pct: (2/24)*100}, {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (2/24)*100} ],
                [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
                [ {type: 'eating', pct: (9/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (5/24)*100} ],
                [ {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (14/24)*100} ],
                [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (2/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (10/24)*100} ]
            ],
            periods: [
                "Fri 6:00 PM – Sat 12:00 AM",
                "Sat 2:00 AM – Sat 2:00 PM",
                "Sat 10:00 PM – Sun 6:00 PM",
                "Mon 9:00 AM – Mon 7:00 PM",
                "Tue 10:00 AM – Wed 2:00 PM",
                "Wed 8:00 PM – Thu 8:00 AM",
                "Thu 12:00 PM – Thu 6:00 PM",
                "Thu 8:00 PM – Fri 2:00 PM"
            ]
        },
        'aurora': {
            goalHours: 8,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (17/24)*100}, {type: 'fasting', pct: (7/24)*100} ],
                [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (8/24)*100} ],
                [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (8/24)*100} ],
                [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (8/24)*100} ],
                [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (14/24)*100} ],
                [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (16/24)*100} ]
            ],
            periods: [
                "Fri 5:00 PM – Sat 12:00 AM",
                "Sat 8:00 AM – Sat 4:00 PM",
                "Sun 8:00 AM – Sun 4:00 PM",
                "Mon 8:00 AM – Mon 4:00 PM",
                "Tue 12:00 AM – Tue 10:00 AM",
                "Wed 8:00 AM – Wed 4:00 PM",
                "Wed 8:00 PM – Thu 12:00 PM",
                "Thu 8:00 PM – Fri 8:00 AM"
            ]
        },
        'mega-week': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
                [ {type: 'fasting', pct: 100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (14/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (14/24)*100} ]
            ],
            periods: [
                "Fri 8:00 PM – Sat 12:00 PM",
                "Sat 8:00 PM – Sun 12:00 PM",
                "Mon 12:00 AM – Tue 12:00 PM",
                "Tue 8:00 PM – Wed 10:00 AM",
                "Wed 4:00 PM – Thu 6:00 AM",
                "Thu 8:00 PM – Fri 10:00 AM"
            ]
        },
        'mega-week-2': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (14/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ],
                [ {type: 'fasting', pct: 100} ],
                [ {type: 'eating', pct: (14/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ]
            ],
            periods: [
                "Fri 2:00 PM – Sat 6:00 AM",
                "Sun 12:00 AM – Mon 12:00 AM",
                "Mon 2:00 PM – Tue 6:00 AM",
                "Tue 2:00 PM – Wed 6:00 AM",
                "Wed 2:00 PM – Thu 6:00 AM",
                "Thu 2:00 PM – Fri 6:00 AM"
            ]
        },
        'brutal': {
            goalHours: 24,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: 100} ],
                [ {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (6/24)*100} ],
                [ {type: 'fasting', pct: 100} ],
                [ {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (6/24)*100} ],
                [ {type: 'fasting', pct: 100} ],
                [ {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (6/24)*100} ],
                [ {type: 'eating', pct: 100} ]
            ],
            periods: [
                "Fri 8:00 PM – Sun 12:00 AM",
                "Sun 10:00 AM – Sun 6:00 PM",
                "Mon 12:00 AM – Tue 12:00 AM",
                "Tue 10:00 AM – Tue 6:00 PM",
                "Wed 12:00 AM – Thu 12:00 AM",
                "Thu 10:00 AM – Thu 6:00 PM"
            ]
        },
        'job-for-experts': {
            goalHours: 24,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: 100} ],
                [ {type: 'fasting', pct: 100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ],
                [ {type: 'eating', pct: (17/24)*100}, {type: 'fasting', pct: (7/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
                [ {type: 'fasting', pct: 100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (11/24)*100}, {type: 'fasting', pct: (7/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ]
            ],
            periods: [
                "Sat 12:00 AM – Sun 6:00 AM",
                "Mon 5:00 PM – Tue 12:00 PM",
                "Wed 12:00 AM – Thu 6:00 AM",
                "Thu 5:00 PM – Fri 12:00 PM"
            ]
        },
        'ice-dive-2': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (15/24)*100}, {type: 'fasting', pct: (9/24)*100} ],
                [ {type: 'fasting', pct: (16/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (12/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (5/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (5/24)*100} ],
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (9/24)*100}, {type: 'eating', pct: (15/24)*100} ]
            ],
            periods: [
                "Fri 3:00 PM – Sat 4:00 PM",
                "Sat 8:00 PM – Sun 6:00 AM",
                "Sun 12:00 PM – Mon 12:00 PM",
                "Mon 8:00 PM – Tue 12:00 PM",
                "Tue 8:00 PM – Wed 6:00 AM",
                "Wed 11:00 AM – Wed 7:00 PM",
                "Thu 8:00 PM – Fri 9:00 AM"
            ]
        },
        'ice-dive-3': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (16/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
                [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (7/24)*100} ],
                [ {type: 'fasting', pct: (11/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (5/24)*100} ],
                [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (11/24)*100}, {type: 'fasting', pct: (3/24)*100} ],
                [ {type: 'fasting', pct: (9/24)*100}, {type: 'eating', pct: (13/24)*100}, {type: 'fasting', pct: (2/24)*100} ],
                [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (14/24)*100} ],
                [ {type: 'eating', pct: 100} ]
            ],
            periods: [
                "Fri 4:00 PM – Sat 2:00 PM",
                "Sat 8:00 PM – Sun 10:00 AM",
                "Sun 5:00 PM – Mon 11:00 AM",
                "Mon 7:00 PM – Tue 10:00 AM",
                "Tue 9:00 PM – Wed 9:00 AM",
                "Wed 10:00 PM – Thu 10:00 AM"
            ]
        },
        '3-days-immune-system-cure': {
            goalHours: 72,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
                [ {type: 'fasting', pct: 100} ],
                [ {type: 'fasting', pct: 100} ],
                [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ]
            ],
            periods: [
                "Sun 6:00 PM – Wed 6:00 PM"
            ]
        },
        'week-break': {
            goalHours: 0,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ]
            ],
            periods: []
        },
        'easy-fasting': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
                [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
                [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (14/24)*100} ],
                [ {type: 'eating', pct: 100} ]
            ],
            periods: [
                "Fri 8:00 PM – Sat 12:00 PM",
                "Sat 8:00 PM – Sun 12:00 PM",
                "Tue 7:00 AM – Tue 5:00 PM",
                "Wed 6:00 PM – Thu 10:00 AM"
            ]
        },
        'autophagy-week': {
            goalHours: 36,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: 100} ],
                [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (16/24)*100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ]
            ],
            periods: [
                "Sun 8:00 PM – Tue 8:00 AM"
            ]
        },
        'easy-fasting-2': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
                [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
                [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
                [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
                [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
                [ {type: 'eating', pct: 100} ]
            ],
            periods: [
                "Fri 8:00 PM – Sat 12:00 PM",
                "Sat 8:00 PM – Sun 12:00 PM",
                "Mon 7:00 AM – Mon 5:00 PM",
                "Tue 7:00 AM – Tue 5:00 PM",
                "Wed 7:00 AM – Wed 5:00 PM",
                "Thu 7:00 AM – Thu 5:00 PM"
            ]
        },
        'easy-fasting-3': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
                [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ],
                [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: (14/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ]
            ],
            periods: [
                "Fri 6:00 PM – Sat 8:00 AM",
                "Sat 2:00 PM – Sun 6:00 AM",
                "Mon 7:00 AM – Mon 5:00 PM",
                "Wed 2:00 PM – Thu 6:00 AM",
                "Thu 2:00 PM – Fri 6:00 AM"
            ]
        },
        'easy-fasting-4': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (8/24)*100} ],
                [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
                [ {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (12/24)*100} ],
                [ {type: 'eating', pct: 100} ]
            ],
            periods: [
                "Fri 8:00 PM – Sat 12:00 PM",
                "Sat 8:00 PM – Sun 12:00 PM",
                "Sun 8:00 PM – Mon 12:00 AM",
                "Tue 8:00 AM – Tue 4:00 PM",
                "Wed 12:00 AM – Wed 6:00 PM",
                "Thu 6:00 AM – Thu 12:00 PM"
            ]
        },
        'autophagy-week-2': {
            goalHours: 48,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
                [ {type: 'fasting', pct: 100} ],
                [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ],
                [ {type: 'eating', pct: 100} ]
            ],
            periods: [
                "Sun 6:00 PM – Tue 6:00 PM"
            ]
        },
        'relaxed-fasting': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
                [ {type: 'eating', pct: (9/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (5/24)*100} ],
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
                [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (16/24)*100} ],
                [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (12/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (16/24)*100} ]
            ],
            periods: [
                "Fri 8:00 PM – Sat 12:00 PM",
                "Sun 9:00 AM – Sun 7:00 PM",
                "Mon 8:00 PM – Tue 12:00 PM",
                "Wed 8:00 AM – Thu 8:00 AM",
                "Thu 8:00 PM – Fri 8:00 AM"
            ]
        },
        'relaxed-fasting-2': {
            goalHours: 16,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (19/24)*100}, {type: 'fasting', pct: (5/24)*100} ],
                [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (10/24)*100} ],
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
                [ {type: 'eating', pct: (9/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (5/24)*100} ],
                [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
                [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (10/24)*100} ],
                [ {type: 'eating', pct: 100} ]
            ],
            periods: [
                "Fri 7:00 PM – Sat 2:00 PM",
                "Sun 8:00 PM – Mon 12:00 PM",
                "Tue 9:00 AM – Tue 7:00 PM",
                "Wed 6:00 PM – Thu 2:00 PM"
            ]
        },
        'relaxed-fasting-3': {
            goalHours: 14,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (11/24)*100}, {type: 'eating', pct: (13/24)*100} ],
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (11/24)*100}, {type: 'eating', pct: (9/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (10/24)*100} ],
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ]
            ],
            periods: [
                "Fri 8:00 PM – Sat 10:00 AM",
                "Sat 8:00 PM – Sun 11:00 AM",
                "Mon 8:00 PM – Tue 11:00 AM",
                "Tue 8:00 PM – Wed 2:00 PM",
                "Thu 8:00 PM – Fri 6:00 AM"
            ]
        },
        'relaxed-fasting-4': {
            goalHours: 14,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (16/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
                [ {type: 'fasting', pct: (7/24)*100}, {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (7/24)*100} ],
                [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (16/24)*100} ],
                [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
                [ {type: 'fasting', pct: (9/24)*100}, {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (12/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ]
            ],
            periods: [
                "Fri 4:00 PM – Sat 6:00 AM",
                "Sat 4:00 PM – Sun 7:00 AM",
                "Sun 5:00 PM – Mon 8:00 AM",
                "Tue 6:00 PM – Wed 9:00 AM",
                "Wed 4:00 PM – Thu 6:00 AM",
                "Thu 4:00 PM – Fri 6:00 AM"
            ]
        },
        'resilience-booster': {
            goalHours: 22,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (2/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
                [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (14/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
                [ {type: 'eating', pct: (12/24)*100}, {type: 'fasting', pct: (12/24)*100} ],
                [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (14/24)*100} ],
                [ {type: 'eating', pct: 100} ]
            ],
            periods: [
                "Fri 8:00 PM – Sat 6:00 PM",
                "Sat 8:00 PM – Sun 12:00 PM",
                "Sun 4:00 PM – Mon 6:00 AM",
                "Mon 8:00 PM – Tue 12:00 PM",
                "Wed 12:00 PM – Thu 10:00 AM"
            ]
        },
        'resilience-booster-2': {
            goalHours: 22,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
                [ {type: 'fasting', pct: (16/24)*100}, {type: 'eating', pct: (8/24)*100} ],
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
                [ {type: 'eating', pct: (12/24)*100}, {type: 'fasting', pct: (12/24)*100} ],
                [ {type: 'fasting', pct: (11/24)*100}, {type: 'eating', pct: (5/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ]
            ],
            periods: [
                "Fri 6:00 PM – Sat 12:00 PM",
                "Sat 4:00 PM – Sun 4:00 PM",
                "Mon 8:00 PM – Tue 6:00 PM",
                "Wed 12:00 PM – Thu 11:00 AM",
                "Thu 4:00 PM – Fri 12:00 PM"
            ]
        },
        'resilience-booster-3': {
            goalHours: 20,
            labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
            days: [
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (20/24)*100}, {type: 'eating', pct: (4/24)*100} ],
                [ {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (4/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (4/24)*100}, {type: 'eating', pct: (5/24)*100}, {type: 'fasting', pct: (3/24)*100} ],
                [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
                [ {type: 'eating', pct: (12/24)*100}, {type: 'fasting', pct: (4/24)*100}, {type: 'eating', pct: (8/24)*100} ],
                [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
                [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (16/24)*100} ]
            ],
            periods: [
                "Fri 8:00 PM – Sat 12:00 PM",
                "Sat 8:00 PM – Sun 8:00 PM",
                "Mon 4:00 AM – Mon 8:00 AM",
                "Mon 12:00 PM – Mon 4:00 PM",
                "Mon 9:00 PM – Tue 6:00 PM",
                "Wed 12:00 PM – Wed 4:00 PM",
                "Thu 8:00 PM – Fri 8:00 AM"
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
            const customLabels = custom.labels || days;
            
            // Render Custom Chart
            custom.days.forEach((dayData, index) => {
                let barHTML = '';
                if (Array.isArray(dayData)) {
                    dayData.forEach(segment => {
                        barHTML += `<div class="bar-segment ${segment.type}" style="height: ${segment.pct}%;"></div>`;
                    });
                } else if (dayData.eat1Pct !== undefined) {
                    barHTML = `<div class="bar-segment eating" style="height: ${dayData.eat1Pct}%;"></div>` +
                              `<div class="bar-segment fasting" style="height: ${dayData.fastPct}%;"></div>` +
                              `<div class="bar-segment eating" style="height: ${dayData.eat2Pct}%;"></div>`;
                } else if (dayData.fast1Pct !== undefined) {
                    barHTML = `<div class="bar-segment fasting" style="height: ${dayData.fast1Pct}%;"></div>` +
                              `<div class="bar-segment eating" style="height: ${dayData.eatPct}%;"></div>` +
                              `<div class="bar-segment fasting" style="height: ${dayData.fast2Pct}%;"></div>`;
                } else {
                    barHTML = `<div class="bar-segment eating" style="height: ${dayData.eatPct}%;"></div>` +
                              `<div class="bar-segment fasting" style="height: ${dayData.fastPct}%;"></div>`;
                }
                chartHTML += `<div class="day-col"><div class="bar-wrapper">${barHTML}</div><span class="x-label">${customLabels[index]}</span></div>`;
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

    // Autophagy Plans View Navigation
    const autophagyPlansView = document.getElementById('autophagy-plans-view');
    const openAutophagyPlansBtn = document.getElementById('open-autophagy-plans-btn');
    const closeAutophagyPlansBtn = document.getElementById('close-autophagy-plans-btn');

    if (openAutophagyPlansBtn) {
        openAutophagyPlansBtn.addEventListener('click', () => {
            autophagyPlansView.classList.add('active');
        });
    }

    if (closeAutophagyPlansBtn) {
        closeAutophagyPlansBtn.addEventListener('click', () => {
            autophagyPlansView.classList.remove('active');
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

    // ===== Knowledge Base =====
    const KB_ARTICLES = {
        'intermittent': {
            title: 'The intermittent fasting method',
            hero: { bg: 'linear-gradient(135deg, #a8edea, #2dd4bf)', emoji: '🕐' },
            questions: [
                { q: 'What is the origin of intermittent fasting?', a: '<p>Fasting has been practiced for thousands of years, rooted in religious and cultural traditions across the world. Scientifically, it gained momentum in the early 2000s when researchers discovered its metabolic benefits beyond simple calorie restriction.</p>' },
                { q: 'How does intermittent fasting work?', a: '<p>When you fast, insulin levels drop, signaling your body to burn stored fat for energy. After 12–16 hours, your body enters <strong>ketosis</strong> and begins <strong>autophagy</strong> — a cellular self-cleaning process that removes damaged components and promotes repair.</p>' },
                { q: 'Who is intermittent fasting suitable for?', a: '<p>Most healthy adults can safely practice intermittent fasting. It is particularly beneficial for people looking to lose weight, improve metabolic health, or enhance mental clarity.</p><p><strong>Consult your doctor first</strong> if you are pregnant, diabetic, have a history of eating disorders, or take prescription medications.</p>' },
                { q: 'What forms of intermittent fasting are there?', a: '<ul><li><strong>16:8</strong> — Fast 16h, eat within 8h window</li><li><strong>18:6 / 20:4</strong> — Shorter eating windows for deeper results</li><li><strong>OMAD</strong> — One meal a day</li><li><strong>5:2</strong> — Normal eating 5 days, ~500 kcal on 2 days</li><li><strong>36h / 48h</strong> — Extended fasts for autophagy</li></ul>' },
                { q: 'What are the positive effects of intermittent fasting?', a: '<ul><li>Fat loss while preserving muscle mass</li><li>Improved insulin sensitivity</li><li>Reduced inflammation markers</li><li>Enhanced autophagy and cellular repair</li><li>Better mental clarity and focus</li><li>Improved cardiovascular risk factors</li></ul>' },
                { q: 'How does intermittent fasting help me to lose weight?', a: '<p>By restricting your eating window, you naturally consume fewer calories. Additionally, fasting lowers insulin — the fat-storage hormone — and raises norepinephrine, which boosts your metabolic rate by up to <strong>14%</strong>.</p>' },
                { q: 'Why is intermittent fasting different to other diets?', a: '<p>Most diets restrict <em>what</em> you eat. Intermittent fasting restricts <em>when</em> you eat. This makes it easier to sustain long-term because you don\'t need to count every calorie or avoid entire food groups.</p>' },
                { q: 'Why is there no yo-yo effect with intermittent fasting?', a: '<p>Traditional diets often slow your metabolism, leading to weight regain. Intermittent fasting preserves muscle mass and keeps your metabolic rate stable, reducing the risk of the yo-yo effect significantly.</p>' },
                { q: 'How long must I do intermittent fasting?', a: '<p>You can see benefits within the <strong>first 2–4 weeks</strong>. Most people choose to make it a permanent lifestyle rather than a temporary diet, since it's flexible and sustainable long-term.</p>' },
                { q: 'Can intermittent fasting be combined with low Carb, Keto etc.?', a: '<p>Yes! Combining IF with a low-carb or ketogenic diet accelerates ketosis and fat burning. They are highly complementary approaches. However, start with just IF first if you\'re a beginner — don\'t change everything at once.</p>' }
            ]
        },
        'first-week': {
            title: 'Your first fasting week',
            hero: { bg: 'linear-gradient(135deg, #ffecd2, #fcb69f)', emoji: '📅' },
            questions: [
                { q: 'What should I expect on day 1?', a: '<p>Day 1 is often the easiest — motivation is high. You may feel minor hunger around your usual meal times. Drink water or herbal tea to ride out the waves.</p>' },
                { q: 'Why do I feel irritable or tired?', a: '<p>Your body is switching from glucose to fat as its primary fuel. This adaptation phase (sometimes called "keto flu") causes temporary fatigue, irritability, and brain fog. It passes within 2–4 days.</p>' },
                { q: 'What is the best eating window for beginners?', a: '<p>The most popular beginner window is <strong>12pm–8pm</strong>. You skip breakfast, have lunch as your first meal, and finish eating by 8pm. This aligns naturally with social eating and work schedules.</p>' },
                { q: 'What can I drink during the fast?', a: '<ul><li>✅ Water (still or sparkling)</li><li>✅ Black coffee</li><li>✅ Plain herbal or green tea</li><li>❌ Juice, milk, or any caloric drink</li></ul>' },
                { q: 'When will it start feeling easier?', a: '<p>Most people feel a significant shift around <strong>day 3–4</strong>. Hunger becomes manageable, energy stabilizes, and the eating window starts to feel natural rather than forced.</p>' },
                { q: 'How do I break my fast properly?', a: '<p>Break your fast with a balanced, moderate-sized meal. Avoid binge eating — your stomach will be sensitive. Good first meals: eggs, salad, avocado, fish, or a protein smoothie.</p>' }
            ]
        },
        'during': {
            title: 'During the fasting period',
            hero: { bg: 'linear-gradient(135deg, #ffd89b, #3a7bd5)', emoji: '☕' },
            questions: [
                { q: 'Can I drink coffee while fasting?', a: '<p><strong>Yes</strong> — black coffee is fine and actually supports fasting. It suppresses appetite and slightly boosts fat oxidation. Avoid adding sugar, milk, or cream as these break the fast.</p>' },
                { q: 'Does tea break a fast?', a: '<p>Plain herbal, green, or black tea contains zero calories and will not break your fast. Avoid sweetened teas or adding any milk.</p>' },
                { q: 'How do I handle hunger pangs?', a: '<p>Hunger comes in waves and typically passes within 15–20 minutes. Strategies that help:<br>• Drink a large glass of cold water<br>• Go for a short walk<br>• Stay busy with a task<br>• Drink herbal tea</p>' },
                { q: 'Can I exercise while fasting?', a: '<p>Yes. Light to moderate exercise — walking, yoga, cycling — is well tolerated and may enhance fat burning. Avoid heavy weightlifting on your first week fasted. Morning fasted cardio is a popular strategy.</p>' },
                { q: 'Will fasting slow my metabolism?', a: '<p>Short-term fasting (up to 48h) actually <strong>increases</strong> metabolic rate slightly due to norepinephrine release. Only prolonged starvation (weeks of extreme restriction) slows metabolism.</p>' },
                { q: 'Can I take medications during a fast?', a: '<p>Always follow your doctor\'s instructions. Some medications must be taken with food. <strong>Never skip essential medications</strong> to maintain a fast — your health comes first.</p>' }
            ]
        },
        'nutrition': {
            title: 'Nutrition',
            hero: { bg: 'linear-gradient(135deg, #f093fb, #f5576c)', emoji: '🥗' },
            questions: [
                { q: 'What should I eat to break my fast?', a: '<p>Choose balanced, nutrient-dense meals: lean protein (chicken, fish, eggs), healthy fats (avocado, olive oil), and fiber-rich vegetables. Avoid starting with large, heavy, processed meals.</p>' },
                { q: 'How much protein do I need?', a: '<p>Aim for <strong>0.8–1.2g of protein per kg of body weight</strong> per day. Higher protein intake helps preserve muscle mass during fasting and increases satiety during your eating window.</p>' },
                { q: 'Should I count calories while fasting?', a: '<p>Not necessarily for everyone. Many people naturally eat less just by narrowing their eating window. However, if weight loss stalls, tracking for a few days can help identify hidden overeating.</p>' },
                { q: 'What foods should I avoid?', a: '<ul><li>Ultra-processed foods and fast food</li><li>Refined carbohydrates (white bread, pasta, pastries)</li><li>Sugary beverages and snacks</li><li>Excessive alcohol</li></ul>' },
                { q: 'Is breakfast important?', a: '<p>The idea that "breakfast is the most important meal" is largely a marketing myth. Research shows skipping breakfast (as in 16:8 fasting) has no negative effects for most healthy adults and may provide metabolic benefits.</p>' }
            ]
        },
        'problems': {
            title: 'Problems while fasting',
            hero: { bg: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', emoji: '🩺' },
            questions: [
                { q: 'I have a headache — what should I do?', a: '<p>Headaches are usually caused by <strong>dehydration or low electrolytes</strong>. Drink water with a small pinch of sea salt, or take an electrolyte supplement. Reduce or delay caffeine if you\'re not used to it.</p>' },
                { q: 'I feel dizzy during my fast', a: '<p>Mild dizziness is common in early adaptation. Sit down, drink water, and take a few slow breaths. If dizziness is severe or persistent, <strong>break your fast immediately</strong> and consult a doctor.</p>' },
                { q: 'I can\'t sleep well since I started fasting', a: '<p>Fasting can temporarily affect cortisol and sleep patterns. Try finishing your eating window at least 3 hours before bed. Magnesium glycinate in the evening can help improve sleep quality.</p>' },
                { q: 'I feel nauseous when I break my fast', a: '<p>This happens when you eat too quickly or too heavily after a fast. Break your fast gently with a small, easily digestible meal. Wait 30 minutes before having a larger meal.</p>' },
                { q: 'My weight loss has stalled', a: '<p>Plateaus are normal. Try: extending your fasting window, checking that you\'re not overeating in your window, adding light exercise, or drinking more water. Patience is key — the body adapts in cycles.</p>' }
            ]
        },
        'health': {
            title: 'Health',
            hero: { bg: 'linear-gradient(135deg, #84fab0, #8fd3f4)', emoji: '💚' },
            questions: [
                { q: 'What is autophagy and when does it start?', a: '<p>Autophagy is your body\'s cellular self-cleaning process — it removes damaged proteins and organelles. It begins after roughly <strong>12–16 hours</strong> of fasting and peaks around 24–48 hours.</p>' },
                { q: 'Can fasting improve my blood sugar?', a: '<p>Yes. Fasting dramatically lowers insulin and blood glucose levels. Studies show it can improve insulin sensitivity by <strong>20–31%</strong>, making it a powerful tool for managing pre-diabetes and Type 2 diabetes.</p>' },
                { q: 'Is fasting good for the heart?', a: '<p>Research shows IF can reduce LDL cholesterol, blood pressure, triglycerides, and inflammatory markers — all key risk factors for cardiovascular disease.</p>' },
                { q: 'Does fasting affect muscle mass?', a: '<p>Short-term fasting does <strong>not</strong> cause significant muscle loss when combined with adequate protein intake. In fact, fasting increases growth hormone, which helps preserve and even build muscle.</p>' },
                { q: 'Is fasting safe long-term?', a: '<p>For most healthy adults, yes. Long-term IF practitioners maintain excellent metabolic health. Always get periodic blood work to monitor key markers. Consult your doctor if you have any chronic conditions.</p>' }
            ]
        },
        'features': {
            title: 'App features',
            hero: { bg: 'linear-gradient(135deg, #f6d365, #fda085)', emoji: '⭐' },
            questions: [
                { q: 'How does the fasting timer work?', a: '<p>Tap <strong>Start Fasting</strong> on the main screen to begin tracking your fast in real-time. The ring fills as you approach your goal. You can end the fast at any time by tapping the button again.</p>' },
                { q: 'How do I choose a fasting plan?', a: '<p>From the main screen, browse <strong>Standard Plans</strong>, <strong>Special Plans</strong>, or <strong>Autophagy Plans</strong>. Tap any plan to preview its chart and periods, then tap <strong>Start Week</strong> to activate it.</p>' },
                { q: 'Can I customize my fasting times?', a: '<p>Yes! In any plan\'s detail view, tap <strong>Change Times</strong> to open the Plan Editor and adjust your fasting periods to match your personal schedule.</p>' },
                { q: 'What is the Water Tracker?', a: '<p>Found on the main screen, the Water Tracker lets you log daily hydration. Tap <strong>+250ml</strong> or <strong>+500ml</strong> to add intake. Staying hydrated is critical during fasting.</p>' },
                { q: 'What is a Joker Day?', a: '<p>A Joker Day is a built-in flexibility feature. If life gets in the way and you can\'t complete your fast, activating a Joker Day lets you skip without breaking your streak — everyone gets one per week.</p>' }
            ]
        },
        'coach': {
            title: 'The Coach',
            hero: { bg: 'linear-gradient(135deg, #d4fc79, #96e6a1)', emoji: '🏆' },
            questions: [
                { q: 'What does the Coach do?', a: '<p>The Coach analyzes your fasting history, goals, and progress to provide <strong>personalized plan recommendations</strong>, motivational nudges, and science-based tips tailored to where you are in your fasting journey.</p>' },
                { q: 'How does the Coach choose my plan?', a: '<p>Based on your experience level, weight goal, and schedule, the Coach selects the optimal fasting window and plan type — whether that\'s a gentle 16:8 for beginners or a deep Autophagy Week for advanced fasters.</p>' },
                { q: 'Top tips from the Coach', a: '<ul><li>🌙 Start your fast right after dinner — sleep handles most of it</li><li>💧 Drink 500ml of water first thing in the morning</li><li>🧘 A short walk during your fast accelerates fat oxidation</li><li>✅ A 14h fast beats skipping entirely — consistency wins</li><li>📊 Review your stats weekly to stay motivated</li></ul>' }
            ]
        }
    };

    const openKbBtn = document.getElementById('open-knowledge-base-btn');
    const closeKbBtn = document.getElementById('close-knowledge-base-btn');
    const kbView = document.getElementById('knowledge-base-view');
    const kbArticleView = document.getElementById('kb-article-view');
    const closeKbArticleBtn = document.getElementById('close-kb-article-btn');
    const kbArticleTitle = document.getElementById('kb-article-title');
    const kbArticleHero = document.getElementById('kb-article-hero');
    const kbArticleHeroEmoji = document.getElementById('kb-article-hero-emoji');
    const kbQuestionsList = document.getElementById('kb-questions-list');
    const kbQuestionView = document.getElementById('kb-question-view');
    const closeKbQuestionBtn = document.getElementById('close-kb-question-btn');
    const kbQuestionTitle = document.getElementById('kb-question-title');
    const kbQuestionBody = document.getElementById('kb-question-body');

    if (openKbBtn) openKbBtn.addEventListener('click', () => kbView.classList.add('active'));
    if (closeKbBtn) closeKbBtn.addEventListener('click', () => kbView.classList.remove('active'));
    if (closeKbArticleBtn) closeKbArticleBtn.addEventListener('click', () => kbArticleView.classList.remove('active'));
    if (closeKbQuestionBtn) closeKbQuestionBtn.addEventListener('click', () => kbQuestionView.classList.remove('active'));

    document.querySelectorAll('.kb-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const articleKey = btn.dataset.article;
            const article = KB_ARTICLES[articleKey];
            if (!article) return;

            // Set hero
            kbArticleHero.style.background = article.hero.bg;
            kbArticleHeroEmoji.textContent = article.hero.emoji;
            kbArticleTitle.textContent = article.title;

            // Build Q&A list
            kbQuestionsList.innerHTML = article.questions.map((item, i) => `
                <button class="kb-item kb-q-item" data-article="${articleKey}" data-qi="${i}">
                    <span class="kb-title">${item.q}</span>
                    <svg class="kb-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            `).join('');

            // Wire sub-question clicks
            kbQuestionsList.querySelectorAll('.kb-q-item').forEach(qBtn => {
                qBtn.addEventListener('click', () => {
                    const qi = parseInt(qBtn.dataset.qi);
                    const q = article.questions[qi];
                    kbQuestionTitle.textContent = q.q;
                    kbQuestionBody.innerHTML = `<div class="kb-answer">${q.a}</div>`;
                    kbQuestionView.classList.add('active');
                });
            });

            kbArticleView.classList.add('active');
        });
    });
});

