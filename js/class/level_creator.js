

class LevelCreator {		
    
	constructor(path) {
        this.path = path;
    }

    create() {
        platforms = game.add.group();
        platforms.enableBody = true;
        
        var map = JSON.parse(this.path);

        /*
        var bg = game.add.sprite(0, 0, "bg");	
        bg.width = width;
        bg.height = height;

        var ground = platforms.create(0, game.world.height, "ground");
        ground.width = width;
        ground.height = convertY(-38) * ratioY;
        ground.alpha = 0; // alpha, c'est la transparence de 0 à 1
        
        var bin = platforms.create(game.world.width - convertX(110), game.world.height - convertY(150), "recycle_bin");
        bin.scale.setTo(ratioX, ratioY);
        
        platforms.setAll('body.immovable', true);//*/
    }
}