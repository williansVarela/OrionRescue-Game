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

    game.load.audio('maintheme', ['assets/audio/Main_Title_Theme.mp3', 'assets/audio/Main_Title_Theme.ogg']);

    //Normastate
    game.load.image('textbox', 'assets/UI/textbox.png');
    game.load.image('normadisplay', 'assets/UI/normadisplay.png');
    game.load.image('normahappy1', 'assets/UI/normahappy1.png');
    game.load.image('normahappy2', 'assets/UI/normahappy2.png');
    game.load.image('normasad', 'assets/UI/normasad.png');
    game.load.image('normaangry', 'assets/UI/normaangry.png');
    game.load.image('normasurprised', 'assets/UI/normasurprised.png');

    // Game Loads --------------------------------------------------------------------
    game.load.image('spaceship', 'assets/spaceship.png');

    game.load.image('leftBtn', 'assets/lft-btn.png');
    game.load.image('rightBtn', 'assets/rgt-btn.png');
    game.load.image('starryBG', 'assets/starry_sky0.png');
    game.load.image('planetBG', 'assets/planet_sky1.png');
    game.load.image('bgGradient', 'assets/bg_gradient.png');
    game.load.image('earthIcon', 'assets/earth_.png');
    game.load.image('earthWin', 'assets/terra.png');

    game.load.image('bala_amarela', 'assets/asteroids/bala_amarela.png');
    game.load.image('bala_verde', 'assets/asteroids/bala_verde.png');
    game.load.image('bala_vermelha', 'assets/asteroids/bala_vermelha.png');
    game.load.image('bolo', 'assets/asteroids/bolo.png');
    game.load.image('chocolate', 'assets/asteroids/chocolate.png');
    game.load.image('gummy_bear_amarelo', 'assets/asteroids/gummy_bear_amarelo.png');
    game.load.image('gummy_bear_azul', 'assets/asteroids/gummy_bear_azul.png');
    game.load.image('gummy_bear_verde', 'assets/asteroids/gummy_bear_verde.png');
    game.load.image('gummy_bear_vermelho', 'assets/asteroids/gummy_bear_vermelho.png');
    game.load.image('marshmallow_azul', 'assets/asteroids/marshmallow_azul.png');
    game.load.image('marshmallow_rosa', 'assets/asteroids/marshmallow_rosa.png');
    game.load.image('pudim_rosa', 'assets/asteroids/pudim_rosa.png');
    game.load.image('pudim_verde', 'assets/asteroids/pudim_verde.png');

    game.load.image('darkbg', 'assets/gameBG/darkbg.png');
    game.load.image('gradientbg', 'assets/gameBG/gradientbg.png');
    game.load.image('closerstars', 'assets/gameBG/closerstars.png');
    game.load.image('furtherstars', 'assets/gameBG/furtherstars.png');
    game.load.image('fadeaway', 'assets/gameBG/fadeawayBg.png');

    game.load.spritesheet('rain', 'assets/spritesheets/rain.png', 20, 700);
    game.load.spritesheet('blast', 'assets/spritesheets/explosion.png', 256, 256);
    game.load.spritesheet('blackblast', 'assets/spritesheets/blackexplosion.png', 128, 128);
    game.load.spritesheet('fire', 'assets/spritesheets/fire.png', 380, 355);

    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.28/webfont.js');

  },

  create: function() {
    game.state.start('mainmenu');
  },
  
  update: function() {}
};
