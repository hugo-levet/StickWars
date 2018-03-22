var Game = {

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
            
        //  This sets a limit on the up-scale
        //  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
        game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.setShowAll();
        game.scale.refresh(); 
                
        var bg = game.add.sprite(0, 0, "bg");	
        bg.width = width;
        bg.height = height;
           
        player = [];
           
        // ====
        // on créer les platforms
        platforms = game.add.group();
        platforms.enableBody = true;
        
        var ground = platforms.create(0, game.world.height, "ground");
        ground.width = width;
        ground.height = convertY(-2.26) * ratioY;
        ground.alpha = 0; // alpha, c'est la transparence de 0 à 1
        
        var bin = platforms.create(game.world.width - convertX(6.55), game.world.height - convertY(14.3), "recycle_bin");                     
        bin.scale.setTo(ratioX, ratioY);
        
        platforms.setAll('body.immovable', true);
        
        var fct = function() {
            var explorer = platforms.create(convertX(17.9), convertY(19.0), "explorer_windows");    
            explorer.body.immovable = true;	  
            explorer.scale.setTo(ratioX, ratioY);
            
            game.sound.play('click');
        }
        
        interactionsBox.push(new InteractionBox(convertX(4.46), game.world.height - convertY(12.9), convertX(2.68), convertY(3.91), "explorer", fct));
        
        // on décode les fichiers audio .mp3
        footstep = game.add.audio('footstep');
        jump = game.add.audio('jump');
        tackle = game.add.audio('tackle');
        
        // ====
        // On créer les joueurs          
        for (var i=0; i < playerMeta.length; i++) 
            if (playerMeta[i].enable) 
                player.push(new Player(width * Math.random(), game.world.height - convertY(180), playerMeta[i].id, playerMeta[i].tint));	    
        
        // RETURN BUTTON
        var retour = game.add.button(0, 0, 'return', loadMainMenu, this, 2, 1, 0);
        var text = game.add.bitmapText(40, 40, 'pixel', '<', 32);        
    },
        
    update: function () {    
        
        // RETOUR MENU
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
        // on affiche les collisions box des joueurs
        for (var i=0; i < player.length; i++) {
            if (player[i].hp > 0)
                game.debug.body(player[i].player);
        }               
    }
};