// global variables
const width = window.innerWidth * window.devicePixelRatio;
const height = window.innerHeight * window.devicePixelRatio;
const initialWidth = 1680;
const initialHeight = 1048;
const ratioX = width / initialWidth;
const ratioY = height / initialHeight;

// resolution de base: 1680x1048
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game');
var player = [],    
    interactionsBox = [],
    controls = [];
var platforms;

var PlayerMetaEnum = {  
  BLUE: 0,
  RED: 1,
  GREEN: 2,
  YELLOW: 3,
};

console.log("RESOLUTION: " + width + " x " + height);

// enregistre la progression globale du joueur (score, id, enable)
var playerMeta = [];
playerMeta.push(new PlayerMeta(PlayerMetaEnum.BLUE, "BLUE", 0x0088bf));
playerMeta.push(new PlayerMeta(PlayerMetaEnum.RED, "RED", 0xc40233));
playerMeta.push(new PlayerMeta(PlayerMetaEnum.GREEN, "GREEN", 0x00a568));
playerMeta.push(new PlayerMeta(PlayerMetaEnum.YELLOW, "YELLOW", 0xffd400));

game.state.add('Preload', Preload);
game.state.start('Preload');

// on créer 2 fonctions qui permet d'afficher le jeu sur de multiples résolutions
function convertX(x) {
    return x * ratioX;
}

function convertY(y) {
    return y * ratioY;
}