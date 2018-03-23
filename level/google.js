const PlateformsEnum = {
    COLLIDER: 0,
    INTERACTION: 0,
    DECO: 1
};

var level_windows = {
	"plateforms": [
    {
		"sprite": "firefox",
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
		"y": 100 - 9.8,
		"w": 100,
		"h": 9.8
	},
    {
		"sprite": "ground",
        "type": PlateformsEnum.COLLIDER,
		"x": 31.5,
		"y": 37.7,
		"w": 38,
		"h": 5.5
	}
    ]
};