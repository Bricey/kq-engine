import STATE_EVENTS from '../constants/state-events';
import { Player } from '../models/player';

export class GameoverState extends Phaser.State {

	create() {
		 this.game.player = new Player( //create player object
            this.game,
            (this.game.camera.x + this.game.camera.width) / 2,
            (this.game.camera.y + this.game.camera.height) / 2,
            "sprites",
            "",
            this.game.data.players.jasonKenney
        );

		 //this.camera.follow(this.game.player);
		this.game.musicHandler.play('theme-gameOver');
		//this.game.sfx.play('sfx_playerDeath');
		 this.game.player.animations.play('death');
		 const tween = this.game.add.tween(this.game.player.position).to({x:this.game.camera.width/2,y:this.game.camera.height/2},2000,"Quad.easeOut").start();
		 tween.onComplete.addOnce(() => {
		 	this.gameoverSetup();
		 });
	}

	gameoverSetup() {
		this.game.player.animations.stop();
		this.game.player.frameName = 'hero-death/_01.png';

		this.game.tData("gameOver");

			// game over text
		this.gameoverText = this.game.add.bitmapText(this.game.camera.width/2,100,'VT323','Game Over',42);
		this.gameoverText.fixedToCamera = true;
		this.gameoverText.anchor.setTo(0.5);
		this.gameoverText.align = "center";
		this.gameoverText.scale.setTo(1.2);

			// continue button
		this.continueButton = this.game.add.bitmapText(this.game.camera.width/2,this.game.camera.height/2+100,'VT323','Continue?',36);
		this.continueButton.fixedToCamera = true;
		this.continueButton.align = "center";
		this.continueButton.anchor.setTo(0.5);
		this.continueButton.inputEnabled = true;
		this.continueButton.useHandCursor = true;
		this.continueButton.events.onInputDown.add(this.continueGame,this);

			// hand cursor
		let pointer = this.game.add.sprite(this.continueButton.x-72,this.continueButton.y,'pointer');
		pointer.fixedToCamera = true;
		pointer.scale.setTo(0.26);
		pointer.anchor.setTo(1,0.5);

		   // set up action keyboard control to initiate continueGame()
		this.game.controls.apad = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.game.controls.apad.onDown.add(this.continueGame,this);

	}

	continueGame() {
		//DO OTHER STUFF TO SET UP LEVEL AGAIN
		this.game.controls.apad.onDown.removeAll();
		this.game.data.players.jasonKenney.health = this.game.data.players.jasonKenney.maxHealth;
		this.game.state.start('Game');
	}

}