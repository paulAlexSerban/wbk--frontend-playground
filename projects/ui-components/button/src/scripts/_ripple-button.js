export const initRippleButton = () => {
    document.querySelectorAll('[data-ripple-button] .ripple-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const xInside = event.clientX - rect.left;
            const yInside = event.clientY - rect.top;

            const circle = document.createElement('span');
            circle.classList.add('circle');
            circle.style.top = `${yInside}px`;
            circle.style.left = `${xInside}px`;

            event.currentTarget.appendChild(circle);
            window.setTimeout(() => circle.remove(), 500);
        });
    });
};
