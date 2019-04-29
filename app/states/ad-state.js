import STATE_EVENTS from "../constants/state-events";

export class AdState extends Phaser.State {
    count = 3000;
    timer = null;
    ad = null;

    create() {
        // signal to iframe parent to display ad
        this.ad = document.getElementById('ad-box');
        this.ad.classList.add('show');
        this.createTimer();
    }

    update() {
        this.timer.scale.x -= 0.00565;
        if (this.timer.scale.x <= 0) this.dismiss();
    }

    createTimer() {
        this.timer = this.game.add.graphics();
        this.timer.beginFill(0xf94339,1);
        this.timer.drawRect(0,0,this.game.camera.width,6);
        this.timer.endFill();
        this.timer.anchor.setTo(0,0);
        this.timer.fixedToCamera = true;
    }

    dismiss() {
        this.ad.classList.remove("show");
        this.game.state.start("Game");
    }
}