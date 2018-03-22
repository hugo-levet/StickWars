

class InteractionBox {		
    
	constructor(x, y, width, height, icon, hitFunction) {
        this.rect = {
            x: x, 
            y: y, 
            width:  width, 
            height: height
        };
        
        this.hitFunction = hitFunction;
        this.trigger = false;
        
        var sprite = game.add.sprite(x, y, icon);        
        sprite.width = width;
        sprite.height = height; 
    }
    
    hit() {
        if (!this.trigger)
            this.hitFunction();
    }
}