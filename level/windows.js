const PlateformsEnum = {
    COLLIDER: 0,
    INTERACTION: 1,
    DECO: 2
};



// ca, c'est la fonction améliorée, cependant vu que le programme marche pas,
// on garde la fonction qui marche avec game.js
var explorer_function = () => {        
    var explorer = platforms.create(0, 0, "explorer_windows");              
    var explorer_sprite = game.add.sprite(0, 0, "explorer_windows");	
	
    explorer.x = 17.9 * width / 100;
    explorer.y = 19.1 * height / 100;
    explorer.width = 61.25 * width / 100;
    explorer.height = 52.7 * height / 100;
	explorer_sprite.x = 17.9 * width / 100;
    explorer_sprite.y = 19.1 * height / 100;
    explorer_sprite.width = 61.25 * width / 100;
    explorer_sprite.height = 52.7 * height / 100;
    
    explorer.body.immovable = true;	

    game.sound.play('click');
}



var level_windows = {
	"plateforms": [
    {
		"sprite": "bg",
        "type": PlateformsEnum.DECO,
		"x": 0,
		"y": 0,
		"w": 100,
		"h": 100        
	},
    {
		"sprite": "ground",
        "type": PlateformsEnum.COLLIDER,
		"x": 0,
		"y": 100 - 3.52,
		"w": 100,
		"h": 3.52        
	},
    {
		"sprite": "recycle_bin",
        "type": PlateformsEnum.DECO,
		"x": 93.4,
		"y": 85.7,
		"w": 3.81,
		"h": 6.11
	},
    {
		"sprite": "explorer",
        "type": PlateformsEnum.INTERACTION,
        "function": explorer_function,
		"x": 4.46,
		"y": 100 - 12.9,
		"w": 2.68,
		"h": 3.91
	}
    ]
};
