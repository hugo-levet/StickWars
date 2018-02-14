var MainMenu = {

    // on va charger les images utilisés pour le menu
    preload: function () {
        game.load.image("button", "assets/img/button.png");
        game.load.bitmapFont('pixel', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
    },

    create: function () {
        
        game.stage.backgroundColor = '#182d3b';
        
        // Le titre
        var text = game.add.bitmapText(game.world.centerX, 200, 'pixel', 'StickWars', 32);
        text.anchor.setTo(.5,.5);
        
        // PLAY BUTTON
        // créer l'image du bouton
        var play = game.add.button(game.world.centerX, 400, 'button', loadPlayMenu, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
        
        // puis on pose un texte par dessus
        var text = game.add.bitmapText(game.world.centerX, 400, 'pixel', 'Play', 32);
        text.anchor.setTo(.5,.5);
        
        // CREDITS BUTTON
        // créer l'image du bouton
        var play = game.add.button(game.world.centerX, 550, 'button', loadCredits, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
        
        // puis on pose un texte par dessus
        var text = game.add.bitmapText(game.world.centerX, 550, 'pixel', 'Credits', 32);
        text.anchor.setTo(.5,.5);
    },      
};

function loadPlayMenu() {
    game.state.add('Lobby', Lobby);
    game.state.start('Lobby');
}

function loadCredits() {
    game.state.add('Credits', Credits);
    game.state.start('Credits');
}