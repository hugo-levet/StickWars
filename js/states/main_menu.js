var MainMenu = {

    create: function () {
        
        game.stage.backgroundColor = '#2a2b50';
        
        // LE TITRE		
		var text = game.add.text(game.world.centerX, convertY(19.0), "StickWars", styleTitle);
		text.anchor.setTo(.5,.5);
		text.resolution = 3;
        
        // PLAY BUTTON
        var play = game.add.button(game.world.centerX, convertY(50), 'play', loadMapSelector, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
		play.width = convertX(40);
		play.height = convertY(20);
        
        // CREDITS BUTTON
        var play = game.add.button(game.world.centerX, convertY(72), 'credits', loadCredits, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
		play.width = convertX(30);
		play.height = convertY(13);
		
		// STATISTIQUES BUTTON
        var play = game.add.button(game.world.centerX, convertY(90), 'stats', loadStats, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
		play.width = convertX(30);
		play.height = convertY(13);
    },      
    
    update: function() {
        if (game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown || game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown) 
            loadMapSelector();
    }
};