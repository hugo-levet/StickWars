var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;

// resolution de base: 1680x917
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var platforms;
var cursors;


function preload() {
	//game.load.image("star", "img/star.png");
	
	game.load.image("bg", "img/bg.png"); // ici bg signifie le fond d'écran	
	game.load.image('ground', 'img/platform.png');
	
	game.load.spritesheet('dude', 'img/dude.png', 32, 48);	
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
	
	var ledge = platforms.create(528, 345, 'ground');
	ledge.width = 638;
	ledge.height = 49;
	ledge.alpha = 0.2;
	
	
	// ====
	// The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    game.physics.arcade.enable(player);

    player.body.bounce.y = 0;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	//  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	game.debug.text("Anti-alias: " + game.antialias, 10, 32);
	var hitPlatform = game.physics.arcade.collide(player, platforms);
	
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }
}