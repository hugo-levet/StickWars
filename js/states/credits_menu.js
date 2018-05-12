var Credits = {

    create: function () {
        
        // RETOUR BUTTON
        var retour = game.add.button(0, 0, 'return', loadMainMenu, this, 2, 1, 0);
        var text = game.add.bitmapText(40, 40, 'pixel', '<', 32);
        
        // LES CREDITS
		var gameArt2D = game.add.text(game.world.centerX, convertY(30), "Game Art 2D", styleP);
		gameArt2D.anchor.setTo(.5,.5);
        gameArt2D.resolution = 3;
		
        var allSounds = game.add.text(game.world.centerX, convertY(50), 'All Sounds [Youtube]', styleP);
        allSounds.anchor.setTo(.5,.5);
		allSounds.resolution = 3;
		
		var notEven = game.add.text(game.world.centerX, convertY(70), 'Not Even Entertainment [Youtube]', styleP);
        notEven.anchor.setTo(.5,.5);
		notEven.resolution = 3;
    },      
    
    update: function () {        
        //retour menu
        if (game.input.keyboard.addKey(Phaser.Keyboard.ESC).isDown) 
            loadMainMenu();        
    }
};
