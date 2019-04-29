import { QuestsDialogue } from './quests-dialogue';
import  EventEmitter from 'super-event-emitter';


export class QuestsButton extends Phaser.Sprite {

	questTween = null;
	selectedQuest = null;

	constructor(game, x = 0, y = 0, key = 'sprites') {
		super(game,x,y,key);

		this.game = game;
		game.add.existing(this);

		this.anchor.setTo(0.5);

		this.inputEnabled = true;
		this.input.useHandCursor = true;
		this.fixedToCamera = true;

		this.data.open = false;
		this.frameName = 'ui-quill-open.png';
		this.scale.setTo(0.88);

		this.questDialogue = new QuestsDialogue(this.game);
		EventEmitter.mixin(this);

		this.questTween = this.game.add.tween(this.questDialogue.questWindow.scale);

		this.events.onInputDown.add(this.initQuests,this);

	}

	initQuests(immediateDismiss) {
		if (this.questTween.isRunning || this.game.inventoryButton.inventoryTween.isRunning) return;
		if (this.game.player.isTalking) return;
		if (this.data.open) { //close
			this.data.open = false;
			this.frameName = 'ui-quill-open.png';
			this.dismissQuestDialogue(immediateDismiss);
		} else { //open
			this.data.open = true;
			this.frameName = 'ui-quill-close.png';
			this.callQuestDialogue();
		}
	}

	callQuestDialogue = () => {
		if (this.game.player.inventoryActive) {
			this.game.inventoryButton.initInventory(true);
		}

		this.questTween = this.game.add.tween(this.questDialogue.questWindow.scale).to({x:1,y:1},200,"Quad.easeOut").start();
		this.game.sfx.play('sfx_menuUp');
		this.emit('questsEngaged');
		this.game.player.questsActive = true;
		//this.game.player.isTalking = true;

		// if (this.game._MOBILE) {
		// 	this.toggleMobileControls(false);
		// }

		//keyboard control override
		this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    this.keyLeft.onDown.add(this.questDialogue.moveSelectionLeft, this);
	    this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.keyRight.onDown.add(this.questDialogue.moveSelectionRight, this);

		this.questTween.onComplete.add(() => {
			this.questDialogue.displayQuestItems();
		});
	}

	dismissQuestDialogue = (immediateDismiss) => {

		this.game.questGroup.visible = false;
		this.keyLeft.onDown.remove(this.questDialogue.moveSelectionLeft,this);
		this.keyRight.onDown.remove(this.questDialogue.moveSelectionRight,this);
		this.questDialogue.bulletsGroup.forEach(bullet => bullet.destroy());
		this.emit('questsClosed');

		if (!immediateDismiss) {
			this.questsTween = this.game.add.tween(this.questDialogue,questWindow.scale).to({x:0,y:0},200,"Quad.easeOut").start();
			this.questsTween.onComplete.add(() => {
				this.game.player.questsActive = false;
				this.game.player.isTalking = false;
				this.emit('questsClosed');
			});

		} else {
			this.questDialogue.questWindow.scale.setTo(0);
			this.game.player.questsActive = false;
		}
	}

}