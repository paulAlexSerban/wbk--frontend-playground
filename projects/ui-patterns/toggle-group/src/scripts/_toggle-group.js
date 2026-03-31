export const initPattern = () => {
    document.querySelectorAll('[data-js-toggle-group]').forEach((root) => {
        const toggles = root.querySelectorAll('.toggle');
        const good = root.querySelector('#good');
        const cheap = root.querySelector('#cheap');
        const fast = root.querySelector('#fast');

        if (!good || !cheap || !fast) {
            return;
        }

        const doTheTrick = (clicked) => {
            if (good.checked && cheap.checked && fast.checked) {
                if (good === clicked) {
                    fast.checked = false;
                }

                if (cheap === clicked) {
                    good.checked = false;
                }

                if (fast === clicked) {
                    cheap.checked = false;
                }
            }
        };

        toggles.forEach((toggle) => {
            toggle.addEventListener('change', (event) => doTheTrick(event.target));
        });
    });
};
