import { Background } from "./background.js";
import { Game } from "./game.js";

export abstract class Layer extends Background {
    constructor(offset: number) {
        super(
            offset,
            Layer.calcY(),
            Layer.calcHeight()
        );
    }

    /**
     * Calculates y-position of layer.
     * @returns Y-Position of layer.
     */
    static calcY(): number {
        const canvas = Game.canvas;
        if (!canvas) return 0;
        return canvas.height - canvas.width * Background.RATIO;
    }

    /**
     * Calculates height of layer.
     * @returns Height of layer.
     */
    static calcHeight(): number {
        const canvas = Game.canvas;
        if (!canvas) return 0;
        return canvas.width * Background.RATIO;
    }
}