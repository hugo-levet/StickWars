

// ici on pourrait rajouter une barre de chargement
var Preload = {
    
    // ici on charge toutes les ressources pour l'état actuel (images, sons, etc...)
    preload: function() {        
        game.load.image("bg", "assets/img/world/bg.png"); // ici bg signifie le fond d"écran	                   
        game.load.image("recycle_bin", "assets/img/world/recycle_bin_full.png");                  
        game.load.image("explorer", "assets/img/world/explorer.png");   
        game.load.image("explorer_windows", "assets/img/world/explorer_windows.png"); 
        
        game.load.image("button", "assets/img/button.png");        
        game.load.image("ground", "assets/img/world/platform.png"); 

        game.load.audio('footstep', 'assets/audio/footstep_run.mp3');
        game.load.audio('click', 'assets/audio/button_click.mp3');
        game.load.audio('lobby', 'assets/audio/lobby_count.mp3');
        
        game.load.bitmapFont('pixel', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        game.load.atlasJSONHash("player", "assets/img/player/texture.png", "assets/img/player/data.json");    
        game.load.atlasJSONHash("stickman", "assets/img/stickman/atlas.png", "assets/img/stickman/data.json");    
    },   
    
    create: function () { 
        highAttackBox.width = convertX(highAttackBox.width);
        highAttackBox.height = convertY(highAttackBox.height);
        highAttackBox.x = convertX(highAttackBox.x);
        highAttackBox.y = convertX(highAttackBox.y);
        
        // on créer les contrôles des joueurs
        var controls1 = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.Z),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.Q),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.E)
        };
        
        var controls2 = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.Y),
            down: game.input.keyboard.addKey(Phaser.Keyboard.H),
            left: game.input.keyboard.addKey(Phaser.Keyboard.G),
            right: game.input.keyboard.addKey(Phaser.Keyboard.J),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.U)
        };
        
        var controls3 = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.O),
            down: game.input.keyboard.addKey(Phaser.Keyboard.L),
            left: game.input.keyboard.addKey(Phaser.Keyboard.K),
            right: game.input.keyboard.addKey(Phaser.Keyboard.M),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.P)
        };
        
        var controls4 = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8),
            down: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5),
            left: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4),
            right: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9)
        };
        
        controls.push(controls1);
        controls.push(controls2);
        controls.push(controls3);
        controls.push(controls4);
    
        // on lance le menu
        game.state.add('MainMenu', MainMenu);
        game.state.start('MainMenu');
    }
    
};