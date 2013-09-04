enchant();

window.onload = function() {
	var game = new Game(320, 440);
	game.preload('/resources/images/BG.png');
	game.fps = 30;
	game.scale = 1;
	game.onload = function() {
		var scene, label, bg;
		scene = new Scene();
		label = new Label("Hi, Ocean!");
		bg = new Sprite(320,440);
		bg.image = game.assets['/resources/images/BG.png'];
		scene.addChild(bg);
		scene.addChild(label);
		game.pushScene(scene);
	}
	game.start();
};