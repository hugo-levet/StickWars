var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var background = new Image();
background.src = "img/bg.png";

// resize canvas to fit windows
c.width  = window.innerWidth - 90;
c.height = c.width * background.height / background.width;//*/

// ====
// on attends que les ressources soient téléchargés avant d'initialiser le jeu
background.onload = function() 
{    
	// on lance la boucle principale
	main();
}

// ====
// la boucle principale
function main() {		
	ctx.drawImage(background, 0, 0, c.width, c.height);   
	
	/*ctx.beginPath();
	ctx.arc(circleBd.position.x, circleBd.position.y, circleBd.radius, 0, 2 * Math.PI, false);
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#FF0000';
	ctx.stroke();	//*/
	
	console.log("circleBd.position " + circleBody.position);
	
	main();
}