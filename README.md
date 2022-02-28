## link to the landing page.

https://arcane-shelf-79647.herokuapp.com/main.html<br/>

## 'Getting Started' section.

Getting Started:<br/>

**1. Load js/index.js and index.css**

**2. Initiate a Lottery Bridge game instance**<br/>
e.g. const bridgeGame = new Game({data: [ { text: "$50 gift card", chance: 10 }, { text: "$100 gift card", chance: 5 }, { text: "$200 gift card", chance: 1 },],});

**3. Call the method lottery_game() on the game instance to get a gameView**<br/>
e.g. const gameview = bridgeGame.lottery_game();

**4. Select the DOM element that you want to append the Lottery Bridge game to**<br/>
e.g. const body = document.querySelector("body");

**5. Append the gameView to the DOM element**<br/>
e.g. body.appendChild(gameview);

## link to documentation page.

https://arcane-shelf-79647.herokuapp.com/doc.html
