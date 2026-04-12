import { Game } from "../game.js";
import { ImgHub } from "../img-hub.js";
import { Statusbar } from "../statusbar.js";

export class BossHealthbar extends Statusbar {
    constructor() {
        const canvas = Game.canvas;
        super(0, 10, 'healthBoss', 100, false);
    }

    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.STATUS.healthBoss[5]);
        this.imgs[this.name] = await this.addAnimation(ImgHub.STATUS.healthBoss);
    }
}