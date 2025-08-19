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
        walk: new MyAudio('assets/sounds/pepe/walk.mp3'),
        snoring: new MyAudio('assets/sounds/pepe/snoring.mp3'),
        jump: new MyAudio('assets/sounds/pepe/jump.wav'),
        hurt: new MyAudio('assets/sounds/pepe/hurt.mp3'),
        dead: new MyAudio('assets/sounds/pepe/dead.wav')
    };
    static ENEMY = {
        chick: new MyAudio('assets/sounds/enemy/chick-dead.mp3'),
        chicken: new MyAudio('assets/sounds/enemy/chicken-dead.mp3'),
        boss: new MyAudio('assets/sounds/enemy/boss.wav')
    };
    static COLLECTABLES = {
        coin: new MyAudio('assets/sounds/collectables/coin.wav'),
        bottle: {
            collect: new MyAudio('assets/sounds/collectables/bottle-collect.wav'),
            break: new MyAudio('assets/sounds/collectables/bottle-break.mp3')
        }
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