import { Background } from "./background.js";
import { Game } from "./game.js";

/** Screen to shown title, win and lost */
export abstract class Screen extends Background {
    private visible: boolean;

    /**
     * Creates a screen.
     * @param visible - True, if screen should, be shown on start
     */
    constructor(visible: boolean = false) {
        const canvas = Game.canvas;
        super(0, canvas ? canvas.width : 0, canvas ? canvas.height : 0);
        this.visible = visible;
    }

    get view(): boolean { return this.visible; }

    /** shows the screen. */
    show(): void {
        this.visible = true;
    }
}