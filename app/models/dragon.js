import EventEmitter from 'super-event-emitter';
import { Fireball } from './projectile-fireball';
import { ProjectileSignal } from './projectile-signal';

export class Dragon extends Phaser.Sprite {

	headMoveTween = null;
	combatActive = false;
	attackTimer = null;
	pauseTimer = null;

	constructor(game,x=0,y=0,key="sprites",frame,data) {
		super(game,x,y,key,frame,data);

		game.add.existing(this);
		this.game = game;
		game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.onCollide = new Phaser.Signal();
		this.data = data;

		EventEmitter.mixin(this);

		this.targetPos = {
			x: this.game.player.x,
			y: this.game.player.y
		}

		this.cW = this.game.camera.width;
		this.cH = this.game.camera.height;

		this.anchor.setTo(0.5,0.5);

		this.frameName = 'trigger.png';

		this.position.set(x,y); //limit to y depth
		//this.body.setSize(this.game.camera.width,this.cH/2); <= original setting. Player can't maneuver around them
		this.body.setSize(2000,360,-1000,-220);
		this.currentState = "_PAUSED";

		this.maxHealth = 20;
		this.health = 20;
		this.isType = "BOSS";
		this.engageDistance = 180;

		this.game.dragonGroup = this.game.add.group();
		this.parts = {};

		this.cam = this.game.camera;


		this.fixedToCamera = true;

		// create dragon parts
		this.parts.R_foot = this.game.add.sprite(-86,-60,"sprites",'dragon/right_foot.png');
			this.parts.R_foot.anchor.setTo(0.5,0);
			this.game.dragonGroup.add(this.parts.R_foot);
			this.addChild(this.parts.R_foot);

		this.parts.R_shoulder = this.game.add.sprite(-70,-130,"sprites",'dragon/right_shoulder.png');
			this.parts.R_shoulder.anchor.setTo(0.5,0);
			this.game.dragonGroup.add(this.parts.R_shoulder);
			this.addChild(this.parts.R_shoulder);

		this.parts.R_wing = this.game.add.sprite(-50,-155,"sprites",'dragon/right_wing.png');
			this.parts.R_wing.anchor.setTo(1,0.5);
			this.game.dragonGroup.add(this.parts.R_wing);
			this.addChild(this.parts.R_wing);

		this.parts.L_foot = this.game.add.sprite(86,-60,"sprites",'dragon/left_foot.png');
			this.parts.L_foot.anchor.setTo(0.5,0);
			this.game.dragonGroup.add(this.parts.L_foot);
			this.addChild(this.parts.L_foot);

		this.parts.L_shoulder = this.game.add.sprite(70,-130,"sprites",'dragon/left_shoulder.png');
			this.parts.L_shoulder.anchor.setTo(0.5,0);
			this.game.dragonGroup.add(this.parts.L_shoulder);
			this.addChild(this.parts.L_shoulder);

		this.parts.L_wing = this.game.add.sprite(50,-155,"sprites",'dragon/left_wing.png');
			this.parts.L_wing.anchor.setTo(0,0.5);
			this.game.dragonGroup.add(this.parts.L_wing);
			this.addChild(this.parts.L_wing);

		this.parts.body = this.game.add.sprite(0,-200,"sprites",'dragon/body.png');
			this.parts.body.anchor.setTo(0.5,0);
			this.game.dragonGroup.add(this.parts.body);
			this.addChild(this.parts.body);

		this.parts.neck4 = this.game.add.sprite(0,-120,"sprites",'dragon/neck_4.png');
			this.parts.neck4.anchor.setTo(0.5,0.5);
			this.game.dragonGroup.add(this.parts.neck4);
			this.addChild(this.parts.neck4);

		this.parts.neck3 = this.game.add.sprite(0,-90,"sprites",'dragon/neck_3.png');
			this.parts.neck3.anchor.setTo(0.5,0.5);
			this.game.dragonGroup.add(this.parts.neck3);
			this.addChild(this.parts.neck3);

		this.parts.neck2 = this.game.add.sprite(0,-70,"sprites",'dragon/neck_2.png');
			this.parts.neck2.anchor.setTo(0.5,0.5);
			this.game.dragonGroup.add(this.parts.neck2);
			this.addChild(this.parts.neck2);

		this.parts.neck1 = this.game.add.sprite(0,-30,"sprites",'dragon/neck_1.png');
			this.parts.neck1.anchor.setTo(0.5,0.5);
			this.game.dragonGroup.add(this.parts.neck1);
			this.addChild(this.parts.neck1);


		this.parts.jaw = this.game.add.sprite(0,60,"sprites",'dragon/jaw.png');
			this.parts.jaw.anchor.setTo(0.5);
			this.game.dragonGroup.add(this.parts.jaw);
			this.addChild(this.parts.jaw);


		this.parts.head = this.game.add.sprite(0,0,"sprites",'dragon/head.png');
			this.parts.head.anchor.setTo(0.5);
			this.game.dragonGroup.add(this.parts.head);
			this.addChild(this.parts.head);

		this.jawDistance = 60;


	}

	setSignal() {
		// create signal
		this.signal = new ProjectileSignal(this.game,this.x,this.y,this.parts.head,this);
		this.addChildAt(this.signal,11);
	}


	setState (state) {
		this.currentState = state;
		
	}

	update() {

		// neck follows head
		this.parts.neck1.position.x = this.parts.head.position.x / 1.4;
		this.parts.neck2.position.x = this.parts.neck1.position.x / 1.4;
		this.parts.neck3.position.x = this.parts.neck2.position.x / 1.4;

		// jaw follows head
		this.parts.jaw.position.x = this.parts.head.position.x;
		this.parts.jaw.position.y = this.parts.head.position.y + this.jawDistance;


		if (this.currentState === "_PAUSED") {
			return;
		} else if (this.currentState === "_MOVING") {
			// move head side to side - following player
			if (this.combatActive) {
				this.parts.head.position.x = this.followPlayerPos();
			}
		} else if (this.currentState === "_FIREBALL") {

		}
	}

	followPlayerPos() {
		var playerX = this.game.player.position.x;
		var center = this.game.camera.width/2;
		var x = center-playerX;
		return -x/4;
	}

	


	dramaticEntrance (time,callback) { //callback options, but generally good to carry on events once dragon's entered

		this.setState("_MOVING");
		// principle body movement
		this.parts.head.position.x += 40;
		let entranceTween = this.game.add.tween(this.cameraOffset).to({y: this.cam.height / 2 - 100}, time, "Quad.easeOut",true);
		let R_foot_tween = this.game.add.tween(this.parts.R_foot).to({y:this.parts.R_foot.y-30},time/8,"Quad.easeInOut",true,0,2);
		R_foot_tween.yoyo(true);
		let L_foot_tween = this.game.add.tween(this.parts.L_foot).to({y:this.parts.L_foot.y-30},time/8,"Quad.easeInOut",true,time/8,2);
		L_foot_tween.yoyo(true);
		let headMoveTween = this.game.add.tween(this.parts.head.position).to({x:this.parts.head.position.x-80},time/6,"Quad.easeInOut",true,0,1);
		headMoveTween.yoyo(true);

		const shake = () => {
			this.game.camera.shake(0.0025, time / 12);
			this.game.sfx.play('sfx_dragon_stomp',0.7);
		}

		//shake screen
		const timer = this.game.time.create(false);
		timer.loop(Phaser.Timer.SECOND/1.2,shake,250);
		timer.start();

		// return state to _PAUSED on complete
		entranceTween.onComplete.add(()=> {
			this.setState("_PAUSED");
			this.setSignal();
			timer.stop();
			if (callback) callback();
		});
		
		headMoveTween.onComplete.add(()=> {
			headMoveTween.yoyo(false);
			this.game.add.tween(this.parts.head.position).to({x:0},time/6,"Quad.easeInOut",true);
		});
	}

	quickExit (callback) {
		this.setState("_MOVING");
		this.game.sfx.play('sfx_dragon_takeoff');
		let exitTween = this.game.add.tween(this.cameraOffset).to({y:-this.cam.height/2},1200,"Quad.easeIn",true);
		exitTween.onComplete.add(()=> {
			if (callback) callback();
		});
	}

	scream(time,callback) {
		this.jawDistance = 76;
		let headMoveTween = this.game.add.tween(this.parts.head.position).to({y:40},200,"Quad.easeOut",true,60);
		this.game.sfx.play('sfx_dragon_roar',0.7);
		headMoveTween.yoyo(true,time);
		this.game.camera.shake(0.0025, 1450);
		headMoveTween.onComplete.add(() => {
			this.jawDistance = 60;
			if (callback) callback();
		});
	}

	hit() {
		this.emit('bossHit');
	}

	pullbackHead() {
	}

	setAttackTimer(_delay,_attack) {
		
		if (!_delay) _delay = this.setDelay();
		if (!_attack) _attack = this.selectRandomAttack();
		this.attackTimer = this.game.time.events.add(_delay,() => {this.setAttackSignal(_attack)},this);
		
	}

	setAttackSignal(_attack) {
		this.signal.sig(_attack);
	}

	setDelay() {
		return this.game.rnd.integerInRange(500, 1800);
	}

	selectRandomAttack() {
		// random number generates switch statement reference to pre-scripted attack types
		const int = this.game.rnd.integerInRange(0,3);
		//const int = 4;
		let distance = 160;
		if (this.game.physics.arcade.distanceBetween(this.game.player, this) <= distance) {
			switch (int) {
				case 0:
					return this.bite;
					break;
				case 1:
					return this.bite;
					break;
				case 2:
					return this.stomp;
					break;
				case 3:
					return this.stomp;
					break;
			}
		} else {
			switch (int) {
				case 0:
					return this.fireball;
					break;
				case 1:
					return this.fireballSequence;
					break;
				case 2:
					return this.fireballRing;
					break;
				case 3:
					return this.flamethrower;
					break;
			}
		}
	}

	fireball(_parent,_sequence) { // fire single fireball
		let t = _parent || this;
		t.jawDistance = 76;
		t.game.time.events.add(100,() => {
			t.createFireball();
			t.game.sfx.play('sfx_fireball');
			if (!_sequence) {
				t.game.time.events.add(400,() => {
					t.jawDistance = 60;
					t.setAttackTimer();
				});
			}
		});
	}

	fireballSequence(_parent) {
		let t = _parent || this;
		const randomNum = t.game.rnd.integerInRange(3,6);
		for (let i=0;i<randomNum;i++) {
			t.game.time.events.add(500*i,()=>{t.fireball(null,true);t.game.sfx.play('sfx_fireball');});
			if (i===randomNum-1) {
				t.jawDistance = 60;
				t.setAttackTimer((i*500)+2000);
			}
		}
	}

	checkHitPlayerDistance() {
		if (this.game.physics.arcade.distanceBetween(this.game.player, this) <= 200) {
			this.playerHit();
		}
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

	bite(_parent) {
		let t = _parent || this;
		
		t.setState("_PAUSED");
		let headBackTween = t.game.add.tween(t.parts.head.position).to({y:t.parts.head.position.y-40},400,"Quad.easeOut",true);
		headBackTween.onComplete.add(()=>{
			//headBackTween.onComplete.removeAll();
			t.jawDistance = 76;
			let x = 80*Phaser.Math.sign();
			headBackTween = t.game.add.tween(t.parts.head.position).to({x:x,y:t.parts.head.position.y+90},160,"Quad.easeOut",true);
			t.game.sfx.play('sfx_dragon_chomp');
			headBackTween.onComplete.add(() => {
				t.checkHitPlayerDistance();
				t.jawDistance = 60;
				//headBackTween.onComplete.removeAll();
				headBackTween= t.game.add.tween(t.parts.head.position).to({y:t.parts.head.position.y-50},70,null,true);
				headBackTween.onComplete.add(()=>{
					headBackTween.onComplete.removeAll();
					t.setAttackTimer(1200);
				});
			});
		});
	}

	fireballRing(_parent) {
		let t = _parent || this;
		t.setState("_PAUSED");
		let headTween = t.game.add.tween(t.parts.head.position).to({x:0,y:t.parts.head.position.y+30},200,"Quad.easeOut",true);
		headTween.onComplete.add(()=>{
			var delayTimer = t.game.time.events.add(t.game.rnd.integerInRange(80,180),()=>{
				t.jawDistance = 76;
				const num = 6;
				t.game.sfx.play('sfx_fireball');
				for (let i=0;i<num;i++) {
					t.createFlameThrowerFireball(i*160,600);
				}
				var resetTimer = t.game.time.events.add(1200,() => {
					t.jawDistance = 60;
					let headBackTween = t.game.add.tween(t.parts.head.position).to({y:t.parts.head.position.y-30},200,"Quad.easeOut",true);
					headBackTween.onComplete.add(()=>{
						t.setState("_MOVING");
						t.setAttackTimer(t.game.rnd.integerInRange(700, 1300));
					});
				});
			});
		});
	}

	createFireballRing(_x,_y) {
		let projectile = this.game.projectileGroup.getFirstExists(false);

	}

	flamethrower(_parent) {
		let t = _parent || this;
		t.jawDistance = 76;
		t.game.sfx.play('sfx_fireballBig');
		var createFlamesTimer = t.game.time.events.loop(50,t.createFlameThrowerFireball,t);
		t.setState("_PAUSED");
		t.targetPos = {
			x: t.game.player.x,
			y: t.game.player.y
		}
		var flameThrowerTimer = t.game.time.events.add(t.game.rnd.integerInRange(700,2200),() => {
			t.jawDistance = 60;
			t.game.time.events.remove(createFlamesTimer);
			t.setState("_MOVING");
			t.setAttackTimer(t.game.rnd.integerInRange(800,1100));
		});
	}

	createFlameThrowerFireball(_x,_y) {
		let projectile = this.game.projectileGroup.getFirstExists(false);
		let x = _x || this.targetPos.x;
		let y = _y || this.targetPos.y;
		let timer = _x ? 1000 : this.game.rnd.integerInRange(300, 600);
		if (!projectile) {
			projectile = new Fireball(this.game,this.x+this.parts.head.position.x,this.y+65,"sprites",null,420,timer);
			this.game.projectileGroup.add(projectile);
		} else {
			projectile.reset(this.x + this.parts.head.position.x, this.y + 65);
			projectile.speed = 420;
			projectile.exploding = false;
			projectile.canDropItems = false;
			projectile.body.setSize(24, 16, 0, 0);
			projectile.timerReset(timer);
			projectile.animations.play('fire');
		}
		projectile.origin = this;
		this.game.physics.arcade.moveToXY(projectile, x, y, projectile.speed);
	}

	createFireball() {
		let projectile = this.game.projectileGroup.getFirstExists(false);
		if (!projectile) {
			projectile = new Fireball(this.game, this.x+this.parts.head.position.x, this.y+46, "sprites",null,300,null,true);
			this.game.projectileGroup.add(projectile);
		} else {
			projectile.reset(this.x+this.parts.head.position.x, this.y + 46);
			projectile.canDropItems = true;
			projectile.speed = 300;
			projectile.exploding = false;
			projectile.timerReset();
			projectile.body.setSize(24, 16, 0, 0);
			projectile.animations.play('fire');
		}
		projectile.origin = this;
		this.game.physics.arcade.moveToXY(projectile, this.game.player.x, this.game.player.y, projectile.speed); // projectile speed
	}

	stomp(_parent) {
		let t = _parent || this;
		t.setState("_PAUSED");
		t.parts.head.position.x += 10;
		var time = 800;
		let R_foot_tween = t.game.add.tween(t.parts.R_foot).to({y:t.parts.R_foot.y-30},time/8,"Quad.easeInOut",true,0,2);
		R_foot_tween.yoyo(true);
		let L_foot_tween = t.game.add.tween(t.parts.L_foot).to({y:t.parts.L_foot.y-30},time/8,"Quad.easeInOut",true,time/8,2);
		L_foot_tween.yoyo(true);
		let headMoveTween = t.game.add.tween(t.parts.head.position).to({x:t.parts.head.position.x-20},time/6,"Quad.easeInOut",true,0,1);
		headMoveTween.yoyo(true);

		const shake = () => {
			t.game.camera.shake(0.0025, time / 12);
			t.game.sfx.play('sfx_dragon_stomp', 0.7);
		}

		//shake screen
		const timer = t.game.time.create(false);
		timer.loop(Phaser.Timer.SECOND / 1.2, shake, 250);
		timer.start();

		headMoveTween.onComplete.add(()=> {
			headMoveTween.yoyo(false);
			timer.stop();
			t.parts.head.position.x = 0;
			t.setState("_PAUSED");
			t.setAttackTimer(200);
		});

		t.checkHitPlayerDistance();
	}
}