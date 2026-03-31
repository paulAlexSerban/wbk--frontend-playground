export const initPattern = () => {
    document.querySelectorAll('[data-js-timer]').forEach((root) => {
        const nums = root.querySelectorAll('.nums span');
        const counter = root.querySelector('.js-counter');
        const finalMessage = root.querySelector('.js-final');
        const replay = root.querySelector('.js-replay');

        if (!nums.length || !counter || !finalMessage || !replay) {
            return;
        }

        const resetDOM = () => {
            counter.classList.remove('hide');
            finalMessage.classList.remove('show');

            nums.forEach((num) => {
                num.classList.value = '';
            });

            nums[0].classList.add('in');
        };

        const runAnimation = () => {
            nums.forEach((num, idx) => {
                const nextToLast = nums.length - 1;
                const handler = (event) => {
                    if (event.animationName === 'goIn' && idx !== nextToLast) {
                        num.classList.remove('in');
                        num.classList.add('out');
                    } else if (event.animationName === 'goOut' && num.nextElementSibling) {
                        num.nextElementSibling.classList.add('in');
                    } else {
                        counter.classList.add('hide');
                        finalMessage.classList.add('show');
                    }
                };

                num.addEventListener('animationend', handler, { once: false });
            });
        };

        resetDOM();
        runAnimation();

        replay.addEventListener('click', () => {
            resetDOM();
        });
    });
};
