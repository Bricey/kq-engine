export class ProjectileSignal extends Phaser.Graphics {
	constructor(game,x,y,_anchor,_parent) {
		super(game,x,y);
		this.game = game;
		this.anchor = _anchor;
		this.parent = _parent;
		this.size = this.game.camera.width/4;

		this.beginFill(0xffffff,0.6);
		this.drawCircle(0,55,this.size);
		this.endFill();
		this.visible = false;
		
		/* circle created at origin of new projectile, quickly fades in as it recedes in size 
		before being called off stage when projectile fired */
		
	}

	update() {
		this.offset.x = this.anchor.x;
		//this.offset.y = this.anchor.y;
	}

	sig(_callback) {
		this.reset();
		this.graphicsData[0].fillColor = 0xffffff;
		this.width = this.size;
		this.height = this.size;
		this.visible = true;
		
		this.game.sfx.play('sfx_signal');

		let signalTween = this.game.add.tween(this).to({width:0,height:0,fillAlpha:0},600,Phaser.Easing.Quartic.In,true);
		signalTween.onComplete.add(() => {
			this.kill();
			if (this.parent.health > 0) _callback(this.parent);
		});
	}
}