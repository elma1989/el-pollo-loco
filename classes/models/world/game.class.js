import { Keyboard } from '../../helper/keyboard.class.js';
import { World } from './world.class.js'
import { AudioHub } from '../../helper/audiohub.class.js';
import { ImgHelper } from '../../helper/imghelper.class.js';

/** Does the game control. */
export class Game {
    
    world;
    musicBtn = document.getElementById('music-btn');
    soundBtn = document.getElementById('sound-btn');
    
    constructor() {
        new Keyboard();
        this.clickManual();
        this.clickManualClose();
        this.clickImpressum();
        this.clickImpressumClose();
        this.loadLocal();
        this.clickMuteMusic();
        this.clickMuteSound();
        this.world = new World();
    }

    /** Click-Event on Manual-Button. */
    clickManual() {
        document.getElementById('manual-btn').addEventListener('click', () => {
            document.getElementById('manual').classList.remove('d-none');
            document.getElementById('control-btns').classList.add('d-none');
        });
    }

    /** Click-Event on Manual-Close-Button. */
    clickManualClose() {
        document.getElementById('man-close').addEventListener('click', () => {
            document.getElementById('manual').classList.add('d-none');
            document.getElementById('control-btns').classList.remove('d-none');
        });
    }

    /** Click-Event on Impressum-Button. */
    clickImpressum() {
        document.getElementById('impressum-btn').addEventListener('click', () => {
            document.getElementById('impressum').classList.remove('d-none');
            document.getElementById('control-btns').classList.add('d-none');
        });
    }

    /** Click-Event on Impressum-Close-Button. */
    clickImpressumClose() {
        document.getElementById('imp-close').addEventListener('click', () => {
            document.getElementById('impressum').classList.add('d-none');
            document.getElementById('control-btns').classList.remove('d-none');
        });
    }

    /** Click-Event on music note. */
    clickMuteMusic() {
        this.musicBtn.addEventListener('click', () => {
            this.toggleMusic();
        });
    }

    /** Click-Event on Speaker. */
    clickMuteSound() {
        this.soundBtn.addEventListener('click', () => {
            this.toggleSound();
        });
    }

    /** Schwitches Music on and off. */
    toggleMusic() {
        if(AudioHub.muteMusic) {
            AudioHub.muteMusic = false;
            this.musicBtn.children[0].src = ImgHelper.SOUND.music.on;
        } else {
            AudioHub.muteMusic = true;
            this.musicBtn.children[0].src = ImgHelper.SOUND.music.off;
        }
        this.saveLocal();
    }

    /** Switches Sound on and off. */
    toggleSound() {
        if(AudioHub.muteAll) {
            AudioHub.muteAll = false;
            if (!AudioHub.muteMusic) this.musicBtn.children[0].src = ImgHelper.SOUND.music.on
            this.soundBtn.children[0].src = ImgHelper.SOUND.sound.on
        } else {
            AudioHub.muteAll = true;
            this.musicBtn.children[0].src = ImgHelper.SOUND.music.off
            this.soundBtn.children[0].src = ImgHelper.SOUND.sound.off
        }
        this.saveLocal();
    }

    /** Saves the sound settings in local storage. */
    saveLocal() {
        const sndSettings = {
            muteMusic: AudioHub.muteMusic,
            muteAll: AudioHub.muteAll
        }
        localStorage.setItem('sndSettings', JSON.stringify(sndSettings));
    }

    /** Restores from local strorage. */
    loadLocal() {
        const localStrored = localStorage.getItem('sndSettings');
        if (localStrored) {
            const sndSettings = JSON.parse(localStrored);
            if (sndSettings.muteMusic) this.toggleMusic();
            if (sndSettings.muteAll) this.toggleSound();
        }
    }
}