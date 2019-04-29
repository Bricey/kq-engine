export class FullscreenButton extends Phaser.Sprite {
    constructor(game,x=0,y=0,key='sprites') {
        super(game,x,y,key);

        this.game = game;

        this.game.add.existing(this);

        this.anchor.setTo(0.5);
        this.frameName = "fullscreen-btn.png";
        this.inputEnabled=true;
        //this.input.useHandCursor = true;
        this.fixedToCamera = true;
        this.scale.setTo(0.5);
        
        //scaling code
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.events.onInputDown.add(this.initFullscreen,this);

    }

    initFullscreen() {
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        } else {
            this.game.scale.startFullScreen(false);
        }
    }

    
}