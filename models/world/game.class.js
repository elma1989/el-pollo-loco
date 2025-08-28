import { Keyboard } from '../helper/keyboard.class.js';
import { World } from './world.class.js'
import { AudioHub } from '../helper/audiohub.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';

/** Does the game control. */
export class Game {
    
    world;
    
    constructor() {
        new Keyboard();
        this.clickManual();
        this.clickManualClose();
        this.clickImpressum();
        this.clickImpressumClose();
        this.toggleMuteMusic();
        this.toggleMuteSound();
        this.world = new World();
    }

    /** Click-Event on Manual-Button. */
    clickManual() {
        document.getElementById('manual-btn').addEventListener('click', () => {
            document.getElementById('manual').classList.remove('d-none');
        });
    }

    /** Click-Event on Manual-Close-Button. */
    clickManualClose() {
        document.getElementById('man-close').addEventListener('click', () => {
            document.getElementById('manual').classList.add('d-none');
        });
    }

    /** Click-Event on Impressum-Button. */
    clickImpressum() {
        document.getElementById('impressum-btn').addEventListener('click', () => {
            document.getElementById('impressum').classList.remove('d-none');
        });
    }

    /** Click-Event on Impressum-Close-Button. */
    clickImpressumClose() {
        document.getElementById('imp-close').addEventListener('click', () => {
            document.getElementById('impressum').classList.add('d-none');
        })
    }

    /** Scwich music on and off */
    toggleMuteMusic() {
        const musicBtn = document.getElementById('music-btn');
        musicBtn.addEventListener('click', () => {
            if(AudioHub.muteMusic) {
                AudioHub.muteMusic = false;
                musicBtn.children[0].src = ImgHelper.SOUND.music.on;
            } else {
                AudioHub.muteMusic = true;
                musicBtn.children[0].src = ImgHelper.SOUND.music.off;
            }
        })
    }

    /** Mutes and ummutes the Sound */
    toggleMuteSound() {
        const soundBtn = document.getElementById('sound-btn');
        const musicBtn = document.getElementById('music-btn');
        soundBtn.addEventListener('click', () => {
            if(AudioHub.muteAll) {
                AudioHub.muteAll = false;
                if (!AudioHub.muteMusic) musicBtn.children[0].src = ImgHelper.SOUND.music.on
                soundBtn.children[0].src = ImgHelper.SOUND.sound.on
            } else {
                AudioHub.muteAll = true;
                musicBtn.children[0].src = ImgHelper.SOUND.music.off
                soundBtn.children[0].src = ImgHelper.SOUND.sound.off
            }
        });
    }
}