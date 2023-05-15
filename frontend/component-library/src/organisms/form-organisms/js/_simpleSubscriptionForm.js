const SimpleSubscribeForm = () => {
    const global = { state: {}, elements: {} };
    const USERNAME_PATTERN = /^[a-zA-Z]{6,12}$/;

    const init = () => {
        setupDomReferences();
        setupEventListeners();
    };

    const setupDomReferences = () => {
        global.elements.form = document.querySelector(".js-signup-form");
        global.elements.feedback = document.querySelector(".js-signup-feedback");
    };

    const submitValidation = () => {
        const username = global.elements.form.username.value;

        if (USERNAME_PATTERN.test(username)) {
            global.elements.feedback.textContent = "that username is valid!";
        } else {
            global.elements.feedback.textContent = "username must contain only letters & be between 6 & 12 characters";
        }
    };

    const liveFeedback = (e) => {
        if (USERNAME_PATTERN.test(e.target.value)) {
            global.elements.form.classList.add("success");
            global.elements.form.classList.remove("error");
        } else {
            global.elements.form.classList.add("error");
            global.elements.form.classList.remove("success");
        }
    };

    const setupEventListeners = () => {
        global.elements.form.addEventListener("submit", (e) => {
            e.preventDefault();
            submitValidation();
        });

        global.elements.form.username.addEventListener("keyup", (e) => {
            liveFeedback(e);
        });
    };

    init();
};
export default SimpleSubscribeForm;
