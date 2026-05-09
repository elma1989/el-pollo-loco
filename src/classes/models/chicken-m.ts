import { Chicken } from "../chicken.js";
import { ImgHub } from "../img-hub.js";
import { SoundManager } from "../sound/snd-mgr.js";

export class ChickenM extends Chicken {
    constructor() {
        super(100, 100);
        this.offset = {
            top: 40,
            right: 20,
            bottom: 30,
            left: 25
        }
    }

    // #region Methods
    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.CHICKENM.walk[0]);
        this.imgs['walk'] = await this.addAnimation(ImgHub.CHICKENM.walk);
        this.imgs['dead'] = await this.addAnimation(ImgHub.CHICKENM.dead);
    }

    healthyAct() {
        if(this.state != 'idle') this.move(-3);
    }

    injure(damage: number): void {
        super.injure(damage);
        if (this.health <= 0) SoundManager.play('enemy/m/dead');
    }
    // #endregion
}