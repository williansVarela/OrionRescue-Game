var starryBG1;
var starryBG2;

var bgRocks;
var bgrock1;
var bgrock2;
var bgrock3;
var bgrock4;
var bgrock5;
var bgrock6;
var bgrock7;
var bgrock8;
var bgfadeaway;

var spaceship;
var fire;
var flying;

var rocks;
var rocksScale = 1.5;
var rocksInterval = 2000;

var lftBtn;
var lftBtnPressed = false;
var rgtBtn;
var rgtBtnPressed = false;

var speed = 3500;
var rockTimer = 0;
var fallPttrns;
var fallSpeed = 1000;

var earthIcon;
var disBarPct = 100;

var score = 0;

var plntSpeed = 2;

var scoreText = null;
var grd;

var starRain;

var winSprite;
var gameWin = false;
var earthSent = false;

orionRescue.state1 = function() {};
orionRescue.state1.prototype = {

  WebFontConfig: {
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: {
    families: ['Revalia']
    }
  },

  preload: function() {
  },
/*-----------------------------------------------------------*/
  create: function() {
    menuMusic.mute = true; //stop main menu audio

    // Basic Set Up
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Starry and Planet Backgrounds --------------------------------------------------------------------
    game.add.tileSprite(0, 0, game.width, game.height, 'darkbg');
    starryBG1 = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'furtherstars');
    starryBG2 = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'closerstars');
    planetBG = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'planetBG');

    starryBG1.alpha = 0.3;
    game.add.tween(starryBG1).to( { alpha: 0.4 }, 100, "Linear", true, 0, Number.MAX_VALUE, true);
    game.add.tween(starryBG2).to( { alpha: 0.7 }, 100, "Linear", true, 0, Number.MAX_VALUE, true);

    // Background Rocks --------------------------------------------------------------------
    var delay = 0;
    var bgrockArr = ['bala_amarela', 'bala_verde', 'bala_vermelha', 'bolo', 'chocolate', 'gummy_bear_amarelo', 'gummy_bear_azul', 'gummy_bear_verde', 'gummy_bear_vermelho', 'marshmallow_azul', 'marshmallow_rosa', 'pudim_rosa', 'pudim_verde'];

    for (var i = 0; i < 30; i++) {
      var rockIndex = Math.floor(Math.random() * bgrockArr.length);
      bgRocks = game.add.sprite(game.world.randomX, -gameHeight*0.2, bgrockArr[rockIndex]);

      bgRocks.alpha = game.rnd.realInRange(0.3, 0.4);
      bgRocks.anchor.setTo(0.5, 1);
      bgRocks.angle = Math.floor(Math.random() * 360) -180;
      bgRocks.scale.set(game.rnd.realInRange(0.1, 0.4));

      var speed = game.rnd.between(fallSpeed*8, fallSpeed*10);

      game.add.tween(bgRocks).to({ y: gameHeight*1.2 }, speed, "Linear", true, delay, 1000, false);

      delay += 200;
    }

    // Stars rain --------------------------------------------------------------------
    starRain = game.add.emitter(game.world.centerX, 0, 100);
    starRain.width = game.world.width;

    starRain.makeParticles('rain');

    starRain.minParticleScale = 0.1;
    starRain.maxParticleScale = 0.4;

    starRain.setYSpeed(4500, 6000);
    starRain.setXSpeed(-5, 5);

    starRain.minRotation = 0;
    starRain.maxRotation = 0;

    starRain.start(false, 1600, 30, 0);

    // Background Gradient --------------------------------------------------------------------
    game.add.tileSprite(0, 0, game.width, game.height, 'gradientbg');

    // Spaceship Set Up --------------------------------------------------------------------

    fire = game.add.sprite(game.world.centerX, gameHeight*0.835, 'fire');
    game.physics.enable(fire, Phaser.Physics.ARCADE);
    fire.body.drag.x = 5500;
    fire.body.maxVelocity.x = 2000; //Set max velocity for spaceship
    fire.body.collideWorldBounds = true;
    fire.anchor.setTo(0.5, 0);
    fire.scale.setTo(0.31578947368421052631578947368421);
    fire.animations.add('flying', [0, 1, 2, 3, 4, 5, 6, 7]);
    fire.animations.play('flying', 24, true);

    spaceship = game.add.sprite(game.world.centerX, gameHeight*0.8, 'spaceship');
    spaceship.anchor.setTo(0.5, 0.5);
    game.physics.enable(spaceship, Phaser.Physics.ARCADE);
    spaceship.body.drag.x = 5500;
    spaceship.body.maxVelocity.x = 2500; //Set max velocity for spaceship
    spaceship.body.collideWorldBounds = true;


    // Red Asteroids Set Up --------------------------------------------------------------------
    rocks = game.add.group();
    rocks.enableBody = true;
    rocks.physicsBodyType = Phaser.Physics.ARCADE;
    rocks.createMultiple(30, ['bala_amarela', 'bala_verde', 'bala_vermelha', 'bolo', 'chocolate', 'marshmallow_azul', 'marshmallow_rosa', 'pudim_rosa', 'pudim_verde']);
    rocks.setAll('anchor.x', 0.5);
    rocks.setAll('anchor.y', 1);
    rocks.setAll('outOfBoundsKill', true);
    rocks.setAll('checkWorldBounds', true);

    // Scoreboard --------------------------------------------------------------------
    var timeText = game.add.text(gameWidth * 0.025, gameWidth * 0.025, 'PONTOS');
    scoreText = game.add.text(gameWidth * 0.025, timeText.height * 2, '0');

    timeText.anchor.setTo(0); timeText.anchor.setTo(0);

    timeText.font = 'Revalia'; scoreText.font = 'Revalia';
    timeText.fontSize = 30; scoreText.fontSize = 60;

      //  x0, y0 - x1, y1
    grd = scoreText.context.createLinearGradient(0, 0, 0, scoreText.canvas.height);
    grd.addColorStop(0, '#EDECF1');
    grd.addColorStop(1, '#C9CACE');
    scoreText.fill = grd;
    timeText.fill = '#EDECF1';

    timeText.align = 'center'; scoreText.align = 'center';
    scoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    // Distance Bar --------------------------------------------------------------------
    var barConfig =
    {
      x: game.world.centerX,
      y: gameHeight*0.975,
      width: gameWidth*0.5,
      height: gameHeight*0.0125,
      bg: {
      color: '#D7FFFF'
      },
      bar: {
        color: '#060014'
      },
      animationDuration: 1000,
      flipped: true
    };

    this.distanceBar = new HealthBar(this.game, barConfig);
    game.time.events.loop(Phaser.Timer.SECOND, this.everySecond, this);
    game.time.events.loop(Phaser.Timer.SECOND*5, this.every5Seconds, this);

    earthIcon = game.add.sprite(game.world.centerX + barConfig.width/2, barConfig.y, 'earthIcon');
    earthIcon.anchor.setTo(0.5, 0.5);
    earthIcon.width = gameWidth*0.05;
    earthIcon.height = gameWidth*0.05;

    // Buttons --------------------------------------------------------------------
    rgtBtn = game.add.button(gameWidth * 0.9, gameHeight * 0.9, 'rightBtn');
    lftBtn = game.add.button(gameWidth * 0.1, gameHeight * 0.9, 'leftBtn');
    btnSA(rgtBtn, 0.5);
    btnSA(lftBtn, 0.5);
    lftBtn.onInputDown.add(this.movLeft, lftBtn);
    lftBtn.onInputUp.add(this.stopLeft, lftBtn);
    rgtBtn.onInputDown.add(this.movRight, rgtBtn);
    rgtBtn.onInputUp.add(this.stopRight, rgtBtn);

    var fadeawaystart = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'fadeaway');
    fadeawaystart.alpha = 0.8;
    game.add.tween(fadeawaystart).to( { alpha: 0 }, 3000, "Linear", true);
  },
/*-----------------------------------------------------------*/
  update: function() {
    // Starry and Planet Backgrounds Movement --------------------------------------------------------------------
    starryBG1.tilePosition.y += 0.9;
    starryBG2.tilePosition.y += 1;
    
    fire.position.x = spaceship.position.x;

    if(planetBG.tilePosition.y < 8990) {
      planetBG.tilePosition.y += plntSpeed;
    }

    // SpaceShip Movement --------------------------------------------------------------------
    if(!gameWin){
      if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || rgtBtnPressed == true) {
        spaceship.body.acceleration.x = speed;
        fire.body.acceleration.x = speed;
      } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || lftBtnPressed == true) {
        spaceship.body.acceleration.x = -speed;
        fire.body.acceleration.x = -speed;
      } else if(!rgtBtnPressed && !lftBtnPressed) {
        spaceship.body.acceleration.x = 0;
        fire.body.acceleration.x = 0;
      }
    };

    if(spaceship.alive) {
      // Collision --------------------------------------------------------------------
      game.physics.arcade.overlap(spaceship, rocks, collisionHandler, null, this);

      // Scoreboard Update --------------------------------------------------------------------
      scoreText.text = score;

      // RockShower Call --------------------------------------------------------------------
      if(game.time.now > rockTimer && !gameWin) {
        fallPttrns = [fallRandom(100, 300), fallRandom(400, 600), fallRandom(700, 900)]
        var pos = Math.floor(Math.random() * fallPttrns.length);
        rockShower(pos);
      }

      // Victory Checkup --------------------------------------------------------------------
      if(disBarPct < 0) {
        starRain.on = false;
        gameWin = true;
        spaceship.position.x = Math.round(spaceship.position.x);
        fire.position.x = Math.round(fire.position.x);

        if(!rock.alive){
          if(spaceship.position.x > game.world.centerX){
            spaceship.position.x--;
            fire.position.x--;
          } else {
            spaceship.position.x++;
            fire.position.x++;
          }
        };

        if(gameWin == true && !earthSent && spaceship.position.x == game.world.centerX) {
          earthSent = true;
          winSprite = game.add.sprite(game.world.centerX, 0, 'earthWin');
          winSprite.anchor.setTo(0.5, 1);
          winSprite.scale.setTo(4);
          earth = game.add.tween(winSprite).to({ y: gameHeight + winSprite.height }, 15500, "Linear", true);
  
          setTimeout(function() {
            earth.pause();
            // Fadeaway background endgame
            fadeawaybg = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'fadeaway');
            fadeawaybg.alpha = 0;
            fadeaway = game.add.tween(fadeawaybg).to( { alpha: 1 }, 7000, "Linear", true);
          }, 2500);
          setTimeout(function() { //reset game
            resetGame();
            game.state.start('mainmenu');
          }, 10500);
          
          var winText = game.add.text(game.world.centerX, game.world.centerY*0.8, 'Você conseguiu!!\nChegamos ao\nplaneta Terra');
  
          winText.anchor.setTo(0.5);
  
          winText.font = 'Arial';
          winText.fontSize = 160;
  
          var grdGO = winText.context.createLinearGradient(0, 0, 0, winText.canvas.height);
          grdGO.addColorStop(0, '#EDECF1');
          grdGO.addColorStop(1, '#C9CACE');
          winText.fill = grdGO;
  
          winText.align = 'center';
          winText.setShadow(5, 5, 'rgba(131, 0, 8, 0.8)', 5);
          winText.alpha = 0;
          game.add.tween(winText).to( { alpha: 1 }, 2500, "Linear", true);
        };
      };

    }
  }, //Update Function End

  movLeft: function() {
    lftBtnPressed = true;
  },

  movRight: function() {
    rgtBtnPressed = true;
  },

  stopLeft: function() {
    lftBtnPressed = false;
  },

  stopRight: function() {
    rgtBtnPressed = false;
  },

  everySecond: function() {
    if(spaceship.alive && !gameWin) {
      disBarPct -= 20;//1/(1000/fallSpeed);
      this.distanceBar.setPercent(disBarPct);
      score++;
    }
  },

  every5Seconds: function() {
    fallSpeed += 25;
    if(rocksScale < 3) {
      rocksScale += 0.05;
    }
    if(rocksInterval > 1500){
      rocksInterval -= 50;
    }
    if(score == 20){
      rocksScale = 3.5;
      setTimeout(function() {rocksScale = 1.8}, 3000);
    }
    if(score == 40){
      rocksScale = 4;
      setTimeout(function() {rocksScale = 2}, 3000);
    }
    if(score == 60){
      rocksScale = 4;
      setTimeout(function() {rocksScale = 2.5}, 2000);
    }
  }

};

function btnSA(btn, size) {
  btn.anchor.setTo(0.5, 0.5);
  btn.scale.setTo(0.35);
};

function collisionHandler(starship, rock) {
  if(!gameWin) {
    // Explosion Animations --------------------------------------------------------------------
    var blackblast = game.add.sprite(spaceship.centerX, spaceship.centerY, 'blackblast');
    blackblast.anchor.setTo(0.5, 0.5);
    blackblast.scale.setTo(4);
    blackblast.alpha = 0.2;
    blackblast.animations.add('b_explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ,18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]);
    blackblast.animations.play('b_explode', 70, false, true);
    var blast = game.add.sprite(spaceship.centerX, spaceship.centerY, 'blast');
    blast.anchor.setTo(0.5, 0.5);
    blast.scale.setTo(2);
    blast.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ,18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
    blast.animations.play('explode', 80, false, true);

    // Game Over Text --------------------------------------------------------------------
    var gameOverText = game.add.text(game.world.centerX, game.world.centerY*0.8, 'Game Over');

    gameOverText.anchor.setTo(0.5);

    gameOverText.font = 'Revalia';
    gameOverText.fontSize = 190;

    var grdGO = gameOverText.context.createLinearGradient(0, 0, 0, gameOverText.canvas.height);
    grdGO.addColorStop(0, '#EDECF1');
    grdGO.addColorStop(1, '#C9CACE');
    gameOverText.fill = grdGO;

    gameOverText.align = 'center';
    gameOverText.setShadow(5, 5, 'rgba(131, 0, 8, 0.8)', 5);
    gameOverText.alpha = 0;
    game.add.tween(gameOverText).to( { alpha: 1 }, 2500, "Linear", true);

    // Kill Units  --------------------------------------------------------------------
    spaceship.kill();
    rock.kill();
    fire.kill();

    setTimeout(function() {
      resetGame();
      game.state.start('state1');
    }, 3000)
  }
};

function rockShower(pos) {
  rock = rocks.getRandom();
  while(rock.alive) {
    rock = rocks.getRandom();
  }
  if(spaceship.alive) {
    var xPos = fallPttrns[pos] * gameWidth;
    rock.reset(xPos, 0);
    rock.scale.setTo(rocksScale);
    game.physics.arcade.moveToXY(rock, xPos, gameHeight * 1.2, fallSpeed);
    rockTimer = game.time.now + rocksInterval;
  }
};


function fallRandom(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) ) + min)/1000;
};

function resetGame() {
  disBarPct = 100;
  score = 0;
  fallSpeed = 1000;
  rocksScale = 1.5;
  rocksInterval = 2000;
  spaceship.position.x == game.world.centerX
  gameWin = false;
  earthSent = false;
  starRain.on = true;
  game.state.restart();
};