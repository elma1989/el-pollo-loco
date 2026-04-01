import { BaseState, Collectable } from "../collectable.js";
import { GravitalObject } from "../gravital-object.js";
import { ImgHub } from "../img-hub.js";
import { IntervalHub } from "../interval-hub.js";
import { KeyListener } from "../key-listener.js";

export class Bottle extends Collectable<BaseState> {
    offsetChanged: boolean = false;

    constructor() {
        super(GravitalObject.toGround(96), 128, 128, 10);
        this.offset = {
            top: 60,
            right: 40,
            left: 70,
            bottom: 20
        }
    }

    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.BOTTLE.idle);
        this.imgs['rotation'] = await this.addAnimation(ImgHub.BOTTLE.rotation);
    }

    protected customAni(): void {
        if (this.state == 'thrown') this.playAnimationLoop('rotation');
    }

    animate(): void {
        IntervalHub.start(this.customAni.bind(this), 1000 / 4);
    }

    act() {
        this.falling();
        if (this.state == 'idle' && KeyListener.KEY.ctrl) {
            this.throw();
        }
        if (this.state == 'thrown') {
            if (!this.offsetChanged) {
                this.offset = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                }
                this.offsetChanged = true;
            }
            // this.move(5);
        }
    }

    protected jump(speed: number): void {
        this.jumping = true;
        this.fallingSpeed = -speed;
    }

    /** Will be executed, if character throws bottle. */
    throw(): void {
        this.jump(30);
        this.state = 'thrown';
    }
}