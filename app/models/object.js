export class Obj extends Phaser.Sprite {
    constructor(game,x,y,key="sprites",frame,data) {
        super(game,x,y,key,frame,data);

        this.game = game;
        // this.frameName = "trigger.png";
        // this.game.physics.arcade.enable(this);
        // this.body.setSize(48,48,0,0);
        // this.body.immovable = true;
        // this.anchor.setTo(0.5);
        // this.isType = "OBJECT";
        this.data = data;
        this.game.objGroup.add(this);

        //

        // set parameters for each object type
        switch(this.data.objectType) {
            case 'blue-fire':
                this.setBlueFire()
                break;
            case 'orange-fire':
                this.setOrangeFire()
                break;
            case 'sign':
                this.setSign();
                break;
            case 'chest':
                this.setSign();
                break;
            case 'truck':
                this.setTruck();
                break;
            case 'pantheon-statue':
                this.setPantheonStatue();
                break;
            case 'bbq':
                this.setBBQ();
                break;
            case 'sigil':
                this.setSigil();
                break;
            case 'boat':
                this.setBoat();
                break;
            case 'siege-tower':
                this.setSiegeTower();
                break;
            case 'broken-siege-tower':
                this.setBrokenSiegeTower();
                break;  
            case 'fire':
                this.setFire();
                break; 
            case 'smartcar':
                this.setSmartCar();
                break;
            case 'sigil-truck':
                this.setTruck();
                break;
            case 'waypoint-node':
                this.setNode();
                break;
            case 'crystalHolder':
                this.setCrystalHolder();
                break;
        }
    }

    setNode = () => {
        this.anchor.setTo(0.5,1);
        this.frameName = "trigger.png";
    }

    setCrystalHolder = () => {
        this.anchor.setTo(0.5);
        this.frameName = `crystal-holder.png`;
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.isType = 'OBJECT';
        // create lightening
        var lightening = this.game.add.sprite(0,8,"sprites","lightening-01.png");
        lightening.anchor.setTo(0.5,0);
        lightening.animations.add('pulse',Phaser.Animation.generateFrameNames(`lightening-0`,1,2,'.png'),10,true);
        lightening.animations.play('pulse');
        this.addChild(lightening);
    }

    setSigil = () => {
        this.anchor.setTo(0.5,1);
        this.frameName = `sygil-${this.data.colour}-off.png`;
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.engageDistance = 90;
        //this.isType = "SIGIL";
        this.body.setSize(32,32,0,32);
        this.isType = 'OBJECT';
        this.activated = false;
    }

    setSmartCar = () => {
        this.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.body.setSize(55, 75, 0, 12);
        this.frameName = `smartcar_${this.data.colour}_00.png`;
        this.animations.add('drive',Phaser.Animation.generateFrameNames(`smartcar_${this.data.colour}_0`,0,1,'.png'),6,true);

        if (this.data.flag) {
            // create flag
            var flag = this.game.add.sprite(this.width / 2, this.height / 3, 'sprites', 'flag_ndp_0.png');
            flag.anchor.setTo(0.5, 1);
            flag.animations.add('drive', Phaser.Animation.generateFrameNames('flag_ndp_', 0, 1, '.png'), 5, true);
            this.addChild(flag);
        }
    }

    setFire = () => {
        this.anchor.setTo(0.5,1);
        //this.game.physics.arcade.enable(this);
        //this.body.immovable = true;
        this.animations.add('burn',Phaser.Animation.generateFrameNames('fire_',0,7,'.png'),8,true);
        this.animations.play('burn');
    }

    setSiegeTower = () => {
        this.anchor.setTo(0.5,0.82);
        this.frameName = 'siege-tower_0.png';
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.body.setSize(64,48,0,80);
        //this.isType = 'OBJECT';
        this.animations.add('drive',Phaser.Animation.generateFrameNames('siege-tower_',0,1,'.png'),6,true);
    }

    setBrokenSiegeTower = () => {
        this.anchor.setTo(0.5);
        this.frameName = 'siege-tower_2.png';
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.body.setSize(64,93,0,6);
    }

    setBoat = () => {
        this.anchor.setTo(0.5);
        this.frameName = `boat.png`;
    }

    setBlueFire = () => {
        this.anchor.setTo(0.5,0.92);
        this.animations.add('burn',Phaser.Animation.generateFrameNames(`fire-blue/_0`,1,5,`.png`),7,true);
        this.animations.play('burn');
    }

    setOrangeFire = () => {
        this.anchor.setTo(0.5,0.92);
        this.animations.add('burn',Phaser.Animation.generateFrameNames(`fire-orange/_0`,1,5,`.png`),7,true);
        this.animations.play('burn');
    }

    setSign = () => {
        this.frameName = "trigger.png";
        this.game.physics.arcade.enable(this);
        this.body.setSize(40,40,0,0);
        this.body.immovable = true;
        this.anchor.setTo(0.5);
        this.isType = "OBJECT";
        this.targetDistance = 72;
    }

    setTruck = () => {
        this.game.physics.arcade.enable(this);
        this.body.onCollide = new Phaser.Signal();
        this.body.immovable = true;
        this.anchor.setTo(0.5);
        this.isType = "OBJECT";
        const dir = this.parseCoords(this.data.direction);
        //this.game.objGroup.add(this);
        this.animations.add('drive-LR',Phaser.Animation.generateFrameNames(`${this.data.colour}_0`,1,2,'.png'),5,true);
        this.animations.add('drive-down',Phaser.Animation.generateFrameNames(`${this.data.colour}_0`,3,4,'.png'),5,true);
        this.animations.add('drive-up',Phaser.Animation.generateFrameNames(`${this.data.colour}_0`,5,6,'.png'),5,true);
        this.engageDistance = 120;
        //set direction
        if (dir[0] !== 0) { //horizontal
            this.frameName = `${this.data.colour}_01.png`;
            this.scale.x = dir[0];
            this.body.setSize(192,50,0,38);
        } else { //vertical
            this.body.setSize(56,100,10,26);
            if (dir[1] > 0) {
                this.frameName = `${this.data.colour}_03.png`; // up
            } else {
                this.frameName = `${this.data.colour}_05.png`; // down
            }
        } 

        if (this.data.flag) {
          // create flag
          const party = this.data.ndp?'ndp':'ucp';
          var flag = this.game.add.sprite(0,0,'sprites','flag_'+party+'_0.png');
          flag.anchor.setTo(0.5,this.data.ndp?1:0);
          flag.animations.add('drive', Phaser.Animation.generateFrameNames('flag_' +party+'_',0,1,'.png '),5,true);
          this.addChild(flag);
          
        }

        if (this.data.objectType === 'sigil-truck') this.isHonking = false;
    }

    setPantheonStatue = () => {
        this.isType = "OBJECT";
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.body.onCollide = new Phaser.Signal();
        this.anchor.setTo(0.5);
        //this.game.objGroup.add(this);
        this.frameName = "pantheon-statue.png";
        this.scale.x = this.data.direction*1;
    }

    setBBQ = () => {
        this.game.physics.arcade.enable(this);
        this.body.onCollide = new Phaser.Signal();
        this.body.immovable = true;
        this.anchor.setTo(0.5);
        this.frameName = "barbecue.png"
        this.body.setSize(64,30,0,9);
        this.isType = "OBJECT";
        //this.game.objGroup.add(this);

        // add smoke child
        const smoke = this.game.add.sprite(-16,-32,"sprites","bbq-smoke/_01.png");
        
        smoke.animations.add('smoke',Phaser.Animation.generateFrameNames('bbq-smoke/_0',1,3,'.png'),5,true);
        smoke.animations.play('smoke');
        this.addChild(smoke);

    }

    parseCoords = (str) => {
        // str is string containing xy coords from mapChange property. Comma separated values
        let array = [];
        let splitArray = str.split(",");
        array.push(parseInt(splitArray[0]));
        array.push(parseInt(splitArray[1]));
        return array;
    }
}