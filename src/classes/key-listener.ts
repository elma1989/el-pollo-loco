import { IntervalHub } from "./interval-hub.js";

export class KeyListener {
    static KEY = {
        left:  false,
        right: false,
        space: false,
        ctrl: false
    }

    constructor() {
        this.aplyKeyDown();
        this.aplyKeyUp();
    }

    // #region Methods
    /** Logs all key-states. */
    private logKeys():void {
        for (const [key, value] of Object.entries(KeyListener.KEY)) {
            console.log(`${key}: ${value}`);
        }
    }

    /** Starts a loop to log keys. */
    private loopLogKeys() {
        IntervalHub.start(this.logKeys, 1000);
    }

    /** Adds EventListener for key down. */
    private aplyKeyDown() {
        window.addEventListener('keydown', e => {
            switch(e.code) {
                case 'ArrowLeft':
                    KeyListener.KEY.left = true;
                    break;

                case 'ArrowRight':
                    KeyListener.KEY.right = true;
                    break;

                case 'Space':
                    KeyListener.KEY.space = true;
                    break;

                case 'ControlLeft':
                    KeyListener.KEY.ctrl = true;
            }
        });
    }

    /** Adds EventListener for key up. */
    private aplyKeyUp() {
        window.addEventListener('keyup', e => {
            switch(e.code) {
                case 'ArrowLeft':
                    KeyListener.KEY.left = false;
                    break;
                
                case 'ArrowRight':
                    KeyListener.KEY.right = false;
                    break;

                case 'Space':
                    KeyListener.KEY.space = false;
                    break;
                
                case 'ControlLeft':
                    KeyListener.KEY.ctrl = false;
            }
        });
    }
    // #endregion
}