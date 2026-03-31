const initSmileyFeedback = () => {
    const root = document.querySelector('.js-smiley-feedback');
    if (!root) return;

    const panel = root.querySelector('#fp-panel');
    const ratingsContainer = root.querySelector('.ratings-container');
    const sendBtn = root.querySelector('.js-fp-send');
    let selectedRating = 'Satisfied';

    ratingsContainer.addEventListener('click', (e) => {
        const ratingEl = e.target.closest('.rating');
        if (!ratingEl) return;

        root.querySelectorAll('.rating').forEach((r) => r.classList.remove('active'));
        ratingEl.classList.add('active');
        const label = ratingEl.querySelector('small');
        if (label) selectedRating = label.textContent;
    });

    sendBtn.addEventListener('click', () => {
        panel.innerHTML = `
            <strong>Thank You!</strong>
            <br>
            <strong>Feedback: ${selectedRating}</strong>
            <p>We&#39;ll use your feedback to improve our customer support.</p>
        `;
    });
};

const initVerifyAccountInput = () => {
    const root = document.querySelector('.js-verify-account');
    if (!root) return;

    const codes = root.querySelectorAll('.code');
    if (!codes.length) return;

    codes[0].focus();

    codes.forEach((code, idx) => {
        code.addEventListener('keydown', (e) => {
            if (e.key >= 0 && e.key <= 9) {
                codes[idx].value = '';
                if (idx < codes.length - 1) setTimeout(() => codes[idx + 1].focus(), 10);
            } else if (e.key === 'Backspace') {
                if (idx > 0) setTimeout(() => codes[idx - 1].focus(), 10);
            }
        });
    });
};

export const initPattern = () => {
    initSmileyFeedback();
    initVerifyAccountInput();
};
