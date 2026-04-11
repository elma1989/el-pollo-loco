import { DrawableObject } from "./drawable-object.js";

/** An drawalble object, which can move.*/
export abstract class MovableObject extends DrawableObject {
    static fps: number = 60;
    onMove?: (x: number) => void;

    /**
     * Creates an movable Object.
     * @param x - X-Position of object.
     * @param y - Y-Positon of object.
     * @param width - Width of object.
     * @param height - Height of object
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    /** Will be repeated 60 times per second. */
    act():void {}

    /**
     * Moves an Object horizontally.
    * @param speed - speed in pixel per interval.
     */
    protected move(speed: number) {
        this.x += speed;
        this.onMove?.(this.x);
    }
}