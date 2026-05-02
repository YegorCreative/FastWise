import { state } from './state.js';
import { FASTING_STAGES } from './data/stages-data.js';

let stagesView, stagesTimeline, stagesDetailTitle, stagesDetailSubtitle,
    stagesDetailList, stagesBodySvg, stagesBarText;

function getActiveStageIndex(elapsedMs) {
    const hours = elapsedMs / 3600000;
    let active = 0;
    for (let i = 0; i < FASTING_STAGES.length; i++) {
        if (hours >= FASTING_STAGES[i].triggerHours) active = i;
    }
    return active;
}

function renderStageDetail(stageIndex) {
    const s = FASTING_STAGES[stageIndex];

    stagesBodySvg.setAttribute('data-stage', s.bodyStage);
    stagesDetailTitle.textContent    = s.title;
    stagesDetailSubtitle.textContent = s.subtitle;
    stagesDetailList.innerHTML = s.bullets.map((b, i) => `
        <li>
            <span class="stages-detail-num">${i + 1}</span>
            <span>${b}</span>
        </li>
    `).join('');

    stagesTimeline.querySelectorAll('.stage-item').forEach((item, idx) => {
        item.classList.remove('active', 'reached');
        if (idx === stageIndex) item.classList.add('active');
        else if (idx < stageIndex) item.classList.add('reached');
    });

    // Only scroll into view when the stages panel is actually visible
    const activeEl = stagesTimeline.querySelector('.stage-item.active');
    if (activeEl && stagesView.classList.contains('active')) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}

export function updateStagesFromElapsed(elapsedMs) {
    if (!state.isFasting) return;
    const activeIdx = getActiveStageIndex(elapsedMs);
    const s = FASTING_STAGES[activeIdx];
    if (stagesBarText) stagesBarText.textContent = s.label;
    if (stagesView && stagesView.classList.contains('active')) {
        renderStageDetail(activeIdx);
    }
}

export function initStages() {
    stagesView          = document.getElementById('fasting-stages-view');
    const openStagesBtn  = document.getElementById('open-fasting-stages-btn');
    const closeStagesBtn = document.getElementById('close-fasting-stages-btn');
    stagesTimeline      = document.getElementById('stages-timeline');
    stagesDetailTitle   = document.getElementById('stages-detail-title');
    stagesDetailSubtitle = document.getElementById('stages-detail-subtitle');
    stagesDetailList    = document.getElementById('stages-detail-list');
    stagesBodySvg       = document.getElementById('stages-body-svg');
    stagesBarText       = document.getElementById('stages-bar-text');

    // Build timeline items
    stagesTimeline.innerHTML = FASTING_STAGES.map(s => `
        <div class="stage-item" data-stage-id="${s.id}">
            <div class="stage-icon-wrap">${s.icon}</div>
            <div class="stage-text">
                <div class="stage-label">${s.label}</div>
                <div class="stage-sublabel">${s.sublabel}</div>
            </div>
        </div>
    `).join('');

    // Click a timeline item → show its detail
    stagesTimeline.querySelectorAll('.stage-item').forEach(item => {
        item.addEventListener('click', () => {
            renderStageDetail(parseInt(item.dataset.stageId));
        });
    });

    if (openStagesBtn) {
        openStagesBtn.addEventListener('click', () => {
            const elapsed = state.isFasting ? (Date.now() - state.startTime) : 0;
            renderStageDetail(getActiveStageIndex(elapsed));
            stagesView.classList.add('active');
        });
    }

    if (closeStagesBtn) {
        closeStagesBtn.addEventListener('click', () => {
            stagesView.classList.remove('active');
        });
    }

    // Initialize with stage 0 detail (no scroll — view is not visible yet)
    renderStageDetail(0);
}
