var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;

// resolution de base1680x917
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var platforms;
var cursors;


function preload() {
	game.load.image("bg", "img/bg.png"); // ici bg signifie le fond d'écran	
	game.load.image('ground', 'img/platform.png');
	game.load.image("star", "img/star.png");
	game.load.spritesheet('dude', 'img/dude.png', 32, 48);	
}

function create() {
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	var bg = game.add.sprite(0, 0, 'bg');	
	bg.width = width;
	bg.height = height;
	
	var star = game.add.sprite(0, 0, 'star');
	star.width = 20;
	star.height = 20;
	
	// ====
	// on créer les platforms
	platforms = game.add.group();
    platforms.enableBody = true;
	
    var ground = platforms.create(0, game.world.height - 43, 'ground');
    ground.width = width;
	ground.height = 43;
    ground.body.immovable = true;
	
	// ====
	// The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	//  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	var hitPlatform = game.physics.arcade.collide(player, platforms);

	//  Reset the players velocity (movement)
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
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }
}