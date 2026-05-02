import { state } from './state.js';
import { CUSTOM_SCHEDULES } from './data/schedules.js';

function formatTime(hour24) {
    if (hour24 === 0 || hour24 === 24) return '12:00 AM';
    if (hour24 === 12) return '12:00 PM';
    if (hour24 > 12) return `${hour24 - 12}:00 PM`;
    return `${hour24}:00 AM`;
}

function renderPlanDetails(planIdOrHours, chartBarsContainer, scheduleListContainer) {
    let chartHTML = '';
    let scheduleHTML = '';
    const days = ['Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu'];

    if (typeof planIdOrHours === 'string' && CUSTOM_SCHEDULES[planIdOrHours]) {
        const custom = CUSTOM_SCHEDULES[planIdOrHours];
        const customLabels = custom.labels || days;

        custom.days.forEach((dayData, index) => {
            let barHTML = '';
            if (Array.isArray(dayData)) {
                dayData.forEach(seg => {
                    barHTML += `<div class="bar-segment ${seg.type}" style="height: ${seg.pct}%;"></div>`;
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

        custom.periods.forEach((p, i) => {
            scheduleHTML += `<div class="schedule-item"><strong>Period ${i + 1}:</strong> <span>${p}</span></div>`;
        });
    } else {
        const goalHours = parseInt(planIdOrHours, 10);
        const startHour = 20;
        const endHour = (startHour + goalHours) % 24;

        days.forEach((day, index) => {
            let barHTML = '';
            if (index === 0) {
                const eatPct  = (startHour / 24) * 100;
                const fastPct = ((24 - startHour) / 24) * 100;
                barHTML = `<div class="bar-segment eating" style="height: ${eatPct}%;"></div><div class="bar-segment fasting" style="height: ${fastPct}%;"></div>`;
            } else if (index === 7) {
                const fastPct = (endHour / 24) * 100;
                const eatPct  = ((24 - endHour) / 24) * 100;
                barHTML = `<div class="bar-segment fasting" style="height: ${fastPct}%;"></div><div class="bar-segment eating" style="height: ${eatPct}%;"></div>`;
            } else {
                const fast1Pct = (endHour / 24) * 100;
                const eatPct   = ((startHour - endHour) / 24) * 100;
                const fast2Pct = ((24 - startHour) / 24) * 100;
                barHTML = `<div class="bar-segment fasting" style="height: ${fast1Pct}%;"></div><div class="bar-segment eating" style="height: ${eatPct}%;"></div><div class="bar-segment fasting" style="height: ${fast2Pct}%;"></div>`;
            }
            chartHTML += `<div class="day-col"><div class="bar-wrapper">${barHTML}</div><span class="x-label">${day}</span></div>`;
        });

        const fullDays = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
        const startTimeStr = formatTime(startHour);
        const endTimeStr   = formatTime(endHour);
        for (let i = 0; i < 7; i++) {
            scheduleHTML += `<div class="schedule-item"><strong>Period ${i + 1}:</strong> <span>${fullDays[i]} ${startTimeStr} – ${fullDays[i + 1]} ${endTimeStr}</span></div>`;
        }
    }

    if (chartBarsContainer)    chartBarsContainer.innerHTML = chartHTML;
    if (scheduleListContainer) scheduleListContainer.innerHTML = scheduleHTML;

    const editorChart    = document.getElementById('editor-chart-bars-container');
    const editorSchedule = document.getElementById('editor-schedule-list-container');
    if (editorChart)    editorChart.innerHTML    = chartHTML;
    if (editorSchedule) editorSchedule.innerHTML = scheduleHTML;
}

export function initPlans({ startFasting, navigateTo }) {
    const planDetailView    = document.getElementById('plan-detail-view');
    const closePlanBtn      = document.getElementById('close-plan-btn');
    const startWeekBtn      = document.getElementById('start-week-btn');
    const detailTitle       = document.getElementById('detail-plan-title');
    const detailDesc        = document.getElementById('detail-plan-desc');
    const chartBarsContainer    = document.getElementById('chart-bars-container');
    const scheduleListContainer = document.getElementById('schedule-list-container');

    // Plan editor
    const planEditorView  = document.getElementById('plan-editor-view');
    const openEditorBtn   = document.getElementById('open-editor-btn');
    const cancelEditorBtn = document.getElementById('cancel-editor-btn');
    const doneEditorBtn   = document.getElementById('done-editor-btn');

    // Special plans
    const specialPlansView    = document.getElementById('special-plans-view');
    const openSpecialPlansBtn = document.getElementById('open-special-plans-btn');
    const closeSpecialPlansBtn = document.getElementById('close-special-plans-btn');

    // Autophagy plans
    const autophagyPlansView    = document.getElementById('autophagy-plans-view');
    const openAutophagyPlansBtn = document.getElementById('open-autophagy-plans-btn');
    const closeAutophagyPlansBtn = document.getElementById('close-autophagy-plans-btn');

    // All plan cards across all views
    const planCards = document.querySelectorAll('.plan-card');

    // Plan editor navigation
    if (openEditorBtn)   openEditorBtn.addEventListener('click',   () => planEditorView.classList.add('active'));
    if (cancelEditorBtn) cancelEditorBtn.addEventListener('click', () => planEditorView.classList.remove('active'));
    if (doneEditorBtn)   doneEditorBtn.addEventListener('click',   () => planEditorView.classList.remove('active'));

    // Special plans navigation
    if (openSpecialPlansBtn)  openSpecialPlansBtn.addEventListener('click',  () => specialPlansView.classList.add('active'));
    if (closeSpecialPlansBtn) closeSpecialPlansBtn.addEventListener('click', () => specialPlansView.classList.remove('active'));

    // Autophagy plans navigation
    if (openAutophagyPlansBtn)  openAutophagyPlansBtn.addEventListener('click',  () => autophagyPlansView.classList.add('active'));
    if (closeAutophagyPlansBtn) closeAutophagyPlansBtn.addEventListener('click', () => autophagyPlansView.classList.remove('active'));

    // Plan card click → open detail view
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            if (state.isFasting) return;

            planCards.forEach(c => c.classList.remove('active-plan'));
            card.classList.add('active-plan');

            const detailRatio = document.getElementById('detail-plan-ratio');
            if (detailRatio) detailRatio.textContent = card.querySelector('.plan-title').textContent;
            if (detailTitle) detailTitle.textContent  = card.querySelector('.plan-desc').textContent;
            if (detailDesc)  detailDesc.textContent   = card.getAttribute('data-long-desc');

            if (card.hasAttribute('data-plan-id')) {
                const planId = card.getAttribute('data-plan-id');
                state.pendingGoalHours = CUSTOM_SCHEDULES[planId] ? CUSTOM_SCHEDULES[planId].goalHours : 16;
                renderPlanDetails(planId, chartBarsContainer, scheduleListContainer);
            } else {
                state.pendingGoalHours = parseInt(card.getAttribute('data-hours'), 10);
                renderPlanDetails(state.pendingGoalHours, chartBarsContainer, scheduleListContainer);
            }

            planDetailView.classList.add('active');
        });
    });

    // Close plan detail
    if (closePlanBtn) {
        closePlanBtn.addEventListener('click', () => planDetailView.classList.remove('active'));
    }

    // Start week button
    if (startWeekBtn) {
        startWeekBtn.addEventListener('click', () => {
            state.goalHours = state.pendingGoalHours;

            planDetailView.classList.remove('active');
            if (specialPlansView)  specialPlansView.classList.remove('active');

            navigateTo('fasting-view');
            startFasting();
        });
    }
}
