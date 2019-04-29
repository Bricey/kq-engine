export class NextButton extends Phaser.Sprite {
	constructor(game,x = 0,y = 0,key = 'sprites') {
		super(game,x,y,key);

		game.add.existing(this);

		this.anchor.setTo(0.5);

		this.animations.add('flash',Phaser.Animation.generateFrameNames('nextBtn_0',1,2,'.png'),3,true);
		
		this.inputEnabled = true;
		this.input.useHandCursor = true;
		this.fixedToCamera = true;
		this.animations.play('flash');
	}
}