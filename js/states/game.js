var Game = {

    preload: function () {
        game.load.image("bg", "assets/img/bg.png"); // ici bg signifie le fond d"écran	                   
        game.load.image("recycle_bin", "assets/img/recycle_bin_full.png");   
        
        
        game.load.image("explorer", "assets/img/explorer.png");   
        game.load.image("explorer_windows", "assets/img/explorer_windows.png");  
        
        game.load.atlasJSONHash("player", "assets/img/player/texture.png", "assets/img/player/data.json");
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
            
        var bg = game.add.sprite(0, 0, "bg");	
        bg.width = width;
        bg.height = height;
           
        // ====
        // on créer les platforms
        platforms = game.add.group();
        platforms.enableBody = true;
        
        var ground = platforms.create(0, game.world.height, "ground");
        ground.width = width;
        ground.height = convertY(-38);
        ground.alpha = 0; // alpha, c'est la transparence de 0 à 1
        
        var bin = platforms.create(game.world.width - convertX(110), game.world.height - convertY(150), "recycle_bin");                     
        bin.scale.setTo(ratioX, ratioY);
        
        platforms.setAll('body.immovable', true);
        
        var fct = function() {
            var explorer = platforms.create(convertX(300), convertY(200), "explorer_windows");    
            explorer.body.immovable = true;	  
            explorer.scale.setTo(ratioX, ratioY);
        }
        
        interactionsBox.push(new InteractionBox(convertX(213), game.world.height - convertY(28), convertX(26), convertY(21), "explorer", fct));
        
        // ====
        // The player and its settings
        player.push(new Player(width * Math.random(), game.world.height - 180, controls[0], "ply1", 0xbbbbff));	
        player.push(new Player(width * Math.random(), game.world.height - 180, controls[1], "ply2", 0xffa5a5));      
    },
        
    update: function () {
        for (var i=0; i < player.length; i++) {
            player[i].update(platform);
        }
    },
};