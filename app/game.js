import SuperEventEmitter from 'super-event-emitter';
import Quests from './models/quests';
import { NpcFunctions } from './models/npcFunctions';
import { NpcDialogue } from './models/npcDialogue';
import { Cutscene } from './models/cutscene';
import { MusicHandler } from './models/musicHandler';
import Atlas from './constants/atlas';
import Quiz from "./constants/quiz";
import firebase from 'firebase/app';
import 'firebase/database';

export class Game extends Phaser.Game {
    player = null;
    isDungeon = true;
    controls = {
    	dpad: null,
    	apad: null,
    	stick: null,
    	pad: null
    };
    startingPosition = [480,348] //480,348
    //284,1800 battle-01 level
    quests = require('./models/quests');
    quests = this.quests.default;
    data = {
        gameData: {
            companion: {},
            globalAchievements: {
                score: 0,
                crystalsLive: false,
                quizComplete: false,
                starkeConvo: false,
                fildebrandtGetsYouCoffee: false,
                edmonton_ndp_cutscene: false,
                avocadoToast: {
                    sriracha: false,
                    egg: false,
                    bacon: false,
                    previous: ""
                },
                marchToWar: false,
                finalStage: false,
                hoodedFigure: ""
            },
            currentCharacter: "jasonKenney",
            currentStage: "kq02-calgary-00",
            startingPosition: [480,348],
            stageInitFunction:"",
            stageDismissFunction: "",
            atlas: {}
        },
        players: {
            jasonKenney: {
                name: 'Jason Kenney',
                dI: 0,
                inventory: [],
                portrait: 'kenney',
                quests: [],
                crystals: [],
                health: 8,
                maxHealth: 8,
                startingCoords: {
                    x: 450,
                    y: 380
                },
                completedQuests: [],
                quizScore: 0,
                quizQuestionsAnswered: 0,
                hasCompanion: false,
                inDisguise: false
            },
            rachelNotley: {
                name: 'Rachel Notley',
                dI: 0,
                inventory: [],
                portrait: 'notley-active',
                quests: [],
                crystals: ['Crystal of Social License'],
                health: 8,
                maxHealth: 8,
                startingCoords: {
                    x: 0,
                    y: 0
                },
                completedQuests: []

            },
            derekFildebrandt: {
                name: 'Derek Fildebrandt',
                dI: 0,
                inventory: [],
                portrait: 'fildebrandt',
                quests: [],
                crystals: ['Crystal of Rugged Individualism'],
                health: 8,
                maxHealth: 8,
                startingCoords: {
                    x: 0,
                    y: 0
                },
                completedQuests: []
            }
        },
        textStyle : {
            font : 'VT323',
            fontSize : 32,
            lineSpacing : -7,
            // wordWrap : true,
            fill : '#fff',
            wordWrap: true,
            wordWrapWidth : this.width-80,
            fixedToCamera : true
        },
        companion:{
            // name: "Leela Aheer",
            // id:50,
            // dI:7,
            // character:"Leela Aheer",
            // portrait:"aheer",
            // type:"npc",
            // key: "npc",
            // static: true
        }
    }
    globalAchievements = {
        score: 0,
        crystalsLive : false,
        quizComplete : false,
        starkeConvo : false,
        fildebrandtGetsYouCoffee: false,
        edmonton_ndp_cutscene: false,
        avocadoToast : {
            sriracha: false,
            egg: false,
            bacon: false,
            previous: ""
        },
        marchToWar: false,
        finalStage: false,
        hoodedFigure: "",
        airship: false
    }
    trackingData = {
        "completed": false,
        "continues": 0,
        "gameOver":0,
        "enemiesDefeated": 0,
        "questsCompleted": {"test":0},
        "quiz": {"test":0},
        "scoreTrace": {"test":0},
        "finalScore": 0,
        "startDate": null,
        "totalDuration": 0,
        "edmontonPath": "",
        "hoodedFigure":"",
        "crystals":{"test":0},
        "ending":""
    }
    tilemaps = [
        "kq02-intro",
        "kq02-calgary-00",
        "kq02-calgary-01",
        "kq02-calgary-02",
        "kq02-calgary-03",
        "kq02-pantheon-00",
        "kq02-palace-00",
        "kq02-mountains-00",
        "kq02-mountains-01",
        "kq02-forest-00",
        "kq02-badlands-00",
        "kq02-badlands-01",
        "kq02-caves-01",
        "kq02-edmonton-00",
        "kq02-edmonton-01",
        "kq02-edmonton-02",
        "kq02-edmonton-03",
        "kq02-battle-00",
        "kq02-battle-01",
        "kq02-airship-00",
        "kq02-truckstop-00"
    ]
    quiz = Quiz;

    //_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);    


    // -------------------------- UNIVERSAL FUNCTIONS
    // sendMessage = (msg) => {
    //     parent.postMessage(msg,"http://bricey-pwa-test.herokuapp.com/");// http://bricey-pwa-test.herokuapp.com/  //http://localhost:3000 
    // }
    // receiveMessage(e) {
    //     if (e.origin === "http://bricey-pwa-test.herokuapp.com/") {
    //         //
            
    //     }
    // }

    // Global flashing function 
    flashInterval = null;
     flash = (el,_fade,_callback) => { 
        const flashes = 6;
        let flashTimes = 0;
        const rate = 100;
        var flashInterval = setInterval(()=>{
            el.alpha === 1?el.alpha = 0:el.alpha = 1;
            flashTimes++;
            if (flashTimes === flashes) {
                clearInterval(flashInterval);
                el.visible = true;
                if (_fade) {
                    var fadeOut = this.add.tween(el.alpha).to(0,1600,null,true);
                    fadeOut.onComplete.addOnce(_callback);
                }
            }
        },rate);
    }
    // global music handler
    musicHandler = new MusicHandler(this);

    // create global npc dialogue and npcFunctions                  ---------- IMPORTANT! -------------
    npcFunctions = new NpcFunctions(this);
    npcDialogue = new NpcDialogue(this);

    // global variables containing cutscene functions
    actions = new Cutscene(this);

    //global atlas of stages
    atlas = Atlas;

    // global functions for stage init and dismiss
    stageInitFunction = []; //calgary_02_clearWay() => for notley scene testing
    stageDismissFunction = [];

    // currentStage = 'kq02-truckstop-00';

    currentCharacter = 'jasonKenney';
    
    //currentStage = 'kq02-test-02';
    
    // --------------------------UNIVERSAL VARIABLES 
    currentStage = "";

    score = (_key,_num) => {
        this.globalAchievements.score += _num;
        this.tData("scoreTrace",[_key,_num]);
        this.tData("finalScore",this.globalAchievements.score);
        
    }


    // Database stuff

    app = firebase.initializeApp({
        apiKey: "AIzaSyDC3pDGATKGgk1-SpwTvvu7aCCIONzqPX8",
        authDomain: "kq02-game-tracking.firebaseapp.com",
        databaseURL: "https://kq02-game-tracking.firebaseio.com",
        projectId: "kq02-game-tracking",
        storageBucket: "kq02-game-tracking.appspot.com",
        messagingSenderId: "45593037502"
    });

    db = firebase.database();
    ref = this.db.ref('games/');

    tData = (_key,_value) => {
        const d = this.trackingData;
        switch (_key) {
            case "completed":
                d[_key] = _value;
                break;
            case "continues":
                d[_key] += 1;
                break;
            case "enemiesDefeated":
                d[_key] += 1;
                break;
            case "questsCompleted":
                d[_key][_value] = true;
                break;
            case "quiz": // pass as array
                d[_key][_value[0]] = _value[1];
                break;
            case "scoreTrace": // pass as array
                d[_key][_value[0]] = _value[1];
                break;
            case "finalScore":
                d[_key] = _value;
                break;
            case "startDate":
                d[_key] = _value;
                break;
            case "totalDuration":
                d[_key] = _value;
                break;
            case "edmontonPath":
                d[_key] = _value;
                break;
            case "gameOver":
                d[_key] += 1;
                break;
            case "hoodedFigure":
                d[_key] = _value;
                break;
            case "crystals":
                d[_key][_value] = true;
                break;
            case "ending":
                d[_key] = _value;
                break;
        }
        
    }

    writeGameData = () => {
        this.db.ref('games/'+this.data.gameData.gameId).set(this.trackingData);
    }

    readGameData = (_callback) => {
        
        this.db.ref(`games/${this.data.gameData.gameId}`).once('value').then((data)=>{
            
            this.trackingData = data.val();
            _callback();
            
        },(err) => {
            console.error("error: ",err.code)
        });
    }

    writeNewGameData = () => {
        var newGameRef = this.ref.push();
        this.trackingData.startDate = Date.now();
        newGameRef.set(this.trackingData);
        this.data.gameData.gameId = newGameRef.key;
        
    }

    
    constructor(...args) {
        super(...args);
        SuperEventEmitter.mixin(this);
    }

}
