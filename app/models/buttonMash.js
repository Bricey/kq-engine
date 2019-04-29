export class ButtonMash {
    constructor(game,_challenge) {
        this.game = game;
        this.challengeActive = false;
        this.challengeDegree = [0.0075,0.0084,0.0088];
        this.currentChallengeDegree = 0;
        this.actionDegree = 0.0567;
        this.timerLength = 10000;
        this.elapsed = 0;

        // set music

            const w = this.game._MOBILE?200:80;

            this.progBarFrame = this.game.add.graphics(40, this.game.camera.height - 100);
            this.progBarFrame.beginFill('0xffffff', 0.22);
            this.progBarFrame.drawRect(0, 0, this.game.camera.width - w, 40);
            this.progBarFrame.endFill();
            this.progBarFrame.anchor.setTo(0, 0);
            this.progBarFrame.fixedToCamera = true;
            this.progBarFrame.scale.x = 0;

            this.progBar = this.game.add.graphics(40,this.game.camera.height-100);
            this.progBar.beginFill('0xffffff',1);
            this.progBar.drawRect(0,0,this.game.camera.width-w,40);
            this.progBar.endFill();
            this.progBar.anchor.setTo(0,0);
            this.progBar.fixedToCamera = true;
            this.progBar.scale.x = 0;
            
            
            // instructions
            let msg; 
            this.successMsg = "";
            this.failMsg = "";
            this.endFunctions = [];
            
            switch (_challenge) {
                case "fildebrandt":
                    msg = "Derek must not create a scene that would embarrass Jason Kenney! Mash the action button (spacebar) to control Derek's incendiary temper towards urban liberal effeteness!";
                    this.successMsg = "Phew! Urge for outburst ... fading ...";
                    this.failMsg = "Uh-oh. Nobody controls Derek Fildebrandt but Derek himself!";
                    this.endFunctions[0] = this.game.npcFunctions.fildebrandt_winsChallenge;
                    this.endFunctions[1] = this.game.npcFunctions.fildebrandt_losesChallenge;
                    break;
                case "avocadoToast":
                    msg = "You're in deep! Mash the action button (spacebar) to resist the tempation of the toast."
                    this.successMsg = "*Phew*! Temptation evaded.";
                    this.failMsg = "Oh no! You must now admit to yourself avocado spread on toast is pretty darn good."                    
                    this.endFunctions[0] = this.game.npcFunctions.avocadoToast_win;
                    this.endFunctions[1] = this.game.npcFunctions.avocadoToast_lose;
                    break;
            }

            this.game.dialogue.sign(msg,'instruction',true);

            this.game.dialogue.on('beginButtonMashChallenge',this.initButtonMash,this);

    }

    update = () => {
            this.progBar.scale.x += this.challengeDegree[this.currentChallengeDegree];
            this.elapsed++;

            if (this.progBar.scale.x >= 1) {
                // challenge failed
                this.challengeOver(false);
            }
            
            // increase difficulty
            
            //if (this.game.time.events.elapsed >= 3000)
            switch (this.elapsed) {
                case 200:
                    this.increaseDifficulty(1);
                    break;
                case 420:
                    this.increaseDifficulty(2);
                    break;
            }
    }

    increaseDifficulty = (_degree) => {
        this.currentChallengeDegree = _degree;
        this.game.camera.flash(0xff0000, 400);
    }

    action = () => {
        this.game.sfx.play('sfx_buttonMash');
        this.progBar.scale.x -= this.actionDegree;
        if (this.progBar.scale.x <= 0) {
            this.progBar.scale.x = 0;
        }
    }

    initButtonMash = () => {
        this.game.player.isTalking = true;
        //this.game.UIGroup.add(this.progBarFrame,this.progBar);
        this.progBarFrame.scale.x = 1;

        // hero text window
        this.textWindow = this.game.add.graphics(this.game.width/2,this.game.height/2-42);
        this.textWindow.lineStyle(2,0xffffff,1);
        this.textWindow.beginFill(0x000000,1);
        this.textWindow.drawRoundedRect(-210,-60,420,120);
        this.textWindow.endFill();
        this.textWindow.anchor.setTo(0.5);
        this.textWindow.fixedToCamera = true;

        // hero text
        this.heroText = this.game.add.bitmapText(this.game.camera.width / 2, this.game.camera.height/2-42, 'VT323', 'Hit the Action Button!', 38);
        this.heroText.anchor.setTo(0.5);
        this.heroText.align = 'center';
        this.heroText.fixedToCamera = true;

        // add action key function
        this.actionKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.actionKey.onDown.add(this.action,this);

        // progress Bar loop upwards
        this.progBarLoop = this.game.time.events.loop(Phaser.Timer.SECOND/60,this.update,this);
        
        // begin countdown
        this.challengeTimer = this.game.time.events.add(this.timerLength,()=>{
            this.challengeOver(true)}, this);
    }

    challengeOver = (_result) => {
        this.endChallenge();
        this.game.time.events.add(300,() => {
            if (_result) { //success
                this.challengeSuccessful();
            } else { //failure
                this.challengeFailed();
            }
        });
    }

    challengeSuccessful = () => {
        this.endChallenge();
        this.game.score("buttonMashChallenge",3);
        this.game.sfx.play('sfx_success');
        this.game.dialogue.sign(this.successMsg, 'alert', null, () => {

            this.endFunctions[0]();
        });
    }

    challengeFailed = () => {
        //this.progBarLoop.stop();
        this.game.sfx.play('sfx_fail')
        this.game.score("buttonMashChallenge",-2);
        this.endChallenge();
        this.game.dialogue.sign(this.failMsg,'alert',null,()=>{
            this.endFunctions[1]();
        });
    }

    endChallenge = () => {
        this.game.time.events.remove(this.progBarLoop);
        this.game.time.events.remove(this.challengeTimer);
        this.progBarFrame.destroy();
        this.progBar.destroy();
        this.heroText.destroy();
        this.textWindow.destroy();
        this.actionKey.onDown.remove(this.action,this);
    }
}