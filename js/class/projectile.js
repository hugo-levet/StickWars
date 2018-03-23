const projectileSpeed = 2;
const projectileDamage = 1;

class Projectile {		
    
	// casterId est l'id du joueur qui a lancé le projectile
	constructor(x, y, direction, casterId) {        
        this.sprite = game.add.sprite(x, y, "projectile"); 
		this.sprite.width *= direction;
		
        this.casterId = casterId;
		this.direction = direction;
    }
	
	update() {
		this.sprite.x += projectileSpeed * this.direction * game.time.elapsed;
		
		for (var i=0; i < player.length; i++) {			
			// on saute le joueur si il est mort OU si le joueur est le lanceur du projectile
			if (player[i].hp <= 0 || player[i].id == this.casterId)
				continue; 
									
			if (this.sprite.left < player[i].player.body.right &&
				this.sprite.right > player[i].player.body.left &&
				this.sprite.top < player[i].player.body.bottom &&
				this.sprite.bottom > player[i].player.body.top) {					
					
					player[i].getDamage(projectileDamage);						
			}
		}
	}
}