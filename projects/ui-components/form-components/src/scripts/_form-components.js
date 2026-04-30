const initCustomRangeSlider = () => {
    const container = document.querySelector('.js-range-container');
    if (!container) return;

    const range = container.querySelector('.js-range-input');
    const label = container.querySelector('.js-range-label');
    if (!range || !label) return;

    const scale = (num, inMin, inMax, outMin, outMax) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

    const updateLabel = () => {
        const value = +range.value;
        const rangeWidth = +getComputedStyle(range).width.slice(0, -2);
        const labelWidth = +getComputedStyle(label).width.slice(0, -2);
        const max = +range.max;
        const min = +range.min;
        const left = value * (rangeWidth / max) - labelWidth / 2 + scale(value, min, max, 10, -10);
        label.style.left = `${left}px`;
        label.textContent = value;
    };

    range.addEventListener('input', updateLabel);
    updateLabel();
};

const initSearchHidden = () => {
    document.querySelectorAll('[data-js-pat="SearchHidden"]').forEach((root) => {
        const search = root.querySelector('.js-search');
        const btn = root.querySelector('.js-search-btn');
        const input = root.querySelector('.js-search-input');
        if (!search || !btn || !input) return;

        btn.addEventListener('click', () => {
            search.classList.toggle('active');
            input.focus();
        });
    });
};

export const initPattern = () => {
    initCustomRangeSlider();
    initSearchHidden();
};
