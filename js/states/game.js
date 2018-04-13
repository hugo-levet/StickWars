
var Game = {

	create: function () {
		
		var gameNumber = parseInt(localStorage.getItem("gameNumber"))+1;
		localStorage.setItem("gameNumber", gameNumber);
			
		game.physics.startSystem(Phaser.Physics.ARCADE);

		player = [];
		interactionsBox = [];
		projectiles = [];

		// ====
		// on créer les platforms
		var map = new LevelCreator(selectedMap);
		map.create();

		// on décode les fichiers audio .mp3
		footstep = game.add.audio('footstep');
		jump = game.add.audio('jump');
		tackle = game.add.audio('tackle');

		// RETURN BUTTON
		var retour = game.add.button(0, 0, 'return', loadMainMenu, this, 2, 1, 0);
		var text = game.add.bitmapText(40, 40, 'pixel', '<', 32);

		// ====
		// On créer les joueurs
		for (var i=0; i < playerMeta.length; i++)
			if (playerMeta[i].enable)
				player.push(new Player(width * Math.random(), convertY(82.8), playerMeta[i].id, playerMeta[i].tint));

	},

	update: function () {

		// retour menu
		if (game.input.keyboard.addKey(Phaser.Keyboard.ESC).isDown)
			loadMainMenu();

		for (var i=0; i < player.length; i++)
			player[i].update(platforms);
		
		for (var i=0; i < projectiles.length; i++) {
			
			// la fonction update renvoie true quand le projectile a touché un truc
			// si elle renvoie true, alors on supprime le projectile
			if (projectiles[i].update()) {
				projectiles[i].destroy();
				projectiles.splice(i, i+1);					
			}
		}

		// ====
		// SCORE SYSTEM
		var playersAlive = [];

		for (var i=0; i < player.length; i++)
			if (player[i].hp > 0)
				playersAlive.push(player[i]);

		if (playersAlive.length == 1) {
			var idWinner = playersAlive[0].id;

			playerMeta[idWinner].score++;
			console.log("notre gagnant est " + playerMeta[idWinner].name);
			
			game.state.add('Score', Score);
			game.state.start('Score');
		}
	},

	/*render: function() {
		// on affiche les collisions box des joueurs
		for (var i=0; i < player.length; i++)
			if (player[i].hp > 0)
				game.debug.body(player[i].player);
	}//*/
};
