 <!DOCTYPE html>
<html>
	<head>
		<title>Stick Wars - Suka Prod</title>
		
		<meta charset="UTF-8">
		<link rel="icon" type="image/png" href="assets/img/ico.png" />
		<link rel="stylesheet" href="css/style.css">	
        
		<?php $desc = "StickWars est un jeu de combat où tu peux affronter tes amis sur le même PC ! L'arène réagit a tes actions !";
		
		$path = $_SERVER['DOCUMENT_ROOT'];
		
		include ($path . "/includes/header.php"); ?>	
	</head>
		
	<body>	
        <!-- LIBRARIES -->
		<script src="lib/phaser.js"></script> 
        <script src="lib/HealthBar.standalone.js"></script>       
        
		<!-- CLASSES -->
		<script src="js/class/player_meta.js"></script>
		
        <!-- STATES -->
		<script src="js/states/bootstrap.js"></script>
		<script src="js/states/preload.js"></script>        
        
        <!-- MAIN SCRIPT -->
        <script src="js/main.js"></script>
	</body>
</html> 