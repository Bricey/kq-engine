import EventEmitter from 'super-event-emitter';
import { Toxicball } from './projectile-toxicball';
import { ProjectileSignal } from './projectile-signal';

export class RatKing extends Phaser.Sprite {

	combatActive = false;
	attackTimer = null;
	moveTimer = null;
	movePauseTimer = null;
	pauseTimer = null;

	constructor(game,x=0,y=0,key="sprites",frame,data) {
		super(game,x,y,key,frame,data);

		game.add.existing(this);
		this.game = game;
		game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.onCollide = new Phaser.Signal();
		this.data = data;
		//this.data.nodeQuestId = 'kq-q-ratking-4';

		EventEmitter.mixin(this);

		this.targetPos = {
			x: this.game.player.x,
			y: this.game.player.y
		}

		this.cW = this.game.camera.width;
		this.cH = this.game.camera.height;

		this.anchor.setTo(0.5,0.9);

		this.body.setSize(300,192,-150,0); //orig x:8-
		this.currentState = "_PAUSED";

		this.maxHealth = 20;
		this.health = 20;
		this.speed = 320;
		this.direction = 1;
		this.isType = "BOSS";
		this.engageDistance = 100;

		this.animations.add('move',Phaser.Animation.generateFrameNames(`move/_0`,1,2,'.png'),6,true);
		this.animations.add('attack',Phaser.Animation.generateFrameNames(`attack/_0`,1,2,'.png'),6,true);

		this.frameName = 'move/_01.png';

		this.cameraBounds = true;

		this.create_top_boundary();
	}

	create_top_boundary() {
		let boundary = this.game.add.sprite(0, 160, "sprites", "trigger.png");
		this.game.physics.arcade.enable(boundary);
		boundary.body.immovable = true;
		boundary.body.onCollide = new Phaser.Signal();
		boundary.body.setSize(this.game.camera.width, 32);
		this.game.objGroup.add(boundary);
		
	}

	setSignal() {
		this.signal = new ProjectileSignal(this.game,this.x-10,this.y,this,this);
		this.addChild(this.signal);
	}

	setState (state) {
		this.currentState = state;
		
	}

	update() {

		this.scale.x = -this.direction;

		if (this.x <= 55) { this.direction = 1; }
		if (this.x >= 870) { this.direction = -1; }


		if (this.currentState === "_PAUSED") {
			return;
		} else if (this.currentState === "_MOVING") {
			this.body.velocity.set(this.speed*this.direction,0);
			if (this.combatActive) {	
				
			}
		} 
	}

	dramaticEntrance(callback) {
		var ratKingTween = this.game.add.tween(this.position).to({y:180},1300,Phaser.Easing.Bounce.Out,true,200);
		//! sfx fall
		this.game.add.tween(this.game.player.position).to({y:500},600,Phaser.Easing.Quadratic.InOut,true,300);
		this.game.sfx.play('sfx_jump_upDown');
		ratKingTween.onComplete.add(callback);
	}

	scream(time,callback) {
		this.game.sfx.play('sfx_ratDeath');
		this.frameName = 'attack/_01.png';
		this.game.camera.shake(0.006,700);
		this.game.camera.onShakeComplete.addOnce(callback);
	}

	hit() {
		this.emit('bossHit');
	}

	setMoveTimer(_time) {
		if (!_time) _time = this.setTime();
		this.direction = Phaser.Utils.randomChoice(1,-1);
		this.setState("_MOVING");
		this.moveTimer = this.game.time.events.add(_time,this.stop,this);
	}

	setAttackTimer(_delay,_attack) {
		this.animations.play('move');
		
		if (!_delay) _delay = this.setDelay();
		if (!_attack) _attack = this.toxicBall;
		this.attackTimer = this.game.time.events.add(_delay,()=>{this.setAttackSignal(_attack)},this);
	}

	setAttackSignal(_attack) {
		this.signal.sig(_attack);
	}

	stop() {
		this.body.velocity.set(0);
		this.setState("_PAUSED");
		this.movePauseTimer = this.game.time.events.add(this.setPauseTime(),this.setMoveTimer,this);
	}

	toxicBall(_parent) {
		let t = _parent || this;
		t.animations.play('attack');
		t.game.time.events.add(100,() => {
			t.createToxicball();
			t.game.sfx.play('sfx_fireball');
				t.game.time.events.add(400,() => {
					t.setAttackTimer();
			});
		});
	}

	setTime() {
		return this.game.rnd.integerInRange(400,1500);
	}

	setPauseTime() {
		return this.game.rnd.integerInRange(1500, 3200);
	}

	setDelay() {
		return this.game.rnd.integerInRange(500, 1800);
	}

	// selectRandomAttack() {
	// 	const int = this.game.rnd.integerInRange(0,3);
	// 	switch (int) {
	// 			case 0:
	// 				return this.toxicBall;
	// 				break;
	// 			case 1:
	// 				return this.toxicBall;
	// 				break;
	// 			case 2:
	// 				return this.toxicBall;
	// 				break;
	// 			case 3:
	// 				return this.toxicBall;
	// 				break;
	// 	}
	// }

	createToxicball() { // if _bomb param passed, is a bomb
		let _bomb = Phaser.Utils.chanceRoll(20);
		let projectile = this.game.projectileGroup.getFirstExists(false);
		if (!projectile) {
			if (_bomb) {
				projectile = new Toxicball(this.game, this.x, this.y + 13, "sprites", null, 140, this.bombTimer(), true,true);
			} else {
				projectile = new Toxicball(this.game,this.x,this.y+13,"sprites",null,300,null,true,false);
			}
			this.game.projectileGroup.add(projectile);
		} else {
			// reset projectile
			if (_bomb) {
				projectile.speed = 140;
				projectile.timerReset(this.bombTimer());
				projectile.isBomb = true;
			} else {
				projectile.speed = 300;
				projectile.isBomb = false;
				projectile.timerReset();
			}
			projectile.inBombMode = false;
			projectile.aboutToExplode = false;
			projectile.reset(this.x,this.y+13);
			projectile.exploding = false;
			projectile.body.setSize(16,16,0,0);
			projectile.animations.play('fire');
		}
		projectile.origin = this;
		this.game.sfx.play('sfx_fireball');
		this.game.physics.arcade.moveToXY(projectile,this.game.player.x,this.game.player.y,projectile.speed);
	}

	bombTimer() {
		return this.game.rnd.integerInRange(300,700);
	}

	playerHit() {
        if (!this.game.player.isHit) {
            this.game.player.damage(2);
            this.game.player.isHit = true;
            this.game.player.currentState = "_NEUTRAL";
            this.game.player.isAttacking = false;
            this.game.player.body.velocity.setTo(0,600);
            this.game.player.isTalking = true;
            this.game.healthPanel.playerHit(this.game.player.health);
            this.game.flash(this.game.player); //Flash() located in game.js => universal function directory
            var fallBack = this.game.time.events.add(300, () => {
                this.game.player.body.velocity.setTo(0);
                this.game.player.isTalking = false;
                var returnPlay = this.game.time.events.add(1000, () => { // provide half a second of time before player can be struck again
                    this.game.player.isHit = false;
                });
            });
        }
    }

}