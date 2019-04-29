import { Obj } from './object';
import { NPC } from "./npc";
import { Troll } from "./enemy-troll";

export class Cutscene {
	constructor(game) {
		this.game = game;
	}

	getCharacter (_char) { // Provide character name. Returns character as reference

		// may require a handler for npcs with same name (ie UPC Soldier)

		// search through npcGroup
		return this.game.NPCGroup.children.filter((child) => { return child.data.character === _char })[0];
		// const character = this.game.NPCGroup.children[index];
		// return character;
	}

	getBoatCharacter (_char) { // for the boat scene
		var figure = this.game.objGroup.children[0].children[1];
		figure.frameName = `npc-${figure.data.id}-mf/_01.png`;
		return figure;
	}

	getCompanion(_dI) {
		var companion =  this.game.NPCGroup.children[this.game.NPCGroup.children.length - 1]; // companion always the last on list...probably
		if (_dI) companion.data.dI = _dI;
		return companion;
	}

	getEnemy(enemy) { // provide enemy object directly
		// search through enemyGroup
		return this.game.enemyGroup.getIndex(enemy);

	}

	setCharacterDICache(_char,_newDI,map) {
		let objectsData = this.game.cache.getTilemapData(map).data.layers[4].objects;
		let targetChar = objectsData.filter(child => { if (child.hasOwnProperty('properties')) return child.properties.character === _char})[0];
		targetChar.properties.dI = _newDI;
	}

	removeFromCachedObject(_char,_targProp,map) { // _char: character name; _targProp: target property name passed as string
		let objectsData = this.game.cache.getTilemapData(map).data.layers[4].objects;
		let targChar = objectsData.filter(child => { if (child.hasOwnProperty('properties')) return child.properties.character === _char })[0];
		if (targChar !== undefined) delete targChar.properties[_targProp];
	}

	addToCachedObject(_char,_targProp,map) { // takes one key and value at a time
		let objectsData = this.game.cache.getTilemapData(map).data.layers[4].objects;
		let targChar = objectsData.filter(child => { if (child.hasOwnProperty('properties')) return child.properties.character === _char })[0];
		if (targChar === undefined) {
			
			
			targChar = objectsData.filter(child => {if (child.hasOwnProperty('properties')) return child.properties.initFunction === _char})[0];
		}
		if (targChar !== undefined) targChar.properties[Object.keys(_targProp)[0]] = _targProp[Object.keys(_targProp)[0]];
	}

	setMapChangeProps(_targStage,_props, map) {
		let objectsData = this.game.cache.getTilemapData(map).data.layers[4].objects;
		let targetTiles = objectsData.filter(child => { if (child.hasOwnProperty('properties')) return child.properties.stage === _targStage});
		targetTiles.forEach(child => {
			child.properties = _props
		});
	}

	getWaypointIndex(_qId) {
		let waypointIndex = this.game.waypointGroup.children.findIndex(child => { return child.data.questId === _qId });
		
		return waypointIndex;
	}

	setDICache(_char,map) { // provide _char as sprite object on map
		if (_char.data.index) {
			let objectsData = this.game.cache.getTilemapData(map).data.layers[4].objects;
			const index = _char.data.index;
			const dI = _char.data.dI;
			if (objectsData[index] && objectsData[index].properties) objectsData[index].properties.dI = dI;
		} else {
			return;
		}
	}

	checkForQuestNodeId(_char,_questNodeId) {
		var char = this.getCharacter(_char);
		if (char.data.hasOwnProperty('questNodeId') && char.data.questNodeId === _questNodeId) {
			return true;
		} else {
			return false;
		}
	}

	animateNPCs(anim, _group,npcs, stop,allNpcsBool) { // all npcs on screen celebrate. Provide array to specify npcs // anim sets which animation to play // stop a bool to stop all animations immediately // group selects group (ie NPC, enemy, etc...)
		let allNPCs = [];
		if (allNpcsBool) {
			npcs.forEach(child => {
				allNPCs.push(this.getCharacter(child));
			});
		} else {
			allNPCs = this.game[_group].children;
		}

		allNPCs.forEach(child => {
				
				if (child.data.id === 9) return;
				child.animations.play(anim);
		});

		if (stop) { // stop all animations immediately
			allNPCs.forEach(child => {
				child.animations.stop();
			})
		}
	}

	animatedEnemies(anim,enemies,stop) {
		
	}

	jump (targ,time,delay,callback) {
		const _delay = delay?delay:0;
		let tween = this.game.add.tween(targ.position).to({y:targ.position.y-40},time,"Linear",true);
		this.game.sfx.play('sfx_jump_upDown',0.25);
		tween.yoyo(true,50);
		tween.onComplete.add(()=> {
			this.game.time.events.add(_delay,()=>{
				if (callback) callback();
			});
		});
	}

	walk(targ,dir,time,delay,callback,forwardAtEnd) { // move character relative to current position
		let {x,y} = dir;
		let pos = targ.position;
		this.setAnimation(targ,x,y);
		let tween = this.game.add.tween(targ.position).to({x:pos.x+x,y:pos.y+y},time,null,true,delay);
		tween.onComplete.add(() => {
			targ.animations.stop();
			if (forwardAtEnd) { // set character facing forward
				targ.animations.play(`walk-forward`).stop();
			}
			if (callback) callback();
		})
	}

	walkTo(targ,dir,time,delay,callback,forwardAtEnd) { // move character to specific coords in world
		let {x,y} = dir;
		let pos = targ.position;
		this.setAnimation(targ,x,y,true);
		let tween = this.game.add.tween(targ.position).to({x:x,y:y},time,null,true,delay);
		tween.onComplete.add(() => {
			targ.animations.stop();
			if (forwardAtEnd) { // set character facing forward
				targ.animations.play(`walk-forward`).stop();
			}
			if (callback) callback();
		});
	}

	randomQuizQ(_quiz) {
		return this.game.rnd.integerInRange(0, this.game.quiz.length-1);
	}

	addFlame(x,y,_colour) {
		const data = { objectType: `${_colour}-fire`, type:'object' };
		let flame = new Obj(this.game,x,y,"sprites","",data);
		this.game.objGroup.add(flame);
		flame.alpha = 0;
		this.game.add.tween(flame).to({alpha:1},600,null,true);
		this.game.sfx.play('sfx_flame');
		return flame;
	}

	enterDeity(targ,x,y,colour,talk) {
		// create flame in provided colour before transforming into targ sprite
		// add sfx
		let flame = this.addFlame(x,y,colour);
		const flameTween = this.game.add.tween(flame.position).to({y:flame.position.y+40},1800,"Quad.easeOut",true);
		flameTween.onComplete.add(() => {
			const charData = {
					character: targ.character,
					id: targ.id,
					key: 'npc',
					name: targ.character,
					type: 'npc',
					static: true,
				}
				charData.dI = targ.dI?targ.dI:0;
				if (targ.portrait) charData.portrait = targ.portrait;
				
				const char = new NPC(this.game,flame.x,flame.y,"sprites","",charData);
				this.game.NPCGroup.add(char);
				flame.destroy();
				//sfx
				char.animations.play('celebrate');

				this.game.time.events.add(1000,() => {
					char.frameName = `npc-${targ.id}-mf/_01.png`;
					if (talk) {  // if talk true, character initiates dialogue
						this.game.time.events.add(500,() => {
							this.game.dialogue.initDialogue(null,char,true);
						});
					}
				}); 
		});
	}

	setNewCachePosition(map,targ,x,y) {
		const objectsData = this.game.cache.getTilemapData(map).data.layers[4].objects;
		const index = targ.data.index;
		objectsData[index].x = x;
		objectsData[index].y = y;
		
	}

	setNewCacheObject(map,Obj) {
		const objectsData = this.game.cache.getTilemapData(map).data.layers[4].objects; // 4 is objects in map layers array
		objectsData.push(Obj);
	}

	removeCacheObject(map,..._props) { // identify type of object (npc, enemy, object, trigger, etc.) and properties to be matched
		// passed as array of arrays

		let index = null;
		const numToMatch = _props.length;
		const objectsData = this.game.cache.getTilemapData(map).data.layers[4].objects;
		for (let i=0;objectsData.length>i;i++) {
			let matching = 0;
			_props.forEach(property => {
				//
				if (objectsData[i].hasOwnProperty('properties')) {
					if ( objectsData[i].properties[property[0]] === property[1] ) matching++;
				}
			});
			if (numToMatch === matching) { //success! Object found
				index = i;
				this.removeCacheObjectByIndex(map,index);
				return; // exit loop
			}			
		}
	}

	removeCacheObjectByIndex(map,index) {
		const objectsData = this.game.cache.getTilemapData(map).data.layers[4].objects;
		objectsData.splice(index,1);
	}

	changeMapTiles(map,_layer,object) { //1. map name, 2. object of key value pairs (ie array index,number-to-change-to)
		
		const mapsData = this.game.cache.getTilemapData(map).data.layers;

		// error call if map not found
		if (mapsData === undefined) { console.error( 'Could not find provided map!' );return; }

		const mapIndex = mapsData.findIndex(layer => layer.name === _layer);
		
		const tM = mapsData[mapIndex].data; //tM: targetMap
		for (var prop in object) {
			let i = parseInt(prop);
			tM[i] = object[prop];
			
		}
	}

	setAnimation(targ,x,y,abs) {
		let xPos = x + (abs?0:targ.position.x);
		let yPos = y + (abs?0:targ.position.y);
		let type = this.game.world.isDungeon?'armed':'walk';
		let dir = "";
		const targetAngle = this.game.physics.arcade.angleToXY(targ,xPos,yPos);
				
                if (targetAngle > -0.785 && targetAngle < 0.785) {
                        dir = "left";
                } else if (targetAngle > 0.785 && targetAngle < 2.356) {
						//dir = "backward";
						dir = "forward";
                } else if (targetAngle < -0.785 && targetAngle > -2.356 ) {
						//dir = "forward";
						dir = "backward";
                } else if (targetAngle > -2.356 || targetAngle < -2.356) {
                        dir = "right";
				}
		if (targ === this.game.player) { // use player animations
			targ.animations.play(`${type}-${dir}`);
		} else { //use npc or whatever
			targ.animations.play(`walk-${dir}`);
		}
	}

	createMapObjectForCache(_gid,_x,_y,_w,_h,_props) { //x, y coords 
		return {
			"gid": _gid,
			"height": _h,
			"id":0,
			name:"",
			"properties": _props,
			"rotation": 0,
			"type":"",
			"visible":true,
			"width":_w,
			"x":_x,
			"y":_y
		}
	}

	playHorn(_targ) {
		if (!_targ.isHonking) {

			_targ.isHonking = true;

			function lightsOff() {
				if (_targ.data.colour === 'green') {
					_targ.frameName = `${_targ.data.colour}_03.png`;
				} else {
					_targ.frameName = `${_targ.data.colour}_01.png`;
				}
			}

			function setHonkString() {
				let honkString = "";
				let honk = "Honk! ";
				for (let i = 0; i < _targ.data.sigil; i++) {
					honkString = honkString.concat(honk);
				}
				return honkString;
			}

			this.game.dialogue.alert(setHonkString(), 'acquired');

			for (let i=0;i<_targ.data.sigil;i++) {
				this.game.time.events.add(i*600,() => {
					
					lightsOff();
					this.game.time.events.add(200,() => {
						_targ.frameName = `${_targ.data.colour}_lit.png`;
						this.game.sfx.play('sfx_carHorn');
						//v++;
						
						if (i === (_targ.data.sigil - 1)) {
							this.game.time.events.add(300,() => {
								_targ.isHonking = false;
								lightsOff();
							})	
						}
					});
				});
			}
			
		}

	}

	activateSigil(_targ) {
		
		if (!_targ.activated) { // do not proceed if sygil already activated
			const resetAllSigils = () => {
				// reset all sigils to off
				this.game.time.events.add(1000,() => {
					console.error('WRONG!');
					this.game.sigilOrder = [];
					this.game.objGroup.children.forEach(child => {
						
						if (child.data.objectType === 'sigil') {
							child.frameName = `sygil-${child.data.colour}-off.png`;
							child.activate = false;
						}						
					});
					// create monsters
					const troll_1 = new Troll(this.game, 120, 820, "sprites", null, {
						alertRange: 15,
						character: "Troll",
						id: "01",
						key: "troll",
						type: "enemy"
					});
					const troll_2 = new Troll(this.game, 850, 820, "sprites", null, {
						alertRange: 15,
						character: "Troll",
						id: "01",
						key: "troll",
						type: "enemy"
					});
					this.game.enemyGroup.add(troll_1);
					this.game.enemyGroup.add(troll_2);
				})
			}

			const success = () => {

				// shake camera and remove invisible tiles from map
				this.game.camera.shake(0.006, 1000);
				this.game.sfx.play('sfx_shake');
				this.game.camera.onShakeComplete.addOnce(() => {

					this.removeCacheObject('kq02-forest-00',["type","npc"],["character","Hooded Figure"]);

					this.game.mapWorld.updateWaypoint("kq-q-carbontree-4");

					this.changeMapTiles('kq02-forest-00','collision',{
						'907': 0,
						'908': 0,
						'909': 0,
						'910': 0,
						'911': 0,
						'912': 0,
						'913': 0,
						'914': 0,
						'915': 0,
						'916': 0,
						'917': 0,
						'918': 0,
						'919': 0,
						'920': 0,
						'921': 0
					});

					this.removeCacheObject("kq02-forest-00",["objectType","sigil"],["colour","red"]);
					this.removeCacheObject("kq02-forest-00",["objectType","sigil"],["colour","yellow"]);
					this.removeCacheObject("kq02-forest-00",["objectType","sigil"],["colour","blue"]);
					this.removeCacheObject("kq02-forest-00",["objectType","sigil"],["colour","grey"]);
					this.removeCacheObject("kq02-forest-00",["objectType","sigil"],["colour","green"]);

					let i=0;
					while (i<5) {
						this.game.objGroup.children[0].destroy();
						i++;
					}

					// refresh stage
					this.game.mapWorld.changeStage(null,{
						targetPosition:`${this.game.player.x},${this.game.player.y}`,
						targetMap: this.game.currentStage
					});
				});
			}
			const sigilSolution = [
				'red',
				'yellow',
				'blue',
				'grey',
				'green'
			];
			const colour = _targ.data.colour;
			if (_targ.frameName === `sygil-${colour}-off.png`) {
				_targ.frameName = `sygil-${colour}-on.png`;
				this.game.sfx.play('sfx_flame');
				this.game.sigilOrder = this.game.sigilOrder || [];
				this.game.sigilOrder.push(colour);

				// check for validity
				if (this.game.sigilOrder.length === 5) {
					if ( JSON.stringify(sigilSolution) === JSON.stringify(this.game.sigilOrder) ) {
						// win!
						success();
					} else {
						// lose!
						this.game.sfx.play('sfx_fail');
						resetAllSigils();
					}
				}
			}
		}
	}

}