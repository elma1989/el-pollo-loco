import { ImgHub } from "../img-hub.js";
import { Statusbar } from "../statusbar.js";

/** Represents statusbar for bottles in the bag. */
export class BottleBar extends Statusbar {
    constructor() {
        super(0, 140, 'bottleBar', 0);
    }

    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.STATUS.bottle[0]);
        this.imgs[this.name] = await this.addAnimation(ImgHub.STATUS.bottle);
    }
}