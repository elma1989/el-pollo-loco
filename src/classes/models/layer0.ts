import { ImgHub } from "../img-hub.js";
import { Layer } from "../layer.js";

export class Layer0 extends Layer {
    constructor(offset: number) {
        super(offset);
    }

    async load(): Promise<void> {
        try {
            await this.loadImage(ImgHub.BACKGROUND.layer0[this.offset]);
        } catch (e) {
            console.error(e);
        }
    }
}