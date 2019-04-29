import STATE_EVENTS from '../constants/state-events';
import { Orientation } from '../constants/orientation';

export class LaunchState extends Phaser.State {

    create() {
        let kqLogo = this.add.image(this.world.centerX,25,'kq-logo');
        kqLogo.anchor.setTo(0.5,0);
        let text = this.add.bitmapText(this.world.centerX, 235, 'kingsQuest', '', 26);
        text.anchor.setTo(0.5);
        text.align = 'center';
        text.alpha = 0;
        text.text = `Click anywhere to begin`;

        let instructions = this.add.image(0,320,'instructions')

        let clickArea = this.add.graphics();
        clickArea.beginFill(0x000000,0);
        clickArea.drawRect(0,0,this.world.width,this.world.height);
        clickArea.endFill();
        clickArea.inputEnabled = true;
        clickArea.useHandCursor = true;
        clickArea.events.onInputDown.add(this.startLoading,this);

        //blinking text
        let flash = this.add.tween(text).to({alpha:1},800,"Linear",true,0,-1);
        flash.yoyo(true,1300);

    }

    startLoading() {
        this.game.trigger(STATE_EVENTS.BEGIN_LOAD);
    }

}