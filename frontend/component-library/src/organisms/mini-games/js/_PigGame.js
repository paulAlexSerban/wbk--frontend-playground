export const config = {
    type: "widget",
    name: "PigGame",
};

export const PigGame = () => {
    const global = { state: {}, elements: {}, data: {} };

    const init = () => {
        setupDomReferences();
        setupEventListeners();
        start();
    };

    const setupDomReferences = () => {
        global.elements.player0El = document.querySelector(".js-player--0");
        global.elements.player1El = document.querySelector(".js-player--1");
        global.elements.score0El = document.getElementById("score--0");
        global.elements.score1El = document.getElementById("score--1");
        global.elements.current0El = document.getElementById("current--0");
        global.elements.current1El = document.getElementById("current--1");

        global.elements.diceEl = document.querySelector(".js-dice");
        global.elements.btnNew = document.querySelector(".js-btn--new");
        global.elements.btnRoll = document.querySelector(".js-btn--roll");
        global.elements.btnHold = document.querySelector(".js-btn--hold");
    };

    const setupEventListeners = () => {
        // Rolling dice functionality
        global.elements.btnRoll.addEventListener("click", () => {
            if (global.state.playing) {
                // 1. Generating a random dice roll
                const dice = Math.trunc(Math.random() * 6) + 1;

                // 2. Display dice
                global.elements.diceEl.classList.remove("pig-game__hidden");
                global.elements.diceEl.src = `/assets/images/dice-${dice}-original.webp`;

                // 3. Check for rolled 1
                if (dice !== 1) {
                    // Add dice to current score
                    global.state.currentScore += dice;
                    document.getElementById(`current--${global.state.activePlayer}`).textContent =
                        global.state.currentScore;
                } else {
                    // Switch to next player
                    switchPlayer();
                }
            }
        });

        global.elements.btnHold.addEventListener("click", () => {
            if (global.state.playing) {
                // 1. Add current score to active player's score
                global.state.scores[global.state.activePlayer] += global.state.currentScore;
                // global.state.scores[1] = global.state.scores[1] + global.state.currentScore

                document.getElementById(`score--${global.state.activePlayer}`).textContent =
                    global.state.scores[global.state.activePlayer];

                // 2. Check if player's score is >= 100
                if (global.state.scores[global.state.activePlayer] >= 100) {
                    // Finish the game
                    global.state.playing = false;
                    global.elements.diceEl.classList.add("pig-game__hidden");

                    document
                        .querySelector(`.js-player--${global.state.activePlayer}`)
                        .classList.add("pig-game__player--winner");
                    document
                        .querySelector(`.js-player--${global.state.activePlayer}`)
                        .classList.remove("pig-game__player--active");
                } else {
                    // Switch to the next player
                    switchPlayer();
                }
            }
        });

        global.elements.btnNew.addEventListener("click", () => {
            start();
        });
    };

    const start = () => {
        global.state.scores = [0, 0];
        global.state.currentScore = 0;
        global.state.activePlayer = 0;
        global.state.playing = true;

        global.elements.score0El.textContent = 0;
        global.elements.score1El.textContent = 0;
        global.elements.current0El.textContent = 0;
        global.elements.current1El.textContent = 0;

        global.elements.diceEl.classList.add("hidden");
        global.elements.player0El.classList.remove("pig-game__player--winner");
        global.elements.player1El.classList.remove("pig-game__player--winner");
        global.elements.player0El.classList.add("pig-game__player--active");
        global.elements.player1El.classList.remove("pig-game__player--active");
    };

    const switchPlayer = () => {
        document.getElementById(`current--${global.state.activePlayer}`).textContent = 0;
        global.state.currentScore = 0;
        global.state.activePlayer = global.state.activePlayer === 0 ? 1 : 0;
        global.elements.player0El.classList.toggle("pig-game__player--active");
        global.elements.player1El.classList.toggle("pig-game__player--active");
    };

    init();
};

document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => PigGame(el));
