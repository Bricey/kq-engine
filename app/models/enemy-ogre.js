import { Enemy } from './enemy';
import { Ball } from './projectile-ball';

export class Ogre extends Enemy {
    constructor(game,x = 0,y = 0,key = 'sprites',frame,data) {
        super(game,x,y,key,frame,data);
        this.game = game;
        this._MAXSPEED = 55;
        this._ADDSPEED = this.game.rnd.between(5,10);
        this._STRIKE_VELOCITY = 450;
        this.body.setSize(36,40,0,8);
        this.health = this.game.rnd.integerInRange(3,5);

        // add ogre animations
        this.animations.add("walk", Phaser.Animation.generateFrameNames("ogre-mf/_0", 1, 4, ".png"), 5, true);

        this.animations.add('attack',Phaser.Animation.generateFrameNames('ogre-af/_0',1,4,".png"),5,true);

        this.animations.add('death',Phaser.Animation.generateFrameNames('ogre-death/_0',1,4,".png"),6,false);


        // create ball
        this.ball = new Ball(this.game,21,-10,"sprites","ball.png",this);


        this.ball.currentState = "_RESTING"

        this.ballTween = this.game.add.tween(this.ball.swingRadius).to(0,200,"Quad.easeOut");
        this.addChild(this.ball);

        this.movementTimer = null;
        this.swingTimer = null;

        this.currentState = "_PATROL";
        //this.setPatrolState();
        this.setState("_PATROL");

    }

    update() {


        // ball updates
        // 
         if (this === null) {this.ball.chain.clear(); this.ball.destroy(); this.game.sfx.stop('sfx_ball');return;}
         if (this.game.player.isTalking || this.game.player.questsActive || this.game.player.inventoryActive) return;
         this.game.physics.arcade.collide(this.game.player, this.ball, this.ball.playerHit,null,this.ball);
         if (this.ball.currentState === "_RESTING") {
           this.ball.x = 12;
           this.ball.y = 0;
           this.ball.updateChain();
           this.game.sfx.stop('sfx_ball');
         } else if (this.ball.currentState === "_SWINGING") {
           if (!this.ball.isSwinging) {
             this.ball.isSwinging = true;
             this.game.sfx.play('sfx_ball');
             this.ball.swing();
           } else if (this.ball.isSwinging) {
             //continue swinging
             this.ball.x = Math.cos(this.game.time.now * this.ball.swingPeriod) * this.ball.swingRadius;
             this.ball.y = Math.sin(this.game.time.now * this.ball.swingPeriod) * this.ball.swingRadius;
             this.ball.updateChain();
           }
         }



        // 
        // if (this.game.player.isTalking || this.game.player.questsActive || this.game.player.inventoryActive) {
        //     this.body.velocity.setTo(0);    
        //     return;
        // }
        if (this.currentState === "_HIT") return;

        if (this.game.physics.arcade.distanceBetween(this.game.player,this) <= 300 && this.currentState !== "_ATTACK") {
            if (this.currentState !== "_ALERT") {
                this.setState("_ALERT");
            } else {
                this.game.physics.arcade.moveToXY(this, this.game.player.x, this.game.player.y, this._MAXSPEED + this._ADDSPEED);
            }

            if (this.game.physics.arcade.distanceBetween(this.game.player,this) <= 120 && this.currentState !== "_ATTACK") {
                if (Phaser.Utils.chanceRoll(5) && this.currentState !== "_ATTACK") this.setState("_ATTACK");
            }
            return;
        }

        this.game.physics.arcade.moveToXY(this, this.game.player.x, this.game.player.y, this._MAXSPEED + this._ADDSPEED);
    }

    setState(state) {
        this.currentState = state;
        if (state === '_PATROL') {
            this.body.velocity.set(this.game.rnd.integerInRange(-1,1)*this._MAXSPEED,this.game.rnd.integerInRange(-1,1)*this._MAXSPEED);
            this.animations.play('walk')
            this.movementTimer = this.game.time.events.add(this.game.rnd.integerInRange(800,1200),() => {
                if (Phaser.Utils.chanceRoll(60)) this.setBallState("_SWINGING");
                this.setState("_PAUSED");
            });

        } else if (state === '_ALERT') {
            this.body.velocity.setTo(this._MAXSPEED + this._ADDSPEED);
            this.animations.play('walk');
            this.game.time.events.remove(this.movementTimer);
        } else if (state === '_ATTACK') {
            this.setBallState("_SWINGING");
            if (Phaser.Utils.chanceRoll(60)) {
                this.body.velocity.setTo(0);
                this.animations.play('attack');
            }
            this.movementTimer = this.game.time.events.add(this.game.rnd.integerInRange(1200,2200),() => {
                // 
                this.setBallState("_RESTING");
                this.game.sfx.stop('sfx_ball');
                this.ball.isSwinging = false;
                this.setState('_PAUSED');
            });
        } else if (state === '_PAUSED') {
            this.body.velocity.setTo(0);

            if (this.ball.currentState === "_RESTING") {
                this.animations.stop();
                this.frameName = "ogre-mf/_01.png";
            } else {
                this.animations.play('attack');
            }

            this.movementTimer = this.game.time.events.add(this.game.rnd.integerInRange(1200,2200),() => {
                this.setBallState("_RESTING");
                this.game.sfx.stop('sfx_ball');
                this.ball.isSwinging = false;
                this.movementTimer = this.game.time.events.add(this.game.rnd.integerInRange(600,1000),()=>{this.setState("_PATROL")});
            });
        } else if (state === '_HIT') {
            
        }
    }

    setBallState(state) {
        this.ball.currentState = state;
        // if (state === "_RESTING") {

        // } else if (state === "_SWINGING") {

        // }
    }

 }