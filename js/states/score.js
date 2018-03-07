const scoreDurationDisplay = 3;

var Score = {

    create: function () {
        
        // === 
        // ON AFFICHE LES SCORES
        var enabledPlayer = [];
        
        // on extrait les joueurs qui ont rejoint le lobby
        for (var i=0; i < playerMeta.length; i++)  {
            if (playerMeta[i].enable) 
                enabledPlayer.push(playerMeta[i]);
        }
        
        for (var i=0; i < enabledPlayer.length; i++) {
            game.add.bitmapText(game.world.centerX - convertX(300), game.world.centerY + convertY(50) * i, 'pixel', enabledPlayer[i].name, 16);
            game.add.bitmapText(game.world.centerX + convertX(50), game.world.centerY + convertY(50) * i, 'pixel', enabledPlayer[i].score.toString(), 16);            
        }
        
        // ===
        // ON S'OCCUPE DU CHRONO
        this.time = scoreDurationDisplay;
        
        this.text = game.add.bitmapText(game.world.width - convertX(50), game.world.centerY, 'pixel', this.time, 16);
        this.text.anchor.setTo(.5,.5);         
    },
        
    update: function () {
        
        // compteur avant la reprise du jeu        
        this.time -= game.time.elapsed/1000;        
        this.text.setText(Math.round(this.time));
        
        if (this.time <= 0) {             
            game.state.add('Game', Game);
            game.state.start('Game');               
        }    
    },
};