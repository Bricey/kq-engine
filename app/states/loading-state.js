import STATE_EVENTS from '../constants/state-events';

export class LoadingState extends Phaser.State {
    preload() {
        let loader = this.add.image(
            this.world.centerX-50,
            this.world.centerY,
            'loader'
        );

        //let logo = this.add.image(this.world.centerX, this.world.centerY - 70, 'np-logo');
        // logo.anchor.set(0.5);
        // logo.height = 100;
        // logo.width = 100;
        this.load.setPreloadSprite(loader);
        
        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        //load bitmpa font
        this.load.bitmapFont('VT323','assets/fonts/vt323.png','assets/fonts/vt323.xml');
        // this.load.bitmapFont('kingsQuest','assets/fonts/kingsQuest.png','assets/fonts/kingsQuest.xml');
        
        
        //this.load.image('player', 'assets/images/player.png');
        //this.load.image('kq2_mapTileset', 'assets/images/kq2_mapTileset.png');
        this.load.image('_WORLD-TILES-MASTER', 'assets/images/_WORLD-TILES-MASTER.png');
        this.load.image('pointer','assets/images/pointer.png');
        this.load.atlas('generic', 'assets/skins/generic-joystick.png', 'assets/skins/generic-joystick.json');
        this.load.atlas('sprites','assets/images/spriteAtlas_test.png','assets/maps/spriteAtlas_test.json');
        this.load.atlas('portraits','assets/images/portraits-atlas.png','assets/maps/portraits-atlas.json');
        this.load.atlas('bg-textures','assets/images/bg-textures.png','assets/maps/bg-textures.json');
        this.load.atlas('bc-ndp','assets/images/bc-ndp-atlas.png','assets/maps/bc-ndp-atlas.json');
        this.load.atlas('bosses-atlas','assets/images/bosses-atlas.png','assets/maps/bosses-atlas.json');
        // load music
        const musicURL = ['assets/audio/music/musicSprite.ogg','assets/audio/music/musicSprite.mp3'];
        this.load.audiosprite('music', musicURL, 'assets/audio/music/musicSprite.json');

        //load sfx
        const sfxURL = ['assets/audio/sfx/sfxSprite.ogg', 'assets/audio/sfx/sfxSprite.mp3'];
        this.load.audiosprite('sfx',sfxURL,'assets/audio/sfx/sfxSprite.json');
        

        // load background images -- eventually will make this an atlas. BG images scaled to world called in map.js
        this.load.image('bg-pantheon','assets/images/bg-pantheon.png');
        this.load.image('bg-clouds','assets/images/bg-clouds.png');


        // ------------- Load tilemaps ------------ //
        this.load.tilemap(
            'kq02-intro',
            'assets/maps/kq02-intro.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-calgary-00',
            'assets/maps/kq02-calgary-00.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-calgary-01',
            'assets/maps/kq02-calgary-01.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-calgary-02',
            'assets/maps/kq02-calgary-02.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
         this.load.tilemap(
             'kq02-calgary-03',
             'assets/maps/kq02-calgary-03.json',
             null,
             Phaser.Tilemap.TILED_JSON
         );
        this.load.tilemap(
            'kq02-pantheon-00',
            'assets/maps/kq02-pantheon-00.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-palace-00',
            'assets/maps/kq02-palace-00.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-mountains-00',
            'assets/maps/kq02-mountains-00.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-mountains-01',
            'assets/maps/kq02-mountains-01.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-forest-00',
            'assets/maps/kq02-forest-00.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-badlands-00',
            'assets/maps/kq02-badlands-00.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-badlands-01',
            'assets/maps/kq02-badlands-01.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-caves-00',
            'assets/maps/kq02-caves-00.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-caves-01',
            'assets/maps/kq02-caves-01.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-edmonton-00',
            'assets/maps/kq02-edmonton-00.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-edmonton-01',
            'assets/maps/kq02-edmonton-01.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-edmonton-02',
            'assets/maps/kq02-edmonton-02.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-edmonton-03',
            'assets/maps/kq02-edmonton-03.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-battle-00',
            'assets/maps/kq02-battle-00.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-battle-01',
            'assets/maps/kq02-battle-01.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-airship-00',
            'assets/maps/kq02-airship-00.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.load.tilemap(
            'kq02-truckstop-00',
            'assets/maps/kq02-truckstop-00.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );

    }

    create() {
        this.time.events.add(200, () => {
            this.game.trigger(STATE_EVENTS.LOADING_COMPLETED);
        });
    }

    update() {

    }

    render() {

    }
}
