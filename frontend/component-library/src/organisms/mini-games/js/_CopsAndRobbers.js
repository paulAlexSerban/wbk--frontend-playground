import $ from "jquery";

let police = {};
let thug = {};
let playerOneNameInput = $(".player__name-input--one");
let playerTwoNameInput = $(".player__name-input--two");

let weapons = ["weapons__multitool-knife", "weapons__baton", "weapons__gun", "weapons__rifle"];
let continueFinishMove = true;
const gridContainer = $(".grid__container");
const scoreBoard = $(".scoreboard");
const playground = $(".playground");
const startButton = $(".player__select-button");


class Player {
    constructor(name, role, enemyAvatar, enemyRole, round, positionRow, positionCol, playerAvatar) {
        this.name = name;
        this.role = role;
        this.enemyAvatar = enemyAvatar;
        this.enemyRole = enemyRole;
        this.round = round;
        this.turn = 0;
        this.health = 100;
        this.strength = 10;
        this.positionRow = positionRow;
        this.positionCol = positionCol;
        this.avatar = playerAvatar;
        this.collectedWeapon = "none";
        this.oldWeapon = "none";
        this.weaponToSwap = "none";
    }

    play() {
        this.refreshStats();
        eval(this.enemyRole).refreshStats();
        if (this.round === true) {
            movementController(this.role);
        }
    }

    refreshStats() {
        $(`.${this.role}-name`).empty();
        $(`.${this.role}-health`).empty();
        $(`.${this.role}-strength`).empty();
        $(`.${this.role}-name`).append(`${this.name}`);
        if (this.health < 0) {
            $(`.${this.role}-health`).append(0);
        } else {
            $(`.${this.role}-health`).append(Math.floor(`${this.health}`));
        }
        $(`.${this.role}-strength`).append(Math.floor(`${this.strength}`));
        if (this.round === true) {
            $(`.${this.role}-stats`).css("background-color", "lightgreen");
        } else {
            $(`.${this.role}-stats`).css("background-color", "white");
        }
    }

    adjacentCheck(nextCell) {
        let nextCellRow = parseInt(nextCell.attr("data-row"));
        let nextCellCol = parseInt(nextCell.attr("data-col"));

        let topCell = $(`.cell__${nextCellRow + -1}-${nextCellCol}`);
        let rightCell = $(`.cell__${nextCellRow}-${nextCellCol + 1}`);
        let bottomCell = $(`.cell__${nextCellRow + 1}-${nextCellCol}`);
        let leftCell = $(`.cell__${nextCellRow}-${nextCellCol + -1}`);

        if (topCell.hasClass(this.enemyAvatar)) {
            this.fight();
        } else if (rightCell.hasClass(this.enemyAvatar)) {
            this.fight();
        } else if (bottomCell.hasClass(this.enemyAvatar)) {
            this.fight();
        } else if (leftCell.hasClass(this.enemyAvatar)) {
            this.fight();
        }
    }

    moveDirection(vertical, horizontal) {
        let oldCell = $(`.cell__${this.positionRow}-${this.positionCol}`);
        let nextCell = $(`.cell__${this.positionRow + vertical}-${this.positionCol + horizontal}`);
        this.cellChange(oldCell, nextCell);
    }

    cellChange(oldCell, nextCell) {
        oldCell.removeClass(this.avatar).removeClass("filled").addClass("free");
        nextCell.addClass(this.avatar).addClass("filled").removeClass("free");
        this.playerPosition();
    }

    playerPosition() {
        this.positionCol = parseInt($(`.${this.avatar}`)[0].dataset.col);
        this.positionRow = parseInt($(`.${this.avatar}`)[0].dataset.row);
    }

    artifactCheck(nextCell) {
        if (nextCell.hasClass("filled") === true) {
            for (let i = 0; i < weapons.length; i++) {
                if (nextCell.hasClass(weapons[i]) === true) {
                    if (this.collectedWeapon === "none") {
                        this.strength += 10 * (i + 1);
                        this.collectedWeapon = `${weapons[i]}`;
                        nextCell.removeClass(`${weapons[i]} filled artifact`).addClass("free");
                    } else if (this.collectedWeapon !== "none") {
                        this.oldWeapon = this.collectedWeapon;
                        let w = weapons.indexOf(this.oldWeapon);
                        this.strength -= 10 * (w + 1);
                        this.strength += 10 * (i + 1);
                        this.collectedWeapon = `${weapons[i]}`;
                        nextCell.removeClass(`${weapons[i]} filled artifact`).addClass("free");
                    }
                }
            }
        }
    }

    updateRound() {
        $(document).unbind("keydown");
        this.round = false;
        eval(this.enemyRole).round = true;
        eval(this.enemyRole).play();
    }

    fight() {
        alert(`${this.name} the ${this.role} starts the FIGHT!!!`);
        this.attackStance();
    }

    continueAttack() {
        if (this.health <= 0) {
            let enemy = eval(this.enemyRole);
            const modalContainer = $(".modal__container");
            modalContainer.empty();
            modalContainer.append(`<p>Congratulations!!! ${enemy.name} the ${enemy.role} WON the game!!!</p>`);
        }
        this.attackStance();
    }

    attackStance() {
        const modalBase = $(".modal__base");
        const modalWrapper = $(".modal__wrapper");
        playground.hide();
        modalBase.addClass("modal__base--is-visible");
        let detachScoreBoard = scoreBoard.detach();
        modalWrapper.append(detachScoreBoard);
        $(".article__base").css("border", "none");
        let buttonStance = $(".modal__button > .button__base");
        buttonStance.empty().append("Continue");
        let role = eval(this.role);

        function setStance() {
            buttonStance.on("click", selectStance);

            function selectStance() {
                let stanceValue = $(".switch__input").is(":checked");
                if (stanceValue === false) {
                    eval(role).defensiveStance();
                    buttonStance.off("click", selectStance);
                    return;
                } else if (stanceValue === true) {
                    eval(role).offensiveStance();
                    buttonStance.off("click", selectStance);
                    return;
                }
            }
        }
        setStance();
    }

    offensiveStance() {
        let enemy = eval(this.enemyRole);
        enemy.health -= this.strength;
        this.round = false;
        enemy.round = true;
        this.refreshStats();
        enemy.refreshStats();
        enemy.continueAttack();
    }

    defensiveStance() {
        let enemy = eval(this.enemyRole);
        this.health -= enemy.strength / 2;
        this.round = false;
        enemy.round = true;
        this.refreshStats();
        enemy.refreshStats();
        enemy.continueAttack();
    }
}

function createNewPlayers() {
    let policeInitPositionRow = parseInt($(".player__policeAvatar")[0].dataset.row);
let policeInitPositionCol = parseInt($(".player__policeAvatar")[0].dataset.col);
let thugInitPositionRow = parseInt($(".player__thugAvatar")[0].dataset.row);
let thugInitPositionCol = parseInt($(".player__thugAvatar")[0].dataset.col);
    police = new Player(
        playerOneNameInput.val(),
        "police",
        "player__thugAvatar",
        "thug",
        false,
        policeInitPositionRow,
        policeInitPositionCol,
        "player__policeAvatar"
    );
    thug = new Player(
        playerTwoNameInput.val(),
        "thug",
        "player__policeAvatar",
        "police",
        true,
        thugInitPositionRow,
        thugInitPositionCol,
        "player__thugAvatar"
    );
}

function movementController(role) {
    function finishMove(role) {
        eval(role).updateRound();
        eval(role).refreshStats();
    }
    $(document).keydown(function (ev) {
        if (ev.which === 38) {
            let cellsUp = parseInt(prompt("How many cells would you like to move up?", 1));
            if (cellsUp > 3) {
                alert("Forbidden number of cells!!");
                cellsUp = prompt("Chose another number of cells to go up!", 1);
            } else if (cellsUp > 0) {
                for (let i = 1; i <= cellsUp; i++) {
                    let oldCell = $(`.cell__${eval(role).positionRow}-${eval(role).positionCol}`);
                    let nextCell = $(`.cell__${eval(role).positionRow + -1}-${eval(role).positionCol}`);
                    let nextCellRow = parseInt(nextCell.attr("data-row"));
                    let nextCellCol = parseInt(nextCell.attr("data-col"));
                    let topCell = $(`.cell__${nextCellRow + -1}-${nextCellCol}`);
                    let rightCell = $(`.cell__${nextCellRow}-${nextCellCol + 1}`);
                    let bottomCell = $(`.cell__${nextCellRow + 1}-${nextCellCol}`);
                    let leftCell = $(`.cell__${nextCellRow}-${nextCellCol + -1}`);
                    if (nextCell.hasClass("free") == true) {
                        if (eval(role).oldWeapon !== "none") {
                            eval(role).weaponToSwap = eval(role).oldWeapon;
                            eval(role).oldWeapon = "none";
                        }
                        eval(role).moveDirection(-1, 0);
                        if (eval(role).weaponToSwap !== "none") {
                            oldCell.removeClass("free").addClass(`${eval(role).weaponToSwap} artifact filled`);
                            eval(role).weaponToSwap = "none";
                        }
                        if (topCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (rightCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (bottomCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (leftCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        }
                    } else if (nextCell.hasClass("artifact") == true) {
                        eval(role).artifactCheck(nextCell);
                        eval(role).moveDirection(-1, 0);
                    } else if (nextCell.hasClass(eval(role).enemyAvatar) == true) {
                        eval(role).fight();
                        continueFinishMove = false;
                    }
                }
                if (continueFinishMove === true) {
                    finishMove(role);
                }
                ev.preventDefault();
            }
        } else if (ev.which === 39) {
            let cellsRight = parseInt(prompt("How many cells would you like to move right?", 1));
            if (cellsRight > 3) {
                alert("Forbidden number of cells!!");
                cellsRight = prompt("Chose another number of cells to go right!", 1);
            } else if (cellsRight > 0) {
                for (let i = 1; i <= cellsRight; i++) {
                    let oldCell = $(`.cell__${eval(role).positionRow}-${eval(role).positionCol}`);
                    let nextCell = $(`.cell__${eval(role).positionRow}-${eval(role).positionCol + 1}`);
                    let nextCellRow = parseInt(nextCell.attr("data-row"));
                    let nextCellCol = parseInt(nextCell.attr("data-col"));
                    let topCell = $(`.cell__${nextCellRow + -1}-${nextCellCol}`);
                    let rightCell = $(`.cell__${nextCellRow}-${nextCellCol + 1}`);
                    let bottomCell = $(`.cell__${nextCellRow + 1}-${nextCellCol}`);
                    let leftCell = $(`.cell__${nextCellRow}-${nextCellCol + -1}`);
                    if (nextCell.hasClass("free") == true) {
                        if (eval(role).oldWeapon !== "none") {
                            eval(role).weaponToSwap = eval(role).oldWeapon;
                            eval(role).oldWeapon = "none";
                        }
                        eval(role).moveDirection(0, 1);
                        if (eval(role).weaponToSwap !== "none") {
                            oldCell.removeClass("free").addClass(`${eval(role).weaponToSwap} artifact filled`);
                            eval(role).weaponToSwap = "none";
                        }
                        if (topCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (rightCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (bottomCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (leftCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        }
                    } else if (nextCell.hasClass("artifact") == true) {
                        eval(role).artifactCheck(nextCell);
                        eval(role).moveDirection(0, 1);
                    } else if (nextCell.hasClass(eval(role).enemyAvatar) == true) {
                        eval(role).fight();
                        continueFinishMove = false;
                    }
                }
                if (continueFinishMove === true) {
                    finishMove(role);
                }
                ev.preventDefault();
            }
        } else if (ev.which === 40) {
            let cellsDown = parseInt(prompt("How many cells would you like to move down?", 1));
            if (cellsDown > 3) {
                alert("Forbidden number of cells!!");
                cellsDown = prompt("Chose another number of cells to go down!", 1);
            } else if (cellsDown > 0) {
                for (let i = 1; i <= cellsDown; i++) {
                    let oldCell = $(`.cell__${eval(role).positionRow}-${eval(role).positionCol}`);
                    let nextCell = $(`.cell__${eval(role).positionRow + 1}-${eval(role).positionCol}`);
                    let nextCellRow = parseInt(nextCell.attr("data-row"));
                    let nextCellCol = parseInt(nextCell.attr("data-col"));
                    let topCell = $(`.cell__${nextCellRow + -1}-${nextCellCol}`);
                    let rightCell = $(`.cell__${nextCellRow}-${nextCellCol + 1}`);
                    let bottomCell = $(`.cell__${nextCellRow + 1}-${nextCellCol}`);
                    let leftCell = $(`.cell__${nextCellRow}-${nextCellCol + -1}`);
                    if (nextCell.hasClass("free") == true) {
                        if (eval(role).oldWeapon !== "none") {
                            eval(role).weaponToSwap = eval(role).oldWeapon;
                            eval(role).oldWeapon = "none";
                        }
                        eval(role).moveDirection(1, 0);
                        if (eval(role).weaponToSwap !== "none") {
                            oldCell.removeClass("free").addClass(`${eval(role).weaponToSwap} artifact filled`);
                            eval(role).weaponToSwap = "none";
                        }
                        if (topCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (rightCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (bottomCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (leftCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        }
                    } else if (nextCell.hasClass("artifact") == true) {
                        eval(role).artifactCheck(nextCell);
                        eval(role).moveDirection(1, 0);
                    } else if (nextCell.hasClass(eval(role).enemyAvatar) == true) {
                        eval(role).fight();
                        continueFinishMove = false;
                    }
                }
                if (continueFinishMove === true) {
                    finishMove(role);
                }
                ev.preventDefault();
            }
        } else if (ev.which === 37) {
            let cellsLeft = parseInt(prompt("How many cells would you like to move left?", 1));
            if (cellsLeft > 3) {
                alert("Forbidden number of cells!!");
                cellsLeft = prompt("Chose another number of cells to go left!", 1);
            } else if (cellsLeft > 0) {
                for (let i = 1; i <= cellsLeft; i++) {
                    let oldCell = $(`.cell__${eval(role).positionRow}-${eval(role).positionCol}`);
                    let nextCell = $(`.cell__${eval(role).positionRow}-${eval(role).positionCol + -1}`);
                    let nextCellRow = parseInt(nextCell.attr("data-row"));
                    let nextCellCol = parseInt(nextCell.attr("data-col"));
                    let topCell = $(`.cell__${nextCellRow + -1}-${nextCellCol}`);
                    let rightCell = $(`.cell__${nextCellRow}-${nextCellCol + 1}`);
                    let bottomCell = $(`.cell__${nextCellRow + 1}-${nextCellCol}`);
                    let leftCell = $(`.cell__${nextCellRow}-${nextCellCol + -1}`);
                    if (nextCell.hasClass("free") == true) {
                        if (eval(role).oldWeapon !== "none") {
                            eval(role).weaponToSwap = eval(role).oldWeapon;
                            eval(role).oldWeapon = "none";
                        }
                        eval(role).moveDirection(0, -1);
                        if (eval(role).weaponToSwap !== "none") {
                            oldCell.removeClass("free").addClass(`${eval(role).weaponToSwap} artifact filled`);
                            eval(role).weaponToSwap = "none";
                        }
                        if (topCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (rightCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (bottomCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        } else if (leftCell.hasClass(eval(role).enemyAvatar)) {
                            eval(role).fight();
                            continueFinishMove = false;
                        }
                    } else if (nextCell.hasClass("artifact") == true) {
                        eval(role).artifactCheck(nextCell);
                        eval(role).moveDirection(0, -1);
                    } else if (nextCell.hasClass(eval(role).enemyAvatar) == true) {
                        eval(role).fight();
                        continueFinishMove = false;
                    }
                }
                if (continueFinishMove === true) {
                    finishMove(role);
                }
                ev.preventDefault();
            }
        }
    });
}

function boardGenerator(gridSize) {
    gridContainer.empty();
    gridContainer.css("grid-template-columns", "repeat(" + gridSize + ", 1fr)");
    gridContainer.css("grid-template-rows", "repeat(" + gridSize + ", 1fr)");

    function gridSquare(row, col) {
        let square = $("<div />", {
            class: `grid__square grid__square--${i} cell__${row}-${col} free`,
        });
        square.attr("data-row", `${row}`);
        square.attr("data-col", `${col}`);
        return square;
    }

    let i = 0;
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            gridContainer.append(gridSquare(row, col));
            i++;
        }
    }
}

function cellPositioning(grid) {
    let gridSize = grid * grid;
    let squaresArray = gridContainer.children().toArray();
    let players = ["player__policeAvatar", "player__thugAvatar"];

    function randomIndexGenerator(side, size, fraction) {
        let randomIndex = side * size - Math.floor(Math.random() * (size * fraction));
        return randomIndex;
    }
    let pickedCell;
    function randomCellPicker(side, size, fraction) {
        for (let i = 0; i < size; i++) {
            pickedCell = squaresArray[randomIndexGenerator(side, size, fraction)];
        }
    }

    for (let z = 0; z < players.length; z++) {
        randomCellPicker(z + 1, gridSize / 2, 1);
        if ($(pickedCell).hasClass("filled")) {
            z--;
            randomCellPicker(z + 1, gridSize / 2, 1);
        } else {
            $(pickedCell).addClass(players[z]).addClass("filled");
            $(pickedCell).removeClass("free");
        }
    }

    let barriersCount = 7;
    for (let y = 0; y < barriersCount; y++) {
        randomCellPicker(1, gridSize, 1);
        if ($(pickedCell).hasClass("filled")) {
            y--;
            randomCellPicker(1, gridSize, 1);
        } else {
            $(pickedCell).addClass("barrier filled");
            $(pickedCell).removeClass("free");
        }
    }

    for (let a = 0; a < weapons.length; a++) {
        randomCellPicker(1, gridSize, 1);
        if ($(pickedCell).hasClass("filled")) {
            a--;
            randomCellPicker(1, gridSize, 1);
        } else {
            $(pickedCell).addClass("filled").addClass(weapons[a]).addClass("artifact");
            $(pickedCell).removeClass("free");
        }
    }
}

export default function gameLoader() {
    function loadGame() {
        const startScreen = $(".start-screen");
        startScreen.hide();
        scoreBoard.show();
        playground.show();
        cellPositioning(10);
        createNewPlayers();
    }

    function startGame() {
        boardGenerator(10);
        loadGame();
        thug.play();
        police.play();
    }

    startButton.click(startGame);
}
