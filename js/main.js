import { initTimer, startFasting, registerOnTick } from './timer.js';
import { initNav, navigateTo } from './nav.js';
import { initPlans } from './plans.js';
import { initProfile } from './profile.js';
import { initKB } from './kb.js';
import { initStages, updateStagesFromElapsed } from './stages.js';

document.addEventListener('DOMContentLoaded', () => {
    initTimer();
    registerOnTick(updateStagesFromElapsed);
    initNav();
    initPlans({ startFasting, navigateTo });
    initProfile();
    initKB();
    initStages();
});
