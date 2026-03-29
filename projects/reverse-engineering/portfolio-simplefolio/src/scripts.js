import initScrollReveal from './scripts/scrollReveal.js';
import initTiltEffect from './scripts/tiltAnimation.js';
import { targetElements, defaultProps } from './scripts/scrollRevealConfig.js';

(() => {
    initScrollReveal(targetElements, defaultProps);
    initTiltEffect();
})();
