
// on charge les sprites nécessaires pour la barre de chargement
var BootStrap = {   
    preload: function () {
		game.load.image("logo", "assets/img/logo.png");
		game.load.image("preload_bar", "assets/img/preload_bar.png");
		game.load.image("bg_preload_bar", "assets/img/bg_preload_bar.png");
    },   
	
	create: function () {
		console.log("In boot state");
		
		game.state.add('Preload', Preload);
		game.state.start('Preload');
    }
};
