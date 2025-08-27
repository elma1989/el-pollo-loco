

class MyAudio {

    sound;
    loaded = false;

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
    static BACKGROUND = new MyAudio('assets/sounds/background.mp3')
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
    };

    static ALLFILES = [
        AudioHub.GAME,
        AudioHub.BACKGROUND,
        AudioHub.PEPE.walk,
        AudioHub.PEPE.snoring,
        AudioHub.PEPE.jump,
        AudioHub.PEPE.hurt,
        AudioHub.PEPE.dead,
        AudioHub.ENEMY.chick,
        AudioHub.ENEMY.chicken,
        AudioHub.ENEMY.boss,
        AudioHub.COLLECTABLES.coin,
        AudioHub.COLLECTABLES.bottle.collect,
        AudioHub.COLLECTABLES.bottle.break
    ]
    // #endregion

    // #region Methods
    /**
     * Plays a sound once.
     * @param {MyAudio} sound - Sound to play.
     */
    static playOne(sound) {
        sound.played = false;
        if (sound.sound.readyState == 4 || sound.loaded) {
            sound.loaded = true;
            sound.sound.play();
        }
    }

    static stopOne(sound) {
        sound.sound.pause();
    }

    static stopAll() {
        AudioHub.ALLFILES.forEach(audio => {
            audio.sound.pause()
        });
    }
    // #endregion
}