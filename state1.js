var bgColor = '#060014';
var starryBG;

var bgRocks;
var bgrock1;
var bgrock2;
var bgrock3;
var bgrock4;
var bgrock5;
var bgrock6;
var bgrock7;
var bgrock8;

var spaceship;

var rocks;
var rocksScale = 1;
var rocksInterval = 2000;

var lftBtn;
var lftBtnPressed = false;
var rgtBtn;
var rgtBtnPressed = false;

var speed = 3000;
var rockTimer = 0;
var fallPttrns;
var fallSpeed = 800;

var disBarPct = 100;

var score = 0;

var plntSpeed = 2;

var scoreText = null;
var grd;

var starRain;


orionRescue.state1 = function() {};
orionRescue.state1.prototype = {

  WebFontConfig: {
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: {
    families: ['Revalia']
    }
  },

  preload: function() {
    game.load.image('spaceship', 'assets/spaceship.png');
    game.load.image('rock1', 'assets/asteroids/asteroid1.png');
    game.load.image('rock2', 'assets/asteroids/asteroid2.png');

    game.load.image('bgrock1', 'assets/asteroids/bg_asteroid01.png');
    game.load.image('bgrock2', 'assets/asteroids/bg_asteroid02.png');
    game.load.image('bgrock3', 'assets/asteroids/bg_asteroid03.png');
    game.load.image('bgrock4', 'assets/asteroids/bg_asteroid04.png');
    game.load.image('bgrock5', 'assets/asteroids/bg_asteroid05.png');
    game.load.image('bgrock6', 'assets/asteroids/bg_asteroid06.png');
    game.load.image('bgrock7', 'assets/asteroids/bg_asteroid07.png');
    game.load.image('bgrock8', 'assets/asteroids/bg_asteroid08.png');

    game.load.image('leftBtn', 'assets/lft-btn.png');
    game.load.image('rightBtn', 'assets/rgt-btn.png');
    game.load.image('starryBG', 'assets/starry_sky0.png');
    game.load.image('planetBG', 'assets/planet_sky1.png');
    game.load.image('bgGradient', 'assets/bg_gradient.png');
    game.load.image('earth', 'assets/earth_.png');

    game.load.spritesheet('rain', 'assets/rain.png', 20, 700);
    game.load.spritesheet('blast', 'assets/explosion.png', 256, 256);
    game.load.spritesheet('blackblast', 'assets/blackexplosion.png', 128, 128);

    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.28/webfont.js');

  },
/*-----------------------------------------------------------*/
  create: function() {

    // Basic Set Up
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Starry and Planet Backgrounds --------------------------------------------------------------------
    starryBG = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'starryBG');
    planetBG = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'planetBG');

    // Background Rocks --------------------------------------------------------------------
    var delay = 0;
    var bgrockArr = ['bgrock1', 'bgrock2', 'bgrock3', 'bgrock4', 'bgrock5', 'bgrock6', 'bgrock7', 'bgrock8'];

    for (var i = 0; i < 20; i++) {
      var rockIndex = Math.floor(Math.random() * bgrockArr.length);
      bgRocks = game.add.sprite(game.world.randomX, -gameHeight*0.2, bgrockArr[rockIndex]);

      bgRocks.anchor.setTo(0.5, 1);
      bgRocks.angle = Math.floor(Math.random() * 360) -180;
      bgRocks.scale.set(game.rnd.realInRange(0.5, 1));

      var speed = game.rnd.between(fallSpeed*8, fallSpeed*10);

      game.add.tween(bgRocks).to({ y: gameHeight*1.2 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);

      delay += 200;
    }

    // Stars rain --------------------------------------------------------------------
    starRain = game.add.emitter(game.world.centerX, 0, 100);
    starRain.width = game.world.width;

    starRain.makeParticles('rain');

    starRain.minParticleScale = 0.1;
    starRain.maxParticleScale = 0.4;

    starRain.setYSpeed(3000, 5000);
    starRain.setXSpeed(-5, 5);

    starRain.minRotation = 0;
    starRain.maxRotation = 0;

    starRain.start(false, 1600, 30, 0);

    // Background Gradient --------------------------------------------------------------------
    game.add.tileSprite(0, 0, game.width, game.height, 'bgGradient');

    // Spaceship Set Up --------------------------------------------------------------------
    spaceship = game.add.sprite(game.world.centerX, gameHeight*0.8, 'spaceship');
    spaceship.anchor.setTo(0.5, 0.5);
    game.physics.enable(spaceship, Phaser.Physics.ARCADE);
    spaceship.body.drag.x = 5500;
    spaceship.body.maxVelocity.x = 2000; //Set max velocity for spaceship
    spaceship.body.collideWorldBounds = true;

    // Red Asteroids Set Up --------------------------------------------------------------------
    rocks = game.add.group();
    rocks.enableBody = true;
    rocks.physicsBodyType = Phaser.Physics.ARCADE;
    rocks.createMultiple(30, ['rock1', 'rock2']);
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

    var earth = game.add.sprite(game.world.centerX + barConfig.width/2, barConfig.y, 'earth');
    earth.anchor.setTo(0.5, 0.5);
    earth.width = gameWidth*0.05;
    earth.height = gameWidth*0.05;

    // Buttons --------------------------------------------------------------------
    rgtBtn = game.add.button(gameWidth * 0.9, gameHeight * 0.9, 'rightBtn');
    lftBtn = game.add.button(gameWidth * 0.1, gameHeight * 0.9, 'leftBtn');
    btnSA(rgtBtn, 0.5);
    btnSA(lftBtn, 0.5);
    lftBtn.onInputDown.add(this.movLeft, lftBtn);
    lftBtn.onInputUp.add(this.stopLeft, lftBtn);
    rgtBtn.onInputDown.add(this.movRight, rgtBtn);
    rgtBtn.onInputUp.add(this.stopRight, rgtBtn);

  },
/*-----------------------------------------------------------*/
  update: function() {
    // Starry and Planet Backgrounds Movement --------------------------------------------------------------------
    starryBG.tilePosition.y += 1;
    if(planetBG.tilePosition.y < 8990) {
      planetBG.tilePosition.y += plntSpeed;
    }

    // SpaceShip Movement --------------------------------------------------------------------
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || rgtBtnPressed == true) {
      spaceship.body.acceleration.x = speed;
    } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || lftBtnPressed == true) {
      spaceship.body.acceleration.x = -speed;
    } else if(rgtBtnPressed == false && lftBtnPressed == false) {
      spaceship.body.acceleration.x = 0;
    }

    if(spaceship.alive) {
      // Collision --------------------------------------------------------------------
      game.physics.arcade.overlap(spaceship, rocks, collisionHandler, null, this);

      // Scoreboard Update --------------------------------------------------------------------
      scoreText.text = score;

      // RockShower Call --------------------------------------------------------------------
      if(game.time.now > rockTimer) {
        fallPttrns = [fallRandom(100, 300), fallRandom(400, 600), fallRandom(700, 900)]
        var pos = Math.floor(Math.random() * fallPttrns.length);
        rockShower(pos);
      }

      // Victory Checkup --------------------------------------------------------------------
      if(disBarPct < 0) {
        //VITÓRIA OU FASE 2
      }

    } else {

    }




  },

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
    if(spaceship.alive) {
      disBarPct -= 1/(800/fallSpeed);
      this.distanceBar.setPercent(disBarPct);
      score++;
    }
  },

  every5Seconds: function() {
    fallSpeed += 25;
    if(rocksScale < 1.5) {
      rocksScale += 0.03;
    }
    if(rocksInterval > 1500)
    rocksInterval -= 50;
  }

};

function btnSA(btn, size) {
  btn.anchor.setTo(0.5, 0.5);
  btn.scale.setTo(0.35);
};

function collisionHandler(starship, rock) {
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
