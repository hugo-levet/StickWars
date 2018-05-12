var Stats = {

    create: function () {        
	
		// RETOUR BUTTON
        var retour = game.add.button(0, 0, 'return', loadMainMenu, this, 2, 1, 0);
        var text = game.add.bitmapText(40, 40, 'pixel', '<', 32);
		
		// LE TITRE
        var title = game.add.text(game.world.centerX, convertY(19.0), 'Statistiques', styleTitle);
        title.anchor.setTo(.5,.5);
		title.resolution = 3;
				
		// NOMBRE PARTIES
		var gameNumber = localStorage.getItem("gameNumber");
        var games = game.add.text(game.world.centerX, convertY(55), 'Nombre de parties: ' + gameNumber, styleP);
        games.anchor.setTo(.5,.5);
		games.resolution = 3;
		
		// NOMBRE KILL
		var stickmanKilled = localStorage.getItem("stickmanKilled")
        var killed = game.add.text(game.world.centerX, convertY(65), 'Stickman tués: ' + stickmanKilled, styleP);
        killed.anchor.setTo(.5,.5);
		killed.resolution = 3;
    },      
    
    update: function () {        
        //retour menu
        if (game.input.keyboard.addKey(Phaser.Keyboard.ESC).isDown) 
            loadMainMenu();        
    }
};