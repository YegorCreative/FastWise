export function initProfile() {
    const weightInput    = document.getElementById('user-weight');
    const heightInput    = document.getElementById('user-height');
    const bmiDisplay     = document.getElementById('user-bmi');
    const saveStatsBtn   = document.getElementById('save-stats-btn');
    const waterCurrent   = document.getElementById('water-current');
    const waterFill      = document.getElementById('water-progress-fill');
    const waterBtns      = document.querySelectorAll('.water-btn');
    const shareBtn       = document.getElementById('share-progress-btn');
    const WATER_GOAL     = 2000;

    // Restore saved data
    const savedWeight = localStorage.getItem('fastwise_weight');
    const savedHeight = localStorage.getItem('fastwise_height');
    let currentWater  = parseInt(localStorage.getItem('fastwise_water') || '0', 10);

    if (savedWeight && weightInput) weightInput.value = savedWeight;
    if (savedHeight && heightInput) heightInput.value = savedHeight;

    updateBMI();
    updateWaterUI();

    function updateBMI() {
        if (!weightInput || !heightInput || !bmiDisplay) return;
        const w = parseFloat(weightInput.value);
        const h = parseFloat(heightInput.value) / 100;
        bmiDisplay.textContent = (w > 0 && h > 0) ? (w / (h * h)).toFixed(1) : '--';
    }

    function updateWaterUI() {
        if (!waterCurrent) return;
        waterCurrent.textContent = currentWater;
        const pct = Math.min((currentWater / WATER_GOAL) * 100, 100);
        waterFill.style.width = `${pct}%`;
        localStorage.setItem('fastwise_water', currentWater.toString());
    }

    if (saveStatsBtn) {
        saveStatsBtn.addEventListener('click', () => {
            localStorage.setItem('fastwise_weight', weightInput.value);
            localStorage.setItem('fastwise_height', heightInput.value);
            updateBMI();
            const orig = saveStatsBtn.textContent;
            saveStatsBtn.textContent = 'Saved!';
            setTimeout(() => { saveStatsBtn.textContent = orig; }, 2000);
        });
    }

    waterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentWater += parseInt(btn.getAttribute('data-amount'), 10);
            updateWaterUI();
        });
    });

    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'My Fasting Progress',
                text: `I've been using FastWise! My current BMI is ${bmiDisplay ? bmiDisplay.textContent : '--'} and I've drank ${currentWater}ml of water today. Join me!`
            };
            if (navigator.share) {
                try { await navigator.share(shareData); } catch (_) {}
            } else {
                alert(`Share this info:\n\n${shareData.text}`);
            }
        });
    }
}
