var MainMenu = {

    create: function () {
        
        game.stage.backgroundColor = '#182d3b';
        
        // LE TITRE
        var text = game.add.bitmapText(game.world.centerX, 200, 'pixel', 'StickWars', 32);
        text.anchor.setTo(.5,.5);
        
        // PLAY BUTTON
        var play = game.add.button(game.world.centerX, 400, 'button', loadPlayMenu, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
        var text = game.add.bitmapText(game.world.centerX, 400, 'pixel', 'Play', 32);
        text.anchor.setTo(.5,.5);
        
        // CREDITS BUTTON
        var play = game.add.button(game.world.centerX, 550, 'button', loadCredits, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
        var text = game.add.bitmapText(game.world.centerX, 550, 'pixel', 'Credits', 32);
        text.anchor.setTo(.5,.5);

        // CREDITS BUTTON
        var play = game.add.button(game.world.centerX, 700, 'button', loadLevelLoader, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
        var text = game.add.bitmapText(game.world.centerX, 700, 'pixel', 'Level Editor', 32);
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

function loadLevelLoader() {
    game.sound.play('click');
    
    game.state.add('LevelLoader', LevelLoader);
    game.state.start('LevelLoader');
}

function loadMainMenu() {
    game.sound.play('click');
    
    game.state.add('MainMenu', MainMenu);
    game.state.start('MainMenu');
}