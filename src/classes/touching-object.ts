import { Offest } from "../interfaces/offset.js";
import { Game } from "./game.js";
import { GravitalObject } from "./gravital-object.js";

/** A GravitalObject, which has collision. */
export abstract class TouchingObject extends GravitalObject {
    private _offset: Offest = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
    private _real = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
    }

    /** Creates a TouchingObject. */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    get offset(): Offest { return this._offset; }

    set offset(offset: Offest) {
        this._offset = offset;
        this.calcRealRect();
    }

    get real() { return this._real; }

    /** Calculates real frame. */
    calcRealRect(): void {
        this._real.x = this.x + this.offset.left;
        this._real.y = this.y + this.offset.top;
        this._real.width = this.width - this.offset.left - this.offset.right;
        this._real.height = this.height - this.offset.top - this.offset.bottom;
    }

    /** Draws a blue frame around full object. */
    drawFrame(): void {
        const ctx = Game.ctx;
        if (ctx) {
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    /** Draws a red frame around offset of object. */
    drawRealFrame(): void {
        const ctx = Game.ctx;
        if (ctx) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.real.x, this.real.y, this.real.width, this.real.height);
        }
    }

    /**
     * Checks collision.
     * @param other - Object to touch.
     * @returns True, if this object touches other object
     */
    isTouching(other: TouchingObject): boolean {
        return this.real.x + this.real.width > other.real.x
            && this.real.x < other.real.x + other.real.width
            && this.real.y + this.real.height > other.real.y
            && this.real.y < other.real.y + other.real.height
    }
}