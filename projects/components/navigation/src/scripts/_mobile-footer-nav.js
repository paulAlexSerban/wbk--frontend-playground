export const initMobileFooterNav = () => {
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
};
