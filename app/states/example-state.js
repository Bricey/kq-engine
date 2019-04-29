import GAME from '../constants/game';
import STATE_EVENTS from '../constants/state-events';
import EventEmitter from 'super-event-emitter';
import { Player } from '../models/player';
import { Orientation } from '../constants/orientation';
import { Dialogue } from '../models/dialogue';
import { FullscreenButton } from '../models/fullscreen-button';
import { InventoryButton } from "../models/inventory-button";
import { QuestsButton } from "../models/quests-button";
import { HealthPanel } from "../models/health-panel";
import { Map } from "../models/map";

export class ExampleState extends Phaser.State {
    map = null;
    layer = null;
    pad = null;
    playerMovement = {};
    healthPanel = null;

    create() {

        

        // save game data to localHost
        if (!this.game.globalAchievements.marchToWar && this.game.currentStage !== "kq02-palace-00") this.saveGame();

        EventEmitter.mixin(this);
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 0;

        // if (this.game.stageInitFunction !== null && typeof this.game.stageInitFunction[0] !== 'function' ) {
        //     
        //      this.game.stageDismissFunction[0] = ""
        //     this.game.stageInitFunction[0] = ""; // for testing
        // }

        this.game.currentStage = this.game.currentStage || "kq02-calgary-00"; //Will eventually be new game start level
        this.game.currentCharacter = this.game.currentCharacter || "jasonKenney";
        
        this.game.player = new Player( //create player object
            this.game,
            //1930,360,
            this.game.startingPosition[0],this.game.startingPosition[1],
            // this.game.world.width / 2 + 300,
            // this.game.world.height / 2 + 500,
            "sprites",
            "",
            this.game.data.players[this.game.currentCharacter]
        );

        this.game.mapWorld = new Map(this, this.game, this.game.currentStage, '_WORLD-TILES-MASTER');

        //this.map = this.add.tilemap('kq02-test-01');
        //this.map.addTilesetImage('kq2_mapTileset');
        this.game.mapWorld.isDungeon = this.game.atlas[this.game.currentStage].isDungeon;
        //this.map.setCollision([1]);
        // this.groundLayer = this.map.createLayer('ground');
        // this.groundLayer.sendToBack();
        // this.groundLayer.resizeWorld();
        // this.groundLayer.wrap = true;
        // this.layer.debug = true;


        // if Player on dungeon map, use 'armed' animation. If in town, use 'walk' anim
        if (this.game.mapWorld.isDungeon) {
                this.playerMovement = { //Player either selects nothing, attacks enemy, talks to NPC, or engages with item
                forward: 'armed-forward',
                backward: 'armed-backward',
                right: 'armed-left',
                left: 'armed-right'
            }
            this.game.player.animations.play('armed-forward').stop();
        } else {
            this.playerMovement = {
                forward: 'walk-forward',
                backward: 'walk-backward',
                right: 'walk-left',
                left: 'walk-right'
            }
            this.game.player.animations.play('walk-forward').stop();
        }
        this.camera.follow(this.game.player);


        // Create Enemy Group
        //this.game.enemyGroup = this.add.group();
        //this.createEnemies();


        // for (var i=0;2>i;i++) {
        //     this.game.enemy = new Enemy (
        //         this.game,
        //         this.game.world.randomX,
        //         this.game.world.randomY
        //     );
        //     this.game.enemy.animations.play('walk-forward');
        //     this.game.enemyGroup.add(this.game.enemy);
        // }


        // Create NPC Group
        //this.game.NPCGroup = this.add.group();

        //create NPC
        // this.game.npc = new NPC (
        //     this.game,
        //     this.game.world.randomX,
        //     this.game.world.randomY,
        //     "sprites",
        //     "",
        //     {
        //         id:"01",
        //         static: false,
        //         name: 'Simon Bloom',
        //         portrait: 'bloom',
        //         dI:0,
        //         inventory: []
        //     }
        // );

        this.game.foregroundLayer.bringToTop();
        this.game.world.bringToTop(this.game.waypointGroup);

        //
        //

        //Create Projectile Group
        this.game.projectileGroup = this.add.group();

        //Create UI Group
        this.game.UIGroup = this.add.group();
            //add inventory button
        this.game.inventoryButton = new InventoryButton(this.game,this.game.camera.width-55,55,'sprites');
        this.game.UIGroup.add(this.game.inventoryButton);

        this.game.questsButton = new QuestsButton(this.game,this.game.camera.width - 155, 55, 'sprites');
        this.game.UIGroup.add(this.game.questsButton);

            //add health panel
        this.game.healthIconGroup = this.game.add.group();
        this.game.healthPanel = new HealthPanel(this.game,this);

        // Create dialogue window
        //this.game.dialogueGroup = this.add.group();
        this.game.dialogue = new Dialogue(this.game);
        //this.game.npcDialogue = new NpcDialogue(this.game);
        //this.game.npcFunctions = new NpcFunctions(this.game);


        // FullSreenButton currently omitted pending fix for switch to Phaser CE

        if (this.game.scale.compatibility.supportsFullScreen) { // only display fullscreen button if device supports it
            this.game.fullscreenButton = new FullscreenButton(this.game,20,25,"sprites");
        }
        

        // this.game.UIGroup.add(this.game.fullscreenButton);

        //set up crystals if crystalsLive achievement is true
        if (this.game.globalAchievements.crystalsLive && this.game.currentCharacter === 'jasonKenney') this.game.player.displayCrystals();

        // this.game.waypointGroup.children.forEach(waypoint => {
        //     
        // })


        // GOing to need option for keyboard OR mobile control selection

        //conditional for controller type. If mobile, setup virtual joystick. If desktop, use mouse and keyboard input.
        // CHANGE ! TO SWITCH BETWEEN DESKTOP AND MOBILE TESTS

        if(!this.game.device.desktop) {
                    this.orientation = new Orientation(this.game);      
                    if (this.game.controls.pad) {
                        this.game.controls.pad.destroy();
                        // For some reason, must destroy existing joystick here and recreate it. Otherwise a duplicate arises
                    }
                    this.game.controls.pad = this.game.plugins.add(Phaser.VirtualJoystick);
                    this.game.controls.stick = this.game.controls.pad.addStick(0, 0, 100, 'generic');
                    this.game.controls.stick.alignBottomLeft(20);
                    this.game.controls.buttonA = this.game.controls.pad.addButton(0, 0, 'generic', 'button1-up', 'button1-down');
                    this.game.controls.buttonA.alignBottomRight(20);
                    this.game.controls.buttonA.onDown.add(this.pressButtonA, this);                                    // Mobile controls
        } else {                                                                // Keyboard controls
            this.game.controls.dpad = this.game.input.keyboard.createCursorKeys();
            // this.game.controls.dpad = {};
            // this.game.controls.dpad.up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            // this.game.controls.dpad.down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            // this.game.controls.dpad.left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            // this.game.controls.dpad.right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            
            this.game.controls.apad = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.controls.apad.onDown.add(this.pressButtonA,this);
            this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.DOWN, Phaser.Keyboard.UP]);
            this.game.controls.inventory = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
            this.game.controls.quests = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
            this.game.controls.inventory.onDown.add(this.game.inventoryButton.initInventory,this.game.inventoryButton); // Open inventory button inside InventoryButton class (this.game.inventoryButton) on I keypress
            this.game.controls.quests.onDown.add(this.game.questsButton.initQuests,this.game.questsButton); // Open active quests dialogue
            this.game.onPause.add(this.doPausedUnpaused,this);
            this.game.onResume.add(this.doPausedUnpaused,this);
        }
        

        // EVENT SIGNALS
        this.game.dialogue.on('dialogueEngaged',this.pauseSprites,this);
        this.game.inventoryButton.on('inventoryEngaged',this.pauseSprites,this);
        this.game.questsButton.on('questsEngaged',this.pauseSprites,this);
        this.game.dialogue.on('dialogueClosed',this.activateSprites,this);
        this.game.inventoryButton.on('inventoryClosed',this.activateSprites,this);
        this.game.questsButton.on('questsClosed',this.activateSprites,this);

            // Create toggle for controller input
        this.game.toggleInput = (bool) => {
            if (bool === null) {
                if (!this.game.device.desktop) {
                    this.game.input.touch.enabled ? false : true;
                } else {
                    this.game.input.keyboard.enabled ? false : true;
                }
            } else {
                if (!this.game.device.desktop) {
                    this.game.input.touch.enabled = bool;
                } else {
                    this.game.input.keyboard.enabled = bool;
                }
            }
        }

        
        // set music
        if (!this.game.globalAchievements.marchToWar) {
            this.game.musicHandler.musicSprite = this.game.add.audioSprite('music');
            this.game.musicHandler.play();
        }

        
        // set sfx
        this.game.sfx = this.game.add.audioSprite('sfx');
        
        // set onBlur onFocus listeners
        this.game.onBlur.add(this.inactive,this);
        this.game.onFocus.add(this.resume,this);
        
        this.game.scale.refresh();
        //---END controller setup

        this.game.trigger(STATE_EVENTS.EXAMPLE_COMPLETED);

        //reset stageDismissFunction
        this.game.stageDismissFunction[0] = "";


        function isFunction(functionToCheck) {
            return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
        }

        // init new stage function
        // if (this.game.stageInitFunction !== null && typeof this.game.stageInitFunction === 'string') {
        //     
        //     this.game.npcFunctions[this.game.stageInitFunction]();
        // }
        if (this.game.stageInitFunction !== null) {
            if (isFunction(this.game.npcFunctions[this.game.stageInitFunction])) {
                this.game.npcFunctions[this.game.stageInitFunction]();
            } else {
                console.error('Current stageInitFunction object is not a function!!!');
            }
            
        }
        this.game.stageInitFunction = null;

        // update database tracking
        this.game.writeGameData();

        


        // if (this.game.stageInitFunction[0] !== "") {
        //     this.game.stageInitFunction[0]();
        //     this.game.stageInitFunction[0] = "";
        // }

        //this.game.enableEnemyObstacleCollide = true;
        
        //this.game.camera.flash('#000000'); // Fade in stage
        //this.game.world.bringToTop(this.game.waypointGroup); // bring waypoints to top of display list

        
    }

    inactive() {
        this.game.musicHandler.pause();
    }

    resume() {
        this.game.musicHandler.resume();
    }

    doPausedUnpaused() {
        this.game.input.mspointer.stop();
    }
    
    resize() {
        
    }
    
    update() {
        //this.game.enemy.isTouchingPlayer = false;
        this.game.foregroundLayer.alpha = 1;

        //ensure waypoint always at top
        //this.game.world.bringToTop(this.game.waypointGroup);

        //this.physics.arcade.collide(this.game.player, this.layer);
        this.physics.arcade.collide(this.game.player,this.game.enemyGroup);
        this.physics.arcade.collide(this.game.player,this.game.NPCGroup,this.playerNpcCollision);
        this.physics.arcade.collide(this.game.player,this.game.collisionLayer);
        this.physics.arcade.collide(this.game.player,this.game.projectileGroup,this.hitPlayer,null,this);
        //this.physics.arcade.collide(this.game.projectileGroup,this.game.collisionLayer,this.killProjectile,null,this);
        this.physics.arcade.collide(this.game.player, this.game.objGroup);
        //this.physics.arcade.collide(this.game.NPCGroup, this.game.objGroup);
        this.physics.arcade.collide(this.game.NPCGroup,this.game.collisionLayer);
        //this.physics.arcade.collide(this.game.enemyGroup,this.game.NPCGroup);
        this.physics.arcade.collide(this.game.enemyGroup,this.game.collisionLayer);
        //this.physics.arcade.collide(this.game.enemyGroup,this.game.objGroup);
        this.physics.arcade.overlap(this.game.player, this.game.stagesGroup, this.game.mapWorld.changeStage, null, this);
        this.physics.arcade.collide(this.game.player,this.game.foregroundLayer,this.game.mapWorld.fadeForeground,null,this);
        this.physics.arcade.overlap(this.game.player,this.game.pickupGroup,this.game.mapWorld.pickupItem,null,this);
        this.physics.arcade.overlap(this.game.player,this.game.triggerGroup,this.game.mapWorld.triggerFunction,null,this);


        if (this.game.player.health <= 0) {this.gameOver(); return;}
        if (this.game.player.isAttacking || this.game.player.isHit) return;
        if (this.game.player.isTalking || this.game.player.inventoryActive || this.game.player.questsActive) return;
        // Prevents NPCs knocking player when in a dialogue window, setting off velocity 
        //if (this.game.player.inventoryActive || this.game.player.questsActive) return;

        //if (!this.game.player.isAttacking || !this.game.player.isHit) {
            if (!this.game.device.desktop) {
                // MOBILE CONTROLS
                if (this.game.controls.stick.isDown) {
                    this.physics.arcade.velocityFromRotation(this.game.controls.stick.rotation,this.game.controls.stick.force * 280,this.game.player.body.velocity);
                    if (this.game.controls.stick.rotation > -0.75 && this.game.controls.stick.rotation <= 0.75 ) {
                        this.game.player.animations.play(this.playerMovement.right);
                    } else if (this.game.controls.stick.rotation > 0.75 && this.game.controls.stick.rotation <= 2.25) {
                        this.game.player.animations.play(this.playerMovement.forward);
                    } else if (this.game.controls.stick.rotation > -2.25 && this.game.controls.stick.rotation <= -0.75) {
                        this.game.player.animations.play(this.playerMovement.backward);
                    } else {
                         this.game.player.animations.play(this.playerMovement.left);
                    }   
                } else {
                    if (!this.game.player.isHit) {
                        this.game.player.body.velocity.set(0);
                        this.game.player.animations.stop();
                    }
                }
            } else {
                // DESKTOP CONTROLS

                

                

                if (this.game.controls.dpad.up.isDown) {
                    //
                    if (this.game.controls.dpad.left.isDown) {
                        this.game.player.body.velocity.set(-this.game.player.maxSpeed,-this.game.player.maxSpeed);
                    } else if (this.game.controls.dpad.right.isDown) {
                        this.game.player.body.velocity.set(this.game.player.maxSpeed,-this.game.player.maxSpeed);
                    } else {
                        this.game.player.body.velocity.set(0,-this.game.player.maxSpeed);
                        this.game.player.animations.play(this.playerMovement.backward);
                    }
                } else if (this.game.controls.dpad.down.isDown) {
                    if (this.game.controls.dpad.left.isDown) {
                        this.game.player.body.velocity.set(-this.game.player.maxSpeed,this.game.player.maxSpeed);
                    } else if (this.game.controls.dpad.right.isDown) {
                        this.game.player.body.velocity.set(this.game.player.maxSpeed,this.game.player.maxSpeed);
                    } else {
                        this.game.player.body.velocity.set(0,this.game.player.maxSpeed);
                        this.game.player.animations.play(this.playerMovement.forward);
                    }
                } else if (this.game.controls.dpad.left.isDown) {
                    this.game.player.body.velocity.set(-this.game.player.maxSpeed,0);
                    this.game.player.animations.play(this.playerMovement.left);
                } else if (this.game.controls.dpad.right.isDown) {
                    this.game.player.body.velocity.set(this.game.player.maxSpeed,0);
                    this.game.player.animations.play(this.playerMovement.right);
                } else {
                    if (!this.game.player.isHit && !this.game.player.isAttacking) {
                        this.game.player.body.velocity.set(0);
                        this.game.player.animations.stop();  
                    }
                }
                
            }
        //}
    }

    pressButtonA() { //If player engaged in dialogue, A button fires next in dialogue sequence. Otherwise, engages object

        if (this.game.dialogue.windowTween.isRunning) return; // cancel if dialogue window opening

        const determineAction = () => {
            (this.game.player.isTalking && !this.game.player.inventoryActive)?this.game.dialogue.nextDialogue():this.game.inventoryButton.select();                
        }
        if (!this.game.globalAchievements.marchToWar) this.game.player.isTalking?determineAction():this.game.player.engage(); // If player isTalking, pipe action between inventory and dialogue controls
    }

    playerMove() {
        
    }

    render() {
        // this.game.debug.body(this.game.player);
    }
    gameOver() {
        this.game.musicHandler.stop();
        //change state!!!!!
        this.game.state.start('Gameover');

    }

    togglePlayerControls(val) {
        //function to turn on and off player controls via keyboard
    }
   playerNpcCollision(p,npc) {
        p.body.velocity.set(0);
   }
    //     npc.animations.stop();
    //     npc.body.velocity.set(0);
    //     //p.body.velocity.set(0);
    // }
    toggleMobileControls(val) {
        this.game.controls.stick.visible = val;
        this.game.controls.buttonA.visible = val;
    }

    pauseSprites() {

        this.game.player.body.velocity.setTo(0);
        this.game.player.animations.stop();
        //this.game.player.frameName = 'hero-mf/_01.png'

        if (!this.game.device.desktop) { //Hide visibility of mobile controls
            this.toggleMobileControls(false);
        }
        
        this.game.enemyGroup.children.forEach(targ => {
            // targ.body.velocity.set(0);
            // targ.animations.stop();
            // targ.currentState = "_PAUSED";
            if (targ.data) { // THIS IS TEMPORARY!
                if (targ.data.isShooter) {
                    targ.shootingTimer.pause();
                }
            }
        });
        // this.game.NPCGroup.children.forEach(targ => {
        //     targ.body.velocity.set(0);
        //     targ.animations.stop();
        //     targ.currentState = "_PAUSED";
        // });
    }

    activateSprites() {
        if (!this.game.device.desktop) { //Hide visibility of mobile controls
            this.toggleMobileControls(true);
        }
        this.game.enemyGroup.children.forEach(targ => {
            // targ.body.velocity.set(0);
            // targ.animations.play('walk-forward');
            //targ.currentState = "_PATROL";
            if (targ.data) { // TEMPORARY!!
                if (targ.data.isShooter) {
                    targ.shootingTimer.resume();
                }
            }
        });
        //this.game.NPCGroup.children.forEach(targ => {
            // targ.body.velocity.set(0);
            // targ.animations.play('walk-forward');
            // targ.currentState = "_PAUSED";
        //});
    }
    hitPlayer(plyr,proj) {
        proj.hitPlayer();
    }
    killProjectile(proj,layr) {
        proj.kill();
    }

    saveGame() {
            this.game.data.gameData.companion = this.game.companion,
            this.game.data.gameData.globalAchievements = this.game.globalAchievements,
            this.game.data.gameData.currentCharacter = this.game.currentCharacter,
            this.game.data.gameData.currentStage = this.game.currentStage,
            this.game.data.gameData.startingPosition = this.game.startingPosition,
            this.game.data.gameData.stageInitFunction = this.game.stageInitFunction;
            this.game.data.gameData.atlas = this.game.atlas
        
        localStorage.setItem('kq02-data',JSON.stringify(this.game.data));

        // save all individual tilemaps
        this.game.tilemaps.forEach(tilemap => {
            localStorage.setItem(tilemap,JSON.stringify(this.game.cache.getTilemapData(tilemap)))
        },this);

    }

}
