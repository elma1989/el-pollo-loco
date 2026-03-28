import { Chicken } from "../chicken.js";
import { ImgHub } from "../img-hub.js";

export class ChickenS extends Chicken {
    constructor () {
        super(71, 64);
        this.offset = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }
    }

    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.CHICKENS.walk[0]);
        this.imgs['walk'] = await this.addAnimation(ImgHub.CHICKENS.walk);
        this.imgs['dead'] = await this.addAnimation(ImgHub.CHICKENS.dead);
    }

    act(): void {
        super.act();
        this.jump(15);
        this.move(-3);
    }
}