import { InventoryItem } from './inventory-item';

export class InventoryDialogue {

	xPos = 50;
	yPos = 140;
	xSpacing = 175;
	currentSelection = null;

	constructor(game) {
		this.game = game;
		this.winW = this.game.camera.width-42;
		this.winH = this.game.camera.height-160;
		this.inventoryWindow = this.game.add.graphics(this.game.camera.width/2+21,this.game.camera.height/2 + 30); //this.game.height/5.55
		this.inventoryWindow.lineStyle(2,0xffffff,1);
		this.inventoryWindow.beginFill('#000',0.75);
		this.inventoryWindow.drawRoundedRect(-(this.game.camera.width)/2,-this.winH/2,this.winW,this.winH,15);
		this.inventoryWindow.fixedToCamera = true;
		this.inventoryWindow.anchor.setTo(0.5);
		this.inventoryWindow.scale.setTo(0);

		this.game.inventoryGroup = this.game.add.group();
		this.selectIcon = new Phaser.Sprite(this.game,this.xPos-10,this.yPos-10,"sprites",'ui-inventory-select.png');
		this.selectIcon.visible = false;
		this.selectIcon.currentPosition = 0;
		this.selectIcon.fixedToCamera = true;
		this.game.add.existing(this.selectIcon);

		this.inventoryText = this.game.add.bitmapText(this.xPos,this.game.camera.height-(this.game.camera.height/2.5),'VT323','',32);
		this.inventoryText.maxWidth = this.game.camera.width-80;
		this.inventoryText.fixedToCamera = true;
		this.inventoryText.visible = false;

		// this.inventory = this.game.player.data.inventory;
	}

	displayInventoryItems = () => {
		// Cycle through player inventory to display inventory items
		this.game.player.data.inventory.forEach((item, i) => {
               //draw from pool of existing inventory item instances. If an item one doesn't exist, create it. If it does, reset it.
               let inventoryItem = this.game.inventoryGroup.getFirstExists(false);
               if (!inventoryItem) {
                 inventoryItem = new InventoryItem(this.game, i * this.xSpacing + this.xPos, this.yPos, "sprites", item.id, item, i);
                 this.game.inventoryGroup.add(inventoryItem);
                 inventoryItem.events.onInputDown.add(this.setSelectIcon, this);
               } else {
                 inventoryItem.reset();
                 inventoryItem.data = item;
                 inventoryItem.frameName = `inv-${item.id}.png`;
                 inventoryItem.alpha = 0;
                 const alpha = inventoryItem.i === 0 ? 1 : 0.65;
                 this.game.add
                   .tween(inventoryItem)
                   .to({ alpha }, 140, "Quad.easeOut")
                   .start();
               }
        });
        if (this.game.inventoryGroup.children.length > 0) {
            this.selectIcon.visible = true;
            this.selectIcon.bringToTop();
        } else {
               // Note about no inventory items
        }
	}

	toggleInventoryText = () => {
		this.inventoryText.visible = this.inventoryText.visible?false:true; 
		if (this.game.player.data.inventory.length === 0) {
			  this.setText("", "You are not carrying any items");
			  this.inventoryText.cameraOffset.setTo(this.game.camera.width / 2-185, this.game.camera.height / 2-120);
    	} else {
			this.setText(this.game.inventoryGroup.children[0].data.name,this.game.inventoryGroup.children[0].data.desc);
			this.inventoryText.cameraOffset.setTo(this.xPos, this.game.camera.height - this.game.camera.height / 2.5);
		} 
	}

	setSelectIcon = (e) => {
		this.game.inventoryGroup.forEach(item => item.alpha = 0.65);
		this.selectIcon.cameraOffset.setTo(e.x-10,this.yPos-10);
		this.selectIcon.currentPosition = e.i;
		this.game.inventoryGroup.children[this.selectIcon.currentPosition].alpha = 1;
		this.currentSelection = e.data;
		this.setText(e.data.name,e.data.desc);
	} 

	setText = (name,desc) => {
		this.inventoryText.text = `${name.toUpperCase()}\n${desc}`;
	}

	moveSelectionLeft = (newX) => {

			if (this.selectIcon.currentPosition > 0) {
				// move it left
				this.selectIcon.currentPosition--;
				this.selectIcon.cameraOffset.setTo((this.xPos-10) + this.selectIcon.currentPosition * this.xSpacing,this.yPos-10);
				this.highlightSelected();
				this.moveSound();
			}
	}

	moveSelectionRight = (newX) => {
			if (this.selectIcon.currentPosition < this.game.inventoryGroup.children.length-1) {
				// move it left
				this.selectIcon.currentPosition++;
				this.selectIcon.cameraOffset.setTo((this.xPos-10) + this.selectIcon.currentPosition * this.xSpacing, this.yPos-10);
				this.highlightSelected();
				this.moveSound();
			}
	}
	moveSound = () => {
		this.game.sfx.play('sfx_menuMove');
	}

	highlightSelected = () => {
		this.game.inventoryGroup.forEach(item => item.alpha = 0.65);
		this.game.inventoryGroup.children[this.selectIcon.currentPosition].alpha = 1;
		this.currentSelection = this.game.inventoryGroup.children[this.selectIcon.currentPosition].data;
		this.setText(this.currentSelection.name,this.currentSelection.desc);
	}
	dismissSelectionIcon = () => {
		this.selectIcon.visible = false;
		this.selectIcon.cameraOffset.setTo(this.xPos-10,this.yPos-10);
		this.selectIcon.currentPosition = 0;
	}

}