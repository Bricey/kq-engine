import powerupType from './powerup-type';


export class PickupItem extends Phaser.Sprite {

    constructor(game,x=0,y=0,key = "sprites",frame,data,dropped) {
        super(game,x,y,key,frame,data);

        this.game = game;
        
        this.data = data;

        // this.powerupType = this.powerupType.default
        
        if (frame === null) {
            this.frameName = `${this.data.subClass}.png`;
        } else {
            this.frameName = frame+".png";
        }
        
        if (dropped && this.data.key === "powerup") {
            game.physics.arcade.enable(this);
            this.body.onOverlap = new Phaser.Signal();
            this.body.immovable = true;
            this.body.collideWorldBounds = true;
            this.body.setSize(16, 16, 0, 0);
            this.anchor.setTo(0.5);
            this.game.pickupGroup.add(this);
            // has random velocity upon creation
            this.body.velocity.x = Phaser.Utils.randomChoice(1,-1) * 60;
            this.body.velocity.y = Phaser.Utils.randomChoice(1,-1) * 60;
            this.velocityTimer = this.game.time.events.add(300,()=> {
                this.body.velocity.setTo(0);
            });
        }
    }

    initPowerup = () => {
        if (this.data.class === "health") {
            this.game.sfx.play('sfx_health');
            this.game.player.restoreHealth(powerupType[this.data.subClass]);
        } else if (this.data.class === "maxHealth") {
            // Increase player maxHealth
        } else if (this.data.class === "increaseMaxHealth") {
            this.game.data.players.jasonKenney.maxHealth += 2;
            this.game.player.maxHealth += 2;
            this.game.healthPanel.redrawIcons();
            this.game.player.restoreHealth(this.game.player.maxHealth);
        }
    }

    initInventoryItem = (item) => {
        
        // add to player inventory
        if (this.game.player.data.inventory.length < 5) {
            this.game.player.data.inventory.push(powerupType[item.itemName]); // Push item from powerupType directory to player inventory
            
            this.game.sfx.play('sfx_item');
            this.game.dialogue.alert(`${item.itemName} acquired!`,'acquired')
            if (item.initFunction !== undefined) { this.game.npcFunctions[item.initFunction]() } // initialise object's function if it exists 
        } else {
            // NOT ENOUGH ROOM ALERT! May not be necessary....
        }
    }

}