import {removeFromCache} from "./removeFromCache";
import { PickupItem } from './pickup-item';

export class Enemy extends Phaser.Sprite {

	constructor(game,x = 0,y = 0,key = 'sprites',frame,data) {
        super(game,x,y,key,frame,data);
        
		game.add.existing(this);
        
		game.physics.arcade.enable(this);
		this.body.collideWorldBounds = true;
		this.body.immovable = true;
		this.body.onCollide = new Phaser.Signal();
        this.data = data;
        
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
        this.body.setSize(36,40,0,8);
		this.isType = 'ENEMY';
        
		// this._MAXSPEED = 70;
        // this._STRIKE_VELOCITY = 380;
        this.isMoving = false;
        this.isPaused = false;
        this.isAlerted = false;
        this.isAttacking = false;
        this.isMovingTimeout = null;
        this.isPausedTimeout = null;
        this.isDead = false;
        this.prevVel = 0;
		this.movementTimer = null;
		this.isDead = false;

		
		

        // this.health = 4;

		// this.animations.add('walk-forward',Phaser.Animation.generateFrameNames(`${this.data.key}-mf/_0`,1,3,'.png'),5,true);
        // this.animations.add('walk-backward',Phaser.Animation.generateFrameNames(`${this.data.key}-mb/_0`,1,3,'.png'),5,true);
        // this.animations.add('walk-left',Phaser.Animation.generateFrameNames(`${this.data.key}-ml/_0`,1,3,'.png'),5,true);
        // this.animations.add('walk-right',Phaser.Animation.generateFrameNames(`${this.data.key}-mr/_0`,1,3,'.png'),5,true);

        // this.animations.add('attack-forward',Phaser.Animation.generateFrameNames(`${this.data.key}-af/_0`,1,3,'.png'),5,false);
        // this.animations.add('attack-backward',Phaser.Animation.generateFrameNames(`${this.data.key}-ab/_0`,1,3,'.png'),5,false);
        // this.animations.add('attack-left',Phaser.Animation.generateFrameNames(`${this.data.key}-al/_0`,1,4,'.png'),5,false);
        // this.animations.add('attack-right',Phaser.Animation.generateFrameNames(`${this.data.key}-ar/_0`,1,4,'.png'),5,false);

        // this.animations.add("death", Phaser.Animation.generateFrameNames(`${this.data.key}-death/_0`, 1, 3, ".png"), 6, false);

        //STATES
        // this.currentState = "_PATROL";
        // this.setPatrolState();
	}
	update() {

		// COMMENteD CODE BElOW ALL PREVIOUSLY FOR TROLL. EITHER WILL BE DEPRECATED OR KEPT AS CORE CLASS

		//
        // if (this.game.player.isTalking || this.game.player.questsActive || this.game.player.inventoryActive) return;
		// if (this.currentState === "_PATROL") {
		// 	if (this.game.physics.arcade.distanceBetween(this.game.player,this) <= 240) {
		// 		this.currentState = "_ALERT";
		// 		clearTimeout(this.isMovingTimeout);
		// 		clearTimeout(this.isPausedTimeout);
		// 		this.isPaused = false;
		// 	} else {
		// 		return;
		// 	}
		// } else if (this.currentState === "_ALERT") {
        //     this.game.time.events.remove(this.movementTimer);
		// 	this.body.velocity.setTo(this._MAXSPEED+30);
		// 	this.game.physics.arcade.moveToXY(this,this.game.player.x,this.game.player.y,this._MAXSPEED+30);
		// 	this.animations.play('walk-' + this.faceDirection(this.game.player.x,this.game.player.y,true));
		// 	if (!this.isAlerted) {
		// 		//move toward player
		// 		this.isAlerted = true;
		// 	}
		// 	//if (this.game.physics.arcade.distanceBetween(this.game.player,this) <= 50) {
        //     if (!this.body.touching.none) {
		// 		this.currentState = "_ATTACKING";
		// 		this.body.velocity.setTo(0);
		// 		this.attack();
		// 	}
		// } else if (this.currentState === "_ATTACKING" && !this.isAttacking) {
		// 	if (!this.isAttacking) this.isAttacking = true;
		// } else if (this.currentState === "_PAUSED") {
		// 	this.body.velocity.setTo(0);
		// 	this.animations.play('walk-' + this.faceDirection(this.game.player.x,this.game.player.y,true)).stop();
		// } else if (this.currentState === "_HIT") {
        //     return;
        // }

	}
	

    faceDirection(targX,targY,mR) { //mR: moveReturn. False if sprite only pivoting in place. MUST STILL WRITE CONDITIONAL FOR FALSE!
    	var targetAngle = this.game.physics.arcade.angleToXY(this,targX,targY);

    	if (targetAngle > -0.785 && targetAngle < 0.785) {
    		if (mR) {
    			return 'right';
    		}
    	} else if (targetAngle > 0.785 && targetAngle < 2.356) {
    		if (mR) {
    			return 'forward';
    		}
    	} else if (targetAngle < -0.785 && targetAngle > -2.356 ) {
    		if (mR) {
    			return 'backward';
    		}
    	} else if (targetAngle > -2.356 || targetAngle < -2.356) {
    		if (mR) {
    			return 'left';
    		}
    	}

    }
    // attack() {
    // 	this.animations.play('attack-' + this.faceDirection(this.game.player.x,this.game.player.y,true)).onComplete.add(function() {
    // 		// if (this.game.physics.arcade.distanceBetween(this.game.player,this) <= 60) {
    // 		// 	this.playerHit(1);
    // 		// }
    // 		this.setAttackPauseState();
	// 	},this);
	// 	this.game.time.events.add(300,() => {
	// 		if (this.game.physics.arcade.distanceBetween(this.game.player,this) <= 60 && !this.game.player.isHit && !this.isDead) {
    // 			this.playerHit(1);
    // 		}
	// 	});

    //}
    playerHit(dmg) {
        this.game.player.damage(dmg);

        // set health of core player object
        this.game.data.players[this.game.currentCharacter].health = this.game.player.health - dmg;

		this.game.player.isHit = true;
		this.game.sfx.play('sfx_player_hit');
        this.game.player.currentState = "_NEUTRAL";
        this.game.player.isAttacking = false;
        this.calcHitDirection(this.game.player,null);
		this.game.healthPanel.playerHit(this.game.player.health);
		this.game.flash(this.game.player); //Flash() located in game.js => universal function directory
        this.game.time.events.add(160,() => {
            this.game.player.isHit = false;
            this.game.player.body.velocity.setTo(0);
    	});
	}
	
    calcHitDirection(targ,hitDir) {
    	//
        if (hitDir === null) hitDir = this.faceDirection(this.game.player.x,this.game.player.y,true);
        
    	switch (hitDir) {
    		case 'right':
    			targ.body.velocity.set(this.game.player._STRIKE_VELOCITY,0);
    			break;
    		case 'backward':
    			targ.body.velocity.set(0,-this.game.player._STRIKE_VELOCITY);	
    			break;
    		case 'forward':
    			targ.body.velocity.set(0,this.game.player._STRIKE_VELOCITY);	
    			break;
    		case 'left':
    			targ.body.velocity.set(-this.game.player._STRIKE_VELOCITY,0);	
    			break;
    	}
    	//this.game.player.body.velocity.set(this.game.player._STRIKE_VELOCITY,0);
	}
	
    setAttackPauseState() {
    	this.currentState = '_PAUSED';
    	this.isAttacking = false;
    	this.game.time.events.add(this.game.rnd.integerInRange(600,1000),function() {
    		this.currentState = "_ALERT";
    	},this)
	}
	
	// BELOW CURRENTLY FOR TROLL. MOVED TO TROLL CLASS. ALL ENEMIES WILL REQUIRE A setPatrolState();

    // setPatrolState() {
    //     this.currentState = "_PATROL";
    // 	this.isMoving = true;
	// 	this.body.velocity.set(this.game.rnd.integerInRange(-1,1)*this._MAXSPEED,this.game.rnd.integerInRange(-1,1)*this._MAXSPEED);
    // 	this.animations.play(`walk-${this.calcMovementDirection()}`);
    // 	this.movementTimer = this.game.time.events.add(this.game.rnd.integerInRange(1200,2200),() => {
    //         this.isMoving = false;
    //         this.setPauseState();
    //     });    
    // }
    calcMovementDirection() {
        const vX = this.body.velocity.x;
        const vY = this.body.velocity.y;
        //const dir = null;
        if (vY === 0) {
            if (vX === 0) {
                return 'forward';
            } else {
                return vX<0?'left':'right'; 
            }
        } else {
            return vY<0?'backward':'forward';
        }
    }
    setPauseState() {
		if (this == null) return;
        this.currentState = '_PAUSED';
    	this.isPaused = true;
		this.animations.stop();
		// if (this.data.key === 'ogre') {
		// 	this.frameName = `walk`;
		// } else {
            if (this.data.key === 'rat') {
                this.frameName = `${this.data.key}-af/_01.png`;
            } else {
                this.frameName = `${this.data.key}-mf/_01.png`;
            }
		//}
    	this.body.velocity.setTo(0);
    	var that = this;
    	this.movementTimer = this.game.time.events.add(this.game.rnd.integerInRange(1500,2600),() => {
            this.isPaused = false;
            this.setPatrolState();
        });
	}

    dropItem(_item,coords) {
        
        const item = _item?_item:'health';
        let subClass = null;
        let key = null;
        let itemName = null;

        // if item is health, determine what type and set as subClass
        if (item === 'health') {
            key = "powerup";
            let chanceRoll = Phaser.Utils.chanceRoll(20);
            if (chanceRoll) {
                subClass = Phaser.Utils.chanceRoll(30)?'super-health':'uber-health'; 
            } else {
                subClass = 'health';
            }
        } else if (item === 'Rat Key Left' || item === 'Rat Key Right') {
            subClass = 'ratKey';
            key = "inventoryItem";
            itemName = item;
        }

        const data = {
            class: item,
            key: key,
            subClass: subClass,
            type: 'pickup',
            itemName: itemName
        }
        const pickup = new PickupItem(this.game,coords.x,coords.y,"sprites",null,data,true);
        if (item !== "health") { // it's an inventory item so we pick it up automatically
            pickup.initInventoryItem(pickup.data);
            pickup.destroy();
        }
    }

    hit(hitDir) {
        if (this.isDead) return;
        this.currentState = "_HIT";
        this.isAttacking = false;
        this.calcHitDirection(this,hitDir);
		this.health--;
		this.game.sfx.play('sfx_enemyHit');
        if (this.data.key === 'ogre') {
			this.setBallState("_RESTING");
            this.game.sfx.stop('sfx_ball');
            this.ball.isSwinging = false;
			this.setState("_HIT");
        }
        if (this.data.isShooter && this.data.key === 'troll') this.stopShooting();
        if (this.health <= 0) {
            this.isDead = true;
            this.game.tData('enemiesDefeated',1);
			if (this.ball) {
				this.ball.chain.kill();
				this.ball.kill();
				this.game.time.events.remove(this.movementTimer);
				this.setState('_HIT');
			}
            if (this.data.isShooter) this.shootingTimer.stop();

            this.game.time.events.remove(this.movementTimer);
            this.body.setSize(0,0,0,0);
			this.game.sfx.play('sfx_enemy_death');

            // 20% chance of dropping health
            Phaser.Utils.chanceRoll(33)?this.dropItem('health',this.position):null;

            // if enemy has dropItem prop
            if (this.data.dropItem) this.dropItem(this.data.dropItem,this.position);

   //          this.bodyVelocity = this.game.time.events.add(160,() => { //issue was causing enemies to return upon death but were not interactive
			// 	this.body.velocity.setTo(0);
			// });

            this.animations.play('death').onComplete.addOnce(()=> { 
                if (this.bodyVelocity) this.game.time.events.remove(this.bodyVelocity);
                this.destroy();
            });


			// Remove enemy from map cache
			removeFromCache(this.game,this.game.currentStage,this.data.index);
        } else {
            this.game.time.events.add(160,() => {
				this.currentState = "_ALERT";
				if (this.data.key === 'ogre') this.setState('_ALERT');
                this.body.velocity.setTo(0);
            });
        }

    }
 }