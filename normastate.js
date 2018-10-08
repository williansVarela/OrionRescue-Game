var normadisplay;
var sentence;
var typeColor = '#E0D7D7';
var typeSpeed = 40;
var btn;
var boyBtn;
var girlBtn;
var yesBtn;
var noBtn;

var currentAudio;


var input;
var gender;
var playerAge;

var diAudios = {
  load: ['dialogue1', 'dialogue2', 'dialogue3', 'dialogue4', 'dialogue5', 'dialogue6m', 'dialogue6f', 'dialogue7', 'dialogue8', 'dialogue9'],
  wasPlayed: false,
  hasStopped: false
}


var conversation = {
  index: 0,
  answer: 'Siiiim!! Ele está no meu planeta e precisa\nsair daqui, mas como está sem seu braço,\nnão consegue trazer sua nave para cá.'
};

var answer;

var normaMood = {
  index: 1
}; // 0 - happy1, 1 - happy2, 2 - sad, 3 - angry, 4 - surprised


textUpdate()

orionRescue.normastate = function() {};
orionRescue.normastate.prototype = {
  preload: function() {},
  create: function() {
    menuMusic.fadeOut(2000); //stop main menu audio

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    diAudios.di1 = game.add.audio(diAudios.load[0]);
    diAudios.di2 = game.add.audio(diAudios.load[1]);
    diAudios.di3 = game.add.audio(diAudios.load[2]);
    diAudios.di4 = game.add.audio(diAudios.load[3]);
    diAudios.di5 = game.add.audio(diAudios.load[4]);
    diAudios.di6m = game.add.audio(diAudios.load[5]);
    diAudios.di6f = game.add.audio(diAudios.load[6]);
    diAudios.di7 = game.add.audio(diAudios.load[7]);
    diAudios.di8 = game.add.audio(diAudios.load[8]);
    diAudios.di9 = game.add.audio(diAudios.load[9]);

  


    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'BG');
    stars1 = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'stars1');
    stars2 = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'stars2');
    stars1.alpha = 0.6;
    game.add.tween(stars1).to( { alpha: 1 }, 800, "Linear", true, 0, Number.MAX_VALUE, true);
    stars2.alpha = 0.3;
    game.add.tween(stars2).to( { alpha: 0.8 }, 800, "Linear", true, 0, Number.MAX_VALUE, true);

    normadisplay = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'normadisplay');

    normaMood.happy1 = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'normahappy1');
    normaMood.happy2 = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'normahappy2');
    normaMood.sad = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'normasad');
    normaMood.angry = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'normaangry');
    normaMood.surprised = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'normasurprised');

    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'textbox');
    this.convFunc(gameWidth*0.1, gameHeight*0.57, gameWidth*0.6, conversation.text[conversation.index], 50, typeSpeed, typeColor);


  },
  update: function() {
    stars1.tilePosition.y += .1;
    stars2.tilePosition.y += .1;

    normadisplay.tilePosition.x += 1;

    if(conversation.index == 0) {
      normaMood.index = 1; // 0 - happy1, 1 - happy2, 2 - sad, 3 - angry, 4 - surprised
      if(diAudios.wasPlayed == false) {
        currentAudio = diAudios.di1;
        diAudios.di1.play();
        diAudios.wasPlayed = true;
      }
      
    } else if(conversation.index == 1) {
      normaMood.index = 3;
      if(diAudios.wasPlayed == false) {
        currentAudio = diAudios.di2;
        diAudios.di2.play();
        diAudios.wasPlayed = true;
      }
    } else if(conversation.index == 2) {
      normaMood.index = 2;
      if(diAudios.wasPlayed == false) {
        currentAudio = diAudios.di3;
        diAudios.di3.play();
        diAudios.wasPlayed = true;
      }
    } else if(conversation.index == 3) {
      normaMood.index = 4;
      if(diAudios.wasPlayed == false) {
        currentAudio = diAudios.di4;
        diAudios.di4.play();
        diAudios.wasPlayed = true;
      }
    } else if(conversation.index == 4) {
      normaMood.index = 0;
      if(diAudios.wasPlayed == false) {
        currentAudio = diAudios.di5;
        diAudios.di5.play();
        diAudios.wasPlayed = true;
      }
    } else if(conversation.index == 5) {
      if(diAudios.wasPlayed == false) {
        if(gender == 'Terráqueo') {
          currentAudio = diAudios.di6m;
          diAudios.di6m.play()
        } else if(gender == 'Terráquea') {
          currentAudio = diAudios.di6f;
          diAudios.di6f.play();
        }
        diAudios.wasPlayed = true;
      }
      normaMood.index = 1;
    } else if(conversation.index == 6) {
      if(diAudios.wasPlayed == false) {
        currentAudio = diAudios.di7;
        diAudios.di7.play();
        diAudios.wasPlayed = true;
      }
      normaMood.index = 0;
    } else if(conversation.index == 7) {
      if(diAudios.wasPlayed == false) {
        currentAudio = diAudios.di8;
        diAudios.di8.play();
        diAudios.wasPlayed = true;
      }
      normaMood.index = 2;
    } else if(conversation.index == 8) {
      if(diAudios.wasPlayed == false) {
        currentAudio = diAudios.di9;
        diAudios.di9.play();
        diAudios.wasPlayed = true;
      }
      normaMood.index = 1;
    }

    if(normaMood.index == 0) {
      normaMood.happy1.alpha = 1;
      normaMood.happy2.alpha = 0; normaMood.sad.alpha = 0; normaMood.angry.alpha = 0; normaMood.surprised.alpha = 0;
    } else if(normaMood.index == 1) {
      normaMood.happy2.alpha = 1;
      normaMood.happy1.alpha = 0; normaMood.sad.alpha = 0; normaMood.angry.alpha = 0; normaMood.surprised.alpha = 0;
    } else if(normaMood.index == 2) {
      normaMood.sad.alpha = 1;
      normaMood.happy1.alpha = 0; normaMood.happy2.alpha = 0; normaMood.angry.alpha = 0; normaMood.surprised.alpha = 0;
    } else if(normaMood.index == 3) {
      normaMood.angry.alpha = 1;
      normaMood.happy1.alpha = 0; normaMood.happy2.alpha = 0; normaMood.sad.alpha = 0; normaMood.surprised.alpha = 0;
    } else if(normaMood.index == 4) {
      normaMood.surprised.alpha = 1;
      normaMood.happy1.alpha = 0; normaMood.happy2.alpha = 0; normaMood.sad.alpha = 0; normaMood.angry.alpha = 0;
    }
  },



  convFunc: function(x, y, width, text, fontSize, speed, fill, font) {
    sentence = game.add.text(x, y, '', {fontSize: fontSize + 'px', fill: fill, font: font});
    var currentLine = game.add.text(10, 10, '', {fontSize: fontSize + 'px', font: font});
    currentLine.alpha = 0;
    var loopText = game.time.events.loop(speed, addChar);

    var charIndex = 0;

    function addChar() {
      //Adiciona um caractere à mensagem da Norma para cada vez que é chamado pelo loop 'loopText'
      sentence.text += text[charIndex];
      currentLine.text += text[charIndex];
      if(currentLine.width > width && text[charIndex] == ' ') {
        sentence.text += '\n';
        currentLine.text = '';
      }
      // O if abaixo se torna verdadeiro após todos os caracteres da sentença da Norma terem sido digitados.
      if (charIndex >= text.length - 1) {
        game.time.events.remove(loopText);
        if(conversation.index == 2) {
          //Resposta da criança (Botão invisível)
          btn = game.add.button(x, y + gameHeight*0.18, 'btn', convChange);
          btn.scale.set(3.3, 0.6);
          btn.alpha = 0;
          //Resposta da criança (Texto)
          answer = game.add.text(x, y + gameHeight*0.18, conversation.answer, {fontSize: fontSize + 'px', fill: '#E59797', font: font});
          answer.alpha = 0;
          game.add.tween(answer).to( { alpha: 1 }, 1500, "Linear", true);

          setTimeout(function() {
            game.add.tween(answer).to( { alpha: 0.6 }, 800, "Linear", true, 0, Number.MAX_VALUE, true);
          }, 1500)

        } else if(conversation.index == 4) {
          boyBtn = game.add.button(gameWidth * 0.25, gameHeight * 0.8, 'earthboy', boyGetter);
          girlBtn = game.add.button(gameWidth * 0.75, gameHeight * 0.8, 'earthgirl', girlGetter);
          boyBtn.anchor.setTo(0.5, 0.5);
          boyBtn.scale.set(2);
          girlBtn.anchor.setTo(0.5, 0.5);
          girlBtn.scale.set(2);
        } else if(conversation.index == 5) {
          yesBtn = game.add.button(gameWidth * 0.75, gameHeight * 0.75, 'yes', convChange);
          noBtn = game.add.button(gameWidth * 0.25, gameHeight * 0.75, 'no', convChange);
          yesBtn.anchor.setTo(0.5, 0.5);
          noBtn.anchor.setTo(0.5, 0.5);
          yesBtn.alpha = 0.9;
          game.add.tween(yesBtn).to( { alpha: 1 }, 500, "Linear", true, 0, Number.MAX_VALUE, true);
          noBtn.alpha = 0.9;
        } else if(conversation.index == 8) {
          yesBtn = game.add.button(gameWidth * 0.75, gameHeight * 0.75, 'yes', convChange);
          noBtn = game.add.button(gameWidth * 0.25, gameHeight * 0.75, 'no', convChange);
          yesBtn.anchor.setTo(0.5, 0.5);
          noBtn.anchor.setTo(0.5, 0.5);
          yesBtn.alpha = 0.9;
          game.add.tween(yesBtn).to( { alpha: 1 }, 500, "Linear", true, 0, Number.MAX_VALUE, true);
          noBtn.alpha = 0.9;
        } else {
          btn = game.add.button(gameWidth*0.88, gameHeight*0.83, 'rightBtn', convChange);
          game.add.tween(btn).to( { alpha: 0.6 }, 800, "Linear", true, 0, Number.MAX_VALUE, true);
          btn.anchor.setTo(0.5, 0.5);
          btn.scale.set(0.3);
        }

      }
      charIndex++;
    }
  }
};

//Função que chama a proxima sentença da Norma. Essa função é chamada por todos os botões presentes no NormaState
function convChange() {
  btn.kill();
  if(conversation.index == 2) {
    answer.kill();
  } else if(conversation.index == 4) {
    textUpdate();
    boyBtn.kill();
    girlBtn.kill();
  } else if(conversation.index == 5) {
    yesBtn.kill();
    noBtn.kill();
  } else if(conversation.index == 8) {
    yesBtn.kill();
    noBtn.kill();
  }
  if(conversation.index < conversation.text.length - 1) {
    diAudios.wasPlayed = false;
    conversation.index++;
    sentence.text = '';
    orionRescue.normastate.prototype.convFunc(gameWidth*0.1, gameHeight*0.57, gameWidth*0.6, conversation.text[conversation.index], 50, typeSpeed, typeColor);
  } else {
    conversation.index = 0;
    game.state.start('state1');
  }
}

function boyGetter() {
  gender = 'Terráqueo';
  convChange();
}

function girlGetter() {
  gender = 'Terráquea';
  convChange();
}

function textUpdate() {
  conversation.text = [
    "Bem vindo, mestre Orion.",
    "Parado aí!\nQuem é você!? Onde está o mestre Orion?",
    "Mas já faz tanto tempo desde a última vez que eu o vi...\nAlguma coisa aconteceu ao Orion?",
    "Pela Ursa Maior! Isso explica a ausência dele!",
    "Perdoe minha indelicadeza... Prazer, sou Norma, a assistente de Orion! E você, o que é?",
    gender + ", preciso que você ajude o mestre Orion! Mas você é uma criança?",
    "Ótimo! Apenas crianças podem controlar a nave do Orion.",
    "Más notícias. Analisei a rota e existe um grupo de asteroides coloridos, porém muito perigosos, entre a nave e este planeta.",
    "Você não pode colidir com nenhum deles! Está preparado para essa aventura?"
  ];
}
