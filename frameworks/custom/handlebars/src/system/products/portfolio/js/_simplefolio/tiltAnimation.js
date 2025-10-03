import VanillaTilt from './VanillaTilt';

export default function initTiltAnimation() {
    const elements = document.querySelectorAll('.js-tilt');
    VanillaTilt().init(elements);
}
