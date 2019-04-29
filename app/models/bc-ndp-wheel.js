export class Wheel extends Phaser.Sprite {
	constructor(game,x,y,key = 'bc-ndp',frame) {
		super(game,x,y,key,frame);
		this.anchor.setTo(0.5);
		this.animations.add('drive',Phaser.Animation.generateFrameNames(`wheel_`,0,2,`.png`),8,true);
		this.animations.play('drive');
	}
	stop() {
		this.animations.stop();
	}
}

export class Drummer extends Phaser.Sprite {
	constructor(game,x,y,key = 'bc-ndp',colour) {
		super(game,x,y,key);
		this.anchor.setTo(0.5);
		this.animations.add('drum',Phaser.Animation.generateFrameNames(`drummers_${colour}_`,0,1,`.png`),3,true);
		this.animations.play('drum');
	}
	stop() {
		this.animations.stop();
		this.frameName = `drummers_${colour}_2.png`;
	}
}

export class Suzuki extends Phaser.Sprite {
	constructor(game,x,y,key = 'bc-ndp') {
		super(game,x,y,key);
	}
}