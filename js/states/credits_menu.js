var Credits = {

    create: function () {
        var thxPlayer = game.add.bitmapText(game.world.centerX, 200, 'pixel', 'Merci a toi, joueur', 32);
        thxPlayer.anchor.setTo(.5,.5);
        
        var thxMe = game.add.bitmapText(game.world.centerX, 400, 'pixel', 'Merci a moi', 32);
        thxMe.anchor.setTo(.5,.5);
        
        var thxEveryone = game.add.bitmapText(game.world.centerX, 600, 'pixel', 'Merci a tout ceux qui le veulent', 32);
        thxEveryone.anchor.setTo(.5,.5);
    },      
};