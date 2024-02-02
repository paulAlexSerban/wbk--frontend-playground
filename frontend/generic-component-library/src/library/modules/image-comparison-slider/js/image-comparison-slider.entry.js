import { find, findOne } from '../../../../_abstracts/js/dom/traversing';

class ImageComparisonSlider {
    constructor(el) {
        this.element = el;
        this.setupDomReferences();
        this.setupEventListeners();
        this.initComparisons();
    }

    setupDomReferences() {
        this.elements = {
            container: findOne('.img-comparison__container', this.element),
            imgOverlay: find('.img-comparison__overlay', this.element),
            imageForComparisonInput: findOne('.js-image-path-for-compare', this.element),
            imageToCompareInput: findOne('.js-image-path-to-compare', this.element),
            imageWidthInput: findOne('.js-image-width', this.element),
            imageForComparison: findOne('.js-image-for-compare', this.element),
            imageToCompare: findOne('.js-image-to-compare', this.element),
        };
    }

    fetchImage(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = path;
        });
    }

    setupEventListeners() {
        this.elements.imageForComparisonInput.addEventListener('change', (e) =>
            this.updateImage('imageForComparison', e.target.value)
        );
        this.elements.imageToCompareInput.addEventListener('change', (e) =>
            this.updateImage('imageToCompare', e.target.value)
        );

        this.elements.imageWidthInput.addEventListener('change', (e) => {
            const value = parseInt(e.target.value);
            this.elements.container.style.setProperty('--img-comp-slider-width', `${value}px`);
            this.resetComparisons();
            this.initComparisons();
        });
    }

    updateImage(type, path) {
        this.fetchImage(path).then(() => {
            this.elements[type].setAttribute('src', path);
        });
    }

    compareImages(img) {
        let clicked = 0;
        /* Get the width and height of the img element */
        const w = img.offsetWidth;
        const h = img.offsetHeight;
        /* Set the width of the img element to 50%: */
        img.style.width = w / 2 + 'px';

        /* Create slider: */
        const slider = document.createElement('DIV');
        slider.setAttribute('class', 'img-comparison__slider');
        /* Insert slider */
        img.parentElement.insertBefore(slider, img);
        /* Position the slider in the middle: */
        slider.style.top = h / 2 - slider.offsetHeight / 2 + 'px';
        slider.style.left = w / 2 - slider.offsetWidth / 2 + 'px';

        /* Execute a function when the mouse button is pressed: */
        slider.addEventListener('mousedown', slideReady);
        /* And another function when the mouse button is released: */
        window.addEventListener('mouseup', slideFinish);
        /* Or touched (for touch screens: */
        slider.addEventListener('touchstart', slideReady);
        /* And released (for touch screens: */
        window.addEventListener('touchend', slideFinish);

        function slideReady(e) {
            /* Prevent any other actions that may occur when moving over the image: */
            e.preventDefault();
            /* The slider is now clicked and ready to move: */
            clicked = 1;
            /* Execute a function when the slider is moved: */
            window.addEventListener('mousemove', slideMove);
            window.addEventListener('touchmove', slideMove);
        }

        const slideFinish = () => {
            /* The slider is no longer clicked: */
            clicked = 0;
        };
        const slideMove = (e) => {
            let pos;
            /* If the slider is no longer clicked, exit this function: */
            if (clicked === 0) {
                return false;
            }
            /* Get the cursor's x position: */
            pos = getCursorPos(e);
            /* Prevent the slider from being positioned outside the image: */
            if (pos < 0) {
                pos = 0;
            }
            if (pos > w) {
                pos = w;
            }
            /* Execute a function that will resize the overlay image according to the cursor: */
            slide(pos);
        };
        const getCursorPos = (e) => {
            let a,
                x = 0;
            e = e.changedTouches ? e.changedTouches[0] : e;
            /* Get the x positions of the image: */
            a = img.getBoundingClientRect();
            /* Calculate the cursor's x coordinate, relative to the image: */
            x = e.pageX - a.left;
            /* Consider any page scrolling: */
            x = x - window.pageXOffset;
            return x;
        };
        const slide = (x) => {
            /* Resize the image: */
            img.style.width = x + 'px';
            /* Position the slider: */
            slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + 'px';
        };
    }

    initComparisons() {
        for (let img of this.elements.imgOverlay) {
            this.compareImages(img);
        }
    }

    resetComparisons() {
        for (let img of this.elements.imgOverlay) {
            img.style.width = '';
            const slider = img.parentNode.querySelector('.img-comparison__slider');
            if (slider) {
                slider.remove();
            }
        }
    }
}

document.querySelectorAll('[data-js-cmp="ImageComparisonSlider"]').forEach((el) => new ImageComparisonSlider(el));
