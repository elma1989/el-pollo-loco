import { DrawableObject } from '../actor/actor.class.js';

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