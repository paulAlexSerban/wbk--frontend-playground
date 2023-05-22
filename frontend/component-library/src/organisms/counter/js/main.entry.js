import Counter from "./_CounterApp";
import Scorekeeper from "./_ScoreKeeper";
(() => {
    document.querySelectorAll('[data-js-component="Counter"]').forEach((molecule) => {
        new Counter(molecule);
    });

    new Scorekeeper();
})();
