import { Game } from './game';
import { StateManager } from './state-manager';
import { Dimensions } from './constants/game';

document.oncontextmenu = function() {return false;}; // disable right click

	let dimensions = new Dimensions(940,600);
	let renderer = !Phaser.Device.desktop?Phaser.CANVAS:Phaser.AUTO;
	//let renderer = Phaser.WEBGL;
	let game = new Game(dimensions.w,dimensions.h,renderer,'app');
	
	let manager = new StateManager(game);
	manager.start();



