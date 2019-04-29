export class ArrowButton extends Phaser.Sprite {
	constructor(game, x = 0, y = 0, key,frame) {
		super(game,x,y,key);

		this.game = game;
		this.frameName = frame;
		this.inputEnabled = true;
		this.input.useHandCursor = true;
		this.fixedToCamera = true;
	}
}