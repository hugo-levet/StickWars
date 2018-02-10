var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;

// resolution de base: 1680x917
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var platforms;

var ply;

function preload() {	
	game.load.image("bg", "img/bg.png"); // ici bg signifie le fond d"écran	
	game.load.image("ground", "img/platform.png");
	
	// https://www.codeandweb.com/texturepacker/tutorials/creating-spritesheets-for-phaser-with-texturepacker
	game.load.atlasJSONHash("player", "img/player/texture.png", "img/player/data.json");
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
		
	var bg = game.add.sprite(0, 0, "bg");	
	bg.width = width;
	bg.height = height;
	
	// ====
	// on créer les platforms
	platforms = game.add.group();
    platforms.enableBody = true;
	
    var ground = platforms.create(0, game.world.height, "ground");
    ground.width = width;
	ground.height = -43;
    ground.body.immovable = true;
	ground.alpha = 0.2;
	
	var searchBar = platforms.create(528, 345, "ground");
	searchBar.width = 638;
	searchBar.height = 49;
	searchBar.alpha = 0.2;
	searchBar.body.immovable = true;
		
	// ====
	// The player and its settings
	var controls = {
		up: game.input.keyboard.addKey(Phaser.Keyboard.Z),
		down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: game.input.keyboard.addKey(Phaser.Keyboard.Q),
		right: game.input.keyboard.addKey(Phaser.Keyboard.D),
		attack: game.input.keyboard.addKey(Phaser.Keyboard.E)
	};
	
    ply = new Player(controls);	
}

function update() {	
    ply.update();	
}