const ex1 = document.getElementById("ex1");
const bridgeGame1 = new Game({
  data: [
    { text: "$50 gift card", chance: 10 },
    { text: "$100 gift card", chance: 5 },
    { text: "$200 gift card", chance: 1 },
  ],
});

const gameview1 = bridgeGame1.lottery_game();
ex1.appendChild(gameview1);

const ex2 = document.getElementById("ex2");
const bridgeGame2 = new Game({
  data: [
    { text: "$5 gift card", chance: 100 },
    { text: "$10 gift card", chance: 80 },
    { text: "$15 gift card", chance: 50 },
  ],
});
bridgeGame2.set_num_steps([4, 8, 10]);
bridgeGame2.reset_startScreenBck("bck.jpeg", "no-repeat");
bridgeGame2.change_Jumper("new_jumper.png", "new_jumper_dead.png");
bridgeGame2.change_bridge_color("#CC0000");
const gameview2 = bridgeGame2.lottery_game();
ex2.appendChild(gameview2);
