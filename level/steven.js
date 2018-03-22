const PlateformsEnum = {
    COLLIDER: 0,
    INTERACTION: 1,
    DECO: 2
};


var explorer_function = () => {        
    var explorer = platforms.create(0, 0, "explorer_windows");    
    explorer.body.immovable = true;	      
    
    explorer.body.x = 17.9 * width / 100;
    explorer.body.y = 19.1 * height / 100;
    explorer.body.width = 61.25 * width / 100;
    explorer.body.height = 52.7 * height / 100;

    game.sound.play('click');
}

var level_steven = {
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
