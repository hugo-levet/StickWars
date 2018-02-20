// global variables
const width = window.innerWidth * window.devicePixelRatio;
const height = window.innerHeight * window.devicePixelRatio;
const initialWidth = 1680;
const initialHeight = 1048;
const ratioX = width / initialWidth;
const ratioY = height / initialHeight;

// resolution de base: 1680x1080
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
var player = [];
var playerLobby = [];
var interactionsBox = [];
var controls = [];
var platforms;
var plyJoinedTheGame = []; // enregistre les joueurs du lobby pour le state "game"


// ici on pourrait rajouter une barre de chargement
var Main = {
    
    // ici on charge toutes les ressources pour l'état actuel (images, sons, etc...)
    preload: function() {        
        game.load.image("bg", "assets/img/world/bg.png"); // ici bg signifie le fond d"écran	                   
        game.load.image("recycle_bin", "assets/img/world/recycle_bin_full.png");                  
        game.load.image("explorer", "assets/img/world/explorer.png");   
        game.load.image("explorer_windows", "assets/img/world/explorer_windows.png"); 
        
        game.load.image("button", "assets/img/button.png");        
        game.load.image("ground", "assets/img/world/platform.png"); 

        game.load.audio('footstep', 'assets/audio/footstep_run.mp3');
        game.load.audio('click', 'assets/audio/button_click.mp3');
        game.load.audio('lobby', 'assets/audio/lobby_count.mp3');
        game.load.bitmapFont('pixel', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        game.load.atlasJSONHash("player", "assets/img/player/texture.png", "assets/img/player/data.json");    
    },   
    
    create: function () { 
        attackBoxWidth = convertX(attackBoxWidth);
        attackBoxHeight = convertY(attackBoxHeight);
        sizeBoxAwayFromPlayer = convertX(sizeBoxAwayFromPlayer);
        
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
        
        var controls4 = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8),
            down: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5),
            left: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4),
            right: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9)
        };
        
        controls.push(controls1);
        controls.push(controls2);
        controls.push(controls3);
        controls.push(controls4);
    
        // on lance le menu
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