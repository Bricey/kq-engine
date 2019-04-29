export class InventoryItem extends Phaser.Sprite {

	constructor(game,x = 0,y = 0,key = "sprites",frame,data,i) {

		super(game,x,y,key,frame,data);

		this.game = game;
		game.add.existing(this);
		this.data = data;
		this.i = i;

		//this.body.setSize(128,128);
		this.inputEnabled = true;
		this.fixedToCamera = true;
		this.input.useHandCursor = true;

		this.frameName = `inv-${frame}.png`;

		this.alpha = 0;

		let alpha = i===0?1:0.65

		this.itemTween = this.game.add.tween(this).to({alpha},120,"Quad.easeOut").start();

	}

}