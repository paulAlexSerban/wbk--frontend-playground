import { stopBubbling } from "../../../_commons/js/functions/stopBubbling";

export default class Counter {
    constructor() {
        this.init();
    }

    bumpCounter() {
        this.currentVal = parseInt(this.counterOutput.innerHTML, 10);
        this.newVal = this.currentVal + 1;
        this.counterOutput.innerHTML = this.newVal;
    }

    setupEventListeners() {
        this.counterButton.addEventListener("click", (event) => {
            stopBubbling(event);
            this.bumpCounter();
        });
    }

    setupDOMReferences() {
        this.counterButton = document.querySelector(".counter__button");
        this.counterOutput = document.querySelector(".counter__output");
    }

    init() {
        this.setupDOMReferences();
        this.setupEventListeners();
    }
}