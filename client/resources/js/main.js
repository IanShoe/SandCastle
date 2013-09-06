enchant();

window.onload = function() {
	var game = new Game(320, 440);
	var resources = ['/resources/images/BG.png',
	'/resources/images/penguinSheet.png',
	'/resources/images/ice.png',
	'/resources/audio/hit.mp3',
	'/resources/audio/bgm.mp3'];
	game.preload(resources);
	game.fps = 60;
	game.scale = 1;
	game.onload = function() {
		var scene = new MainGameScene();
		game.pushScene(scene);
	}
	game.start();
};

var MainGameScene = Class.create(Scene, {
	generateIceTimer : 0,
	scoreTimer : 0,
	score : 0,
	initialize: function() {
		Scene.apply(this);
		var game = Game.instance;
		var bg = new Sprite(320,440);
		bg.image = game.assets['/resources/images/BG.png'];

		label = new Label('SCORE<br>0');
		label.x = 9;
		label.y = 32;
		label.color = 'white';
		label.font = '16px strong';
		label.textAlign = 'center';
		this.scoreLabel = label;


		var penguin = new Penguin();
		penguin.x = game.width / 2 - penguin.width / 2;
		penguin.y = 280;
		this.penguin = penguin;


		var iceGroup = new Group();
		this.iceGroup = iceGroup;

		this.addChild(bg);
		this.addChild(label);
		this.addChild(iceGroup);
		this.addChild(penguin);
		this.addEventListener(Event.TOUCH_START, this.handleTouchControl);
		this.addEventListener(Event.ENTER_FRAME, this.update);



		// this.bgm = game.assets['/resources/audio/bgm.mp3'];
		// this.bgm.play();
		// if (this.bgm.currentTime >= this.bgm.duration ){
		// 	this.bgm.play();
		// }
	},
	handleTouchControl: function (event) {
		var laneWidth, lane;
		laneWidth = 320/3;
		lane = Math.floor(event.x/laneWidth);
		lane = Math.max(Math.min(2,lane),0);
		this.penguin.switchToLaneNumber(lane);
	},
	update: function(event) {
		this.generateIceTimer += event.elapsed * 0.001;
		if (this.generateIceTimer >= 0.5) {
			this.generateIceTimer -= 0.5;
			var ice = new Ice(Math.floor(Math.random()*3));
			this.iceGroup.addChild(ice);
		}
		for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
			var ice;
			ice = this.iceGroup.childNodes[i];
			if (ice.intersect(this.penguin)){
				var game = Game.instance;
				game.assets['/resources/audio/hit.mp3'].play();
				this.iceGroup.removeChild(ice);    
				// this.bgm.stop();
				game.replaceScene(new GameOverScene(this.score));        
				break;
			}
		}
		this.scoreTimer += event.elapsed * 0.001;
		if (this.scoreTimer >= 0.5) {
			this.setScore(this.score + 1);
			this.scoreTimer -= 0.5;
		}
	},
	setScore: function (value) {
		this.score = value;
		this.scoreLabel.text = 'SCORE<br>' + this.score;
	}
});