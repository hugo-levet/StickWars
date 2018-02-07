var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var background = new Image();
background.src = "img/bg.png";

// resize canvas to fit windows
c.width  = window.innerWidth - 90;
c.height = c.width * background.height / background.width;//*/

// ====
// on attends que les ressources soient téléchargés avant d'initialiser le jeu
background.onload = function() {    

	// on créer un monde
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-1000, -1000);
	worldAABB.maxVertex.Set(1000, 1000);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	var world = new b2World(worldAABB, gravity, doSleep); 
	
	// on créer une boulasse
	var circleSd = new b2CircleDef();
	circleSd.density = 1.0;
	circleSd.radius = 20;
	circleSd.restitution = 1.0;
	circleSd.friction = 0;
	var circleBd = new b2BodyDef();
	circleBd.AddShape(circleSd);
	circleBd.position.Set(0,0);
	var circleBody = world.CreateBody(circleBd);
	
	// on lance la boucle principale
	main();
}

// ====
// la boucle principale
function main() {	
	ctx.drawImage(background, 0, 0, c.width, c.height);   
	main();
}