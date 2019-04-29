import { ArrowButton } from './ui-arrow-button';

export class QuestsDialogue {

	xPos = 50;
	yPos = 140;
	xSpacing = 175;
	bulletGrey = '0x515151';

	constructor(game) {
		this.game = game;
		this.winW = this.game.camera.width-42;
		this.winH = this.game.camera.height-160;

		// Create quest window
		this.questWindow = this.game.add.graphics(this.game.camera.width/2+21,this.game.camera.height/2 + 30); //this.game.height/5.55
		this.questWindow.lineStyle(2,0xffffff,1);
		this.questWindow.beginFill('#000',0.75);
		this.questWindow.drawRoundedRect(-(this.game.camera.width)/2,-this.winH/2,this.winW,this.winH,15);
		this.questWindow.fixedToCamera = true;
		this.questWindow.anchor.setTo(0.5);
		this.questWindow.scale.setTo(0);

		this.game.questGroup = this.game.add.group();
		//this.game.questsGroup.add(this.questWindow);

		// create arrow buttons
		this.arrowRight = new ArrowButton(this.game,this.winW-40,140,"sprites","ui-arrow-right.png");
		this.arrowLeft = new ArrowButton(this.game,this.winW-120,140,"sprites",'ui-arrow-left.png');
		this.game.questGroup.add(this.arrowRight);
		this.game.questGroup.add(this.arrowLeft);

		this.arrowRight.events.onInputDown.add(this.moveSelectionRight,this);
		this.arrowLeft.events.onInputDown.add(this.moveSelectionLeft,this);


		// Create quest title text
		this.questTitleText = this.game.add.bitmapText(this.xPos,this.game.camera.height-(this.game.camera.height/1.55),'VT323','',42);
		this.questTitleText.maxWidth = this.game.camera.width - 80;
		this.questTitleText.fixedToCamera = true;
		this.game.questGroup.add(this.questTitleText);

		// Create quest body text
		this.questText = this.game.add.bitmapText(this.xPos,this.game.camera.height-(this.game.camera.height/1.75),'VT323','',36);
		this.questText.fixedToCamera = true;
		this.questText.maxWidth = this.game.camera.width - 80;
		this.game.questGroup.add(this.questText);

		// Create quest current node text
		this.questCurrentNodeText = this.game.add.bitmapText(this.xPos + 68,this.game.camera.height-(this.game.camera.height/3.1),'VT323','',32);
		this.questCurrentNodeText.fixedToCamera = true;
		this.questCurrentNodeText.maxWidth = this.game.camera.width - 160;
		this.game.questGroup.add(this.questCurrentNodeText);

		// Create quest current text node icon
		this.questCurrentNodeIcon = this.game.add.sprite(this.xPos,this.game.camera.height-(this.game.camera.height/3.1)-8, "sprites",'ui-waypoint-active.png');
		this.questCurrentNodeIcon.fixedToCamera = true;
		this.questCurrentNodeIcon.scale.setTo(0.88)
		this.game.questGroup.add(this.questCurrentNodeIcon);

		this.game.questGroup.visible = false;

		//Quest navigation variables
		this.quests = this.game.player.data.quests;
		this.questsNum = this.quests.length;
		this.currentSelectedQuest = 0;

		// group for bullets
		this.bulletsGroup = [];

	}

	displayQuestItems = () => {

		this.bulletsGroup = []; // reset bullets array
		this.quests = this.game.player.data.quests;

		if (this.quests.length === 0) { //quests are empty
			this.setEmptyQuestList();
		} else {
			this.currentSelectedQuest = 0;
			this.arrowLeft.alpha = 0.25;
			this.quests.length<2?this.arrowRight.alpha = 0.25:this.arrowRight.alpha = 1;
			if (this.quests.length < 2) this.arrowRight.alpha = 0.25;
			this.questsNum = this.quests.length;
			
			this.setBullets();
			this.updateText();
		}
		
		this.game.questGroup.visible = true;

	}

	setBullets = () => {
		const bulletSpacing = 20;
		this.quests.forEach((q,i) => {
				const bullet = this.game.add.graphics(this.xPos + (i*bulletSpacing),152);
				bullet.beginFill(this.bulletGrey);
				bullet.drawCircle(0,0,10);
				bullet.endFill();
				bullet.fixedToCamera = true;
				this.bulletsGroup.push(bullet);
				
		});
	}

	moveSelectionRight = () => {
			// move right
			
			
		if (this.currentSelectedQuest !== this.questsNum-1) {
			
			this.currentSelectedQuest++;
			this.game.sfx.play('sfx_menuMove');
			this.updateText();
			this.updateArrows();

		}

	}

	moveSelectionLeft = () => {
			// move left
			
		if (this.currentSelectedQuest > 0) {
			this.currentSelectedQuest--;
			this.game.sfx.play('sfx_menuMove');
			this.updateText();
			this.updateArrows();
			
		}

	}

	setEmptyQuestList = () => {
		this.questText.text = `You have no active quests`;
		this.questText.anchor.setTo(0.5);
		this.questText.cameraOffset.x = this.game.camera.width/2;
		this.arrowLeft.visible = false;
		this.arrowRight.visible = false;
		if (typeof this.questCurrentNodeIcon === 'object') this.questCurrentNodeIcon.visible = false;
	}

	updateArrows = () => {
		this.currentSelectedQuest === this.questsNum-1 ? this.arrowRight.alpha = 0.25 : this.arrowRight.alpha = 1;
		this.currentSelectedQuest === 0 ? this.arrowLeft.alpha = 0.25 : this.arrowLeft.alpha = 1;
	}

	updateText = () => {
		
		// set new bullet colour
		this.bulletsGroup.forEach(bullet => {
			
			//bullet.graphicsData[0].fillColor = "0xcccccc";
			bullet.beginFill(this.bulletGrey);
			bullet.drawCircle(0,0,10);
			bullet.endFill();
		});
		


		const currentBullet = this.bulletsGroup[this.currentSelectedQuest];
		//currentBullet.graphicsData[0].fillColor = "0xf2d337";
		currentBullet.beginFill('0xf2d337');
		currentBullet.drawCircle(0,0,10);
		currentBullet.endFill();
		
		this.arrowLeft.visible = true;
		this.arrowRight.visible = true;
		this.questCurrentNodeIcon = true;

		this.questTitleText.text = this.quests[this.currentSelectedQuest].name.toUpperCase();
		this.questText.anchor.setTo(0,0);
		this.questText.cameraOffset.x = this.xPos;
		this.questText.text = this.quests[this.currentSelectedQuest].desc;
		const currentNodes = this.quests[this.currentSelectedQuest].nodes;
		let currentNodeIndex = 0;
		for (let i=0;i<currentNodes.length;i++) {
			
			if (currentNodes[i].complete === false) {
				currentNodeIndex = i;
				i = currentNodes.length;
			}
		}
		this.questCurrentNodeText.text = this.quests[this.currentSelectedQuest].nodes[currentNodeIndex].desc;
	}

}