var Menu = {

    // on va charger les images utilisés pour le menu
    preload: function () {
        game.load.image("button", "assets/img/button.png");
        game.load.bitmapFont('pixel', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
    },

    create: function () {
        
        game.stage.backgroundColor = '#182d3b';
        
        // créer l'image du bouton
        var play = game.add.button(game.world.centerX, 400, 'button', loadGame, this, 2, 1, 0);
        play.anchor.setTo(.5,.5);
        play.position.setTo(game.world.centerX, 400);
        
        // puis on pose un texte par dessus
        var text = game.add.bitmapText(game.world.centerX, 400, 'pixel', 'Play', 32);
        text.anchor.setTo(.5,.5);
        

    },
};

function loadGame() {

    game.state.add('Game', Game);
    game.state.start('Game');

}