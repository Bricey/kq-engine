import EventEmitter from 'super-event-emitter';
import { ProjectileSignal } from './projectile-signal';
import { Toxicball } from './projectile-toxicball';
import { Explosion } from './explosion';

export class InvisibleHand extends Phaser.Sprite {

	constructor(game,x=0,y=0,key="bosses-atlas",frame,data) {
		super(game,x,y,key,frame,data);

		game.add.existing(this);
		this.game = game;
		game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.onCollide = new Phaser.Signal();
		this.data = {
			name: 'The Invisible Hand',
			dI : data
		};

		EventEmitter.mixin(this);

		this.targetPos = {
			x: this.game.player.x,
			y: this.game.player.y
		}

		this.cW = this.game.camera.width;
		this.cH = this.game.camera.height;

		this.anchor.setTo(0.5,0.7);
		this.body.setSize(200,220,20,0) // change this later
		this.currentState = "_PAUSED";
		this.engageDistance = 140;

		this.maxHealth = 30;
		this.health = 30;
		this.speed = 240;
		this.isType = "BOSS";

		this.combatActive = false;
		this.direction = 1;

		this.tweens = {};
		this.explosionsGroup = this.game.add.group();


		//create crush graphic
		this.crushFlash = this.game.add.graphics(0,0);
		this.crushFlash.beginFill(0xffffff,0.65);
		this.crushFlash.drawCircle(0,0,300);
		this.crushFlash.endFill();
		this.crushFlash.alpha = 0;
		this.game.world.addChildAt(this.crushFlash,4);

		// this.tweens.inTween = null;
		// this.tweens.outTween = null;
		// this.tweens.downTween = null;

		this.animations.add('move',Phaser.Animation.generateFrameNames(`hand/hand_0`,2,4,'.png'),5,true); // move
		this.animations.add('flick',Phaser.Animation.generateFrameNames(`hand/hand_0`,5,6,'.png'),5,false); // flick
		this.animations.add('prone',Phaser.Animation.generateFrameNames(`hand/hand_0`,0,1,'.png'),1,true) // prone
		this.animations.add('crush',Phaser.Animation.generateFrameNames(`hand/hand_0`,7,7,'.png'),1,false) // crush
		this.animations.add('shoot',Phaser.Animation.generateFrameNames(`hand/hand_0`,8,9,'.png'),5,true) // shoot
		this.animations.add('swat',Phaser.Animation.generateFrameNames(`hand/hand_`,10,12,'.png'),8,false) // swat
		this.animations.add('full-shoot',Phaser.Animation.generateFrameNames(`hand/hand_13.png`),1,false) // full finger shoot

		this.frameName = `hand/_0.png`;

		// //create anchor ref
		// var ref = this.game.add.sprite(0,0,"sprites","trigger.png");
		// this.addChild(ref);
	}

	setState = (_state) => {
		this.currentState = _state;
	}

	update = () => {
		if (this.game.player.isTalking === true || this.game.player.questsActive || this.game.player.inventoryActive) return;
		
		if (this.currentState === "_PAUSED") {
			this.body.velocity.set(0);
		} else if (this.currentState === "_MOVING" && this.health > 0) {
			if (this.x <= 140) { this.direction = 1; }
			if (this.x >= 820) { this.direction = -1; }
			this.body.velocity.set(this.speed * this.direction, 0);
		}
	}

	startBattle = () => {
		//create barrier at top of map so player can't attack from sides or get caught


		//set up move and attack timers
		this.game.world.moveUp(this.game.enemyGroup);
		this.game.world.moveUp(this.game.enemyGroup);
		this.tweens.handTween.stop();
		//remove enemyGroup world limits
		this.game.enableEnemyObstacleCollide = false;
		var moveTween = this.game.add.tween(this.position).to({y:250},700,null,true);
		moveTween.onComplete.add(()=>{
			this.game.camera.follow(null);
			this.setState("_MOVING");
			this.combatActive = true;
			this.setSignal();
			this.setMoveTimer(600);
			this.setAttackTimer(this.setDelay(),this.plasmaBall);
		});
	}

	setSignal() {
		this.signal = new ProjectileSignal(this.game, this.x - 10, this.y, this, this);
		this.addChild(this.signal);
	}

	setMoveTimer = (_time) => {
		
		if (!_time) _time = this.setTime();
		this.direction = Phaser.Utils.randomChoice(1, -1);
		this.setState("_MOVING");
		this.animations.play('move');
		this.moveTimer = this.game.time.events.add(_time, this.stop, this);
	}

	setAttackTimer = (_delay,_attack) => {
		this.animations.play('move');
		if (!_delay) _delay = this.setDelay();
		if (!_attack) _attack = this.selectRandomAttack();
		this.attackTimer = this.game.time.events.add(_delay,() => {this.setAttackSignal(_attack)},this)
	}

	setAttackSignal = (_attack) => {
		this.signal.sig(_attack);
	}

	stop = () => {
		
		this.body.velocity.set(0);
		this.animations.stop();
		this.setState("_PAUSED");
		this.movePauseTimer = this.game.time.events.add(this.setPauseTime(), this.setMoveTimer, this);
	}

	setTime() {
		return this.game.rnd.integerInRange(1400, 2500);
	}

	setPauseTime() {
		return this.game.rnd.integerInRange(500, 1000);
	}

	setDelay() {
		return this.game.rnd.integerInRange(500, 1000);
	}

	plasmaBall = (_parent) => {
		let t = _parent || this;
		this.animations.play('shoot');
		t.game.time.events.add(200,() => {
			if (this.health > 0) {
				t.createPlasmaBall();
				this.resetAttackTimer(200);
			}
		});
	}

	createPlasmaBall = () => {
		let projectile = this.game.projectileGroup.getFirstExists(false);
		if (!projectile) {
			projectile = new Toxicball(this.game,this.x+24,this.y,"sprites",null,420,null,true,false);
			this.game.projectileGroup.add(projectile);
		} else {
			projectile.speed = 420;
			projectile.timerReset();
			projectile.reset(this.x+24,this.y);
			projectile.body.setSize(16, 16, 0, 0);
			projectile.animations.play('fire');
		}
		projectile.origin = this;
		this.game.sfx.play('sfx_fireball');
		this.game.physics.arcade.moveToXY(projectile, this.game.player.x, this.game.player.y, projectile.speed);
	}

	resetAttackTimer = (_delay) => {
		this.game.time.events.add(_delay, () => {
			this.setAttackTimer();
		});
	}

	meleeStrike = (_distance) => {
		if (this.game.physics.arcade.distanceBetween(this, this.game.player) <= _distance && this.health > 0) {
			this.playerHit();
		}
	}

	swat = () => {
		this.setState("_PAUSED");
		this.game.time.events.remove(this.moveTimer);
		this.tweens.outTween = this.game.add.tween(this.position).to({x:this.game.player.x-60,y:this.game.player.y-120},300,Phaser.Easing.Quadratic.In,true);
		this.tweens.outTween.onComplete.add(()=>{
			var anim = this.animations.play('swat');
			this.game.sfx.play('sfx_handSwat');
			//sfx
			this.game.time.events.add(100,()=>{
				this.meleeStrike(120);
			});
			//anim.onComplete.add(()=>{
				this.tweens.inTween = this.game.add.tween(this.position).to({y:250},600,Phaser.Linear,true,600);
				this.tweens.inTween.onComplete.addOnce(()=>{
					if (this.health > 0) {
						this.position.y = 250;
						this.setMoveTimer();
						this.resetAttackTimer(200);
					}
				});
			//});
		});
	}

	playCrushFlash = () => {
		this.crushFlash.x = this.x;
		this.crushFlash.y = this.y;
		this.game.flash(this.crushFlash);
	}

	crush = () => {
		this.game.time.events.remove(this.moveTimer);
		this.tweens.outTween = this.game.add.tween(this.position).to({y:-220},500,Phaser.Linear,true);
		this.tweens.outTween.onComplete.add(()=>{
			this.game.time.events.add(this.game.rnd.integerInRange(600,1200),()=>{
				this.animations.play('crush');
				this.tweens.downTween = this.game.add.tween(this.position).to({x:this.game.rnd.integerInRange(-50,50)+this.game.player.x,y:this.game.rnd.integerInRange(-50,50)+this.game.player.y},320,Phaser.Linear,true);
				this.game.sfx.play('sfx_handFall');
				this.tweens.downTween.onComplete.addOnce(()=>{
					// sfx
					this.playCrushFlash();
					this.game.sfx.play('sfx_handCrush');
					this.game.camera.shake(0.0025, 400);
					this.meleeStrike(70);
					this.tweens.outTween = this.game.add.tween(this.position).to({y:250},600,Phaser.Linear,true,600);
					this.tweens.outTween.onComplete.add(()=>{
						if (this.health > 0) {
							this.position.y = 250;
							this.setMoveTimer();
							this.resetAttackTimer(200);
						}
					});
				});
			});
		});
	}

	flick = () => {
		this.setState("_PAUSED");
		this.game.time.events.remove(this.moveTimer);
		this.tweens.outTween = this.game.add.tween(this.position).to({x:this.game.player.x-20,y:this.game.player.y-25},200,Phaser.Easing.Quadratic.In,true);
		this.animations.play('flick');
		this.tweens.outTween.onComplete.add(()=>{
			//this.game.time.events.add(100,()=>{
				this.meleeStrike(100);
			//});
			//anim.onComplete.add(()=>{
				this.tweens.inTween = this.game.add.tween(this.position).to({y:250},600,Phaser.Linear,true,700);
				this.game.sfx.play('sfx_handSwat');
				//this.animations.play('move');
				this.tweens.inTween.onComplete.addOnce(()=>{
					if (this.health > 0) {
						this.position.y = 250;
						this.setMoveTimer();
						this.resetAttackTimer(200);
					}
				});
			//});
		});
	}

	full_shoot = (_parent) => {
		let t = _parent || this;
		this.setState("_PAUSED");
		this.game.time.events.remove(this.moveTimer);
		this.animations.play('full-shoot');
		const num = 5;
		for (let i=0;i<num;i++) {
			t.createFullShootPlasmaBall(i*160,600);
		}
		this.game.time.events.add(1200,()=>{
			if (this.health > 0) {
				this.setMoveTimer();
				this.resetAttackTimer(200);
			}
		});
	}

	createFullShootPlasmaBall(_x,_y) {
		let projectile = this.game.projectileGroup.getFirstExists(false);
		let x = _x || this.game.player.x;
		let y = _y || this.game.player.y;
		let timer = _x ? 1000 : this.game.rnd.integerInRange(300,600);
		if (!projectile) {
			projectile = new Toxicball(this.game,this.x,this.y-80,"sprites",null,420);
			this.game.projectileGroup.add(projectile);
		} else {
			projectile.reset(this.x, this.y-80);
			projectile.animations.play('fire');
		}
		projectile.origin = this;
		this.game.sfx.play('sfx_fireball');
		this.game.physics.arcade.moveToXY(projectile,x,y,projectile.speed);
	}

	selectRandomAttack = () => {
		const int = this.game.rnd.integerInRange(0,3);
		let distance = 120;
		if (this.game.physics.arcade.distanceBetween(this.game.player, this) <= distance) {
			switch (int) { //melee
				case 0:
					return this.flick;
					break;
				case 1:
					return this.swat;
					//crush
					break;

				case 2:
					return this.flick;
					//swat
					break;

				case 3:
					return this.swat;
					//flick
					break;
			}
		} else {
			switch (int) { //projectile
				case 0:
					return this.crush;
					break;
				case 1:
					return this.crush;
					//swat
					break;

				case 2:
					return this.crush;
					//crush
					break;

				case 3:
					return this.crush;
					//full-shoot
					break;
			}
		}
	}

	playerHit() {
		if (!this.game.player.isHit) {
			this.game.player.damage(2);
			this.game.player.isHit = true;
			this.game.player.currentState = "_NEUTRAL";
			this.game.player.isAttacking = false;
			this.game.player.body.velocity.setTo(0, 600);
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

	hit() {
		this.emit('bossHit');
	}

	
	explosion = () => {
		let explosion = this.explosionsGroup.getFirstExists(false);
		const x = this.game.rnd.integerInRange(this.x - this.width / 2, this.x + this.width / 2-45);
		const y = this.game.rnd.integerInRange(this.y - this.height / 1.25, this.y);
		if (!explosion) {
			explosion = new Explosion(this.game, x, y, "sprites");
			this.explosionsGroup.add(explosion);
		} else {
			explosion.reset();
			explosion.x = x;
			explosion.y = y;
			explosion.play();
		}

	}

	death = () => {
		this.animations.play('prone');

		this.game.sfx.play('sfx_handDeath');

		if (this.tweens.inTween !== undefined) this.tweens.inTween.stop();
		if (this.tweens.outTween !== undefined) this.tweens.outTween.stop();
		if (this.tweens.downTween !== undefined)  this.tweens.downTween.stop();
		this.game.time.events.stop(this.moveTimer);
		this.game.time.events.stop(this.attackTimer);
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.actions.walkTo(this.game.player,{x:this.game.world.width/2,y:this.game.camera.height/2+160},500,0,()=>{
			this.game.player.frameName = "hero-mab/_01.png";
			//start explosions
			// set timer to run explosion every .2 second?
			this.game.time.events.remove(this.moveTimer);
			this.game.time.events.remove(this.attackTimer);
			this.game.time.events.start();
			this.explosionTimer = this.game.time.events.loop(Phaser.Timer.SECOND/10, this.explosion, this);
			// this.game.time.events.start(explosion);

		});
		// monster to center and blows up
		
	}


}