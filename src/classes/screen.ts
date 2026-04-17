import { Background } from "./background.js";
import { Game } from "./game.js";

/** Screen to shown title, win and lost */
export abstract class Screen extends Background {

    /**
     * Creates a screen.
     * @param visible - True, if screen should, be shown on start
     */
    constructor(visible: boolean = false) {
        const canvas = Game.canvas;
        super(0, 0, canvas ? canvas.height : 0, visible);
    }
}