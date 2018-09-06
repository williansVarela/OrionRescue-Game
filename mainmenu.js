var orionRescue = {};

var stars1;
var stars2;
var hextriade1;
var hextriade2;
var hextriade3;
var button;

orionRescue.mainmenu = function() {};
orionRescue.mainmenu.prototype = {
  preload: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('BG', 'assets/UI/BG.png');
    game.load.image('stars1', 'assets/UI/stars1.png');
    game.load.image('stars2', 'assets/UI/stars2.png');
    game.load.image('hextriade1', 'assets/UI/hextriade1.png');
    game.load.image('hextriade2', 'assets/UI/hextriade2.png');
    game.load.image('hextriade3', 'assets/UI/hextriade3.png');
    game.load.image('staticengine', 'assets/UI/staticengine.png');
    game.load.image('button', 'assets/UI/button.png');
  },
  create: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'BG');
    stars1 = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'stars1');
    stars2 = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'stars2');
    stars1.alpha = 0.6;
    game.add.tween(stars1).to( { alpha: 1 }, 800, "Linear", true, 0, Number.MAX_VALUE, true);
    stars2.alpha = 0.3;
    game.add.tween(stars2).to( { alpha: 0.8 }, 800, "Linear", true, 0, Number.MAX_VALUE, true);


    hextriade1 = game.add.tileSprite(game.world.centerX, game.world.centerY, gameWidth, gameHeight, 'hextriade1');
    hextriade2 = game.add.tileSprite(game.world.centerX, game.world.centerY, gameWidth, gameHeight, 'hextriade2');
    hextriade3 = game.add.tileSprite(game.world.centerX, game.world.centerY, gameWidth, gameHeight, 'hextriade3');
    hextriade1.anchor.setTo(0.5);
    hextriade2.anchor.setTo(0.5);
    hextriade3.anchor.setTo(0.5);


    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'staticengine');

    button = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'button');
    game.add.tween(button).to( { alpha: 0.8 }, 500, "Linear", true, 0, Number.MAX_VALUE, true);
  },
  update: function() {
    stars1.tilePosition.y += .1;
    stars2.tilePosition.y += .1;


    hextriade1.angle += .3;
    hextriade2.angle += .3;
    hextriade3.angle += -.1;
  }
};
