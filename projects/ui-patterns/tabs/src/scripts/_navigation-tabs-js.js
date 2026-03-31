export const initNavigationTabsJs = () => {
    document.querySelectorAll('[data-navigation-tabs-js]').forEach((demo) => {
        const buttons = demo.querySelectorAll('[data-tab-button]');
        const panels = demo.querySelectorAll('[data-tab-panel]');

        if (!buttons.length || !panels.length) {
            return;
        }

        const setActive = (id) => {
            buttons.forEach((button) => {
                button.classList.toggle('is-active', button.dataset.id === id);
            });
            panels.forEach((panel) => {
                panel.classList.toggle('is-active', panel.dataset.id === id);
            });
        };

        buttons.forEach((button) => {
            button.addEventListener('click', () => setActive(button.dataset.id));
        });
    });
};
