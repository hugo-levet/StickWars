var Game = {

    preload: function () {
        game.load.image("bg", "img/bg.png"); // ici bg signifie le fond d"écran	
        game.load.image("ground", "img/platform.png");
        
        // https://www.codeandweb.com/texturepacker/tutorials/creating-spritesheets-for-phaser-with-texturepacker
        game.load.atlasJSONHash("player", "img/player/texture.png", "img/player/data.json");
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
        ground.height = -43;
        ground.alpha = 0.2;
        ground.body.immovable = true;	
        
        var searchBar = platforms.create(528, 345, "ground");
        searchBar.width = 638;
        searchBar.height = 49;
        searchBar.alpha = 0.2;
        searchBar.body.immovable = true;
            
        // ====
        // The player and its settings
        var controls1 = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.Z),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.Q),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.E)
        };
        
        player.push(new Player(controls1, "ply1", 0xbbbbff));	

        // ====
        // The player and its settings
        var controls2 = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.O),
            down: game.input.keyboard.addKey(Phaser.Keyboard.L),
            left: game.input.keyboard.addKey(Phaser.Keyboard.K),
            right: game.input.keyboard.addKey(Phaser.Keyboard.M),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.P)
        };
        
        player.push(new Player(controls2, "ply2", 0xffa5a5));      
    },
    
    update: function () {
        for (var i=0; i < player.length; i++) {
            game.debug.body(player[i].player);
            player[i].update();
        }
    },
};