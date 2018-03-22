//
// Cette classe s'instantie dans le lobby
// Gère les entrées du joueur dans le lobby

const joinSpeed = 8;

class PlayerLobby {	
	
	constructor(x, y, id, key) {
        
        this.x = x;
        this.y = y;      
        this.id = id;
        this.controls = controls[id];        
        
        this.angle = 0; 
        this.lobbyJoined = false;              

        this.text = game.add.bitmapText(x, y, 'pixel', "Hold " + key + " to join the game", convertX(fontSize/3));
        this.text.anchor.setTo(.5,.5); 

        this.radialProgressBar = game.add.graphics(x, y);
        this.radialProgressBar.lineStyle(32, 0xff0000);                       
    }
    
    update(platform) {
        
        if (this.lobbyJoined) {
            this.player.update(platform);
            
            return;
        }
            
        if (this.controls.up.isDown) {
            this.angle += joinSpeed;
            
            // on charge le joueur
            if (this.angle > 360) {
                this.lobbyJoined = true;
                playerMeta[this.id].enable = true;
                
                this.radialProgressBar.destroy();
                this.text.destroy();
                
                // on créer un joueur dans le lobby
                this.player = new Player(this.x, this.y, this.id, playerMeta[this.id].tint);
            }
        }            
        else if (this.angle > 0) {           
            this.angle -= 2;
        }
        
        // ===
		// MAJ DU CERCLE DE CHARGEMENT
        this.radialProgressBar.clear();
        this.radialProgressBar.lineStyle(16, 0xffffff);
        
        this.radialProgressBar.lineColor = Phaser.Color.interpolateColor(0xff0000, 0x80ff00, 360, this.angle, 1, 1);

        this.radialProgressBar.arc(0, 0, 60, 0, game.math.degToRad(this.angle), false);
        this.radialProgressBar.endFill();    
    }
}