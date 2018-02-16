const timeBeforeGame = 10;

var Lobby = {
    
    // on va charger les images utilisés pour le menu
    preload: function () {
        game.load.image("button", "assets/img/button.png");        
        game.load.image("ground", "assets/img/platform.png"); 

        game.load.bitmapFont('pixel', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        game.load.atlasJSONHash("player", "assets/img/player/texture.png", "assets/img/player/data.json");        
    },

    create: function () {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#182d3b';
               
        
        // ====
        // une ligne horizontal & verticale
        this.borders = game.add.group();
        this.borders.enableBody = true;
        
        var horizontal = this.borders.create(game.world.centerX, 0, "ground");
        horizontal.width = 50;
        horizontal.height = height; 
        horizontal.anchor.set(0.5, 0);                       
        
        var vertical = this.borders.create(0, game.world.centerY, "ground");
        vertical.width = width;
        vertical.height = 50;     
        vertical.anchor.set(0, 0.5);                   
                
        this.borders.setAll('body.immovable', true);
        
        // ====
        // chronomètre avant le lancement de la game
        this.time = timeBeforeGame;
        this.text = game.add.bitmapText(game.world.centerX, game.world.centerY, 'pixel', this.time, 16);
        this.text.anchor.setTo(.5,.5); 
        
        // ====
        // on ajoute les joueurs
        playerLobby.push(new PlayerLobby(game.world.centerX/2, game.world.centerY/2, controls[0], "Z"));
        playerLobby.push(new PlayerLobby(game.world.centerX * 1.5, game.world.centerY/2, controls[1], "Y"));
        playerLobby.push(new PlayerLobby(game.world.centerX/2, game.world.centerY * 1.5, controls[2], "O",));
        playerLobby.push(new PlayerLobby(game.world.centerX * 1.5, game.world.centerY * 1.5, controls[3], "8(numpad)"));
    },
    
    update: function () {
        
        this.time -= game.time.elapsed/1000;
        this.text.setText(Math.round(this.time));
        
        // quand le temps est à 0, on lance la game
        if (this.time <= 0) {
            for (var i=0; i < playerLobby.length; i++) {
                if (playerLobby[i].hasJoinedTheGame)
                    plyJoinedTheGame.push(i);
            }
            
            
            game.state.add('Game', Game);
            game.state.start('Game');
        }
                    
        for (var i=0; i < playerLobby.length; i++) 
            playerLobby[i].update(this.borders);
    }
};
