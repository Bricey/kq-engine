export class Explosion extends Phaser.Sprite {
    constructor(game,x,y,key="sprites") {
        super(game,x,y,key);
        this.game = game;
        this.animations.add('explode', Phaser.Animation.generateFrameNames('explosion-01/_', 1, 16, '.png'), 16, false);
        this.play();
    }

    play() {
        this.game.sfx.play('sfx_fireballExplode',0.75);
        const anim = this.animations.play('explode');
        anim.onComplete.add(()=>{
            this.kill();
        });
    }

}