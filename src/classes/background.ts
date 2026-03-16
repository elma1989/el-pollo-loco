import { Game } from "./game.js";
import { MovableObject } from "./movable-object.js";

export abstract class Background extends MovableObject {
    // #region Attributes
    static WIDTH: number = 1920;
    static HEIGHT: number = 1080;
    static RATIO: number = 0.5625;
    private _offset: number;
    // #endregion

    constructor(offset: number, y: number, height: number) {
        super(
            Background.calcX(offset),
            y,
            Game.canvas ? Game.canvas.width : 0,
            height
        );
        this._offset = offset;
    }

    protected get offset(): number { return this._offset }

    /**
     * Calculates x-position of background.
     * @param offset - Number of background.
     * @returns X-Positon of background.
     */
    static calcX(offset: number): number {
        const canvas = Game.canvas;
        if (!canvas) return 0;
        return offset * canvas.width;
    }
    // #endregion
}