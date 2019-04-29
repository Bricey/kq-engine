import { Wheel, Drummer } from './bc-ndp-wheel';

export class BCNdp extends Phaser.Sprite {
	constructor(game,x = 0, y = 0, key = 'sprites') {
		super(game,x,y,key);
		this.game = game;
		this.game.physics.arcade.enable(this);
		this.anchor.setTo(0.5,0);
		this.frameName = "trigger.png";
		this.parts = {};
		game.add.existing(this);


		//children
		this.parts.wheel_RF = new Wheel(this.game,-170,610,"bc-ndp"); // right-front
		this.parts.wheel_RB = new Wheel(this.game,-180,300,"bc-ndp"); // right-back
		this.parts.wheel_LF = new Wheel(this.game,170,610,"bc-ndp"); // left-front
		this.parts.wheel_LB = new Wheel(this.game,180,300,"bc-ndp"); // left-back

		this.addChild(this.parts.wheel_RF);
		this.addChild(this.parts.wheel_RB);
		this.addChild(this.parts.wheel_LF);
		this.addChild(this.parts.wheel_LB);

		this.parts.propeller_R = this.game.add.sprite(-141,320,"bc-ndp","propeller.png");
		this.parts.propeller_L = this.game.add.sprite(141,320,"bc-ndp","propeller.png");
		this.parts.propeller_R.anchor.setTo(0.5,0.579);
		this.parts.propeller_L.anchor.setTo(0.5,0.579);

		//body sprite
		this.parts.body = this.game.add.sprite(0,0,"bc-ndp");
		this.parts.body.anchor.setTo(0.5,0);
		this.addChild(this.parts.body);

		//add drummers, horgan, suzuki, guards
		this.parts.drummer_01 = new Drummer(this.game,-66,595,'bc-ndp','b');
		this.parts.drummer_02 = new Drummer(this.game,-66,635,'bc-ndp','w');
		this.parts.drummer_03 = new Drummer(this.game,-66,675,'bc-ndp','b');

		this.parts.drummer_04 = new Drummer(this.game,66,595,'bc-ndp','w');
		this.parts.drummer_05 = new Drummer(this.game,66,635,'bc-ndp','b');
		this.parts.drummer_06 = new Drummer(this.game,66,675,'bc-ndp','w');

		this.addChild(this.parts.drummer_01);
		this.addChild(this.parts.drummer_02);
		this.addChild(this.parts.drummer_03);
		this.addChild(this.parts.drummer_04);
		this.addChild(this.parts.drummer_05);
		this.addChild(this.parts.drummer_06);

		//guards
		this.guard_01 = this.game.add.sprite(-130,220,'bc-ndp','guard_0.png');
		this.guard_02 = this.game.add.sprite(130,220,'bc-ndp','guard_1.png');
		this.guard_01.anchor.setTo(0.5);
		this.guard_02.anchor.setTo(0.5);
		this.guard_02.scaleX = -1

		this.addChild(this.guard_01);
		this.addChild(this.guard_02);

		//horgan
		this.horgan = this.game.add.sprite(0,290,'bc-ndp');
		this.horgan.anchor.setTo(0.5);
		// this.horgan.data = { // data for dialogue window
		// 	character: 'John Horgan',
		// 	name: 'John Horgan',
		// 	dI:0,
		// 	portrait:'horgan'
		// }
		this.horgan.animations.add('gesticulate',Phaser.Animation.generateFrameNames(`horgan_`,0,1,`.png`),6,true);
		this.horgan.animations.play('gesticulate');

		this.addChild(this.horgan);
		// this.game.NPCGroup.add(horgan);
		

		//suzuki
		this.suzuki = this.game.add.sprite(0,170,'bc-ndp');
		this.suzuki.anchor.setTo(0.5);
		// this.suzuki.data = {
		// 	character: 'David Suzuki',
		// 	name: 'David Suzuki',
		// 	dI: 0,
		// 	portrait: 'suzuki'
		// }
		this.suzuki.animations.add('shred',Phaser.Animation.generateFrameNames(`suzuki_`,0,1,`.png`),5,true);
		this.suzuki.animations.play('shred');

		this.addChild(this.suzuki);


		//add propellers as children after body so they're atop it
		this.addChild(this.parts.propeller_R);
		this.addChild(this.parts.propeller_L);


	}

	update() {
		this.parts.propeller_R.angle += 15;
		this.parts.propeller_L.angle += 15;
	}

	stop() {
		this.parts.wheel_RF.stop();
		this.parts.wheel_RB.stop();
		this.parts.wheel_LF.stop();
		this.parts.wheel_LB.stop();
		this.suzuki.animations.stop();
		this.horgan.animations.stop();
		// this.parts.drummer_01.stop();
		// this.parts.drummer_02.stop();
		// this.parts.drummer_03.stop();
		// this.parts.drummer_04.stop();
		// this.parts.drummer_05.stop();
		// this.parts.drummer_06.stop();
	}
}