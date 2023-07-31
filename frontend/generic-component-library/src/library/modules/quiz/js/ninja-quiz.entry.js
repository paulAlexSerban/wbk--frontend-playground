export const config = {
    type: "widget",
    name: "NinjaQuiz",
};

const correctAnswers = ["B", "B", "B", "B"];

export const NinjaQuiz = (el) => {
    const global = { state: {}, elements: {} };

    const init = () => {
        setupDomReferences();
        setupEventListeners();
    };

    const setupDomReferences = () => {
        global.elements.form = el.querySelector(".quiz-form");
        global.elements.result = el.querySelector(".result");
    };

    const setupEventListeners = () => {
        global.elements.form.addEventListener("submit", (e) => {
            e.preventDefault();

            let score = 0;
            const userAnswers = [
                global.elements.form.q1.value,
                global.elements.form.q2.value,
                global.elements.form.q3.value,
                global.elements.form.q4.value,
            ];

            // check the answers
            userAnswers.forEach((answer, index) => {
                if (answer === correctAnswers[index]) {
                    score += 25;
                }
            });

            // show the result
            global.elements.result.querySelector("span").textContent = `${score}%`;
            global.elements.result.classList.remove("d-none");
        });
    };

    init();
};


(() => {
    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        NinjaQuiz(el);
    });
})();
