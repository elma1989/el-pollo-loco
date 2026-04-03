import { AnimatedObject } from "./animated-object.js";
import { Game } from "./game.js";

/** An animated object, which has gravitation/ */
export abstract class GravitalObject extends AnimatedObject {
    static accelaration: number = 1;
    private _fallingSpeed: number = 0;
    private yGround: number;
    private _jumping: boolean = false;
    private _fallingJump: boolean = false;
    private _wasFalling: boolean = false;

    /**
     * Creates an gravital object.
     * @param x - X-Pos of object.
     * @param y - Y-Pos of object.
     * @param width - Width of object.
     * @param height - Height of object.
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.yGround = GravitalObject.toGround(height);
    }

    // #region Methods

    get jumping(): boolean { return this._jumping; }

    set jumping(state: boolean)  { this._jumping = state; }

    get fallingJump(): boolean { return this._fallingJump; }

    get wasFalling(): boolean { return this._wasFalling; }

    get fallingSpeed(): number { return this._fallingSpeed; }

    set fallingSpeed(speed: number) {
        if (-100 <= speed && speed <= 0) this._fallingSpeed = speed;
    }

    /**
     * Calculates the ground level of the world.
     * @returns - Y-Pos of ground.
     */
    static calcGroundLevel(): number {
        const canvas = Game.canvas;
        if (!canvas) return 0;
        return canvas.height * 0.9
    }

    /**
     * Gets height of ground from a drawable objectj.
     * @param height - Height of DrawableObject
     * @returns - Y-Pos, if object is on ground
     */
    static toGround(height: number): number {
        return GravitalObject.calcGroundLevel() - height;
    }

    /**
     * Checks, if object is on ground.
     * @returns True, if object is on ground
     */
    isOnGround(): boolean {
        return this.y >= this.yGround;
    }

    /** Will be called on act(), if, object schould fall down. */
    protected falling(): void {
        this._fallingSpeed += GravitalObject.accelaration
        if (this.isOnGround() && !this.jumping) {
            this._fallingSpeed = 0;
            this._fallingJump = false;
        } else {
            if (this.fallingSpeed >= 0) {
                this._jumping = false;
                this._fallingJump = true;
                this._wasFalling = true;
            }
            this.y += this.fallingSpeed;
        }
    }

    /**
     * Checks, if object is falling.
     * @returns True, if object is falling
     */
    isFalling(): boolean { return this.fallingSpeed > 0 }

    resetFalling(): void { this._wasFalling = false; }

    /**
     * Moves an oject against gravitation
     * @param speed - Intialspeed for Jump.
     */
    protected jump(speed: number): void {
        if (this.isOnGround()) {
            this.jumping = true;
            this.fallingSpeed = -speed;
        }
    }
    // #endregion
}