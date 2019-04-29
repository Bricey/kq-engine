import { Enemy } from './enemy';

export class Rat extends Enemy {
	constructor(game,x=0,y=0,key='sprites',frame,data) {
		super(game,x,y,key,frame,data);

		this._MAXSPEED = 100;
		this._ADDSPEED = this.game.rnd.between(5,20);
		this._STRIKE_VELOCITY = 200;

		this.body.setSize(20,20,0,0);

		this.health = this.game.rnd.integerInRange(1,3);


		this.animations.add("walk-forward",Phaser.Animation.generateFrameNames('rat-af/_0',1,4,".png"),5,true);
		this.animations.add("walk-backward",Phaser.Animation.generateFrameNames('rat-ab/_0',1,4,".png"),5,true);
		this.animations.add("walk-left",Phaser.Animation.generateFrameNames('rat-al/_0',1,4,".png"),5,true);
		this.animations.add("walk-right",Phaser.Animation.generateFrameNames('rat-ar/_0',1,4,".png"),5,true);

		this.animations.add("death",Phaser.Animation.generateFrameNames('rat-death/_0',1,3,".png"),6,false);

		this.currentState = "_PATROL";
		this.setPatrolState();
	}

	update() {

		if (this.health <= 0) return;
		
		if (this.game.player.isTalking || this.game.player.questsActive || this.game.player.inventoryActive) {
			this.body.velocity.setTo(0);	
			return;
		}
		if (this.game.physics.arcade.distanceBetween(this.game.player,this) > 320 && this.currentState === "_ALERT") {
			this.setPatrolState();
			return;
		}
		if (this.currentState === "_PATROL") {
			if (this.game.physics.arcade.distanceBetween(this.game.player,this) <= 240) {
				this.currentState = "_ALERT";
				// clearTimeout(this.isMovingTimeout);
				// clearTimeout(this.isPausedTimeout);
				this.isPaused = false;
			} else {
				return;
			}
		} else if (this.currentState === "_ALERT") {
            this.game.time.events.remove(this.movementTimer);
			this.body.velocity.setTo(this._MAXSPEED+this._ADDSPEED);
			this.game.physics.arcade.moveToXY(this,this.game.player.x,this.game.player.y,this._MAXSPEED+this._ADDSPEED);
			this.animations.play('walk-' + this.faceDirection(this.game.player.x,this.game.player.y,true));
			if (!this.isAlerted) {
				//move toward player
				this.isAlerted = true;
			}
            if (!this.body.touching.none) {
				this.currentState = "_ATTACKING";
				this.body.velocity.setTo(0);
				this.attack();
			}
		} else if (this.currentState === "_ATTACKING" && !this.isAttacking) {
			if (!this.isAttacking) this.isAttacking = true;
		} else if (this.currentState === "_PAUSED") {
			this.body.velocity.setTo(0);
			this.animations.play('walk-' + this.faceDirection(this.game.player.x,this.game.player.y,true)).stop();
		} else if (this.currentState === "_HIT") {
            return;
        }
	}

	setPatrolState() {
    	if (this == null) return; // Current fix for movementTimer cancellation on death not triggering
		this.currentState = "_PATROL";
    	this.isMoving = true;
		this.body.velocity.set(this.game.rnd.integerInRange(-1,1)*this._MAXSPEED,this.game.rnd.integerInRange(-1,1)*this._MAXSPEED);
    	this.animations.play(`walk-${this.calcMovementDirection()}`);
    	this.movementTimer = this.game.time.events.add(this.game.rnd.integerInRange(1600,3000),() => {
            this.isMoving = false;
            this.setPauseState();
        });  
	}

	attack() {
		this.game.time.events.add(200,() => {
			if (this.game.physics.arcade.distanceBetween(this.game.player,this) <= 60 && !this.game.player.isHit && !this.isDead) {
    			this.playerHit(1); // Damage to player
    			this.setAttackPauseState();
    		}
        });
	}
}

