export class Waypoint extends Phaser.Sprite {

    constructor(game,x = 0, y = 0, key = "sprites", frame, data) {
        super(game,x,y,key,frame,data);

        this.game = game;
        this.frameName = frame;
        this.data = data;
        this.questId = data.questId;
        this.anchor.setTo(0,0.5);
        //this.game.add.existing(this);

        // create animations
        this.animations.add('new-waypoint',Phaser.Animation.generateFrameNames('ui-waypoint-new-0',1,7,'.png'),8,true);

        this.animations.add("active-waypoint", Phaser.Animation.generateFrameNames("ui-waypoint-active-onscreen-0", 1, 7, ".png"), 8, true);

        if (this.data.status === 'new') {
            // create new quest waypoint
            this.y = y-56;
            this.animations.play('new-waypoint');
        } else if (this.data.status === 'active') {
            this.y = y-56;
            this.animations.play('active-waypoint');
        }
    }

    update() {
        if (!this.visible) return;
        if (this.data.target !== null) {
            if (this.data.target.inCamera) {
                this.angle = 0;
                this.anchor.setTo(0,0.5)
                this.position.setTo(this.data.target.x-18,this.data.target.y-56);
            } else {
                this.anchor.setTo(0.5);
                this.frameName = `ui-waypoint-${ this.data.status }.png`;
                this.position.setTo(this.returnX(),this.returnY());
                this.angle = this.returnAngle()-90;
                // this.x = this.game.camera.x ;
                // this.y = this.game.camera.y;
            }
        } 
    }

    returnAngle = () => {
        const playerPos = this.game.player.position;
        const targetPos = this.data.target.position;
        return Phaser.Math.radToDeg(Phaser.Math.angleBetweenPoints(playerPos,targetPos));
    }

    returnX = () => {
        const camX = this.game.camera.x+24;
        const xLimit = camX + this.game.camera.width-48;
        const targX = this.data.target.x;
        if (camX > targX) {
            return camX;
        } else if (targX > camX && xLimit > targX ) {
            return targX;
        } else {
            return xLimit;
        }
    }

    returnY = () => {
        const camY = this.game.camera.y+24;
        const yLimit = camY + this.game.camera.height-48;
        const targY = this.data.target.y;
        if (camY > targY) {
            return camY;
        } else if (targY > camY && yLimit > targY) {
            return targY;
        } else {
            return yLimit;
        }
    }

    activate = () => {
        this.data.status = 'active';
        this.animations.play('active-waypoint');
    }

}