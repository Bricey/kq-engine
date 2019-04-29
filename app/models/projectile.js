export class Projectile extends Phaser.Sprite {
	constructor(game,x,y,key="sprites",frame,parent) {
		super(game,x,y,key,frame,parent);

		this.game = game;
		game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.onCollide = new Phaser.Signal();
		this.anchor.setTo(0.5);

		
	}

	playerHit(dmg) {
		this.game.player.damage(dmg);
		this.game.player.isHit = true;
		this.game.player.currentState = "_NEUTRAL";
		this.game.player.isAttacking = false;
		this.calcHitDirection(this.game.player, null);
		this.game.healthPanel.playerHit(this.game.player.health);
		this.game.flash(this.game.player); //Flash() located in game.js => universal function directory
		this.game.time.events.add(160, () => {
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

}