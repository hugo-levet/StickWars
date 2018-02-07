var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var background = new Image();
background.src = "img/bg.png";

// resize canvas to fit windows
c.width  = window.innerWidth - 90;
c.height = c.width * background.height / background.width;//*/

// on attends que l'image bg.png soit chargé avant de l'afficher
background.onload = function() {
    ctx.drawImage(background, 0, 0, c.width, c.height);   
}