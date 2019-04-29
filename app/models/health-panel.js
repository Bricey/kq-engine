import { HealthIcon } from './health-icon';

export class HealthPanel {

	iconGroup = null;

	constructor(game,context) {

		this.context = context;
		this.game = game;
		this.xStartPos = 75;
		this.yPos = 28;

		this.iconArray = [];
		this.iconGroup = this.context.add.group();

		this.initHealthIconDraw(this.game.player.maxHealth);
	}

	initHealthIconDraw(health) {
		
		const hearts = health/2;
		for (let i=0;i<hearts;i++) {
			const healthIcon = new HealthIcon(this.game, i * 42 + this.xStartPos, this.yPos, "sprites", 'full');
			this.iconGroup.add(healthIcon);
			this.iconArray.push(healthIcon);
		}
		this.drawHealthIcons(this.game.player.health);
	}

	redrawIcons() {
		this.iconGroup.forEach(icon => icon.destroy());
		this.iconArray = [];
		this.initHealthIconDraw(this.game.player.maxHealth);
	}

	drawHealthIcons(health) {
		let iconTypeArray = [];
		let halfHealth = false;
		let inactive = this.game.player.maxHealth - health;
		let active = health;


		if (this.game.hasOwnProperty('sfx')) {
			if ( health <=2 ) { // sound Alert
				this.game.sfx.play('sfx_healthLow');
			} else if (health >= 2) { // turn off alert if it's running
				this.game.sfx.stop('sfx_healthLow');
			}
		}

		if (!this.divisibleByTwo(active)) {
			active++;
			inactive--;
			halfHealth = true;
			
			
		}

		active = active/2;
		inactive = inactive/2;

		for (let i=1;i<=active;i++) {
			
			if (halfHealth && i === active) {
				iconTypeArray.push('half');
			} else {
				iconTypeArray.push("full");
			}
		}

		for (let i=0;i<inactive;i++) {
			iconTypeArray.push('empty');
		}

		iconTypeArray.forEach((val,i) => {
			
			this.iconArray[i].frameName = `ui-hearts-${val}.png`;;
		});

	}

	divisibleByTwo(num) {
		return num % 2 === 0;
	}

	playerHit(health) {
		//flash animation
		this.drawHealthIcons(health);
	}
}