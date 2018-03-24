var MapSelector = {

    create: function () {
        
        game.stage.backgroundColor = '#182d3b';
        
        // LE TITRE
        var text = game.add.bitmapText(game.world.centerX, convertY(19.0), 'pixel', 'StickWars', convertX(fontSize));
        text.anchor.setTo(.5,.5);
                
		var x = convertX(30);
		var y = convertY(60);
		var size = 35;
		
		// PLAY BUTTON
        var play = game.add.button(x, y, 'window', windowSelecter, this, 2, 1, 0);
        play.anchor.setTo(0.5);
		play.width = convertX(size);
		play.height = convertY(size);		        
        
        // CREDITS BUTTON
		var x = convertX(70);
		
        var play = game.add.button(x, y, 'firefox', googleSelecter, this, 2, 1, 0);
        play.anchor.setTo(0.5);
		play.width = convertX(size);
		play.height = convertY(size);
    },      
};

var windowSelecter = () => {
	selectedMap = level_windows;
	loadPlayMenu();
}

var googleSelecter = () => {
	selectedMap = level_google;
	loadPlayMenu();
}