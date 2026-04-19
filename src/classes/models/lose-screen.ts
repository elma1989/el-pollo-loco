import { ImgHub } from "../img-hub.js";
import { Screen } from "../screen.js";

export class LoseScreen extends Screen {
    constructor() {
        super();
    }

    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.SCREEN.lose);
    }
}