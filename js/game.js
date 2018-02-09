var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;

// resolution de base: 1680x917
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var platforms;
var cursors;

var jumpsCounts = 0;
const maxJumps = 3;
const plySpeed = 250;

var flipFlop = false; // NB CHANGER LE NOM -> garde le dernier état de la touche de saut
var zqsd; // contrôles


function preload() {	
	game.load.image("bg", "img/bg.png"); // ici bg signifie le fond d'écran	
	game.load.image('ground', 'img/platform.png');
	game.load.spritesheet('dude', 'img/dude.png', 32, 48);	
	
	//  https://www.codeandweb.com/texturepacker/tutorials/creating-spritesheets-for-phaser-with-texturepacker
	game.load.atlasJSONHash('player', 'img/player/texture.png', 'img/player/data.json');
}

function create() {
	game.antialias = false; // on déactive l'antialias pour le pixel art
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
		
	var bg = game.add.sprite(0, 0, 'bg');	
	bg.width = width;
	bg.height = height;
	
	// ====
	// on créer les platforms
	platforms = game.add.group();
    platforms.enableBody = true;
	
    var ground = platforms.create(0, game.world.height, 'ground');
    ground.width = width;
	ground.height = -43;
    ground.body.immovable = true;
	ground.alpha = 0.2;
	
	var searchBar = platforms.create(528, 345, 'ground');
	searchBar.width = 638;
	searchBar.height = 49;
	searchBar.alpha = 0.2;
	searchBar.body.immovable = true;
	
	
	// ====
	// The player and its settings
    player = game.add.sprite(128, game.world.height - 300, 'player', 'attack/0008.png');

    game.physics.arcade.enable(player);
    
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    // Our two animations, walking left and right.
    //player.animations.add('attack', Phaser.Animation.generateFrameNames('attack/', 1, 10, '', 4), 10, true, false);
	player.animations.add('run', Phaser.Animation.generateFrameNames('run/', 1, 6, '.png', 4), 10, true, true);
	
	// Our controls.
    zqsd = {
	  up: game.input.keyboard.addKey(Phaser.Keyboard.Z),
	  down: game.input.keyboard.addKey(Phaser.Keyboard.S),
	  left: game.input.keyboard.addKey(Phaser.Keyboard.Q),
	  right: game.input.keyboard.addKey(Phaser.Keyboard.D),
	};
}

function update() {
	//game.debug.text("Anti-alias: " + game.antialias, 10, 32);
	var hitPlatform = game.physics.arcade.collide(player, platforms);
	
    player.body.velocity.x = 0;

	// ===
	// Translation
    if (zqsd.left.isDown)
    {
        player.body.velocity.x = -plySpeed;
        player.animations.play('run');
    }
    else if (zqsd.right.isDown)
    {
        player.body.velocity.x = plySpeed;
        player.animations.play('run');
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }

	// ===
    // Jump
	
	// on reset le double jump si on touche le sol
	if (player.body.touching.down && hitPlatform)
		jumpsCounts = 0;	
	
    if (zqsd.up.isDown && !flipFlop && jumpsCounts < maxJumps)
    {
		flipFlop = true;
		jumpsCounts++;		
		player.body.velocity.y = -350;   
		
		console.log("Jump! #" + jumpsCounts);
    }
	 
	if (zqsd.up.isUp) {
		flipFlop = false;
	}
}