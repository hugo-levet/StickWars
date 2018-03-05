const timeBeforeGame = 5;

var Lobby = {

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
        this.playerLobby = [];
        this.playerLobby.push(new PlayerLobby(game.world.centerX/2, game.world.centerY/2, PlayerMetaEnum.BLUE, "Z"));
        this.playerLobby.push(new PlayerLobby(game.world.centerX * 1.5, game.world.centerY/2, PlayerMetaEnum.RED, "Y"));
        this.playerLobby.push(new PlayerLobby(game.world.centerX/2, game.world.centerY * 1.5, PlayerMetaEnum.GREEN, "O",));
        this.playerLobby.push(new PlayerLobby(game.world.centerX * 1.5, game.world.centerY * 1.5, PlayerMetaEnum.YELLOW, "8(numpad)"));
        
        this.count_sound = game.sound.play('lobby');
        this.count_sound.stop();
    },
    
    update: function () {              
        
        // CALCUL & AFFICHAGE DU TIMER
        this.time -= game.time.elapsed/1000;
        this.text.setText(Math.round(this.time));
        
        // GESTION DU SON
        if (this.time <= 4 && !this.count_sound.isPlaying)
            this.count_sound.play();
        
        // quand le temps est à 0, on lance la game
        if (this.time <= 0) {
            for (var i=0; i < this.playerLobby.length; i++) {                
                if (this.playerLobby[i].hasJoinedTheGame)
                    playerMeta[i].enable = true;
            }            
            
            game.state.add('Game', Game);
            game.state.start('Game');
        }
        
        // GESTION DES PLAYERS DANS LE LOBBY
        for (var i=0; i < this.playerLobby.length; i++) 
            this.playerLobby[i].update(this.borders);
    }
};
