var diaryObj = {
  page: 0, // Responsável por controlar a página atual
  imgs: ['diary1', 'diary2', 'diary3', 'diary4', 'diary5', 'diary6', 'diary7', 'diary8'], // Todas as imagens disponíveis
  txtIndex: 0, // Armazena a posição da atual string no interior de uma das arrays (que estão dentro da array abaixo)
  txts: [
    [
      'O planeta Juno é muito lindo. Consegue \nfundir perfeitamente o meio ambiente e a \nalta tecnologia estudada e desenvolvida \npor seus habitantes. \n\nEu sou muito feliz por ter sido criado \naqui.',
      'Essa foto foi tirada por mim e minha \nconstrutora, Carina, em um de nossos \npasseios por Juno. Nela podemos ver Hapo, \num lugar onde novos carros e \nnaves são estudados e construídos.'
    ],
    [
      'Hoje foi um dia especial. Carina e eu \nestivemos no planeta Pimento e \npassamos uma tarde inteira juntos rindo \ne nos divertindo muito.',
      'As árvores daqui são muito engraçadas. \n\nAs mais novinhas são amarelas. \nAo se tornarem adultas, elas adquirem \numa tonalidade tão vermelha quanto \no lindo cabelo da princesa Carina.',
      'Quando elas ficam roxas, podemos comer \nsuas folhas que ficam bem docinhas \ne suculentas. A Carina adorou as \nfolhas roxas, mas eu prefiro o meu \nbom e velho óleo fresco.'
    ],
    [
      'Hoje foi um grande dia! Eu parti de \nJuno para cumprir a principal função para \nqual fui projetado. Agora tenho que \nexplorar o espaço em busca de bons \nplanetas para abrigar os Junianos, \naqueles que nasceram em Juno.',
      'Estou um pouco nervoso pois nunca \nviajei sem a Carina, mas tenho certeza que \nela construiu minha nave e eu da melhor \nforma possível para lidar com \nqualquer imprevisto que possa surgir.',
      'A Carina tirou essa foto da Montanha \nChifre d’água, um dos nossos lugares \nfavoritos em Juno.'
    ],
    [
      'Hoje faz 8 dias desde que parti de Juno \ne estou na galáxia de Tóf. Essa é uma \nfoto do planeta Aumi. Aqui existem \nmuitas ruínas e, por isso, acredito que \njá abrigou uma sociedade a \nmuitos anos atrás.',
      'Tirei uma foto dessa árvore misteriosa \ne mágica, pois foi o único ser vivo que \nencontrei nesse planeta. Suas folhas \nsão infinitas e estão sempre a cair. \nAlém disso elas são de ouro e, \ntambém, muito brilhosas, por \nisso podemos ver a árvore mesmo \nque estejamos muito longe.'
    ],
    [
      'Já fazem algumas semanas que parti de \nJuno. Sinto saudades do meu lar e de Carina,\nmas não posso negar que tem \nsido uma experiência super divertida!',
      'Hoje eu visitei o planeta Katar, que de \nlonge parecia apenas uma enorme bolha de \nágua flutuando no espaço. Como \nsentia falta das cachoeiras de Juno, \ndecidi mergulhar neste planeta \nmolhado e fiquei surpreso com o \nque encontrei.',
      'Peixinhos de várias formas e cores além \nde lindas plantas que pareciam estar \nem uma dança sem fim.'
    ],
    [
      'Shhh! Hoje a descoberta foi um pouco \narriscada. Visitei o planeta Mejae, um \nplaneta com seres muito mal humorados \ne perigosos.',
      'Os vegetais enormes não gostavam quando\nalguém pisava em suas raízes. Havia \numa planta tão zangada que até comeu \numa mosquinha só porque ela pousou \nem uma de suas folhas.',
      'Os habitantes não eram nem um pouco mais\nsimpáticos. Como portavam armas afiadas,\neu procurei ficar bem escondido \ne quietinho.',
      'Os Junianos com certeza não vão gostar \nde Mejae.'
    ],
    [
      'Faz algumas horas que entrei no sistema\nplanetário da estrela Sol. Algo me diz que\nestou próximo de uma grande \ndescoberta...',
      'Acabei de encontrar um enorme e lindo \nplaneta que parece estar brincando de \nbambolê. Apesar de divertido, evitei \nme aproximar muito porque ele está \npassando por uma tempestade \nmuito forte com vários raios \ne furacões.'
    ],
    [
      'Foto de recordação da minha construtora\nCarina. \n\nCarina é uma princesa diferente de \ntodas as outras princesas que \njá viveram em Juno. Ela não quer \nfrequentar as aulas de penteados, \nmaquiagem ou etiqueta.',
      'Ela é encantada com o universo, os \nplanetas e as estrelas e desde pequena tem \nestudado muita ciência e engenharia.\n\nPor ser tão curiosa e estudiosa, \nexplora as maiores crateras de \nJuno e viaja com naves construídas \npor ela mesma pelo espaço.',
      'Muitos a consideram uma rebelde pelas \natitudes que ela toma, mas, na verdade, ela \ntem o grande propósito de salvar \nos Junianos de um mal que ela mesma \ndescobriu: uma possível morte \nda estrela de Juno que pode \ndestruir todo o planeta.'
    ]
  ]
}

var currentPage; // Armazena a imagem da página atual

// Botões para mudar de página
var nextPageBtn;
var prevPageBtn;

//Botão para avançar o parágrafo
var nextParagraphBtn;

var sentence; // Armazena o texto
var sentenceColor = '#373639';
var sentenceSpeed = 5;

orionRescue.diary = function() {};
orionRescue.diary.prototype = {
  preload: function() {},
  create: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'diaryBG');
    var outBtn = game.add.button(1085, 115, 'outBtn', function() {game.state.start('mainmenu');});
    outBtn.anchor.setTo(0.5, 0.5);
    outBtn.scale.setTo(0.4);
    currentPage = game.add.tileSprite(0, 0, gameWidth, gameHeight, diaryObj.imgs[diaryObj.page]);
    createPageBtns();
    writeParagraph();
  },

  update: function() {}
};

function toNextPage() {
  // Chama a função changePage com o parâmetro 'up'
  changePage('up');
}

function toPreviousPage() {
  // Chama a função changePage com o parâmetro 'down'
  changePage('down');
}

function changePage(value) {
  // Responsável por mudar a imagem para a da página seguinte ou anterior, mudando também o texto.
  if(nextParagraphBtn != null) {
    nextParagraphBtn.kill();
  }
  sentence.kill();
  diaryObj.txtIndex = 0;
  currentPage.kill();
  nextPageBtn.kill();
  prevPageBtn.kill();
  if(value == 'up' && diaryObj.page < diaryObj.imgs.length - 1) {
    diaryObj.page++;
  } else if(value == 'down' && diaryObj.page > 0) {
    diaryObj.page--;
  }
  currentPage = game.add.tileSprite(0, 0, gameWidth, gameHeight, diaryObj.imgs[diaryObj.page]);
  writeParagraph();
  createPageBtns();
}

function createPageBtns() {
  // Responsável por criar os botões que 'mudarão de página'.
  //É chamado sempre que uma nova imagem é desenhada. Assim, a imagem não fica sobre o botão.
  nextPageBtn = game.add.button(1113, 760, 'rightBtn', toNextPage);
  prevPageBtn = game.add.button(87, 760, 'leftBtn', toPreviousPage);
  nextPageBtn.anchor.setTo(0.5, 0.5);
  nextPageBtn.scale.setTo(0.2);
  prevPageBtn.anchor.setTo(0.5, 0.5);
  prevPageBtn.scale.setTo(0.2);
}

function writeParagraph() {
  // Responsável por criar o texto da página. E o botão para avançar o texto caso o texto ainda não tenha acabado.
  sentence = game.add.text(gameWidth*0.1, gameHeight*0.65, diaryObj.txts[diaryObj.page][diaryObj.txtIndex],  {fontSize: 50 + 'px', fill: sentenceColor});
  if(diaryObj.txtIndex < diaryObj.txts[diaryObj.page].length - 1) {
    nextParagraphBtn = game.add.button(1113, 1900, 'rightBtn', nextParagraph);
    nextParagraphBtn.anchor.setTo(0.5, 0.5);
    nextParagraphBtn.scale.setTo(0.2);
    game.add.tween(nextParagraphBtn).to( { alpha: 0.6 }, 800, "Linear", true, 0, Number.MAX_VALUE, true);
  }
}

function nextParagraph() {
  // É chamada pelo botão criado no interior da função writeParagraph();
  // Deleta o texto ja escrito e desenha a próxima parte do texto.
  sentence.kill();
  nextParagraphBtn.kill();
  if(diaryObj.txtIndex < diaryObj.txts[diaryObj.page].length - 1) {
    diaryObj.txtIndex++;
    writeParagraph();
  }
}
