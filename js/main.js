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
var playerLobby = [];
var interactionsBox = [];
var platforms;

var controls = [];

// ici on pourrait rajouter une barre de chargement
var Main = {
    
    preload: function() {
        // ici on charge toutes les ressources pour l'état actuel (images, sons, etc...)
    },   
    
    create: function () { 

        // on créer les contrôles des joueurs
        var controls1 = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.Z),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.Q),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.E)
        };
        
        var controls2 = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.Y),
            down: game.input.keyboard.addKey(Phaser.Keyboard.H),
            left: game.input.keyboard.addKey(Phaser.Keyboard.G),
            right: game.input.keyboard.addKey(Phaser.Keyboard.J),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.U)
        };
        
        var controls3 = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.O),
            down: game.input.keyboard.addKey(Phaser.Keyboard.L),
            left: game.input.keyboard.addKey(Phaser.Keyboard.K),
            right: game.input.keyboard.addKey(Phaser.Keyboard.M),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.P)
        };
        
        controls.push(controls1);
        controls.push(controls2);
        controls.push(controls3);
    
        game.state.add('MainMenu', MainMenu);
        game.state.start('MainMenu');
    }
    
};

game.state.add('Main', Main);
game.state.start('Main');

// on créer 2 fonctions qui permet d'afficher le jeu sur de multiples résolutions
function convertX(x) {
    return x * ratioX;
}

function convertY(y) {
    return y * ratioY;
}