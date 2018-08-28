var spaceship;
var speed = 40;
orionRescue.state1 = function() {};
orionRescue.state1.prototype = {
  preload: function() {
    game.load.image('spaceship', 'assets/spaceship.png');
    game.load.image('leftBtn', 'assets/lft-btn.png');
    game.load.image('rightBtn', 'assets/rgt-btn.png');
  },
  create: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.backgroundColor = '#060014';

    spaceship = game.add.sprite(game.world.centerX, gameHeight*0.8, 'spaceship');
    spaceship.anchor.setTo(0.5, 0.5);

    //var lftBtn = game.add.button(gameWidth * 0.2, gameHeight * 0.8, 'leftBtn', mov, this);
  },
  update: function() {
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      spaceship.x += speed;
    } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      spaceship.x -= speed;
    }
  }
};
