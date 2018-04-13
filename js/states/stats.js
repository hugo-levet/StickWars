var Stats = {

    create: function () {        
	
		// RETOUR BUTTON
        var retour = game.add.button(0, 0, 'return', loadMainMenu, this, 2, 1, 0);
        var text = game.add.bitmapText(40, 40, 'pixel', '<', 32);
		
		// LE TITRE
        var text = game.add.bitmapText(game.world.centerX, convertY(19.0), 'pixel', 'Statistiques', convertX(fontSize));
        text.anchor.setTo(.5,.5);
				
		// NOMBRE PARTIES
		var gameNumber = localStorage.getItem("gameNumber");
        var text = game.add.bitmapText(game.world.centerX, convertY(25), 'pixel', 'Nombre de parties: ' + gameNumber, convertX(fontSize-2));
        text.anchor.setTo(.5,.5);
		
		// NOMBRE PARTIES
		var stickmanKilled = localStorage.getItem("stickmanKilled")
        var text = game.add.bitmapText(game.world.centerX, convertY(28), 'pixel', 'Stickman tues: ' + stickmanKilled, convertX(fontSize-2));
        text.anchor.setTo(.5,.5);
    },      
    
    update: function () {        
        //retour menu
        if (game.input.keyboard.addKey(Phaser.Keyboard.ESC).isDown) 
            loadMainMenu();        
    }
};