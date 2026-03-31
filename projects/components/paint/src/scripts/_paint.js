export const initPattern = () => {
    document.querySelectorAll('[data-js-paint]').forEach((root) => {
        const canvas = root.querySelector('.js-paint-canvas');
        const increaseBtn = root.querySelector('.js-increase');
        const decreaseBtn = root.querySelector('.js-decrease');
        const sizeEl = root.querySelector('.js-size');
        const colorEl = root.querySelector('.js-color');
        const clearEl = root.querySelector('.js-clear');

        if (!canvas || !increaseBtn || !decreaseBtn || !sizeEl || !colorEl || !clearEl) {
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        let size = 10;
        let isPressed = false;
        let color = 'black';
        let x;
        let y;

        colorEl.value = color;

        const drawCircle = (circleX, circleY) => {
            ctx.beginPath();
            ctx.arc(circleX, circleY, size, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        };

        const drawLine = (x1, y1, x2, y2) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = color;
            ctx.lineWidth = size * 2;
            ctx.stroke();
        };

        const updateSizeOnScreen = () => {
            sizeEl.textContent = `${size}`;
        };

        canvas.addEventListener('mousedown', (event) => {
            isPressed = true;
            x = event.offsetX;
            y = event.offsetY;
        });

        document.addEventListener('mouseup', () => {
            isPressed = false;
            x = undefined;
            y = undefined;
        });

        canvas.addEventListener('mousemove', (event) => {
            if (!isPressed) {
                return;
            }

            const x2 = event.offsetX;
            const y2 = event.offsetY;
            drawCircle(x2, y2);
            drawLine(x, y, x2, y2);
            x = x2;
            y = y2;
        });

        increaseBtn.addEventListener('click', () => {
            size = Math.min(size + 5, 50);
            updateSizeOnScreen();
        });

        decreaseBtn.addEventListener('click', () => {
            size = Math.max(size - 5, 5);
            updateSizeOnScreen();
        });

        colorEl.addEventListener('change', (event) => {
            color = event.target.value;
        });

        clearEl.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    });
};
