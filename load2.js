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
    game.load.image('diary', 'assets/UI/diarybtn.png');

    game.load.audio('maintheme', ['assets/audio/Main_Title_Theme.mp3', 'assets/audio/Main_Title_Theme.ogg']);
    game.load.audio('gameTheme', ['assets/audio/GameTheme.mp3', 'assets/audio/GameTheme.ogg']);
    game.load.audio('explosion', ['assets/audio/explosion.mp3', 'assets/audio/explosion.ogg']);
    game.load.audio('damage', ['assets/audio/damage.mp3', 'assets/audio/damage.ogg']);

    //Normastate
    game.load.image('textbox', 'assets/UI/textbox.png');
    game.load.image('normadisplay', 'assets/UI/normadisplay.png');
    game.load.image('normahappy1', 'assets/UI/normahappy1.png');
    game.load.image('normahappy2', 'assets/UI/normahappy2.png');
    game.load.image('normasad', 'assets/UI/normasad.png');
    game.load.image('normaangry', 'assets/UI/normaangry.png');
    game.load.image('normasurprised', 'assets/UI/normasurprised.png');
    game.load.image('earthboy', 'assets/UI/earthboy.png');
    game.load.image('earthgirl', 'assets/UI/earthgirl.png');
    game.load.image('yes', 'assets/UI/yes.png');
    game.load.image('no', 'assets/UI/no.png');
    game.load.audio('dialogue1', 'assets/audio/normastate/dialogue1.mp3');
    game.load.audio('dialogue2', 'assets/audio/normastate/dialogue2.mp3');
    game.load.audio('dialogue3', 'assets/audio/normastate/dialogue3.mp3');
    game.load.audio('dialogue4', 'assets/audio/normastate/dialogue4.mp3');
    game.load.audio('dialogue5', 'assets/audio/normastate/dialogue5.mp3');
    game.load.audio('dialogue6m', 'assets/audio/normastate/dialogue6m.mp3');
    game.load.audio('dialogue6f', 'assets/audio/normastate/dialogue6f.mp3');
    game.load.audio('dialogue7', 'assets/audio/normastate/dialogue7.mp3');
    game.load.audio('dialogue8', 'assets/audio/normastate/dialogue8.mp3');
    game.load.audio('dialogue9', 'assets/audio/normastate/dialogue9.mp3');


    // Game Loads --------------------------------------------------------------------
    game.load.image('heart', 'assets/heart.png');
    game.load.image('minusheart', 'assets/minusheart.png');

    game.load.image('orionarm', 'assets/orionarm.png');
    game.load.audio('cuidado1', 'assets/audio/state1/cuidado1.mp3');
    game.load.audio('cuidado2', 'assets/audio/state1/cuidado2.mp3');
    game.load.audio('cuidado3', 'assets/audio/state1/cuidado3.mp3');
    game.load.audio('gamestart1', 'assets/audio/state1/gamestart1.mp3');
    game.load.audio('gamestart2', 'assets/audio/state1/gamestart2.mp3');
    game.load.audio('isso', 'assets/audio/state1/isso.mp3');
    game.load.audio('orionarm', 'assets/audio/state1/orionarm.mp3');
    game.load.audio('victory', 'assets/audio/state1/victory.mp3');


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
    game.load.spritesheet('spaceship', 'assets/spritesheets/spaceship_damage.png', 120, 160);

    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.28/webfont.js');

    // Diary --------------------------------------------------------------------
    game.load.image('diaryBG', 'assets/UI/diary/diaryBG.png');
    game.load.image('diary1', 'assets/UI/diary/diary1.png');
    game.load.image('diary2', 'assets/UI/diary/diary2.png');
    game.load.image('diary3', 'assets/UI/diary/diary3.png');
    game.load.image('diary4', 'assets/UI/diary/diary4.png');
    game.load.image('diary5', 'assets/UI/diary/diary5.png');
    game.load.image('diary6', 'assets/UI/diary/diary6.png');
    game.load.image('diary7', 'assets/UI/diary/diary7.png');
    game.load.image('diary8', 'assets/UI/diary/diary8.png');
    game.load.image('outBtn', 'assets/UI/diary/diaryOutBtn.png');

  },

  create: function() {
    game.state.start('mainmenu');
  },

  update: function() {}
};
