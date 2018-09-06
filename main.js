var gameRatio = window.innerWidth/window.innerHeight;
var gameWidth = 1536;
var gameHeight = 2048;//Math.ceil(1536*gameRatio);
//var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS);
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'home-screen', { preload: preload, create: create, update: update});

game.state.add('state0', orionRescue.state0);
game.state.add('state1', orionRescue.state1);
game.state.add('state2', orionRescue.state2);
game.state.start('state1');
