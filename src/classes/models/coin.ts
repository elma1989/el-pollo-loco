import { BaseState, Collectable } from "../collectable.js";
import { Game } from "../game.js";
import { GravitalObject } from "../gravital-object.js";
import { ImgHub } from "../img-hub.js";
import { IntervalHub } from "../interval-hub.js";

export class Coin extends Collectable<BaseState> {
    constructor() {
        super(Coin.randomY(128), 128, 128, 20);
        this.offset = {
            top: 55,
            right: 55,
            bottom: 55,
            left: 55
        }
    }

    // #region Methods
    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.COIN.idle[0]);
        this.imgs['idle'] = await this.addAnimation(ImgHub.COIN.idle);
    }

    static randomY(height: number): number {
        const canvas = Game.canvas;
        if (!canvas) return 0;
        const cHeight = canvas.height / 2;
        const bottom = GravitalObject.toGround(height)
        return Math.random() * (bottom - cHeight) + cHeight;
    }

    protected customAni(): void {
        if (this.state == 'idle') this.playAnimationLoop('idle');
    }

    animate(): void {
        IntervalHub.start(this.customAni.bind(this), 1000 / 4);
    }
    // #endregion
}