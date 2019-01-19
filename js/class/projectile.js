const projectileSpeed = 2;
const projectileDamage = 10;

/**
 * Créer un projectile qui va avancer et infliger des dégâts à un personnage.
 * @class
 */
class Projectile {		
    
	/**
	 * @constructor
	 * @param {float} x - La position en abcisse du projectile.
     * @param {float} y - La position en ordonnée du projectile.
	 * @param {int} direction - -1 pour la gauche, 1 pour la droite
	 * @param {PlayerMetaEnum} casterId  - ID du personnage qui a lancé le projectile.
	 */
	constructor(x, y, direction, casterId) {        
        this.sprite = game.add.sprite(x, y, "projectile"); 
		this.sprite.anchor.setTo(0.5);
		
		if (direction < 0)
			this.sprite.angle = 180;
		
		this.sprite.scale.setTo(0.6);
        this.casterId = casterId;
		this.direction = direction;
    }
	
	/**
	 * A appeler dans l'update du game: routine du projecitle
	 * On avance jusqu'à toucher une cible
	 */
	update() 
	{
		this.sprite.x += projectileSpeed * this.direction * game.time.elapsed;
		
		for (var i=0; i < player.length; i++) {			
			// on saute si le joueur  est mort OU si le joueur est le lanceur du projectile
			if (player[i].hp <= 0 || player[i].id == this.casterId)
				continue; 
									
			if (this.sprite.left < player[i].player.body.right &&
				this.sprite.right > player[i].player.body.left &&
				this.sprite.top < player[i].player.body.bottom &&
				this.sprite.bottom > player[i].player.body.top) {					
					
					
					console.log("projectile touché");
					player[i].getDamage(projectileDamage);		
					
					return true;
			}
		}
	}
	
	destroy() {
		this.sprite.destroy();
	}
}