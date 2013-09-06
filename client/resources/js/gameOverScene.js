var GameOverScene = Class.create(Scene, {
	initialize: function(score) {
		var gameOverLabel, scoreLabel;
		Scene.apply(this);
		this.backgroundColor = 'black';
		gameOverLabel = new Label("GAME OVER<br><br>Tap to Restart");
		gameOverLabel.x = 8;
		gameOverLabel.y = 128;
		gameOverLabel.color = 'white';
		gameOverLabel.font = '32px strong';
		gameOverLabel.textAlign = 'center';
		scoreLabel = new Label('SCORE<br>' + score);
		scoreLabel.x = 9;
		scoreLabel.y = 32;        
		scoreLabel.color = 'white';
		scoreLabel.font = '16px strong';
		scoreLabel.textAlign = 'center';
		this.addChild(gameOverLabel);
		this.addChild(scoreLabel);
		this.addEventListener(Event.TOUCH_START, this.touchToRestart);
	},
	touchToRestart: function(event) {
		var game = Game.instance;
		game.replaceScene(new MainGameScene());
	}
});