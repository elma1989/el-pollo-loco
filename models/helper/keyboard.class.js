export class Keyboard {
    
    static LEFT = false;
    static RIGHT = false;
    static SPACE = false;
    static CTRL = false;

    constructor() {
        this.addKeyDown();
        this.addKeyUp();
    }

    addKeyDown() {
        window.addEventListener('keydown', e => {
            switch(e.code) {
                case 'ArrowLeft':
                    Keyboard.LEFT = true;
                    break;
                case 'ArrowRight':
                    Keyboard.RIGHT = true;
                    break;
                case 'ControlLeft':
                    Keyboard.CTRL = true;
                    break;
                case 'Space':
                    Keyboard.SPACE = true;
            }
        });
    }

    addKeyUp() {
        window.addEventListener('keyup', e => {
            switch(e.code) {
                case 'ArrowLeft':
                    Keyboard.LEFT = false;
                    break;
                case 'ArrowRight':
                    Keyboard.RIGHT = false;
                    break;
                case 'ControlLeft':
                    Keyboard.CTRL = false;
                    break;
                case 'Space':
                    Keyboard.SPACE = false;
            }
        });
    }

    keyInfo() {
        console.log('LEFT: ', Keyboard.LEFT);
        console.log('RIGHT: ', Keyboard.RIGHT);
        console.log('CTRL: ', Keyboard.CTRL);
        console.log('SPACE: ', Keyboard.SPACE);
    }
}