

class InteractionBox {		
    
	constructor(x, y, width, height, icon, hitFunction) {        
        this.hitFunction = hitFunction;
        this.trigger = false;
        
        this.sprite = game.add.sprite(x, y, icon);        
        this.sprite.width = width;
        this.sprite.height = height; 
    }
    
    hit() {               
        if (this.trigger)
            return;
        
        console.log("Hit function called");
        
        this.trigger = true;        
        this.hitFunction();        
    }
}