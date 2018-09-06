

orionRescue.mainmenu = function() {};
orionRescue.mainmenu.prototype = {
  preload: function() {
    game.load.image('mainmenu', 'assets/UI/mainmenu.png');
  },
  create: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'mainmenu');
  },
  update: function() {}
};
