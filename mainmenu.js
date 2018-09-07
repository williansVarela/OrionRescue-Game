var stars1;
var stars2;
var cloud1;
var cloud2;
var cloud3;

var hextriade1;
var hextriade2;
var hextriade3;
var button;
var btnhitbox;

orionRescue.mainmenu = function() {};
orionRescue.mainmenu.prototype = {
  preload: function() {},
  create: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'BG');
    stars1 = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'stars1');
    stars2 = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'stars2');
    stars1.alpha = 0.6;
    game.add.tween(stars1).to( { alpha: 1 }, 800, "Linear", true, 0, Number.MAX_VALUE, true);
    stars2.alpha = 0.3;
    game.add.tween(stars2).to( { alpha: 0.8 }, 800, "Linear", true, 0, Number.MAX_VALUE, true);

    cloud1 = game.add.tileSprite(0, gameHeight*0.8, gameWidth, gameHeight, 'cloud1');
    cloud2 = game.add.tileSprite(0, gameHeight*0.85, gameWidth, gameHeight, 'cloud2');
    cloud3 = game.add.tileSprite(0, gameHeight*0.85, gameWidth, gameHeight, 'cloud3');


    hextriade1 = game.add.tileSprite(game.world.centerX, game.world.centerY, gameWidth, gameHeight, 'hextriade1');
    hextriade2 = game.add.tileSprite(game.world.centerX, game.world.centerY, gameWidth, gameHeight, 'hextriade2');
    hextriade3 = game.add.tileSprite(game.world.centerX, game.world.centerY, gameWidth, gameHeight, 'hextriade3');
    hextriade1.anchor.setTo(0.5);
    hextriade2.anchor.setTo(0.5);
    hextriade3.anchor.setTo(0.5);


    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'staticengine');

    button = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'button');
    game.add.tween(button).to( { alpha: 0.8 }, 500, "Linear", true, 0, Number.MAX_VALUE, true);

    var logo = game.add.sprite(game.world.centerX, game.world.height*0.125, 'logo');
    logo.anchor.setTo(0.5);
    game.add.tween(logo).to( { alpha: 0.9 }, 2500, "Linear", true, 0, Number.MAX_VALUE, true);

    btnhitbox = game.add.button(game.world.centerX, game.world.centerY, 'btn', stateChange);
    btnhitbox.anchor.setTo(0.5, 0.5);
    btnhitbox.scale.set(1.7);
    btnhitbox.alpha = 0;

    var manualbtn = game.add.button(gameWidth*0.87, gameHeight*0.91, 'manual', stateChange);
    manualbtn.anchor.setTo(0.5, 0.5);

  },
  update: function() {
    cloud1.tilePosition.x += .5;
    cloud2.tilePosition.x -= .3;
    cloud3.tilePosition.x += .4;

    stars1.tilePosition.y += .1;
    stars2.tilePosition.y += .1;


    hextriade1.angle += .3;
    hextriade2.angle += .3;
    hextriade3.angle += -.1;
  }
};

function stateChange() {
  game.state.start('state1');
}
