var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image("bg", "img/bg.png");
	game.scale.setMaximum();
}

function create() {
	var bg = game.add.sprite(0, 0, 'bg');
	//bg.scale.setTo(window.innerWidth, window.innerHeight);
	
	/*scaleRatio = window.devicePixelRatio / 3;
	bg.scale.setTo(scaleRatio, scaleRatio);//*/
	bg.width = window.innerWidth * window.devicePixelRatio;
	bg.height = window.innerHeight * window.devicePixelRatio;
}

function update() {
	
}