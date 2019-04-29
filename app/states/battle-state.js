
import STATE_EVENTS from '../constants/state-events';
import EventEmitter from 'super-event-emitter';
//import { Orientation } from '../constants/orientation';
import { Dialogue } from '../models/dialogue';
// import { NpcFunctions } from '../models/npcFunctions';
// import { NpcDialogue } from '../models/npcDialogue';
//import { FullscreenButton } from '../models/fullscreen-button';
//import { runInThisContext } from 'vm';
import { Obj } from '../models/object';
import { Map } from '../models/map';
import { Player } from '../models/player';
import { Dragon } from '../models/dragon';
import { NPC } from '../models/npc';
// import { Cutscene} from '../models/cutscene';
import { NextButton } from '../models/next-button';

export class BattleState extends Phaser.State {
    fadeScreen = null;
    ndpGroup = null;
    ucpGroup = null;
    fadeScreen = null;
    bg = null;

    create() {

        this.game.battleScene = 1;

        //create world and bg
        this.createWorld()
        
        //create ndp army
        this.createNDPArmy();

        //create ucp army
        this.createUCPArmy();

        //send fadeScreen to top
        this.game.world.sendToBack(this.game.sceneItemsGroup);
        this.game.world.bringToTop(this.game.objGroup);
        this.game.world.bringToTop(this.ndpGroup);
        this.game.world.bringToTop(this.ucpGroup);
        this.game.world.bringToTop(this.game.dialogueGroup);

        //initiate sequence

        

        this.startSequence();
    }

    update = () => {
        if (this.game.battleScene === 1) {
            this.bg.tilePosition.y -= 2;
            this.dragon.visible = true;
            this.ndpGroup.visible = true;
            this.ucpGroup.visible = false;
        } else if (this.game.battleScene === 2) {
            this.bg.tilePosition.y += 2;
            this.dragon.visible = false;
            this.ndpGroup.visible = false;
            this.ucpGroup.visible = true;
        } else if (this.game.battleScene === 3) {
            this.bg.tilePosition.y = 0;
            this.dragon.visible = true;
            this.ndpGroup.visible = true;
        }
    }

    createWorld = () => {

        this.game.world.width = 940;
        this.game.world.height = 2500;

        this.bg = this.game.add.tileSprite(
            0,
            0,
            this.game.world.width,
            this.game.world.height,
            'bg-textures',
            'grass.png'
        );

        this.game.player = new Player(this.game,0,0,"sprites","",this.game.data.players['jasonKenney']);
        this.game.player.alpha = 0;


        this.game.sceneItemsGroup = this.game.add.group();
        this.game.sceneItemsGroup.add(this.bg);
        this.game.sceneItemsGroup.add(this.game.player);

        this.ndpGroup = this.game.add.group();
        this.ucpGroup = this.game.add.group();

        this.game.dialogue = new Dialogue(this.game);

        this.game.sfx = this.game.add.audioSprite('sfx');
    }

    createNDPArmy = () => {
       
       //create trucks and cars //objects: setTruck & setSmartCar & setSiegeTower
       var vehicleList1 = ['truck','truck','truck','siege-tower','smartcar','truck','smartcar','smartcar','truck','truck'];
       var vehicleList2 = ['smartcar','truck','smartcar','truck','truck','smartcar','siege-tower','truck','truck','smartcar'];

       // lay down first row of vehicles
        vehicleList1.forEach((v,i) => {
            this.setVehicle(v,i,'drive-down',100);
        });

        vehicleList2.forEach((v,i) => {
            this.setVehicle(v,i,'drive-down',320);
        });

        this.dragon = new Dragon(this.game,this.game.camera.width/2,-this.game.camera.height/2,"sprites","");
        const notleyData = {
            character: "Rachel Notley",
            dI: 15,
            id: 16,
            key: 'npc',
            name: "Rachel Notley",
            portrait: "notley",
            static: true,
            type: 'npc'
        }
        //var notleyY = (-this.game.camera.height / 2)-50;
        var notley = new NPC(this.game,0,-50,"sprites","",notleyData);
        notley.body.collideWorldBounds = false;
        this.dragon.addChild(notley);
        //set notley behind dragon's head and jaw
       const temp = this.dragon.children[12];
       this.dragon.children[12] = this.dragon.children[13];
       this.dragon.children[13] = temp;

       this.ndpGroup.add(this.dragon);
    } // end createNDPArmy

    createUCPArmy = () => {
        // create kenney's blue truck at front
        var kenneyTruck = new Obj(this.game,this.game.camera.width/2,180,"sprites","",{
            "objectType":"truck",
            "colour":"blue",
            "type":"object",
            "direction": "0,1"
        });

        kenneyTruck.animations.play('drive-up');

        this.ucpGroup.add(kenneyTruck);

        // create other cars
        var vehicleList1 = ['truck','truck','siege-tower','truck','truck','truck','siege-tower','truck','truck','truck'];
        var vehicleList2 = ['truck','truck','truck','truck','siege-tower','truck','truck','truck','truck','truck'];

        vehicleList1.forEach((v,i) => {
            this.setVehicle(v,i,'drive-up',400);
        });

        vehicleList2.forEach((v,i) => {
            this.setVehicle(v,i,'drive-up',560);
        });

    }




    startSequence = () => {
        // ndp starts. Dragon comes in
        this.game.time.events.add(1200,()=>{

            let dragonTween = this.game.add.tween(this.dragon.cameraOffset).to({y: this.game.camera.height / 2 - 100}, 1800, Phaser.Easing.Quadratic.Out,true);
            // var dragonTween = this.game.add.tween(this.dragon.position).to({y:0},800,Phaser.Easing.Quadratic.Out,true);
            dragonTween.onComplete.add(()=>{

                this.dragon.scream(600,()=>{
                    var notley = this.dragon.children[12];
                    this.game.dialogue.initDialogue(null,notley,false,true,true);
                });

            });

        });
    }


    // utilities

    setVehicle = (_v,_i,_dir,_y) => { //_v: vehicle object string,_i: index,_dir: 'drive-down' or 'drive-up' depending on ndp or ucp vehicle. _y for position
        var objData = {
            'objectType':_v,
            'type':'object',
            'ndp': _dir === "drive-down" ? true : false
        }

        if (_v === "truck") {
            objData.flag = true;
            objData.colour = this.selectRandomColour(_v);
            objData.direction = `0,${_dir==='drive-down'?-1:1}`;
        } else if (_v === "smartcar") {
            objData.colour = this.selectRandomColour(_v)
        }

        var object = new Obj(this.game,parseInt(_i*90+(this.game.rnd.integerInRange(-12,12)+60)),parseInt(_y+(this.game.rnd.integerInRange(-12,12))),"sprites","",objData);
        if (_v === 'truck') {
            object.animations.play(_dir);
        } else  {
            object.animations.play('drive');
        }

        if (_dir === "drive-down") {
            this.ndpGroup.add(object);
        } else {
            this.ucpGroup.add(object);
        }

        //if (_v === "truck") {
            //object.children[0].animations.play('drive');
        //}

        
    }

    selectRandomColour = (_v) => {
        var colours = [];
        if (_v === "truck") {
            colours = ['blue','red','black','green','yellow','grey'];
        } else {
            colours = ['green','orange'];
        }
        return colours[this.game.rnd.integerInRange(0,colours.length-1)];
    }


}