

// ici on pourrait rajouter une barre de chargement
var Preload = {
    
    // ici on charge toutes les ressources pour l'état actuel (images, sons, etc...)
    preload: function () {
        game.load.image("bg", "assets/img/world/bg.png"); // ici bg signifie le fond d"écran	                   
        game.load.image("recycle_bin", "assets/img/world/recycle_bin_full.png");                  
        game.load.image("explorer", "assets/img/world/explorer.png");   
        game.load.image("explorer_windows", "assets/img/world/explorer_windows.png"); 
        
        game.load.image("button", "assets/img/button.png");   
        game.load.image("return", "assets/img/return.png");        
        game.load.image("ground", "assets/img/world/platform.png"); 

        game.load.audio('footstep', 'assets/audio/footstep_run.mp3');
        game.load.audio('click', 'assets/audio/button_click.mp3');
        game.load.audio('lobby', 'assets/audio/lobby_count.mp3');
        
        game.load.bitmapFont('pixel', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');        
        game.load.atlasJSONHash("stickman", "assets/img/stickman/atlas.png", "assets/img/stickman/data.json");    
    },   
    
    create: function () { 
        highAttackBox.width = convertX(highAttackBox.width);
        highAttackBox.height = convertY(highAttackBox.height);
        highAttackBox.x = convertX(highAttackBox.x);
        highAttackBox.y = convertY(highAttackBox.y);
        
        normalBox.width = convertX(normalBox.width);
        normalBox.height = convertY(normalBox.height);
        normalBox.x = convertX(normalBox.x);
        normalBox.y = convertY(normalBox.y);
        
        // on créer les contrôles des joueurs
        controls.push({
            up: game.input.keyboard.addKey(Phaser.Keyboard.Z),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.Q),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.E)
        });
        
        controls.push({
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
            down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0)
        });
        
        controls.push({
            up: game.input.keyboard.addKey(Phaser.Keyboard.O),
            down: game.input.keyboard.addKey(Phaser.Keyboard.L),
            left: game.input.keyboard.addKey(Phaser.Keyboard.K),
            right: game.input.keyboard.addKey(Phaser.Keyboard.M),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.P)
        });
        
        controls.push({
            up: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8),
            down: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5),
            left: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4),
            right: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9)
        });
        
        // on lance le menu
        game.state.add('MainMenu', MainMenu);
        game.state.start('MainMenu');
    }
    
};
