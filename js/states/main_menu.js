var MainMenu = {

    create: function () {
        
        game.stage.backgroundColor = '#182d3b';
                
        // Le titre
        var text = game.add.bitmapText(game.world.centerX, convertY(200), 'pixel', 'StickWars', convertY(32));
        text.anchor.setTo(.5,.5);
        
        
        // PLAY BUTTON
        // créer l'image du bouton
        var play = game.add.button(game.world.centerX, convertY(400), 'button', loadPlayMenu, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
        play.scale.setTo(ratioX, ratioY);
        //play.height = convertY(play.height);
        
        // puis on pose un texte par dessus
        var text = game.add.bitmapText(game.world.centerX, convertY(400), 'pixel', 'Play', convertY(32));
        text.anchor.setTo(.5,.5);
        
        // CREDITS BUTTON
        // créer l'image du bouton
        var play = game.add.button(game.world.centerX, convertY(550), 'button', loadCredits, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
        play.scale.setTo(ratioX, ratioY);
        
        // puis on pose un texte par dessus
        var text = game.add.bitmapText(game.world.centerX, convertY(550), 'pixel', 'Credits', convertY(32));
        text.anchor.setTo(.5,.5);
    },      
    
    update: function() {
        if (game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown || game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown) 
            loadPlayMenu();
    }
};

function loadPlayMenu() {
    game.sound.play('click');
    
    game.state.add('Lobby', Lobby);
    game.state.start('Lobby');
}

function loadCredits() {
    game.sound.play('click');
    
    game.state.add('Credits', Credits);
    game.state.start('Credits');
}