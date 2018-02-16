//
// Cette classe s'instantie dans le lobby
// Elle 

class PlayerLobby {	
	
	constructor(x, y, controls, key) {
        this.text = game.add.bitmapText(x, y, 'pixel', "Hold " + key + " to join the game", 16);
        this.text.anchor.setTo(.5,.5); 

        this.radialProgressBar = game.add.graphics(x, y);
        this.radialProgressBar.lineStyle(32, 0xff0000);
        
        this.key = key;
        
        this.angle = 0; 
        this.hasJoinedTheGame = false;
        
        this.controls = controls;
        
        this.x = x;
        this.y = y;
    }
    
    update(platform) {
        if (this.hasJoinedTheGame) {
            this.player.update(platform);
            
            return;
        }
            
        if (this.controls.up.isDown) {
            this.angle += 4;
            
            // on charge le joueur
            if (this.angle > 360) {
                this.hasJoinedTheGame = true;
                
                this.radialProgressBar.destroy();
                this.text.destroy();
                
                this.player = new Player(this.x, this.y, this.controls, "player", 0xFFFFFF);
            }
        }            
        else if (this.angle > 0) {           
            this.angle -= 2;
        }
        
        // Update Loading
        this.radialProgressBar.clear();
        this.radialProgressBar.lineStyle(16, 0xffffff);
        
        this.radialProgressBar.lineColor = Phaser.Color.interpolateColor(0xff0000, 0x80ff00, 360, this.angle, 1, 1);

        this.radialProgressBar.arc(0, 0, 60, 0, game.math.degToRad(this.angle), false);
        this.radialProgressBar.endFill();
    
    }
}