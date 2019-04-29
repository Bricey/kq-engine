export class Trigger extends Phaser.Sprite {
	constructor(game,x=0,y=0,key = "sprites",frame,data) {
		super(game,x,y,key,frame,data);

		this.game = game;
		this.game.physics.arcade.enable(this);
		this.body.onOverlap = new Phaser.Signal();
		this.body.setSize(64,64,0,0);
		this.data = data;

		if (data.initFunction === 'edmonton_crystal') {
			this.body.setSize(220,220,0,0);
		}

		this.anchor.setTo(0.5);

		this.frameName = `${frame}.png`;
	}
}