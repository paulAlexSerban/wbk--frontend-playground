(() => {
    document.querySelectorAll('[data-mobile-nav]').forEach((demo) => {
        const items = demo.querySelectorAll('[data-phone-nav-item]');
        const screens = demo.querySelectorAll('[data-phone-screen]');

        if (!items.length || items.length !== screens.length) {
            return;
        }

        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                items.forEach((entry) => entry.classList.remove('is-active'));
                screens.forEach((screen) => screen.classList.remove('phone__screen--show'));

                item.classList.add('is-active');
                screens[index].classList.add('phone__screen--show');
            });
        });
    });

    document.querySelectorAll('[data-segmented-nav]').forEach((demo) => {
        const items = demo.querySelectorAll('[data-workspace-nav-item]');
        const panels = demo.querySelectorAll('[data-workspace-panel]');

        if (!items.length || items.length !== panels.length) {
            return;
        }

        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                items.forEach((entry) => entry.classList.remove('is-active'));
                panels.forEach((panel) => panel.classList.remove('workspace-panel--show'));

                item.classList.add('is-active');
                panels[index].classList.add('workspace-panel--show');
            });
        });
    });
})();
