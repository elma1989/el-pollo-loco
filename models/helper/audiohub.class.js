import { IntervalHub } from './intervalhub.class.js';

class MyAudio {

    sound;
    loaded = false;
    played = false;

    /**
     * Creates a special Audio.
     * @param {string} path - Path to Audiofile.
     */
    constructor(path) {
        this.sound = new Audio(path)
    }
}

export class AudioHub {
    // #region Attributes
    static GAME = new MyAudio('assets/sounds/start.mp3');
    static PEPE = {
        walk : new MyAudio('assets/sounds/pepe/walk.mp3')
    }
    // #endregion

    // #region Methods
    /**
     * Plays a sound once.
     * @param {MyAudio} sound - Sound to play.
     */
    static playOne(sound) {
        sound.played = false;
        setInterval (() => {
            if ((sound.sound.readyState == 4 || sound.loaded) && !sound.played) {
                sound.loaded = true;
                sound.played = true;
                sound.sound.play();
            }
        }, 200);
    }

    static stopOne(sound) {
        sound.sound.pause();
    }
    // #endregion
}