import { Background } from "../background.js";
import { Game } from "../game.js";
import { ImgHub } from "../img-hub.js";

export class Sky extends Background {
    constructor(offset: number) {
        super(offset, 0, Game.canvas ? Game.canvas.height : 0);
    }

    async load(): Promise<void> {
        try {
            await this.loadImage(ImgHub.BACKGROUND.air);
        } catch (e) {
            console.error(e);
        }
    }
}