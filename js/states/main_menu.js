var MainMenu = {

    create: function () {
        
        game.stage.backgroundColor = '#182d3b';
        
        // LE TITRE
        var text = game.add.bitmapText(game.world.centerX, convertY(19.0), 'pixel', 'Map Selector', convertX(fontSize));
        text.anchor.setTo(.5,.5);
        
        // PLAY BUTTON
        var play = game.add.button(game.world.centerX, convertY(50), 'button', loadMapSelector, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
		play.width = convertX(40);
		play.height = convertY(20);
        var text = game.add.bitmapText(game.world.centerX, convertY(50), 'pixel', 'Play', convertX(fontSize));
        text.anchor.setTo(.5,.5);
        
        // CREDITS BUTTON
        var play = game.add.button(game.world.centerX, convertY(75), 'button', loadCredits, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
		play.width = convertX(30);
		play.height = convertY(15);
        var text = game.add.bitmapText(game.world.centerX, convertY(75), 'pixel', 'Credits', convertX(fontSize/2));
        text.anchor.setTo(.5,.5);
    },      
    
    update: function() {
        if (game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown || game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown) 
            loadPlayMenu();
    }
};