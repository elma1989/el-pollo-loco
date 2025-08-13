import { DrawableObject } from '../actor/actor.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';

/** Represents the backgound. */
class Background extends DrawableObject {

    static xPos = 0;

    /**
     * Creates a background-object.
     * @param {number} x X-Pos of background.
     * @param {number} y Y-Pos of background.
     * @param {number} height - Height of Background
     * @param {HTMLElement} canvas - Canvas-object, on which the background is drawn
     */
    constructor (x, y, height, canvas) {
        super (x, y, canvas.width, height)
    }

    /**
     * Puts the next picture on right hand side of current picture.
     * @param {number} gap - width of object
     */
    static nextXPos(gap) {
        Background.xPos += gap
    }
}

/** Represents the deepest Background. */
export class Air extends Background {

    /**
     * Creates an Air-Background.
     * @param {HTMLElement} canvas - Canvas-Object, on which Background is drawn.
     */
    constructor(canvas) {
        super(Air.xPos, 0, canvas.height, canvas);
        Air.nextXPos(canvas.width);
        this.loadImage(ImgHelper.BACKGROUND.air);
    }

    static nextXPos(gap) {
        Air.xPos += gap;
    }
}