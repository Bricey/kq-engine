export class HealthIcon extends Phaser.Sprite {

	constructor(game,x=0,y=60,key="sprites",frameName) { // frameName takes string parameter from health-panel.js (empty,half,full) and passes it to this.frameName
		super(game,x,y,key);

		this.game = game;

		this.game.add.existing(this);

		this.anchor.setTo(0.5);
		this.fixedToCamera = true;

		this.frameName = `ui-hearts-${frameName}.png`;
	}

}