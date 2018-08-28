var game = new Phaser.Game(600, 400, Phaser.AUTO);
game.state.add('state1', orionRescue.state1);
game.state.start('state1');
