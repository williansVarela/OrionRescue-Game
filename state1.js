var bgColor = '#060014';

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


orionRescue.state1 = function() {};
orionRescue.state1.prototype = {
  preload: function() {
    game.load.image('spaceship', 'assets/spaceship.png');
    game.load.image('rock1', 'assets/rock1.png');
    game.load.image('rock2', 'assets/rock2.png');
    game.load.image('rock3', 'assets/rock3.png');
    game.load.image('leftBtn', 'assets/lft-btn.png');
    game.load.image('rightBtn', 'assets/rgt-btn.png');
    game.load.spritesheet('rain', 'assets/rain.png', 20, 700);

    //Load physics data to use in P2 physics
    game.load.physics('physicsData', 'assets/physics/sprites.json');
  },
/*-----------------------------------------------------------*/
  create: function() {
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

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.backgroundColor = bgColor;

    spaceship = game.add.sprite(game.world.centerX, gameHeight*0.8, 'spaceship');
    spaceship.anchor.setTo(0.5, 0.5);
    game.physics.enable(spaceship, Phaser.Physics.ARCADE);
    spaceship.body.drag.x = 5500;
    spaceship.body.collideWorldBounds = true;

    rocks = game.add.group();
    rocks.enableBody = true;
    rocks.physicsBodyType = Phaser.Physics.ARCADE;
    rocks.createMultiple(30, ['rock1', 'rock2', 'rock3']);
    rocks.setAll('anchor.x', 0.5);
    rocks.setAll('anchor.y', 1);
    rocks.setAll('outOfBoundsKill', true);
    rocks.setAll('checkWorldBounds', true);

    rgtBtn = game.add.button(gameWidth * 0.9, gameHeight * 0.9, 'rightBtn');
    lftBtn = game.add.button(gameWidth * 0.1, gameHeight * 0.9, 'leftBtn');
    btnSA(rgtBtn, 0.5);
    btnSA(lftBtn, 0.5);
    lftBtn.onInputDown.add(this.movLeft, lftBtn);
    lftBtn.onInputUp.add(this.stopLeft, lftBtn);
    rgtBtn.onInputDown.add(this.movRight, rgtBtn);
    rgtBtn.onInputUp.add(this.stopRight, rgtBtn);

    var barConfig =
    {
      x: game.world.centerX,
      y: gameHeight*0.97,
      width: gameWidth*0.6,
      height: gameHeight*0.015,
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
  },
/*-----------------------------------------------------------*/
  update: function() {

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

    if(disBarPct == -1) {
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
    disBarPct -= 1;
    this.distanceBar.setPercent(disBarPct);
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
