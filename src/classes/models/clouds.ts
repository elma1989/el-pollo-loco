import { Game } from "../game.js";
import { ImgHub } from "../img-hub.js";
import { Layer } from "../layer.js";

export class Clouds extends Layer {
    constructor(offset: number) {
        super(offset);
        this.y = 0;
    }

    async load(): Promise<void> {
        try {
            this.img = await this.loadImage(ImgHub.BACKGROUND.clouds[this.offset % 2]);
        } catch (e) {
            console.error(e);
        }
    }

    act(): void {
        this.move(-1);
        this.reset();
    }

    /** Sets clouds to the end of level. */
    private reset(): void {
        const canvas = Game.canvas;
        if (canvas && this.x < -canvas.width)
            this.x = 3 * canvas.width;
    }
}