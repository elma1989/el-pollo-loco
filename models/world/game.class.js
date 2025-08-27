import { Keyboard } from '../helper/keyboard.class.js';
import { World } from './world.class.js'

/** Does the game control. */
export class Game {
    
    world;
    
    constructor() {
        new Keyboard();
        this.clickManual();
        this.clickManualClose();
        this.clickImpressum();
        this.clickImpressumClose();
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
}