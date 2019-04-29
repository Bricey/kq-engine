import EventEmitter from 'super-event-emitter';

export class BossFight {
    boundary = null;
    constructor(game,_boss,_bossType) {
        this.game = game;
        this.boss = _boss;
        this.bossType = _bossType;

        EventEmitter.mixin(this);
        
        // create life meter
        this.lifeMeterFrame = this.game.add.graphics(0, 0);
        this.lifeMeterFrame.beginFill(0x000000, 1);
        this.lifeMeterFrame.drawRect(0, 0, this.game.camera.width, 6);
        this.lifeMeterFrame.endFill();
        this.lifeMeterFrame.anchor.setTo(0, 0);
        this.lifeMeterFrame.fixedToCamera = true;
        this.lifeMeterFrame.scale.x = 1;

        this.lifeMeter = this.game.add.graphics(0, 0);
        this.lifeMeter.beginFill(0x29d629, 1); // bright green
        this.lifeMeter.drawRect(0, 0, this.game.camera.width, 6);
        this.lifeMeter.endFill();
        this.lifeMeter.anchor.setTo(0, 0);
        this.lifeMeter.fixedToCamera = true;
        this.lifeMeter.scale.x = 1;

        this.game.UIGroup.add(this.lifeMeterFrame,this.lifeMeter);

        this.boss.on('bossHit', this.bossHit, this);

        this.resetBossFight(_bossType);

        this.game.inventoryButton.on('inventoryEngaged',this.pauseTimers,this);
        this.game.questsButton.on('questsEngaged',this.pauseTimers,this);
        this.game.inventoryButton.on('inventoryClosed',this.activateTimers,this);
        this.game.questsButton.on('questsClosed',this.activateTimers,this);

        // start boss battle music
        if (this.bossType !== "dragon") {
            this.game.musicHandler.stop();
            this.game.musicHandler.play('boss-intro');
            this.game.time.events.add(15140,this.playMainBossTheme,this);
        }
        //console.log('AUDIO SPRITE',this.game.musicHandler.musicSprite);


         // lay down barrier at bottom of screen so player cannot pass outside camera at bottom
        this.create_camera_bottom_boundary();
    }

    playMainBossTheme = () => {
        this.game.musicHandler.play('boss-main');
    }

    create_camera_bottom_boundary = () => { // sprite to limit player to static camera bounds (boss fight)
        this.boundary = this.game.add.sprite(0,this.game.camera.height,"sprites","trigger.png");
        this.game.physics.arcade.enable(this.boundary);
        this.boundary.body.immovable = true;
        this.boundary.body.onCollide = new Phaser.Signal();
        this.boundary.body.setSize(this.game.camera.width,32);
        this.game.objGroup.add(this.boundary);
    }

    pauseTimers() {
        if (this.boss.attackTimer) this.boss.attackTimer.timer.pause();
        if (this.boss.pauseTimer) this.boss.pauseTimer.timer.pause();
        if (this.boss.movePauseTimer) this.boss.movePauseTimer.timer.pause();
        if (this.boss.moveTimer) this.boss.moveTimer.timer.pause();
    }

    activateTimers() {
        if (this.boss.attackTimer) this.boss.attackTimer.timer.resume();
        if (this.boss.pauseTimer) this.boss.pauseTimer.timer.resume();
        if (this.boss.movePauseTimer) this.boss.movePauseTimer.timer.resume();
        if (this.boss.moveTimer) this.boss.moveTimer.timer.resume();
    }

    bossHit() {
        if (this.boss.health > 0) {
            this.boss.health--;
            this.game.sfx.play('sfx_enemyHit');
            this.lifeMeter.scale.x = this.boss.health / this.boss.maxHealth;
            if (this.boss.health <= 0) {
                this.endBossFight();
            } else {
                if (this.boss.children.length > 0 && this.bossType !== 'rat-king') {
                    this.childTints()
                } else {
                    this.boss.tint = 0xff0000;
                    var tintTimer = this.game.time.events.add(100,() => {
                        this.boss.tint = 0xffffff;
                    });
                }
            }
        }
    }

    childTints() {
        this.boss.tint = 0xff0000;
        if (this.boss !== "invisible-hand") {
            this.boss.children.forEach(child => {
                child.tint = 0xff0000;
            });
        }
        var tintTimer = this.game.time.events.add(100,() => {
            this.boss.tint = 0xffffff;
            if (this.boss !== "invisible-hand") {
                this.boss.children.forEach(child => {
                    child.tint = 0xffffff;
                });
            }
        });
    }

    endBossFight() {
        this.game.stageInitFunction = null; // clear boss fight restart
        this.game.musicHandler.stop();
        //this.game.time.events.remove(this.boss.moveTimer);
        //this.game.time.events.remove(this.boss.attackTimer);
        if (this.boss.moveTimer !== undefined) this.boss.moveTimer.timer.remove();
        if (this.boss.attackTimer !== undefined) this.boss.attackTimer.timer.remove();
        this.game.time.events.removeAll();
        this.lifeMeterFrame.destroy();
        this.lifeMeter.destroy();
        this.boundary.destroy();
        //this.game.tData('bosses',this.bossType);

        switch (this.bossType) {
            case 'dragon':
                this.game.npcFunctions.end_dragon_bossFight(this.boss);
                // post-fight function
                break;
            case 'rat-king':
                this.game.npcFunctions.end_ratKing_bossFight(this.boss);
                // post-fight function
                break;
            case 'invisible-hand':
                // post-fight function
                this.game.npcFunctions.end_invisibleHand_bossFight(this.boss);
                break;

        }
        //enemy death animation
        // end music
        // center player, limit controls
    }

    resetBossFight(_bossType_) {
        // set this up for restart of boss fight
        switch (_bossType_) {
            case 'dragon':
                this.game.stageInitFunction = "reset_dragon_bossFight";
                break;
            case 'rat-king':
            this.game.stageInitFunction = "ratking_restart";
            break;
            case 'invisible-hand':
            this.game.stageInitFunction = "finalBoss_restart";
            break;
        }
    }
}