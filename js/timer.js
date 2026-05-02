import { state } from './state.js';

let timeDisplay, toggleBtn, ringProgress, timeLabel, goalDisplay;
let circumference;
const tickCallbacks = [];

export function registerOnTick(fn) {
    tickCallbacks.push(fn);
}

export function initTimer() {
    timeDisplay  = document.getElementById('time-display');
    toggleBtn    = document.getElementById('toggle-timer-btn');
    ringProgress = document.querySelector('.ring-progress');
    timeLabel    = document.querySelector('.time-label');
    goalDisplay  = document.querySelector('.fasting-goal');

    const radius = ringProgress.r.baseVal.value;
    circumference = radius * 2 * Math.PI;
    ringProgress.style.strokeDasharray  = `${circumference} ${circumference}`;
    ringProgress.style.strokeDashoffset = circumference;

    toggleBtn.addEventListener('click', endFasting);
}

export function updateDisplay(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours   = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timeDisplay.textContent =
        `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;

    const progress = Math.min(ms / state.goalMs, 1);
    ringProgress.style.strokeDashoffset = circumference - progress * circumference;
    ringProgress.style.stroke = progress >= 1 ? 'var(--success-color)' : 'var(--timer-color-active)';
}

export function startFasting() {
    if (state.isFasting) return;
    state.isFasting = true;
    state.startTime = Date.now();

    toggleBtn.style.display = 'block';
    toggleBtn.textContent   = 'End Fasting';
    toggleBtn.classList.add('stop');
    toggleBtn.classList.remove('pulse');
    timeLabel.textContent   = 'Elapsed Time';
    goalDisplay.textContent = `Goal: ${state.goalHours} Hours`;

    updateDisplay(0);

    const stagesBarEl = document.getElementById('stages-bar');
    if (stagesBarEl) stagesBarEl.style.display = 'block';

    state.timerInterval = setInterval(() => {
        const elapsed = Date.now() - state.startTime;
        updateDisplay(elapsed);
        tickCallbacks.forEach(fn => fn(elapsed));
    }, 1000);
}

export function endFasting() {
    if (!state.isFasting) return;
    clearInterval(state.timerInterval);
    state.isFasting = false;

    const stagesBarEl = document.getElementById('stages-bar');
    if (stagesBarEl) stagesBarEl.style.display = 'none';

    toggleBtn.style.display = 'none';
    timeLabel.textContent   = 'Ready to start';
    updateDisplay(0);
}
