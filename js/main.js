// Global Variables
var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;

// resolution de base: 1680x917
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
var player = [];
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

// on charge "Menu"
game.state.add('Menu', Menu);
game.state.start('Menu');
