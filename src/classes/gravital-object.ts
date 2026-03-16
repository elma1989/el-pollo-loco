import { AnimatedObject } from "./animated-object.js";
import { Game } from "./game.js";

/** An animated object, which has gravitation/ */
export abstract class GravitalObject extends AnimatedObject {
    static accelaration: number = 1;
    private fallingSpeed: number = 0;
    private yGround: number;
    private jumping: boolean = false;

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
    private isOnGround(): boolean {
        return this.y >= this.yGround;
    }

    /** Will be called on act(), if, object schould fall down. */
    protected falling(): void {
        if (this.isOnGround() && !this.jumping) {
            this.fallingSpeed = 0;
        } else {
            this.jumping = false;
            this.fallingSpeed += GravitalObject.accelaration
            this.y += this.fallingSpeed;
        }
    }

    protected jump(speed: number): void {
        if (this.isOnGround()) {
            this.jumping = true;
            this.fallingSpeed = -speed;
        }
    }
}