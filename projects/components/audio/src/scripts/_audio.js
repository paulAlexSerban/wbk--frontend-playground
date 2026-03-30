export const SoundBoard = () => {
    const SOUNDS = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong'];

    const init = () => {
        setupButtons();
        setupDomReferences();
        setupEventListeners();
    };

    const setupButtons = () => {
        SOUNDS.forEach((sound) => {
            const btn = document.createElement('button');
            btn.classList.add('btn');
            btn.innerText = sound;
            btn.addEventListener('click', () => {
                stopSongs();
                const audio = document.getElementById(sound);
                if (audio) audio.play();
            });
            const buttonsContainer = document.getElementById('buttons');
            if (buttonsContainer) buttonsContainer.appendChild(btn);
        });
    };

    const stopSongs = () => {
        SOUNDS.forEach((sound) => {
            const song = document.getElementById(sound);
            if (song) {
                song.pause();
                song.currentTime = 0;
            }
        });
    };

    const setupDomReferences = () => {};
    const setupEventListeners = () => {};

    return { init };
};

export const initPattern = () => {
    document.querySelectorAll('[data-js-pat="SoundBoard"]').forEach((el) => {
        const instance = SoundBoard();
        instance.init();
    });
};
