var orionRescue = {};

orionRescue.load = function() {};
orionRescue.load.prototype = {
  preload: function() {
    // Main Menu Loads --------------------------------------------------------------------
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('BG', 'assets/UI/BG.png');
    game.load.image('stars1', 'assets/UI/stars1.png');
    game.load.image('stars2', 'assets/UI/stars2.png');
    game.load.image('cloud1', 'assets/UI/cloud_1.png');
    game.load.image('cloud2', 'assets/UI/cloud_2.png');
    game.load.image('cloud3', 'assets/UI/cloud_3.png');
    game.load.image('hextriade1', 'assets/UI/hextriade1.png');
    game.load.image('hextriade2', 'assets/UI/hextriade2.png');
    game.load.image('hextriade3', 'assets/UI/hextriade3.png');
    game.load.image('staticengine', 'assets/UI/staticengine.png');
    game.load.image('button', 'assets/UI/button.png');
    game.load.image('btn', 'assets/UI/btn.png');
    game.load.image('logo', 'assets/UI/gamelogo.png');
    game.load.image('manual', 'assets/UI/manualbtn.png');

    //Normastate
    game.load.image('textbox', 'assets/UI/textbox.png');
    game.load.image('normadisplay', 'assets/UI/normadisplay.png');
    game.load.image('normahappy1', 'assets/UI/normahappy1.png');
    game.load.image('normahappy2', 'assets/UI/normahappy2.png');
    game.load.image('normasad', 'assets/UI/normasad.png');
    game.load.image('normaangry', 'assets/UI/normaangry.png');
    game.load.image('normasurprised', 'assets/UI/normasurprised.png');

    // Game Loads --------------------------------------------------------------------
    //game.load.image('spaceship', 'assets/spaceship.png');
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
    game.load.image('starryBG', 'assets/starry_sky0.png');
    game.load.image('planetBG', 'assets/planet_sky1.png');
    game.load.image('bgGradient', 'assets/bg_gradient.png');
    game.load.image('earthIcon', 'assets/earth_.png');
    game.load.image('earthWin', 'assets/terra.png');

    game.load.image('darkbg', 'assets/gameBG/darkbg.png');
    game.load.image('gradientbg', 'assets/gameBG/gradientbg.png');
    game.load.image('closerstars', 'assets/gameBG/closerstars.png');
    game.load.image('furtherstars', 'assets/gameBG/furtherstars.png');

    game.load.spritesheet('rain', 'assets/spritesheets/rain.png', 20, 700);
    game.load.spritesheet('blast', 'assets/spritesheets/explosion.png', 256, 256);
    game.load.spritesheet('blackblast', 'assets/spritesheets/blackexplosion.png', 128, 128);
    game.load.spritesheet('spaceship', 'assets/spritesheets/spaceship.png', 128, 325);

    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.28/webfont.js');





  },
  create: function() {
    game.state.start('mainmenu');
  },
  update: function() {}
};
