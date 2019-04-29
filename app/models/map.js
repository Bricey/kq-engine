import { MapChangeSprite } from "./map-change";
import { NPC } from "./npc";
import { Enemy } from "./enemy";
import { Troll } from "./enemy-troll";
import { Ogre } from "./enemy-ogre";
import { Rat } from "./enemy-rat";
import { PickupItem } from "./pickup-item";
import { Trigger } from "./trigger";
import { Waypoint } from "./wayfinder";
import worldMap from './map-pathfinding';
import { Obj } from './object';
import {removeFromCache} from "./removeFromCache";

export class Map {

    constructor(context,game,map,tileSet) {
        this.context = context;
        this.game = game;
        this.mapName = map;
        //const mapName = map;
        const tileset = tileset;

        this.map = this.context.add.tilemap(map);
        this.map.addTilesetImage(tileSet);
        this.prevTileIndexContact = 0;

        this.game.waypointGroup = this.context.add.group();

        this.game.projectileGroup = this.context.add.group();

        this.game.objGroup = this.context.add.group();

        // Main list of groups in map
        this.waypointNodeGroup = [];

        //array of foreground tiles for callback
        this.foregroundTiles = [];

        // Create world, set-by-step
        this.createGroundLayer();
        this.createSubDetailLayer();
        this.createDetailLayer();
        this.createCollisionLayer();
        this.createObjectsLayer();
        this.createSubForegroundLayer();
        this.createForegroundLayer();

        //create waypoints in character quest

        if (!this.game.atlas[this.mapName].suppressWaypoints) this.createCharacterQuestWaypoints();

        // set background image if it exists on map
        if (this.setWorldBGImage()) {
            let bgImg = this.game.add.sprite(0,0,this.setWorldBGImage());
            bgImg.width = this.game.camera.width;
            bgImg.height = this.game.camera.height;
            bgImg.alpha = 0.65;
            bgImg.fixedToCamera = true;
            this.game.world.sendToBack(bgImg);
        }

        //if (this.map = "kq02-airship-00") this.game.stage.backgroundColor = "#4488AA";
        this.map==="kq02-airship-00"? this.game.stage.backgroundColor = "#4488AA" : this.game.stage.backgroundColor = "#000000";

    }

    setWorldBGImage = () => {
        switch(this.mapName) {
            case 'kq02-pantheon-00':
                return 'bg-pantheon';
                break;
            case 'kq02-airship-00':
                return 'bg-clouds';
                break;
        }
        return false;
    }


    createGroundLayer = () => {
        this.groundLayer = this.map.createLayer('ground');
        this.groundLayer.sendToBack();
        this.groundLayer.resizeWorld();
        this.groundLayer.wrap = true;
    }

    createSubDetailLayer = () => {
        this.subDetailLayer = this.map.createLayer('subdetail');
        //this.subDetailLayer.sendToBack();
        //this.subDetailLayer.wrap = true;
    }

    createDetailLayer = () => {
        this.detailLayer = this.map.createLayer('detail');
        //this.detailLayer.sendToBack();
        //this.detailLayer.wrap = true;
    }

    createCollisionLayer = () => {
        this.game.collisionLayer = this.map.createLayer("collision");
        this.map.setCollisionBetween(0,3400,true,this.game.collisionLayer);
        this.game.physics.arcade.enable(this.game.collisionLayer);
        this.groundLayer.sendToBack();

    }
    createObjectsLayer = () => {

        // create mapChange items
        const stagesArr = this.findObjectsByType('mapChange',this.map,'objects');
            this.game.stagesGroup = this.context.add.group();
        stagesArr.forEach(el => {

            const stageChange = new MapChangeSprite(this.context,this.game,el.x,el.y,"sprites",el.properties);
            if (el.properties.questNodeId !== undefined) {
                    this.addWaypoint(stageChange,el.properties.questNodeId);
                    this.waypointNodeGroup.push(stageChange);
            }
            this.game.stagesGroup.add(stageChange);
        });
        this.context.physics.arcade.enable(this.game.stagesGroup);
        
        // create Trigger items
        const triggersArr = this.findObjectsByType('trigger',this.map,'objects');
            this.game.triggerGroup = this.context.add.group();
        triggersArr.forEach(el => {
            const trigger = new Trigger(this.game,el.x,el.y,"sprites","trigger",el.properties);
            if (el.properties.questNodeId !== undefined) {
                this.addWaypoint(trigger, el.properties.questNodeId);
                this.waypointNodeGroup.push(trigger);
            }
            this.game.triggerGroup.add(trigger);
        });

        // create Pickup items
        const pickupArr = this.findObjectsByType('pickup',this.map,'objects');
            this.game.pickupGroup = this.context.add.group();
        pickupArr.forEach(el => {
            const pickup = new PickupItem(this.game,el.x,el.y,"sprites","",el.properties);
            if (el.properties.questNodeId !== undefined) {
                this.addWaypoint(pickup, el.properties.questNodeId);
                this.waypointNodeGroup.push(pickup);
            }
            this.game.pickupGroup.add(pickup);
        });

        // Set player here on display list
        this.game.world.bringToTop(this.game.player);

        //create Obj items
        const objectArr = this.findObjectsByType('object',this.map,'objects');
            this.game.objGroup = this.game.add.group();
        objectArr.forEach(el => {
            const obj = new Obj(this.game,el.x,el.y,"sprites","",el.properties);
            if (el.properties.questNodeId !== undefined) {
                this.addWaypoint(obj, el.properties.questNodeId); // add new waypoint if target has nodeTriggerId property
                this.waypointNodeGroup.push(obj);
            }
            this.game.objGroup.add(obj);
            
        });
        
        // Create NPCs
        const npcArr = this.findObjectsByType('npc',this.map,'objects');
            this.game.NPCGroup = this.context.add.group();
        npcArr.forEach(el => {
            const npc = new NPC(this.game,el.x,el.y,"sprites","",el.properties);
            if (el.properties.questNodeId !== undefined) {
                this.addWaypoint(npc, el.properties.questNodeId); // add new waypoint if target has nodeTriggerId property
                this.waypointNodeGroup.push(npc);
            }
            this.game.NPCGroup.add(npc);
        });
        if (this.game.player.data.hasCompanion) {
            const companionNPC = new NPC(this.game,this.game.player.x-36,this.game.player.y,"sprites","",this.game.data.companion);
            this.game.NPCGroup.add(companionNPC);
        }

        


        // create Enemies
        const enemyArr = this.findObjectsByType('enemy',this.map,'objects');
            this.game.enemyGroup = this.context.add.group();
        enemyArr.forEach((el,i) => {
            let enemy;
            // el.properties.index = i;
            // determine enemy type
            if (el.properties.key === 'troll') {
                enemy = new Troll(this.game,el.x,el.y,"sprites","",el.properties);
            } else if (el.properties.key === 'ogre') {
                enemy = new Ogre(this.game,el.x,el.y,"sprites","",el.properties);
            } else if (el.properties.key === 'rat') {
                enemy = new Rat(this.game,el.x,el.y,"sprites","",el.properties);
            }

            // if they have a waypoint id on them, add to waypoint node group
            if (el.properties.questNodeId !== undefined) {
                this.addWaypoint(enemy, el.properties.questNodeId);
                this.waypointNodeGroup.push(enemy);
            }
            this.game.enemyGroup.add(enemy);
        });
    }

    createSubForegroundLayer = () => {
        this.game.foregroundLayer = this.map.createLayer('subforeground');
    }

    createForegroundLayer = () => {
        this.game.foregroundLayer = this.map.createLayer('foreground');
        let foregroundTiles = this.setForegroundTiles();
        this.map.setTileIndexCallback(foregroundTiles,this.fadeForeground,this.game,'foreground'); // MUST KEEP UPDATED –– ARRAY OF TILES TO BE USED AS FOREGROUND (anything to be called away when player walks beneath)
    }

    fadeForeground = (e,o) => {
         this.game.foregroundLayer.alpha = 0.2;
    }

    setForegroundTiles = () => {
        const mapIndex = this.game.cache.getTilemapData(this.mapName).data.layers[6].data;
        let returnIndex = this.uniqueArray(mapIndex);
        let index = returnIndex.indexOf(0);
        if (index > -1) returnIndex.splice(index,1);
        return returnIndex;
    }

    uniqueArray = (arrArg) => {
        return arrArg.filter((elem, pos, arr) => {
            return arr.indexOf(elem) == pos;
        });
    }

    currentMapIsDungeon = () => {
        return this.game.atlas[this.game.currentStage].isDungeon;

    }

    findObjectsByType = (targetType,tilemap,layer) => {
        let result = [];
        tilemap.objects[layer].forEach(el => {
            if (Object.keys(el).length === 0 && el.constructor === Object) return; // object is dead
            if (el.properties !== undefined) { //ensure el.properties exists. Tiled sometimes adding non-propertied items...
                if (el.properties.type == targetType) {
                    el.y -= tilemap.tileHeight;
                    el.x += tilemap.tileWidth;
                    el.properties.index = tilemap.objects[layer].indexOf(el);
                    result.push(el)
                }
            } else {
                //console.error('WARNING: Item without properties object discovered', el);
            }
        });
        return result;
    }

    pickupItem = (p,t) => {
        if (t.velocityTimer) this.game.time.events.remove(t.velocityTimer);
        if (t.data.key === 'powerup') {
            t.initPowerup();
            //turn off any timer's on powerup
            t.destroy();
        } else if (t.data.key ==='inventoryItem') {
            if (this.game.player.data.inventory.length < 5) {
                t.initInventoryItem(t.data);
                if (t.data.questNodeId) {
                    
                    // Must  ensure questID is the current one in active node queue for associated quest
                    if (this.checkForActiveNode(t.data.questNodeId)) { // If returns true, continues. Otherwise, exits function and trigger left as-is 
                        this.updateWaypoint(t.data.questNodeId); // if item has a questNodeId, update associated waypoint
                    } else {
                        return;
                    }
                    
                    //this.checkForActiveNode(t.data.questNodeId)?this.updateWaypoint(t.data.questNodeId):return;
                }
                t.destroy();
            } //Possible alert if a player is carrying too much?
            // add to inventory
            // some may trigger a function to note achievmement or whatever...
        }
    }

    checkForActiveNode = (questNodeId) => {

        //parse questNodeId and check if it is most current in node queue
        const questId = questNodeId.substring(0,questNodeId.length-2);
        const prevNodeId = parseInt(questNodeId.slice(-1));

        // if node is 0, it's a new quest. Return true.
        if (prevNodeId === 0) return true;

        //if quest not in player's active quest list and waypoint node on item is not 0, return false
        if (!this.game.player.data.quests.some(q => { return q.id === questId }) && prevNodeId !== 0) return false;

        // now we have to check that waypoint in player's quest list is the active one
        // get the quest in player's list from questId
        const activeQuest = this.game.player.data.quests[this.getActiveQuestIndex(this.game.player.data.quests,questId)];
        let activeIndex = this.getFirstActiveNode(activeQuest.nodes);
        return activeIndex === prevNodeId-1?true:false;

    }

    getFirstActiveNode = (nodeList) => {
        for (let i=0;i<nodeList.length;i++) {
            if (nodeList[i].complete === false) {
                return i;
            }
        }
    }

    getActiveQuestIndex = (questList,questId) => {
        for (let i=0;i<questList.length;i++) {
            if (questList[i].id === questId) {
                return i;
            }
        }
    }

    updateWaypoint = (questNodeId) => {
        
        
        const questId = questNodeId.substring(0,questNodeId.length-2);
        
        const prevNodeId = parseInt(questNodeId.slice(-1))-1;
        
        //const questWaypointIndex = this.game.waypointGroup.children.map(q => { return q.questId }).indexOf(questId);
        const questWaypointIndex = this.game.waypointGroup.children.findIndex(q => { return q.data.questId ===  questId })
        const questWaypoint = this.game.waypointGroup.children[questWaypointIndex];

            if (questWaypoint !== undefined) { // SAFEGUARD!

            questWaypoint.activate();

            // determine next waypoint target on display list immediately -- otherwise waypoint instance won't be able to find target object to locate itself to
            // const waypointTarget = questWaypoint.data.target;
            const newWaypointNode = this.game.player.updateQuest(questId,prevNodeId,true); // true returns value of new object target
            
            if (newWaypointNode === 'quest complete') {
                // set to false, but do not destroy
                if (questWaypoint !== undefined) questWaypoint.visible = false;
            } else {
                // set new target object for questWaypoint
                this.setNewWaypointTarget(questWaypoint,newWaypointNode);
            }
        }
    }

    setNewWaypointTarget = (waypoint,target) => {

        if (target === undefined) {
            console.error("Returned target was undefined on waypoint:",waypoint);
            return;
        }

        const targetId = target.target;
        let newTarget = {};
        //search existing display list for objects with provided target
        // if not found, search mapChange objects in target list
        newTarget = this.findNewTargetOnMap(targetId);
        // init function to search world stage changes tree to display waypoint at best associated mapChange point if not object returned from local list
        if (newTarget === undefined) {
            
            newTarget = this.findNewTargetInWorld(target.map);

            
        }
        //NOW we can return an object to the waypoint
        

        

        //set new objects as associated waypoint's target
       // if (waypoint === undefined) { // stupid patch for non-working edmontonjourney quest
         //   this.createWaypoint('kq-q-edmontonjourney', this.game.stagesGroup.children[0], "active");
       // } else {
           if (newTarget !== undefined) {
                waypoint.data.target = newTarget;
            }
       // }
    }

    findNewTargetOnMap = (targetId) => {
        // search through each group object containing map elements : search through a set of arrays
        let object;
        
        this.waypointNodeGroup.forEach(n => {
            if (n.data.questNodeId === targetId) {
                
                object = n;
            }
        });
        
        return object;
    }

    returnMapIdAsObject = (targetMap) => {
        let returnedMapIndex = null;
        for (let i=0;this.game.stagesGroup.children.length > i;i++) {
            
            if (this.game.stagesGroup.children[i].data.stage === targetMap) {
                returnedMapIndex = i;
                break;
            }
        }
        
        return this.game.stagesGroup.children[returnedMapIndex];
    }


    // !!!! ------ IMPORTANT: findNewTargetInWorld --------------//

    findNewTargetInWorld = (targetMap) => {
        // purpose of this function is to sort through worldMap atlas and return the mapChange object that best leads to targetMap
        // access cache and search all tilemap data for requested key
        const currentMap = this.mapName;// current map

        let initialSearchNodes = [];    //layers of node searches
        let childSearchNodes = [];
        let childChildSearchNodes = [];
        let childChildChildSearchNodes = [];

        let returnedMap = null;
        let returnedMapObject = null;

        let searchCycles = 0;
        
        let ExtFoundMap = "";
        
        var map = ""; //


        // searchChildNodes is main function for searching through atlas beyond current map's immediate mapChange tiles

        const searchChildNodes = (searchArray) => {
            

            /* 
            searchArray[
                [ nodeName,[nodeName children] ],
                [ nodeName, [nodeName children] ]
            ]

            switched to using for loop instead of ES6 helpers as helpers weren't working...

            */

            if (searchArray.length === 1) return searchArray[0][0]; // return the first item in the search array if there is only one mapChange tile on map

            if (searchCycles > 10) {console.error('ERROR. Too many searches. Exiting'); return;};
            
            searchCycles++;
            
            let foundMap = null;
            let newSearchArray = [];

            for (let i=0;searchArray.length>i;i++) {
                const childNode = searchArray[i];
                for (let x=0;childNode[1].length>x;x++) {
                    

                    if (childNode[1][x] === targetMap) {
                        foundMap = childNode[0];
                        break;
                    }
                }
                
                if (typeof foundMap === 'string') break;
            }

            if (typeof foundMap === 'string') {
                
                ExtFoundMap = foundMap;
                return foundMap;
            } else {
                 // place all child arrays of searchArray[x][1] into new search array and call searchChildNodes again
                 searchArray.forEach(child => {
                     
                        let newChildTarget = [child[0]];
                        let newCChild = [];
                        let finalCChildNodes = [];
                    child[1].forEach(cChild => {
                        if (cChild === child[0]) { return };  // if child map refers back to parent, skip
                        if (cChild === this.game.currentMap) { return }; // if child map refers back to current map, skip
                        let cChildNodes = this.game.atlas[cChild].nodes;
                        let concatNodes = newCChild.concat(cChildNodes);
                        finalCChildNodes = concatNodes;
                    }); 
                        newChildTarget[1] = finalCChildNodes;
                        newSearchArray.push(newChildTarget);
                 });

                    var newSearch = searchChildNodes(newSearchArray);
                    return newSearch;
            }
        }
        // create initial array of mapChange nodes by querying current map key in worldMap object
        
        let initialNode = this.game.atlas[currentMap].nodes.find((node) => { if (node === targetMap) return node; });

        if (this.game.stagesGroup.children.length === 1) initialNode = this.game.stagesGroup.children[0].data.stage;

        if (initialNode === undefined) {
            //search next by adding map's immediate nodes and associated children paired into individiual arrays

            this.game.atlas[currentMap].nodes.map(node => {
                initialSearchNodes.push([node, this.game.atlas[node].nodes])
            });

        } else {
            //return initialNode to parent function
            returnedMapObject = this.returnMapIdAsObject(initialNode);
            return returnedMapObject;
        }

        

        returnedMap = searchChildNodes(initialSearchNodes);
        
        returnedMapObject = this.returnMapIdAsObject(returnedMap);
        
        
        //patch 1008
        if (returnedMapObject === undefined) returnedMapObject = this.game.stagesGroup.children[0];
        return returnedMapObject;
    }


    // !!!! ------ END: findNewTargetInWorld --------------//


    removeWaypoint = (nodeId) => {
        
        const questId = nodeId.substring(0,nodeId.length-2);
        const waypointIndex = this.game.waypointGroup.children.map(w => {return w.data.questId} ).indexOf(questId);
        
        // debugger;
        if (waypointIndex !== -1) this.game.waypointGroup.children[waypointIndex].destroy();
    }

    triggerFunction = (p,t) => {
        if (t.data.questNodeId) {
            if (t.data.questNodeId === "kq-q-ratking-2") { // exception for lousy ratking-2 node. Likely to be more...
                if (!this.game.player.hasItem("RatKeyRight") || !this.game.player.hasItem("RatKeyLeft")) {
                    this.game.dialogue.sign("Collect the two keys from the Vermin King's minions to enter.", 'sign');
                    t.kill();
                    this.game.npcFunctions.createNewRatKingTrigger();
                    return;
                }
            } else if (t.data.questNodeId === 'kq-q-ratking-3') {
                this.game.npcFunctions[t.data.initFunction]();
                this.searchAndRemoveTriggers(t.data.initFunction);
                return;
            } else if (t.data.questNodeId === 'kq-q-carbontree-4') {
                // check if player has current active id on carbonTree quest. if not, return
                if (this.game.player.currentActiveQuestNode('kq-q-carbontree-4',3)) { 
                    // send alert to player
                    
                    if (!this.game.player.isTalking) {
                        this.game.player.data.dI = 12;
                        this.game.dialogue.initDialogue(null,this.game.player,false);
                        t.kill();
                        this.game.npcFunctions.createNewCarbonTreeTrigger();
                    }
                    return;
                } else {
                    return;
                }
            } else if (t.data.questNodeId === 'kq-q-pipeline-3') {
                if (this.game.player.currentActiveQuestNode('kq-q-pipeline-3',2)) {
                    if (!this.game.player.isTalking) {
                        this.game.dialogue.sign("I must speak with an oil executive to acquire a valve wheel.");
                        t.kill();
                        this.game.npcFunctions.createNewPipelineCalgaryTrigger();
                    }
                    return;
                } else {
                    return;
                }
            }
            if (this.checkForActiveNode(t.data.questNodeId)) {
                this.updateWaypoint(t.data.questNodeId);
                if (t.data.initFunction !== undefined) this.game.npcFunctions[t.data.initFunction]();
            } else {
                return;   
            }
        } else {
            if (t.data.initFunction !== undefined) this.game.npcFunctions[t.data.initFunction]();
        }
        if (t.data.once) {
            //find and destroy triggers with same function
            this.searchAndRemoveTriggers(t.data.initFunction);
            //removeFromCache(this.game,this.game.currentStage,t.data.index)
            //t.destroy();
        }
        // A method needs to be determined for destroying select triggers or keeping them so they can be triggered again
    }

    searchAndRemoveTriggers = (trig) => {
        let sameTriggers = this.game.triggerGroup.children.filter((child,i) => { return child.data.initFunction === trig });
        sameTriggers.forEach(child => {
            if (!child.data.leaveInCache) {
                removeFromCache(this.game,this.game.currentStage,child.data.index);
            }
            child.destroy();
        });

    }

    killWorldObjects = () => {
        var groups = ['stagesGroup','pickupGroup','objGroup','NPCGroup','enemyGroup','projectileGroup','waypointGroup',"UIGroup"];
        groups.forEach(group => {
            this.game[group].children.forEach(child => {
                child.destroy()
            });
            this.game[group].children = [];
        });

        this.game.player.destroy();
        //this.game.musicHandler = null;
        this.game.dialogue.nextButton.events.onInputDown.removeAll();
        //this.game.musicHandler = null;
        this.game.inventoryButton.events.onInputDown.removeAll();
        this.game.questsButton.events.onInputDown.removeAll();
        this.game.fullscreenButton.events.onInputDown.removeAll();
        this.game.foregroundLayer = null;
        this.game.questsButton = null;
        this.game.healthIconGroup  = null;
        this.game.sfx = null;
        delete this.game.mapWorld;
    }

    changeStage = (e,t,iF) => {
        if (!this.game.player.isTalking) {
        this.game.player.isTalking = true;
        this.game.player.body.velocity.setTo(0);
        //check whether questNodeId present
        if (t.questNodeId) {
            this.game.canChange = false;
            if (this.checkForActiveNode(t.questNodeId)) {
                this.updateWaypoint(t.questNodeId);
                t.questNodeId = null;
            }
        }

        if (t.hasOwnProperty("data") && t.data.hasOwnProperty("initFunction")) { 
            iF = t.data.initFunction;
        }
        
        this.game.camera.fade('#000000');
        this.game.camera.onFadeComplete.add(() => { // stage fadeOut onComplete
            this.game.camera.onFadeComplete.removeAll();

            if (typeof iF === 'string' || iF !== undefined ) {
                //this.game.stageInitFunction[0] = this.game.npcFunctions[iF];
                this.game.stageInitFunction = iF;
                //this.game.stageInitFunction[0] = iF?iF:"";
                //this.game.data.gameData.stageInitFunction[0] = iF?iF:"";
            }

            if (!this.game.globalAchievements.marchToWar) {
                this.game.musicHandler.stop();
            }
            this.game.time.events.removeAll();
            this.game.startingPosition = this.parseCoords(t.targetPosition);
            this.game.currentStage = t.targetMap;
            //this.killWorldObjects();
            this.game.onBlur.removeAll();
            this.game.onFocus.removeAll();
            if (this.game.stageDismissFunction[0] !== "") { // if there are stageDismissFunctions, run them instead
                this.game.stageDismissFunction[0](); // takes player to alternate map
                //this.game.stageDismissFunction[0] = "";
            } else {
                this.game.state.start('Game');
            }
        });
        }
    }

    parseCoords = (str) => {
        // str is string containing xy coords from mapChange property. Comma separated values
        let array = [];
        let splitArray = str.split(",");
        array.push(parseInt(splitArray[0]));
        array.push(parseInt(splitArray[1]));
        return array;
    }

    addWaypoint = (targ,node,singleQuestCreation) => {
        // if waypoint id is 0, check against quest data and player quest data
        // in quest data, if associated node.completed is false, add new waypoint to map above target. If true, ignore.

        if (!this.game.atlas[this.mapName].suppressWaypoints) { // if map in atlas properties doesn't have suppressWaypoints

            const nodeId = node;
            
            const nodeIdNum = parseInt(nodeId.slice(-1));
            
            const questId = nodeId.substring(0,nodeId.length-2);
            
            let data = {};
            if (nodeIdNum === 0 && !this.game.player.data.quests.find(quest => quest.id === questId  )) {
                
                // BRAND NEW QUEST WAYPOINT CREATION
                // Looks for quest id inside player.data.quests. If not found, new quest waypoint created
                this.createWaypoint(questId, targ, "new");

            } else if (singleQuestCreation){// it's been called from player's addQuest method. PATCH

                
                this.createWaypoint(questId, targ, "active");

            } else if (this.game.player.data.quests.find(quest => quest.id === questId)) {

                
                // if player has quest active AND index of first complete:true in quest's node array matches that of nodeIdNum
                const questIndex = this.game.player.data.quests.map(e => {return e.id}).indexOf(questId);
                
                const playerQuest = this.game.player.data.quests[questIndex];
                

                // var currentNode = playerQuest.nodes.find((n,i) => {if (n.complete === false) return i })
                // 
                // if (currentNode === nodeIdNum - 1) this.createWaypoint(questId, targ, "active");

                for (let i=0;i < playerQuest.nodes.length;i++) {
                    if (playerQuest.nodes[i].complete === false) {
                        if (playerQuest.nodes[i-1] !== undefined) {
                            if (playerQuest.nodes[i-1].complete === true) {
                                if (i === nodeIdNum-1) {
                                    // EXISTING QUEST WAYPOINT CREATION
                                    this.createWaypoint(questId,targ,"active");
                                }
                            }
                        }
                    }
                }
            }

        }
    }

    createWaypoint = (questId, target, status) => {
        if (questId === 'kq-q-kananaskis' && this.mapName === "kq02-calgary-02") target = this.game.stagesGroup.children[1];
        const data = { questId, target, status };
        const waypoint = new Waypoint(this.game, target.x - 18, target.y, "sprites", "", data);
        this.game.waypointGroup.add(waypoint);
    }

    createSingleCharacterQuestWaypoint = (qNode) => {
        const { map, target } = qNode;
        
        if (map === this.mapName && this.game.currentStage === "kq02-calgary-01") {
            this.createWaypoint('kq-q-quiz',this.game.actions.getCharacter('Naheed Nenshi'),'active')
            return; // don't lay down waypoint if player is in target map
        }
        const targetMap  = this.findNewTargetInWorld(map);
        
        this.addWaypoint(targetMap, target, true);
    }

    createCharacterQuestWaypoints = () => {
        // cycle through character's active quests and compare to quests not represented in waypoints currently on map
        //this.game.waypointGroup.children(array) this.game.player.data.quests(array)
        var waypoints = this.game.waypointGroup.children;
        
        var charQuests = this.game.player.data.quests;

        //looking for waypoints.questId
        // looking for charQuest[x].id
        var unReppedQuestsArray = this.compareQuests(charQuests,waypoints);

        // now loop through questsArray and create any waypoints in
        

        unReppedQuestsArray.forEach(quest => {
            // create waypoints for each quest in array
            
            let activeQuestNode = quest[0].nodes.find(child => {
                if (child.complete === false) return child;
            });
            
            this.createSingleCharacterQuestWaypoint(activeQuestNode);

        });
    }

    compareQuests = (_quest,_waypoints) => {
        // return the quests in player's active quest list that don't match waypoints already on map
        //return _quest.filter((quest) => {return quest.id !== _waypoints.questId});

        var returnedIds = [];

        for (let i=0;i < _quest.length;i++) {
            let nonReppedId = _waypoints.find(wp => { 
                if (wp.questId === _quest[i].id) return wp;
            })
            if (nonReppedId === undefined) returnedIds.push(_quest);
        }
        return returnedIds;
    }

    checkIfActiveWaypointNode = (node) => {
        const nodeId = node;
        const nodeIdNum = parseInt(nodeId.slice(-1)); // node id number eg 1,2,3..
        const questId = nodeId.substring(0, nodeId.length - 2); // quest id eg kq-q-[title]
        //this.game.player.data.quests.forEach
        return true;

    }





    // addWaypointFromNonPresentQuest = (_quest) => {
    //     //cycle through quest nodes for first noncompleted node
    //     const qNode = _quest.nodes.map((node,i) => {
    //         if (node.completed === false) return node;
    //     });

    //     const targetMap = this.findNewTargetInWorld(qNode.map);
    //     if (targetMap) {
    //         this.createWaypoint(_quest.id,targetMap,"active");
    //     } else {
    //         console.error('NO MATCH FOR MAP FOUND IN ATLAS');
    //     }
    //     // when finally creating the waypoint, will point to a mapChange obj, so must first identify which one on map we'll point to  with quest

    // }

}