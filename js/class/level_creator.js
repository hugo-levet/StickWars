

class LevelCreator {		
    
	constructor(data) {
        this.data = data;
    }

    create() {
        platforms = game.add.group();
        platforms.enableBody = true;        
        
        console.log("Building level...");
        var map = this.data;        
        
        for (var i=0; i < map.plateforms.length; i++) {
            console.log("level: building " + map.plateforms[i].sprite);
            
            var sprite;
            
            switch (map.plateforms[i].type) {
                
                case PlateformsEnum.COLLIDER:            
                    sprite = platforms.create(0, 0, map.plateforms[i].sprite);
                    break;
                
                case PlateformsEnum.DECO:
                    sprite = game.add.sprite(0, 0, map.plateforms[i].sprite);	
                    break;
                
                case PlateformsEnum.INTERACTION:
                    var box = new InteractionBox(0, 0, 0, 0, map.plateforms[i].sprite, map.plateforms[i].function);       
                    interactionsBox.push(box);                    
                    sprite = box.sprite; // on récupère le sprite de l'interactionsBox
                    break;
            }            
            
            sprite.x = map.plateforms[i].x * width / 100;
            sprite.y = map.plateforms[i].y * height / 100;
            sprite.width = map.plateforms[i].w * width / 100;
            sprite.height = map.plateforms[i].h * height / 100;
        }
        
        console.log("Level successfully build ! 👍 \n\n");
        
        platforms.setAll('body.immovable', true);               
    }
}