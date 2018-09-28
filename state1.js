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

var music;
var explosionSound;
var damageSound;

var spaceship;
var fire;
var speed = 3500;
var hearts;

var rocks;
var rocksScale = 1.5;
var rocksInterval = 2000;

var lftBtn;
var lftBtnPressed = false;
var rgtBtn;
var rgtBtnPressed = false;

var rockTimer = 0;
var fallPttrns;
var fallSpeed = 1000;

var earthIcon;
var disBarPct = 100;

var clockGame = 0;

var plntSpeed = 2;

var grd;

var starRain;

var winSprite;
var controlShip = true; // True is on and False is off
var gameWin = false;
var earthSent = false;

var orionArm = {
  beenSent: false,
  beenPicked: false
}

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

    //Game audios
    music = game.add.audio('gameTheme');
    music.volume = 0.3;
    music.play();
    explosionSound = game.add.audio('explosion');
    explosionSound.loop = false;
    damageSound = game.add.audio('damage');
    damageSound.loop = false;

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
    fire.body.maxVelocity.x = 2500; //Set max velocity for spaceship
    fire.body.collideWorldBounds = true;
    fire.anchor.setTo(0.5, 0);
    fire.scale.setTo(0.31578947368421052631578947368421);
    fire.animations.add('flying', [0, 1, 2, 3, 4, 5, 6, 7]);
    fire.animations.play('flying', 24, true);

    spaceship = game.add.sprite(game.world.centerX, gameHeight*0.8, 'spaceship');
    game.physics.enable(spaceship, Phaser.Physics.ARCADE);
    spaceship.body.drag.x = 5500;
    spaceship.body.maxVelocity.x = 2500; //Set max velocity for spaceship
    spaceship.anchor.setTo(0.5, 0.5);
    spaceship.animations.add('shipDamage', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
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

    //Lives system
    hearts = game.add.group();
		hearts.create(gameWidth * 0.05, gameWidth * 0.05, 'heart').anchor.set(0.4);
    hearts.create(gameWidth * 0.15, gameWidth * 0.05, 'heart').anchor.set(0.4);
    hearts.create(gameWidth * 0.25, gameWidth * 0.05, 'heart').anchor.set(0.4);


    fadeAwayScreen('start');
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
    if(controlShip){
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

      // Orion Arm --------------------------------------------------------------------
      if(disBarPct <= 50) {
        if(orionArm.beenSent == false) {
          sendOrionArm();
        } else{
          game.physics.arcade.overlap(spaceship, orionArm.sprite, armPickUp, null);
        }
      }

      // RockShower Call --------------------------------------------------------------------
      if(game.time.now > rockTimer && !gameWin) {
        fallPttrns = [randRange(100, 300), randRange(400, 600), randRange(700, 900)]
        var pos = Math.floor(Math.random() * fallPttrns.length);
        rockShower(pos);
      }

      // Victory Checkup --------------------------------------------------------------------
      if(disBarPct <= 0) {
        gameWin = true;

        if(!rock.alive){
          controlShip = false; //Turn off spaceship controls
          spaceship.body.acceleration.x = 0;
          fire.body.acceleration.x = 0;
          starRain.on = false;
          spaceship.position.x = Math.round(spaceship.position.x);
          fire.position.x = Math.round(fire.position.x);
          music.fadeOut(2000); //Turn off music

          repositionShip();
        };

        if(gameWin && !earthSent && spaceship.position.x == game.world.centerX) {
          callEarth();

          setTimeout(function() {
            earth.pause();
            fadeAwayScreen('end');
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
      disBarPct -= 1/(1000/fallSpeed);
      this.distanceBar.setPercent(disBarPct);
      clockGame++;
    }
  },

  every5Seconds: function() {
    fallSpeed += 25;

    if(rocksScale < 3) {
      rocksScale += 0.05;
    };
    if(rocksInterval > 1500){
      rocksInterval -= 50;
    };

    giantAsteroids();

  }

}; //End of orionRescue.state1.prototype

function sendOrionArm() {
  // Cria o braço do orion, torna ele ARCADE, e faz ele cair.
  orionArm.beenSent = true;
  orionArm.sprite = game.add.sprite(game.world.centerX * .5, 0, 'orionarm');
  orionArm.sprite.scale.setTo(0.25);
  orionArm.sprite.anchor.setTo(0.5, 0.5);
  game.add.tween(orionArm.sprite).to( { x: game.world.centerX * 1.5}, 4000, "Linear", true, 0, Number.MAX_VALUE, true);
  game.physics.enable(orionArm.sprite, Phaser.Physics.ARCADE);
  game.physics.arcade.moveToXY(orionArm.sprite, game.world.centerX, game.height * 1.2, fallSpeed/6);
}

function armPickUp(starship, arm) {
  /* Chamado quando há a colisão entre nave e braço */
  arm.kill();
  orionArm.beenPicked = true;
};

function btnSA(element, size) {
  /* Set element position on screen
  Args:
    element: sprite image
    size: size of the element
  */
  element.anchor.setTo(size, size);
  element.scale.setTo(0.35);
};

function collisionHandler(starship, rock) {
  /*Detect collision between spaceship and asteroids
  If it colloids then destroy spaceship and call Game Over */
  rock.kill();
  damageSound.play();
  spaceship.animations.play('shipDamage', 120, false);
  hearts.getTop().destroy();
  heartLostAnimation();
  if(!gameWin && hearts.length == 0) {
    explosionSound.play();
    explosionShip();
    gameOver();
  };
}

function rockShower(pos) {
  //Call random asteroids on screen

  rock = rocks.getRandom();

  while(rock.alive) {
    rock = rocks.getRandom();
  };

  if(spaceship.alive) {
    var xPos = fallPttrns[pos] * gameWidth;
    rock.reset(xPos, 0);
    rock.scale.setTo(rocksScale);
    game.physics.arcade.moveToXY(rock, xPos, gameHeight * 1.2, fallSpeed);
    rockTimer = game.time.now + rocksInterval;
  };
};

function heartLostAnimation() {
  // Chamda quando há colisão entre spaceship e asteroide
  var heartX;  // Posição x do efeito.
  var flip = false; // Caso seja true, inverte a imagem do coração horzontalmente

  // Configurando posição x do efeito
  if(spaceship.x <= game.world.centerX) {
    heartX = spaceship.x + spaceship.width*1.5;
  } else {
    heartX = spaceship.x - spaceship.width*1.5;
    flip = true;
  }

  // Criação da imagem
  var minusheart = game.add.sprite(heartX, spaceship.y, 'minusheart');
  minusheart.anchor.setTo(0.5, 0.5);
  minusheart.scale.setTo(0.6);
  if(flip) {
    minusheart.scale.x *= -1;
  }

  // Tween que ao ser completado, exclui o sprite do coração.
  var heartEffect = game.add.tween(minusheart).to({ y: spaceship.y - 200, alpha: 0}, 1000, "Linear", true).onComplete.add(function() {minusheart.kill();});

}

function randRange(min, max) {
  /*
  Returns a random number between a range.
  Args:
    min: minimum value of range
    max: maximum value of range
  */

  return (Math.floor(Math.random() * (max - min + 1) ) + min)/1000;
};

function resetGame() {
  //Reset variables and restart game

  disBarPct = 100;
  clockGame = 0;
  fallSpeed = 1000;
  rocksScale = 1.5;
  rocksInterval = 2000;
  spaceship.position.x == game.world.centerX
  gameWin = false;
  earthSent = false;
  starRain.on = true;
  controlShip = true;
  music.mute = true;
  game.state.restart();
};

function gameOverText() {
  //Create and call a Game Over text on screen

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
};

function gameOver() {
  /*
  Creates the Game Over screen, killing spaceship, asteroids, showing Game Over text on screen
  and restarting the game
  */

  //Call game over text
  gameOverText()

  // Kill Units  --------------------------------------------------------------------
  spaceship.kill();
  fire.kill();

  //Reset and restart game
  setTimeout(function() {
    resetGame();
    game.state.start('state1');
  }, 3000);
};

function explosionShip() {
  //Creates an animated explosion when spaceship collides with an object

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
};

function giantAsteroids() {
  //Call some giant asteroids/candies on screen during the game. Returns nothing.

  if(clockGame == 20){
    rocksScale = 3;
    setTimeout(function() {rocksScale = 1.8}, 3000);
  };
  if(clockGame == 40){
    rocksScale = 3.5;
    setTimeout(function() {rocksScale = 2}, 3000);
  };
  if(clockGame == 60){
    rocksScale = 3.5;
    setTimeout(function() {rocksScale = 2.5}, 2000);
  };
};

function fadeAwayScreen(condition) {
  //Call a black screen that fade aways in several seconds

  if(condition == 'start'){
    var fadeawaystart = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'fadeaway');
    fadeawaystart.alpha = 1;
    game.add.tween(fadeawaystart).to( { alpha: 0 }, 3000, "Linear", true);
  } else if(condition == 'end') {
    var fadeawayEnd = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'fadeaway');
    fadeawayEnd.alpha = 0;
    fadeaway = game.add.tween(fadeawayEnd).to( { alpha: 1 }, 7000, "Linear", true);
  }
};

function callEarth() {
  //Call earth sprite on screen

  earthSent = true;
  winSprite = game.add.sprite(game.world.centerX, 0, 'earthWin');
  winSprite.anchor.setTo(0.5, 1);
  winSprite.scale.setTo(4);
  earth = game.add.tween(winSprite).to({ y: gameHeight + winSprite.height }, 15500, "Linear", true);
};

function repositionShip() {
  //Check and reposition spaceship in center of screen

  if(spaceship.position.x > game.world.centerX) {
    spaceship.position.x--;
    fire.position.x--;
  } else {
    spaceship.position.x++;
    fire.position.x++;
  }
};
