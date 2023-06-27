
(() => {
    const config = {
        type: "pat",
        name: "SoundBoard",
    };
    
    const SoundBoard = () => {
        const SOUNDS = ["applause", "boo", "gasp", "tada", "victory", "wrong"];

        const init = () => {
            setupButtons();
            setupDomReferences();
            setupEventListeners();
        };

        const setupButtons = () => {
            SOUNDS.forEach((sound) => {
                const btn = document.createElement("button");
                btn.classList.add("btn");
                btn.innerText = sound;
                btn.addEventListener("click", () => {
                    stopSongs();

                    document.getElementById(sound).play();
                });

                document.getElementById("buttons").appendChild(btn);
            });
        };

        const stopSongs = () => {
            SOUNDS.forEach((sound) => {
                const song = document.getElementById(sound);
                song.pause();
                song.currentTime = 0;
            });
        };

        const setupDomReferences = () => {};
        const setupEventListeners = () => {};

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        SoundBoard(el);
    });
})();
