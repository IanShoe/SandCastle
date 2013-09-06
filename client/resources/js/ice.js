var Ice = Class.create(Sprite, {
	initialize: function(lane) {
		Sprite.apply(this,[48, 49]);
		this.image  = Game.instance.assets['/resources/images/ice.png'];
		this.setLane(lane);
		this.addEventListener(Event.ENTER_FRAME, this.update);
	},
	setLane: function(lane) {
		var game, distance;
		game = Game.instance;
		distance = 90;

		this.rotationSpeed = Math.random() * 200 - 50;

		this.x = game.width/2 - this.width/2 + (lane - 1) * distance;
		this.y = -this.height;
		this.rotation = Math.floor( Math.random() * 360 );
	},
	update: function(event) {
		var ySpeed, game;

		game = Game.instance;
		ySpeed = 300;

		this.y += ySpeed * event.elapsed * 0.001;
		this.rotation += this.rotationSpeed * event.elapsed * 0.001;
		if (this.y > game.height) {
			this.parentNode.removeChild(this);
		}
	}
});