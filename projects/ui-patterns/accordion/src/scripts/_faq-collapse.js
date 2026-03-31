export const initFaqCollapse = () => {
    document.querySelectorAll('[data-faq-collapse]').forEach((demo) => {
        const toggles = demo.querySelectorAll('.faq-toggle');

        toggles.forEach((toggle) => {
            toggle.addEventListener('click', () => {
                toggle.closest('.faq').classList.toggle('active');
            });
        });
    });
};
