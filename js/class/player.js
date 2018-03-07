const maxJumps = 2;
const plySpeed = 400;
const plySlideSpeed = 50;
const plyGravity = 500;
const jumpForce = 600;
const hpMax = 5;
const attackSpeed = 0.82; // 1 attack per second

const highAttackBox = {x: 40, y: -20, width: 65, height: 25};

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
// IL FAUT RAJOUTER THIS. DEVANT CHAQUE VARIABLE INTERNE PARCONTRE :/

class Player {
    
	constructor(x, y, id, tint) {
		
		// DÉCLARATION DES VARIABLES
		this.isUpKeyReleased = false; // garde le dernier état de la touche de saut
		this.freezeState = false; // gèle l'état du joueur pour attendre que l'animation se finisse (saut ou attaque) 
			
		this.playerState = PlayerState.IDLE;
		this.hp = hpMax;
        this.jumpsCounts = 0;
        this.id = id;
        this.controls = controls[id];            
        
        this.damage = 10;     
        this.timerAtk = 0;  // temps depuis la dernier attaque du joueur
                
        // CREATION DU SPRITE DU JOUEUR
		this.player = game.add.sprite(x, y, "stickman");
        this.player.scale.setTo(ratioX, ratioY);
        this.graphics = game.add.graphics(this.player.x, this.player.y);		
        
        //this.player.tint = tint; // on applique un filtre de couleur au joueur pour les comparer
        //this.player.tint = Math.random() * 0xffffff;;
        //this.player.filters = [new PIXI.InvertFilter()];
        
		game.physics.arcade.enable(this.player);
		this.player.anchor.setTo(.5,.5);
		
		this.player.body.gravity.y = plyGravity;
		this.player.body.collideWorldBounds = true;
        this.player.body.setSize(75, 147, 220, 0); // on modifie la boite de collision

		// on extrait l'animation de l'atlas
		this.player.animations.add("run", Phaser.Animation.generateFrameNames("run/", 1, 25, ".png", 4), 120, true);	
        this.player.animations.add("idle", Phaser.Animation.generateFrameNames("idle/", 1, 8, ".png", 4), 15, true);	
        this.player.animations.add("attack", Phaser.Animation.generateFrameNames("attack/", 1, 26, ".png", 4), 50, false);	
        this.player.animations.add("jump", Phaser.Animation.generateFrameNames("jump/", 1, 1, ".png", 4), 15, true);	
        this.player.animations.add("slide", Phaser.Animation.generateFrameNames("wall_slide/", 1, 1, ".png", 4), 15, true);	
        this.player.animations.add("tomb_stone", Phaser.Animation.generateFrameNames("tomb_stone/", 1, 1, ".png", 4), 15, true);	
        
        // créer la barre de vie
        var barConfig = {
            width: 100,
            height: 15,
            x: x,
            y: y,
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

        this.footstep = game.sound.play('footstep');
        this.footstep.stop();
	}
		
	update(platform) {   
      
        // si le joueur est mort, alors on affiche une pierre tombale
        if (this.hp <= 0) {            
            this.player.anchor.setTo(0.5, 0);
            this.player.animations.play("tomb_stone");
            this.graphics.kill(); // on nettoie la collision box
            
            return;
        }
        
        
        //game.debug.body(this.player);
      
		var hitPlatform = game.physics.arcade.collide(this.player, platform);
        
		this.player.body.velocity.x = 0;		
        this.hpBar.setPosition(this.player.x, this.player.y - 75);                
        this.timerAtk += game.time.elapsed/1000;
        
		// on reset le double jump si on touche le sol
		if (this.player.body.touching.down)
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
        
        // si il y a une collision sur les côtés, on slide sur le mur
        if (this.player.body.blocked.left || this.player.body.blocked.right ||
            this.player.body.touching.left || this.player.body.touching.right) {
                
            this.jumpsCounts = 0;
            this.player.body.gravity.y = 0;
            this.player.body.velocity.y = plySlideSpeed;
            
            this.playerState = PlayerState.SLIDEONWALL;
        } 
        else {
            this.player.body.gravity.y = plyGravity;
        }         
		 
		if (this.controls.up.isUp)
			this.isUpKeyReleased = false;
		
        // ====
        // DRAW ATTACK BOX COLLISION
        this.graphics.kill();        
        this.graphics = game.add.graphics(this.player.x - highAttackBox.width/2, this.player.y - highAttackBox.height/2);
        this.graphics.lineStyle(2, 0xff0000, 1);
        this.graphics.drawRect(highAttackBox.x * this.player.scale.x, highAttackBox.y, highAttackBox.width, highAttackBox.height);
                  
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
					this.player.animations.play("attack");
                    
                    var ply = this;
                    
                    // on attaque dans this.attackSpeed secondes (on attends l'animation)
                    setTimeout(function() { 
                        if (ply.playerState != PlayerState.ATTACK || ply.timerAtk < attackSpeed)    
                            return;
                        
                        ply.timerAtk = 0;
                        ply.inflictDamage(); 
                        
                    }, this.attackSpeed);
     
					break;
					
				case PlayerState.JUMP:
					this.player.animations.play("jump");
					break;
                    
                case PlayerState.SLIDEONWALL:
                    this.player.animations.play("slide");
                
                    break;
			}	
            
            // ici on overwrite l'animation si le joueur est en train de sauter
            if (this.jumpsCounts != 0)
                this.player.animations.play("jump");
		}
        
        // ====
		// SONS    
        switch (this.playerState) {
            case PlayerState.RUN: 
                // quand le joueur marche, on joue le son de bruit de pas
                if (!this.footstep.isPlaying && this.player.body.touching.down)
                    this.footstep = game.sound.play('footstep');
                
                break;
            
            case PlayerState.JUMP:
                if (!this.player.body.touching.down)
                    this.footstep.stop();
                break;            
                
            case PlayerState.IDLE:
                this.footstep.stop();
                break;
        }
	}
    
    getDamage(damage) {        
        this.hp -= damage;
        
        var hpRelative = this.hp / hpMax * 100;
        this.hpBar.setPercent(hpRelative);
        
        return hpRelative;
    }
    
    stopAnimation() {
        this.freezeState = false;
    }
    
    // inflige des dégâts aux autres joueurs dans la zone d'attaque du joueur
    inflictDamage() {
        var playerRect = {
            x: this.player.x - highAttackBox.width/2 + highAttackBox.x * this.player.scale.x, 
            y: this.player.y - highAttackBox.height/2, 
            width: highAttackBox.width, 
            height: highAttackBox.height
        };       
                  
        // on regarde si il y a un joueur dans la box d'attaque
        for (var i=0; i < player.length; i++) {
            // on ne check pas les collisions du joueur qui attaque
            if (player[i] == this)
                continue;
            
            var rect2 = {
                x: player[i].player.x, 
                y: player[i].player.y, 
                width: player[i].player.width, 
                height: player[i].player.height
            };

            if (playerRect.x < rect2.x + rect2.width &&
                playerRect.x + playerRect.width > rect2.x &&
                playerRect.y < rect2.y + rect2.height &&
                playerRect.height + playerRect.y > rect2.y) {
                    
                    console.log("Il est dans le box! w/ " + player[i].name);
                    player[i].getDamage(this.damage);
            }
        }
        
         // on regarde si il y a un joueur dans la box d'attaque
        for (var i=0; i < interactionsBox.length; i++) {

            if (playerRect.x < interactionsBox[i].rect.x + interactionsBox[i].rect.width &&
                playerRect.x + playerRect.width > interactionsBox[i].rect.x &&
                playerRect.y < interactionsBox[i].rect.y + interactionsBox[i].rect.height &&
                playerRect.height + playerRect.y > interactionsBox[i].rect.y) {
                    
                    console.log("Actionner est dans le box!");
                    interactionsBox[i].hitFunction();
            }
        }
    }
}