var RAJPUT_SPACE = {};

(function() {
	
	/* SPRITE IMAGES AND THE CURRENT SPRITE STATE */
	var images = {
		'': { 	path: 'img/rajput_none.png', 	width: 188, height: 188,
				spear_x1: 24, spear_y1: 100, 	spear_x2: 162, spear_y2: 126,
				use_spear_1: true, use_spear_2: true,
				hit_box_left: 56, hit_box_right: 126, hit_box_top: 88, hit_box_bottom: 188},
				
		'N': { 	path: 'img/rajput_N.png', 	width: 188, height: 188,
				spear_x1: 71, 	spear_y1: 0, 	spear_x2: 130, spear_y2: 118,
				use_spear_1: true, use_spear_2: false,
				hit_box_left: 50, hit_box_right: 120, hit_box_top: 80, hit_box_bottom: 188},
				
		'NW': { path: 'img/rajput_NW.png', 	width: 188, height: 188,
				spear_x1: 17, 	spear_y1: 21, 	spear_x2: 127, spear_y2: 122,
				use_spear_1: true, use_spear_2: false,
				hit_box_left: 50, hit_box_right: 120, hit_box_top: 83, hit_box_bottom: 188},
				
		'W': { 	path: 'img/rajput_W.png', 	width: 188, height: 188,
				spear_x1: 0, 	spear_y1: 109, 	spear_x2: 126, spear_y2: 109,
				use_spear_1: true, use_spear_2: false,
				hit_box_left: 33, hit_box_right: 115, hit_box_top: 73, hit_box_bottom: 188},
				
		'SW': { path: 'img/rajput_SW.png', 	width: 188, height: 188,
				spear_x1: 6, 	spear_y1: 171, 	spear_x2: 117, spear_y2: 111,
				use_spear_1: true, use_spear_2: false,
				hit_box_left: 27, hit_box_right: 115, hit_box_top: 76, hit_box_bottom: 188},
				
		'S': { 	path: 'img/rajput_S.png', 	width: 188, height: 188,
				spear_x1: 39, 	spear_y1: 76, 	spear_x2: 153, spear_y2: 107,
				use_spear_1: true, use_spear_2: true,
				hit_box_left: 56, hit_box_right: 126, hit_box_top: 87, hit_box_bottom: 188},
				
		'SE': { path: 'img/rajput_SE.png', 	width: 188, height: 188,
				spear_x1: 182, spear_y1: 172, 	spear_x2: 80, spear_y2: 110,
				use_spear_1: true, use_spear_2: false,
				hit_box_left: 72, hit_box_right: 160, hit_box_top: 122, hit_box_bottom: 188},
				
		'E': { 	path: 'img/rajput_E.png', 	width: 188, height: 188,
				spear_x1: 186, spear_y1: 110, 	spear_x2: 61, spear_y2: 108,
				use_spear_1: true, use_spear_2: false,
				hit_box_left: 72, hit_box_right: 154, hit_box_top: 121, hit_box_bottom: 188},
				
		'NE': { path: 'img/rajput_NE.png', 	width: 188, height: 188,
				spear_x1: 171, spear_y1: 21, 	spear_x2: 61, spear_y2: 123,
				use_spear_1: true, use_spear_2: false,
				hit_box_left: 68, hit_box_right: 137, hit_box_top: 95, hit_box_bottom: 188}
	};
	var current = '';
	
	/* CURRENT STATE OF KEYS */
	var keys = {
		N: false, W: false, S: false, E: false,	/* STATE THE OF UP, DOWN, LEFT, RIGHT keys */
		map: { 37: 'W', 38: 'N', 39: 'E', 40: 'S'} /* MAPS KEY CODES TO COMPASS DIRECTIONS */
	};
	
	/* THE IMAGE DIV */
	var imgSetter = null;
	var imgLeft = null;
	var imgTop = null;
	
	RAJPUT_SPACE.setImageFunctions = function (setImg, getLeft, getTop) {
		if (!setImg) setImg = function() { };
		if (!getLeft) getLeft = function() { return 0 };
		if (!getTop) getTop = function() { return 0 };
		imgSetter = setImg;
		imgLeft = getLeft;
		imgTop = getTop;
		
		updateState();
	}
	
	RAJPUT_SPACE.keyDown = function(event) {
		//set the current state
		var compass = keys.map[event.keyCode];
		if (typeof compass != 'undefined') {
			keys[compass] = true;
		}
		updateState();
	}
	
	RAJPUT_SPACE.keyUp = function(event) {
		//set the current state
		var compass = keys.map[event.keyCode];
		if (typeof compass != 'undefined') {
			keys[compass] = false;
		}
		updateState();
	}
	
	function updateState() {
		var vert = 0;
		var horiz = 0;
		if (keys.N) vert += 1;
		if (keys.S) vert -= 1;
		if (keys.W) horiz -= 1;
		if (keys.E) horiz += 1;
		
		var state = '';
		if (vert == 1) state += 'N';
		else if (vert == -1) state += 'S';
		if (horiz == 1) state += 'E';
		else if (horiz == -1) state += 'W';

		current = state;
		
		updateImage();
	}
	
	function updateImage() {
		imgSetter(images[current].path);
	}
	
	RAJPUT_SPACE.getSpear = function() {
		return {
			relative: {
				x1: images[current].spear_x1,
				y1: images[current].spear_y1,
				x2: images[current].spear_x2,
				y2: images[current].spear_y2
			},
			absolute: {
				x1: imgLeft() + images[current].spear_x1,
				y1: imgTop() + images[current].spear_y1,
				x2: imgLeft() + images[current].spear_x2,
				y2: imgTop() + images[current].spear_y2
			},
			use: {
				first: images[current].use_spear_1,
				second: images[current].use_spear_2
			}
		};
	}
	
	RAJPUT_SPACE.getHitBox = function() {
		return {
			relative: {
				left: images[current].hit_box_left,
				top: images[current].hit_box_top,
				right: images[current].hit_box_right,
				bottom: images[current].hit_box_bottom
			},
			absolute: {
				left: imgLeft() + images[current].hit_box_left,
				top: imgTop() + images[current].hit_box_top,
				right: imgLeft() + images[current].hit_box_right,
				bottom: imgTop() + images[current].hit_box_bottom
			}
		};
	}
	
})();
