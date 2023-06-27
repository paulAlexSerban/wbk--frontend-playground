class Player {
    constructor(player, oponent) {
        this.score = 0;
        this.player = player;
        this.oponent = oponent;
        this.isGameOver = false;
        this.winingScore = 3;
        this.init();
    }

    setupDomRefrence() {
        this.playerButton = document.querySelector(`#${this.player}__button`);
        this.oponentButton = document.querySelector(`#${this.oponent}__button`);
        this.playerDisplay = document.querySelector(`#${this.player}`);
        this.oponentDisplay = document.querySelector(`#${this.oponent}`);
    }

    setupEvents() {
        this.playerButton.addEventListener("click", () => this.updateScore());
    }

    updateScore() {
        if (!this.isGameOver) {
            this.score++;
            if (this.score == this.winingScore) {
                this.isGameOver = true;
                this.playerDisplay.classList.add("has-text-success");
                this.oponentDisplay.classList.add("has-text-danger");
                this.playerButton.disabled = true;
                this.oponentButton.disabled = true;
            }
            this.playerDisplay.textContent = this.score;
        }
    }

    resetPlayerScore() {
        this.score = 0;
        this.isGameOver = false;
        this.playerDisplay.textContent = this.score;
        this.playerDisplay.classList.remove("has-text-success", "has-text-danger");
        this.oponentDisplay.classList.remove("has-text-success", "has-text-danger");
        this.playerButton.disabled = false;
        this.oponentButton.disabled = false;
    }

    init() {
        this.setupDomRefrence();
        this.setupEvents();
    }
}

class Scorekeeper {
    constructor() {
        this.players = {
            playerOne: new Player("playerOne", "playerTwo"),
            playerTwo: new Player("playerTwo", "playerOne"),
        };
        this.init();
        this.setupScore();
    }

    setupDomRefrence() {
        this.btnReset = document.querySelector("#reset-button");
        this.selectWinScore = document.querySelector("#playTo");
    }

    setupScore() {
        this.winScore = this.selectWinScore.value;
        Object.values(this.players).forEach((player) => (player.isGameOver = false));
    }

    setupEvents() {
        this.btnReset.addEventListener("click", () => this.resetScore());

        this.selectWinScore.addEventListener("change", (e) => {
            this.winScore = parseInt(e.target.value);
            this.resetScore();
        });
    }

    resetScore() {
        this.isGameOver = false;
        Object.values(this.players).forEach((player) => (player.winingScore = this.winScore));
        Object.values(this.players).forEach((player) => player.resetPlayerScore());
    }

    init() {
        this.setupDomRefrence();
        this.setupEvents();
    }
}

(() => {
    new Scorekeeper();
})();
