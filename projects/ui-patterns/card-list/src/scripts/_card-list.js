export const initExpandingCards = () => {
    const roots = document.querySelectorAll('[data-js-pat="ExpandingCards"]');

    roots.forEach((root) => {
        const panels = root.querySelectorAll('.js-expanding-cards-panel');

        const removeActiveClasses = () => {
            panels.forEach((panel) => panel.classList.remove('active'));
        };

        panels.forEach((panel) => {
            panel.addEventListener('click', () => {
                removeActiveClasses();
                panel.classList.add('active');
            });
        });
    });
};

export const initPattern = () => {
    initExpandingCards();
};
