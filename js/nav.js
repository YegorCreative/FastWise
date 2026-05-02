const VIEWS = ['fasting-view', 'stats-view', 'me-view'];
let navItems;
let views = {};

export function initNav() {
    navItems = document.querySelectorAll('.nav-item');
    VIEWS.forEach(id => { views[id] = document.getElementById(id); });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            navigateTo(target);
        });
    });
}

export function navigateTo(target) {
    // Update nav active state
    if (navItems) {
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-target') === target);
        });
    }
    // Switch visible view
    Object.values(views).forEach(v => { if (v) v.classList.add('hidden-view'); });
    if (views[target]) views[target].classList.remove('hidden-view');
}
