var Credits = {

    create: function () {
        
        // RETOUR BUTTON
        // créer l'image du bouton
        var retour = game.add.button(0, 0, 'return', loadMainMenu, this, 2, 1, 0);
        
        // puis on pose un texte par dessus
        var text = game.add.bitmapText(40, 40, 'pixel', '<', 32);
        
        // LES CREDITS
        var thxPlayer = game.add.bitmapText(game.world.centerX, 200, 'pixel', 'Merci a toi', 32);
        thxPlayer.anchor.setTo(.5,.5);
        
        var thxMe = game.add.bitmapText(game.world.centerX, 400, 'pixel', 'Merci a moi', 32);
        thxMe.anchor.setTo(.5,.5);
        
        var thxEveryone = game.add.bitmapText(game.world.centerX, 600, 'pixel', 'Merci a tout ceux qui le veulent', 32);
        thxEveryone.anchor.setTo(.5,.5);
    },      
    
    update: function () {
        
    }
};


function loadMainMenu() {
    game.sound.play('click');
    
    game.state.add('MainMenu', MainMenu);
    game.state.start('MainMenu');
}