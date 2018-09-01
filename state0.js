var orionRescue = {};


function preload() {
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 386, 142);
}

var button;

//  Path data table
var tab = [ 0, 0, -4, 25, 250, 2, 1, -4, 25, 100, 3, 1, -2, 25, 100, 4, 2, 2, 25, 100, -4, 2, 2, 10, 100, 0, 0, -2, 25, 250, 0, 2, 0, 25, 200, 0, 2, 2, 25, 100, 0, 0, 2, 25, 100, 2, 0, 2, 25, 200, 0, 2, 2, 25, 200, 2, 0, 2, 25, 200, 0, 4, 2, 25, 200 ];

var ppDist = 800;
var speedx = 0;
var speedy = 0;
var speedz = 0;
var speedx2 = 0;
var speedy2 = 0;
var speedz2 = 0;
var max = 164;
var balls = [];
var xx = [];
var yy = [];
var zz = [];
var bx = 0;
var tabb = 0;
var del = tab[tabb + 4];
var delx = tab[tabb + 3];
var spx = 1;
var spy = 1;
var spz = 1;

function create() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  button = game.add.button(game.world.centerX - 190, gameHeight*0.8, 'button', actionOnClick, this, 2, 1, 0);
  button.onInputOver.add(over, this);
  button.onInputOut.add(out, this);
  button.onInputUp.add(up, this);

  if (game.renderType === Phaser.WEBGL)
  {
      max = 2000;
  }

  var sprites = game.add.spriteBatch();

  balls = [];

  for (var i = 0; i < max; i++)
  {
      xx[i] = Math.floor(Math.random() * 1600) - 800;
      yy[i] = Math.floor(Math.random() * 1200) - 600;
      zz[i] = Math.floor(Math.random() * 1600) - 800;

      var star = game.make.sprite(0, 0, 'star');
      star.anchor.set(0.5);

      sprites.addChild(star);

      balls.push(star);
  }

  speedx = tab[tabb + 0];
  speedy = tab[tabb + 1];
  speedz = tab[tabb + 2];

}

function update() {

  delx--;

  if (delx === 0)
  {
      if (speedz > speedz2)
      {
          speedz2++;
      }

      if (speedz < speedz2)
      {
          speedz2--;
      }

      if (speedx > speedx2)
      {
          speedx2++;
      }

      if (speedx < speedx2)
      {
          speedx2--;
      }

      if (speedy > speedy2)
      {
          speedy2++;
      }

      if (speedy < speedy2)
      {
          speedy2--;
      }
      
      delx = tab[tabb + 3];
  }

  del--;

  if (del === 0)
  {
      tabb += 5;

      if (tabb >= tab.length)
      {
          tabb = 0;
      }

      speedx = tab[tabb + 0];
      speedy = tab[tabb + 1];
      speedz = tab[tabb + 2];

      del = tab[tabb + 4];
  }

  for (var i = 0; i < max; i++)
  {
      var perspective = ppDist / (ppDist - zz[i]);

      balls[i].x = 400 + xx[i] * perspective;
      balls[i].y = 300 + yy[i] * perspective;
      balls[i].alpha = Math.min(perspective / 2, 1);
      balls[i].scale.set(perspective / 2);

      xx[i] += speedx2;

      if (xx[i] < -800)
      {
          xx[i] = xx[i] + 1600;
      }

      if (xx[i] >= 800)
      {
          xx[i] = xx[i] - 1600;
      }

      yy[i] += speedy2;

      if (yy[i] < -600)
      {
          yy[i] = yy[i] + 1200;
      }

      if (yy[i] >= 600)
      {
          yy[i] = yy[i] - 1200;
      }

      zz[i] -= speedz2;
      
      if (zz[i] < -800)
      {
          zz[i] += 1600;
      }

      if (zz[i] > 800)
      {
          zz[i] -= 1600;
      }

  }

}

//Start button
function up() {
  console.log('button up', arguments);
}

function over() {
  console.log('button over');
}

function out() {
  console.log('button out');
}

function actionOnClick () {
  game.state.start('state1');
}