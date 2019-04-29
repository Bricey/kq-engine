import { InventoryDialogue } from './inventory-dialogue';
import EventEmitter from 'super-event-emitter';

export class InventoryButton extends Phaser.Sprite {

	inventoryTween = null;
	selectedItem = null;

	constructor(game, x = 0, y = 0, key = 'sprites') {
		super(game,x,y,key);

		this.game = game;

		game.add.existing(this);

		this.anchor.setTo(0.5);

		this.inputEnabled=true;
		this.input.useHandCursor=true;
		this.fixedToCamera = true;

		this.data.open = false;

		this.frameName = 'ui-inventory-open.png';

		this.inventoryDialogue = new InventoryDialogue(this.game);
		EventEmitter.mixin(this);

		this.inventoryTween = this.game.add.tween(this.inventoryDialogue.inventoryWindow.scale);

		this.events.onInputDown.add(this.initInventory,this);
	}	

	initInventory(immediateDismiss) {
		if (this.inventoryTween.isRunning ) return;
		if (this.game.player.isTalking) return;
		if (this.data.open) { //close
			this.data.open = false;
			this.frameName = 'ui-inventory-open.png';
			this.dismissInventoryDialogue(immediateDismiss);
		} else {
			this.data.open = true;
			this.frameName = 'ui-inventory-close.png';
			this.callInventoryDialogue();
			//close inventory
		}
	}

	callInventoryDialogue() {
		if (this.game.player.questsActive) this.game.questsButton.initQuests(true);

		this.inventoryTween = this.game.add.tween(this.inventoryDialogue.inventoryWindow.scale).to({x:1,y:1},200,"Quad.easeOut").start();
		this.game.sfx.play('sfx_menuUp');
		// Disable player controls
		this.emit('inventoryEngaged');
		this.game.player.inventoryActive = true;
		//this.game.player.isTalking = true;

		// if (this.game._MOBILE) { //Hide visibility of mobile controls
		// 	this.toggleMobileControls(false);
		// }

		//keyboard control override
		this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    this.keyLeft.onDown.add(this.inventoryDialogue.moveSelectionLeft, this);
	    this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.keyRight.onDown.add(this.inventoryDialogue.moveSelectionRight, this);

		this.inventoryTween.onComplete.add(() => {
			this.inventoryDialogue.displayInventoryItems();
			this.inventoryDialogue.toggleInventoryText();
		});
	}

	dismissInventoryDialogue(immediateDismiss) {
		this.game.inventoryGroup.forEach(item => item.kill()); // Remove all inventoryGroup items
		this.inventoryDialogue.dismissSelectionIcon(); // render selectionIcon invisible
		this.inventoryDialogue.toggleInventoryText(); // render text invisible
		this.keyLeft.onDown.remove(this.inventoryDialogue.moveSelectionLeft,this); //remove left movement key listener
		this.keyRight.onDown.remove(this.inventoryDialogue.moveSelectionRight,this); // remove right movement key listener
		this.emit('inventoryClosed');
		if (!immediateDismiss) { // false if inventory button pressed. True if inventory button pressed to switch between.
			this.inventoryTween = this.game.add.tween(this.inventoryDialogue.inventoryWindow.scale).to({x:0,y:0},200,"Quad.easeOut").start();

			this.inventoryTween.onComplete.add(() => {
				// Reactivate player controls
				this.game.player.inventoryActive = false;
				this.game.player.isTalking = false;

				this.emit('inventoryClosed');
			});
		} else {
			this.inventoryDialogue.inventoryWindow.scale.setTo(0);
			this.game.player.inventoryActive = false;
			
		}
	}


	select() {
		
	}
}