
import STATE_EVENTS from '../constants/state-events';
import EventEmitter from 'super-event-emitter';
import { Orientation } from '../constants/orientation';
import { Dialogue } from '../models/dialogue';
// import { NpcFunctions } from '../models/npcFunctions';
// import { NpcDialogue } from '../models/npcDialogue';
import { FullscreenButton } from '../models/fullscreen-button';
//import { runInThisContext } from 'vm';
import { Obj } from '../models/object';
import { Map } from '../models/map';
import { Player } from '../models/player';
import { Dragon } from '../models/dragon';
import { NPC } from '../models/npc';
// import { Cutscene} from '../models/cutscene';
import { NextButton } from '../models/next-button';

export class IntroState extends Phaser.State {

    create() {

        this.game.musicHandler.musicSprite = this.game.add.audioSprite('music');
        this.game.musicHandler.play('theme-intro');

        //this.musicSprite = this.game.add.audioSprite('music');

        // MUSIC INIT. Turn me off when testing
        //this.musicSprite.play('theme-intro');         


        this.game.controls.apad = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.controls.apad.onDown.addOnce(this.skipIntroAction, this);
        
        this.game.stage.disableVisibilityChange = true; // don't stop cutscene when window loses focus

        this.cutscene = false;
        // current cutscene intro time
        this.fadeScreen = this.game.add.graphics();
        this.fadeScreen.beginFill(0x000000);
        this.fadeScreen.drawRect(0,0,this.game.camera.width,this.game.camera.height);
        this.fadeScreen.endFill();
        this.fadeScreen.fixedToCamera = true;
        this.fadeScreen.alpha = 0;
        this.fadeScreen.visible = false;

        this.cutTime = 41500;


        
        //INTRO END TIMER DISABLED DURING CUTSCENE BUILD!!!!!

        this.game.time.events.add(this.cutTime, () => {
            
            this.fadeScreen.visible = true;

            //create fadeinscreen bc dumbshit fade not working correctly 
            this.fadeTween = this.game.add.tween(this.fadeScreen).to({alpha:1},2000,"Quad.easeOut").start();


            this.fadeTween.onComplete.add(() => {
                this.game.musicHandler.stop();
                // remove all the things
                this.bmd.clear();
                this.scene1Group.visible = false;
                this.trees.destroy();
                this.g1.destroy();
                this.cloud1.destroy();
                this.screenText.destroy();
                this.secondaryText.destroy();
                //this.createGradientBG(0x000000,0x000000,0);
                //this.createGradientBG(0x0d1526, 0x213256);
                this.bmd.clear(0,0,0,0);

                // jump to cutscene
                this.cutScene();

            });
            
        }); 


        /////////////////// - end closed timer!!!!!!



        this.game.objGroup = this.game.add.group();
        
        //start text animation
        this.text = [
            "'Alberta cries out...",
            "...and my destiny grows clearer.'",
            "The Fates of Alberta present",
            "Kenney's Quest",
            "Episode 2"
        ];
        
        //create bg
        this.bmd = this.game.add.bitmapData(this.game.camera.width, this.game.camera.height);
        this.createGradientBG(0x0d1526, 0x213256);

        this.textGroup = this.game.add.group();
        this.scene1Group = this.game.add.group();
        this.scene1Group.visible = false;

        this.screenText = this.add.bitmapText(this.game.camera.width/2,this.game.camera.height/2,'VT323',this.text[0],32,this.textGroup);

        this.screenText.alpha = 0;
        this.screenText.fixedToCamera = true;
        this.screenText.anchor.setTo(0.5);
        this.game.world.add(this.screenText);

        
        //create other intro assets
        // moutain tilesprites
        this.m3 = this.game.add.tileSprite(
            0, 
            this.game.camera.height / 2+20,
            this.game.camera.width,
            this.game.camera.height/2,
            'bg-textures',
            'intro-mountains-03.png'
        );
        this.m2 = this.game.add.tileSprite(
            0,
            this.game.camera.height / 2+4,
            this.game.camera.width,
            this.game.camera.height / 2,
            'bg-textures',
            'intro-mountains-02.png'
        );
        this.m1 = this.game.add.tileSprite(
            0,
            0,
            this.game.camera.width,
            this.game.camera.height / 1.5,
            'bg-textures',
            'intro-mountains-01.png'
        );
        this.g1 = this.game.add.tileSprite(
            this.game.camera.width/2,
            this.game.camera.height,
            this.game.camera.width,
            this.game.camera.height /1.3,
            'bg-textures',
            'snow.png'
        );
        this.bg1 = this.game.add.sprite(
            0,
            0,
            "bg-textures",
            "intro-clouds-01.png"
        );
        this.g1.visible = false;
        this.g1.fixedToCamera = true;
        this.g1.anchor.setTo(0.5);
        this.bg1.visible = false;
        this.bg1.fixedToCamera = true;
        this.bg1.scale.setTo(2);
        // this.bg1 = this.game.add.sprite(0,0,'bg-textures','intro-clouds-01.png');
        // this.bg1.fixedToCamera = true;

        this.m1.visible = false;
        this.m1.tileScale = {x:2.8,y:2.8};
        this.m2.tileScale = {x:2.24,y:2.24};
        this.m3.tileScale = {x:2,y:2};
        this.mountainsMovingX = true;
        this.mountainsMovingY = false;

        this.m1.fixedToCamera = true;
        this.m2.fixedToCamera = true;
        this.m3.fixedToCamera = true;
        this.scene1Group.add(this.m3);
        this.scene1Group.add(this.m2);
        this.scene1Group.add(this.m1);
        this.scene1Group.add(this.bg1);

        //create truck
        const truckProps = {
            objectType: 'truck',
            type: 'object',
            colour: 'blue',
            direction: "1,1"
        }
        this.truck = new Obj(this.game, this.game.camera.width / 2, this.game.camera.height / 1.26, 'sprites', "", truckProps);
        this.truck.animations.play('drive-up');
        this.truck.fixedToCamera = true;
        this.truck.visible = false;

        let cam = this.game.camera;

        //create clouds
        this.cloud1 = this.game.add.sprite(-80, -80, 'bg-textures', 'cloud-01.png');
        this.cloud1.fixedToCamera = true;
        this.cloud1.alpha = 0.8;
        this.cloud1.scale.setTo(3);
        this.cloud1.anchor.setTo(0.5);
        this.cloud1.visible = false;

        this.cloud2 = this.game.add.sprite(cam.width / 1.5, -100, 'bg-textures', 'cloud-01.png');
        this.cloud2.fixedToCamera = true;
        this.cloud2.alpha = 0.6;
        this.cloud2.scale.setTo(3.2);
        this.cloud2.anchor.setTo(0.5);
        this.cloud2.visible = false;

        this.cloud3 = this.game.add.sprite(cam.width / 2.1, cam.height + 120, 'bg-textures', 'cloud-01.png');
        this.cloud3.fixedToCamera = true;
        this.cloud3.alpha = 0.85;
        this.cloud3.scale.setTo(3.35);
        this.cloud3.anchor.setTo(0.5);
        this.cloud3.visible = false;

        //create skip button
        this.skipButton = new NextButton(this.game,this.game.camera.width-80,this.game.camera.height-80);
        this.skipText = this.add.bitmapText(this.skipButton.x-55,this.skipButton.y,'VT323','SKIP',38);
        this.skipText.anchor.setTo(1,0.5);
        this.skipButton.events.onInputDown.add(this.skipIntroAction,this);
        
        // only for testing
        this.timing = 200;
        //800
        //2800
        //500


        //pause before text enters
        // currently a delay in Firefox before music starts. Forced delay will aim to keep music and viz better in sync
        let delay = Phaser.Device.firefox?3100:800;
        this.game.time.events.add(delay, () => {
            
            this.firstStep(); //<= real call
            //this.cutScene(); // skip to here for build

        });
        
        
    }

    update() {

        if (this.fadeScreen) this.game.world.bringToTop(this.fadeScreen);
        if (this.skipButton) {
            this.game.world.bringToTop(this.skipButton);
            this.game.world.bringToTop(this.skipText);
        }

        if (!this.cutscene) {
            if (this.mountainsMovingX) {
                this.m1.tilePosition.x -=0.5;
                this.m2.tilePosition.x -= 0.28;
                this.m3.tilePosition.x -= 0.06;
            } else if (this.mountainsMovingY) {
                this.m2.cameraOffset.y -= 0.1;
                this.m3.cameraOffset.y -=0.05;
                this.g1.tilePosition.y += 0.42;
            } else if (this.g1MovingX) {
                 this.g1.tilePosition.x -= 2.5;
            } else if (this.g1MovingY) {
                this.g1.tilePosition.y -= 2;
            }

            if (this.trees) {
                this.trees.tilePosition.x -= 3;
            }
        }

        // if (this.g1MovingX) {
        //     this.game.world.bringToTop(this.g1);
        //     this.game.debug.spriteInfo(this.g1.tilePosition.x, 32, 32, '#fff');
        // }
    }

    skipIntroAction () {
        // skip to start screen. fade out
        
        this.camera.fade(0x000000,300);
        this.camera.onFadeComplete.add(() => {
            this.game.musicHandler.stop(); 
            this.game.state.start('StartMenu');
        });
    }

    firstStep() {
        this.textTween = this.game.add.tween(this.screenText).to({alpha:1},800,"Quad.easeOut").start();
        this.textTween.onComplete.add(() => {
            this.game.time.events.add(2800, () => {
                this.secondStep();
            });
        });
    }

    secondStep() {
         this.textTween = this.game.add.tween(this.screenText).to({alpha:0},600,"Quad.easeOut").start();
        this.textTween.onComplete.add(() => {
            this.game.time.events.add(500, () => {
                this.screenText.setText(this.text[1]);
                this.thirdStep();
            });
        });
    }

    thirdStep() {
         this.textTween = this.game.add.tween(this.screenText).to({alpha:1},600,"Quad.easeOut").start();
        this.textTween.onComplete.add(() => {
            this.game.time.events.add(2500, () => {
                this.fourthStep();
            });
        });
    }

    fourthStep() {
         this.textTween = this.game.add.tween(this.screenText).to({alpha:0},600,"Quad.easeOut").start();
        this.textTween.onComplete.add(() => {
                this.fifthStep();
        });
    }

    fifthStep () {
        //call in the visuals
        //this.game.stage.backgroundColor = "#0d1526";
        this.bmd.addToWorld();
        this.game.world.bringToTop(this.scene1Group);
        this.game.world.bringToTop(this.textGroup);
        
        this.screenText = this.add.bitmapText(this.game.camera.width / 2, this.game.camera.height / 2-100, 'kingsQuest', this.text[2], 32, this.textGroup);
        this.screenText.anchor.setTo(0.5);
        this.screenText.alpha = 1;
        this.scene1Group.visible = true;
        this.game.time.events.add(5000, () => {
            this.textTween = this.game.add.tween(this.screenText).to({alpha:0},600,"Quad.easeOut").start();
            this.textTween.onComplete.add(()=> { 
                this.game.time.events.add(500, this.sixthStep,this);
             });
        });
    }

    sixthStep () {
        this.screenText.fontSize = 48;
        this.screenText.position.y = 140;
        this.screenText.setText(this.text[3]);
        this.m2.height = this.game.camera.height / 3;
        this.m3.height = this.game.camera.height / 3;
        //this.m2.position.y = this.game.camera.height/4.5;
        //this.m3.position.y = this.game.camera.height / 4.5;
        this.game.world.bringToTop(this.g1);
        this.g1.visible = true;

        //make truck visible
        this.truck.visible = true;
        this.game.world.bringToTop(this.game.objGroup);

        this.m2.tileScale = {x:1.5,y:1.5}
        this.m3.tileScale = {x:1.2,y:1.2};
        this.mountainsMovingX = false;
        this.mountainsMovingY = true;
        let tween = this.game.add.tween(this.screenText).to({alpha:1},600,"Quad.easeOut").start();
        tween.onComplete.add(()=> {
            //this.textTween.pause();
            this.secondaryText = this.add.bitmapText(this.game.camera.width / 2, 210, 'kingsQuest', this.text[4], 18, this.textGroup);
            this.secondaryText.fixedToCamera = true;
            this.secondaryText.anchor.setTo(0.5);
            this.secondaryText.alpha = 0;
            let newTween = this.game.add.tween(this.secondaryText).to({alpha:1},600,"Quad.easeOut").start();
            this.game.time.events.add(5000,() => {
                this.seventhStep();
            });
        });
    }

    seventhStep () {

        // sunset scene

        //this.textTween = this.game.add.tween(this.screenText).to({alpha:0},this.timing,"Quad.easeOut").start();
        this.newTextTween = this.game.add.tween(this.textGroup).to({alpha:0},800,"Quad.easeOut").start();
        this.newTextTween.onComplete.add(() => {

        this.m2.visible = false;
        this.m3.visible = false;
        this.mountainsMovingY = false;
        this.g1MovingX = true;
            // switch visual - car in profile
            
            
            this.truck.cameraOffset = {x:-100,y:this.game.camera.height/1.5};
            this.truck.play('drive-LR');
            this.game.world.bringToTop(this.game.objGroup);
            this.textTween = this.game.add.tween(this.truck.cameraOffset).to({x: this.game.camera.width+240},6000).start();
            // create sunset sky
            this.createGradientBG(0x1a77be, 0x2dca12f, this.game.camera.height/1.5);
            this.g1.frameName = 'sunset-grass.png';
            this.g1.cameraOffset.y = this.game.camera.height-(this.game.camera.height/10);
            this.bg1.visible = true;
            if (this.game.objGroup.children.length === 2) return;

            this.textTween.onComplete.add(() => {
                this.eighthStep();
            });
        });

    }

    eighthStep () {
        //front face of truck, driving on field. pull out (scale)
        this.bg1.visible = false;
        this.truck.cameraOffset.x = this.game.camera.width/2;
        this.truck.cameraOffset.y = this.game.camera.height/2;
        this.truck.play('drive-down');
        this.g1.frameName = 'grass.png';
        this.g1.cameraOffset.x = this.game.camera.width/2;
        this.g1.cameraOffset.y = this.game.camera.height/2;
        this.g1.width = this.game.camera.width*2;
        this.g1.height = this.game.camera.height*2;
        this.g1MovingX = false;
        this.g1MovingY = true;

        const cam = this.game.camera;

        this.cloud1.visible = true;
        this.cloud2.visible = true;
        this.cloud3.visible = true;

        this.game.world.bringToTop(this.cloud1);
        this.game.world.bringToTop(this.cloud2);
        this.game.world.bringToTop(this.cloud3);

        this.game.time.events.add(1600,() => {
            //cloud tweens
            this.game.add.tween(this.cloud1.scale).to({x:1.6,y:1.6},6000,'Quad.easeOut').start();
            this.game.add.tween(this.cloud1.cameraOffset).to({x:cam.width/6,y:cam.height/6},6000,'Quad.easeOut').start();

            this.game.add.tween(this.cloud2.scale).to({x:1.9,y:1.9},6000,'Quad.easeOut').start();
            this.game.add.tween(this.cloud2.cameraOffset).to({x:cam.width/1.8,y:80},6000,'Quad.easeOut').start();

            this.game.add.tween(this.cloud3.scale).to({x:2.1,y:2.1},6000,'Quad.easeOut').start();
            this.game.add.tween(this.cloud3.cameraOffset).to({x:cam.width/1.9,y:cam.height-60},6000,'Quad.easeOut').start();

            

            this.scaleTween = this.game.add.tween(this.g1.scale).to({x:0.75,y:0.75},6000,'Quad.easeOut').start();
            this.textTween = this.game.add.tween(this.truck.scale).to({x:0.75,y:0.75},6000,'Quad.easeOut').start();
            this.game.time.events.add(6000,() => {
                //final scene
                this.ninthStep();
            });
        });
    }

    ninthStep () {
        this.cloud1.kill();
        this.cloud2.kill();
        this.cloud3.kill();
        // truck drives across plains. Guy gives Kenney the finger
        this.g1.frameName = 'grass.png';
        this.g1.tileScale = {x:1,y:1};
        this.g1.anchor.setTo(0.5,0);
        this.g1.cameraOffset.y = this.game.camera.height/2;
        this.g1MovingY = false;
        this.g1MovingX = true;

        //mountains
        this.m1.frameName = "intro-mountains-01.png";
        this.m1.visible = true;
        this.m1.tileScale = {x:1.4,y:1.4};
        this.m1.height = this.game.camera.height/5;
        this.m1.cameraOffset.y = this.game.camera.height/2+30;
        this.m1.tilePosition.x = 0;
        this.m1.anchor.setTo(0,1);


        //trees
        this.trees = this.game.add.tileSprite(0,this.game.camera.height/2+50,this.game.camera.width,46,'bg-textures','trees.png');
        this.trees.tileScale = {x:2,y:2};
        this.trees.anchor.setTo(0,1);
        this.trees.fixedToCamera = true;

        //truck
        this.truck.cameraOffset.x = this.game.camera.width/2;
        this.truck.cameraOffset.y = this.game.camera.height/2;
        this.truck.play('drive-LR');
        this.game.world.bringToTop(this.game.objGroup);

    }

    cutScene () {
        this.cutscene = true;
        this.skipButton.destroy();
        this.skipText.destroy();
        this.trees.destroy();
        this.cloud1.destroy();
        this.cloud2.destroy();
        this.cloud3.destroy();
        this.g1.destroy();

        this.game.sfx = this.game.add.audioSprite('sfx');
        this.game.controls.apad.onDown.remove(this.skipIntroAction, this);
        //this.game.actions = new Cutscene(this.game);

        // load map and assets for Kenney-Notley convo
        this.game.player = new Player (
            this.game,
            645,
            1500,
            "sprites",
            "",
            this.game.data.players.jasonKenney
        );
        this.game.mapWorld = new Map(this,this.game,'kq02-intro','_WORLD-TILES-MASTER');
        this.game.mapWorld.isDungeon = this.game.atlas['kq02-intro'];
        this.playerMovement = { //Player either selects nothing, attacks enemy, talks to NPC, or engages with item
                forward: 'armed-forward',
                backward: 'armed-backward',
                left: 'armed-left',
                right: 'armed-right'
        };
        this.game.player.play('armed-forward').stop();
        this.game.player.alpha = 0;
        this.game.camera.follow(this.game.player);
        //this.game.dialogueGroup = this.add.group();
        this.game.dialogue = new Dialogue(this.game);
        //this.game.npcFunctions = new NpcFunctions(this.game); // NpcFunctions must come first
        //this.game.npcDialogue = new NpcDialogue(this.game);

        //reset truck
        this.truck.fixedToCamera = false;
        this.truck.position.setTo(0,1500);

        //setup mountains in bg
        this.scene1Group.visible = true;
        this.m2.visible = true;
        this.m3.visible = true;
        this.scene1Group.bringToTop(this.m1);
        this.m1.cameraOffset.y = this.game.camera.width/1.8;
        this.m2.cameraOffset.y = this.game.camera.height/3.3;
        this.m3.cameraOffset.y = this.game.camera.height/3.9;

        this.game.world.moveUp(this.scene1Group);

        //create dragon
        this.game.dragon = new Dragon(this.game,this.game.camera.width/2,-this.game.camera.height/2,"sprites","");
        //this.game.camera.height/2-100 is dragon's max y

        // create notley
        const notleyData = {
            character: "Rachel Notley",
            dI: 0,
            id: 16,
            key: 'npc',
            name: "Rachel Notley",
            portrait: "notley",
            static: true,
            type: 'npc'
        }

        // notley position different in build for some reason. set variable to change. Default is -50
        let notleyY = -this.game.camera.height / 2-50;

        this.game.notley = new NPC(this.game,0,-50,"sprites","",notleyData);
        this.game.dragon.addChild(this.game.notley);

        //set notley behind dragon's head and jaw
       const temp = this.game.dragon.children[12];
       this.game.dragon.children[12] = this.game.dragon.children[13];
       this.game.dragon.children[13] = temp;

        // set sfx
        this.game.sfx = this.game.add.audioSprite('sfx');
        this.game.sfx.play('sfx_wind',0.6);
        
        // set scale refresh
        //this.game.scale.refresh();

        // dismiss and replace existing stuff
        this.game.world.sendToBack(this.scene1Group);
        this.game.world.bringToTop(this.game.dragonGroup);       

        //begin play scene
             this.fadeTween = this.game.add.tween(this.fadeScreen).to({alpha:0},1200,'Quad.easeOut').start();
             this.fadeTween.onComplete.add(() => {
                 this.fadeScreen.destroy();
                this.cutSceneStart();
             });
    }

    cutSceneStart() {
        this.truck.visible = true;
        this.truck.animations.play('drive-LR');
        this.truckTween = this.game.add.tween(this.truck.position).to({x:this.game.world.width/2-100},2000,"Quad.easeOut").start();
        this.game.sfx.play('sfx_truck');
        this.truckTween.onComplete.add(() => {
            this.truck.animations.stop();
            this.game.time.events.add(1000,() => {
                this.game.player.alpha = 1;
                this.game.sfx.play('sfx_exit');
                this.game.time.events.add(1200,() => {

                    // player turns to see ahead
                    this.game.player.frameName='hero-mab/_01.png';
                    this.game.actions.jump(this.game.player,110,200,()=> {
                        // here only during build
                        //this.game.notley.position.y = -50;

                        this.game.actions.walk(this.game.player,{x:0,y:-110},1000,200,()=> {
                            this.game.dragon.dramaticEntrance(5000,()=> {
                                this.game.time.events.add(1000,()=> {
                                    this.game.dragon.scream(1200,()=> {
                                        //notley dismounts
                                        this.game.actions.walk(this.game.notley,{x:60,y:0},200,300,()=>{
                                            this.game.actions.walk(this.game.notley,{x:0,y:120},500,0,()=>{
                                                this.game.dialogue = new Dialogue(this.game);
                                                this.game.controls.apad.onDown.add(this.game.dialogue.nextDialogue, this.game.dialogue);
                                                this.game.dialogue.initDialogue(null, this.game.notley, true);
                                            });
                                        });
                                    });
                                });
                            });
                        })
                    });
                });
            });
        });
    }

    // called from Notley dialogue    
    cutScene1 () {

    }

    createGradientBG (c1,c2,setH) {
        let out = [];
        let h = setH?setH:this.game.camera.height;
        let steps = h / 60;
        let y = 0;
        for (let i=0;i<60;i++) {
            const c = Phaser.Color.interpolateColor(c1,c2, 60, i);
            this.bmd.rect(0,y,this.game.camera.width,y+steps,Phaser.Color.getWebRGB(c));
            out.push(Phaser.Color.getWebRGB(c));
            y += steps;
        }
    }
}