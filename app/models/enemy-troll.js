import { Enemy } from "./enemy";
import { Bullet } from "./projectile-bullet";

export class Troll extends Enemy {
    constructor(game,x = 0,y = 0,key = 'sprites',frame,data) {
        super(game,x,y,key,frame,data);

        this._MAXSPEED = 70;
        this._ADDSPEED = this.game.rnd.between(5,15);
        this._STRIKE_VELOCITY = 380;

        this.health = this.game.rnd.integerInRange(3,4);
        this.targetX = 0; this.targetY = 0;

        // Add troll animations
                // walk
        this.animations.add("walk-forward", Phaser.Animation.generateFrameNames(`${this.data.key}-mf/_0`, 1, 3, ".png"), 5, true);
        this.animations.add("walk-backward", Phaser.Animation.generateFrameNames(`${this.data.key}-mb/_0`, 1, 3, ".png"), 5, true);
        this.animations.add("walk-left", Phaser.Animation.generateFrameNames(`${this.data.key}-ml/_0`, 1, 3, ".png"), 5, true);
        this.animations.add("walk-right", Phaser.Animation.generateFrameNames(`${this.data.key}-mr/_0`, 1, 3, ".png"), 5, true);

                // attack
        this.animations.add("attack-forward", Phaser.Animation.generateFrameNames(`${this.data.key}-af/_0`, 1, 3, ".png"), 5, false);
        this.animations.add("attack-backward", Phaser.Animation.generateFrameNames(`${this.data.key}-ab/_0`, 1, 3, ".png"), 5, false);
        this.animations.add("attack-left", Phaser.Animation.generateFrameNames(`${this.data.key}-al/_0`, 1, 4, ".png"), 5, false);
        this.animations.add("attack-right", Phaser.Animation.generateFrameNames(`${this.data.key}-ar/_0`, 1, 4, ".png"), 5, false);

                // shooter
        if (this.data.isShooter) {
            this.animations.add("shoot-forward", Phaser.Animation.generateFrameNames(`${this.data.key}-sf/_0`,1,4,".png"), 5, true);
            this.animations.add("shoot-backward", Phaser.Animation.generateFrameNames(`${this.data.key}-sb/_0`, 1, 4, ".png"), 5, true);
            this.animations.add("shoot-left", Phaser.Animation.generateFrameNames(`${this.data.key}-sl/_0`, 1, 4, ".png"), 5, true);
            this.animations.add("shoot-right", Phaser.Animation.generateFrameNames(`${this.data.key}-sr/_0`, 1, 4, ".png"), 5, true);
        }

                // death
        this.animations.add("death", Phaser.Animation.generateFrameNames(`${this.data.key}-death/_0`, 1, 3, ".png"), 6, false);

        // is shooter?
        if (this.data.isShooter) {
            this.shootingTimer = this.game.time.create(false);
            //this.data.isShooter=false;
        }

        //STATES
        this.currentState = "_PATROL";
        if (!this.data.isShooter && !this.data.static) {
            this.setPatrolState();
        } else if (!this.data.static) {
            this.animations.play('shoot-forward');
        }

    }

    update() {
        if (this.data.static) return;
        if (this.game.player.isTalking || this.game.player.questsActive || this.game.player.inventoryActive) {
            this.body.velocity.setTo(0);    
            return;
        }
		if (this.currentState === "_PATROL") {
			if (this.game.physics.arcade.distanceBetween(this.game.player,this) <= 240) {
				this.currentState = "_ALERT";
                if (this.data.isShooter && !this.isAttacking) {
                    this.targetX = this.game.player.x; this.targetY = this.game.player.y;
                    this.engageShooting();
                } else {
    				clearTimeout(this.isMovingTimeout);
    				clearTimeout(this.isPausedTimeout);
    				this.isPaused = false;
                }
			} else {
				return;
			}
		} else if (this.currentState === "_ALERT") {
            if (this.data.isShooter) {
                this.targetX = this.game.player.x;
                this.targetY = this.game.player.y;
                this.animations.play(`shoot-${ this.faceDirection(this.targetX,this.targetY,true) }`);
            } else {
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

    attack() {
    	this.animations.play('attack-' + this.faceDirection(this.game.player.x,this.game.player.y,true)).onComplete.add(function() {
    		this.setAttackPauseState();
		},this);
		this.game.time.events.add(300,() => {
			if (this.game.physics.arcade.distanceBetween(this.game.player,this) <= 60 && !this.game.player.isHit && !this.isDead) {
    			this.playerHit(1);
    		}
        });
    }

    setPatrolState() {
        this.currentState = "_PATROL";
    	this.isMoving = true;
		this.body.velocity.set(this.game.rnd.integerInRange(-1,1)*this._MAXSPEED,this.game.rnd.integerInRange(-1,1)*this._MAXSPEED);
    	this.animations.play(`walk-${this.calcMovementDirection()}`);
    	this.movementTimer = this.game.time.events.add(this.game.rnd.integerInRange(1200,2200),() => {
            this.isMoving = false;
            this.setPauseState();
        });    
    }
    engageShooting() {
        this.isAttacking = true;
        this.animations.play(`shoot-${ this.faceDirection(this.targetX,this.targetY,true) }`);
        this.shootingTimer.start();
        this.scheduleShooting();
    }

    scheduleShooting() {
        //this.animations.play(`shoot-${ this.faceDirection(this.targetX,this.targetY) }`);
        this.createEnemyProjectile();
        this.game.sfx.play('sfx_projectile');
        this.shootingTimer.add(Phaser.Timer.SECOND/0.33,this.scheduleShooting,this);
    }

    stopShooting() {
        this.data.isShooter = false;
        this.shootingTimer.stop();
        this.animations.play(`walk-${this.faceDirection(this.game.player.x,this.game.player.y,true)}`).stop();
        this.game.time.events.add(300,() => {
            this.currentState = "_ALERT";
            this.isAttacking = false;
            this.game.physics.arcade.moveToXY(this,this.game.player.x,this.game.player.y,this._MAXSPEED+this._ADDSPEED);
        });
    }

    createEnemyProjectile() {
        let projectile = this.game.projectileGroup.getFirstExists(false);
     if (!projectile) {
        projectile = new Bullet(this.game,this.x,this.y,"sprites");
        this.game.projectileGroup.add(projectile);
    } else {
        projectile.reset(this.centerX,this.centerY)
     }
    projectile.origin = this;
    this.game.physics.arcade.moveToXY(projectile,this.targetX,this.targetY,projectile.speed); // projectile speed
    }
    
}
