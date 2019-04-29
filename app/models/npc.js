export class NPC extends Phaser.Sprite {
	constructor(game,x = 0,y = 0,key = 'sprites',frame,data) {
		super(game,x,y,key,frame,data);
	// constructor (game,params = {
	// 		id: '',
	// 		x: 0,
	// 		y: 0,
	// 		static: true,
	// 		inventory: []
	// 	},
	// 	key = "sprites") { //params is supplied object from Tiled map npc object template
		
		//params = {
		//	id: 01,
		//	x: 0,
		//	y: 0,
		//	static: true/false,
		//	inventory: [some object]
		//}

		//super(game,params,key);
		game.add.existing(this);
		game.physics.arcade.enable(this);
		this.body.collideWorldBounds = true;
		if (!data.isCompanion) this.body.immovable = true;
		if (!data.isCompanion) this.body.onCollide = new Phaser.Signal();
		this.data = data;

		// if npc has engageDistance, set to main scope
		if (data.engageDistance) this.engageDistance = data.engageDistance;

		this.movementTimer = null;

		this.anchor.setTo(0.5);
		this.body.setSize(36,40,0,8);
		this.currentState = "_PAUSED";
		this.isType = 'NPC';
		this.static = data.static;

		this._SPEED = this.data.speed || 40;
		this.isMoving = false;
		// this.isPaused = true;
		this.hasMoveAssignment = false;
		this.animSpeed = 6;
		// this.npcIDString = {
		// 	mf: `npc-${params.id}-mf/_0`
		// }


		if (data.character !== "John Horgan") {
			this.animations.add('walk-forward',Phaser.Animation.generateFrameNames(`npc-${data.id}-mf/_0`,1,4,'.png'),this.animSpeed,true);
			this.animations.add('walk-backward',Phaser.Animation.generateFrameNames(`npc-${data.id}-mb/_0`,1,4,'.png'),this.animSpeed,true);
			this.animations.add('walk-left',Phaser.Animation.generateFrameNames(`npc-${data.id}-ml/_0`,1,4,'.png'),this.animSpeed,true);
			this.animations.add('walk-right',Phaser.Animation.generateFrameNames(`npc-${data.id}-mr/_0`,1,4,'.png'),this.animSpeed,true);

			this.animations.add('laugh',Phaser.Animation.generateFrameNames(`npc-${data.id}-laf/_0`,1,2,'.png'),4,true);
			this.animations.add('celebrate',Phaser.Animation.generateFrameNames(`npc-${data.id}-cel/_0`,1,2,'.png'),4,true);

			if (!frame) {
				//if (!this.currentFrame === undefined) {
					this.animations.play('walk-forward').stop();
				// } else {
				// 	debugger;
				// }
			} else {
				this.frameName = frame;
			}
		} else {
			this.animations.add('gesticulate', Phaser.Animation.generateFrameNames(`horgan_`, 0, 1, `.png`), 6, true);
		}

		// ------------ ACTIONS SPECIFIC TO KEY NPCs ------------------//
		
		
		if (data.id === 16) { //notley
			this.animations.add('show-crystal',Phaser.Animation.generateFrameNames(`npc-16-crystal/_0`,1,1,'.png'),1,false);
			this.animations.add('dance',Phaser.Animation.generateFrameNames(`npc-16-pride-cel/_0`,1,2,'.png'),6,true);
		}

		if (data.id === 19) { //empress bovina
			this.body.setSize(52,88,0,0);
		}

		if (data.id === 12 && this.data.dying) {
			this.animations.add('wounded',Phaser.Animation.generateFrameNames(`npc-12-death/_0`,1,2,'.png'),7,true);
		}

		if (data.id === 45) { //stratejesters
			this.body.setSize(130,72,0,0);
		}


		if (!this.static) this.assignMovementCoords();

		// COMPANION SETTINGS	
		if (this.data.isCompanion) {
			this.animSpeed = 1;
		}

		// if (!params.static) {
		// 	this.setWalkingState();
		// } else {
		// 	this.currentState = "_PAUSED";
		// }
	}

	update() {
		if (this.game.player.isTalking || this.game.player.questsActive || this.game.player.inventoryActive) {
			this.body.velocity.setTo(0);
			return;
		}
		if (this.data.isCompanion && this.data.isFollowing) {
			if (this.game.physics.arcade.distanceBetween(this,this.game.player) >= 120) {
				this.currentState === "_MOVING";
				this.game.physics.arcade.moveToObject(this,this.game.player,this.game.player.maxSpeed / 1.2);
				this.animations.play(`walk-${this.calcMovementDirection()}`)
				if (this.game.physics.arcade.distanceBetween(this, this.game.player) >= 500) {
					this.position.setTo(this.game.player.x + 36, this.game.player.y);
				}
			} else {
				this.animations.stop();
				this.currentState === "_PAUSED";
				this.body.velocity.setTo(0);
			}
			return;
		}
		if (!this.static) {
			if (this.currentState === "_MOVING") {
				// this.body.velocity.setTo(this._SPEED);
				// //this.game.physics.arcade.moveToXY(this,)
			} else if (this.currentState === "_PAUSED") {
				return;
			}
		}
	}
	assignMovementCoords() {
		this.isMoving = true;
		this.body.velocity.set(this.game.rnd.integerInRange(-1,1)*this._SPEED,this.game.rnd.integerInRange(-1,1)*this._SPEED);
		this.animations.play(`walk-${this.calcMovementDirection()}`);
		this.movementTimer = this.game.time.events.add(this.game.rnd.integerInRange(1200,2200),() => {
			this.isMoving = false;
			this.setPauseState();
		});

	}
	calcMovementDirection() {
		const vX = this.body.velocity.x;
		const vY = this.body.velocity.y;
		//const dir = null;
		if (vY === 0) {
			if (vX === 0) {
				return 'forward';
			} else {
				return vX<0?'right':'left';	
			}
		} else {
			return vY<0?'backward':'forward';
		}
	}

	setPauseState() {
		this.animations.stop();
		this.frameName = `npc-${this.data.id}-mf/_01.png`;
		this.body.velocity.set(0);
		this.movementTimer = this.game.time.events.add(this.game.rnd.integerInRange(1500,2600),() => {
			this.assignMovementCoords();
		});
	}

	setWalkingState() {

	}
	stopMovement() {
		this.game.time.events.remove(this.movementTimer);
		this.body.velocity.set(0);
	}
}