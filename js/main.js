// global variables
const width = window.innerWidth * window.devicePixelRatio;
const height = window.innerHeight * window.devicePixelRatio;
const initialWidth = 1680;
const initialHeight = 1080;
const ratioX = width / initialWidth;
const ratioY = height / initialHeight;

// resolution de base: 1680x1080
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
var player = [];
var interactionsBox = [];
var platforms;



var Main = {
    
    preload: function() {
        // ici on charge toutes les ressources pour l'état actuel (images, sons, etc...)
    },   
    
    create: function () {  
    
        // une fois le chargement terminé, on lance le menu.js
        game.state.add('Menu', Menu);
        game.state.start('Menu');
        
    }
    
};

// on charge "game"
game.state.add('Game', Game);
game.state.start('Game');

// on créer 2 fonctions qui permet d'afficher le jeu sur de multiples résolutions
function convertX(x) {
    return x * ratioX;
}

function convertY(y) {
    return y * ratioY;
}