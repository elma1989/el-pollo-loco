import { DrawableObject } from './actor.class.js';
import { ImgHelper } from  '../helper/imghelper.class.js'

/** Respresense a screen */
class Screen extends DrawableObject{
    
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
        this.loadImage(ImgHelper.SCREENS.start);
    }
}