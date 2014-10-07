var GAME_SPACE = {};

(function() {
	var imgSetter = null;
	
	var enemiesDiv = null;
	var enemyClass = '';
	
	var numKilled;
	var score;
	var starttime;
	
	var SCORE_PER_KILL = 10;
	
	GAME_SPACE.frameRate = 50; //in ms

	GAME_SPACE.showWelcomeScreen = function() {
		imgSetter('img/welcome.png');
	}
	
	GAME_SPACE.setBGImageSetter = function(setImg) {
		if (!setImg) setImg = function() {};
		imgSetter = setImg;
	}
	
	GAME_SPACE.setEnemiesDiv = function(elem, enemyClassName) {
		enemiesDiv = elem;
		enemyClass = enemyClassName;
	}
	
	GAME_SPACE.start = function() {
		//set the background image
		imgSetter('img/bgimage.png');
		
		//initialize the score and start time
		numKilled = 0;
		score = 0;
		starttime = new Date();
		
		//initialize the enemies
		ENEMIES_SPACE.init(enemiesDiv, enemyClass);
		
		//display the game frame by frame
		GAME_SPACE.advanceGame();
	}
	
	GAME_SPACE.advanceGame = function() {
		//add an enemy with a probability proportional to the user's current score
		if ((Math.random() * (50 - (Math.floor(numKilled / 10) * 10)) / 50) < .06) {
			ENEMIES_SPACE.addEnemy();
		}
		
		if (ENEMIES_SPACE.advanceAll(GAME_SPACE.frameRate)) {
			//TODO rajput was killed
		}
		else {
			window.setTimeout("GAME_SPACE.advanceGame()", GAME_SPACE.frameRate);
		}
	}
	
	GAME_SPACE.incrementKillCount = function() {
		numKilled++;
		score += SCORE_PER_KILL;
	}
	
})();