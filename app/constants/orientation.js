// Device orientation signal calls

export class Orientation {
	constructor(game) {
		// listeners for mobile device orientation change
        this.game = game;
        this.game.scale.forceOrientation(true,false); // should run in landscape mode only
        this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);

        // if running in mobile Safari
        if (this.game.device.mobileSafari) {
        	this.safariSetup();
        }

        // if running as a webapp
        if (this.game.device.webApp) {

        }

        // if running on a Windows phone
        if (this.game.device.windowsPhone) {

        }

        // if running in Firefox
        if (this.game.device.firefox) {

        }

        // if running on Chroms OS
        if (this.game.device.chromeOS) {

        }

        //if running on Android
        if (this.game.device.android) {

        }

	}
	enterIncorrectOrientation() {
	    // pause game and display msg
	    // 'Turn your device to play'
		this.game.paused = true;
	    const msg = "Turn your device to play"
	   if (!this.blackScreen) {
		   this.blackScreen = this.game.add.graphics(0,0);
		   this.blackScreen.fixedToCamera = true;
			this.blackScreen.beginFill(0x000000,0.65);
			this.blackScreen.drawRect(0,0,this.game.width,this.game.height);
			this.blackScreen.endFill();
		    this.warningText = this.game.add.text(this.game.camera.width/2,this.game.camera.height/2-20,msg,this.game.data.textStyle)
			this.warningText.anchor.setTo(0.5);
			this.warningText.fixedToCamera = true;
	    } else {
	    	this.blackScreen.reset();
	    	this.warningText.reset();
		}
		console.log(this.blackScreen)
		if (!this.game.device.desktop && this.game.controls.stick) {
			// hide mobile controls
			this.game.controls.stick.visible = false;
			this.game.controls.buttonA.visible = false;
		}
	    this.game.world.bringToTop(this.blackScreen);
		this.game.world.bringToTop(this.warningText);
		//this.game.scale.refresh();
	}

	leaveIncorrectOrientation() {
	    // dismiss msg and continue game
	    this.game.paused = false;
	    this.blackScreen.kill();
		this.warningText.kill();
		// this.game.width = window.innerWidth;
		// this.game.height = window.innerHeight;
		// this.game.camera.width = this.game.width;
		// this.game.camera.height = this.game.height;
		if (!this.game.device.desktop && this.game.controls.stick) {
			// hide mobile controls
			this.game.controls.stick.visible = true;
			this.game.controls.buttonA.visible = true;
		}
		this.game.scale.refresh();
		// const canvas = document.getElementsByTagName('canvas')[0];
		// canvas.focus();

	}

	safariSetup() {

	}

	androidSetup() {

	}

}