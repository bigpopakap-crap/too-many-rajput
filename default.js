var DEFAULT_SPACE = {};

(function() {
	
	/* ADD THE KEY EVENT HANDLERS */
	window.onkeydown = function(event) {
		RAJPUT_SPACE.keyDown(event);
		return false;
	}
	
	window.onkeyup = function(event) {
		RAJPUT_SPACE.keyUp(event);
		return false;
	}
	
	/* START PLAYING THE GAME */
	DEFAULT_SPACE.onload = function() {	
		//initialize the rajput sprite
		RAJPUT_SPACE.setImageFunctions(
			function(path) {
				var imageDiv = document.getElementById('rajputImage');
				if (imageDiv) {
					imageDiv.src = path;
				}
			},
			function() {
				return 306;
			},
			function() {
				return 212;
			}
		);
		
		//initialize the game
		GAME_SPACE.setBGImageSetter(function(path) {
			var imageDiv = document.getElementById('bgImage');
			if (imageDiv) {
				imageDiv.style.backgroundImage = 'url(' + path + ')';
			}
		});
		GAME_SPACE.setEnemiesDiv(document.getElementById('enemiesDiv'), 'enemyImage');
		
		//show the welcome screen and hide the rajput sprite
		document.getElementById('rajputImage').style.visibility = 'hidden';
		GAME_SPACE.showWelcomeScreen();
		
		//wait 1 second and then start the game
		window.setTimeout("document.getElementById('rajputImage').style.visibility = 'visible'; GAME_SPACE.start();", 1000);
	};
})();
