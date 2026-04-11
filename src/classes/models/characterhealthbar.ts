import { ImgHub } from "../img-hub.js";
import { Statusbar } from "../statusbar.js";

/** Statusbar for character's health. */
export class CharacterHealthbar extends Statusbar {
    constructor() {
        super(0, 0, 'healthCharacter', 100);
    }

    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.STATUS.healthCharacter[5]);
        this.imgs[this.name] = await this.addAnimation(ImgHub.STATUS.healthCharacter);
    }
}