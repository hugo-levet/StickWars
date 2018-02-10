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
const plyGravity = 300;
const jumpForce = 400;

var PlayerState = {
  IDLE: 0,
  RUN: 1,
  ATTACK: 2,
  JUMP: 3,
  SLIDEONWALL: 4,
};

var playerState = PlayerState.IDLE;

var flipFlop = false; // NB CHANGER LE NOM -> garde le dernier état de la touche de saut
var freezeState = false; // gèle l'état du joueur pour attendre que l'animation se finisse (saut ou attaque) 
var controls;

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
    player = game.add.sprite(512, game.world.height - 180, "player");

    game.physics.arcade.enable(player);
	player.anchor.setTo(.5,.5);
    
    player.body.gravity.y = plyGravity;
    player.body.collideWorldBounds = true;

	// on extrait l"animation de l"atlas
	player.animations.add("run", Phaser.Animation.generateFrameNames("run/", 1, 10, ".png", 4), 10, true);	
	player.animations.add("idle", Phaser.Animation.generateFrameNames("idle/", 1, 10, ".png", 4), 10, true);
	player.animations.add("attack", Phaser.Animation.generateFrameNames("attack/", 1, 10, ".png", 4), 20, false);
	player.animations.add("jump", Phaser.Animation.generateFrameNames("jump/", 1, 10, ".png", 4), 10, false);	
	
	// Our controls
    controls = {
		up: game.input.keyboard.addKey(Phaser.Keyboard.Z),
		down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: game.input.keyboard.addKey(Phaser.Keyboard.Q),
		right: game.input.keyboard.addKey(Phaser.Keyboard.D),
		attack: game.input.keyboard.addKey(Phaser.Keyboard.E)
	};
}

function update() {
		
	var hitPlatform = game.physics.arcade.collide(player, platforms);
	
    player.body.velocity.x = 0;

	// on reset le double jump si on touche le sol
	if (player.body.touching.down && hitPlatform)
		jumpsCounts = 0;
	
	// ===
	// GESTION DE L"ETAT DU JOUEUR	
	 
	if (controls.attack.isDown) {
		playerState = PlayerState.ATTACK;
	}	
	else if (controls.up.isDown && !flipFlop && jumpsCounts < maxJumps) {
		flipFlop = true;
		jumpsCounts++;		
		player.body.velocity.y = -jumpForce;   
		
		console.log("Jump! #" + jumpsCounts);
		
		playerState = PlayerState.JUMP;
	}
	else if (controls.left.isDown && playerState != PlayerState.ATTACK) {
		playerState = PlayerState.RUN;
		player.scale.x = -1;
			
		player.body.velocity.x -= plySpeed;
	}	
	else if (controls.right.isDown && playerState != PlayerState.ATTACK) {
		playerState = PlayerState.RUN;		
		player.scale.x = 1;
			
		player.body.velocity.x += plySpeed; 
	}
	else
		playerState = PlayerState.IDLE;
	 
	if (controls.up.isUp)
		flipFlop = false;
	
	// ====
	// ANIMATION
	if (!freezeState) {	
		switch (playerState) {
			case PlayerState.IDLE:
				player.animations.play("idle");	
				break;
				
			case PlayerState.RUN:
				player.animations.play("run");
				break;
				
			case PlayerState.ATTACK:
				var attackAnim = player.animations.play("attack");
				
				freezeState = true;
				attackAnim.onComplete.add(stopAnimation, this);
				break;
				
			case PlayerState.JUMP:
				var jumpAnim = player.animations.play("jump");
				
				freezeState = true;
				jumpAnim.onComplete.add(stopAnimation, this);
				break;
		}	
	}
}

function stopAnimation() {
	console.log("Animation finish!");
	
	freezeState = false;	
	
}