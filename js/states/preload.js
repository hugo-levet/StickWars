// ici on pourrait rajouter une barre de chargement
var Preload = {
    
    // ici on charge toutes les ressources pour l'état actuel (images, sons, etc...)
    preload: function () {
		
		game.stage.backgroundColor = '#182d3b';      		
		
		// on créer la barre de chargement
		console.log("In preload state");
		
		var logo = game.add.sprite(game.world.centerX, game.world.centerY, "logo");
		logo.anchor.setTo(0.5);				
		
		var bgPreloadBar = game.add.sprite(game.world.centerX, convertY(85), "bg_preload_bar");		
		bgPreloadBar.anchor.setTo(0.5);				
		bgPreloadBar.width = width - convertX(5);		
		bgPreloadBar.height = convertY(10);
		
		var preloadBar = game.add.sprite(game.world.centerX, convertY(85), "preload_bar");		
		preloadBar.anchor.setTo(0.5);				
		preloadBar.width = width - convertX(5);		
		preloadBar.height = convertY(10);
		game.load.setPreloadSprite(preloadBar);
		
		// ====
		// CHARGEMENT DES SCRIPTS
		
		// LEVELS
		game.load.script("level_window", "level/windows.js");
		game.load.script("level_google", "level/google.js");
		
		// CLASSES
		game.load.script("player", "js/class/player.js");
		game.load.script("player_lobby", "js/class/player_lobby.js");		
		game.load.script("interaction_box", "js/class/interactionbox.js");
		game.load.script("projectile", "js/class/projectile.js");
		game.load.script("level_creator", "js/class/level_creator.js");
		
		// STATES
		game.load.script("main_menu", "js/states/main_menu.js");
		game.load.script("map_selector", "js/states/map_selector.js");
		game.load.script("lobby", "js/states/lobby.js");
		game.load.script("game", "js/states/game.js");
		game.load.script("score", "js/states/score.js");
		game.load.script("credits_menu", "js/states/credits_menu.js");
		
		// ====
		// CHARGEMENT ASSETS
        game.load.image("window", "assets/img/windows/bg.png"); // ici bg signifie le fond d"écran
        game.load.image("firefox", "assets/img/google/bg.png");
        game.load.image("recycle_bin", "assets/img/windows/recycle_bin_full.png");                  
        game.load.image("explorer", "assets/img/windows/explorer.png");   
        game.load.image("explorer_windows", "assets/img/windows/explorer_windows.png"); 
		game.load.image("projectile", "assets/img/projectile.png"); 
        
        game.load.image("button", "assets/img/button.png");   
        game.load.image("return", "assets/img/return.png");        
        game.load.image("ground", "assets/img/windows/platform.png"); 

        game.load.audio('footstep', 'assets/audio/footstep_run.mp3');
        game.load.audio('jump', 'assets/audio/jump.mp3');
        game.load.audio('tackle', 'assets/audio/tackle.mp3');
        game.load.audio('click', 'assets/audio/button_click.mp3');
        game.load.audio('lobby', 'assets/audio/lobby_count.mp3');
        
        game.load.bitmapFont('pixel', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');        
        game.load.atlasJSONHash("stickman", "assets/img/stickman/atlas.png", "assets/img/stickman/data.json");    
    },   
    
    create: function () { 
        // c'est les vestiges d'un ancien code
		/*attackBox.width = attackBox.width;
        attackBox.height = attackBox.height;
        attackBox.x = attackBox.x;
        attackBox.y = attackBox.y;
        
        normalBox.width = normalBox.width;
        normalBox.height = normalBox.height;
        normalBox.x = normalBox.x;
        normalBox.y = normalBox.y;//*/
        
        // on créer les contrôles des joueurs
        controls.push({
            up: game.input.keyboard.addKey(Phaser.Keyboard.Z),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.Q),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.E),
			projectile: game.input.keyboard.addKey(Phaser.Keyboard.A)
        });
        
        controls.push({
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
            down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0),
			projectile: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1)
        });
        
        controls.push({
            up: game.input.keyboard.addKey(Phaser.Keyboard.O),
            down: game.input.keyboard.addKey(Phaser.Keyboard.L),
            left: game.input.keyboard.addKey(Phaser.Keyboard.K),
            right: game.input.keyboard.addKey(Phaser.Keyboard.M),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.P),
			projectile: game.input.keyboard.addKey(Phaser.Keyboard.I)
        });
        
        controls.push({
            up: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8),
            down: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5),
            left: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4),
            right: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9),
			projectile: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7)
        });
        
        loadMainMenu();
    }
    
};
