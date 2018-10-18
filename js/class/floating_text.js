
const floatingTextUpdateTime = 50;

class FloatingText {		
    
	constructor(x, y, text) {   
        
        this.offsetX = x;
        this.offsetY = y;
        this.time = 0;

        this.text = game.add.text(x, y, text, styleFloatingText);
        this.text.anchor.setTo(.5,.5);

        /*this.textSprite = game.add.sprite(x, y, null);
        this.textSprite.addChild(this.text);
        game.physics.enable(this.textSprite, Phaser.Physics.ARCADE);

        this.textSprite.body.bounce.y = 1;
        this.textSprite.body.gravity.y = 2000;
        this.textSprite.body.gravity.setTo(0, 1700);
        this.textSprite.body.collideWorldBounds = true;
        this.textSprite.body.velocity.setTo(400, 400);//*/
    }

    update() {
        var deltaTime = game.time.elapsed/1000;
        this.time += deltaTime;
        this.text.alpha -= 1.3 * deltaTime;  

        if (this.text.alpha < 0.1)
            this.text.destroy();
            
        this.text.x = this.offsetX + (this.time) * 80;
        this.text.y = this.offsetY + (4.3 * ((this.time - 0.4) * (this.time - 0.4)) - 0.4) * 80;//*/
    }
}