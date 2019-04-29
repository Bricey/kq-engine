import { removeFromCache } from './removeFromCache';
import { BCNdp } from './bc-ndp';
import { ButtonMash } from './buttonMash';
import { MapChangeSprite } from "./map-change";
import { NPC } from "./npc";
import { Dragon } from "./dragon";
import { BossFight} from "./bossfight";
import { RatKing } from "./ratKing";
import { InvisibleHand } from "./hand";
import { PickupItem } from './pickup-item';
import { Trigger } from "./trigger";
import { Obj } from './object';

export class NpcFunctions {

	//this.game.sendMessage("kq-test-affirmative"); <= Postmessage call

	constructor(game) {
		this.game = game;
	}

	intro_notleyMountsDragon = () => {
		this.game.sfx.play('sfx_jump_up',0.6);
		this.game.actions.walk(this.game.notley,{x:0,y:-120},300,null,()=> {
			this.game.actions.walk(this.game.notley,{x:-60,y:0},200,null,()=> {
				this.game.dialogue.initDialogue(null,this.game.notley,true); // calls to notley dI: 2
			},true);
		});
	}
	intro_notleyRevealsCrystal = () => {
		this.game.time.events.add(600,()=> {
			this.game.notley.animations.play('show-crystal').stop();
			
			//this.game.notley.frameName = "npc-16-crystal/_01.png";
			this.game.sfx.play('sfx_sword_shine');
			this.game.time.events.add(1200,()=> { this.game.dialogue.initDialogue(null,this.game.notley,true) }); // call to notley dI: 3
		});
	}
	intro_notleyFliesAway = () => {
		this.game.dragon.scream(1200,() => {
			this.game.dragon.quickExit(()=> {
				this.distantDragon = this.game.add.sprite(this.game.player.x,580,"bg-textures","dragon-flying-away.png");
				this.distantDragon.anchor.setTo(0.5);
				this.game.actions.walkTo(this.game.player,{x:645,y:820},2200,300,()=>{
					this.game.dialogue.initDialogue(null,this.game.player,false);
					this.game.add.tween(this.distantDragon).to({alpha:0},4000,null,true,1000);
					this.game.add.tween(this.distantDragon.scale).to({x:0.65,y:0.65},4300,null,true,700);
				});
			});
		});
	}
	intro_kenneyHoldsUpSword = () => {
		this.game.player.frameName = 'hero-sword-high/_01.png';
		this.game.sfx.play('sfx_sword_shine');
		this.game.time.events.add(1200,()=> {
			this.game.dialogue.initDialogue(null,this.game.player,false);
		});
	}
	intro_endScene = () => {
		this.game.dragon = null;
		this.game.notley = null;
		this.game.camera.fade('#000000',800);
		this.game.camera.onFadeComplete.addOnce(()=>{
			this.game.camera.onFadeComplete.removeAll();
			this.game.sfx.stop();
			this.game.state.start('StartMenu');
		});
	}

	newGameInitFunction_calgary_00 = () => {

		//TEST!!
		//this.invisibleHand_setup();
		//this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Rachel Notley"),false);
		//this.edmonton_initDisguises();
		//this.game.stageDismissFunction[0] = 
		//this.edmonton_arrival_setup_dismissFunction;

		//this.kenneyReturn_beginQuest_changeStageCall();
		//this.game.stageInitFunction[0] = this.setup_edmonton_journey();
		
		//this.kenneyReturn_beginQuest_changeStageCall();
		//this.pantheon_return();
		
		//this.edmonton_createWellEntrance();
		
		// begin edmonton quests = start from calgary-00
		
		//this.set_calgary_assets();
		//this.calgary_02_clearWay();
		//this.return_kenney_to_base_before_edmonton();
		
		//this.edmonton_setup_from_airship();
		//this.finalBattle_talkToSoldier();
		//this.edmonton_crystal_returnCalgary();  
		// this.ndp_palace02_changeStageCall();
		// this.game.player.position.set(480,360);
		// this.end_ndp_victory();


		//- ENDING SETUP
		// this.finalBoss_set_trigger_setup();
		// this.game.musicHandler.stop();

		// this.game.camera.fade(0x000000);
		// this.game.camera.onFadeComplete.add(() => {
		// 	this.game.camera.onFadeComplete.removeAll();
		// 	this.game.stageInitFunction = "invisibleHand_setup";
		// 	this.game.state.start('Game');
		// });
		// return;


		//this.game.stageInitFunction[0] = this.ndp_palace_changeStageCall;
		//this.ndp_palace01_changeStageCall();
		//this.ndp_palace_01();
		//this.ndp_palace_0edmonton_crystal_returnCalgary1();
		//this.acquire_valveWheel();
		//return;
		this.game.player.isTalking = true;
		this.game.player.animations.stop();
		//character walk in
		const nick = this.game.actions.getCharacter('Chief of Staff');
		// const matt = this.game.actions.getCharacter('Matt Wolf');

		this.game.actions.walkTo(nick,{x:542,y:390},1500,200,() => { nick.frameName = `npc-09-mr/_01.png` });
		// this.game.actions.walkTo(matt,{x:385,y:390},1800,300,() => { matt.frameName = `npc-08-ml/_01.png` });

		this.game.actions.setNewCachePosition(this.game.currentStage,nick,542,390); // new cached positions for nick
		// this.game.actions.setNewCachePosition(this.game.currentStage,matt,385,390);// new cached positions for matt

		this.game.time.events.add(2500,() => {
			this.game.player.data.dI = 2;
			this.game.dialogue.heroSpeaks();
		});
	}

	forest_arrival = () => {
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.time.events.add(700,()=>{
			this.game.player.data.dI = 18;
			this.game.dialogue.initDialogue(null,this.game.player,false);
		});
	}

	pantheon_arrival = () => {
		this.game.player.isTalking = true;
		this.game.player.removeQuest('kq-q-kananaskis')
		this.game.player.body.velocity.set(0);
		this.game.actions.walkTo(this.game.player,{x:450,y:260},1600,0,() => {
			this.game.sfx.play('sfx_shake');
			this.game.camera.shake(0.006,1000);
			this.game.camera.onShakeComplete.addOnce(() => {
				let voice = {
					data: {
						name: "Voice",
						dI: 0
					}
				}
				this.game.dialogue.initDialogue(null,voice,false);
			});
		});
	}
	pantheon_thatcher = () => {
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.pantheonTriggered = false;
		if (!this.game.pantheonTriggered) {
			this.game.pantheonTriggered = true;
			this.game.actions.walkTo(this.game.player,{x:608,y:540},700,null,() => {
				let thatcher = this.game.actions.enterDeity({character:'Margaret Thatcher',id:15,portrait:'thatcher'},544,415,"blue",true);
				let klein = this.game.actions.enterDeity({character:'Ralph Klein',id:14,portrait:'klein'},673,415,"blue");
				this.game.player.frameName = "hero-mb/_01.png";
			});
		}
	}
	pantheon_endScene = () => {
		// end scene. Return to calgary_00
		this.game.mapWorld.changeStage(null,{ targetMap:'kq02-calgary-00', targetPosition: '480,348' },"pantheon_return");
	}
	pantheon_return = () => {

		// set new elements in calgary-01 cache
		this.set_calgary_assets();

		// set switch to ndp palace sequence 01 on mapChange object
		this.game.stageDismissFunction[0] = this.ndp_palace01_changeStageCall;

		this.game.player.isTalking = true;
		this.game.player.alpha = 0;
		
		const nick = this.game.actions.getCharacter('Chief of Staff');
		// const matt = this.game.actions.getCharacter('Matt Wolf');
	
		nick.frameName = `npc-09-mr/_01.png`;
		// matt.frameName = `npc-08-ml/_01.png`;

		//scene will initiate here before Kenney appears
		this.game.time.events.add(800,() => {
			const harper = this.game.actions.getCharacter('Stephen Harper');
			harper.data.dI = 4;
			this.game.dialogue.initDialogue(null,harper,false,null,true);
		});

		// !!!! here or once dialogue completed, add quest nodes to characters in calgary and mapChange tiles
	}

	pantheon_return_enter_kenney = () => {
			let flame = this.game.actions.addFlame(this.game.player.x,this.game.player.y,'blue');
			const flameTween = this.game.add.tween(flame.position).to({y:flame.position.y+40},1200,"Quad.easeOut",true);
			flameTween.onComplete.add(() => {
				flame.destroy();
				this.game.player.alpha = 1;
				//sfx
				this.game.time.events.add(300,() => {
					this.game.NPCGroup.forEach(npc => {
						this.game.actions.jump(npc,180,this.game.rnd.integerInRange(20,220));
					});
				});
				this.game.time.events.add(1300,() => {
					const nick = this.game.actions.getCharacter('Chief of Staff');
					nick.data.dI = 4;
					this.game.dialogue.initDialogue(null,nick,true); // nick at dI 2 ... presently  !!!! ---- WILL CHANGE!!!!
				});
			});

	}

	// pantheon_return_matt_runs = () => {
	// 	let matt = this.game.actions.getCharacter('Matt Wolf');
	// 	// matt runs away
	// 	this.game.actions.walkTo(matt,{x:260},300,100,() => {
	// 		matt.visible = false;
	// 		this.game.camera.shake(300);
	// 		//sfx
	// 		//smoke?
	// 		this.game.time.events.add(800,() => {
	// 			this.game.player.data.dI = 7;
	// 			this.game.dialogue.initDialogue(null,this.game.player,true);
	// 		});
	// 	});

	// 	//kenney speaks
	// }

	set_calgary_assets = () => {			// lays down calgary quest and mapChange tiles to really begin game

		//remove Charlotte
		this.game.actions.removeCacheObject("kq02-calgary-01",['type','object'],['colour','black'],['objectType','truck'],['direction','0,1']);
		this.game.actions.removeCacheObject("kq02-calgary-01",['type','npc'],['character','Charlotte']);

		this.game.globalAchievements.crystalsLive = true;

		// remove mapChange tile to pantheon from kq02-calgary-02
		this.game.actions.removeCacheObject("kq02-calgary-02",["key","mapChange"],["questNodeId","kq-q-kananaskis-1"]);


		//change index for parks ranger
		this.game.actions.setCharacterDICache("Alberta Parks Officer",0,"kq02-calgary-02");

		// set down mapChange tiles	

		// => hold off on mapChange tile below until something achieved
				// Spoken with Brad Wall?

		// this.game.actions.setNewCacheObject("kq02-calgary-01",this.game.actions.createMapObjectForCache(1348,480,1292,32,32,{
		// 	"coords": "128,50",
		// 	"key": "mapChange",
		// 	"stage": "kq02-badlands-00",
		// 	"type": "mapChange"
		// }));

		this.game.actions.setNewCacheObject("kq02-calgary-01",this.game.actions.createMapObjectForCache(1348,2030,375,32,32,{
			"coords": "130,1350",
			"key": "mapChange",
			"stage": "kq02-calgary-03",
			"type": "mapChange"
		}));

		this.game.actions.changeMapTiles('kq02-calgary-02','foreground',{
			'593': 0,
			'594': 0,
			'623': 0,
			'624': 0
		});
	}

	ford_intro = () => {
		this.game.player.isTalking = true;
		var fordData = {
			character: "Doug Ford",
			dI: 0,
			id: 32,
			name: "Doug Ford",
			static: true,
			type: "npc",
			key: "npc",
			"portrait":"ford"
		};
		// add Ford placement to cache
		this.game.actions.setNewCacheObject("kq02-forest-00", {
			x: 300,
			y: 200,
			properties: fordData
		});
		const ford = new NPC(this.game,this.game.world.width/2,-32,"sprites","",fordData);
		this.game.NPCGroup.add(ford);
		this.game.actions.walk(ford,{x:-60,y:200},1200,200,() => {
			this.game.dialogue.initDialogue(null,ford,true); // Ford talks to you. First time
		});
	}

	sygils_intro = () => {
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.actions.walkTo(this.game.player,{x:482,y:812},1200,300,()=>{
			this.game.actions.removeCacheObject("kq02-mountains-00",["type","npc"],["character","Hooded Figure"]);

			const hoodedFigureData = {
				x: 354,
				y: 720,
				properties: {
					character: 'Hooded Figure',
					id: 34,
					dI: 1,
					type: "npc",
					key: "npc",
					name:"Hooded Figure",
					static: true
				}
			}

			this.game.actions.setNewCacheObject("kq02-forest-00",hoodedFigureData);

			let hoodedFigure = this.game.actions.enterDeity(hoodedFigureData.properties, 354, 720, "blue",true); // begins talking once appears
		},true);
	}

	greatTree_travelToCalgary = () => {
		this.game.player.isTalking = true;
		this.game.startingPosition = [962,478];
			this.game.currentStage = 'kq02-calgary-01';
			this.game.musicHandler.stop();
			this.game.camera.fade('#000000');
			this.game.camera.onFadeComplete.addOnce(() => { // stage fadeOut onComplete
				this.game.state.start("Game");
			});
	}

	greatTree_returnToForest = () => {
		this.game.player.isTalking = true;
		this.game.startingPosition = [470,860];
			this.game.currentStage = 'kq02-forest-00';
			this.game.musicHandler.stop();
			this.game.camera.fade('#000000');
			this.game.camera.onFadeComplete.addOnce(() => { // stage fadeOut onComplete
				this.game.state.start("Game");
			});
	}

	greatTree_notice = () => {

	}

	greatTree_arrival = () => {
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.actions.walkTo(this.game.player,{x:482,y:1862},1600,200,() => {
			const dofo = this.game.actions.getCharacter('Doug Ford');
			dofo.position.setTo(230,1500);
			this.game.actions.walkTo(dofo,{x:400,y:1860},1600,100,()=>{
				dofo.data.dI = 5;
				this.game.dialogue.initDialogue(null,dofo,true);
			});


			// var dofoTween = this.game.add.tween(dofo.position).to({x:400,y:1860},1200,null,true);
			// dofoTween.onComplete.add(() => {
			// 	dofo.data.dI = 5; // will change later once his dialogue tree is complete 						<= !!!!!
			// 	this.game.dialogue.initDialogue(null,dofo,true);
			// })
		});
	}

	greatTree_removeTree = (_newDI) => {
		let treeTiles = {};
		const totalTiles = 2030-1542;
		for (let i=0;i<totalTiles;i++) {
			const tileNum = i + 1542;
			treeTiles[tileNum.toString()] = 0;
		}
		this.game.actions.changeMapTiles("kq02-forest-00","foreground",treeTiles);
		this.game.actions.changeMapTiles("kq02-forest-00", "detail", treeTiles);
		this.game.actions.changeMapTiles("kq02-forest-00", "subdetail", treeTiles);
		const newPos = `${this.game.player.x}, ${this.game.player.y}`;
		// play tree falling sfx
		this.game.sfx.play("sfx_treeFall");
		//set stageFUnctionInit to new dialogue sequence
		this.game.data.gameData.postTreeDI = _newDI;
		this.game.mapWorld.changeStage(null,{targetMap:"kq02-forest-00",targetPosition: newPos},"set_postTree_convo");
	}

	set_postTree_convo = () => {
		
		
		this.game.player.isTalking = true;
		// this.game.time.events.add(600,() => {
			var dofo = this.game.actions.getCharacter("Doug Ford");
			dofo.position.setTo(400,1860);
			dofo.data.dI = this.game.data.gameData.postTreeDI;
			this.game.data.gameData.postTreeDI = null;
			this.game.mapWorld.updateWaypoint('kq-q-carbontree-5');
			this.game.player.crystalAcquired('Crystal of Regulatory Freedom',() => {
				this.game.player.isTalking = true;
				this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Doug Ford"),true);
			});
		//});
	}

	greatTree_dougRunsOff = () => {
		var dofo = this.game.actions.getCharacter('Doug Ford');
		this.game.actions.walkTo(dofo,{x:230,y:1500},1300,100,() => {
			this.game.player.data.dI = 8;
			this.game.dialogue.initDialogue(null,this.game.player,false);
		})
	}

	pipeline_end = (_var) => { //_var to provide scoring for quest result
		this.game.player.isTalking = true;
		this.game.sfx.stop();
		this.game.player.removeQuest("kq-q-pipeline");
		this.game.player.crystalAcquired('Crystal of Infrastructure Projects', () => {
			// remove both mapChange tiles from kq02-mountains-00
			this.game.actions.removeCacheObject("kq02-mountains-00",["key","mapChange"],["stage","kq02-mountains-01"],["coords","1160,1160"]);
			this.game.actions.removeCacheObject("kq02-mountains-00",
				["key", "mapChange"],
				["stage", "kq02-mountains-01"],
				["coords", "1160,1160"]
			);
			// change atlas
			this.game.atlas["kq02-mountains-00"].nodes = ["kq02-calgary-01","kq02-forest-00"]
			this.game.startingPosition = [480,226];
			this.game.currentStage = 'kq02-mountains-00';

			// if two quests completed, call deities to send to edmonton
			if (this.game.data.players.jasonKenney.crystals.length >= 2) {
				this.game.stageInitFunction = "call_deities_two_crystals";
			}
			this.game.camera.fade('#000000');
			this.game.camera.onFadeComplete.addOnce(() => { // stage fadeOut onComplete
				this.game.state.start("Game");
			});
		});

	}

	calgary_02_clearWay = () => {

		// clear nodeQuestId from Nenshi
		this.game.actions.removeFromCachedObject('Naheed Nenshi','questNodeId','kq02-calgary-01');

		// update Park Ranger
		this.game.actions.setCharacterDICache('Alberta Parks Officer',1,"kq02-calgary-02");

		// change around calgary-02 map
		this.game.actions.changeMapTiles('kq02-calgary-02', 'collision', {
			'593': 992,
			'594': 993,
			'623': 996,
			'624': 997,
			'816': 0,
			'817': 0,
			'818': 0,
			'819': 0,
			'846': 0,
			'847': 0,
			'848': 0,
			'849': 0,
			'877': 0,
			'878': 0,
		});
	}

	mountains_reconfig_atlas = () => {
		this.game.atlas["kq02-calgary-01"].nodes = ['kq02-calgary-00','kq02-mountains-00','kq02-badlands-00','kq02-calgary-03'];
		this.game.atlas["kq02-mountains-00"].nodes = ['kq02-calgary-01', 'kq02-mountains-01', 'kq02-forest-00'];
		// update Calgary_01 tile to mountains
		
		this.game.actions.setMapChangeProps("kq02-calgary-02", {
			coords: "1824,850",
			key: "mapChange",
			stage: "kq02-mountains-00",
			type: "mapChange"
		}, "kq02-calgary-01")
	}

	ndp_palace01_moveTrolls = () => {
		var trollsLeft = []; var trollsRight = [];
		this.game.enemyGroup.children.forEach((troll,i) => {
			
			// skip hand
			if (i >= 12) return;

			if (troll.x < 440) {
				trollsLeft.push(troll);
			} else {
				trollsRight.push(troll);
			}
		});
		trollsLeft.forEach((troll,i) => {
			this.game.add.tween(troll).delay(200*i).to({x:-60},1400+(i*60),null,true);
			// troll.animations.play('walk-left');
			
		});

		trollsRight.forEach((troll,i) => {
			this.game.add.tween(troll).delay(200*i).to({x:this.game.world.width+60},1400+(i*60),null,true);
			// troll.animations.play('walk-right');
		});
	}

	ndp_palace01_changeStageCall = () => {
		// new player will be rachel notley

		const stageData = {
			"targetMap":"kq02-palace-00",
			"targetPosition":"0,560"
		}

		this.game.currentCharacter = "rachelNotley";
		// this.game.startingPosition = [0,560];
		// this.game.currentStage = 'kq02-palace-00';
		// this.game.state.start('Game');

		this.game.startingPosition = [0,560];
		this.game.currentStage = "kq02-palace-00";
		//this.game.stageInitFunction[0] = this.ndp_palace_01;
		this.game.stageInitFunction = "ndp_palace_01";

		this.game.musicHandler.stop();

		this.game.state.start("Game");


		//ORIGINAL change stage call. Changed from earlier
		//this.game.mapWorld.changeStage(null,stageData,this.ndp_palace_01);

		//this.game.stageInitFunction[0] = this.ndp_palace_01;
	}

	ndp_palace02_changeStageCall = () => {

		// set return position for kenney based on map he's arriving into Edmonton from (edmonton-02 or edmonton-04)
		var returnCoords = this.game.currentStage === "kq02-edmonton-02"?[1190,1770]:[260,1670];
		this.game.data.players.jasonKenney.startingCoords.x = returnCoords[0];
		this.game.data.players.jasonKenney.startingCoords.y = returnCoords[1];

		this.game.currentCharacter = "rachelNotley";
		this.ndp_palace_02_setup();
		this.game.startingPosition = [0,560];
		this.game.currentStage = 'kq02-palace-00';
		//this.game.stageInitFunction[0] = this.ndp_palace_02_initFunction;
		this.game.stageInitFunction = "ndp_palace_02_initFunction";
		this.game.musicHandler.stop();
		this.game.state.start('Game');
		//this.game.mapWorld.changeStage(null, stageData,this.ndp_palace_02_initFunction); //this.ndp_palace_02_initFunction
	}

	ndp_palace_02_initFunction = () => {
		this.game.player.isTalking = true;
		this.game.actions.walkTo(this.game.player,{x:220},1800,200,()=>{
			this.game.actions.walkTo(this.game.player,{y:410},800,0,()=>{
				this.game.actions.walkTo(this.game.player,{x:this.game.camera.width/2+12},1800,0,null,true);
				this.game.camera.follow(this.game.player);
				this.game.player.data.dI = 9;
				this.game.dialogue.initDialogue(null,this.game.player,false); // notley begins speech
			});
		});


		if (this.game.triggerGroup.children[0] !== undefined) this.game.triggerGroup.children[0].y = 750;
		if (this.game.triggerGroup.children[0] !== undefined) this.game.triggerGroup.children[1].y = 750;


		this.invisibleHand_setup(482, 1040,5); // will have to set final entry for palace_2 when dialogue written

		var hogan = this.game.actions.getCharacter("Corey Hogan");
		hogan.visible = false;
		var carter = this.game.actions.getCharacter("Stephen Carter");
		carter.visible = false;

		this.game.enemyGroup.children[0].visible = false;

		this.game.stageDismissFunction[0] = this.ndp_palace_02_return;

		//this.set_calgary_03_to_trigger_palace_00();
		
	}

	ndp_palace_02_walkPastHand = () => {
		this.game.player.isTalking = true;
		this.game.player.body.velocity.setTo(0);
		// in case player is continuing, in which case we set stageDismissFunction again just to be sure 
		this.game.actions.walkTo(this.game.player,{x:460,y:1160},1200,100,()=>{
			this.game.player.isTalking = false;
			//kill stratejesters desk
			this.game.actions.changeMapTiles("kq02-palace-00", "subforeground", {
				1178: 0,
				1179: 0,
				1180: 0,
				1181: 0,
				1182: 0
			});
			this.game.actions.changeMapTiles("kq02-palace-00", "collision", {
				1208: 0,
				1209: 0,
				1210: 0,
				1211: 0,
				1212: 0
			});
		});
	}

	ndp_palace_02_horganEnters = () => {
		this.game.player.isTalking = true;
		// create horgan, tween him in (there is no animation for him)
		const horganData = {
			character: 'John Horgan',
			name: 'John Horgan',
			dI: 18,
			portrait: 'horgan',
			static: true
		}
		var horgan = new NPC(this.game, this.game.world.width+36, this.game.player.y+16, "bc-ndp", "horgan_0.png", horganData);
		this.game.NPCGroup.add(horgan);
		var horganTween = this.game.add.tween(horgan.position).to({x:this.game.player.x-42},800,Phaser.Easing.Elastic.Out,true);
		horganTween.onComplete.addOnce(()=>{
			this.game.dialogue.initDialogue(null,horgan,false);
		});
	}

	ndp_palace_02_horganExits = () => {
		this.game.player.isTalking = true;
		var horgan = this.game.actions.getCharacter("John Horgan");
		var horganTween = this.game.add.tween(horgan.position).to({x:this.game.world.width+36},800,Phaser.Easing.Quadratic.Out,true);
		horganTween.onComplete.addOnce(() => {
			horgan.destroy();
			this.game.player.isTalking = false;
		});
	}

	ndp_palace_02_setup = () => {
		// remove and reset characters from cache
		//create invisible hand
		// place zv, sc, ch
		const tommy = {
			x:320,
			y:1500,
			properties: {
				"character":"Tommy Douglas",
				"dI": 0,
				"id":64,
				"name":"Tommy Douglas",
				"portrait":"douglas",
				"static":true,
				"type":"npc"
			}
		}
		const zain = {
			x:308,
			y:1272,
			properties: {
				"engageDistance":90,
				"character":"Zain Velji",
				"dI": 0,
				"id": 45,
				"key":"npc",
				"name":"Zain Velji",
				"portrait":"velji",
				"static":true,
				"type":"npc"
			}
		}
		const stephen = {
			x:302,
			y:1272,
			properties: {
				"character": "Stephen Carter",
				"dI": 0,
				"id": 47,
				"key": "npc",
				"name": "Stephen Carter",
				"portrait": "carter",
				"static": true,
				"type": "npc"
			}
		}
		const corey = {
			x:366,
			y:1272,
			properties: {
				"character": "Corey Hogan",
				"dI": 0,
				"id": 46,
				"key": "npc",
				"name": "Corey Hogan",
				"portrait": "hogan",
				"static": true,
				"type": "npc"
			}
		}
		this.game.actions.setNewCacheObject("kq02-palace-00",zain);
		this.game.actions.setNewCacheObject("kq02-palace-00",stephen);
		this.game.actions.setNewCacheObject("kq02-palace-00",corey);

		this.game.actions.setNewCacheObject("kq02-palace-00", tommy);

		// setup Stratejesters' desk

		// setup Jagmeet Singh
		const singh = {
			x: 600,
			y: 1272,
			properties: {
				"character": "Jagmeet Singh",
				"dI": 0,
				"id": 63,
				"key": "npc",
				"name": "Jagmeet Singh",
				"portrait": "singh",
				"static": true,
				"type": "npc"
			}
		}
		this.game.actions.setNewCacheObject("kq02-palace-00", singh);

		// remove trolls
		// 11 trolls. Will be 12 once completed
		var trollsNum = 21;
		for (let i=0;i<trollsNum;i++) {
			this.game.actions.removeCacheObject("kq02-palace-00",["character","Troll"]);
		}

		//this.game.actions.addToCachedObject("ndp_palace_01_talkToHand",{'initFunction':'ndp_palace_02_walkPastHand'},'kq02-palace-00');
		//this.game.actions.addToCachedObject("ndp_palace_01_talkToHand",{'initFunction':'ndp_palace_02_walkPastHand'},'kq02-palace-00');

		this.game.actions.removeCacheObject('kq02-palace-00',['initFunction','ndp_palace_01_talkToHand'],['type','trigger']);
		this.game.actions.removeCacheObject('kq02-palace-00', ['initFunction', 'ndp_palace_01_talkToHand'], ['type', 'trigger']);


		//make new triggers 
		var triggerData_1 = {
			x:362,
			y: 720,
			properties: {
				'initFunction': 'ndp_palace_02_walkPastHand',
				'once': true,
				'type': "trigger"			
			}
		}

		var triggerData_2 = {
			x: 506,
			y: 720,
			properties: {
				'initFunction': 'ndp_palace_02_walkPastHand',
				'once': true,
				'type': "trigger"
			}
		}

		this.game.actions.setNewCacheObject("kq02-palace-00",triggerData_1);
		this.game.actions.setNewCacheObject("kq02-palace-00", triggerData_2);



		//create changeMap tile at bottom of map
        const el = {
            x: 420,
            y: 1920,
            properties: {
                "coords": "640,320", //coords retrieved from place where they're stored: different based on map player arriving into edmonton from
                "key": "mapChange",
                "stage": "kq02-edmonton-00",
				"type": "mapChange"
            }
        }
        const el1 = {
            x: 484,
            y: 1920,
            properties: {
                "coords": "640,320", //coords retrieved from place where they're stored: different based on map player arriving into edmonton from
                "key": "mapChange",
                "stage": "kq02-edmonton-00",
				"type": "mapChange"
            }
        }

        this.game.actions.setNewCacheObject('kq02-palace-00',el);
        this.game.actions.setNewCacheObject('kq02-palace-00',el1);

		//this.game.actions.addToCachedObject("ndp_palace_01_talkToHand",{'initFunction':'ndp_palace_02_walkPastHand'},'kq02-palace-00');
		// set new dI for notley and returning characters
		//this.game.actions.setCharacterDICache("Rachel Notley",6,"kq02-palace-00");

		// setup Stratejester desk
		this.game.actions.changeMapTiles("kq02-palace-00","subforeground",{
			1178: 2991,
			1179: 2992,
			1180: 2993,
			1181: 2994,
			1182: 2995
		});
		this.game.actions.changeMapTiles("kq02-palace-00", "collision", {
			1208: 2996,
			1209: 2997,
			1210: 2998,
			1211: 2999,
			1212: 3000
		});

		// set ndp characters' dI in cache
		this.game.actions.setCharacterDICache("Shaye Anderson",2,"kq02-palace-00");
		this.game.actions.setCharacterDICache("David Shepherd",6,"kq02-palace-00");
		this.game.actions.setCharacterDICache("Danielle Larivee",2,"kq02-palace-00");
		this.game.actions.setCharacterDICache("Deron Bilous",10,"kq02-palace-00");
		this.game.actions.setCharacterDICache("Shannon Phillips",2,"kq02-palace-00");

		//this.game.actions.changeMapTiles('kq02-mountains-01', 'collision', {
		// this.game.startingPosition = [452, 1200];
		// this.game.state.start('Game');

	}

	ndp_palace_02 = () => {
		// set up second ndp sequence
		var notley = this.game.actions.getCharacter("Rachel Notley");
		notley.data.dI = 0 // change to what new dI will be
		// Notley begins speaking from podium

		// end scene with Notley leaving for Pride
	}

	ndp_palace_ceciSpeaks = (_dI) => {
		this.game.player.isTalking = true;
		var ceci = this.game.actions.getCharacter('Joe Ceci');
		ceci.data.dI = _dI || 0;
		this.game.actions.walkTo(this.game.player,{x:367,y:370},1200,0,null,true);
		this.game.actions.walkTo(ceci,{x:480,y:415},1400,400,()=>{
			this.game.dialogue.initDialogue(null,ceci,false,null,true);
		},true)
	}

	ndp_palace_01_talkToHand = () => {
		this.game.player.body.velocity.set(0);
		this.game.player.isTalking = true;
		this.game.actions.walkTo(this.game.player,{y:1222},600,0,()=>{
			this.game.actions.walkTo(this.game.player,{x:290},800,200,()=>{
				this.game.player.frameName = "npc-16-ml/_01.png";
				var invisibleHand = {
					data:{
						"character": "The Invisible Hand",
						"dI": 0,
						"name": "The Invisible Hand"
					}
				}
				this.game.dialogue.initDialogue(null,invisibleHand,false);
			});
		});
	}

	ndp_palace_02_return = () => {								// return to edmonton after ndp_palace scene number 2
		this.game.currentCharacter = "jasonKenney";
		this.game.currentStage = "kq02-edmonton-00";
		this.game.startingPosition = this.game.globalAchievements.airship ? [1188,1712] : [280,1680];
		this.game.camera.fade('#000000');
		this.game.camera.onFadeComplete.add(() => {
			this.game.camera.onFadeComplete.removeAll();
			this.game.state.start('Game');
		})
	}

	ndp_palace_01_out = () => {
		this.game.currentCharacter = "jasonKenney";
		this.game.currentStage = "kq02-calgary-01";
		this.game.startingPosition = [932,276];
		this.game.state.start('Game');
	}

	ndp_palace_01 = () => {
		// set up the ndp scene
		this.game.player.isTalking = true;
		this.game.camera.unfollow();

		// all trolls standing at attention
		this.game.actions.animateNPCs('walk-backward', 'enemyGroup', null, true);

		//new fadeIn screen
		let fadeInScreen = this.game.add.graphics(0,0);
		fadeInScreen.beginFill('#000',1);
		fadeInScreen.drawRect(this.game.camera.width,this.game.camera.height,0,0);
		fadeInScreen.endFill();
		fadeInScreen.fixedToCamera = true;

		let fadeTween = this.game.add.tween(fadeInScreen).to({alpha:0},1600,null,true);
		fadeTween.onComplete.add(()=>{
			fadeInScreen.destroy();
		});

		this.game.actions.walkTo(this.game.player,{x:220},1800,200,()=>{
			this.game.actions.walkTo(this.game.player,{y:410},800,0,()=>{
				this.game.actions.walkTo(this.game.player,{x:this.game.camera.width/2+12},1800,0,null,true);
				this.game.camera.follow(this.game.player);
				this.game.player.data.dI = 5;
				this.game.dialogue.initDialogue(null,this.game.player,false); // notley begins speech
			});
		});

		this.game.camera.y = 0;
		this.game.camera.x = 0;
		// let cameraTween = this.game.add.tween(this.game.camera).to({y:140},1000,"Quad.easeOut",true);
		// cameraTween.onComplete.add(()=>{
		// 	// magic snare bubble effect...
		// });
		this.invisibleHand_setup(482, 1300,0);
	}

	kenneyReturn_beginQuest_changeStageCall = () => {
		//this.set_calgary_assets();
		this.game.currentCharacter = "jasonKenney";
		this.game.startingPosition = [930, 260];
		this.game.currentStage = 'kq02-calgary-01';

		// add Don Braid
		const braid = {
			x:1060,
			y:756.33,
			properties: {
				"character":"Don Braid",
				"dI":0,
				"id":52,
				"key": "npc",
				"name": "Don Braid",
				"portrait":"braid",
				"questNodeId":"kq-q-pipeline-0",
				"static":true,
				"type":"npc"
			}
		}
		this.game.actions.setNewCacheObject("kq02-calgary-01",braid)
		// add Naheed Nenshi	
		const nenshi = {
			x: 1381,
			y: 510,
			properties: {
				"character": "Naheed Nenshi",
				"dI": 0,
				"id": 18,
				"key": "npc",
				"name": "Naheed Nenshi",
				"portrait": "nenshi",
				"questNodeId": "kq-q-quiz-0",
				"static": true,
				"type": "npc"
			}
		}
		this.game.actions.setNewCacheObject("kq02-calgary-01", nenshi);

		this.game.musicHandler.stop();

		this.game.state.start('Game');

		//this.game.stageInitFunction[0] = this.kenneyReturn_beginQuest;
	}

	kenneyReturn_beginQuest = () => {

	}

	acquire_valveWheel = (_exec) => {
		const data = {
			class: 'Valve Wheel',
			key: 'inventoryItem',
			subClass: 'wheel',
			itemName: 'Valve Wheel',
			type: 'pickup'
		}
		const wheel = new PickupItem(this.game,this.game.player.x,this.game.player.y,"sprites",null,data,true);
		wheel.initInventoryItem(wheel.data);
		wheel.destroy();
		// set target questNodeId in mountains-00

		// update questNodeId waypoint!!!
			this.game.mapWorld.updateWaypoint('kq-q-pipeline-3');
		// reset executives' DI who didn't provide wheel
		var targExec = this.game.actions.getCharacter(_exec);
		targExec.data.dI = 0;
	}

	place_valveWheel = () => {
		if (this.game.player.hasItem('wheel')) {
			this.game.player.body.velocity.set(0);
			this.game.player.isTalking = true;
			this.horgan_set_wine_flood();
			// initiate wine flood
		}
	}

	horgan_set_wine_flood = () => {
		this.game.player.removeInventoryItem('wheel');

		var floodTiles = {};
		var cols = 6;
		var startingRow = 44;
		var startingCol = 8;
		var endingCol = 30 ;
		for (let i=0;i<cols;i++) {
			var currentRow = i + startingRow;
			for (let x=startingCol;x<endingCol;x++) {
				let currentIndex = x+(40*currentRow);
				currentIndex = currentIndex.toString();
				floodTiles[currentIndex] = 2822;
			}
		}

		this.game.actions.changeMapTiles('kq02-mountains-01','collision',{ // valve tile and wine flood
			'1628': 2944,
			'1728': 2821,
			'1729': 2821,
			'1730': 2821,
			'1731': 2821,
			'1732': 2821,
			'1733': 2821,
			'1734': 2821,
			'1735': 2821,
			'1736': 2821,
			'1737': 2821,
			'1738': 2821,
			'1739': 2821,
			'1740': 2821,
			'1741': 2821,
			'1742': 2821,
			'1743': 2821,
			'1744': 2821,
			'1745': 2821,
			'1746': 2821,
			'1747': 2821,
			'1748': 2821,
			'1749': 2821
		});
		this.game.actions.changeMapTiles('kq02-mountains-01','collision',floodTiles); // remaining flood tiles
		this.game.mapWorld.searchAndRemoveTriggers("horgan_set_wine_flood");

		this.game.actions.removeCacheObject("kq02-mountains-01", ['type', 'trigger'], ['initFunction', 'horgan_set_wine_flood']);
		var newPos = `${this.game.player.x},${this.game.player.y}`;
		// this.game.mapWorld.changeStage(null,{targetMap:"kq02-mountains-01",targetPosition: newPos,'data':{'initFunction':this.game.npcFunctions.horgan_enter}});
		this.game.currentPosition = [this.game.player.x,this.game.player.y];
		//this.game.stageInitFunction[0] = this.horgan_enter;
		this.game.stageInitFunction = "horgan_enter";
		this.game.musicHandler.stop();
		this.game.sfx.play('sfx_wheel_flood');
		this.game.time.events.add(2200,()=>{
			this.game.camera.fade('#000000');
			this.game.camera.onFadeComplete.addOnce(() => {
				this.game.state.start("Game");
			});
		})
	}

	horgan_enter = () => {
		this.game.musicHandler.stop();
		this.game.musicHandler.play('theme-horgan');
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.player.frameName = 'hero-mab/_01.png';
		var bcTruck = new BCNdp(this.game,this.game.world.width/2,-600);
		// create Horgan
		const horganData = {
				character: 'John Horgan',
				name: 'John Horgan',
				dI: 0,
				portrait: 'horgan'

		}
		var horgan = new NPC(this.game,0,290,"bc-ndp","horgan_0.png",horganData);
		horgan.animations.play('gesticulate');
		bcTruck.addChild(horgan);
		this.game.NPCGroup.add(horgan);
		// set truck z-index to below player
		this.game.world.setChildIndex(bcTruck,5);
		this.game.camera.follow(null);
		var bcTruckTween = this.game.add.tween(bcTruck.position).to({y:520},6000,Phaser.Easing.Quadratic.Out,true);
		var cameraTween = this.game.add.tween(this.game.camera).to({x:this.game.width/6,y:0},1200,Phaser.Easing.Quadratic.InOut,true);
		cameraTween.onComplete.add(()=>{
			cameraTween.onComplete.removeAll();
			this.game.camera.follow(bcTruck.children[13]);
			this.game.player.x = this.game.world.width/2;
			this.game.player.y = 1300;
		});

		bcTruckTween.onComplete.add(() => {
			bcTruck.stop();
			// update waypoint
			//this.game.mapWorld.updateWaypoint('kq-q-pipeline-4');
			this.game.camera.follow(null);
			this.game.camera.x = this.game.width/6;
			this.game.camera.y = bcTruck.y;
			var cameraTween2 = this.game.add.tween(this.game.camera).to({x:this.game.width/6,y:1300},3000,Phaser.Easing.Quadratic.Out,true);
			cameraTween2.onComplete.add(() => {
					this.game.musicHandler.stop();
					this.game.sfx.play('sfx_wind');
					this.game.camera.follow(this.game.player);
					this.game.actions.walkTo(this.game.player,{x:this.game.player.x,y:900},1600,100,()=>{
						horgan.animations.stop();
						horgan.frameName = "npc-"
						this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("John Horgan"),true,null,true);
					});
			});			
		});
	}

	end_horgan = () => {
		this.game.sfx.stop(); // stop wind looping
	}

	boat_arrival = () => {
		this.game.world.setChildIndex(this.game.objGroup,6); // set boat below npcs and player
		// player moved to boat
		this.game.player.isTalking = true;
		this.game.player.body.velocity.setTo(0);
		var companion = this.game.actions.getCompanion();
		this.game.actions.walkTo(companion,{x:372,y:372},600,200);
		this.game.actions.walkTo(this.game.player,{x:330,y:320},500,200,()=>{
			this.game.actions.walkTo(this.game.player,{y:372},200,0,()=>{
				var hoodedFigure = this.game.actions.getCharacter("Hooded Figure");
				hoodedFigure.data.dI = 2;
				this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Hooded Figure"),false);
			});
		});
		//boat begins moving with all inside
	}
	
	boat_to_middle = () => {
		var boat = this.game.objGroup.children[0];
		this.game.player.isTalking = true;
		var kenney = this.game.player;
		var hoodedFigure = this.game.actions.getCharacter("Hooded Figure");
		var companion = this.game.actions.getCompanion();
		boat.addChild(kenney);
		boat.addChild(hoodedFigure);
		boat.addChild(companion);
		kenney.position.setTo(0,-18);
		hoodedFigure.position.setTo(-36,-18);
		companion.position.setTo(36,-18);
		//reset player and hoodedFigure XY coords for child addition
		var boatTween = this.game.add.tween(boat.position).to({x:this.game.world.width/2},3000,null,true);
		boatTween.onComplete.add(()=>{
			// initiate dialogue that leads to hooded figure revealing self to be either Ambrose, Mercury or Aberhardt
			this.game.dialogue.initDialogue(null,boat.children[1],false);
			//this.boat_to_shore();
		});
	}

	boat_return_figure = () => {
		return this.game.globalAchievements.hoodedFigure;
	}

	boat_reveal_self = () => {
		// something to determine one of these characters
		var returnFigure = this.boat_return_figure(); //aberhardt,mercury
		var id,portrait;
		switch(returnFigure) {
			case "Rona Ambrose":
				//character = "Rona Ambrose";
				portrait = "ambrose";
				id = 39;
				break;
			case "Bill Aberhart":
				//character = "Bill Aberhart";
				id = 41;
				portrait = "aberhart";
				break;
			case "Freddie Mercury":
				//character = "Freddie Mercury";
				id = 40;
				portrait = "mercury";
				break;
		}
		this.game.tData("hoodedFigure",returnFigure);
		var hoodedFigureData = {
			character: returnFigure,
			dI: 0,
			id: id,
			key: 'npc',
			name: returnFigure,
			portrait: portrait,
			static: true,
			type: 'npc'
		}
		var figure = this.game.objGroup.children[0].children[1];
		figure.data = hoodedFigureData;
		figure.frameName = `npc-${id}-mf/_01.png`;
		//figure.animations.play("celebrate");
		this.game.dialogue.initDialogue(null,figure,false);

	}

	boat_to_shore = () => {
		this.game.player.isTalking = true;
		var figure = this.game.objGroup.children[0].children[1];
		figure.frameName = `npc-${figure.data.id}-mf/_01.png`;
		var boat = this.game.objGroup.children[0];
		var boatTween = this.game.add.tween(boat.position).to({x:1805},3000,null,true);
		boatTween.onComplete.add(()=>{
			//reset position and disembark
			var boat = this.game.objGroup.children[0];
			var companion = boat.children[2];
			this.game.actions.walkTo(companion,{x:170},600,200);
			this.game.actions.walkTo(this.game.player,{x:140},600,200,()=>{
				this.game.player.isTalking = false;
				//this.game.stageDismissFunction[0] = this.set_calgary_03_to_trigger_palace_00;
			});
		});
	}

	avocadoToast_buttonMashChallenge = () => {
        //init ButtonMash module
        this.buttonMash = new ButtonMash(this.game,"avocadoToast");
    }

    avocadoToast_win = () => {
    	// some dialogue
    	this.game.mapWorld.updateWaypoint('kq-q-avocadotoast-2');
    	this.avocadoToast_acquireToast();
    }

    avocadoToast_lose = () => {
    	// some dialogue
    	this.game.mapWorld.updateWaypoint('kq-q-avocadotoast-2');
    	this.avocadoToast_acquireToast();
    }

    avocadoToast_acquireToast = () => {
    	this.game.dialogue.alert('Avocado toast acquired! Seek out the other fixings to optimise this sacred dish.');
    	let data = { itemName: 'Avocado Toast', key: 'inventoryItem' };
    	var toastItem = new PickupItem(this.game,0,0,'sprites','trigger.png',data);
    	this.game.mapWorld.pickupItem(null,toastItem);
    	this.game.globalAchievements.avocadoToast.previous = "toast-avocado";

    	//create item tiles on map
    	this.avocadoToast_createItemSprites();

    }

    avocadoToast_createItemSprites = () => {
    	// set Farmer's Market Vendor's dI to 1
    	var vendor = this.game.actions.getCharacter('Farmer\'s Market Vendor');
    	vendor.data.dI = 1;
    	this.game.actions.setDICache(vendor,"kq02-edmonton-00");

    	// set tile for sriracha in Journal building
    	var sX = 986;
    	var sY = 1294;
    	var srirachaData = {
    		itemFunction: "avocadoToast_acquireSriracha",
    		message: "Sriracha acquired!",
    		objectType: "sign",
    		type: "object"
    	}

    	var srirachaSprite = new Obj(this.game,sX,sY,"sprites","",srirachaData);
    	this.game.objGroup.add(srirachaSprite);
    	this.game.actions.setNewCacheObject('kq02-edmonton-00',{
    		x: sX,
    		y: sY,
    		properties: srirachaData
    	});

    	// set tile for egg
    	sX = 955;
    	sY = 1009;
    	var eggData = {
    		itemFunction: "avocadoToast_acquireEgg",
    		message: "Egg acquired!",
    		objectType: "sign",
    		type: "object"
    	}
    	var eggSprite = new Obj(this.game,sX,sY,"sprites","",eggData);
    	this.game.objGroup.add(eggSprite);
    	this.game.actions.setNewCacheObject("kq02-edmonton-00",{
    		x: sX,
    		y:sY,
    		properties: eggData
    	});

    	// set npc dI's to guide player
    	var jayshri = this.game.actions.getCharacter("Jayshri");
    	jayshri.data.dI = 1;
    	this.game.actions.setCharacterDICache("Jayshri",1,"kq02-edmonton-00");
    	var buck = this.game.actions.getCharacter("Buck");
    	buck.data.dI = 1;
    	this.game.actions.setCharacterDICache("Buck",1,"kq02-edmonton-00");
    	var bill = this.game.actions.getCharacter("Bill");
    	bill.data.dI = 3;
    	this.game.actions.setCharacterDICache("Bill",3,"kq02-edmonton-00");
    }

    avocadoToast_acquireEgg = () => {
    	this.game.globalAchievements.avocadoToast.egg = true;
    	this.avocadoToast_removeExisting();
    	this.avocadoToast_makeSequence();
    	this.game.actions.removeCacheObject("kq02-edmonton-00",["itemFunction","avocadoToast_acquireEgg"],["type","object"]);
    	var bill = this.game.actions.getCharacter("Bill");
    	bill.data.dI = 4;
    	this.game.actions.setCharacterDICache("Bill",4,"kq02-edmonton-00");
    	this.game.score("tookEgg",-1);
    }

    avocadoToast_acquireBacon = () => {
    	this.game.globalAchievements.avocadoToast.bacon = true;
    	this.avocadoToast_removeExisting();
    	this.avocadoToast_makeSequence();
    }

    avocadoToast_acquireSriracha = () => {
    	this.game.globalAchievements.avocadoToast.sriracha = true;
    	this.avocadoToast_removeExisting();
    	this.avocadoToast_makeSequence();
    	// destroy cache object
    	this.game.actions.removeCacheObject("kq02-edmonton-00",["itemFunction","avocadoToast_acquireSriracha"],["type","object"]);
    }

    avocadoToast_removeExisting = () => {
    	this.game.player.removeInventoryItem(this.game.globalAchievements.avocadoToast.previous);
    }

    avocadoToast_makeSequence = () => {
    	var rootStr = "Avocado Toast ";
    	var removeRoot = "toast-avocado-";
    	var egg = this.game.globalAchievements.avocadoToast.egg?"egg":"";
    	var bacon = this.game.globalAchievements.avocadoToast.bacon?"bacon":"";
    	var sriracha = this.game.globalAchievements.avocadoToast.sriracha?"sriracha":"";
    	var suffixStr = `(${egg}-${bacon}-${sriracha})`;
    	var removeSuffix = `${egg}-${bacon}-${sriracha}`;
    	var itemName = rootStr + suffixStr;
    	let data = { itemName: itemName , key: 'inventoryItem'};
    	var toastItem = new PickupItem(this.game,0,0,'sprites','trigger.png',data);
    	this.game.mapWorld.pickupItem(null,toastItem);
    	this.game.globalAchievements.avocadoToast.previous = removeRoot + removeSuffix;

    	// set ravi's dI based on what you have
    	var itemsArray = [this.game.globalAchievements.avocadoToast.egg,this.game.globalAchievements.avocadoToast.bacon,this.game.globalAchievements.avocadoToast.sriracha];
    	// filter
    	var result = itemsArray.filter(val => val);
    	var ravi = this.game.actions.getCharacter('Ravi, Leader of all Millennials');
    	switch (result.length) {
    		case 1:
    			ravi.data.dI = 2;
    			break;
    		case 2:
    			ravi.data.dI = 3;
    			break;
    		case 3:
				this.game.dialogue.alert('Congratulations! You\'ve found all of the sacred ingredients.');
    			ravi.data.dI = 4
    			break;
    	}
    }

    avocadoToast_removeToast = () => {
		this.avocadoToast_removeExisting();
		this.game.mapWorld.updateWaypoint('kq-q-avocadotoast-3');
		var jayshri = this.game.actions.getCharacter("Jayshri");
    	jayshri.data.dI = 0;
    	this.game.actions.setCharacterDICache("Jayshri",0,'kq02-edmonton-00');
    	var buck = this.game.actions.getCharacter("Buck");
    	buck.data.dI = 0;
    	this.game.actions.setCharacterDICache("Buck",0,'kq02-edmonton-00');
		if (!this.game.player.hasItem('Oilers jersey')) {
			this.edmonton_acquireJersey();
			//update Quest
			// let data = { itemName: 'Oilers Jersey', key: 'inventoryItem' };
			// var jerseyItem = new PickupItem(this.game,0,0,'sprites','trigger.png',data);
			// this.game.mapWorld.pickupItem(null,jerseyItem);

			// create crystal tile in kq02-edmonton-01
		}
	}
	
	edmonton_acquireJersey = () => {
		let data = { itemName: 'Oilers Jersey', key: 'inventoryItem' };
    	var jerseyItem = new PickupItem(this.game,0,0,'sprites','trigger.png',data);
		this.game.mapWorld.pickupItem(null,jerseyItem);

		// lay down trigger in edmonton-01 to direct user to search in fountain
		this.game.actions.setNewCacheObject('kq02-edmonton-01',{
			x: 450,
			y: 1340,
			"properties": {
				"initFunction": "edmonton_alertToJerseyRecovery",
				"once": true,
				"type": "trigger"
			}
		});

		//timed event to alert player to pull of jersey
		this.game.time.events.add(3000,()=>{
			if (!this.game.player.isTalking) {
				var comp = this.game.actions.getCompanion(18);
				this.game.dialogue.initDialogue(null,comp,false);
			}
		});
	}

	edmonton_alertToJerseyRecovery = () => {
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.time.events.add(600,()=>{
			this.game.dialogue.initDialogue(null,this.game.actions.getCompanion(23),false);
		});
	}

	set_calgary_03_to_trigger_palace_00 = () => {
		this.game.stageDismissFunction[0] = this.ndp_palace02_changeStageCall;
	}

	edmonton_crystal = () => {
		if (this.game.player.hasItem("jersey-edmonton")) {
			this.game.player.isTalking = true;
			this.game.player.body.velocity.setTo(0);
			var companion = this.game.actions.getCompanion();
			companion.data.dI = 9; // change to whatever this will be in end
			this.game.dialogue.initDialogue(null,this.game.actions.getCompanion(),false);
		}
	}

	edmonton_crystal_uncovery = () => {
			//remove jersey
			this.game.player.removeInventoryItem('jersey-edmonton');

			// create exploded ground tiles
			this.game.actions.changeMapTiles("kq02-edmonton-01","subdetail",{
				1029:2851,
				1030:2852,
				1059:2853,
				1060:2854
			});

			this.game.stageInitFunction = "edmonton_crystal_discovery";
			this.game.startingPosition = [this.game.player.x,this.game.player.y];
			this.game.musicHandler.stop();
			this.game.state.start("Game");
	}

	edmonton_crystal_discovery = () => {
		this.game.player.isTalking = true;
		this.game.time.events.add(1000,() => {
			this.game.player.crystalAcquired('Crystal of Edmonton',() => {

				// scene that gets duo out of Edmonton
				var comp = this.game.actions.getCompanion(20);
				this.game.dialogue.initDialogue(null,comp,false);
			});
		});
	}

	edmonton_crystal_escape = () => {
		// get companion and kenney out of costume
		// remove all quests from player
		this.game.data.players.jasonKenney.quests = [];
		this.game.data.players.jasonKenney.portrait = "kenney";
		this.game.data.players.jasonKenney.inDisguise = false;
		if (this.game.data.companion.hasOwnProperty('portrait')) {
			var companionName = this.game.data.companion.character;
			this.game.data.companion.portrait = companionName === "Leela Aheer"?"aheer":"nixon";
			this.game.data.companion.dI = 11;
			this.game.data.companion.id = companionName === "Leela Aheer"?31:17;
		}
		var stageData = {
			"targetMap":"kq02-calgary-00",
			"targetPosition": "500,660"
		}
		this.game.mapWorld.changeStage(null,stageData,"edmonton_crystal_returnCalgary");
	}

	edmonton_crystal_returnCalgary = () => {
		// set up post-edmonton scene with kenney, companion, harper, manning, chief-of-staff
		this.game.player.isTalking = true;
		this.game.data.players.jasonKenney.hasCompanion = false;
		var companion = this.game.actions.getCompanion();
		companion.position.set(480,650); //367,428 original
		var cos = this.game.actions.getCharacter("Chief of Staff");
		cos.position.set(576,428);
		this.game.time.events.add(600,()=>{
			//this.game.add.tween(companion.position).to({x:480,y:650},1300,null,true);
			this.game.actions.walkTo(companion,{x:480,y:650},1300);
			var jasonMov = this.game.add.tween(this.game.player).to({
				x: 480,
				y: 530
			},1500,null,true,200);
			this.game.player.animations.play('walk-backward');
			jasonMov.onComplete.addOnce(()=>{
				var harper = this.game.actions.getCharacter("Stephen Harper");
				this.game.player.animations.play('walk-backward').stop();
				harper.data.dI = 12; //whatever this will become
				this.game.dialogue.initDialogue(null,harper,false);
			});
		});
	}

	edmonton_setPaulaQuestNode = () => {
		var paula = this.game.actions.getCharacter("Paula Simons");
		paula.data.dI = 0;
		this.game.actions.setCharacterDICache('Paula Simons', 0, "kq02-edmonton-00");
		this.takeEdmontonQuest('kq-q-environment');
	}

	edmonton_trudeauNotleyCutscene = () => {
		//cutscene stuff
		this.game.player.isTalking = true;
		this.game.camera.follow(null);
		var camTween = this.game.add.tween(this.game.camera).to({x:610-(this.game.camera.width/2),y:547-(this.game.camera.height/2)},700,null,true);
		camTween.onComplete.add(()=>{
			var notley = this.game.actions.getCharacter('Rachel Notley');
			notley.data.dI = 10; // or whatever this will be
			this.game.dialogue.initDialogue(null,notley,false,null,true);
		});
	}

	edmonton_trudeauNotleyCutscene_trudeauAppears = () => {
		this.game.player.isTalking = true;
		var notley = this.game.actions.getCharacter('Rachel Notley');
		notley.animations.play('dance');
		//create trudeau
		var trudeauData = {
				character: "Justin Trudeau",
				dI:33,
				id:42,
				key: 'npc',
				name: "Justin Trudeau",
				portrait: "trudeau",
				static: true,
				type: 'npc'
		}
		var trudeau = new NPC(this.game,495,450,"sprites","",trudeauData);
		this.game.NPCGroup.add(trudeau);
		this.game.actions.walkTo(trudeau,{x:576},400,400,()=>{
			this.game.actions.walkTo(trudeau,{y:547},300,100,()=>{
				var trudeau = this.game.actions.getCharacter("Justin Trudeau");
				trudeau.animations.play("celebrate");
				this.game.dialogue.initDialogue(null, trudeau, false, null, true);
			});
		})
	}

	edmonton_trudeauNotleyCutscene_trudeauExits = () => {
		this.game.player.isTalking = true;
		var notley = this.game.actions.getCharacter('Rachel Notley');
		notley.animations.play('dance');
		var trudeau = this.game.actions.getCharacter("Justin Trudeau");
		this.game.actions.walkTo(trudeau,{y:510},300,400,()=>{
			trudeau.animations.play('walk-forward').stop();
			this.game.time.events.add(800,()=>{
				this.game.actions.walkTo(trudeau,{x:486,y:430},400,0,()=>{
					var trudeau = this.game.actions.getCharacter("Justin Trudeau");
					trudeau.destroy();
					//at end:
					this.game.camera.follow(this.game.player);
					this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Gabby'), false);
				});
			});
		});
	}

	fildebrandt_trigger_launch_quest = () => {
		// player moves to center and fildebrandt launches convo, triggering path to fildebrandt quest
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.actions.walkTo(this.game.player,{x:this.game.world.width/2,y:260},600,200,()=>{
			var fildebrandt = this.game.actions.getCharacter("Derek Fildebrandt");
			fildebrandt.position.set(this.game.camera.width/1.33,this.game.camera.height+32);
			fildebrandt.data.dI = 9; // 9
			this.game.actions.walkTo(fildebrandt,{x:this.game.player.x+36,y:this.game.player.y},1200,100,()=>{
				this.game.dialogue.initDialogue('right',fildebrandt,true);
			});
		},true);
	}
	
	fildebrandt_launch_quest = (_bool) => {
		this.game.globalAchievements.fildebrandtGetsYouCoffee = _bool || false;
		//stage change call to quest
		this.game.currentCharacter = "derekFildebrandt";
		var truckstopMap = {
			targetPosition:"1430,580",
			targetMap:"kq02-truckstop-00"
		}
		this.game.mapWorld.changeStage(null,truckstopMap,"fildebrandt_add_quest");
	}

	fildebrandt_add_quest = () => {
		//this.game.player.addQuest("kq-q-coffee",true); 
		//this.game.mapWorld.createWaypoint('kq-q-coffee',this.game.actions.getCharacter('Truckstop Barista'),"active");
	}

    fildebrandt_buttonMashChallenge = () => {
        //init ButtonMash module
        this.buttonMash = new ButtonMash(this.game,"fildebrandt");
    }

    fildebrandt_losesChallenge = () => {
    	this.game.actions.setCharacterDICache("Derek Fildebrandt",18,"kq02-airship-00");
        const barista = this.game.actions.getCharacter('Truckstop Barista');
        barista.data.dI = 9;
        this.game.dialogue.initDialogue(null, barista, true);
        this.fildebrandt_setMapChange();
    }

    fildebrandt_winsChallenge = () => {
    	this.game.actions.setCharacterDICache("Derek Fildebrandt",17,"kq02-airship-00");
        const barista = this.game.actions.getCharacter('Truckstop Barista');
        barista.data.dI = 1;
        this.game.dialogue.initDialogue(null,barista,true);
        this.fildebrandt_setMapChange();
    }

    fildebrandt_setMapChange = () => {

        const el = {
            x: 1250,
            y: 24,
            properties: {
                "coords": "480,960",
                "key": "mapChange",
                "stage": "kq02-airship-00",
				"type": "mapChange",
				"questNodeId": "kq-q-coffee-2"
            }
		}
		


        const stageChange_01 = new MapChangeSprite(null, this.game, el.x, el.y, "sprites", el.properties);
        const stageChange_02 = new MapChangeSprite(null, this.game, 1314, el.y, "sprites", el.properties);
        const stageChange_03 = new MapChangeSprite(null, this.game, 1186, el.y, "sprites", el.properties);
        this.game.stagesGroup.add(stageChange_01);
        this.game.stagesGroup.add(stageChange_02);
		this.game.stagesGroup.add(stageChange_03);
		this.game.mapWorld.updateWaypoint("kq-q-coffee-1");
		// set fildebrandt DI cache for airship return
		this.game.currentCharacter = "jasonKenney";
		//this.game.actions.setCharacterDICache("Derek Fildebrandt",4,"kq02-airship-00");
	}

	fildebrandt_endCoffeeChallenge = (_result) => { //!!!!
		var newDI;
		if (_result) { //player won
			newDI = this.game.globalAchievements.fildebrandtGetsYouCoffee?17:20;
			this.game.actions.setCharacterDICache('Derek Fildebrandt',newDI,'kq02-airship-00');
		} else { //player lost
			newDI = this.game.globalAchievements.fildebrandtGetsYouCoffee ?18:21;
			this.game.actions.setCharacterDICache('Derek Fildebrandt', newDI, 'kq02-airship-00');
		}
		this.game.currentCharacter = "jasonKenney";
		this.game.startingPosition = [480,960];
		this.game.currentStage = "kq02-airship-00";
		this.game.camera.fade('#000000');
		this.game.camera.onFadeComplete.addOnce(() => {
			this.game.musicHandler.stop();
			this.game.state.start("Game");
		});
	}

	airship_initFunction_tiles_laydown = (_function,_yStart) => {
		// passes either "launch_dragon_bossFight" or "fildebrandt_trigger_launch_quest"
		const tilesNum = 8;
		const xStart = 122;
		const tileData = {
			initFunction: _function,
			once: true,
			type: "trigger"
		}
		for (let i=0;i<tilesNum;i++) {
			const trigger = new Trigger(this.game, xStart+(i*72), _yStart, "sprites", "trigger", tileData);
			this.game.triggerGroup.add(trigger);
		}
	}

	fildebrandt_dragonCry = () => {
		this.game.player.isTalking = true;
		this.game.sfx.play('sfx_dragon_roar');
		this.game.NPCGroup.forEach(npc => {
			this.game.actions.jump(npc, 180, this.game.rnd.integerInRange(20, 220));
		});
		this.game.time.events.add(2200,()=>{
			this.game.musicHandler.stop();
			this.game.musicHandler.play('boss-intro');
			this.game.time.events.add(600,()=>{
				var fildebrandt = this.game.actions.getCharacter("Derek Fildebrandt");
				fildebrandt.data.dI = 23; 
				this.game.dialogue.initDialogue(null,this.game.actions.getCompanion(21),false);
			});
			this.game.time.events.add(15130, () => {
				this.game.musicHandler.play('boss-main');
			});
		});
		// make everyone jump
	}

	launch_dragon_bossFight = () => {
		//this.game.player.isTalking = true;
		//this.game.actions.walk(this.game.player,{x:this.game.world.width/2,y:0},600,200,() => {
			this.game.player.isTalking = true;
			this.game.player.body.velocity.set(0);
			this.game.actions.walkTo(this.game.player,{y:320},1000,0,null,true);
			this.game.camera.follow(null);
			var companion = this.game.actions.getCompanion();
			companion.data.isFollowing = false;
			companion.body.velocity.set(0);
			// this.game.actions.walkTo(companion,{y:800},1000);
			this.game.NPCGroup.forEach(npc=>{
				this.game.actions.walkTo(npc,{y:1000},1600);
				npc.data.static = true;
			});
			this.game.player.cameraBounds = true;
			var dragon = new Dragon(this.game,this.game.world.width/2,-200,"sprites","",{});
			this.game.enemyGroup.add(dragon);
			dragon.dramaticEntrance(2400,() => {
				dragon.scream(1200,() => {
					// launch boss fight
					this.game.player.isTalking = false;
					this.game.bossFight = new BossFight(this.game,dragon,'dragon');
					dragon.setState("_MOVING");
					dragon.combatActive = true;
					dragon.setAttackTimer(500,dragon.fireball);
				});
			});
		//});
	}

	reset_dragon_bossFight = () => {
		// place player in middle position of screen again
		this.game.musicHandler.stop();
		this.game.musicHandler.play('boss-main');
		this.game.player.position.set(this.game.camera.width/2,220);
		this.launch_dragon_bossFight();
	}

	end_dragon_bossFight = (_dragon) => {
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		_dragon.scream(2000,() => {
			_dragon.quickExit(() => {
				// post-victory scene
				this.game.actions.walkTo(this.game.player,{x:this.game.camera.width/2,y:this.game.camera.height/2+48},700,100,()=>{
					// fildebrandt, companion and pirates appear
					// after convo, arrive in kq02-edmonton-02
					var fildebrandt = this.game.actions.getCharacter("Derek Fildebrandt");
					fildebrandt.position.set(this.game.world.width/2+100,this.game.camera.height+32);
					this.game.actions.walkTo(fildebrandt,{x:this.game.player.x+48,y:this.game.player.y},1200,100,() => {
						fildebrandt.data.dI = 19; // or whatever it will be in end
						this.game.dialogue.initDialogue('forward',fildebrandt,true);
					});
					var companion = this.game.actions.getCompanion();
					companion.position.set(this.game.world.width/3,this.game.camera.height+32);
					//companion.data.isFollowing = true;
					this.game.actions.walkTo(companion,{x:this.game.player.x-48,y:this.game.player.y},2000);
				});
			});
		});
	}

	edmonton_setup_from_airship = () => {
		// set ravi dI to 1
		this.game.actions.setCharacterDICache('Ravi, Leader of all Millennials',1,"kq02-edmonton-00");
		this.game.globalAchievements.airship = true;

		var companion = this.game.actions.getCompanion();
		companion.data.isFollowing = true;
		var stageData = {
			targetPosition : "580,450",
			targetMap : "kq02-edmonton-02",
			data : ""
		}
		this.game.mapWorld.changeStage(null, stageData, "edmonton_setup_from_caves");
	}

	edmonton_setup_from_caves = () => {
		this.game.player.body.velocity.setTo(0);
		this.game.player.isTalking = true;
		this.game.player.animations.stop();
		var timer = this.game.time.events.add(500,()=>{
			var companion = this.game.actions.getCompanion();
			companion.data.dI = 7;
			this.game.dialogue.initDialogue(null,companion,false);
		})
	}

	edmonton_setup_from_airship_launch_dialogue = () => {
		this.game.player.isTalking = true;
		this.game.time.events.add(800,()=>{
			var companion = this.game.data.companion;
			companion.dI = 7; // same for both aheer and nixon
			this.game.dialogue.initDialogue(false,companion,null);
		});
	}

	launch_ratKing_bossFight = () => {
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);

		// destroy the fucking waypoint
		const wpI = this.game.actions.getWaypointIndex('kq-q-ratking');
		this.game.waypointGroup.children[wpI].destroy();

		this.game.actions.walkTo(this.game.player,{x:this.game.camera.width/2,y:300},1000,200,() => {

			this.game.camera.follow(null);
			this.game.player.cameraBounds = true;
			var ratKing = new RatKing(this.game,this.game.world.width/2,-200,"sprites","",{});
			this.game.enemyGroup.add(ratKing);
			ratKing.dramaticEntrance(() => {
				ratKing.scream(1200,() => {
					ratKing.setSignal();
					ratKing.frameName = 'move/_01.png';
					this.game.bossFight = new BossFight(this.game,ratKing,'rat-king');
					ratKing.setState('_MOVING');
					ratKing.combatActive = true;
					ratKing.setAttackTimer(500,ratKing.toxicBall);
					ratKing.setMoveTimer(600);
					this.game.player.isTalking = false;
				});
			});
		});
	}

	ratking_restart = () => {
		this.game.player.position.set(this.game.camera.width / 2,300);
		this.game.camera.follow(null);
		this.game.player.cameraBounds = true;
		var ratKing = new RatKing(this.game, this.game.world.width / 2, -200, "sprites", "", {});
		this.game.enemyGroup.add(ratKing);
		ratKing.dramaticEntrance(() => {
			ratKing.scream(1200, () => {
				ratKing.setSignal();
				ratKing.frameName = 'move/_01.png';
				this.game.bossFight = new BossFight(this.game, ratKing, 'rat-king');
				ratKing.setState('_MOVING');
				ratKing.combatActive = true;
				ratKing.setAttackTimer(500, ratKing.toxicBall);
				ratKing.setMoveTimer(600);
				this.game.player.isTalking = false;
			});
		});
	}

	end_ratKing_bossFight = (_ratKing) => {
		_ratKing.setState("_PAUSED");
		this.game.score("rat king defeated",1);
		_ratKing.body.velocity.set(0);
		//this.game.player.isTalking = true;
		//this.game.player.body.velocity.set(0);
		//this.game.actions.walkTo(this.game.player,{x:this.game.camera.width/2,y:this.game.camera.height/2},600,200);
		_ratKing.tint = 0xff0000;
		var ratKingFade = this.game.add.tween(_ratKing).to({alpha:0},1200,Phaser.Easing.Quadratic.Out,true,500);
		this.game.sfx.play('sfx_ratDeath');
		ratKingFade.onComplete.add(() => {
			this.game.objGroup.children.forEach(child => child.destroy()); // remove boundary at top
			//this.game.mapWorld.updateWaypoint('kq-q-ratking-3');
			this.game.player.removeQuest('kq-q-ratking');
			_ratKing.destroy();
			this.game.bossFight = null;
			this.game.camera.follow(this.game.player);
			this.game.player.crystalAcquired('Crystal of Western Ingenuity',() => {

				// ratKing quest completed
				if (this.game.player.data.crystals.length === 2) {
					this.game.player.isTalking = false;
					this.game.player.body.velocity.setTo(0);
					this.call_deities_two_crystals();
				} else {
					this.game.player.isTalking = false;
				}
			});
			this.game.time.events.add(1000,()=>{
				this.game.player.isTalking = false;
			});

			// return player to calgary after crystal is acquired
		});
	}

	createNewRatKingTrigger = () => {
		this.game.time.events.add(3000,()=>{
			let trigger = this.game.triggerGroup.getFirstExists(false);
			trigger.reset(810,1408);
			trigger.anchor.set(0.5);
			//this.game.physics.arcade.enable(trigger);
			//trigger.body.onOverlap = new Phaser.Signal();
			//trigger.body.setSize(64, 64, 0, 0);
		});
	}

	createNewCarbonTreeTrigger = () => {
		this.game.time.events.add(10000,()=>{
			let trigger = this.game.triggerGroup.getFirstExists(false);
			trigger.reset(962,478);
			trigger.anchor.set(0.5);
		});
	}

	badlands_keys = () => { // check for whether player has both rat keys to open door
		if (this.game.player.hasItem('RatKeyLeft') && this.game.player.hasItem('RatKeyRight')) {
			this.badlands_open_door();
		} 
	}

	badlands_open_door = () => {
		this.game.player.removeInventoryItem('RatKeyLeft');
		this.game.player.removeInventoryItem('RatKeyRight');
		
		this.game.mapWorld.searchAndRemoveTriggers("badlands_keys");

		this.game.actions.removeCacheObject("kq02-badlands-00", ['type', 'trigger'], ['initFunction', 'badlands_keys']);

		this.game.actions.setNewCacheObject("kq02-badlands-00", this.game.actions.createMapObjectForCache(1348, 804, 1412, 32, 32, {
			"coords": "400,1030",
			"key": "mapChange",
			"stage": "kq02-badlands-01",
			"type": "mapChange"
		}));

		this.game.actions.changeMapTiles('kq02-badlands-00', 'detail', {
			'1285': 2500,
			'1286': 2501
		});

		this.game.actions.changeMapTiles('kq02-badlands-00', 'collision', {
			'1255': 2495,
			'1256': 2496
		});

		const newPos = `${this.game.player.x}, ${this.game.player.y + 48}`;
		// play tree falling sfx
		this.game.mapWorld.changeStage(null,{targetMap:"kq02-badlands-00",targetPosition: newPos});

	}

	quiz_set_nenshi_quest = () => {
				  // quest to receive passage east of city
				  this.game.player.addQuest('kq-q-quiz',true);
				  //set Nenshi dI accordingly
				  this.game.actions.setCharacterDICache('Naheed Nenshi',6,"kq02-calgary-01");
				//   this.game.actions.removeFromCachedObject('Naheed Nenshi','questNodeId','kq02-calgary-01');
				  this.game.actions.addToCachedObject('Naheed Nenshi',{'questNodeId':'kq-q-quiz-1'},'kq02-calgary-01');
	}

	quiz_question = (_index) => {

		var nenshi = this.game.actions.getCharacter('Naheed Nenshi');
		let quiz = this.game.quiz;

		const setCorrectAnswerIndex = (_thisI,_correctI) => {
			return _thisI === _correctI ? 2 : 3;
		}

		const createQ = () => {
			nenshi.data.dI = 1;
			this.game.npcDialogue.data["Naheed Nenshi"][1] = [ // set question
				[
					quiz[_index].q,
					[
						[ quiz[_index].a[0],setCorrectAnswerIndex(0,quiz[_index].c) ],
						[ quiz[_index].a[1],setCorrectAnswerIndex(1,quiz[_index].c) ],
						[ quiz[_index].a[2],setCorrectAnswerIndex(2,quiz[_index].c) ],
						[ quiz[_index].a[3],setCorrectAnswerIndex(3,quiz[_index].c) ]
					]
				],
				0,0,1
			]
			this.game.npcDialogue.data["Naheed Nenshi"][2] = [ //set set CORRECT answer result
				[
					quiz[_index].cA
				],
				0,0,1,
				() => { 
					this.game.data.players['jasonKenney'].quizScore++;
					//this.game.tData("quiz",[quiz[_index].q,true]);
					//this.game.sfx.play('sfx_success');
					this.game.npcFunctions.quiz_question(this.game.actions.randomQuizQ());
				}
			]
			this.game.npcDialogue.data["Naheed Nenshi"][3] = [ // set INCORRECT answer result
				[
					quiz[_index].incA
				],
				0,0,1,
				() => { 
					//this.game.sfx.play('sfx_fail');
					//this.game.tData("quiz",[quiz[_index].q,false]);
					this.game.npcFunctions.quiz_question(this.game.actions.randomQuizQ())
				 }
			]

			this.game.dialogue.initDialogue(null,nenshi,true);
			this.game.data.players['jasonKenney'].quizQuestionsAnswered++;
			this.game.quiz.splice(_index,1); // remove question from quiz array
		}
			

		if (this.game.data.players['jasonKenney'].quizQuestionsAnswered < 5) { // next question
			createQ();
		} else {  //end quiz
			nenshi.data.dI = this.game.data.players['jasonKenney'].quizScore >= 3?4:5;
			this.game.dialogue.initDialogue(null,nenshi,true);
		}
	}

	curtain_down = (_callback) => {

		const createDrape = (_i,_p) => {
			if (_i >= drapeNum) {
				if (_callback) _callback();
				return; 
			} else {
				var drape = this.game.add.tileSprite(0, _p, this.game.camera.width, 152, 'bg-textures', 'curtain.png');
				drape.fixedToCamera = true;
				this.game.curtain.addChildAt(drape,0);
				var drapeTween = this.game.add.tween(drape.cameraOffset).to({y:descendY*_i},400+(_i*1.65),Phaser.Easing.Quadratic.Out,true);
				drapeTween.onComplete.addOnce(()=> {
					i++;
					createDrape(i,drape.cameraOffset.y);
				});
			}
		}

		this.game.curtain = this.game.add.group();
		var drapeNum = 7;
		const descendY = 60;
		var i = 0;

		createDrape(i,-152); // initial call to createDrape()
	}

	curtain_up = () => {
		const dismissDrape = (_i) => {
			if (_i === curtain.length-1) {
				var drapeTween = this.game.add.tween(curtain[_i].cameraOffset).to({y:-152},200,Phaser.Linear,true);
				drapeTween.onComplete.add(()=> {
					curtain[_i].kill();
					this.game.curtain.destroy();
					return;
				});
			} else {
				var drape = curtain[_i];
				var drapeTween = this.game.add.tween(drape.cameraOffset).to({y:curtain[_i+1].cameraOffset.y},200,Phaser.Linear,true);
				drapeTween.onComplete.add(()=> {
					drape.kill();
					i++;
					dismissDrape(i);
				});
			}
		}

		var curtain = this.game.curtain.children;
		let i = 0;
		dismissDrape(i);
	}

	ratKing_addMapTile = () => {
		const props = {
			"coords": "131,80",
			"key": "mapChange",
			"stage": "kq02-badlands-00",
			"type": "mapChange",
			"questNodeId": "kq-q-ratking-1"
		}
		const badlandsMapChangeTile_1 = this.game.actions.createMapObjectForCache(1348, 546.33, 1281.82, 32, 32, props);
		const badlandsMapChangeTile_2 = this.game.actions.createMapObjectForCache(1348, 482.33, 1281.82, 32, 32, props);
		this.game.actions.setNewCacheObject("kq02-calgary-01", badlandsMapChangeTile_1);
		this.game.actions.setNewCacheObject("kq02-calgary-01", badlandsMapChangeTile_2);

		const badlandsMapChangeSprite_1 = new MapChangeSprite(null, this.game, 546.33, 1249.82, "sprites", props);
		const badlandsMapChangeSprite_2 = new MapChangeSprite(null, this.game, 482.33, 1249.82, "sprites", props);
		this.game.stagesGroup.add(badlandsMapChangeSprite_1);
		this.game.stagesGroup.add(badlandsMapChangeSprite_2);
	}

	donBraid_ratKing_switchout = () => {
		//paramters for switching out default pipeline quest info for ratKing quest
		// switch pipeline quest entry point to new place => Trudeau
		// create mapChange tile in cache and on current map
		this.ratKing_addMapTile();

		//switch Braid's questNodeId property to kq-q-ratKing-0
		let braid = this.game.actions.getCharacter('Don Braid');
		braid.data.nodeQuestId = "kq-q-ratking-0";
		// change braid's questNodeId cached property
		this.game.actions.removeFromCachedObject('Don Braid','questNodeId','kq02-calgary-01');

		//set existing red waypoint's id to kq-q-ratking
		let waypointIndex = this.game.actions.getWaypointIndex('kq-q-pipeline');
		this.game.waypointGroup.children[waypointIndex].data.questId = 'kq-q-ratking';
		this.game.waypointGroup.children[waypointIndex].activate();
		

		// set kq-q-pipeline inside Trudeau in kq02-calgary-03
		this.game.actions.addToCachedObject("Justin Trudeau",{"questNodeId":"kq-q-pipeline-0"},"kq02-calgary-03");

		// if kenney has not yet spoken with justin, keep dI at 0. Otherwise, set to 9
		var trudeauDI = this.game.cache.getTilemapData("kq02-calgary-03").data.layers[4].objects;
		let trudeauCached = trudeauDI.filter(child => {
			if (child.hasOwnProperty('properties')) return child.properties.character === "Justin Trudeau"
		})[0];
		if (trudeauCached.properties.dI !== 0) this.game.actions.setCharacterDICache("Justin Trudeau",9,"kq02-calgary-03");
	}

	donBraid_pipeline_switchout = () => {
		// setup params once pipeline quest is taken from Don Braid
		// switch Rat King quest entry point to new place => bar owner in calgary-01
		this.game.actions.addToCachedObject("Bartender",{"questNodeId":"kq-q-ratking-0"},"kq02-calgary-01");
		this.game.actions.setCharacterDICache("Bartender",1,"kq02-calgary-01");
		var bartender = this.game.actions.getCharacter("Bartender");
		bartender.data.dI = 1;
		bartender.data.questNodeId = "kq-q-ratking-0";
		// create waypoint on map immediately
		this.game.mapWorld.createWaypoint("kq-q-ratking",bartender,"new");
		this.game.actions.removeFromCachedObject('Don Braid','questNodeId','kq02-calgary-01');
	}

	nenshi_questComplete = () => {
		// if player has quiz quest, update. Otherwise, hide waypoint marker over Nenshi
		if (this.game.player.data.quests.find(q => q.id === 'kq-q-quiz')) {
			//this.game.mapWorld.updateWaypoint('kq-q-quiz-1');
			this.game.player.removeQuest('kq-q-quiz');
			this.game.mapWorld.removeWaypoint('kq-q-quiz-1')
		} else {
			this.game.mapWorld.removeWaypoint('kq-q-quiz-0');
			var nenshi = this.game.actions.getCharacter('Naheed Nenshi');
			nenshi.data.questNodeId = "";
		}
		// remove quest ID from Nenshi in cache
		this.game.actions.removeFromCachedObject('Naheed Nenshi', 'questNodeId', 'kq02-calgary-01');
	}

	carbontree_quest_setup = () => {
		// add mapChange tile to mountains-00 in cache
		this.game.actions.setNewCacheObject("kq02-mountains-00", this.game.actions.createMapObjectForCache(1348, 172.67, 1286.67, 32, 32, {
			"coords": "450,133",
			"key": "mapChange",
			"stage": "kq02-forest-00",
			"type": "mapChange",
			"questNodeId":"kq-q-carbontree-2"
		}));
		this.game.actions.setNewCacheObject("kq02-mountains-00", this.game.actions.createMapObjectForCache(1348, 236.67, 1286.67, 32, 32, {
			"coords": "450,133",
			"key": "mapChange",
			"stage": "kq02-forest-00",
			"type": "mapChange",
			"questNodeId": "kq-q-carbontree-2"
		}));
		//remove nodeId from Brad Wall
		this.game.actions.removeFromCachedObject("Brad Wall","questNodeId","kq02-calgary-03");
	}

	carbontree_quest_scrum_setup = () => {
		// add Ford
		var fordData = {
			"character": "Doug Ford",
			"dI": 12,
			"id": 32,
			"name": "Doug Ford",
			"static": true,
			"type": "npc",
			"key": "npc",
			"portrait":"ford"
		}
		var ford = new NPC(this.game,1585,741,"sprites",null,fordData);
		// add media personnel
		var CBCReporterData = {
			"character": "CBC Reporter",
			"dI": 0,
			"id": 4,
			"name": "CBC Reporter",
			"static": true,
			"type": "npc",
			"key": "npc",
			"staticDir": true
		}
		var otherReporterData = {
			"character": "Other Reporter",
			"dI": 0,
			"id": 6,
			"name": "Other Reporter",
			"static": true,
			"type": "npc",
			key: "npc",
			"staticDir": true
		}
		var cbcReporter = new NPC(this.game, 1636, 949, "sprites","npc-04-mb/_01.png", CBCReporterData);
		var otherReporter = new NPC(this.game, 1604, 825, "sprites","npc-06-mb/_01.png", otherReporterData);

		var stafferData_01 = {
			"character": "Staffer 1",
			"dI":0,
			"id":62,
			"name":"Staffer 1",
			"static":true,
			"type":"npc",
			"key":"npc"
		}
		var stafferData_02 = {
			"character": "Staffer 2",
			"dI": 0,
			"id": 62,
			"name": "Staffer 2",
			"static": true,
			"type": "npc",
			"key": "npc"
		}
		var stafferData_03 = {
			"character": "Staffer 3",
			"dI": 0,
			"id": 62,
			"name": "Staffer 3",
			"static": true,
			"type": "npc",
			"key": "npc"
		}

		var staffer_01 = new NPC(this.game,1481,800,"sprites",null,stafferData_01);
		var staffer_02 = new NPC(this.game, 1716, 810, "sprites", null, stafferData_02);
		var staffer_03 = new NPC(this.game, 1448, 820, "sprites", null, stafferData_03);

		this.game.NPCGroup.add(ford);
		this.game.NPCGroup.add(cbcReporter);
		this.game.NPCGroup.add(otherReporter);
		this.game.NPCGroup.add(staffer_01);
		this.game.NPCGroup.add(staffer_02);
		this.game.NPCGroup.add(staffer_03);


		// remove camera and lights tiles from cache
		var cameraTiles_btm = {
			"1740": "0",
			"1872": "0",
			"1803": "0",
		}
		this.game.actions.changeMapTiles("kq02-calgary-01", "collision", cameraTiles_btm);

		var cameraTiles_top = {
			"1675": "0",
			"1807": "0",
			"1738": "0",
		}
		this.game.actions.changeMapTiles("kq02-calgary-01", "subforeground", cameraTiles_top);

		//Move NPC Patron 2
		var patron2 = this.game.actions.getCharacter("Belinda");
		patron2.position.setTo(1450,940);
		patron2.data.static = true;

		//pause before initialising dialogue
		this.game.player.isTalking = true;
		this.game.time.events.add(1200,() => {
			if (this.game.data.gameData.carbonTreeWinner === "kenney") {
				this.game.player.data.dI = 9;
				ford.data.dI = 16;
				this.game.dialogue.initDialogue(null,this.game.player,true);
			} else if (this.game.data.gameData.carbonTreeWinner === "ford") {
				this.game.dialogue.initDialogue(null, ford, false,null,true); // just ford talking
			}
		});


	}

	call_calgary_scrum = (_winner) => {
		// this.game.currentCharacter = "jasonKenney";
		// this.game.startingPosition = [1647, 741];
		// this.game.currentStage = 'kq02-calgary-01';
		// this.game.stageInitFunction[0] = this.game.npcFunctions.carbontree_quest_scrum_setup;

		// add camera tiles temporarily to cache so they're created on next stage load
		var cameraTiles_btm = {
			"1740":"2952",
			"1872": "2952",
			"1803": "2952",
		}
		this.game.actions.changeMapTiles("kq02-calgary-01","collision",cameraTiles_btm);

		var cameraTiles_top = {
			"1675": "2951",
			"1807": "2951",
			"1738": "2951",
		}

		this.game.data.gameData.carbonTreeWinner = _winner;

		this.game.actions.changeMapTiles("kq02-calgary-01", "subforeground", cameraTiles_top);
		this.game.mapWorld.changeStage(null,{targetMap:"kq02-calgary-01",targetPosition: "1647,741"},"carbontree_quest_determineSetup_winner");
	}

	carbontree_quest_determineSetup_winner = () => {
		this.carbontree_quest_scrum_setup();
	}

	carbontree_quest_determineSetup_loser = () => {
		this.carbontree_quest_scrum_setup();
	}

	ford_exits_scrum = () => {
		// remove trigger for carbonTree quest in Calgary
		this.game.actions.removeCacheObject('kq02-calgary-01',['type','trigger'],['questNodeId','kq-q-carbontree-4']);
		// ford walks off as minions clap at reporters
		// must add supporters
		this.game.player.isTalking = true;
		var dofo = this.game.actions.getCharacter("Doug Ford");
		this.game.actions.walkTo(dofo,{y:790},500,120,()=>{
			this.game.actions.walkTo(dofo,{x:1763},1200,null,()=>{
				this.game.actions.walkTo(dofo,{y:400},1600,600,()=>{ // once Ford exits, restart stage
					if (this.game.data.players.jasonKenney.crystals.length >= 2) {
						this.game.stageInitFunction = "call_deities_two_crystals";
					}
					this.game.musicHandler.stop();
					this.game.currentStage = "kq02-calgary-01";
					this.game.currentPosition = [1560,780];
					this.game.camera.fade('#000000');
					this.game.camera.onFadeComplete.addOnce(() => { // stage fadeOut onComplete
								this.game.state.start("Game");
							});
					//this.game.mapWorld.changeStage(null,{targetMap:"kq02-calgary-01",targetPosition:"1647,741"});
				});
			});
		});
		// clap sfx
		this.game.dialogue.alert('STAFFERS: *Clap* *clap* *clap* *clap*', 'acquired');
		this.game.sfx.play('sfx_clapping');

		//sfx required

		var staffer1 = this.game.actions.getCharacter("Staffer 1");
		var staffer2 = this.game.actions.getCharacter("Staffer 2");
		var staffer3 = this.game.actions.getCharacter("Staffer 3");
		staffer1.animations.play('celebrate');
		staffer2.animations.play('celebrate');
		staffer3.animations.play('celebrate');
		this.game.time.events.add(3000,() => {
			this.game.dialogue.alert('*clap* *clap* *clap* *clap*', 'acquired');
			// this.game.sfx.play('sfx_clapping');
		});

		// on stage restart, set smog clouds to appear in Calgary and Kenney to comment...

	}

	createNewPipelineCalgaryTrigger = () => {
		this.game.time.events.add(10000,()=>{
			let trigger = this.game.triggerGroup.getFirstExists(false);
			trigger.reset(489,951);
			trigger.anchor.set(0.5);
		});
	}

	pipeline_quest_returnToCalgary = () => {
		this.game.player.isTalking = true;
		this.game.startingPosition = [500,1100];
			this.game.currentStage = 'kq02-calgary-03';
			this.game.musicHandler.stop();
			this.game.camera.fade('#000000');
			this.game.camera.onFadeComplete.addOnce(() => { // stage fadeOut onComplete
				this.game.state.start("Game");
			});
	}

	pipeline_quest_node_2 = () => {
		if (this.game.player.currentActiveQuestNode('kq-q-pipeline-2',2)) {
			
			// set oil executives' new DI
			this.game.actions.setCharacterDICache("Oil Executive 2",1,"kq02-calgary-03");
			this.game.actions.setCharacterDICache("Oil Executive 3", 1, "kq02-calgary-03");

			// // replace trigger one this space in map cache
			this.game.actions.setNewCacheObject("kq02-mountains-01",this.game.actions.createMapObjectForCache(0,834.67,1313.33,64,64,{
				"once": true,
				"questNodeId":"kq-q-pipeline-4",
				"initFunction":"place_valveWheel",
				"type":"trigger"
			}));
			
			this.game.player.data.dI = 15;
			this.game.dialogue.initDialogue(null,this.game.player,false);
		}

		// check for active node
		//if () {
			// var msg = "To open pipeline, insert VALVE WHEEL here. VALVE WHEELs are the responsibility of oil company representatives in Calgary. Please speak with one if you wish to obtain a VALVE WHEEL.";
			// this.game.dialogue.sign(msg,'sign');
			// // replace trigger one this space in map cache
			// this.game.actions.setNewCacheObject("kq02-mountains-01",this.game.actions.createMapObjectForCache(0,834.67,1313.33,64,64,{
			// 	"once": true,
			// 	"questNodeId":"kq-q-pipeline-4",
			// 	"initFunction":"place_valveWheel",
			// 	"type":"trigger"
			// }));
			// // set oil executives' new DI
			// this.game.actions.setCharacterDICache("Oil Executive 2",1,"kq02-calgary-03");
			// this.game.actions.setCharacterDICache("Oil Executive 3", 1, "kq02-calgary-03");
			//}
	}

	valveWheel_recovered = () => {
		// remove questNodeId from npcs with it?
	}

	call_deities_two_crystals = () => {
		// thatcher and klein appear to summon you to your council once two crystals have been acquired
		// set XY coords for each deity based on currentMap
		// set music to pantheon
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.musicHandler.stop();
		this.game.musicHandler.setMusic('kq02-pantheon-00');
		let thatcherPos = [0,0];
		let kleinPos = [0,0];
		switch (this.game.currentStage) {
			case "kq02-calgary-01": //carbonTree end
				thatcherPos = [1527,764];
				kleinPos = [1643,763];
				this.game.globalAchievements.hoodedFigure = "Freddie Mercury";
				break;
				case "kq02-mountains-00": //pipeline end
				thatcherPos = [484,260];
				kleinPos = [592,262];
				this.game.globalAchievements.hoodedFigure = "Rona Ambrose";
				break;
				case "kq02-badlands-01": //ratKing end
				thatcherPos = [416,226];
				kleinPos = [534,227];
				this.game.globalAchievements.hoodedFigure = "Bill Aberhart";
				break;
			}
		this.game.data.gameData.globalAchievements.hoodedFigure = this.game.globalAchievements.hoodedFigure;
		let thatcher = this.game.actions.enterDeity({
			character: 'Margaret Thatcher',
			id: 15,
			portrait: 'thatcher',
			dI: 6
		}, thatcherPos[0], thatcherPos[1], "blue", true);
		let klein = this.game.actions.enterDeity({
			character: 'Ralph Klein',
			id: 14,
			portrait: 'klein',
			dI: 4
		}, kleinPos[0], kleinPos[1], "blue");
		this.game.player.frameName = "hero-mf/_01.png";
	}

	return_kenney_to_base_before_edmonton = () => {
		// stage change to kq02-calgary-00
		this.game.musicHandler.stop();
		this.game.mapWorld.changeStage(null,{
			targetPosition:"480,525",
			targetMap:"kq02-calgary-00"
		},"setup_edmonton_journey");
	}

	before_edmonton_enter_companions = () => {
		// enter Aheer and Nixon to calgary-00
		var aheerData = {
			character:"Leela Aheer",
			id: 31,
			portrait:"aheer",
			dI: 4
		}
		var nixonData = {
			character:"Jason Nixon",
			id: 17,
			portrait:"Nixon",
			dI:1
		}
	}

	setup_edmonton_journey = () => {
		// remove all quests
		this.game.player.data.quests = [];
		this.game.data.players.jasonKenney.quests = [];
		// remove mapChange tiles from calgary-01
		this.game.actions.removeCacheObject("kq02-calgary-01",["key","mapChange"],["stage","kq02-mountains-00"]);
		this.game.actions.removeCacheObject("kq02-calgary-01", ["key", "mapChange"], ["stage", "kq02-mountains-00"]);
		this.game.actions.removeCacheObject("kq02-calgary-01", ["key", "mapChange"], ["stage", "kq02-mountains-00"]);
		this.game.actions.removeCacheObject("kq02-calgary-01", ["key", "mapChange"], ["stage", "kq02-badlands-00"]);
		this.game.actions.removeCacheObject("kq02-calgary-01", ["key", "mapChange"], ["stage", "kq02-badlands-00"]);

		// change atlas
		this.game.atlas['kq02-calgary-01'].nodes = ['kq02-calgary-00', 'kq02-calgary-03', 'kq02-caves-00'];

		//clear all quests and inventory
		this.game.player.data.quests = [];
		this.game.data.players.jasonKenney.quests = [];
		this.game.player.data.inventory = [];
		this.game.data.players.jasonKenney.inventory = [];

		// set up dialogue threads for key NPCs and clear all NPC quest nodes
		this.game.actions.removeFromCachedObject("Brad Wall","questNodeId","kq02-calgary-03");
		this.game.actions.setCharacterDICache("Brad Wall",9,"kq02-calgary-03");
		this.game.actions.removeCacheObject("kq02-calgary-03",["character","Justin Trudeau"]);
		this.game.actions.removeFromCachedObject("Bartender", "questNodeId", "kq02-calgary-01");
		this.game.actions.removeFromCachedObject("Don Braid", "questNodeId", "kq02-calgary-01");

		// set up Fildebrandt in calgary-03
		var fildebrandtData = {
			x: 512,
			y: 545,
			properties: {
				character: "Derek Fildebrandt",
				dI: 0,
				id: 33, // change
				key: "npc",
				name: "Derek Fildebrandt",
				portrait: "fildebrandt",
				static: true,
				type: "npc",
				questNodeId: "kq-q-fildebrandtpath-0"
			}
		}
		this.game.actions.setNewCacheObject("kq02-calgary-03",fildebrandtData);
		//set Starke dI based on whether Kenney has spoken with him
		var starkeDI = this.game.globalAchievements.starkeConvo?3:4;
		this.game.actions.setCharacterDICache("Richard Starke",starkeDI,"kq02-calgary-03");
		// create starke questNodeId
		this.game.actions.addToCachedObject("Richard Starke",{'questNodeId':'kq-q-starkepath-0'},'kq02-calgary-03');
		// set means of choosing Aheer or Nixon as companion
		//remove aheer and nixon cached in calgary-01
		this.game.actions.removeCacheObject("kq02-calgary-01",["character","Leela Aheer"],["portrait","aheer"]);
		this.game.actions.removeCacheObject("kq02-calgary-01", ["character", "Jason Nixon"], ["portrait", "nixon"]);

		// initialise dialogue with scene's first speaker => Harper? Kenney?
		var harper = this.game.actions.getCharacter("Stephen Harper");
		harper.data.dI = 7;
		this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Stephen Harper"),false);
	}

	enter_companions = () => {
		this.game.player.isTalking = true;
		var aheerData = {
			character:"Leela Aheer",
			dI: 0,
			id:31,
			key:"npc",
			name:"Leela Aheer",
			portrait: "aheer",
			static: true,
			type:"npc"
		}
		var nixonData = {
			character: "Jason Nixon",
			dI: 0,
			id: 17,
			key: "npc",
			name: "Jason Nixon",
			portrait: "nixon",
			static: true,
			type: "npc"
		}
		var sPos = [480,610];
		var aheer = new NPC(this.game,sPos[0],sPos[1],"sprites","",aheerData);
		var nixon = new NPC(this.game,sPos[0],sPos[1],"sprites","",nixonData);
		this.game.NPCGroup.add(aheer);
		this.game.NPCGroup.add(nixon);
		this.game.actions.walkTo(aheer,{x:330,y:400},1800,0,null,true);
		this.game.actions.walkTo(nixon,{x:638,y:400},1800,200,()=>{
			// init next dialogue
			this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Stephen Harper"),false);
		},true);
	}

	choose_companion = (_companion) => {
		const companion = this.game.actions.getCharacter(_companion);
		this.game.data.companion = companion.data;
		this.game.data.players.jasonKenney.hasCompanion = true;
		this.game.data.companion.isCompanion = true;
		this.game.data.companion.isFollowing = false;
		this.game.data.companion.isFollowing = true;
		//this.set_companion_to_follow();
		// set dI for leela and nixon
		let aheer = this.game.actions.getCharacter("Leela Aheer");
		let nixon = this.game.actions.getCharacter("Jason Nixon");
		aheer.data.dI = _companion === aheer?3:4;
		nixon.data.dI = _companion === nixon ?1:2;
		this.game.stageInitFunction = null;
	}

	set_companion_dI = (_dI) => {
		this.game.data.companion.dI = _dI;
	}

	set_companion_to_follow = () => {
		this.game.data.companion.isFollowing = true;
	}

	clear_pathNodes = () => {
		// remove fildebrandt and starke path nodes from calgary-03
		this.game.mapWorld.removeWaypoint('kq-q-fildebrandtpath-0');
		this.game.mapWorld.removeWaypoint('kq-q-starkepath-0');
		this.game.actions.removeFromCachedObject("Derek Fildebrandt","questNodeId","kq02-calgary-03");
		this.game.actions.removeFromCachedObject("Richard Starke", "questNodeId", "kq02-calgary-03");
	}

	fildebrandt_edmonton_path = () => {
		// remove kq-q-edmontonjourney from player
		this.game.data.players.jasonKenney.quests = [];
		this.game.tData("edmontonPath","fildebrandt");
		// set initFunction to begin scene on stage load
		// move to airship-00 stage
		this.game.mapWorld.changeStage(null, {
			targetMap: 'kq02-airship-00',
			targetPosition: '478,646'
		},"set_airship_stage_1_to_launch");
	}

	starke_edmonton_path = () => {
		// set fildebrandt dI to non-quest-entrypoint
		var fildebrandt = this.game.actions.getCharacter("Derek Fildebrandt");
		fildebrandt.data.dI = 1;
		this.game.actions.setCharacterDICache('Derek Fildebrandt',1,'kq02-calgary-03');
		//create changeMap tile on calgary-01 over door to cave in City Hall
		this.game.actions.setNewCacheObject("kq02-calgary-01", this.game.actions.createMapObjectForCache(1348, 1585, 530, 32, 32, { // maybe require a stageInitFunction?
			"coords": "1055,2482",
			"key": "mapChange",
			"stage": "kq02-caves-00",
			"type": "mapChange",
			"questNodeId":"kq-q-edmontonjourney-2"
		}));
		this.game.tData("edmontonPath","starke");
		this.game.mapWorld.createWaypoint('kq-q-edmontonjourney',this.game.stagesGroup.children[0],'active');
		this.game.mapWorld.updateWaypoint('kq-q-edmontonjourney-1');
		this.game.quests['kq-q-edmontonjourney'].nodes[0].complete = true;
		this.clear_pathNodes();
	}

	edmonton_setup_pride = () => {
		// add pride revelers to group and animate them celebrating
	}

	set_airship_stage_1_to_launch = () => {
		this.game.stageInitFunction = "setup_airship_stage_1";
	}

	setup_airship_stage_1 = () => {
		// place fildebrandt and two pirates
		var fildebrandtData = {
			x: 608,
			y: 930,
			properties: {
				character: "Derek Fildebrandt",
				dI: 8, // wherever this will begin
				id: 33, // change
				key: "npc",
				name: "Derek Fildebrandt",
				portrait: "fildebrandt",
				static: true,
				type: "npc"
			}
		}
		const pirate_1_data = {
			x: 416,
			y:530,
			properties: {
				character: "Max",
				dI: 0,
				id: 37,
				key:"npc",
				name:"Max",
				static: false,
				type:"npc"
			}
		}
		const pirate_2_data = {
			x: 350,
			y: 1220,
			properties: {
				character: "Lloyd",
				dI: 0,
				id: 37,
				key: "npc",
				name: "Lloyd",
				static: false,
				type: "npc"
			}
		}

		const pirate_3_data = {
			x: 610,
			y:1100,
			properties: {
				character: "Hippolye the Scurvy-Ridden Taxpayer",
				dI: 1,
				id: 37,
				key: "npc",
				name: "Hippolye the Scurvy-Ridden Taxpayer",
				static: true,
				type: "npc"
			}
		}
		var fildebrandt = new NPC(this.game,fildebrandtData.x,fildebrandtData.y,"sprites","",fildebrandtData.properties);
		var pirate1 = new NPC(this.game, pirate_1_data.x, pirate_1_data.y, "sprites", "", pirate_1_data.properties);
		var pirate2 = new NPC(this.game, pirate_2_data.x, pirate_2_data.y, "sprites", "", pirate_2_data.properties);
		var pirate3 = new NPC(this.game, pirate_3_data.x, pirate_3_data.y, "sprites", "", pirate_3_data.properties);
		// convo leads to fildebrandt game
		this.game.dialogue.initDialogue(null,filderandt,false);
	}

	edmonton_initDisguises = () => {
		var hipster = '-hipster';
		this.game.data.players.jasonKenney.portrait = "kenney"+hipster;
		this.game.data.players.jasonKenney.inDisguise = true;
		if (this.game.data.companion.hasOwnProperty('portrait')) {
			var companionName = this.game.data.companion.portrait;
			this.game.data.companion.portrait = companionName+hipster;
			this.game.data.companion.dI = 8;
			this.game.data.companion.id = companionName === "aheer"?50:49;
		}

		// change default sprites for player and companion


		//restart map
		// this.game.startingPosition = [this.game.player.x,this.game.player.y];
		this.game.musicHandler.stop();
		var changeStage = {
			"targetMap":this.game.currentStage,
			"targetPosition": `${this.game.player.x},${this.game.player.y}`
		}
		this.game.mapWorld.changeStage(null, changeStage, "ndp_palace02_changeStageCall_Setup");
	}

	ndp_palace02_changeStageCall_Setup = () => {
		this.game.stageDismissFunction[0] = this.ndp_palace02_changeStageCall;
	}

	edmonton_arrival_setup_dismissFunction = () => {
		//this.game.stageInitFunction[0] = this.edmonton_arrival_setup;
		this.game.stageInitFunction = "edmonton_arrival_setup";
	}

	edmonton_triggers = (_function,_num,_yStart) => {
		// lay down triggers for ndp bubblezone sequence
		const tilesNum = _num;
		const xStart = 0;
		const tileData = {
			initFunction: _function,
			once: true,
			type: "trigger"
		}
		for (let i = 0; i < tilesNum; i++) {
			const trigger = new Trigger(this.game, xStart + (i * 64), _yStart, "sprites", "trigger.png", tileData);
			this.game.triggerGroup.add(trigger);
			
		}
	}

	edmonton_ndp_cutscene = () => {
		// change music - NDP dance theme
		var notley = this.game.actions.getCharacter('Rachel Notley');
		notley.animations.add('dance', Phaser.Animation.generateFrameNames(`npc-16-pride-cel/_0`, 1, 2, '.png'), 3, true);
		notley.animations.play('dance');
		this.game.musicHandler.stop();
		this.game.musicHandler.play('song-ndp');
		this.game.player.body.velocity.set(0);
		this.game.player.isTalking = true;
		this.game.camera.follow(null);
		var camTween = this.game.add.tween(this.game.camera).to({x:610-(this.game.camera.width/2),y:547-(this.game.camera.height/2)},2000,null,true);
		camTween.onComplete.add(()=>{
			notley.data.dI = 7; // or whatever this will be
			this.game.dialogue.initDialogue(null,notley,false,null,true);
		});
	}

	edmonton_ndp_cutscene_end = () => {
		this.game.player.isTalking = true;
		var notley = this.game.actions.getCharacter('Rachel Notley');
		notley.animations.play('dance');
		this.game.musicHandler.stop();
		this.game.musicHandler.setMusic(this.game.currentStage);
		this.game.camera.follow(this.game.player);
		
		// kenney talks to companion after returning from rachel on stage
		var companion = this.game.actions.getCompanion();
		companion.data.dI = 16;
		this.game.dialogue.initDialogue(null,companion,false);
	}

	edmonton_arrival_setup = () => {
		// get revellers and NDP dancing
		
		var revellers = this.game.NPCGroup.children.filter(npc => npc.data.character === "Reveller");
		revellers.forEach(reveller => {
			reveller.animations.play('celebrate');
		});
		//notley,jansen,phillips,shepherd,ceci,anderson
		var notley = this.game.actions.getCharacter('Rachel Notley');
		notley.animations.play('dance');
		// var jansen = this.game.actions.getCharacter('Sandra Jansen');
		// jansen.animations.play('celebrate');
		var phillips = this.game.actions.getCharacter('Shannon Phillips');
		phillips.animations.play('celebrate');
		var danielle = this.game.actions.getCharacter('Danielle Larivee');
		danielle.animations.play('celebrate');
		var anderson = this.game.actions.getCharacter('Shaye Anderson');
		anderson.animations.play('celebrate');
		var shepherd = this.game.actions.getCharacter('David Shepherd');
		shepherd.animations.play('celebrate');
		if (!this.game.globalAchievements.edmonton_ndp_cutscene) {
			this.game.globalAchievements.edmonton_ndp_cutscene = true;
			this.edmonton_triggers("edmonton_ndp_cutscene",16,866);
		}
	}

	finalBattle_talkToSoldier = () => {
		this.game.player.isTalking = true;
		var soldier = this.game.actions.getCharacter("Dying UCP Soldier");
		soldier.animations.play('wounded');
		this.game.time.events.add(1200,()=> {
			this.game.actions.walkTo(this.game.player,{x:356},1000,0,()=>{
				this.game.dialogue.initDialogue('right',soldier,false);
			});
		});
	}

	finalBoss_set_trigger_setup = () => {
		//this.game.stageDismissFunction[0] = this.finalBoss_trigger_setup;
		//set rachel notley
		this.game.globalAchievements.finalStage = true;
		const notleyData = {
			x:660,
			y:290,
			properties: {
				character:"Rachel Notley",
				id:16,
				dI: 8, //or whatever this becomes
				key: "npc",
				name: "Rachel Notley",
				portrait: "notley",
				static: true,
				type:"npc"
			}
		}
		this.game.actions.setNewCacheObject("kq02-edmonton-01",notleyData);
		// set Invisible Hand creation trigger (hand created when player arrives on final map)
		//450,1340 where player starts
		const triggerObj = {
			x:450,
			y:1340,
			properties: {
				initFunction:"invisibleHand_setup",
				once: true,
				type: "trigger",
				leaveInCache:true
			}
		}
		this.game.actions.setNewCacheObject("kq02-edmonton-01",triggerObj);

		//remove stageChange tiles
		for (let i=0;i<5;i++) {
			this.game.actions.removeCacheObject('kq02-edmonton-01',['key','mapChange'],['stage','kq02-edmonton-00']);
		}
	}

	finalBoss_setStageMusic = () => {
		this.game.musicHandler.stop();
		this.game.musicHandler.play('theme-dungeon');
	}

	// finalBoss_trigger_setup = () => {
	// 	// lays down triggers on edmonton-01 to trigger boss battle
	// 	this.game.stageInitFunction[0] = this.edmonton_triggers("finalBoss_launch_battle",12,530);
	// }

	finalBoss_launch_battle = () => {
		// start battle with the Hand
		this.game.player.body.velocity.set(0);
		this.game.player.isTalking = true;
		this.game.player.cameraBounds = true;
		this.game.actions.removeCacheObject('kq02-edmonton-01', ['initFunction', 'invisibleHand_setup'], ['type', 'trigger']);
		this.game.actions.removeCacheObject('kq02-edmonton-01',['initFunction','finalBoss_launch_battle'],['type','trigger']);
		this.game.actions.walkTo(this.game.player,{x:this.game.world.width/2,y:300},1200,0,()=>{
			//this.game.camera.follow(null);
			//launch dialogue leading to boss fight
			this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Rachel Notley"),false); // dI set in cache creation
		});
	}

	finalBoss_endCutscene = () => {
		//this.game.camera.follow(this.game.player);
		//start final boss cutscene
		// const notley = this.game.actions.getCharacter('Rachel Notley');
		// notley.destroy();
		// launch battle
		// this.game.enemyGroup.children[0].destroy();
		// this.game.enemyGroup.children[0].destroy();
		// this.game.enemyGroup.children[0].destroy();
		const hand = this.game.enemyGroup.children[0];
		this.game.bossFight = new BossFight(this.game, hand, 'invisible-hand');
		// MAY REMOVE THIS .... WHATEVER THIS HELL THIS IS
		//this.game.objGroup.children[0].destroy();
		hand.startBattle();
	}

	finalBoss_lungeForCrystal = () => {
		this.game.player.isTalking = true;
		var notley = this.game.actions.getCharacter("Rachel Notley");
		notley.animations.play("show-crystal");
		this.game.sfx.play('sfx_sword_shine');
		this.game.time.events.add(600,()=>{
			var kenneyTween = this.game.add.tween(this.game.player.position).to({x:notley.x-38,y:notley.y},400,Phaser.Easing.Quadratic.In,true);
			kenneyTween.onComplete.add(()=>{
				kenneyTween.onComplete.removeAll();
				this.game.player.animations.play("attack-left");
				this.game.sfx.play('sfx_break');
				notley.frameName = "npc-16-mf/_01.png";
				var flashScreen = this.game.add.graphics();
				flashScreen.beginFill(0xffffff,1);
				flashScreen.drawRect(0,0,this.game.camera.width,this.game.camera.height);
				flashScreen.endFill();
				flashScreen.alpha = 0;
				flashScreen.fixedToCamera = true;
				this.game.world.add(flashScreen);
				this.game.flash(flashScreen,true)
				this.game.time.events.add(700,() => {
					flashScreen.destroy();
					kenneyTween.to({x:this.game.world.width/2,y:300},400,Phaser.Easing.Quadratic.Out,true);
					this.game.add.tween(notley.position).to({x:800},150,null,true);
					// remove Hand forcefield
					this.game.enemyGroup.children[0].destroy();
					this.game.enemyGroup.children[0].destroy();
					this.game.enemyGroup.children[0].destroy();
					kenneyTween.onComplete.add(()=>{
						kenneyTween.onComplete.removeAll();
						this.game.camera.follow(null);
						this.game.dialogue.initDialogue(null,notley,false);
					});
				});

			});
		});
	}

	finalBoss_notleyRuns = () => {
		this.game.player.isTalking = true;
		var notley = this.game.actions.getCharacter("Rachel Notley");
		var notleyTween = this.game.add.tween(notley.position).to({y:this.game.camera.height+36},650,null,true);
		notleyTween.onComplete.addOnce(()=>{
			notley.destroy();
			var invisibleHand = {
				data: {
					name: "The Invisible Hand",
					dI: 2,
					character: "The Invisible Hand"
				}
			}
			this.game.dialogue.initDialogue(null,invisibleHand,false);
		});
	}

	finalBoss_restart = () => {
		// recreate invisible hand on stage load as it's not in cache
		var notley = this.game.actions.getCharacter('Rachel Notley');
		notley.kill();
		this.invisibleHand_setup();
		this.game.triggerGroup.children.forEach(trigger => trigger.destroy());
		this.game.camera.follow(null);
		this.game.musicHandler.stop();
		//this.game.musicHandler.play('boss-main');
		this.game.time.events.add(800,() => {
			this.game.player.position.set(this.game.world.width / 2, 300);
			this.game.enemyGroup.children[0].destroy();
			this.game.enemyGroup.children[0].destroy();
			this.game.enemyGroup.children[0].destroy();
			this.game.triggerGroup.children.forEach(trigger => trigger.destroy());
			this.game.triggerGroup.children = [];
			const hand = this.game.enemyGroup.children[0];
			this.game.bossFight = new BossFight(this.game, hand, 'invisible-hand');
			hand.startBattle();
		});
	}

	end_invisibleHand_bossFight = (_boss) => {
		_boss.death();

		var posTween = this.game.add.tween(_boss.position).to({x:this.game.world.width/2,y:this.game.camera.height/2},1200,Phaser.Linear,true);

		posTween.onComplete.add(()=>{
			_boss.body.velocity.set(0);
			this.game.camera.shake(0.0025,3000);
			var fadeOutScreen = this.game.add.graphics();
			fadeOutScreen.beginFill(0xffffff,1);
			fadeOutScreen.drawRect(0,0,this.game.camera.width,this.game.camera.height);
			fadeOutScreen.endFill();
			fadeOutScreen.alpha = 0;
			fadeOutScreen.fixedToCamera = true;
			this.game.world.add(fadeOutScreen);
			var fadeOutTween = this.game.add.tween(fadeOutScreen).to({alpha:1},3000,Phaser.Linear,true);
			fadeOutTween.onComplete.add(()=>{
				// go to ending determination
				// remove notley from cache
				this.game.actions.removeCacheObject('kq02-edmonton-01',['type','npc'],['character','Rachel Notley']);
				//this.game.time.events.stop(_boss.explosionTimer);
				this.end_determine_ending();
			});
		});
		// as boss explodes, screen grows white. At end, set ending scene
	}

	end_determine_ending = () => {
		// calculate variables to determine which ending to go to. Endings will each have own function that sets up stage in kq02-edmonton-01 by adding relevant sprites to cache. Stage is then reset.
		// post victory music of some sort before main fanfare begins

		

		let ending = ""
		if (this.game.globalAchievements.score >= 2) {
			ending = "end_ucp_victory";
		} else if (this.game.globalAchievements.score > -2 && this.game.globalAchievements.score < 2) {
			ending = "end_centrist_victory";	
		} else if (this.game.globalAchievements.score <= -2) {
			ending = "end_ndp_victory";
		}
		this.game.tData("ending",ending);
		this.game.startingPosition = [this.game.player.x,346];
		this.game.camera.fade(0xffffff);
		this.game.camera.onFadeComplete.addOnce(() => { // stage fadeOut onComplete
			this.game.camera.onFadeComplete.removeAll();
			this.game.musicHandler.stop();
			this.game.stageInitFunction = ending;
			this.game.time.events.removeAll();
			this.game.state.start("Game");
		});
	}

	invisibleHand_setup = (_x, _y, _data) => { //482, 1440 = supplied params for hand in palace 
		var x = _x || 482; // x & y = supplied param or defaults to param for finalBoss
		var y = _y || 1340; 
		
		if (this.game.currentStage === 'kq02-edmonton-01') {
			x = 482;
			y = 190;
			this.edmonton_triggers("finalBoss_launch_battle",14,530);
		}

		//params for palace-00: 482,1340
		//parms for final boss: 470,480
		var data = _data !== undefined?_data:0;
		
		var shadow = this.game.add.graphics(x, y-30);
		shadow.beginFill(0x000000, 0.35);
		shadow.drawCircle(0, 0, 120);
		shadow.endFill();

		var shadowTween = this.game.add.tween(shadow).to({
			height: 180,
			width: 180
		}, 2200, Phaser.Easing.Linear.None, true, 0, -1);
		shadowTween.yoyo(true);

		var glow = this.game.add.graphics(x, y-100);
		glow.beginFill(0xef6b13, 0.65);
		glow.drawCircle(0, 0, 300);
		glow.endFill();

		var glowTween = this.game.add.tween(glow).to({
			height: 260,
			width: 260
		}, 2200, Phaser.Easing.Linear.None, true, 0, -1);
		glowTween.yoyo(true);

		var glow2 = this.game.add.graphics(x, y - 100);
		glow2.beginFill(0xf28841, 0.35);
		glow2.drawCircle(0, 0, 330);
		glow2.endFill();

		var glow2Tween = this.game.add.tween(glow2).to({
			height: 300,
			width: 300
		}, 1600, Phaser.Easing.Linear.None, true, 50, -1);
		glow2Tween.yoyo(true);

		// create Hand
		var invisibleHand = new InvisibleHand(this.game, x,y, "bosses-atlas", null,data);
		invisibleHand.tweens = {};
		invisibleHand.tweens.handTween = this.game.add.tween(invisibleHand.position).to({
			y: y+15
		}, 2200, Phaser.Easing.Linear.None, true, 0, -1);
		invisibleHand.tweens.handTween.yoyo(true);
		invisibleHand.animations.play('prone');

		// add invisible hand stuff to enemyGroup
		this.game.enemyGroup.add(shadow);
		this.game.enemyGroup.add(glow);
		this.game.enemyGroup.add(glow2);
		this.game.enemyGroup.add(invisibleHand);

	}

	edmonton_jerseyAcquireFromSimons = () => {
		//will require new quest thread for this channel
		if (!this.game.player.hasItem('Oilers jersey')) {
			this.edmonton_acquireJersey();
			// create quest
			this.game.player.addQuest('kq-q-jersey',true);
			
			// poop!
			this.game.mapWorld.createWaypoint('kq-q-jersey',this.game.stagesGroup.children[0],'active') //questId, target, status
			// set kq-q-jersey-2 in kqo2-edmonton-01
			// set ravi so his quest is no longer available and convo route defaults to a comment on jersey ?

		}
	}

	edmonton_addFrontGateTileData = () => {
		//remove kq-q-environment-3 from Noah and cached Noah
		var noah = this.game.actions.getCharacter("Noah");
		noah.data.questNodeId = "";
		this.game.actions.removeFromCachedObject("Noah","questNodeId","kq02-edmonton-00");

		this.game.stagesGroup.children[1].data.questNodeId = 'kq-q-environment-3';
		this.game.stagesGroup.children[1].data.initFunction = "edmonton_setPalaceArrival";
		// this.game.mapWorld.addWaypoint(this.game.stagesGroup.children[0], 'kq-q-environment-3');
		// this.game.mapWorld.waypointNodeGroup.push(this.game.stagesGroup.children[0]);
		var props = {
			"questNodeId" : "kq-q-environment-3",
			"coords":"465,1800",
			"key":"mapChange",
			"stage":"kq02-palace-00",
			"type":"mapChange",
			"initFunction" : "edmonton_setPalaceArrival"
		}
		//this.invisibleHand_setup(482,1340)
		this.game.stagesGroup.children[0].destroy();
		this.game.actions.setMapChangeProps("kq02-palace-00",props,"kq02-edmonton-00");
		this.game.mapWorld.updateWaypoint("kq-q-environment-2");

		// set Deron Bilous and Joe Ceci to respond in some way
		var bilous = this.game.actions.getCharacter("Deron Bilous");
		var ceci = this.game.actions.getCharacter("Joe Ceci");
		bilous.data.dI = 5;
		ceci.data.dI = 5;
		this.game.actions.setDICache(bilous,this.game.currentStage);
		this.game.actions.setDICache(ceci, this.game.currentStage);
	}

	edmonton_talkToNoah = (_dI) => {
		const noah = this.game.actions.getCharacter("Noah");
		noah.data.dI = _dI;
		this.game.mapWorld.updateWaypoint('kq-q-environment-2');
	}

	edmonton_createWellEntrance = () => {
		// remove Noah from cache
		this.game.actions.removeCacheObject("kq02-edmonton-00",["character","Noah"],["type","npc"]);

		const props = {
			"coords": "261,383",
			"key": "mapChange",
			"stage": "kq02-palace-00",
			"type": "mapChange",
			"questNodeId": "kq-q-environment-3",
			"initFunction": "edmonton_setPalaceArrival"
		}
		const edmontonWellMapTile = this.game.actions.createMapObjectForCache(1348, 610, 1410, 32, 32, props);
		this.game.actions.setNewCacheObject("kq02-edmonton-00", edmontonWellMapTile);

		this.edmonton_setupPalace();
		this.game.musicHandler.stop();

		this.game.startingPosition = [this.game.player.x,this.game.player.y];
		//this.game.stageInitFunction[0] = this.edmonton_setPalaceArrival;
		this.game.camera.fade('#000000');
		this.game.camera.onFadeComplete.addOnce(() => { // stage fadeOut onComplete
			this.game.state.start("Game");
		});
	}

	edmonton_setPalaceArrival = () => {
		this.game.NPCGroup.children.forEach(npc => npc.kill());
		this.game.NPCGroup.children[this.game.NPCGroup.children.length-1].revive();
		// kill all NPCs save last, which is companion
		this.game.enemyGroup.children.forEach(enemy => enemy.kill());
		this.game.stagesGroup.children.forEach(stage => stage.kill());
		//this.game.mapWorld.updateWaypoint('kq-q-environment-4');
		this.game.mapWorld.createWaypoint("kq-q-environment",this.game.objGroup.children[1],'active');

		// create triggers for cutscene

		//questId, target, status

		//create social licese crystal
		// var crystalData = {
		// 		itemFunction: "edmonton_acquireSocialLicenseCrystal",
		// 		message: "Crystal of Compassion and Social License",
		// 		objectType: "sign",
		// 		type: "object",
		// 		questNodeId: "kq-q-environment-4"
		// }
		// var crystalObj = new Obj(this.game, 466, 1030, "sprites", "", crystalData);
		this.invisibleHand_setup();
	}

	// edmonton_updateWellEntranceWaypoint = () => {
	// 	this.game.mapWorld.updateWaypoint('kq-q-environment-2');
	// }

	edmonton_clearPalaceGate = () => {
		this.game.player.isTalking = true;
		var ceci = this.game.actions.getCharacter("Joe Ceci");
		var bilous = this.game.actions.getCharacter("Deron Bilous");
		this.game.actions.walkTo(ceci,{x: this.game.world.width+32},1600,200,()=>{
			ceci.kill();
			this.game.player.isTalking = false;
		});
		this.game.actions.walkTo(bilous,{x: -32},1600,200,()=>{
			bilous.kill();
		});
		this.edmonton_setupPalace();
	} 

	edmonton_setupPalace = () => {
		// clear the palace of all npcs and create only crystalHolder and function to collect crystal from it

		this.game.cache.getTilemapData('kq02-palace-00').data.layers[4].objects.push(
			{
				x: 450,
				y: 1041,
				properties: {
					objectType: 'crystalHolder',
					type: 'object'
				}
			}
		);
				this.game.cache.getTilemapData('kq02-palace-00').data.layers[4].objects.push(
					{
						x: 454,
						y: 1030,	
						properties: {
							itemFunction: "edmonton_acquireSocialLicenseCrystal",
							message: "Crystal of Compassion and Social License",
							objectType: "sign",
							type: "object",
							questNodeId: "kq-q-environment-4"
						}
					}
				);
		const trigger_1 = {
			x: 362,
			y: 980,
			properties: {
					"initFunction": "edmonton_palaceCrystalCutscene",
			"once":true,
			type: "trigger"}
		};
		const trigger_2 = {
			x: 506,
			y: 980,
			properties: {"initFunction":"edmonton_palaceCrystalCutscene",
			"once":true,
			type: "trigger"}
		};
		this.game.cache.getTilemapData("kq02-palace-00").data.layers[4].objects.push(trigger_1);
		this.game.cache.getTilemapData("kq02-palace-00").data.layers[4].objects.push(trigger_2);
	}

	edmonton_palaceCrystalCutscene = () => {
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.actions.walkTo(this.game.actions.getCompanion(),{x:420,y:930},900,100);
		this.game.actions.walkTo(this.game.player,{x:this.game.camera.width/2,y:930},900,100,()=>{
			var companion = this.game.actions.getCompanion(22);
			this.game.dialogue.initDialogue(null,companion,false);
		})
	}

	edmonton_takeSocialLicenseCrystal = () => {
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.edmonton_acquireSocialLicenseCrystal();
	}

	edmonton_acquireEdmontonCrystal = () => {
		
	}

	edmonton_acquireSocialLicenseCrystal = () => {
		this.game.player.isTalking = true;
		this.game.player.body.velocity.set(0);
		this.game.objGroup.children[1].children[0].kill(); // 0 is sign. //1 is crystalHolder
		this.game.player.crystalAcquired("Crystal of Compassion and Social License",() => {
			// now the crystal holder
			var companion = this.game.actions.getCompanion();
			companion.data.dI = 12; // may change entry point for social license crystal collection
			this.game.dialogue.initDialogue(null,companion,false);
		});
	}

	takeEdmontonQuest = (_quest) => {
		// remove other edmonton quest
		var removeQuest = "";
		if (_quest === "kq-q-avocadotoast") {
			//removeQuest = "kq-q-environment";
			//this.game.actions.removeFromCachedObject('Gabby','questNodeId','kq02-edmonton-00');
			//var gabby = this.game.actions.getCharacter('Gabby');
			//gabby.data.dI = 1; //
			var brewpubOwner = this.game.actions.getCharacter('Brewpub Owner');
			brewpubOwner.data.dI = 1;
			this.game.actions.setDICache(brewpubOwner,"kq02-edmonton-00");
			//this.game.mapWorld.updateWaypoint('kq-q-avocadotoast-0');
			this.game.actions.addToCachedObject("Ravi, Leader of all Millennials",{"questNodeId":"kq-q-avocadotoast-3"},"kq02-edmonton-00");
			this.game.player.addQuest(_quest);
			this.game.mapWorld.updateWaypoint('kq-q-avocadotoast-1');
		} else if (_quest === "kq-q-environment") {
			//removeQuest = "kq-q-avocadotoast";
			//this.game.actions.removeFromCachedObject('Ravi, Leader of all Millennials', 'questNodeId', 'kq02-edmonton-00');
			//var ravi = this.game.actions.getCharacter('Ravi, Leader of all Millennials')
			//ravi.data.dI = 1; //
			this.game.player.addQuest(_quest);
		}
	}

	marchToWar_start = () => {
		//start music
		this.game.musicHandler.stop();
		this.game.musicHandler.play('marchToWar');
		this.game.globalAchievements.marchToWar = true; // set value to stop music from changing on scene change
		this.game.stage.disableVisibilityChange = false; // true: don't stop cutscene when window loses focus
		var manning = this.game.actions.getCharacter('Preston Manning');
		manning.data.dI = 5;
		this.game.actions.walkTo(manning,{x:460,y:360},700,100,()=>{
			this.game.dialogue.initDialogue(null,manning,false,true,true);
		},true);
	}

	marchToWar_scene0_end = () => {
		this.game.currentStage = "kq02-calgary-01";
		this.game.currentPosition = 0,0;
		this.game.stageInitFunction = "marchToWar_scene1_start";
		//remove empress bovina from scene
		this.game.actions.removeCacheObject('kq02-calgary-01',['character','Empress Bovina']);
		this.game.actions.removeCacheObject('kq02-calgary-03',['character','Richard Starke']);
		this.game.actions.removeCacheObject('kq02-calgary-03',['character','Derek Fildebrandt']);

		this.game.camera.onFadeComplete.removeAll();
		// this.game.stageInitFunction[0] = "";

		// FOR TESTING OF BATTLE STATE! CHANGE BACK TO GAME FOR FINAL!!!!!
		this.game.state.start("Game");


	}

	marchToWar_switchScene = (_x,_y) => {
		// this.game.player.isTalking = true;
		// this.game.player.alpha = 0;
		// this.game.camera.follow(null);
		this.game.camera.x = _x || 0;
		this.game.camera.y = _y || 0;
	}

	marchToWar_scene1_start = () => {
		this.game.player.isTalking = true;
		this.game.player.alpha = 0;
		this.game.camera.follow(null);
		//this.marchToWar_switchScene(this.game.world.width / 2 - (this.game.camera.width / 2) - 150)
		this.marchToWar_switchScene(200);

		this.game.add.tween(this.game.camera).to({x:1400},7600,null,true);
		this.game.musicHandler.setVolume(0.5);
		this.game.sfx.play('sfx_horn');

		// npc reaction: Amelia
		this.game.time.events.add(1800,() => {
			var ava = this.game.actions.getCharacter("Ava");
			this.game.actions.jump(ava,250,0,() => {
				this.game.actions.walkTo(ava,{x:300},1600,200);
			});
		});

		this.game.time.events.add(3200, () => {
			var amelia = this.game.actions.getCharacter("Amelia");
			this.game.actions.jump(amelia, 250, 0, () => {
				this.game.actions.walkTo(amelia,{x:2100},1400,200,()=>amelia.kill());
			});
		});

		//time to next scene
		this.game.time.events.add(8000,()=>{
			this.marchToWar_scene1_end();
		});
	}

	marchToWar_scene1_end = () => {
		this.game.currentStage = "kq02-calgary-03";
		this.game.stageInitFunction = "marchToWar_scene2_start";
		this.game.state.start("Game"); 
	}

	marchToWar_scene2_start = () => {
		this.game.player.isTalking = true;
		this.game.player.alpha = 0;
		this.game.camera.follow(null);
		this.marchToWar_switchScene(20,700);
		this.game.sfx.play('sfx_horn');

		this.game.add.tween(this.game.camera).to({y:480},6800,null,true);

		// executives
		this.game.time.events.add(1300,() => {
			var exec1 = this.game.actions.getCharacter("Oil Executive 2");
			this.game.actions.jump(exec1,250,0,() => {
				this.game.actions.walkTo(exec1,{y:1400},1800,200);
			});
		});

		this.game.time.events.add(1600,() => {
			var exec1 = this.game.actions.getCharacter("Oil Executive 3");
			this.game.actions.jump(exec1,250,0,() => {
				this.game.actions.walkTo(exec1,{y:1400},1600,400);
			});
		});

		this.game.time.events.add(2400,() => {
			var exec1 = this.game.actions.getCharacter("Oil Executive 4");
			this.game.actions.jump(exec1,250,0,() => {
				this.game.actions.walkTo(exec1,{y:1400},2200,300);
			});
		});

		//time to next scene
		this.game.time.events.add(7000, () => {
			this.marchToWar_scene2_end();
		});
	}

	marchToWar_scene2_end = () => {
		this.game.currentStage = "kq02-calgary-02";
		this.game.stageInitFunction = "marchToWar_scene3_start";
		this.game.state.start("Game");
	}

	marchToWar_scene3_start = () => {
		this.game.player.isTalking = true;
		this.game.player.alpha = 0;
		this.game.camera.follow(null);
		this.marchToWar_switchScene(0,780);
		this.game.sfx.play('sfx_horn');
		this.game.add.tween(this.game.camera).to({x:200,y:600},6300,null,true);

		//parks officer reaction
		this.game.time.events.add(1800,() => {
			var exec1 = this.game.actions.getCharacter("Alberta Parks Officer");
			this.game.actions.jump(exec1,250,0,() => {
				this.game.actions.walkTo(exec1,{y:1550},1100,300);
			});
		});


		// time to next scene	
		this.game.time.events.add(6500, () => {
			this.marchToWar_scene3_end();
		});
	}

	marchToWar_scene3_end = () => {

		//make notley the player for next scene
		this.game.currentCharacter = 'rachelNotley';
		this.game.musicHandler.setVolume(1);
		this.game.currentStage = "kq02-palace-00";
		this.game.stageInitFunction = "marchToWar_scene4_start";
		this.game.state.start("Game");
	}

	marchToWar_scene4_start = () => {
		this.marchToWar_switchScene(42,120);
		this.game.enemyGroup.children.forEach(enemy => enemy.kill());
		this.game.player.position.set(this.game.camera.width/2,400);

		//queen notley enters before joe ceci speaks to her
		var ceci = this.game.actions.getCharacter("Joe Ceci");
		if (ceci !== undefined) {
			ceci.data.dI = 7;
			this.game.actions.walkTo(ceci,{x:420,y:410},800,1200,()=>{
				this.game.dialogue.initDialogue(null,ceci,false,true);
			});
		}
	}

	marchToWar_scene4_end = () => {
		this.game.currentCharacter = 'jasonKenney';

		this.game.currentStage = "kq02-battle-00";
		this.game.stageInitFunction = "marchToWar_scene5_start";
		this.game.state.start("Game");
	}

	marchToWar_scene5_start = () => {
		this.game.player.position.set(this.game.world.width/2,245);
		this.game.player.isTalking = true;
		this.game.player.data.dI = 10;
		this.game.time.events.add(1100,()=>{ 
			this.game.dialogue.initDialogue(null,this.game.player,false,true);
		});
	}

	marchToWar_scene5_mountCar = () => {
		//370,200
		this.game.player.isTalking = true;
		this.game.actions.walkTo(this.game.player,{x:406,y:170},700,400,() => {
			this.game.time.events.add(500,()=>{
				this.game.player.alpha = 0;
				//drive car north, start it animating
				var truck = this.game.objGroup.children[0];
				truck.animations.play('drive-up');
				var truckTween = this.game.add.tween(truck.position).to({y:-300},1800,Phaser.Easing.Quadratic.In,true);
				truckTween.onComplete.add(()=>{
					this.marchToWar_scene5_end();
				});
			});
		});
	}

	marchToWar_allNDPOut = () => {
		for (let i=6;i<11;i++) {
			this.game.NPCGroup.children[i].kill();
		}
		this.game.NPCGroup.children.forEach(child => {
			const delay = Math.random() * (600 - 200) - 600;
			this.game.actions.walkTo(child,{x:-16,y:600},1400,delay)
		})
	}

	marchToWar_scene5_end = () => {
		this.game.stageInitFunction = null;
		this.game.state.start("Battle");
	}

	battleSequence_scene1 = () => {
		this.game.battleScene = 2;
		//this.game.camera = {x:0,y:2200};
		this.game.time.events.add(500,()=>{
			this.game.player.data.dI = 11;
			this.game.dialogue.initDialogue(null,this.game.player,false,true,true);
		});
	}

	battleSequence_scene2 = () => {
		this.game.battleScene = 3;
		var ndpGroup = this.game.world.children[4];
		var ucpGroup = this.game.world.children[5];
		ndpGroup.position.y = -500;
		ucpGroup.position.y = this.game.camera.height;
		var ndpGroupTween = this.game.add.tween(ndpGroup.position).to({y:0},10500,null,true);
		var ucpGroupTween = this.game.add.tween(ucpGroup.position).to({y:(this.game.camera.height/2)-200},10500,null,true);

		this.game.time.events.add(4000,()=>{
			this.game.camera.fade(0xffffff,4600)

			//sound effect...
		});

		this.game.camera.onFadeComplete.addOnce(()=>{
			this.game.time.events.add(600,() => {
				this.intermission_setup();
			});
		});
	}

	intermission_setup = () => {
		this.game.currentStage = "kq02-edmonton-00";
		this.game.stageInitFunction = "intermission_start";
		this.game.globalAchievements.marchToWar = false;
		this.game.state.start("Game");
	}

	intermission_start = () => {
		this.game.musicHandler.stop();
		this.game.musicHandler.play("intermission");
		this.game.player.alpha = 0;
		var simons = this.game.actions.getCharacter("Paula Simons");
		this.game.player.position.set(simons.x,simons.y);
		this.game.camera.follow(simons);
		this.game.time.events.add(1000,()=>{
			simons.data.dI = 30;
			this.game.dialogue.initDialogue(null,simons,false,false,true);
		})
	}

	setDyingUCPSoldier = () => {
		var soldier = this.game.actions.getCharacter("Dying UCP Soldier");
		soldier.frameName = 'npc-12-death/_03.png';
	}






	//////////////////////////////////////////////////////////////////////////////
	

								// UCP VICTORY //


	//////////////////////////////////////////////////////////////////////////////


	end_ucp_victory = () => {
		// silence before thatcher and klein appear
		this.game.player.isTalking = true;
		this.game.camera.follow(null);
		this.game.musicHandler.stop();
		this.end_fadeIn(() => {
			this.game.time.events.add(800,()=>{
				this.game.player.data.dI = 23;
				this.game.dialogue.initDialogue(null,this.game.player,false);
			});
		});
	}

	end_ucp_victory_enterHarper = () => {
		this.game.player.isTalking = true;
		const harperData = {
			character:'Stephen Harper',
			dI:15,
			id:10,
			key:'npc',
			name:'Stephen Harper',
			portrait:'harper',
			static: true,
			type: 'npc'
		};
		let harper = new NPC(this.game,0,300,"sprites",null,harperData);
		harper.body.collideWorldBounds = false;
		this.game.NPCGroup.add(harper);
		this.game.actions.walkTo(harper,{x:this.game.player.x},2200,0,()=>{
			this.game.musicHandler.play('theme-main');
			this.game.player.frameName = "hero-mb/_01.png";
			this.game.dialogue.initDialogue('backward',harper,false);
		});
	}

	end_ucp_victory_enterDeities = () => {
		this.game.player.isTalking = true;
		let thatcher = this.game.actions.enterDeity({character:'Margaret Thatcher',id:15,portrait:'thatcher',dI:13},this.game.camera.width/2-160,160,"blue",true);
		let klein = this.game.actions.enterDeity({character:'Ralph Klein',id:14,portrait:'klein',dI:8},this.game.camera.width/2+176,160,"blue");
	}

	end_ucp_victory_enterManning = () => {
		// enter manning and chief of staff
		this.game.player.isTalking = true;
		const cosData = {
			character:'Chief of Staff',
			dI:7,
			id:9,
			key:'npc',
			name:'Chief of Staff',
			static: true,
			type: 'npc'
		};
		const manningData = {
			character:'Preston Manning',
			dI:15,
			id:13,
			key:'npc',
			name:'Preston Manning',
			portrait:'manning',
			static: true,
			type: 'npc'
		};
		let cos = new NPC(this.game,(this.game.camera.width/2)-60,this.game.camera.height,"sprites",`npc-09-mf/_01.png`,cosData);
		let manning = new NPC(this.game,(this.game.camera.width/2)+60,this.game.camera.height,"sprites",`npc-13-mf/_01.png`,manningData);
		cos.body.collideWorldBounds = false;
		manning.body.collideWorldBounds = false;
		this.game.NPCGroup.add(cos);
		this.game.NPCGroup.add(manning);
		//this.game.actions.walkTo(manning,{y:260},1700,200);
		this.game.add.tween(manning.position).to({y:285},1700,Phaser.Linear,true);
		this.game.actions.walkTo(cos,{y:285},1700,300,() => {
			this.game.dialogue.initDialogue(null,cos,true);
		});
	}

	end_ucp_victory_enterNotley = () => {
		this.game.player.isTalking = true;
		const notleyData = {
			character:'Rachel Notley',
			dI:27,
			id:16,
			key:'npc',
			name:'Rachel Notley',
			portrait:'notley',
			static: true,
			type: 'npc'
		}


		//create dragon
        this.game.dragon = new Dragon(this.game,this.game.camera.width/2,-this.game.camera.height/2,"sprites","");
        this.game.world.add(this.game.dragon);

        // // notley position different in build for some reason. set variable to change. Default is -50
        // let notleyY = -this.game.camera.height / 2-50;

        // this.game.notley = new NPC(this.game,0,-50,"sprites","",notleyData);
		this.game.notley = new NPC(this.game,0,-50,"sprites","",notleyData);
		this.game.notley.body.collideWorldBounds = false;
        this.game.dragon.addChild(this.game.notley);

        //set notley behind dragon's head and jaw
       const temp = this.game.dragon.children[12];
       this.game.dragon.children[12] = this.game.dragon.children[13];
       this.game.dragon.children[13] = temp;

       this.game.dragon.children[12].position.set(0,-50)

		this.end_callChorus();

       this.game.dragon.dramaticEntrance(5000,()=>{
       		this.game.world.bringToTop(this.game.dialogueGroup);
       		this.game.dialogue.initDialogue(null,this.game.notley,true);
       });

	}

	end_ucp_victory_curtainDown = () => {
		this.game.player.isTalking = true;
		this.game.time.events.add(700,() => {
				this.game.world.bringToTop(this.game.dialogueGroup);
				this.game.player.animations.play('laugh');
				this.game.dialogue.initDialogue(null, this.game.player, false);
				this.game.dialogue.nextButton.visible = false;
			});

			this.curtain_down(() => {
				this.game.time.events.add(1200,() => {
					this.game.camera.fade(0x000000,2000);
					this.game.camera.onFadeComplete.addOnce(() => {
						this.game.state.start('EndCredits');
					});
				});
			});
	}





	//////////////////////////////////////////////////////////////////////////////
	

								// CENTRIST VICTORY //


	//////////////////////////////////////////////////////////////////////////////

	end_centrist_victory = () => {
		//silence then notley appears
		this.game.player.isTalking = true;
		this.game.camera.follow(null);
		this.game.musicHandler.stop();
		this.end_fadeIn(() => {
			this.game.time.events.add(800,()=>{
				this.game.player.data.dI = 19;
				this.game.dialogue.initDialogue(null,this.game.player,false);
			});
		});
	}

	end_centrist_victory_enterNotley = () => {
		this.game.player.isTalking = true;
		const notleyData = {
			character:'Rachel Notley',
			dI:19,
			id:16,
			key:'npc',
			name:'Rachel Notley',
			portrait:'notley',
			static: true,
			type: 'npc'
		}
		this.game.actions.setNewCacheObject('kq02-edmonton-01',{
			x:this.game.player.x,
			y:300,
			properties: notleyData
		});
		
		let notley = new NPC(this.game,0,300,"sprites",null,notleyData);
		this.game.NPCGroup.add(notley);
		this.game.actions.walkTo(notley,{x:this.game.player.x},2200,0,()=>{
			this.game.player.frameName = "hero-mb/_01.png";
			this.game.dialogue.initDialogue('backward',notley,false);
		});
	}

	end_centrist_victory_callMandle = () => {
		this.game.player.isTalking = true;
		this.game.data.gameData.stageInitFunction = "end_centrist_victory_mandelAppears"
		this.game.camera.shake(0.006);
		this.game.camera.fade(0xffffff);
		this.game.musicHandler.stop();
		this.game.camera.onFadeComplete.addOnce(()=>{
			this.game.camera.onFadeComplete.removeAll();
			this.game.stageInitFunction = "end_centrist_victory_mandelAppears";
			this.game.state.start('Game');
		});
	}

	end_centrist_victory_mandelAppears = () => {			// GOTTA FIND MANDEL ID!!!!
		this.game.player.isTalking = true;
		this.game.musicHandler.stop();
		this.game.musicHandler.play('theme-main');

		const mandelData = {
			character:'Stephen Mandel',
			dI:0, 
			id:43,
			key:'npc',
			name:'Stephen Mandel',
			portrait:'mendel',
			static: true,
			type: 'npc'
		}
		let mandel = new NPC(this.game,this.game.camera.width/2,270,"sprites", null, mandelData);
		this.game.NPCGroup.add(mandel);

		mandel.animations.play("celebrate");
		this.game.time.events.add(1200,()=>{
			this.game.dialogue.initDialogue(null,mandel,false,null,true);
		});

	}

	end_centrist_victory_harperAppears = () => {
		this.game.player.isTalking = true;
		const harperData = {
			character:'Stephen Harper',
			dI:14, 
			id:10,
			key:'npc',
			name:'Stephen Harper',
			portrait:'harper',
			static: true,
			type: 'npc'
		};
		const nenshiData = {
			character: 'Naheed Nenshi',
			dI: 0,
			id: 18,
			key: 'npc',
			name: 'Naheed Nenshi',
			portrait: 'nenshi',
			static: true,
			type: 'npc'
		}
		let harper = new NPC(this.game,-36,280,"sprites",null,harperData);
		harper.body.collideWorldBounds = false;
		this.game.NPCGroup.add(harper);
		let nenshi = new NPC(this.game, this.game.camera.width + 36,280,"sprites", null, nenshiData);
		nenshi.body.collideWorldBounds = false;
		this.game.NPCGroup.add(nenshi);
		nenshi.data.dI = 14;

		this.game.actions.walkTo(harper,{x:(this.game.camera.width/2)-100},1800,0,()=>{
			this.game.dialogue.initDialogue(null,harper,false,null,true);
		},true);

		this.game.actions.walkTo(nenshi,{x:(this.game.camera.width/2)+150},1800,0);
	}

	end_centrist_victory_mandelEnd = () => {
		this.game.player.isTalking = true;
		let mandel = this.game.actions.getCharacter("Stephen Mandel");
		mandel.animations.play("celebrate");
		this.end_callChorus();
		this.game.time.events.add(1200,()=>{
			this.game.dialogue.initDialogue(null,mandel,false,null,true);
		});
	}

	end_centrist_victory_callDeities = () => {
		// call out everyone. Curtain down then credits
		let thatcher = this.game.actions.enterDeity({character:'Margaret Thatcher',id:15,portrait:'thatcher',dI:9},this.game.camera.width/2-70,160,"blue",true);
		let klein = this.game.actions.enterDeity({character:'Ralph Klein',id:14,portrait:'klein',dI:6},this.game.camera.width/2+70,160,"blue");
	}

	end_centrist_victory_callCurtain = () => {
		this.game.player.isTalking = true;
		this.game.actions.animateNPCs("celebrate",'NPCGroup');
		this.game.time.events.add(1200,()=>{

			this.game.time.events.add(700,() => {
				this.game.world.bringToTop(this.game.dialogueGroup);
				this.game.player.animations.play('laugh');
				this.game.player.data.dI = 20;
				this.game.dialogue.initDialogue(null, this.game.player, false);
				this.game.dialogue.nextButton.visible = false;
			});

			this.curtain_down(() => {
				this.game.time.events.add(1200,() => {
					this.game.camera.fade(0x000000,2000);
					this.game.camera.onFadeComplete.addOnce(() => {
						this.game.state.start('EndCredits');
					});
				});
			});
		})
	}

	//////////////////////////////////////////////////////////////////////////////
	

								// NDP VICTORY //


	//////////////////////////////////////////////////////////////////////////////

	end_ndp_victory = () => {
		//silence
		this.game.player.isTalking = true;
		this.game.camera.follow(null);
		this.game.musicHandler.stop();
		this.end_fadeIn(() => {
				
				this.game.player.data.dI = 21;
				this.game.dialogue.initDialogue(null,this.game.player,false);
		})
	}

	end_ndp_victory_enterNotley = () => {
		this.game.player.isTalking = true;
		//this.game.musicHandler.play('theme-main');
		const notleyData = {
			character:'Rachel Notley',
			dI:23,
			id:16,
			key:'npc',
			name:'Rachel Notley',
			portrait:'notley',
			static: true,
			type: 'npc'
		}
		this.game.actions.setNewCacheObject('kq02-edmonton-01',{
			x:this.game.player.x,
			y:300,
			properties: notleyData
		});
		
		let notley = new NPC(this.game,0,300,"sprites",null,notleyData);
		this.game.NPCGroup.add(notley);
		this.game.actions.walkTo(notley,{x:this.game.player.x},2200,0,()=>{
			this.game.player.frameName = "hero-mb/_01.png";
			this.game.dialogue.initDialogue('backward',notley,false);
		});
	}

	end_ndp_victory_enterDeities = () => {
		this.game.player.isTalking = true;
		this.game.musicHandler.stop();
		this.game.musicHandler.play('theme-main');
		let thatcher = this.game.actions.enterDeity({character:'Margaret Thatcher',id:15,portrait:'thatcher',dI:10},this.game.camera.width/2-70,160,"blue",true);
		let klein = this.game.actions.enterDeity({character:'Ralph Klein',id:14,portrait:'klein',dI:7},this.game.camera.width/2+70,160,"blue");
	}

	end_ndp_victory_enterCeci = () => {
		this.game.player.isTalking = true;
		const ceciData = {
			character:'Joe Ceci',
			dI:12,
			id:22,
			key:'npc',
			name:'Joe Ceci',
			portrait:'ceci',
			static: true,
			type: 'npc'
		}
		let ceci = new NPC(this.game,this.game.camera.width+36,270,"sprites","",ceciData);
		this.game.NPCGroup.add(ceci);
		ceci.body.collideWorldBounds = false;
		//let ceciTween = this.game.add.tween(ceci.position).to({x:this.game.player.x+40},1800,)
		this.game.actions.walkTo(ceci,{x:this.game.player.x+40},1800,0,()=>{
			this.game.dialogue.initDialogue('right',ceci,false,null,true);
		});
	}

	end_ndp_victory_enterNDPDeities = () => {

		// DOUGLAS' FINAL dI YET TO BE SET!!!!

		this.game.player.isTalking = true;
		let douglas = this.game.actions.enterDeity({character:'Tommy Douglas',id:64,portrait:'douglas',dI:1},this.game.camera.width/2-70,300,"orange",true);
		let lang = this.game.actions.enterDeity({character:'K.d. Lang',id:65,portrait:'lang',dI:0},this.game.camera.width/2+70,300,"orange");
	}

	end_ndp_victory_langSpeaks = () => {
		this.game.player.isTalking = true;
		this.end_callChorus();
		let lang = this.game.actions.getCharacter("K.d. Lang");
		this.game.player.play('armed-forward').stop();
		this.game.actions.walkTo(lang,{y:320},1100,200,() => {
			lang.animations.play("celebrate");
			this.game.dialogue.initDialogue(null,lang,false,null,true);
		});

		// this.game.time.events.add(900,() => {
		// 	this.game.dialogue.initDialogue(null,lang,false,null,true);
		// });
	}

	end_ndp_victory_curtainFalls = () => {
		this.game.player.isTalking = true;
		this.game.actions.animateNPCs("celebrate",'NPCGroup');
		this.game.time.events.add(800,() => {
			this.game.time.events.add(700,() => {
				this.game.world.bringToTop(this.game.dialogueGroup);
				this.game.player.animations.play('laugh');
				this.game.player.data.dI = 22;
				this.game.dialogue.initDialogue(null, this.game.player, false);
				this.game.dialogue.nextButton.visible = false;
			});

			this.curtain_down(() => {
				this.game.time.events.add(1000,() => {
					this.game.camera.fade(0x000000,2000);
					this.game.camera.onFadeComplete.addOnce(() => {
						this.game.state.start('EndCredits');
					});
				});
			});
		})
	}



	//////////////////////////////////////////////////////////////////////////////


								// bring in all the people //


	//////////////////////////////////////////////////////////////////////////////

	end_fadeIn = (_callback) => {
		let screen = this.game.add.graphics(0,0);
		screen.beginFill(0xffffff,1);
		screen.drawRect(this.game.camera.width,this.game.camera.height,0,0);
		screen.endFill();
		screen.fixedToCamera = true;
		this.game.world.add(screen);
		
		let screenTween = this.game.add.tween(screen).to({alpha:0},1800,Phaser.Linear,true);
		screenTween.onComplete.add(() => {
			
			_callback();
			screen.destroy();
		});
	}

	end_callChorus = () => {
		// npcs 1-9, 11-15, 17,19-38 are animated
		// 39-59 likely static
		let idArray = [];
		let i = 11;
		while (i < 59) {
			idArray.push(i);
			i++
		}

		const randId = () => {
			let num = Math.floor(Math.random() * ((idArray.length-1) - 1) + 1);
			
			return num
		}

		const newNPCId = (_randId) => {
			let newId = idArray[_randId];
			idArray.splice(_randId,1);
			return newId;
			
		}

		const createNPC = (_id,_x,_y) => {
			var data = {
				id: _id,
				type: 'npc',
				key: 'npc',
				static: true
			}
			let idToString = _id < 10 ? `0${_id}` : _id.toString();
			
			let npc = new NPC(this.game,_x,_y,"sprites",`npc-${idToString}-mf/_01.png`,data);
			npc.body.collideWorldBounds = false;
			this.game.NPCGroup.add(npc);
			return npc;
		}

		//L1
		for (let i=4;i>0;i--) { // max x: 160, y: 210
			var id = newNPCId(randId());
			let newNPC = createNPC(id,-36-(50*i),210); //id, x, y
			this.game.add.tween(newNPC.position).to({x:230-(50*i)},1800,null,true);
		}

		//R1
		for (let i=4;i>0;i--) { // max x: 160, y: 210
			var id = newNPCId(randId());
			var newNPC = createNPC(id,this.game.camera.width+36+(50*i),210); //id, x, y
			this.game.add.tween(newNPC.position).to({x:710+(50*i)},1800,null,true)
		}
		
		//L2
		for (let i=6;i>0;i--) { // max x: 160, y: 210
			var id = newNPCId(randId());
			let newNPC = createNPC(id,-36-(50*i),275); //id, x, y
			this.game.add.tween(newNPC.position).to({x:320-(50*i)},2300,null,true);
		}

		//R2
		for (let i=6;i>0;i--) { // max x: 160, y: 210
			var id = newNPCId(randId());
			var newNPC = createNPC(id,this.game.camera.width+36+(50*i),275); //id, x, y
			this.game.add.tween(newNPC.position).to({x:640+(50*i)},2300,null,true)
		}

		//L3
		for (let i=6;i>0;i--) { // max x: 160, y: 210
			var id = newNPCId(randId());
			let newNPC = createNPC(id,-36-(50*i),340); //id, x, y
			this.game.add.tween(newNPC.position).to({x:320-(50*i)},2300,null,true);
		}

		//R3
		for (let i=6;i>0;i--) { // max x: 160, y: 210
			var id = newNPCId(randId());
			var newNPC = createNPC(id,this.game.camera.width+36+(50*i),340); //id, x, y
			this.game.add.tween(newNPC.position).to({x:640+(50*i)},2300,null,true)
		}
	}

}