const maxJumps = 3;
const plySpeed = 250;
const plyGravity = 300;
const jumpForce = 400;

var PlayerState = {  
  RUN: 1,
  ATTACK: 2,
  JUMP: 3,
  IDLE: 4,
  SLIDEONWALL: 5
};

//
// ATTENTION:
// EN JS, DANS UNE CLASSE, ON N'A PAS BESOIN DE DECLARER LES VARIABLES AVANT DE LES UTILISER
// IL FAUT RAJOUTER .THIS DEVANT CHAQUE VARIABLE PARCONTRE :/

class Player {		
	constructor(controls) {
		
		// DÉCLARATION DES VARIABLES
		this.isUpKeyReleased = false; // garde le dernier état de la touche de saut
		this.freezeState = false; // gèle l'état du joueur pour attendre que l'animation se finisse (saut ou attaque) 
			
		this.playerState = PlayerState.IDLE;
		this.controls;
		this.jumpsCounts = 0;
		this.player;
		
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
		
		// our controls
		this.controls = controls;
	}
	
	//
	update() {
		var hitPlatform = game.physics.arcade.collide(player, platforms);
		player.body.velocity.x = 0;
		
		// on reset le double jump si on touche le sol
		if (player.body.touching.down && hitPlatform)
			this.jumpsCounts = 0;
		
		// ===
		// GESTION DE L'ETAT DU JOUEUR
		if (this.controls.attack.isDown) {
			this.playerState = PlayerState.ATTACK;
		}	
		else if (this.controls.up.isDown && !this.isUpKeyReleased && this.jumpsCounts < maxJumps) {
			this.playerState = PlayerState.JUMP;
			
			this.isUpKeyReleased = true;
			this.jumpsCounts++;		
			player.body.velocity.y = -jumpForce;   

			console.log("JUMP");
		}
		else if (this.controls.left.isDown && this.playerState != PlayerState.ATTACK) {
			this.playerState = PlayerState.RUN;
			player.scale.x = -1;
				
			player.body.velocity.x -= plySpeed;
		}	
		else if (this.controls.right.isDown && this.playerState != PlayerState.ATTACK) {
			this.playerState = PlayerState.RUN;		
			player.scale.x = 1;
				
			player.body.velocity.x += plySpeed; 
		}
		else {
			this.playerState = PlayerState.IDLE;
		}
		 
		if (this.controls.up.isUp)
			this.isUpKeyReleased = false;
		
		// ====
		// ANIMATION
        console.log("this.playerState -> " + this.playerState);
        console.log("this.freezeState -> " + this.freezeState);
        
		if (!this.freezeState) {	
			switch (this.playerState) {
				case PlayerState.IDLE:
                    console.log("idle");
					player.animations.play("idle");	
					break;
					
				case PlayerState.RUN:
					player.animations.play("run");
					break;
					
				case PlayerState.ATTACK:
					var attackAnim = player.animations.play("attack");
					
					this.freezeState = true;
					attackAnim.onComplete.add(this.stopAnimation, this);
					break;
					
				case PlayerState.JUMP:
					var jumpAnim = player.animations.play("jump");
					
					this.freezeState = true;
					jumpAnim.onComplete.add(this.stopAnimation, this);
					break;
			}	
		}
	}
    
    stopAnimation() {
        console.log("Animation finish!");
	
        this.freezeState = false;		
    }
}