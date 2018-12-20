
const floatingTextUpdateTime = 50;

class FloatingText {		
    
    /**
     * Créer un texte qui va tomber et disparaitre petit à petit.
     * @constructor
     * @param {float} x - La position en abcisse du texte.
     * @param {float} y - La position en ordonnée du texte.
     * @param {string} text - Le texte à afficher.
     */
	constructor(x, y, text) {   
        
        this.offsetX = x;
        this.offsetY = y;
        this.time = 0;

        this.text = game.add.text(x, y, text, styleFloatingText);
        this.text.anchor.setTo(.5,.5);
    }

    /**
     * Met à jour la position et l'alpha du text.
     */
    update() 
    {
        var deltaTime = game.time.elapsed/1000;
        this.time += deltaTime;
        this.text.alpha -= 1.3 * deltaTime;  

        if (this.text.alpha < 0.1)
            this.text.destroy();
            
        this.text.x = this.offsetX + (this.time) * 80;
        this.text.y = this.offsetY + (4.3 * ((this.time - 0.4) * (this.time - 0.4)) - 0.4) * 80;//*/
    }
}