const maxJumps = 3;
const plySpeed = 250;
const plyGravity = 300;
const jumpForce = 400;
const maxHP = 100;

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
	constructor(controls, name) {
		
		// DÉCLARATION DES VARIABLES
		this.isUpKeyReleased = false; // garde le dernier état de la touche de saut
		this.freezeState = false; // gèle l'état du joueur pour attendre que l'animation se finisse (saut ou attaque) 
			
		this.playerState = PlayerState.IDLE;
		this.hp = maxHP;
        this.jumpsCounts = 0;
        this.controls = controls;
        this.name = name;
        
		
		this.player = game.add.sprite(512, game.world.height - 180, "player");

		game.physics.arcade.enable(this.player);
		this.player.anchor.setTo(.5,.5);
		
		this.player.body.gravity.y = plyGravity;
		this.player.body.collideWorldBounds = true;

		// on extrait l"animation de l"atlas
		this.player.animations.add("run", Phaser.Animation.generateFrameNames("run/", 1, 10, ".png", 4), 15, true);	
		this.player.animations.add("idle", Phaser.Animation.generateFrameNames("idle/", 1, 10, ".png", 4), 15, true);
		this.player.animations.add("attack", Phaser.Animation.generateFrameNames("attack/", 1, 10, ".png", 4), 20, false);
		this.player.animations.add("jump", Phaser.Animation.generateFrameNames("jump/", 1, 10, ".png", 4), 15, false);	
        
        var barConfig = {
            width: 120,
            height: 15,
            x: this.player.x,
            y: this.player.x,
            bg: {
              color: '#d8231b'
            },
            bar: {
              color: '#00923b'
            },
            animationDuration: 200,
            flipped: false
        };
        
        this.hpBar = new HealthBar(game, barConfig);
	}
		
	update() {
        this.hpBar.setPosition(this.player.x, this.player.y - 75);
        console.log("name -> " + this.name);
        
		var hitPlatform = game.physics.arcade.collide(this.player, platforms);
		this.player.body.velocity.x = 0;
		
		// on reset le double jump si on touche le sol
		if (this.player.body.touching.down && hitPlatform)
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
			this.player.body.velocity.y = -jumpForce; 
		}
		else if (this.controls.left.isDown && this.playerState != this.playerState.ATTACK) {
			this.playerState = PlayerState.RUN;
			this.player.scale.x = -1;
				
			this.player.body.velocity.x -= plySpeed;
		}	
		else if (this.controls.right.isDown && this.playerState != this.playerState.ATTACK) {
			this.playerState = PlayerState.RUN;		
			this.player.scale.x = 1;
				
			this.player.body.velocity.x += plySpeed; 
		}
		else {
			this.playerState = PlayerState.IDLE;
		}
		 
		if (this.controls.up.isUp)
			this.isUpKeyReleased = false;
		
		// ====
		// ANIMATION
        
		if (!this.freezeState) {	
			switch (this.playerState) {
				case PlayerState.IDLE:
					this.player.animations.play("idle");	
					break;
					
				case PlayerState.RUN:
					this.player.animations.play("run");
					break;
					
				case PlayerState.ATTACK:
					var attackAnim = this.player.animations.play("attack");
					
					this.freezeState = true;
					attackAnim.onComplete.add(this.stopAnimation, this);
					break;
					
				case PlayerState.JUMP:
					var jumpAnim = this.player.animations.play("jump");
					
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