import { DrawableObject } from './actor.class.js';
import { ImgHelper } from  '../../helper/imghelper.class.js'

/** Respresense a screen */
class Screen extends DrawableObject{
    
    visible = false;

    /** Creates a screen. */
    constructor() {
        super(0, 0, 800, 600);
    }
}

/** Repesents Start-Screen */
export class StartScreen extends Screen {

    /** Creates Start Sceen. */
    constructor() {
        super();
        this.visible = true;
        this.loadImage(ImgHelper.SCREENS.start);
    }
}

/** Screen for winning game. */
export class WinScreen extends Screen {
    
    /** Creates Win-Screen. */
    constructor() {
        super();
    }

    async loadAll() {
        await this.loadImage(ImgHelper.SCREENS.win);
    }
}

/** Screen for losing game. */
export class LoseScreen extends Screen {

    constructor() {
        super();
    }

    async loadAll() {
        await this.loadImage(ImgHelper.SCREENS.lost);
    }
}