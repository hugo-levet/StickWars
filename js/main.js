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
	projectiles = [],
	platforms;
var selectedMap;	
var controls = [];

const fontSize = 3;

const PlateformsEnum = {
    COLLIDER: 0,
    INTERACTION: 1,
    DECO: 2
};

const PlayerMetaEnum = {  
  BLUE: 0,
  RED: 1,
  GREEN: 2,
  YELLOW: 3,
};

console.log("RESOLUTION: " + width + " x " + height);

// playerMeta enregistre la progression globale du joueur (score, id, enable)
var playerMeta = [];
playerMeta.push(new PlayerMeta(PlayerMetaEnum.BLUE, "BLUE", 0x0088bf));
playerMeta.push(new PlayerMeta(PlayerMetaEnum.RED, "RED", 0xc40233));
playerMeta.push(new PlayerMeta(PlayerMetaEnum.GREEN, "GREEN", 0x00a568));
playerMeta.push(new PlayerMeta(PlayerMetaEnum.YELLOW, "YELLOW", 0xffd400));

game.state.add('BootStrap', BootStrap);
game.state.start('BootStrap');

// on créer 2 fonctions qui permet d'afficher le jeu sur de multiples résolutions
function convertX(x) {
    return x * width / 100;
}

function convertY(y) {
    return y * height / 100;
}

function loadPlayMenu() {
    game.sound.play('click');
    
    game.state.add('Lobby', Lobby);
    game.state.start('Lobby');
}

function loadCredits() {
    game.sound.play('click');
    
    game.state.add('Credits', Credits);
    game.state.start('Credits');
}

function loadStats() {
    game.sound.play('click');
    
    game.state.add('Stats', Stats);
    game.state.start('Stats');
}

function loadMainMenu() {
    game.sound.play('click');
    
    game.state.add('MainMenu', MainMenu);
    game.state.start('MainMenu');
}

function loadMapSelector() {
    game.sound.play('click');
    
    game.state.add('MapSelector', MapSelector);
    game.state.start('MapSelector');
}