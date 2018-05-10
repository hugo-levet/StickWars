const timeLobby = 0.1;

var Lobby = {

    create: function () {
        
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#182d3b';              
        
        // ====
        // on créer une plateforme horizontal & verticale
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
        this.time = timeLobby;
        this.text = game.add.bitmapText(game.world.centerX, game.world.centerY, 'pixel', "Waiting for players", convertX(fontSize/2));
        this.text.anchor.setTo(.5,.5); 
        
        // ====
        // on ajoute les joueurs
        this.playerLobby = [];
        this.playerLobby.push(new PlayerLobby(game.world.centerX/2, game.world.centerY/2, PlayerMetaEnum.BLUE, "Z", "touches p1"));
        this.playerLobby.push(new PlayerLobby(game.world.centerX * 1.5, game.world.centerY/2, PlayerMetaEnum.RED, "UP", "touches p2"));
        this.playerLobby.push(new PlayerLobby(game.world.centerX/2, game.world.centerY * 1.5, PlayerMetaEnum.GREEN, "O", "touches p3"));
        this.playerLobby.push(new PlayerLobby(game.world.centerX * 1.5, game.world.centerY * 1.5, PlayerMetaEnum.YELLOW, "8(numpad)", "touches p4"));
        
        this.count_sound = game.sound.play('lobby');
        this.count_sound.stop();
		
		// RETURN BUTTON
        var retour = game.add.button(0, 0, 'return', loadMainMenu, this, 2, 1, 0);
        var text = game.add.bitmapText(40, 40, 'pixel', '<', 32);                
    },
    
    update: function () {
        
        //retour menu
        if (game.input.keyboard.addKey(Phaser.Keyboard.ESC).isDown) 
            loadMainMenu();
        
		for (var i=0; i < projectiles.length; i++) {			
			// la fonction update renvoie true quand le projectile a touché un truc
			// si elle renvoie true, alors on supprime le projectile
			if (projectiles[i].update()) {
				projectiles[i].destroy();
				projectiles.splice(i, i+1);					
			}
		}
		
		// GESTION DES PLAYERS DANS LE LOBBY
        for (var i=0; i < this.playerLobby.length; i++) 
            this.playerLobby[i].update(this.borders);   
		
        // ON CALCULE LE NOMRBE DE JOUEUR DANS LE LOBBY
        var countPlayerJoinLobby = 0;
                
        if (this.time == timeLobby) // on calcule seulement si le chrono n'a pas été déclenché
            for (var i=0; i < this.playerLobby.length; i++)                    
                if (this.playerLobby[i].lobbyJoined)
                    countPlayerJoinLobby++;            
        
        
        // CALCUL & AFFICHAGE DU TIMER 
        if (this.time != timeLobby || countPlayerJoinLobby >= 2) {
            this.time -= game.time.elapsed/1000;
            this.text.setText(Math.round(this.time));
        }
        
        // GESTION DU SON
        if (this.time <= 4 && !this.count_sound.isPlaying)
            this.count_sound.play();
        
        
        // LANCEMENT DE LA GAME
        if (this.time <= 0) {
			this.count_sound.stop();
			
            game.state.add('Game', Game);
            game.state.start('Game');
        }                          
    }
};