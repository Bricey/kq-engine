export class Ball extends Phaser.Sprite {
         constructor(game, x, y, key = "sprites", frame, parent) {
           super(game, x, y, key, frame, parent);

           //game.add.existing(this);
           game.physics.arcade.enable(this);
           this.body.immovable = true;
           this.body.onCollide = new Phaser.Signal();
           this.parent = parent;
           this.frameName = "ball.png";
           this.body.setSize(10, 10, 0, 0);
           this.anchor.setTo(0.5);

           this.swingRadius = 0;
           this.swingPeriod = 0.012;
           this.isSwinging = false;

           this.currentState = "_RESTING";

           this.chain = this.game.add.graphics(0,0);
           this.chain.lineStyle(1,0x000000,1);
           this.chain.moveTo(this.parent.x,this.parent.y);
           this.chain.lineTo(this.parent.x+this.x,this.parent.y+this.y);

          }

         update() {

         }

         swing() {
          this.currentState = "_SWINGING";
          //this.game.sfx.play('sfx_ball');
         }

         stopSwinging() {
          this.currentState = "_RESTING";
          this.game.sfx.stop('sfx_ball');
          this.ball.isSwinging = false;
         }

         updateChain() {
            this.chain.clear();
            this.chain.lineStyle(1,0x000000,1);
            this.chain.moveTo(this.parent.x+11,this.parent.y-10);
            this.chain.lineTo(this.parent.x+this.x,this.parent.y+this.y);
         }

          playerHit() {
            if (!this.game.player.isHit && this.currentState === "_SWINGING") {
              this.game.sfx.play('sfx_player_hit');
              this.game.player.damage(1);
              this.game.player.isHit = true;
              this.game.player.currentState = "_NEUTRAL";
              this.game.player.isAttacking = false;
              this.calcHitDirection(this.game.player, null);
              this.game.healthPanel.playerHit(this.game.player.health);
              this.game.flash(this.game.player); //Flash() located in game.js => universal function directory
              this.game.time.events.add(200, () => {
                this.game.player.body.velocity.setTo(0);
                this.game.time.events.add(500, () => { // provide half a second of time before player can be struck again
                  this.game.player.isHit = false;
                });
              });
            }
          }

          calcHitDirection(targ,hitDir) {
              //console.log(typeof this.game.player._STRIKE_VELOCITY);
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
              var targetAngle = this.game.physics.arcade.angleToXY(this.parent,targX,targY);

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

         rest() {
           // when ogre is paused
           this.x = 12;
           this.y = 0;
         }

         swing() {
           this.swingRadius = this.game.rnd.integerInRange(30, 60);
           this.currentState = "_SWINGING";
         }
       }