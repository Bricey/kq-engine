export class MapChangeSprite extends Phaser.Sprite {

    constructor(context,game,x = 0, y = 0, key = "sprites", data) {
        super(game,x,y,key,data);
        this.context = context;
        this.game = game;
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.onCollide = new Phaser.Signal();
        this.anchor.setTo(0.5);
        this.data = data;
        this.body.setSize(48,48,0,0);
        this.targetMap = this.data.stage;
        this.targetPosition = this.data.coords;
        if (data.questNodeId) this.questNodeId = data.questNodeId;
        if (this.data.function != undefined) this.function = this.data.function;

        this.frameName = "mapChange.png";
    }

}