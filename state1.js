var bgColor = '#060014';

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
var lftBtn;
var lftBtnPressed = false;
var rgtBtn;
var rgtBtnPressed = false;
var speed = 3000;
var rockTimer = 0;
var fallPttrns = [0.166667, 0.5, 0.833334];
var fallSpeed = 800;

var disBarPct = 100;

var graphics;
var score = 0;
var scoretext;



orionRescue.state1 = function() {};
orionRescue.state1.prototype = {
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
    game.load.image('background', 'assets/background.jpg');
    game.load.image('earth', 'assets/earth.png');
    game.load.spritesheet('rain', 'assets/rain.png', 20, 700);

  },
/*-----------------------------------------------------------*/
  create: function() {

    /*game.add.tileSprite(0, 0, game.width, game.height, 'background');*/
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.backgroundColor = bgColor;

    //Speed effect on screen
    var emitter = game.add.emitter(game.world.centerX, 0, 100);

    emitter.width = game.world.width;
    // emitter.angle = 30; // uncomment to set an angle for the rain.

    emitter.makeParticles('rain');

    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.4;

    emitter.setYSpeed(3000, 5000);
    emitter.setXSpeed(-5, 5);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.start(false, 1600, 30, 0);
    //End speed effect

    bgrock1 = game.add.sprite(gameWidth*0.05, gameHeight*0.08, 'bgrock1');
    bgrock2 = game.add.sprite(gameWidth*0.85, gameHeight*0.6, 'bgrock2');
    bgrock3 = game.add.sprite(gameWidth*0.05, gameHeight*0.45, 'bgrock3');
    bgrock4 = game.add.sprite(gameWidth*0.8, gameHeight*0.5, 'bgrock4');
    bgrock5 = game.add.sprite(gameWidth*0.8, gameHeight*0.1, 'bgrock5');
    bgrock6 = game.add.sprite(gameWidth*0.4, gameHeight*0.35, 'bgrock6');
    bgrock7 = game.add.sprite(gameWidth*0.2, gameHeight*0.4, 'bgrock7');
    bgrock8 = game.add.sprite(gameWidth*0.9, gameHeight*0.4, 'bgrock8');

    bgrock1.width = gameWidth*0.4;
    bgrock1.height = gameWidth*0.4;

    bgrock2.width = gameWidth*0.3;
    bgrock2.height = gameWidth*0.3;

    bgrock3.width = gameWidth*0.08;
    bgrock3.height = gameWidth*0.08;

    bgrock4.width = gameWidth*0.14;
    bgrock4.height = gameWidth*0.14;

    bgrock5.width = gameWidth*0.08;
    bgrock5.height = gameWidth*0.08;

    bgrock6.width = gameWidth*0.11;
    bgrock6.height = gameWidth*0.11;

    bgrock7.width = gameWidth*0.09;
    bgrock7.height = gameWidth*0.09;

    bgrock8.width = gameWidth*0.09;
    bgrock8.height = gameWidth*0.09;

    var multiplier = 1.5;

    //game.add.tween().to(properties, duration, ease, autoStart, delay, repeat, yoyo)
    game.add.tween(bgrock1).to({x: bgrock1.x - gameWidth*0.02, y: bgrock1.y + gameHeight*0.05}, 7000*multiplier, 'Sine.easeInOut', true, 0, false, true).yoyo(true);
    game.add.tween(bgrock2).to({x: bgrock2.x + gameWidth*0.02, y: bgrock2.y + gameHeight*0.06}, 12000*multiplier, 'Sine.easeInOut', true, 0, false, true).yoyo(true);
    game.add.tween(bgrock3).to({y: bgrock3.y + gameHeight*0.02}, 3000*multiplier, 'Sine.easeInOut', true, 0, false, true).yoyo(true);
    game.add.tween(bgrock4).to({y: bgrock4.y + gameHeight*0.045}, 6000*multiplier, 'Sine.easeInOut', true, 0, false, true).yoyo(true);
    game.add.tween(bgrock5).to({y: bgrock5.y + gameHeight*0.05}, 7000*multiplier, 'Sine.easeInOut', true, 0, false, true).yoyo(true);
    game.add.tween(bgrock6).to({y: bgrock6.y + gameHeight*0.01}, 3000*multiplier, 'Sine.easeInOut', true, 0, false, true).yoyo(true);
    game.add.tween(bgrock7).to({y: bgrock7.y + gameHeight*0.03}, 7500*multiplier, 'Sine.easeInOut', true, 0, false, true).yoyo(true);
    game.add.tween(bgrock8).to({y: bgrock8.y + gameHeight*0.02}, 4000*multiplier, 'Sine.easeInOut', true, 0, false, true).yoyo(true);





    spaceship = game.add.sprite(game.world.centerX, gameHeight*0.8, 'spaceship');
    spaceship.anchor.setTo(0.5, 0.5);
    game.physics.enable(spaceship, Phaser.Physics.ARCADE);
    spaceship.body.drag.x = 5500;
    spaceship.body.maxVelocity.x = 2000; //Set max velocity for spaceship
    spaceship.body.collideWorldBounds = true;

    rocks = game.add.group();
    rocks.enableBody = true;
    rocks.physicsBodyType = Phaser.Physics.ARCADE;
    rocks.createMultiple(30, ['rock1', 'rock2']);
    rocks.setAll('anchor.x', 0.5);
    rocks.setAll('anchor.y', 1);
    rocks.setAll('outOfBoundsKill', true);
    rocks.setAll('checkWorldBounds', true);


    var textStyle =
    {
      font: '30pt Arial',
      fill: 'white',
      boundsAlignH: 'center',
      boundsAlignV: 'middle'
    }

    scoretext = game.add.text(gameWidth*0.02, gameWidth*0.02, '', textStyle);
    scoretext.text = score + ' pts';

    var barConfig =
    {
      x: game.world.centerX,
      y: gameHeight*0.975,
      width: gameWidth*0.5,
      height: gameHeight*0.0125,
      bg: {
      color: '#55DAA4'
      },
      bar: {
        color: '#0C4B45'
      },
      animationDuration: 1000,
      flipped: true
    };

    this.distanceBar = new HealthBar(this.game, barConfig);
    game.time.events.loop(Phaser.Timer.SECOND, this.updateBar, this);
    game.time.events.loop(Phaser.Timer.SECOND*5, this.updateFallSpeed, this);

    var earth = game.add.sprite(game.world.centerX + barConfig.width/2, barConfig.y, 'earth');
    earth.anchor.setTo(0.5, 0.5);
    earth.width = gameWidth*0.05;
    earth.height = gameWidth*0.05;

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

    scoretext.text = score + ' pts';


    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || rgtBtnPressed == true) {
      spaceship.body.acceleration.x = speed;
    } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || lftBtnPressed == true) {
      spaceship.body.acceleration.x = -speed;
    } else if(rgtBtnPressed == false && lftBtnPressed == false) {
      spaceship.body.acceleration.x = 0;
    }

    if(spaceship.alive) {
      game.physics.arcade.overlap(spaceship, rocks, collisionHandler, null, this);

      if(game.time.now > rockTimer) {
        var pos = Math.floor(Math.random() * 4);
        rockShower(pos);
      }
    }

    if(disBarPct < 0) {
      //VITÓRIA OU FASE 2
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

  updateBar: function() {
    disBarPct -= 1/(800/fallSpeed);
    this.distanceBar.setPercent(disBarPct);
    score++;
  },

  updateFallSpeed: function() {
    fallSpeed += 35;
  }

};

function btnSA(btn, size) {
  btn.anchor.setTo(0.5, 0.5);
  btn.scale.setTo(0.35);
};

function collisionHandler(starship, rock) {
  starship.kill();
  rock.kill();
}

function rockShower(pos) {
  rock = rocks.getRandom();
  while(rock.alive) {
    rock = rocks.getRandom();
  }
  if(spaceship.alive) {
    var xPos = fallPttrns[pos] * gameWidth;
    rock.reset(xPos, 0);
    game.physics.arcade.moveToXY(rock, xPos, gameHeight * 1.2, fallSpeed);
    rockTimer = game.time.now + 1000;
  }
}
