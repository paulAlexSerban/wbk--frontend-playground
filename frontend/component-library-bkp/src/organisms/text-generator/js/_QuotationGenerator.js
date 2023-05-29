const quotes = [
    [
        "Win in silence",
        "Just smile",
        "Take a deep breath",
        "Be the best",
        "Be happy",
        "Just fly",
        "I'm not a second option",
        "Do not wait to be rich",
    ],
    [" and", " or", " along with", " also", " as well as", " furthermore", " including", " moreover"],
    [
        " let them think.",
        " remember who.",
        " not be jealous.",
        " be happy.",
        " do it twice.",
        " for what you want.",
        " watch them succeed.",
        " happiness is free.",
    ],
];
const randomIndexGenerator = (quotes) => {
    let randomIndex;
    for (let i = 0; i < quotes.length; i += 1) {
        randomIndex = Math.floor(Math.random() * quotes[i].length);
    }
    return randomIndex;
};

export class SimpleGenerator {
    constructor() {
        this.init();
    }

    setupDOMReferences() {
        this.simpleQuoteText = document.querySelector(".simple-generator__quote");
        this.button = document.querySelector(".simple-generator__button");
    }
    setupEvents() {
        this.button.addEventListener("click", () => this.quoteGenerator());
    }

    quoteGenerator() {
        this.fragmentOne = quotes[0][randomIndexGenerator(quotes)];
        this.fragmentTwo = quotes[1][randomIndexGenerator(quotes)];
        this.fragmentThree = quotes[2][randomIndexGenerator(quotes)];
        this.simpleQuoteText.innerHTML = `${this.fragmentOne} ${this.fragmentTwo} ${this.fragmentThree}`;
    }

    init() {
        this.setupDOMReferences();
        this.setupEvents();
    }
}

const travelQuotes = [
    ["Travel ", "Wander ", "Adventure ", "Explore ", "Vacation "],
    ["is something you do ", "someplace ", "leaves you speechless ", "bring power and love ", "needs no plan "],
    [
        "like breathing.",
        "you have never been before.",
        "turns you into a storyteller.",
        "back to your life.",
        "and no intent of arriving.",
    ],
];
const learnQuotes = [
    ["People ", "Society ", "The team ", "Community ", "The group "],
    [
        "can not be made to feel inferior ",
        "needs to know itself ",
        "failing ",
        "measures intelligence ",
        "should think before speaking ",
    ],
    [
        "without their consent.",
        "to begin its wisdom.",
        "is the condiment that gives success its flavour.",
        "by the ability to change.",
        "and read before thinking.",
    ],
];

export class CustomGenerator {
    constructor() {
        this.quoteType = learnQuotes;
        this.init();
    }

    setupDOMRefrences() {
        this.switchButton = document.querySelector(".switch-button");
        this.quotesContainer = document.querySelector(".custom-generator__quotes");
        this.generatorButtons = document.querySelectorAll(".custom-generator__button");
        this.removeButton = document.querySelector(".button__base--remove");
    }

    setupEvents() {
        this.generatorButtons.forEach((button) =>
            button.addEventListener("click", (event) => this.multipleInit(event.target.dataset.quotes))
        );
        this.switchButton.addEventListener("click", () => this.quoteTypeSwitch());
        this.removeButton.addEventListener("click", () => this.removeQuotes());
    }

    quoteRepeater(times) {
        for (let i = 1; i <= times; i += 1) {
            this.createQuoteParagraph();
        }
    }

    createQuoteParagraph() {
        this.quoteText = document.createElement("p");
        this.quotesContainer.appendChild(this.quoteText);
        this.fragmentOne = this.quoteType[0][randomIndexGenerator(this.quoteType)];
        this.fragmentTwo = this.quoteType[1][randomIndexGenerator(this.quoteType)];
        this.fragmentThree = this.quoteType[2][randomIndexGenerator(this.quoteType)];
        this.quoteText.innerHTML = `${this.fragmentOne} ${this.fragmentTwo} ${this.fragmentThree}`;
    }

    quoteTypeSwitch() {
        if (this.switchButton.checked == true) {
            this.quoteType = travelQuotes;
        } else {
            this.quoteType = learnQuotes;
        }
    }

    removeQuotes() {
        this.quotesContainer.innerHTML = "";
    }

    multipleInit(quoteCount) {
        this.removeQuotes();
        this.quoteRepeater(quoteCount);
    }

    init() {
        this.setupDOMRefrences();
        this.setupEvents();
    }
}
