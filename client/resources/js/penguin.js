var Penguin = Class.create(Sprite, {
	initialize: function() {
		Sprite.apply(this,[30, 43]);
		this.image = Game.instance.assets['/resources/images/penguinSheet.png'];
		this.animationDuration = 0;
		this.addEventListener(Event.ENTER_FRAME, this.update);
	},
	update: function (event) {
		this.animationDuration += event.elapsed * 0.001;
		if (this.animationDuration >= 0.25) {
			this.frame = (this.frame + 1) % 2;
			this.animationDuration -= 0.25;
		}
	},
	switchToLaneNumber: function(lane){     
		var targetX = 160 - this.width/2 + (lane-1)*90;
		this.x = targetX;
	}
});