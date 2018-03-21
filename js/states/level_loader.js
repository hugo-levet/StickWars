const theWay = "level/steven.json";

var LevelLoader = {

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        player = [];
        
        // ====
        // on créer les platforms
        var map = new LevelCreator("theWay");
        map.create();

        /*
        platforms = game.add.group();
        platforms.enableBody = true;
        
        var ground = platforms.create(0, game.world.height, "ground");
        ground.width = width;
        ground.height = convertY(-38) * ratioY;
        ground.alpha = 0; // alpha, c'est la transparence de 0 à 1
        
        var bin = platforms.create(game.world.width - convertX(110), game.world.height - convertY(150), "recycle_bin");
        bin.scale.setTo(ratioX, ratioY);
        
        platforms.setAll('body.immovable', true);
        
        var fct = function() {
            var explorer = platforms.create(convertX(300), convertY(200), "explorer_windows");                 
            explorer.body.immovable = true;
            explorer.scale.setTo(ratioX, ratioY);
            
            game.sound.play('click');
        }
        
        interactionsBox.push(new InteractionBox(convertX(75), game.world.height - convertY(135), convertX(45), convertY(41), "explorer", fct));
        //*/

        // on décode les fichiers audio .mp3
        footstep = game.add.audio('footstep');
        jump = game.add.audio('jump');
        tackle = game.add.audio('tackle');        
        
        // RETURN BUTTON
        // créer l'image du bouton
        var retour = game.add.button(0, 0, 'return', loadMainMenu, this, 2, 1, 0);
 
        // puis on pose un texte par dessus
        var text = game.add.bitmapText(40, 40, 'pixel', '<', 32);        

        // ====
        // On créer les joueurs
        for (var i=0; i < 3; i++) {
            //console.log("new PlayerMeta -> " + playerMeta[i].name);            
            player.push(new Player(width * Math.random(), game.world.height - convertY(180), playerMeta[i].id, playerMeta[i].tint));	                
        }
    
        console.log("player.length -> " + player.length);
            
    },
        
    update: function () {    
        
        //retour menu
        if (game.input.keyboard.addKey(Phaser.Keyboard.ESC).isDown) 
            loadMainMenu();
        for (var i=0; i < player.length; i++)
            player[i].update(platforms);
        
        // ====
        // SCORE SYSTEM
        var playersAlive = [];
        
        for (var i=0; i < player.length; i++) {
            if (player[i].hp > 0)
                playersAlive.push(player[i]);
        }               
        
        if (playersAlive.length == 1) {
            var idWinner = playersAlive[0].id;
            
            playerMeta[idWinner].score++;
            console.log("notre gagnant est " + playerMeta[idWinner].name);
            
            game.state.add('Score', Score);
            game.state.start('Score');
        }
    },
    
    render: function() {
    
        for (var i=0; i < player.length; i++) {
            if (player[i].hp > 0)
                game.debug.body(player[i].player);
        }               
    }
};

function loadMainMenu() {
    game.sound.play('click');
    
    game.state.add('MainMenu', MainMenu);
    game.state.start('MainMenu');
}