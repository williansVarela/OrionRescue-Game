var spaceship;
var rocks;
var lftBtn;
var rgtBtn;
var speed = 3000;
var rockTimer = 0;
var fallPttrns = [
  [[0, 0, 1], [0, 0, 1], [0, 0, 1]],
  [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
  [[1, 0, 0], [1, 0, 0], [1, 0, 0]],
  [[1, 0, 1], [1, 0, 1], [1, 0, 1]],
  [[1, 0, 1], [0, 0, 0], [0, 1, 0]]
];

orionRescue.state1 = function() {};
orionRescue.state1.prototype = {
  preload: function() {
    game.load.image('spaceship', 'assets/spaceship.png');
    game.load.image('rock1', 'assets/rock1.png');
    game.load.image('rock2', 'assets/rock2.png');
    game.load.image('rock3', 'assets/rock3.png');
    game.load.image('leftBtn', 'assets/lft-btn.png');
    game.load.image('rightBtn', 'assets/rgt-btn.png');
  },
/*-----------------------------------------------------------*/
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.backgroundColor = '#060014';

    spaceship = game.add.sprite(game.world.centerX, gameHeight*0.8, 'spaceship');
    spaceship.anchor.setTo(0.5, 0.5);
    game.physics.enable(spaceship, Phaser.Physics.ARCADE);
    spaceship.body.drag.x = 4500;
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
  },
/*-----------------------------------------------------------*/
  update: function() {
    lftBtn.onInputOver.add(this.movLeft, lftBtn);
    rgtBtn.onInputOver.add(this.movRight, rgtBtn);

    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      spaceship.body.acceleration.x = speed;
    } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      spaceship.body.acceleration.x = -speed;
    } else {
      spaceship.body.acceleration.x = 0;
    }

    if(spaceship.alive) {
      game.physics.arcade.overlap(spaceship, rocks, collisionHandler, null, this);

      if(game.time.now > rockTimer) {
        rockShower();
      }
    }
  },

  movLeft: function() {
    spaceship.x -= speed;
  },

  movRight: function() {
    spaceship.x += speed;
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

function rockShower() {
  rock = rocks.getRandom();
  while(rock.alive) {
    rock = rocks.getRandom();
  }
  if(spaceship.alive) {
    var xPos = ((Math.random() * (gameWidth - rock.width/2)) + rock.width/2);
    rock.reset(xPos, 0);
    game.physics.arcade.moveToXY(rock, xPos, gameHeight * 1.2, 500);
    rockTimer = game.time.now + 1000;
  }
}


function arrToPosArr(loc) {
  var posArr = fallPttrns[loc];
  var x;
  for(var i = 0; i < fallPttrns[loc].length; i++) {
    for(var j = 0; j < fallPttrns[loc][i].length; j++) {
      if(fallPttrns[loc][i][j] == 1) {
        x = gameWidth*(0.166667 + j*2*0.166667);
        fallPttrns[loc][i][j] = x;
      }
    }
  }
  return posArr;
}
