import { NextButton } from './next-button';
//import NPC_DIALOGUE from './npcDialogue';
import EventEmitter from 'super-event-emitter';

export class Dialogue {

	dialogueWindow = null;
	dialogueObject = null;
	dialogueArray = null;
	dialogueString = null;
	dialogueIndex = null;
	nameText = null;
	windowTween = null;
	currChar = null;
	currSpeaker = null;
	dialogueDualBool = null;
	dialogueOptionsPointer = null;
	dialogueOptions = null;
	activeSelection = null;
	keyDown = null;
	keyUp = null;
	charR = null;
	charL = null;
	closeCallback = null;
	signCallback = null;
	
	constructor(game) {
		this.game = game;
		this.winW = this.game.width-2;
		this.winH = this.game.height/2.75;
		this.btnW = 60;
		this.btnH  = 60;
		this.signUp = false;
		EventEmitter.mixin(this);
		
		this.windowTween = this.game.add.tween(null);

		this.screen = this.game.add.graphics();
		this.screen.beginFill(0x000000,0.5);
		this.screen.drawRect(0,0,this.game.camera.width,this.game.camera.height);
		this.screen.endFill();
		this.screen.alpha = 0;
		this.screen.fixedToCamera = true;


		//create dialogue window
		this.talkWindow = this.game.add.graphics(this.game.width/2,this.game.height - (this.winH/2+1)); //this.game.height/5.55
		this.talkWindow.lineStyle(2,0xffffff,1);
		this.talkWindow.beginFill('#000',1);
		this.talkWindow.drawRoundedRect(-(this.game.width-2)/2,-this.winH/2,this.winW,this.winH,15);
		this.talkWindow.endFill();
		//this.talkWindow.graphicsData[0].fillColor = '0x000000';
		this.talkWindow.fixedToCamera = true;
		this.talkWindow.scale.setTo(0);

		//create nextButton
		this.nextButton = new NextButton(this.game,this.game.width - 60,this.game.camera.height - 60);
		this.nextButton.events.onInputDown.add(this.nextDialogue,this);
		this.nextButton.visible = false;

		//create alert window
		this.alertWindow = this.game.add.graphics(this.game.camera.width/2,this.game.camera.height/2+80); // bottom: this.game.camera.height - (this.game.camera.height/8)+45
		this.alertWindow.lineStyle(2,0xffffff,1);
		this.alertWindow.beginFill('0x871a12',0.8);
		this.alertWindow.drawRoundedRect(-(this.game.width-2)/2,-this.winH/2,this.winW,this.winH-80,15);
		this.alertWindow.endFill;
		this.alertWindow.fixedToCamera = true;
		this.alertWindow.scale.setTo(0);

		this.alertText = this.game.add.bitmapText(this.game.camera.width/2,this.alertWindow.y-42,'VT323','',36);
		this.alertText.anchor.setTo(0.5);
		this.alertText.align = 'center';
		this.alertText.visible = false;
		this.alertText.maxWidth = this.game.camera.width-200;
		this.alertText.fixedToCamera = true;

		//create sign window
		this.signWindow = this.game.add.graphics(this.game.width/2,this.game.height - (this.winH/2+1));
		this.signWindow.lineStyle(2,0xffffff,1);
		this.signWindow.beginFill('0x871a12',1);
		this.signWindow.drawRoundedRect(-(this.game.width-2)/2,-this.winH/2,this.winW,this.winH,15);
		this.signWindow.graphicsData[0].fillColor = '0x871a12';
		this.signWindow.fixedToCamera = true;
		this.signWindow.scale.setTo(0);

		this.nameText = this.game.add.bitmapText(40,this.game.camera.height-(this.winH-24),'VT323');
		this.nameText.visible = false;
		this.nameText.maxWidth = this.game.camera.width-80;
		this.nameText.fixedToCamera = true;


		
		this.game.dialogueGroup = this.game.add.group();

		this.game.dialogueGroup.add(this.screen);
		this.game.dialogueGroup.add(this.talkWindow);
		this.game.dialogueGroup.add(this.signWindow);
		this.game.dialogueGroup.add(this.nextButton);
		this.game.dialogueGroup.add(this.nameText);
		this.game.dialogueGroup.visible = false;

		this.game.dialogueGroup.sendToBack(this.screen);
		
		this.pointerPositions = [this.game.camera.height-(this.winH-24), this.game.camera.height-(this.winH-24)+42, this.game.camera.height-(this.winH-24)+84];
		this.dialogueOptions = [];
		this.pointersCollection = [];
		this.dialogueTextOptions = [];

		this.dialogueTimer = this.game.time.create(false);
	}


	heroSpeaks() {
		this.initDialogue(false,this.game.player,false);
	}

	// Inital dialogue event launch function. Takes Direction, Character (character player talking to), Dual: two portrait-enabled characters talking, Who begins speaking, killTimer: if true, limited live time of window (alerts, infoboxes, cutscene dialogue, etc...);

	initDialogue(dir,char,dual,killTimer,suppressPlayer) {
		
		
		// this.game.world.bringToTop(this.game.dialogueGroup);
		// this.game.dialogueGroup.alpha = 1;
		if (char !== this.game.player && typeof char.stopMovement === 'function') char.stopMovement();		
		this.emit('dialogueEngaged');
		this.game.dialogueGroup.visible = true;
		this.currChar = char;
		this.game.player.isTalking = true;
		//this.setDirection(dir,char);
		if (dir) char.animations.play(this.setDirection(dir,char)).stop(); // position npc to face speaker

		// if (this.game._MOBILE) { //Hide visibility of mobile controls
		// 	this.game.toggleMobileControls(false);
		// }

		//this.talkWindow.graphicsData[0].fillColor = killTimer?'0x871a12':'0x000000'; // if killTimer present (limited time window open), bg is red

		

		this.windowTween = this.game.add.tween(this.talkWindow.scale).to({x:1,y:1},120,"Quad.easeOut").start();
		this.game.sfx.play('sfx_dialogue_up'); //Play dialogueUp audio
		this.windowTween.onComplete.add(() => {
			this.windowTween.onComplete.removeAll();

			//this.currSpeaker = targetSpeaker?this.currChar.data.name:targetSpeaker;
			this.dialogueIndex = 0;
			this.dialogueObject = this.game.npcDialogue.data[char.data.name][char.data.dI];
			//currChar set to who speaks first. Drawn from this.dialogueObject[2]

			this.currSpeaker = this.dialogueObject[2]?this.game.player:this.currChar;

			// call portraits
			if (char.data.portrait && char !== this.game.player) {
				this.game.add.tween(this.screen).to({alpha:1},110,"Quad.easeOut",true);
				
				this.callPortraits(char.data.portrait,this.game.player.data.portrait,this.currSpeaker,suppressPlayer);
			}
			this.dialogueArray = this.game.npcDialogue.data[char.data.name][char.data.dI][0];
			this.dialogueDualBool = this.dialogueObject[1]?true:false; //Determine whether this is a dual exchange from 0 or 1 passed from current dialogueObject
			this.dialogueString = this.dialogueArray[this.dialogueIndex];
			this.nameText.text = `${this.currSpeaker.data.name.toUpperCase()}: ${this.dialogueString}`;
			this.nameText.visible = true;
			this.game.dialogueGroup.bringToTop(this.nameText);
			this.nextButton.visible = killTimer?false:true; // do not show button if killTimer is passed as true

			if (killTimer) {
				this.dialogueTimer.start();
				this.game.time.events.add(4000,this.nextDialogue,this);
			}

		});
	}

	setNewThreadSpeaker() {
		//this.dialogueObject[1] => dual or single talk
		//this.dialogueObject[2] => player speaks first (1) or currChar

	}

	setSpeaker(_newThread) {
		if (this.dialogueObject[1]===1) {
			this.currSpeaker = (this.currSpeaker === this.game.player)?this.currChar:this.game.player;
		}
		if (_newThread) { //_newThread passed from switchDialogueOptions
			this.currSpeaker = this.dialogueObject[2] ? this.game.player : this.currChar;
		}
		//set speaker portrait highlight
		if (this.currChar.data.hasOwnProperty('portrait') && this.currChar !== this.game.player) {
			let targPortrait = this.currSpeaker===this.game.player?this.charR:this.charL;
			this.highlightPortrait(targPortrait);
		}

		return this.currSpeaker.data.name.toUpperCase();
	}
	setDirection(dir,char) {
		switch (dir) {
			case 'forward':
				return 'walk-backward';
			break;
			case 'backward':
				return 'walk-forward';
			break;
			case 'left':
				return 'walk-left';
			break;
			case 'right':
				return 'walk-right';
			break;
		}  
	}
	nextDialogue() {
		if ((this.windowTween.isRunning || this.nextButton.visible === false) && !this.game.globalAchievements.marchToWar ) return; // cancel if dialogue window opening
		//if (this.windowTween.isRunning) return;

		if (!this.signUp) { // if standard dialogue window is up
			if (this.dialogueIndex >= this.dialogueArray.length-1) { // end sequence
				if (this.dialogueOptions.length === 0) {
					this.endDialogue(); // end dialogue
					return;
				} else {
					//append new dialogue thread to dialogueArray
					
					this.switchDialogueThread();
				}	
			} else { // continue sequence
					this.game.sfx.play('sfx_dialogue_next'); //Play dialogueUp audio
					this.dialogueIndex = this.dialogueIndex+1; // next dialogue entry in sequence
					
				if (typeof this.dialogueArray[this.dialogueIndex]== 'string') { //If new text entry is not an object, it's a string
					this.dialogueString = this.dialogueArray[this.dialogueIndex];
					this.nameText.text = `${this.setSpeaker()}: ${this.dialogueString}`; // Updates text to current string
				} else { //if an object, it's an array containing interactive dialogue options
					// temporarily remove nextButton functionality
					// this.nextButton.inputEnabled = false;
					// this.nextButton.visible = false;
					//this.talkWindow.graphicsData[0].fillColor = '0x871a12';
					this.nameText.text = '';
					this.dialogueArray[this.dialogueIndex].map((e,i) => { //e:entry, i:index
						this.interactiveEntry(e,i);
					});
					this.activeSelection = 0;
					this.keyDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	        		this.keyDown.onDown.add(this.movePointerDown, this);
	        		this.keyUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
					this.keyUp.onDown.add(this.movePointerUp, this);
					this.pointersCollection[0].visible = true;
				}	
			}
		} else { // alert window is up
			this.dismissSign();
		}
		if (this.dialogueTimer.running) {
			this.dialogueTimer.add(4000,this.nextDialogue,this);
		}
	}
	switchDialogueThread() {
		this.dialogueIndex = 0;
		this.currChar.data.dI = this.dialogueOptions[this.activeSelection];
		this.dialogueObject = this.game.npcDialogue.data[this.currChar.data.name][this.currChar.data.dI];
		this.dialogueArray = this.game.npcDialogue.data[this.currChar.data.name][this.currChar.data.dI][0];
		this.clearDialogueOptions();
		this.nextButton.inputEnabled = true;
    	this.nextButton.visible = true;
		this.dialogueString = this.dialogueArray[this.dialogueIndex];
		//this.nameText.text = `${this.currChar.data.name.toUpperCase()}: ${this.dialogueString}`;
		//set the correct speaker for the current dialogue thread
		this.dialogueDualBool = this.dialogueObject[1] ? true : false;
		this.nameText.text = `${this.setSpeaker(true)}: ${this.dialogueString}`; //true for _newThread options


		//switch to the correct speaker
		// if (this.dialogueObject[2]) { // player to speak first
			
		// } 

	}
	interactiveEntry(e,i) {
		const y = i * 42;
		const yPos = this.game.camera.height - (this.winH - 24) + y;
		this.dialogueOptions.push(e[1]);
		let dialogueOption = this.game.add.bitmapText(122, yPos,'VT323', e[0]);
		dialogueOption.maxWidth = this.game.camera.width-80;
		//this.game.dialogueGroup.add(dialogueOption);
		this.createPointer(yPos);
		dialogueOption.inputEnabled = true;
		dialogueOption.input.useHandCursor = true;
		dialogueOption.fixedToCamera = true;
		//this.game.dialogueGroup.bringToTop(this.dialogueOption);
		dialogueOption.optionIndex = i;
		dialogueOption.events.onInputDown.add(this.dialogueOptionTouchSelect,this);
		this.dialogueTextOptions.push(dialogueOption);
	}

	dialogueOptionTouchSelect(e) {
		this.game.sfx.play('sfx_dialogue_next'); //Play dialogueUp audio
		this.clearPointers();
		this.activeSelection = e.optionIndex;
		this.pointersCollection[this.activeSelection].visible = true;
	}

	createPointer(yPos) {
		let dialogueOptionsPointer = this.game.add.sprite(40,yPos,'pointer');
		dialogueOptionsPointer.fixedToCamera = true;
		dialogueOptionsPointer.visible = false;
		dialogueOptionsPointer.scale.x = 0.32;
		dialogueOptionsPointer.scale.y = 0.32;
		dialogueOptionsPointer.anchor.y = 0.06;
		this.pointersCollection.push(dialogueOptionsPointer);
		
	}
	movePointerUp() {
		if (!this.pointersCollection[0].visible) {
			this.game.sfx.play('sfx_dialogue_next'); //Play dialogueUp audio
			this.clearPointers();
			this.activeSelection--;
			this.pointersCollection[this.activeSelection].visible = true;
		}	
	}
	movePointerDown() {
		if (!this.pointersCollection[this.dialogueOptions.length-1].visible) {
			this.game.sfx.play('sfx_dialogue_next'); //Play dialogueUp audio
			this.clearPointers();
			this.activeSelection++;
			this.pointersCollection[this.activeSelection].visible = true;
		}
	}
	clearPointers() {
		this.pointersCollection.map(e => {
			e.visible = false;
		});
	}
	clearDialogueOptions() {
		this.dialogueOptions = [];
		this.activeSelection = 0;
		this.keyDown.onDown.remove(this.movePointerDown,this);
		this.keyUp.onDown.remove(this.movePointerUp,this);
		this.pointersCollection.map(e => {
			e.destroy();
		});
		this.pointersCollection = [];
		this.dialogueTextOptions.map(e => {
			// e.events.onInputDown.removeAll();
			e.destroy();
		});
		this.dialogueTextOptions = [];

	}
	endDialogue() {
		
		//restored again on initDialogue 
		this.nextButton.visible = false;
		this.nameText.visible = false;
		this.screen.alpha = 0;

		this.dialogueTimer.stop();
		this.dialogueTimer.removeAll();

		this.currChar.data.dI = this.dialogueObject[3]; // Updates current dialogue character's dI
		//this.currChar.animations.play('walk-forward').stop();

		if (this.currChar.data.hasOwnProperty('portrait') && this.currChar !== this.game.player) {
			this.charR.visible = false;
			this.charL.visible = false;
		}
		
		this.windowTween = this.game.add.tween(this.talkWindow.scale).to({x:0,y:0},200,"Quad.easeOut").start();
		this.windowTween.onComplete.add(() => {
			this.windowTween.onComplete.removeAll();
			this.game.dialogueGroup.visible = false;
			this.game.player.isTalking = false;
			if (this.currChar.data.static  && this.currChar !== this.game.player) {
				if (!this.currChar.data.staticDir && !this.currChar.data.character === "John Horgan") this.currChar.animations.play('walk-forward').stop();
			} else if (this.currChar !== this.game.player && typeof this.currChar.assignMovementCoords === 'function') {
				this.currChar.assignMovementCoords();
			}
			this.emit('dialogueClosed'); // Restore mobile controls
			this.game.actions.setDICache(this.currChar,this.game.currentStage); // set chars new 

			if (this.dialogueObject[4] !== undefined) {
				this.dialogueObject[4](); // initialise end-sequence function
			}

		},this);
	}
	callPortraits(npc,player,_speaker,suppressPlayer) {
		//if (dual) {
			//Create portrait objects and set them in waiting
		
		

		// set values for speaker and listener portraits
		const speakerVals = {
			alpha: 1,
			scale: 0.83
		}

		const listenerVals = {
			alpha: 0.6,
			scale: 0.78
		}

		let charLVals;
		let charRVals;

		if (_speaker === this.game.player) {
			charRVals = speakerVals;
			charLVals = listenerVals;
		} else {
			charRVals = listenerVals;
			charLVals = speakerVals;
		}

		this.charL = this.game.add.sprite(-500, this.game.camera.height - (this.winH - 24), 'portraits',npc+'.png');
		this.charL.fixedToCamera = true;
		this.charL.anchor.setTo(0,1);
		this.charL.scale.setTo(charLVals.scale);
		this.charL.alpha = charLVals.alpha;
		this.game.dialogueGroup.add(this.charL).sendToBack(this.charL);

		this.charR = this.game.add.sprite(this.game.camera.width + 500, this.game.camera.height - (this.winH - 24), 'portraits', player + '.png');
		this.charR.fixedToCamera = true;
		this.charR.anchor.setTo(1,1);
		this.charR.scale.setTo(charRVals.scale);
		this.charR.alpha = suppressPlayer?0:charRVals.alpha;
		this.game.dialogueGroup.add(this.charR).sendToBack(this.charR);

		this.game.add.tween(this.charR.cameraOffset).to({x:this.game.camera.width},150,"Quad.easeOut").start();
		this.game.add.tween(this.charL.cameraOffset).to({x:0},150,"Quad.easeOut").start();

		this.game.dialogueGroup.sendToBack(this.screen);
		//}
	}
	highlightPortrait(targ) {
		let speaker = targ;
		let listener = speaker===this.charR?this.charL:this.charR;
		this.game.add.tween(speaker.scale).to({x:0.83,y:0.83},60,"Quad.easeOut",true);
		speaker.alpha = 1;
		this.game.add.tween(listener.scale).to({x:0.78,y:0.78},60,"Quad.easeOut",true);
		listener.alpha = listener.alpha===0?0:0.6; // if listener is suppressed, key its alpha 0. Otherwise, set to 0.6
	}
	sign(msg,type,closeCallback,signCallback) { //types: achievement,warning,instruction,sign
		
		this.signUp = true;
		// closeCallback for buttonMash challenge
		if (closeCallback) this.closeCallback = true;

		if (signCallback) this.signCallback = signCallback;

		this.emit('dialogueEngaged');
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.player.animations.stop();
		this.game.player.velocity = 0;
		this.game.dialogueGroup.visible = true;
		if (this.game._MOBILE) { //Hide visibility of mobile controls
			this.game.toggleMobileControls(false);
		}
		this.signTween = this.game.add.tween(this.signWindow.scale).to({x:1,y:1},140,"Quad.easeOut").start();
        this.signTween.onComplete.add(() => {
        	this.nameText.text = `${ msg }`;
			this.nameText.visible = true;
			this.game.dialogueGroup.bringToTop(this.nameText);
			this.nextButton.visible = true;
        })
    }
    dismissSign() {
		this.emit('dialogueClosed'); // Restore mobile controls 
    	this.nextButton.visible = false;
		this.nameText.visible = false;
		this.signTween = this.game.add.tween(this.signWindow.scale).to({x:0,y:0},140,"Quad.easeOut").start();
		this.signTween.onComplete.add(() => {
			this.signUp = false;
			this.game.dialogueGroup.visible = false;
			this.game.player.isTalking = false;
			if (this.game._MOBILE) { //Restore visibility of mobile controls
				if (!this.closeCallback) {
					this.game.controls.stick.visible = true;
				}
				this.game.controls.buttonA.visible = true;
			}
			if (this.closeCallback) {
				this.closeCallback = false;
				this.emit('beginButtonMashChallenge');
			}

			if (this.signCallback) {
				this.signCallback();
			}
		})
	}

	alert(msg,type) { //'completed','acquired'
		if (this.game.player.inventoryActive) {
			this.game.inventoryButton.dismissInventoryDialogue(true);
		} else if (this.game.player.questsActive) {	
			this.game.questsButton.dismissQuestDialogue(true);
		}

		this.alertWindow.visible = true;
		let alertTween = this.game.add.tween(this.alertWindow.scale).to({x:1,y:1},180,'Quad.easeOut',true);

		//play sfx
		switch(type) {
			case 'completed':
				//completed sfx
				break;
			case 'acquired':
				//acquired sfx
				break;
		}

		alertTween.onComplete.add(()=>{
			this.alertText.setText(msg);
			this.alertText.visible = true;
			this.alertTimer = this.game.time.events.add(1200,() => {
				this.alertText.visible = false;
				alertTween.to({x:0,y:0},100,"Quad.easeOut",true);
				alertTween.onComplete.removeAll();
				alertTween.onComplete.add(()=>{
					this.alertWindow.visible = false;
				});
			});
		});
	}
	
	initRead(sign) {
		
	}
}