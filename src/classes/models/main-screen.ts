import { ImgHub } from "../img-hub.js";
import { Screen } from "../screen.js";

export class MainScreen extends Screen {
    constructor() {
        super(true);
    }

    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.SCREEN.start);
    }
}