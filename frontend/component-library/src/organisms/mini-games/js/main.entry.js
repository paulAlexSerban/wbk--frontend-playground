import { GuessMyNumber, config as GMNConfig } from './GuessMyNumber.js';
import { NumberGuesser, config as NGConfig } from './NumberGuesser.js';
import { CoinGame, config as CGConfig } from './CoinGame.js';

(() => {
    document.querySelectorAll(`[data-js-${GMNConfig.type}=${GMNConfig.name}]`).forEach((el) => {
        GuessMyNumber(el);
    });
})();


(() => {
  document.querySelectorAll(`[data-js-${NGConfig.type}=${NGConfig.name}]`).forEach((el) => {
      NumberGuesser(el);
  });
})();



(() => {
    document.querySelectorAll(`[data-js-${CGConfig.type}=${CGConfig.name}]`).forEach((el) => {
        CoinGame(el);
    });
})();
