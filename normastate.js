var normadisplay;
var sentence;
var btn;
var conversation = {
  text: [
    "Bem vindo novamente, mestre Orion.\nEstava ansiosa pelo seu retorno!\nVeio atualizar o banco de dados com suas novas descobertas?",
    "Parado aí!\nQuem é você?\nO mestre Orion não deixa ninguém usar o STARDEX!",
    "Mas já faz tanto tempo desde a última vez que eu o vi...\nSerá que alguma coisa aconteceu com ele?",
    "Pela Ursa Maior! Isso explica o porquê dele não ter entrado em contato comigo antes!",
    "Ainda não nos apresentamos. Prazer, sou chamada Norma, a assistente do Orion, o robô explorador mais incrível de Juno, construído pela mais habilidosa engenheira de Juno.\nE você, como se chama?",
    "Hmmm... (Nome)... Que nome lindo!",
    "(Nome), eu preciso que você ajude a mim e ao Orion. Preciso que você traga a nossa nave até o seu planeta urgentemente! Só que antes, preciso confirmar um detalhe... A princesa Carina só permite que crianças controlem a nave construída por ela! Que idade você tem?",
    "Muito bem! .................... (Pausa)...............\nAnalisei a rota e existe um grupo de asteroides desde a localização atual da nave até este planeta. Você não poderá colidir com eles.",
    "Não temos tempo a perder, (Nome)!\nAssim que estiver pronto me diga! Vou colocar os comandos da nave a sua disposição!"
  ],
  index: 0
};


orionRescue.normastate = function() {};
orionRescue.normastate.prototype = {
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

    normadisplay = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'normadisplay');
    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'textbox');


    this.convFunc(gameWidth*0.1, gameHeight*0.57, gameWidth*0.6, conversation.text[conversation.index], 50, 40, '#fff');


  },
  update: function() {
    stars1.tilePosition.y += .1;
    stars2.tilePosition.y += .1;

    normadisplay.tilePosition.x += 1;
  },

  convFunc: function(x, y, width, text, fontSize, speed, fill, font) {
    sentence = game.add.text(x, y, '', {fontSize: fontSize + 'px', fill: fill, font: font});
    var currentLine = game.add.text(10, 10, '', {fontSize: fontSize + 'px', font: font});
    currentLine.alpha = 0;
    var loopText = game.time.events.loop(speed, addChar);

    var charIndex = 0;

    function addChar() {
      sentence.text += text[charIndex];
      currentLine.text += text[charIndex];
      if(currentLine.width > width && text[charIndex] == ' ') {
        sentence.text += '\n';
        currentLine.text = '';
      }
      if (charIndex >= text.length - 1) {
        game.time.events.remove(loopText);

        btn = game.add.button(gameWidth*0.88, gameHeight*0.83, 'rightBtn', convChange);
        btn.anchor.setTo(0.5, 0.5);
        btn.scale.set(0.3);

      }
      charIndex++;
    }
  }
};

function convChange() {
  btn.kill();
  if(conversation.index < conversation.text.length - 1) {
    conversation.index++;
    sentence.text = '';
    orionRescue.normastate.prototype.convFunc(gameWidth*0.1, gameHeight*0.57, gameWidth*0.6, conversation.text[conversation.index], 50, 40, '#fff');
  } else {
    conversation.index = 0;
    game.state.start('state1');
  }

}
