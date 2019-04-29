export class MusicHandler {

    musicSprite = null;


    constructor(game) {
        this.game = game;
        this.vol = 0;
        this.prevMusic = '';
        this.currMusic = '';
        this.setMusic(this.game.currentStage);

    }
    // eventually to become an object containing which music to play on which map. If music doesn't change upon arrival on new map, don't stop loop
    setMusic(stage) {
        
        if (this.musicSprite !== null) this.stop();
        this.prevMusic = this.currMusic;
        if (stage === 'kq02-calgary-00' || stage === 'kq02-calgary-01') {            
            this.currMusic = 'camp';

        } else if (stage === 'kq02-calgary-02' || stage === 'kq02-badlands-00' || stage === 'kq02-badlands-01' || stage === 'kq02-mountains-00' || stage === 'kq02-mountains-01' || stage === 'kq02-forest-00' || stage === 'kq02-caves-00' || stage === 'kq02-battle-01') {
            this.currMusic = 'theme-dungeon';
            
        } else if (stage == 'kq02-pantheon-00') {
            this.currMusic = 'theme-pantheon';
            
        } else if (stage === 'kq02-palace-00') {
            this.currMusic = "theme-ndp";

        } else if ( stage === "kq02-airship-00" || stage === "kq02-caves-01" || stage === "kq02-truckstop-00") {
            this.currMusic = "theme-fildebrandt";
        } else if ( stage === "kq02-edmonton-00" || stage === "kq02-edmonton-01") {
            this.currMusic = this.game.globalAchievements.finalStage?"theme-dungeon":"theme-edmonton";
        } else {
            this.currMusic = "camp"
        }

        //if (this.prevMusic !== this.currMusic) {
            if (this.musicSprite !== null) this.musicSprite.play(this.currMusic);
        //}
    }

    setVolume(_vol) {
        this.musicSprite.sounds[this.currMusic].volume = _vol;
    }

    play (str){
        if (str !== undefined) {
            this.musicSprite.play(str);
            this.currMusic = str;
        } else {
            this.setMusic(this.game.currentStage);
        }

    }

    stop (){
        this.musicSprite.stop();
    }

    pause() {
        this.musicSprite.sounds[this.currMusic].pause();
    }

    resume() {
        this.musicSprite.sounds[this.currMusic].resume();
    }


}