"use strict";
(function (global, document) {
  function EndScreen(prize, win, end) {
    this.background = end[0];
    this.backgroundRepeat = end[1];
    this.prize = prize;
    this.win = win;
    this.visual = document.createElement("div");
    this.button = null;
  }
  EndScreen.prototype = {
    createScreen: function () {
      this.visual.classList.add("startview");

      this.visual.style.backgroundImage = "url(" + this.background + ")";
      this.visual.style.backgroundRepeat = this.repeat;
      if (this.repeat === "no-repeat") {
        this.visual.style.backgroundSize = "cover";
      }
      this.createtext();
      this.createButton();
    },
    createtext: function () {
      const h1 = document.createElement("h1");
      const h2 = document.createElement("h2");

      if (this.win === 1) {
        h1.style.color = "yellow";
        h2.style.color = "orange";
        h1.innerHTML = "Congratulations!";
        h2.innerHTML = "You won the prize: " + this.prize;
      } else {
        h1.style.color = "red";
        h2.style.color = "magenta";
        h1.innerHTML = "Sorry!";
        h2.innerHTML = "You failed to win the prize: " + this.prize;
      }
      this.visual.appendChild(h1);
      this.visual.appendChild(h2);
    },
    createButton: function () {
      const b = document.createElement("BUTTON");
      if (this.win === 1) {
        b.textContent = "Continue to play";
        b.style.width = "120px";
        b.style.height = "40px";
      } else {
        b.textContent = "Try Again";
        b.style.width = "90px";
        b.style.height = "40px";
      }

      this.button = b;
      this.visual.append(b);
    },
  };
  function Button(text, prob, steps) {
    this.prob = prob;
    this.steps = steps;
    this.text = text;
    this.visual = document.createElement("BUTTON");
  }
  Button.prototype = {
    createButton: function () {
      this.visual.textContent = this.text;
      this.visual.setAttribute("class", "btn");
    },
  };
  function Menu(data) {
    this.background = "always_grey.png";
    this.backgroundRepeat = "repeat";
    this.data = data;
    this.buttons = [];
    this.visual = document.createElement("div");
  }

  Menu.prototype = {
    createMenu: function () {
      const textbox = document.createElement("div");
      textbox.classList.add("startview");
      textbox.style.backgroundImage = "url(" + this.background + ")";
      textbox.style.backgroundRepeat = this.backgroundRepeat;

      if (this.backgroundRepeat === "no-repeat") {
        textbox.style.backgroundSize = "cover";
      }
      this.visual.appendChild(textbox);
      this.createtext();
      this.createButtons();
      const img = document.createElement("img");
      img.src = "cover.png";
      img.classList.add("coverimg");
      this.visual.append(img);
    },
    createtext: function () {
      const h2 = document.createElement("h2");
      h2.innerHTML = "Please choose the prize you want for the lottery";
      const h4 = document.createElement("h4");
      h4.innerHTML = "better prizes has lower chances of winning";
      this.visual.firstChild.appendChild(h2);
      this.visual.firstChild.appendChild(h4);
    },
    createButtons: function () {
      this.data.forEach((prize) => {
        const b = new Button(prize.text, prize.chance, prize.steps);
        b.createButton();
        this.buttons.push(b);
        this.visual.firstChild.appendChild(b.visual);
      });
    },
  };

  function Bar(left, bottom, length, color) {
    this.left = left;
    this.bottom = bottom;
    this.length = length;
    this.visual = document.createElement("div");
    this.color = color;
  }
  Bar.prototype = {
    addBar: function (gameview) {
      const visual = this.visual;
      visual.classList.add("bar");
      visual.style.backgroundColor = this.color;
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      visual.style.width = this.length + "px";
      visual.style.height = "10px";
      gameview.appendChild(visual);
    },
    moveBar: function () {
      this.left -= 5;
      this.visual.style.left = this.left + "px";
    },
  };
  function Platform(left, bottom, color) {
    this.left = left;
    this.bottom = bottom;
    this.visual = document.createElement("div");
    this.color = color;
  }
  Platform.prototype = {
    createPlatform: function (gameview) {
      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.backgroundColor = this.color;
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      gameview.appendChild(visual);
    },
    movePlatform: function () {
      this.left -= 5;
      this.visual.style.left = this.left + "px";
    },
  };
  function Pillar(left, bottom) {
    this.left = left;
    this.bottom = bottom;
    this.visual = document.createElement("div");
  }
  Pillar.prototype = {
    addPillar: function (gameview, rotation) {
      const visual = this.visual;
      visual.classList.add("pillar");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      visual.style.transform = "rotate(" + rotation + "deg)";
      gameview.appendChild(visual);
    },
    movePillar: function () {
      this.left -= 5;
      this.visual.style.left = this.left + "px";
    },
  };
  function Glass(left, bottom, level) {
    this.left = left;
    this.bottom = bottom;
    this.level = level;
    this.visual = document.createElement("div");
  }

  Glass.prototype = {
    addGlass: function (gameview, glassWidth) {
      const visual = this.visual;
      visual.classList.add("glass");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      visual.style.width = glassWidth + "px";
      visual.style.height = glassWidth + "px";
      gameview.appendChild(visual);
    },
    changeColor: function (color) {
      this.visual.style.backgroundColor = color;
    },
    glass_break: function (gameview) {
      const img = document.createElement("img");
      img.width = 120;
      img.height = 80;
      img.src = "glass3.png";
      img.classList.add("glassImg");
      this.visual.appendChild(img);
      setTimeout(() => {
        gameview.removeChild(this.visual);
      }, 200);
    },
  };
  function Bridge(color) {
    this.glassWidth = 80;
    this.glassCount = 4;
    this.glassGapX = 50;
    this.glassGapY = 40;
    this.bridgeHeight = 300;
    this.bridgeStart = 200;

    this.topGlass = [];
    this.bottomGlass = [];
    this.bars = [];
    this.platfroms = [];
    this.pillars = [];
    this.bridgeColor = color;
  }
  Bridge.prototype = {
    createBridge: function (gameview, glassNum) {
      this.glassCount = glassNum;
      this.createPlatforms(gameview, this.bridgeColor);
      this.createBars(gameview, this.bridgeColor);
      this.createPillars(gameview);
      for (let i = 0; i < this.glassCount; i++) {
        const left = this.bridgeStart + i * (this.glassWidth + this.glassGapX);
        const bottom = this.bridgeHeight + this.glassWidth + this.glassGapY;

        const newGlassTop = new Glass(left, bottom, 1);
        const newGlassBottom = new Glass(left, this.bridgeHeight, 0);
        this.topGlass.push(newGlassTop);
        this.bottomGlass.push(newGlassBottom);
        newGlassTop.addGlass(gameview, this.glassWidth);
        newGlassBottom.addGlass(gameview, this.glassWidth);
      }
    },
    createPillars: function (gameview) {
      const left1 = this.platfroms[0].left + 15;
      const bottom1 = 125;
      const pillar1 = new Pillar(left1, bottom1);
      this.pillars.push(pillar1);
      pillar1.addPillar(gameview, -10);
      const left2 = left1 + 65;
      const pillar2 = new Pillar(left2, bottom1);
      this.pillars.push(pillar2);
      pillar2.addPillar(gameview, -10);
      const bottom2 = bottom1 + 270;
      const pillar3 = new Pillar(left1, bottom2);
      this.pillars.push(pillar3);
      pillar3.addPillar(gameview, -10);
      const pillar4 = new Pillar(left2, bottom2);
      this.pillars.push(pillar4);
      pillar4.addPillar(gameview, -10);
      const left3 = this.platfroms[1].left - 3;
      const pillar5 = new Pillar(left3, bottom1);
      this.pillars.push(pillar5);
      pillar5.addPillar(gameview, 10);
      const left4 = left3 + 65;
      const pillar6 = new Pillar(left4, bottom1);
      this.pillars.push(pillar6);
      pillar6.addPillar(gameview, 10);
      const pillar7 = new Pillar(left3, bottom2);
      this.pillars.push(pillar7);
      pillar7.addPillar(gameview, 10);
      const pillar8 = new Pillar(left4, bottom2);
      this.pillars.push(pillar8);
      pillar8.addPillar(gameview, 10);
    },
    createBars: function (gameview, color) {
      for (let i = 0; i < 2; i++) {
        const left = this.platfroms[0].left + 80;
        const bottom = this.bridgeHeight + i * (this.glassWidth - 10);
        const length = this.platfroms[1].left - this.platfroms[0].left - 80;

        const newBar = new Bar(left, bottom, length, color);
        this.bars.push(newBar);
        newBar.addBar(gameview);
      }
      for (let i = 0; i < 2; i++) {
        const left = this.platfroms[0].left + 80;
        const bottom =
          this.bridgeHeight +
          this.glassWidth +
          this.glassGapY +
          i * (this.glassWidth - 10);
        const length = this.platfroms[1].left - this.platfroms[0].left - 80;

        const newBar = new Bar(left, bottom, length, color);
        this.bars.push(newBar);
        newBar.addBar(gameview);
      }
    },
    moveBridge: function () {
      this.moveGlasses();
      this.movePlatforms();
      this.moveBars();
      this.movePillars();
    },
    moveGlasses: function () {
      this.bottomGlass.forEach((glass) => {
        glass.left -= 5;
        glass.visual.style.left = glass.left + "px";
      });
      this.topGlass.forEach((glass) => {
        glass.left -= 5;
        glass.visual.style.left = glass.left + "px";
      });
    },
    moveBars: function () {
      this.bars.forEach((bar) => {
        bar.moveBar();
      });
    },
    movePlatforms: function () {
      this.platfroms.forEach((item) => {
        item.movePlatform();
      });
    },
    movePillars: function () {
      this.pillars.forEach((pillar) => {
        pillar.movePillar();
      });
    },
    createPlatforms: function (gameview, color) {
      const sLeft = 70;
      const sBottom = 230;
      const startPlatform = new Platform(sLeft, sBottom, color);
      this.platfroms.push(startPlatform);
      startPlatform.createPlatform(gameview);

      const eLeft =
        this.bridgeStart + this.glassCount * (this.glassWidth + this.glassGapX);
      const eBottom = 230;
      const endPlatform = new Platform(eLeft, eBottom, color);
      this.platfroms.push(endPlatform);
      endPlatform.createPlatform(gameview);
    },

    senseHover: function (index, jumper, glass) {
      glass.visual.addEventListener("mouseover", () => {
        if (
          this.jumperOnLeftBottom(index, jumper) ||
          this.jumperOnRightTop(index, jumper)
        ) {
          glass.changeColor("green");
        }
      });

      glass.visual.addEventListener("mouseout", () => {
        if (
          this.jumperOnLeftBottom(index, jumper) ||
          this.jumperOnRightTop(index, jumper)
        ) {
          glass.changeColor("#b8e4e4");
        }
      });
      glass.visual.addEventListener("mouseup", () => {
        if (
          this.jumperOnLeftBottom(index, jumper) ||
          this.jumperOnRightTop(index, jumper)
        ) {
          glass.changeColor("#b8e4e4");
        }
      });
    },
    jumperOnRightTop: function (glass_i, jumper) {
      if (glass_i === 0) return jumper.jumperLeft < this.bridgeStart;
      const scr_glass = this.topGlass[glass_i - 1];

      const glassleft = scr_glass.left;
      const glassbottom = scr_glass.bottom;
      return jumper.checkOnGlass(
        glassleft,
        glassbottom,
        this.glassWidth,
        this.glassGapX,
        this.glassGapY
      );
    },
    jumperOnLeftBottom: function (glass_i, jumper) {
      if (glass_i === 0) return jumper.jumperLeft < this.bridgeStart;
      const scr_glass = this.bottomGlass[glass_i - 1];

      const glassleft = scr_glass.left;
      const glassbottom = scr_glass.bottom;
      return jumper.checkOnGlass(
        glassleft,
        glassbottom,
        this.glassWidth,
        this.glassGapX,
        this.glassGapY
      );
    },
  };
  function Jumper(
    glassWidth,
    glassGapX,
    glassGapY,
    bridgeStart,
    bridgeHeight,
    jumperImg,
    jumperDeadImg
  ) {
    this.jumper = document.createElement("div");
    this.jumperImg = jumperImg;
    this.jumperDeadImg = jumperDeadImg;
    this.jumperWidth = 50;
    this.jumperLeft =
      bridgeStart - glassWidth / 2 - this.jumperWidth / 2 - glassGapX;
    this.jumperBottom = bridgeHeight + glassWidth / 2 - 10;

    this.jumpDistanceX = glassWidth + glassGapX;
    this.jumpDistanceY = glassWidth + glassGapY;

    this.jumperGlassIndex = 0;
    this.jumperLevel = 0;
    this.jumpHeight = 20;
  }
  Jumper.prototype = {
    createJumper: function (gameview) {
      this.jumper.classList.add("jumper");
      const img = document.createElement("img");
      img.src = this.jumperImg;
      img.width = 90;
      img.height = 90;
      img.classList.add("jumperImg");
      this.jumper.appendChild(img);
      this.jumper.style.left = this.jumperLeft + "px";
      this.jumper.style.bottom = this.jumperBottom + "px";
      gameview.appendChild(this.jumper);
    },
    jumperfall: function () {
      return new Promise((resolve) => {
        let hopInterval = setInterval(
          function () {
            if (this.jumperBottom <= 130) {
              clearInterval(hopInterval);

              this.jumper.removeChild(this.jumper.firstChild);
              const img = document.createElement("img");
              img.src = this.jumperDeadImg;
              img.width = 80;
              img.height = 80;
              this.jumper.appendChild(img);
              resolve();
            } else {
              this.jumper.style.zIndex = "0";
              this.jumperBottom -= 5;
              this.updateBottomDom();
            }
          }.bind(this),
          10
        );
      });
    },
    bottomToTop: function (
      dest_x = this.jumperLeft + this.jumpDistanceX,
      dest_y = this.jumperBottom + this.jumpDistanceY
    ) {
      return new Promise((resolve) => {
        let hopInterval = setInterval(
          function () {
            if (this.jumperLeft >= dest_x && this.jumperBottom >= dest_y) {
              clearInterval(hopInterval);
              resolve();
            } else if (
              this.jumperLeft < dest_x &&
              this.jumperBottom >= dest_y
            ) {
              this.jumperLeft += 2;
              this.updateLeftDom();
              this.jumperBottom = dest_y;
              this.updateBottomDom();
            } else if (
              this.jumperLeft >= dest_x &&
              this.jumperBottom < dest_y
            ) {
              this.jumperLeft = dest_x;
              this.updateLeftDom();
              this.jumperBottom += 2;

              this.updateBottomDom();
            } else {
              this.jumperLeft += 2;
              this.updateLeftDom();
              this.jumperBottom += 2;

              this.updateBottomDom();
            }
          }.bind(this),
          10
        );
        this.jumperGlassIndex += 1;
        this.jumperLevel = 1;
      });
    },
    topToBottom: function (
      dest_x = this.jumperLeft + this.jumpDistanceX,
      dest_y = this.jumperBottom - this.jumpDistanceY
    ) {
      return new Promise((resolve) => {
        let hopInterval = setInterval(
          function () {
            if (this.jumperLeft >= dest_x && this.jumperBottom <= dest_y) {
              clearInterval(hopInterval);
              resolve();
            } else if (
              this.jumperLeft < dest_x &&
              this.jumperBottom <= dest_y
            ) {
              this.jumperLeft += 2;
              this.updateLeftDom();
              this.jumperBottom = dest_y;
              this.updateBottomDom();
            } else if (
              this.jumperLeft >= dest_x &&
              this.jumperBottom > dest_y
            ) {
              this.jumperLeft = dest_x;
              this.updateLeftDom();
              this.jumperBottom -= 2;

              this.updateBottomDom();
            } else {
              this.jumperLeft += 2;
              this.updateLeftDom();
              this.jumperBottom -= 2;

              this.updateBottomDom();
            }
          }.bind(this),
          10
        );
        this.jumperGlassIndex += 1;
        this.jumperLevel = 0;
      });
    },
    parallelJump: async function () {
      let pastJumperLevel = this.jumperLevel;
      await this.bottomToTop(
        this.jumperLeft + this.jumpDistanceX / 2,
        this.jumperBottom + this.jumpHeight
      );
      await this.topToBottom(
        this.jumperLeft + this.jumpDistanceX / 2 - 1,
        this.jumperBottom - this.jumpHeight
      );
      this.jumperGlassIndex -= 1;
      this.jumperLevel = pastJumperLevel;
      return;
    },
    checkOnGlass: function (
      glassleft,
      glassbottom,
      glassWidth,
      glassGapX,
      glassGapY
    ) {
      if (glassleft - glassGapX / 2 > this.jumperLeft) return false;
      if (this.jumperLeft > glassleft + glassWidth + glassGapX / 2)
        return false;
      if (glassbottom - glassGapY / 2 > this.jumperBottom) return false;
      if (this.jumperBottom > glassbottom + glassWidth + glassGapY / 2)
        return false;
      return true;
    },
    updateLeftDom: function () {
      this.jumper.style.left = this.jumperLeft + "px";
    },

    updateBottomDom: function () {
      this.jumper.style.bottom = this.jumperBottom + "px";
    },
  };
  function BridgeGame() {
    this.visual = document.createElement("div");
    this.background = "always_grey.png";
    this.backgroundRepeat = "repeat";
    this.end = ["always_grey.png", "repeat"];
    this.jumperImg = ["squid-game.svg", "dead.svg"];
    this.bridgeColor = "#ff00ff";
    this.bridge = new Bridge(this.bridgeColor);
    this.jumper = new Jumper(
      this.bridge.glassWidth,
      this.bridge.glassGapX,
      this.bridge.glassGapY,
      this.bridge.bridgeStart,
      this.bridge.bridgeHeight,
      this.jumperImg[0],
      this.jumperImg[1]
    );
    this.prize = null;
    this.steps = null;
    this.prob = null;
  }

  BridgeGame.prototype = {
    draw_game: function (glassNum, grid, menu) {
      this.visual.classList.add("gameview"); // todo
      this.visual.style.backgroundImage = "url(" + this.background + ")";
      this.visual.style.backgroundRepeat = this.backgroundRepeat;
      if (this.backgroundRepeat === "no-repeat") {
        this.visual.style.backgroundSize = "cover";
      }
      this.bridge.createBridge(this.visual, glassNum);
      this.jumper.createJumper(this.visual);
      this.bridgeJump(this.jumper, grid, menu);
    },
    calculateGlass: function (prob) {
      const glassNum = Math.ceil(this.log(0.5, prob));
      return glassNum;
    },
    log: function (base, number) {
      return Math.log(number) / Math.log(base);
    },
    nthroot: function (base, root) {
      let ng = root % 2;
      if (ng == 1 || base < 0) base = -base;
      let r = Math.pow(base, 1 / root);
      root = Math.pow(r, root);

      if (Math.abs(base - root) < 1 && base > 0 === root > 0)
        return ng ? -r : r;
    },
    roleDice: function () {
      let prob_each_step = this.nthroot(this.prob, this.steps);

      if (!this.steps) {
        prob_each_step = 0.5;
      }

      const rslt = Math.random();
      if (rslt <= prob_each_step) {
        return false;
      } else {
        return true;
      }
    },
    bridgeJump: function (jumper, grid, menu) {
      this.bridge.platfroms[1].visual.addEventListener("click", () => {
        if (this.bridge.jumperOnLeftBottom(this.bridge.glassCount, jumper)) {
          jumper.parallelJump().then(() => {
            this.endGame(grid, 1, this.prize, menu);
          });
        } else if (
          this.bridge.jumperOnRightTop(this.bridge.glassCount, jumper)
        ) {
          jumper.topToBottom().then(() => {
            this.endGame(grid, 1, this.prize, menu);
          });
        }
      });

      this.bridge.topGlass.forEach((glass, index) => {
        glass.visual.addEventListener("click", () => {
          if (this.bridge.jumperOnLeftBottom(index, jumper)) {
            jumper.bottomToTop().then(() => {
              if (this.roleDice()) {
                glass.glass_break(this.visual);
                setTimeout(() => {
                  jumper
                    .jumperfall()
                    .then(() => this.endGame(grid, 0, this.prize, menu));
                }, 300);
              } else if (this.jumper.jumperLeft >= 735) {
                this.moveItems();
              }
            });
          } else if (this.bridge.jumperOnRightTop(index, jumper)) {
            jumper.parallelJump().then(() => {
              if (this.roleDice()) {
                glass.glass_break(this.visual);
                setTimeout(() => {
                  jumper
                    .jumperfall()
                    .then(() => this.endGame(grid, 0, this.prize, menu));
                }, 300);
              } else if (this.jumper.jumperLeft >= 735) {
                this.moveItems();
              }
            });
          }
        });

        this.bridge.senseHover(index, jumper, glass);
      });

      this.bridge.bottomGlass.forEach((glass, index) => {
        glass.visual.addEventListener("click", () => {
          if (this.bridge.jumperOnLeftBottom(index, jumper)) {
            jumper.parallelJump().then(() => {
              if (this.roleDice()) {
                glass.glass_break(this.visual);
                setTimeout(() => {
                  jumper
                    .jumperfall()
                    .then(() => this.endGame(grid, 0, this.prize, menu));
                }, 300);
              } else if (this.jumper.jumperLeft >= 735) {
                this.moveItems();
              }
            });
          } else if (this.bridge.jumperOnRightTop(index, jumper)) {
            jumper.topToBottom().then(() => {
              if (this.roleDice()) {
                glass.glass_break(this.visual);
                setTimeout(() => {
                  jumper
                    .jumperfall()
                    .then(() => this.endGame(grid, 0, this.prize, menu));
                }, 300);
              } else if (this.jumper.jumperLeft >= 735) {
                this.moveItems();
              }
            });
          }
        });
        this.bridge.senseHover(index, jumper, glass);
      });
    },
    moveItems() {
      return new Promise((resolve) => {
        let moveInterval = setInterval(
          function () {
            if (this.jumper.jumperLeft <= 441) {
              clearInterval(moveInterval);
              resolve();
            } else {
              this.jumper.jumperLeft -= 5;
              this.jumper.updateLeftDom();
              this.bridge.moveBridge();
            }
          }.bind(this),
          10
        );
      });
    },
    start_game: function (grid, menu) {
      menu.buttons.forEach((button) => {
        button.visual.addEventListener("click", () => {
          grid.removeChild(grid.firstChild);
          this.visual = document.createElement("div");
          this.bridge = new Bridge(this.bridgeColor);
          this.jumper = new Jumper(
            this.bridge.glassWidth,
            this.bridge.glassGapX,
            this.bridge.glassGapY,
            this.bridge.bridgeStart,
            this.bridge.bridgeHeight,
            this.jumperImg[0],
            this.jumperImg[1]
          );
          this.prize = button.text;
          this.steps = button.steps;
          this.prob = button.prob / 100;
          grid.appendChild(this.visual);
          if (!this.steps) {
            this.draw_game(this.calculateGlass(button.prob / 100), grid, menu);
          } else {
            this.draw_game(this.steps, grid, menu);
          }
        });
      });
    },
    endGame(grid, win, prize, menu) {
      setTimeout(() => {
        grid.removeChild(this.visual);
        const endview = new EndScreen(prize, win, this.end);
        endview.createScreen();
        grid.append(endview.visual);
        endview.button.addEventListener("click", () => {
          grid.removeChild(endview.visual);
          grid.append(menu.visual);
          this.start_game(grid, menu);
        });
      }, 450);
    },
  };

  function Game(options) {
    this.data = options.data;
    this.grid = document.createElement("div");
    this.menu = new Menu(this.data);
    this.bridgeGame = new BridgeGame();
    this.bckImg = ["always_grey.png", "always_grey.png", "always_grey.png"];
    this.repeat = ["repeat", "repeat", "repeat"];
  }

  Game.prototype = {
    lottery_game: function () {
      this.grid.classList.add("grid");

      this.menu.createMenu();
      this.bridgeGame.start_game(this.grid, this.menu);
      this.grid.append(this.menu.visual);
      return this.grid;
    },
    set_num_steps: function (lst_of_steps) {
      for (let i = 0; i < lst_of_steps.length; i++) {
        this.data[i].steps = lst_of_steps[i];
      }
    },
    reset_chance: function (lst_of_chances) {
      for (let i = 0; i < lst_of_chances.length; i++) {
        this.data[i].chance = lst_of_chances[i];
      }
    },
    reset_startScreenBck: function (img, repeat) {
      this.menu.background = img;
      this.menu.backgroundRepeat = repeat;
    },
    reset_gameScreenBck: function (img, repeat) {
      this.bridgeGame.background = img;
      this.bridgeGame.backgroundRepeat = repeat;
    },
    reset_endSreenBck: function (img, repeat) {
      this.bridgeGame.end[0] = img;
      this.bridgeGame.end[1] = repeat;
    },
    change_Jumper: function (jumper_img, jumper_dead_img) {
      this.bridgeGame.jumperImg[0] = jumper_img;
      this.bridgeGame.jumperImg[1] = jumper_dead_img;
    },
    change_bridge_color: function (color) {
      this.bridgeGame.bridgeColor = color;
    },
  };

  global.Game = global.Game || Game;
})(window, window.document);
