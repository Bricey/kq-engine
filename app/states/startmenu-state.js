import STATE_EVENTS from '../constants/state-events';
import EventEmitter from 'super-event-emitter';
import { Orientation } from '../constants/orientation';
import { Map } from '../models/map';
import { Player } from '../models/player';

export class StartMenuState extends Phaser.State {

    create() {

        //this.game.musicHandler.music = this.game.add.audioSprite('music');
        this.game.musicHandler.play('theme-main');
        this.sfx = this.game.add.audioSprite('sfx');

        //document.addEventListener('resize',this.resize);

        //fadeScreen
        this.fadeScreen = this.add.graphics();
        this.fadeScreen.beginFill(0x000000);
        this.fadeScreen.drawRect(0,0,this.game.camera.width,this.game.camera.height);
        this.fadeScreen.endFill();
        this.fadeScreen.fixedToCamera = true;

        this.add.tween(this.fadeScreen).to({alpha:0},1000,"Quad.easeOut",true,100);


        //create bg
        this.bg = this.add.sprite(0,0,"bg-textures","startScreen-bg.png");
        this.bg.fixedToCamera = true;

        //create kenney
        this.kenney = this.add.sprite(-this.game.camera.width/3.2,this.game.camera.height,"bg-textures","startScreen-kenney.png");
        this.kenney.anchor.setTo(0,1);
        this.kenney.alpha = 0;
        this.add.tween(this.kenney.position).to({x:0},600,"Quad.easeOut",true,300);
        this.add.tween(this.kenney).to({alpha:1},600,"Quad.easeOut",true,300);
        
        //create text buttons
        // new game
        this.newGameButton = this.add.bitmapText(this.game.camera.width/1.5,this.game.camera.height/2.2,'kingsQuest',"New Game",32);
        this.newGameButton.tint = 0x000000;
        this.newGameButton.alpha = 0;
        this.newGameButton.inputEnabled = true;
        this.newGameButton.anchor.setTo(0,0.5);

        this.newGameButton.input.useHandCursor = true;
        this.newGameButton.events.onInputDown.add(this.newGame,this);

        if (localStorage.getItem('kq02-data') !== null) {
            this.createContinueButton();
        }

        //create logo
        this.logo = this.add.sprite(this.newGameButton.x+40,this.game.camera.height/5.6,"bg-textures",'logo.png');
        this.logo.scale.setTo(0.85);
        this.logo.anchor.setTo(0.5);
        this.logo.alpha=0;
        this.logoTween = this.add.tween(this.logo).to({alpha:1},600,"Quad.easeOut",true,300);

        //create episode 2 text
        this.ep2 = this.add.bitmapText(this.logo.x+60,this.logo.y+62,"kingsQuest","Episode 2",18);
        this.ep2.tint = 0x000000;
        this.ep2.alpha = 0;
        this.add.tween(this.ep2).to({alpha:1},1200,"Quad.easeOut",true,1100);

        //'A National Post game'
        this.cText = this.add.bitmapText(12,12,"kingsQuest","Creative Commons MMXIX",12);
        this.cText.tint = 0x000000;
        this.cText.alpha = 0;

        
        this.logoTween.onComplete.add(()=> {
            //create pointer
            this.pointer = this.add.sprite(this.newGameButton.x-25,this.newGameButton.y,"sprites","ui-pointer.png");
            this.pointer.anchor.setTo(1,0.5);
            this.pointer.alpha = 0;
            this.add.tween(this.newGameButton).to({alpha:1},500,"Quad.easeOut",true,200);
            this.add.tween(this.pointer).to({alpha:1},500,"Quad.easeOut",true,200);
            this.add.tween(this.cText).to({alpha:1},500,"Quad.easeOut",true,200);
            if (this.continueButton) {
                this.add.tween(this.continueButton).to({ alpha: 1 }, 500, "Quad.easeOut", true, 200);
            }
            
            //this.activeCommand = this.select;

            //create controls
            this.game.controls.apad = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.controls.up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.game.controls.down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN);
            this.game.controls.apad.onDown.add(this.newGame, this);
            this.game.controls.up.onDown.add(this.up,this);
            this.game.controls.down.onDown.add(this.down,this);


            this.fadeScreen.destroy();
    
        });        

    }

    createContinueButton() {
        this.continueButton = this.add.bitmapText(this.game.camera.width / 1.5, this.game.camera.height / 1.82, 'kingsQuest', "Continue", 26);
        this.continueButton.tint = 0x000000;
        this.continueButton.alpha = 0;
        this.continueButton.inputEnabled = true;
        this.continueButton.anchor.setTo(0, 0.5);
        this.continueButton.input.useHandCursor = true;
        this.continueButton.events.onInputDown.add(this.continueGame, this);
    }

    update() {
        if (this.fadeScreen) this.game.world.bringToTop(this.fadeScreen);
    }

    select() {  
        this.sfx.play('sfx_dialogue_up');
        this.camera.fade(0x0000000,800);
        this.camera.onFadeComplete.add(() => {
            this.game.musicHandler.stop();
            
            // set start stage function
            // this.game.stageInitFunction = []; 
             this.game.stageInitFunction = "newGameInitFunction_calgary_00";

            this.game.state.start('Game');
        });
    }

    up() {
        
        if (this.pointer.y === this.newGameButton.y + 60 && this.continueButton) {
            this.pointer.y = this.newGameButton.y;
            this.game.controls.apad.onDown.removeAll();
            this.game.controls.apad.onDown.add(this.newGame, this);
            this.sfx.play('sfx_dialogue_next');
        }

    }

    down() {
        
        if (this.pointer.y === this.newGameButton.y && this.continueButton) {
            this.pointer.y = this.newGameButton.y + 60;
            this.game.controls.apad.onDown.removeAll();
            this.game.controls.apad.onDown.add(this.continueGame, this);
            this.sfx.play('sfx_dialogue_next');
        }
    }

    newGame() {
        this.data_startNewGame();
        //this.continueDataFalse();
        this.select();
    }

    continueGame() {
        this.game.data = JSON.parse(localStorage.getItem('kq02-data'));
        if (!this.game.data) {this.throwError();return;}
        this.game.tilemaps.forEach(tilemap => {
            var newTilemap = JSON.parse(localStorage.getItem(tilemap));
            newTilemap = newTilemap.data;
            this.game.cache.getTilemapData(tilemap).data = newTilemap;
        },this);
        this.game.startingPosition = this.game.data.gameData.startingPosition;
        this.game.currentCharacter = this.game.data.gameData.currentCharacter;
        this.game.currentStage = this.game.data.gameData.currentStage;
        this.game.companion = this.game.data.gameData.companion;
        this.game.globalAchievements = this.game.data.gameData.globalAchievements;
        this.game.atlas = this.game.data.gameData.atlas;
        this.game.stageInitFunction = this.game.data.gameData.stageInitFunction;
        
        // read game tracking data
        this.game.readGameData(()=>{
            this.game.tData("continues");
            this.game.musicHandler.stop();
            this.game.state.start('Game');
        });
        
    }

    throwError() {
        this.continueButton.text = "Error loading saved game";
        this.continueButton.tint = 0xc60505;
    }

    data_startNewGame() {
        this.game.writeNewGameData(this.game.trackingData);
    }

}