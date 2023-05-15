import { config } from "./config";

(() => {
    const LoanCalculator = (el) => {
        const global = { state: {}, elements: {} };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const setupDomReferences = () => {
            global.elements.loanForm = document.getElementById("loan-form");
            global.elements.results = document.getElementById("results");
            global.elements.loading = document.getElementById("loading");
            global.elements.amount = document.getElementById("amount");
            global.elements.interest = document.getElementById("interest");
            global.elements.years = document.getElementById("years");
            global.elements.monthlyPayment = document.getElementById("monthly-payment");
            global.elements.totalPayment = document.getElementById("total-payment");
            global.elements.totalInterest = document.getElementById("total-interest");
            global.elements.alert = document.querySelector(".alert");
            global.elements.card = document.querySelector(".card");
            global.elements.heading = document.querySelector(".heading");
        };

        const setupEventListeners = () => {
            global.elements.loanForm.addEventListener("submit", (e) => {
                global.elements.results.style.display = "none";
                global.elements.loading.style.display = "block";
                setTimeout(() => {
                    calculateResults();
                }, 2000);
                e.preventDefault();
            });
        };

        // Calculate Results
        const calculateResults = () => {
            console.log("Calculating...");
            // UI Vars
            const principal = parseFloat(global.elements.amount.value);
            const calculatedInterest = parseFloat(global.elements.interest.value) / 100 / 12;
            const calculatedPayments = parseFloat(global.elements.years.value) * 12;

            // Compute monthly payment
            const x = Math.pow(1 + calculatedInterest, calculatedPayments);
            const monthly = (principal * x * calculatedInterest) / (x - 1);

            if (isFinite(monthly)) {
                global.elements.monthlyPayment.value = monthly.toFixed(2);
                global.elements.totalPayment.value = (monthly * calculatedPayments).toFixed(2);
                global.elements.totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
                global.elements.results.style.display = "block";
                global.elements.loading.style.display = "none";
            } else {
                showError("Please check your numbers");
            }
        };

        // Show Error
        const showError = (error) => {
            global.elements.results.style.display = "none";
            global.elements.loading.style.display = "none";

            const errorDiv = document.createElement("div");

            errorDiv.className = "alert alert-danger";
            errorDiv.appendChild(document.createTextNode(error));
            global.elements.card.insertBefore(errorDiv, global.elements.heading);
            setTimeout(() => {
                clearError();
            }, 3000);
        };

        // Clear error
        const clearError = () => {
            global.elements.alert.remove();
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        LoanCalculator(el);
    });
})();
