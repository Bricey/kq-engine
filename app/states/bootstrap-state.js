import STATE_EVENTS from '../constants/state-events';
import { Orientation } from '../constants/orientation';

export class BootstrapState extends Phaser.State {
    Webfontconfig = null;
    blackScreen = null;
    warningText = null;

    preload() {
        this.load.image('loader', 'assets/images/loader.png');
        this.load.image('np-logo','assets/images/np_logo.jpg');
        this.load.image('kq-logo', 'assets/images/kq_logo.png');
        this.load.image('instructions','assets/images/instructions.jpg');
        this.load.bitmapFont('kingsQuest', 'assets/fonts/kingsQuest.png', 'assets/fonts/kingsQuest.xml');
    }
    
    create() {
        this.game.stage.backgroundColor = '#000000';
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // if (Phaser.Device.iOS) {
        //     console.log('scaling for iOS!!!');
        //     this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            

        // } else {
            this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
         //}

        if (!this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            this.orientation = new Orientation(this.game);
        }

        this.game.scale.refresh();

        //center the game horizontally and vertically
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Boot Google webfont script
        // this.Webfontconfig = {
        //   active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
        //   google: {
        //         families: ['VT323']
        //       }
        // };

        this.game.trigger(STATE_EVENTS.BOOTSTRAP_COMPLETED);
    }

    update() {

    }

    render() {

    }
}
