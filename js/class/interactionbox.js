

class InteractionBox {		
    
    /**
     * Permet de créer des objets interactibles qui active une action.
     * @constructor
     * @param {float} x - La position en abcisse de la boîte de collision.
     * @param {float} y - La position en ordonnée de la boîte de collision.
     * @param {float} width - La largeur de la boîte de collision.
     * @param {float} height - La hauteur de la boîte de collision.
     * @param {sprite} icon - L'image de la boîte de collision.
     * @param {functon} hitFunction - La fonction qui sera appelé quand la boîte de collision sera activée.
     */
	constructor(x, y, width, height, icon, hitFunction) {        
        this.hitFunction = hitFunction;
        this.trigger = false;
        
        this.sprite = game.add.sprite(x, y, icon);        
        this.sprite.width = width;
        this.sprite.height = height; 
    }
    
    /**
     * Active la fonction hitFunction() si elle n'a pas été déjà activée.
     */
    hit() 
    {               
        if (this.trigger)
            return;
        
        console.log("Hit function called");
        
        this.trigger = true;        
        this.hitFunction();        
    }
}