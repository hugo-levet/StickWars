var Game = {

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
            
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
        ground.height = convertY(-38);
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
        
        // on décode les fichiers audio .mp3
        footstep = game.add.audio('footstep');
        
        // ====
        // On créer les joueurs          
        for (var i=0; i < playerMeta.length; i++) {
            //console.log("new PlayerMeta -> " + playerMeta[i].name);
            
            if (playerMeta[i].enable) {
                player.push(new Player(width * Math.random(), game.world.height - convertY(180), playerMeta[i].id, playerMeta[i].tint));	    
            }
        }
    },
        
    update: function () {
        for (var i=0; i < player.length; i++)
            player[i].update(platforms);
        
        // Score System
        var playersAlive = [];
        
        for (var i=0; i < player.length; i++) {
            if (player[i].hp > 0)
                playersAlive.push(player[i]);
        }
        
        console.log("playersAlive.length -> " + playersAlive.length);
        
        if (playersAlive.length == 1) {
            var idWinner = playersAlive[0].id;
            
            playerMeta[idWinner].score++;
            console.log("notre gagnant est " + playerMeta[idWinner].name);
            
            game.state.add('Score', Score);
            game.state.start('Score');
        }
    },
};