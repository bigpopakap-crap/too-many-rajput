var ENEMIES_SPACE = {};

(function() {
	
	var SPEED_CONSTANT = 2;
	
	var images = {
		'jumping': {path: 'img/enemy_jumping.png', hit_box_left: 2, hit_box_right: 183, hit_box_top: 121, hit_box_bottom: 188},
		'crouching': {path: 'img/enemy_crouching.png', hit_box_left: 36, hit_box_right: 142, hit_box_top: 107, hit_box_bottom: 188},
		'sliding': {path: 'img/enemy_sliding.png', hit_box_left: 2, hit_box_right: 183, hit_box_top: 121, hit_box_bottom: 188}
	};
	
	var enemiesDiv = null;
	var enemyClass = '';
	
	var enemies;
	var nextId = 0;
	
	ENEMIES_SPACE.init = function(div, enemyClassName) {
		enemiesDiv = div;
		enemyClass = enemyClassName;
		enemies = {};
	}
	
	ENEMIES_SPACE.addEnemy = function() {
		var newEnemy = createEnemy();
		
		//add it to the list
		enemies[newEnemy.id] = newEnemy;
		
		//update it and add it to the DOM
		updateImage(newEnemy);
		enemiesDiv.appendChild(newEnemy.domElem);
	}
	
	ENEMIES_SPACE.advanceAll = function(frameRate) {
		var rajputKilled = false;
		for (var i in enemies) {
			rajputKilled = advance(enemies[i], frameRate) || rajputKilled;
		}
		return rajputKilled;
	}
	
	function createEnemy() {
		//choose which side it will come from
		var side = Math.random() < .5 ? 'left' : 'right';
		
		var enemy = {
			id: nextId++,
			state: 'jumping',
			left: side == 'left' ? -188 : 801,
			top: Math.random() * (400 - 188),
			velx: (1 + Math.random() * 4) * (side == 'left' ? 1 : -1),
			vely: 1 + (Math.random() - .5) * 12
		};
		
		//create and add the dom elemnt for this enemy then set the image
		enemy.domElem = createDOMElem(enemy);
		
		return enemy;
	}
	
	function createDOMElem(enemy) {
		var elem = document.createElement('img');
		elem.id = 'enemy_' + enemy.id;
		elem.className = enemyClass;
		return elem;
	}
	
	function advance(enemy, frameRate) {
		var rajputKilled = false;
		
		//move its position base on its velocity
		enemy.left += SPEED_CONSTANT * enemy.velx;
		enemy.top += SPEED_CONSTANT * enemy.vely;;
		enemy.vely += SPEED_CONSTANT / 2;
		
		//check if it has been killed
		var hitBox = getHitBox(enemy);
		var rajSpear = RAJPUT_SPACE.getSpear();
		if ((rajSpear.use.first && boxContains(hitBox, rajSpear.absolute.x1, rajSpear.absolute.y1)) ||
			(rajSpear.use.second && boxContains(hitBox, rajSpear.absolute.x2, rajSpear.absolute.y2))) {
			//remove the rajput, increment the score
			GAME_SPACE.incrementKillCount();
			remove(enemy);
		}
		
		//TODO check if it has killed the rajput
		//TODO SET rajputKilled = true
		
		//check if it is on the ground, update its state accordingly
		if (hitBox.bottom > 400) {
			//revers the velocity
			enemy.vely *= -1;
		}
		
		//TODO check if it is fully off the screen
		
		updateImage(enemy);
		return rajputKilled;
	}
	
	function updateImage(enemy) {
		//set the top, left and path
		enemy.domElem.style.left = enemy.left + 'px';
		enemy.domElem.style.top = enemy.top + 'px';
		enemy.domElem.src = images[enemy.state].path;
	}
	
	function getHitBox(enemy) {
		return {
			left: enemy.left + images[enemy.state].hit_box_left,
			top: enemy.top + images[enemy.state].hit_box_top,
			right: enemy.left + images[enemy.state].hit_box_right,
			bottom: enemy.top + images[enemy.state].hit_box_bottom,
		};
	}
	
	function remove(enemy) {
		//remove him from the DOM then from the internal list
		enemiesDiv.removeChild(enemy.domElem);
		delete enemies[enemy.id];
	}
	
	function boxContains(hitBox, x, y) {
		return x >= hitBox.left && x <= hitBox.right &&
				y >= hitBox.top && y <= hitBox.bottom;
	}
		
})();
