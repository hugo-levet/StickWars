// Global Variables
var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;

// resolution de base: 1680x917
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
var player = [];
var platforms;

var Main = {

  preload: function () {
    game.load.image("bg", "img/bg.png"); // ici bg signifie le fond d"écran	
	game.load.image("ground", "img/platform.png");
	
	// https://www.codeandweb.com/texturepacker/tutorials/creating-spritesheets-for-phaser-with-texturepacker
	game.load.atlasJSONHash("player", "img/player/texture.png", "img/player/data.json");
  },

  create: function () {
    game.state.add('Menu', Menu);
    game.state.start('Menu');
  }

};

game.state.add('Game', Game);
game.state.start('Game');
