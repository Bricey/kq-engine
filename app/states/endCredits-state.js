import STATE_EVENTS from '../constants/state-events';
import EventEmitter from 'super-event-emitter';
import { Orientation } from '../constants/orientation';

export class EndCreditsState extends Phaser.State {

    create() {
        var textGroup = this.game.add.group();

        this.game.tData("completed",true);


        this.titleText = this.game.add.bitmapText(this.game.camera.width/2,this.game.camera.height/2-65,'kingsQuest','A Game by',24);
		this.titleText.fixedToCamera = true;
		this.titleText.anchor.setTo(0.5);
        this.titleText.align = "center";

        
        this.creditText = this.game.add.bitmapText(this.game.camera.width / 2, this.game.camera.height/2, 'kingsQuest', 'Brice Hall', 32);
        this.creditText.fixedToCamera = true;
        this.creditText.anchor.setTo(0.5);
        this.creditText.align = "center";

        this.secondaryCreditText = this.game.add.bitmapText(this.game.camera.width / 2, this.game.camera.height / 2 + 70, 'kingsQuest', 'Freesound.org', 38);
        this.secondaryCreditText.fixedToCamera = true;
        this.secondaryCreditText.anchor.setTo(0.5);
        this.secondaryCreditText.align = "center";
        this.secondaryCreditText.alpha = 0;

        textGroup.add(this.titleText);
        textGroup.add(this.creditText);
        textGroup.add(this.secondaryCreditText);

        textGroup.alpha = 0;

        var textTween_01 = this.game.add.tween(textGroup).to({alpha:1},1000,Phaser.Linear,true,700);
        textTween_01.onComplete.addOnce(() => {
                var textTween_02 = this.game.add.tween(textGroup).to({alpha:0},1000,Phaser.Linear,true,3200);

                textTween_02.onComplete.addOnce(() => {
                    this.titleText.text = "Additional Art";
                    this.creditText.text = "Mike Faille";
                    var textTween_03 = this.game.add.tween(textGroup).to({alpha:1},1000,Phaser.Linear,true,300);
                    textTween_03.onComplete.addOnce(() => {
                        
                        var textTween_04 = this.game.add.tween(textGroup).to({alpha:0},1000,Phaser.Linear,true,3000);
                        textTween_04.onComplete.addOnce(() => {
                            
                            this.secondaryCreditText.alpha = 1;
                            this.titleText.text = "Creative Commons art and audio provided by";
                            this.creditText.text = "OpenGameArt.org";

                            var textTween_05 = this.game.add.tween(textGroup).to({alpha:1},1000,Phaser.Linear,true,300);
                            textTween_05.onComplete.addOnce(() => {
                                
                                var textTween_06 = this.game.add.tween(textGroup).to({alpha:0},1000,Phaser.Linear,true,3000);
                                textTween_06.onComplete.addOnce(() => {
                                    
                                    this.titleText.kill();
                                    this.secondaryCreditText.kill();
                                    this.creditText.text = "The End";

                                    var textTween_07 = this.game.add.tween(textGroup).to({alpha:1},1000,Phaser.Linear,true,300);
                                });
                            });
                        });
                    });
                });
        })
    }    
}