import { PickupItem } from './pickup-item';
import powerupType from './powerup-type';

export class Player extends Phaser.Sprite {
    constructor(game, x = 0, y = 0, key = 'sprites',frame,data) {
        super(game, x, y, key,frame,data);

        game.add.existing(this);
        game.physics.arcade.enable(this);

        this.data = data;
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.setSize(36,48,0,0);
        this.maxHealth = this.data.maxHealth;
        this.isHit = false;
        this.isTalking = false;
        this._STRIKE_VELOCITY = 480;
        this.maxSpeed = 500; //420-240
        this.isAttacking = false;
        this.inventoryActive = false;
        this.questsActive = false;
        this.health = this.data.health;
        if (this.health > this.maxHealth) this.health = this.maxHealth;

        let sprite = null;

        switch (this.game.currentCharacter) {
            case 'jasonKenney':
                sprite = this.game.data.players.jasonKenney.inDisguise?"npc-48":"hero";
                break;
            case 'rachelNotley':
                sprite = "npc-16";
                break;
            case 'derekFildebrandt':
                sprite = "npc-33";
                break;
        } // will need to add Derek Fildebrandt


        this.animations.add('walk-forward',Phaser.Animation.generateFrameNames(`${sprite}-mf/_0`,1,4,'.png'),6,true);
        this.animations.add('walk-backward',Phaser.Animation.generateFrameNames(`${sprite}-mb/_0`,1,4,'.png'),6,true);
        this.animations.add('walk-left',Phaser.Animation.generateFrameNames(`${sprite}-ml/_0`,1,4,'.png'),6,true);
        this.animations.add('walk-right',Phaser.Animation.generateFrameNames(`${sprite}-mr/_0`,1,4,'.png'),6,true);

        this.animations.add('armed-forward',Phaser.Animation.generateFrameNames('hero-maf/_0',1,4,'.png'),6,true);
        this.animations.add('armed-backward',Phaser.Animation.generateFrameNames('hero-mab/_0',1,4,'.png'),6,true);
        this.animations.add('armed-left',Phaser.Animation.generateFrameNames('hero-mal/_0',1,4,'.png'),6,true);
        this.animations.add('armed-right',Phaser.Animation.generateFrameNames('hero-mar/_0',1,4,'.png'),6,true);

        this.attackFwd = this.animations.add('attack-forward',Phaser.Animation.generateFrameNames('hero-af/_0',1,3,'.png'),12,false);
        this.attackBwd = this.animations.add('attack-backward',Phaser.Animation.generateFrameNames('hero-ab/_0',1,3,'.png'),12,false);
        this.attackLft = this.animations.add('attack-left',Phaser.Animation.generateFrameNames('hero-al/_0',1,3,'.png'),12,false);
        this.attackRgt = this.animations.add('attack-right',Phaser.Animation.generateFrameNames('hero-ar/_0',1,3,'.png'),12,false);

        this.animations.add('death',Phaser.Animation.generateFrameNames('hero-death-spin/_0',1,4,'.png'),6,true);

        this.attackFwd.onComplete.add(this.resetAttackState,this);
        this.attackBwd.onComplete.add(this.resetAttackState,this);
        this.attackLft.onComplete.add(this.resetAttackState,this);
        this.attackRgt.onComplete.add(this.resetAttackState,this);

        this.currentState = "_NEUTRAL";
    }

    update() {
        // 
        //
        if (this.currentState === "_NEUTRAL") {
            return;
        } else if (this.currentState === "_ATTACKING") {
            //if (!this.isHit) this.body.velocity.set(0);
        }
    }

    displayCrystals = () => {
        const maxCrystals = 3;
        const spacing = 30;
        const currentCrystals = this.data.crystals.length;
        

        for (let i=0;i<maxCrystals;i++) {
            const crystalType = i<currentCrystals?'ui-crystal-active.png':'ui-crystal-inactive.png';
            const crystal = this.game.add.sprite(this.game.camera.width/2-40+(i*spacing),30,"sprites",crystalType);
            if (crystalType === 'ui-crystal-inactive.png') crystal.alpha = 0.55;
            crystal.fixedToCamera = true;
            crystal.anchor.setTo(0.5);
            crystal.scale.setTo(0.85);
            this.game.UIGroup.add(crystal);
        }
    }

    updateCrystals = () => {
        
    }

    stop = () => {
        this.animations.stop();
        let scene = this.game.atlas[this.game.currentStage].isDungeon?'maf':'mf';
        this.frameName = `hero-${scene}/_01.png`;
    }

    // damage(dmg) {
    //     this.health = this.health - setInterval(dmg,10);
    // }

    engage() {
        
        // this.returnTarget(this.getPlayerDirection());
        //if (!this.isAttacking) this.attack(this.getPlayerDirection());
        if (!this.questsActive && !this.inventoryActive) {
            let newArray = [];
            let targetsArray = newArray.concat(this.game.enemyGroup.children,this.game.NPCGroup.children,this.game.objGroup.children);
            for (let i=0;targetsArray.length>i;i++) {
                let targ = targetsArray[i];
                const targetAngle = this.game.physics.arcade.angleToXY(targ,this.x,this.y);
                const distance = targ.engageDistance || 62;
                
                
                if (this.game.physics.arcade.distanceBetween(targ,this) <= distance) {
                    
                    if (targ.isType === "BOSS") { // angle params for boss engagement (can only attack from front)
                        if (targetAngle < 2.9 && targetAngle > 0.312) {
                                this.confirmTarget('backward',targ);
                                return;
                        }
                    } else {
                        if (targetAngle > -0.785 && targetAngle < 0.785) {
                                if (Phaser.Device.desktop && this.getPlayerDirection() === 'left') {
                                    this.confirmTarget('left',targ);
                                    return;
                                } else { this.confirmTarget('left',targ); return; }
                        } else if (targetAngle > 0.785 && targetAngle < 2.356) {
                                if (Phaser.Device.desktop && this.getPlayerDirection() === 'backward') {
                                    this.confirmTarget('backward',targ);
                                    return;
                                } else { this.confirmTarget('backward',targ); return; }
                        } else if (targetAngle < -0.785 && targetAngle > -2.356 ) {
                                if (Phaser.Device.desktop && this.getPlayerDirection() === 'forward') {
                                    this.confirmTarget('forward',targ);
                                    return;
                                } else { this.confirmTarget('forward',targ); return; }
                        } else if (targetAngle > -2.356 || targetAngle < -2.356) {
                                if (Phaser.Device.desktop && this.getPlayerDirection() === 'right') {
                                    this.confirmTarget('right',targ);
                                    return;
                                } else { this.confirmTarget('right',targ); return; }
                        }
                    }
                    // if (Phaser.Device.desktop) {
                    //     // shift player to face possible target if on mobile and wasn't facing any baddie
                    //     var pivotTarget = this.game.enemyGroup.children.find(enemy => {
                    //         this.game.physics.arcade.distanceBetween(this.game.player,enemy) <= 62
                    //     });
                    //     if (pivotTarget !== undefined) {

                    //     }
                    // }
                }
            }

            if (this.game.atlas[this.game.currentStage].isDungeon) this.attack(this.getPlayerDirection(),null); // empty attack if nothing found and in dungeon
        }
    }

    confirmTarget(dir,targ) {
       switch (targ.isType) {
        case 'ENEMY':
            // only Kenney can attack
            if (this.game.currentCharacter === 'jasonKenney') this.attack(dir,targ);
            break;
        case 'NPC':
            this.talk(dir,targ);
            break;
        case 'OBJECT':
            this.engageItem(targ);
            break;
        case 'BOSS':
            this.attack(dir, targ);
       }
    }

    getPlayerDirection() {
        let dir = "";
        if (this.animations.currentAnim.name === "walk-forward" || this.animations.currentAnim.name === "armed-forward" || this.animations.currentAnim.name === "attack-forward") {
            dir = "forward";
        } else if (this.animations.currentAnim.name === "walk-backward" || this.animations.currentAnim.name === "armed-backward" || this.animations.currentAnim.name === "attack-backward") {
            dir = "backward";
        } else if (this.animations.currentAnim.name === "walk-left" || this.animations.currentAnim.name === "armed-left" || this.animations.currentAnim.name === "attack-right") {
            dir = "right";
        } else if (this.animations.currentAnim.name === "walk-right" || this.animations.currentAnim.name === "armed-right" || this.animations.currentAnim.name === "attack-left") {
            dir = "left";
        }
        return dir;
    }

    // setPlayerDirection(dir) { // so far, not called. Trying to located source of player sprite facing camera on dialogue up
    //     const dirDict = {
    //         'forward' : 'f',
    //         'backward' : 'b',
    //         'left': 'l',
    //         'right': 'r'
    //     }
    //     let type = this.game.atlas[this.game.currentStage].isDungeon?'armed':'';
    //     this.frameName = `hero-m${type}${dirDict[dir]}/_01.png`;
    // }

    attack(dir,targ) {
        if (!this.isAttacking) {
            this.body.velocity.setTo(0);
            this.isAttacking = true;
            this.currentState = "_ATTACKING";
            if (targ !== null ) {
                var attackDelay = this.game.time.events.add(36,() => {
                    targ.hit(dir);
                });
            }
            switch (dir) {
                case 'forward':
                    this.attackFwd.play();
                break;
                case 'backward':
                    this.attackBwd.play()
                break;
                case 'left':
                    this.attackRgt.play();
                break;
                case 'right':
                    this.attackLft.play();
                break;
            }
        }
    }

    resetAttackState() {
        this.isAttacking = false;
        this.currentState = "_NEUTRAL";
        this.animations.play('armed-'+ this.getPlayerDirection()).stop();
    }

    read(targ) {
        this.game.dialogue.initRead(targ);
    }
 
    talk(dir,targ) {
        this.game.dialogue.initDialogue(dir,targ);
    }

    engageItem(targ) {
        switch(targ.data.objectType) {
            case 'sign':
            if (targ.data.hasOwnProperty('itemFunction')) {
                this.game.npcFunctions[targ.data.itemFunction]();
                targ.destroy();
            } else {
                this.game.dialogue.sign(targ.data.message,targ.data.objectType);
            }
                break;
            case 'bbq':
                this.game.camera.flash(0xffffff,800);
                this.restoreHealth(this.maxHealth);
                this.game.sfx.play('sfx_healthFull');
                break;
            case 'sigil':
                this.game.actions.activateSigil(targ);
                break;
            case 'sigil-truck':
                this.game.actions.playHorn(targ);
                break;
            case 'chest':
                if (targ.data.itemName === "Axe Head" || targ.data.itemName === "Axe Handle") {
                    this.axeCheck(targ.data.itemName);
                } else if (targ.data.itemName === "Max Health Increased") {
                    this.game.sfx.play('sfx_recharge');
                    this.game.data.players.jasonKenney.maxHealth = this.game.data.players.jasonKenney.maxHealth + 2;
                    this.game.player.maxHealth = this.game.data.players.jasonKenney.maxHealth;
                    this.game.player.health = this.game.player.maxHealth;
                    //sfx?
                    this.game.healthPanel.redrawIcons(); // refresh health icons
                    this.game.dialogue.alert(`${targ.data.itemName}`,'acquired');
                    this.game.actions.removeCacheObject("kq02-mountains-00", ["type", "object"], ["objectType", "chest"]);
                } else {
                    var chestItem = new PickupItem(this.game,0,0,"sprites","trigger.png",targ.data);
                    this.game.mapWorld.pickupItem(null,chestItem);
                    this.game.dialogue.alert(`${targ.data.itemName}`,'acquired');
                    this.game.actions.removeCacheObject("kq02-mountains-00",["type","object"],["objectType","chest"]);
                }
                targ.destroy();
                break;
        }
    }

    axeCheck(_itemName) { // function to check for axe parts

        const createGreatAxe = () => {
            this.removeInventoryItem("Axe Head");
            this.removeInventoryItem("Axe Handle");
            this.game.dialogue.alert(`${_itemName} acquired! You now have the Great Carbon Tax Axe!`, 'acquired');
            this.game.actions.removeCacheObject("kq02-mountains-00", ["type", "object"], ["objectType", "chest"], ["itemName", _itemName]);
            _itemName = "Great Axe"
        }
        
        if (_itemName === "Axe Head" && this.hasItem("Axe Handle")) {
            createGreatAxe();
        } else if (_itemName === "Axe Handle" && this.hasItem("Axe Head")) {
            createGreatAxe();
        } else {
            this.game.dialogue.alert(`${_itemName} acquired!`, 'acquired');
            this.game.actions.removeCacheObject("kq02-mountains-00", ["type", "object"], ["objectType", "chest"],["itemName",_itemName]);
        }
        
        let data = { itemName: _itemName, key: "inventoryItem" }
        var axeItem = new PickupItem(this.game, 0, 0, "sprites", "trigger.png", data);
        this.game.mapWorld.pickupItem(null, axeItem);
        
    }

    restoreHealth(num) {
        this.health = this.health + num;

        // set health of core player object
        this.game.data.players.jasonKenney.health = this.health + num;

        if (this.health > this.maxHealth) this.health = this.maxHealth;
        this.game.healthPanel.drawHealthIcons(this.health);
    }

    removeInventoryItem(id) {
        this.data.inventory.forEach((item,i) => {
            if (item.id === id) this.data.inventory.splice(i,1);
        });
    }

    addQuest = (id,isNewWaypoint) => {

        // check if player doesn't already have quest
        if (this.data.quests.find(quest => quest.id===id ) || this.data.completedQuests.find(questId => questId===id ) ) { 
            
            return;
        }

        this.data.quests[this.game.player.data.quests.length++] = this.game.quests[id];
        //this.game.player.data.quests.push = this.game.quests[id];
        
        

        this.game.dialogue.alert('Quest acquired!','acquired');

        //then update current map with available, valid waypoints
        this.updateWaypoints(id,isNewWaypoint);
    }

    updateQuest = (id,prevNodeIndex,returnTarget) => {
        
        
        // cycle through player's quests
        for (let i=0;this.data.quests.length > i;i++) {
            //find the matching id
            if (this.data.quests[i].id === id) {
                // set that matching id's complete node to true
                this.data.quests[i].nodes[prevNodeIndex].complete = true; // cycle through player quest object, find quest by id, then update nodes so first false returned then set to true
                let newIndex = prevNodeIndex+1;
                
                
                // if set to return a target node number, return it
                if (returnTarget) {

                    // check whether there are any more nodes in list. If not, quest is complete
                    if(this.data.quests[i].nodes[newIndex] === undefined) {
                        
                        this.removeQuest(id);
                        return 'quest complete';
                    } else {
                        return this.data.quests[i].nodes[newIndex];
                    }

                } else {
                    return;
                }
                // or if it's a new quest player doesnt have, add it
            } else if (i === this.data.quests.length-1) {
                this.addQuest(id);
                if (returnTarget) {
                    return this.data.quests[this.game.player.data.quests.length-1].nodes[prevNodeIndex++];
                } 
            }
        }
    }

    getQuestTarget = (id,prevNodeIndex) => {
        

    }

    removeQuest = (id) => {
        //debugger;
        for (let i=0;this.game.player.data.quests.length > i;i++) {
            if (this.game.player.data.quests[i].id === id) {
                
                

                // remove from player's active quests
                this.data.quests.splice(i,1);
                
                //add to player's completedQuests
                this.data.completedQuests.push(id);

                // store it
                this.game.tData("questsCompleted",id)
                
                // notify player
                this.game.dialogue.alert('Quest completed!','completed');
            } else {
                console.error('removeQuest fn: No quest with given id found');
            }
        }
    }

    getPlayerQuestIndex = (_id) => {
        const playerQuests = this.data.quests;
        var index = 0;
        playerQuests.map((quest,i) => {
            if (quest.id === _id) {
                
                index = i;
            }
        });
        return index

    }

    updateWaypoints = (_id,isNewWaypoint) => {
        // cycle through player's active quests
        
        const waypoints = this.game.waypointGroup.children;
        
        const questObj = this.data.quests[this.getPlayerQuestIndex(_id)];

        

        //search questObj.nodes.completed for first 'false'. You'll use that node's target property
        let activeQuestNode = questObj.nodes.find(child => {
            if (child.complete === false) return child;
        });

        

        if (isNewWaypoint && activeQuestNode !== undefined) { //create new waypoint
            //if activeQuestNode undefined:
                // potentially already completed and all node complete bools set to true
            this.game.mapWorld.createSingleCharacterQuestWaypoint(activeQuestNode);
        } else {
            // let wp = waypoints.find((child) => {
            //     if (child.questId === _id) this.game.mapWorld.updateWaypoint(activeQuestNode.target);
            // });
            //let wp = waypoints.find(child => { return child.data.questId === _id });
            
            this.game.mapWorld.updateWaypoint(activeQuestNode.target);
        }

    }

    currentActiveQuestNode = (_id,_node) => {
        const questId = _id.substring(0,_id.length-2);
        let questObj = this.data.quests.find(quest => quest.id === questId);
        if (questObj !== undefined) {

            if (!questObj.nodes[_node].complete && questObj.nodes[_node-1].complete) return true;
            
        } 
        return false;
    }

    hasItem = (_item) => {
        // search inventory for item
        var findItem = this.data.inventory.find(invItem => { return invItem.id === _item});
        return findItem !== undefined ? true : false;
    }

    crystalAcquired = (_crystal,_callback) => {
        this.game.musicHandler.stop();
        this.game.musicHandler.play('achievement');
        this.game.time.events.add(4840,()=>{ this.game.musicHandler.setMusic(this.game.currentStage) })
        this.game.data.players.jasonKenney.crystals.push(_crystal);
        this.frameName = 'hero-cheer/_01.png';
        this.game.dialogue.alert(`${_crystal} acquired!`);
        this.game.time.events.add(3000,() => {
            this.frameName = 'hero-maf/_01.png';
            if (_callback) _callback();
        });
        // crsytal panel flashes, indicating addition

        // sfx and music
        // animation for acquisition
        // crystal added to inventory
        // callback runs
    }

}
