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
    // Plan Selection interaction
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            if (isFasting) return; // Don't allow changing plan while fasting
            
            // Remove active class from all
            planCards.forEach(c => c.classList.remove('active-plan'));
            // Add active class to clicked
            card.classList.add('active-plan');
            
            // Update goal
            goalHours = parseInt(card.getAttribute('data-hours'), 10);
            goalMs = goalHours * 60 * 60 * 1000;
            
            // Update UI
            goalDisplay.textContent = `Goal: ${goalHours} Hours`;
            
            // If timer is not running, we can reset the display just in case
            updateDisplay(0);
        });
    });
});
