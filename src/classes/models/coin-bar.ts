import { ImgHub } from "../img-hub.js";
import { Statusbar } from "../statusbar.js";

/** Represents the coin-bar */
export class CoinBar extends Statusbar {
    constructor() {
        super(0, 70, 'coinBar', 0);
    }

    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.STATUS.coin[0]);
        this.imgs[this.name] = await this.addAnimation(ImgHub.STATUS.coin);
    }
}