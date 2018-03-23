const maxJumps = 2;
const plySpeed = 30;
const plySlideSpeed = 5;
const plyGravity = 1000;
const jumpForce = 600;
const hpMax = 50;
const attackSpeed = 0.82; // per second

const attackBox = {x: 170, y: 80, width: 129, height: 65};
const normalBox = {x: 220, y: 0, width: 75, height: 145};
const tombstoneBox = {x: 0, y: 0, width: 54, height: 55};

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
		this.attackAnimPlaying = false;

		this.playerState = PlayerState.IDLE;
		this.idHit = []; // enregistre les joueurs qui ont été touché par le tacle
		this.hp = hpMax;
		this.jumpsCounts = 0;
		this.id = id;
		this.controls = controls[id];

		this.damage = 10;
		this.timerAtk = 0;	// temps depuis la dernier attaque du joueur

		// CREATION DU SPRITE DU JOUEUR
		this.player = game.add.sprite(x, y, "stickman");
		this.player.scale.setTo(ratioX, ratioY);
		this.graphics = game.add.graphics(this.player.x, this.player.y);

		this.player.tint = tint; // on applique un filtre de couleur au joueur pour les comparer

		game.physics.arcade.enable(this.player);
		this.player.anchor.setTo(.5,.5);

		this.player.body.gravity.y = plyGravity;
		this.player.body.collideWorldBounds = true;
		this.player.body.setSize(normalBox.width, normalBox.height, normalBox.x, normalBox.y); // on modifie la boite de collision

		// on extrait l'animation de l'atlas
		this.player.animations.add("run", Phaser.Animation.generateFrameNames("run/", 1, 25, ".png", 4), 120, true);
		this.player.animations.add("idle", Phaser.Animation.generateFrameNames("idle/", 1, 8, ".png", 4), 15, true);
		this.player.animations.add("attack", Phaser.Animation.generateFrameNames("tackle/", 1, 26, ".png", 4), 30, false);
		this.player.animations.add("jump", Phaser.Animation.generateFrameNames("jump/", 1, 1, ".png", 4), 15, true);
		this.player.animations.add("slide", Phaser.Animation.generateFrameNames("wall_slide/", 1, 1, ".png", 4), 15, true);
		this.player.animations.add("tomb_stone", Phaser.Animation.generateFrameNames("tomb_stone/", 1, 1, ".png", 4), 15, true);

		// créer la barre de vie
		var barConfig = {
			width: convertX(4.76),
			height: convertY(1.43),
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
		this.tackle = game.sound.play('tackle');
		this.tackle.stop();
	}

	update(platform) {

		var hitPlatform = game.physics.arcade.collide(this.player, platform);
		
		// si le joueur est mort, alors on affiche une pierre tombale
		if (this.hp <= 0) {						
			this.player.body.setSize(tombstoneBox.width, tombstoneBox.height, tombstoneBox.x, tombstoneBox.y);
			this.player.animations.play("tomb_stone");				
			
			this.hpBar.kill();

			return;
		}

		
		this.player.body.velocity.x = 0;
		this.hpBar.setPosition(this.player.x, this.player.y - convertY(8));
		this.timerAtk += game.time.elapsed/1000;

		// on reset le double jump si on touche le sol
		if (this.player.body.touching.down)
			this.jumpsCounts = 0;

		// ===
		// GESTION DE L'ATTAQUE
		if (this.attackAnimPlaying)
			this.inflictDamage();

		// ===
		// GESTION DE L'ETAT DU JOUEUR
		if (this.attackAnimPlaying) {
			this.player.body.velocity.x += plySpeed * game.time.elapsed * +this.player.scale.x * 1.25;
		}
		else if (this.controls.attack.isDown) {
			this.playerState = PlayerState.ATTACK;
		}
		else if (this.controls.up.isDown && !this.isUpKeyReleased && this.jumpsCounts < maxJumps) {
			this.playerState = PlayerState.JUMP;

			this.isUpKeyReleased = true;
			this.jumpsCounts++;
			this.player.body.velocity.y = -jumpForce;
		}
		else if (this.controls.left.isDown) {
			this.playerState = PlayerState.RUN;
			this.player.scale.x = -ratioX;

			this.player.body.velocity.x -= plySpeed * game.time.elapsed;
		}
		else if (this.controls.right.isDown) {
			this.playerState = PlayerState.RUN;
			this.player.scale.x = ratioX;

			this.player.body.velocity.x += plySpeed * game.time.elapsed;
		}
		else {
			this.playerState = PlayerState.IDLE;
		}

		// si il y a une collision sur les côtés, on slide sur le mur
		if (this.player.body.blocked.left || this.player.body.blocked.right ||
			this.player.body.touching.left || this.player.body.touching.right) {

			this.jumpsCounts = 0;
			this.player.body.velocity.y = plySlideSpeed * game.time.elapsed;
			this.player.body.gravity.y = 0;

			this.playerState = PlayerState.SLIDEONWALL;
		}
		else {
			this.player.body.gravity.y = plyGravity;
		}

		if (this.controls.up.isUp)
			this.isUpKeyReleased = false;

		// ====
		// GESTION DES COLLISIONS BOX
		if (this.attackAnimPlaying)
			this.player.body.setSize(attackBox.width, attackBox.height, attackBox.x, attackBox.y);
		else
			this.player.body.setSize(normalBox.width, normalBox.height, normalBox.x, normalBox.y);


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

					// on gèle le système d'animation pour laisser l'animation du tacle se faire
					this.freezeState = true;
					this.attackAnimPlaying = true;

					this.idHit = [];
					this.player.animations.currentAnim.onComplete.add(function() { this.freezeState = false; this.attackAnimPlaying = false;}, this);

					break;

				case PlayerState.JUMP:
					this.player.animations.play("jump");
					break;

				case PlayerState.SLIDEONWALL:
					this.player.animations.play("slide");
					break;
			}

			// ici on overwrite l'animation si le joueur est en train de sauter
			if (this.jumpsCounts != 0 && !this.attackAnimPlaying)
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
				this.jump = game.sound.play('jump');
				this.footstep.stop();
				break;

			case PlayerState.ATTACK:
				if (!this.tackle.isPlaying && this.player.body.touching.down)
					this.tackle = game.sound.play('tackle');
					this.footstep.stop();
				break;

			case PlayerState.IDLE:
				this.footstep.stop();
				break;
		};
	}

	getDamage(damage) {
		this.hp -= damage;

		var hpRelative = this.hp / hpMax * 100;
		this.hpBar.setPercent(hpRelative);

		return hpRelative;
	}

	// inflige des dégâts aux autres joueurs dans la zone d'attaque du joueur
	inflictDamage() {
		var playerRect = {
			x: this.player.x + attackBox.x ,
			y: this.player.y - attackBox.y,
			width: attackBox.width,
			height: attackBox.height
		};
		
		// on regarde si il y a un joueur dans la box d'attaque
		Loop1:
		for (var i=0; i < player.length; i++) {

			// on ne check pas les collisions du joueur qui attaque
			if (player[i].id == this.id)
				continue;

			// si le joueur a déjà été touché par l'attaque, on l'ignore
			for (var j=0; j < this.idHit.length; j++)
				if (player[i].id == this.idHit[j])
					continue Loop1;

			if (this.player.body.left < player[i].player.body.right &&
				this.player.body.right > player[i].player.body.left &&
				this.player.body.top < player[i].player.body.bottom &&
				this.player.body.bottom > player[i].player.body.top) {
					//console.log(player[i].id + " est dans le box! w/ " + player[i].id);
					player[i].getDamage(this.damage);
					this.idHit.push(player[i].id);
			}
		}

		 // on regarde si il y a un actionner dans la box d'attaque
		for (var i=0; i < interactionsBox.length; i++) {

			if (this.player.body.left < interactionsBox[i].sprite.x + interactionsBox[i].sprite.width &&
				this.player.body.right > interactionsBox[i].sprite.x &&
				this.player.body.top < interactionsBox[i].sprite.y + interactionsBox[i].sprite.height &&
				this.player.body.bottom > interactionsBox[i].sprite.y) {

					//console.log("Actionner est dans le box!");
					interactionsBox[i].hit();
			}
		}
	}
}
