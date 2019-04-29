import { PickupItem } from './pickup-item';

export class Toxicball extends Phaser.Sprite {
    rndLife = null;
    lifeTimer = null;
    aboutToExplode = null;
    constructor(game, x, y, key = "sprites", frame, speed, _timer, _dropItem,_isBomb) {
        super(game, x, y, key, frame);

        this.game = game;
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.body.onCollide = new Phaser.Signal();
        this.canDropItem = _dropItem || false;
        //this.frameName = "bullet.png";
        this.speed = speed || 240;
        this.body.setSize(16, 16, 0, 0);
        this.exploding = false;
        this.isBomb = _isBomb;
        this.inBombMode = false;
        this.aboutToExplode = false;

        this.anchor.setTo(0.5);

        this.outOfBoundsKill = true;
        this.checkWorldBounds = true;

        this.animations.add('fire', Phaser.Animation.generateFrameNames('toxicball_', 0, 3, '.png'), 5, true);
        this.animations.add('explode', Phaser.Animation.generateFrameNames('toxicball_explosion_', 0, 3, '.png'), 7, false);
        this.animations.add('bomb',Phaser.Animation.generateFrameNames('toxicball_bomb_',0,3,'.png'),3,true);

        this.animations.add('bombExplode', Phaser.Animation.generateFrameNames('explosion-01/_', 1, 16, '.png'), 16, false);

        this.animations.play('fire');

        //random life timer
        if (!_timer) {
            this.timerReset();
        } else {
            this.lifeTimer = _timer;
        }
    }

    timerReset(__timer) {
        if (!__timer) {
            this.rndLife = this.setRndLife();
        } else {
            this.rndLife = __timer;
        }
        if (this.rndLife !== 0) {
            this.lifeTimer = this.game.time.events.add(this.rndLife, this.explode, this);
        }
    }

    setRndLife() {
        if (Phaser.Utils.chanceRoll(50)) {
            return this.game.rnd.integerInRange(400, 1000);
        } else {
            return 0;
        }
    }

    explode() {
        this.game.physics.arcade.moveToXY(this, this.x, this.y, 0);
        if (this.isBomb) {
            this.setBomb();
        } else {
            //play sfx
            this.body.setSize(0, 0, 0, 0);
            this.exploding = true;
            if (this.canDropItem) this.dropItem();
            this.animations.play('explode').onComplete.add(() => {
                this.kill();
            });
        }
    }

    setBomb() {
        //play sfx
        this.inBombMode = true;
        this.body.setSize(32,32,0,0)
        this.animations.play('bomb');
        this.setBombTimer();
    }

    setBombTimer() {
        const time = this.game.rnd.integerInRange(1200,2000);
        this.lifeTimer = this.game.time.events.add(time,this.bombExplode,this);
        // start flashing
    }
    
    bombExplode() {
        if (!this.exploding) this.game.sfx.play('sfx_fireballExplode');
        this.exploding = true;
        if (this.game.physics.arcade.distanceBetween(this.game.player, this) <= 90) {
            this.playerHit();
        }
         this.animations.play('bombExplode').onComplete.add(()=>{
             this.kill();
         });
    }

    hitPlayer() {
        if (!this.exploding || !this.inBombMode) {
            this.explode();
            if (!this.isBomb) this.playerHit();
        }
    }

    dropItem() {
        Phaser.Utils.chanceRoll(20) ? this.generateItem('health', this.position) : null;
    }

    generateItem(_item, coords) {
        const item = _item ? _item : 'health';
        let subClass = null;
        // if item is health, determine what type and set as subClass
        if (item === 'health') {
            let chanceRoll = Phaser.Utils.chanceRoll(20);
            if (chanceRoll) {
                subClass = Phaser.Utils.chanceRoll(30) ? 'super-health' : 'uber-health';
            } else {
                subClass = 'health';
            }
        }
        const data = {
            class: item,
            key: 'powerup',
            subClass: subClass,
            type: 'pickup'
        }
        const pickup = new PickupItem(this.game, coords.x, coords.y, "sprites", subClass, data, true);
    }

    playerHit() {
        if (!this.game.player.isHit) {
            this.game.sfx.play('sfx_player_hit');
            this.game.player.damage(1);
            this.game.player.isHit = true;
            this.game.player.currentState = "_NEUTRAL";
            this.game.player.isAttacking = false;
            this.game.player.body.velocity.setTo(0, 600);
            this.game.player.isTalking = true;
            this.game.healthPanel.playerHit(this.game.player.health);
            this.game.flash(this.game.player); //Flash() located in game.js => universal function directory
            var fallBack = this.game.time.events.add(100, () => {
                this.game.player.isTalking = false;
                this.game.player.body.velocity.setTo(0);
                var returnPlay = this.game.time.events.add(700, () => { // provide half a second of time before player can be struck again
                    this.game.player.isHit = false;
                });
            });
        }
    }
}