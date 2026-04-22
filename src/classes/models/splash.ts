import { AnimatedObject } from "../animated-object.js";
import { ImgHub } from "../img-hub.js";
import { IntervalHub } from "../interval-hub.js";

export class Splash extends AnimatedObject {
    private viewed: boolean = false;
    afterAnimation?: () => void;

    constructor() {
        const width = 524 * 0.3;
        const height = 400 * 0.3;
        super(0, 0, width, height, false); // 524 x 400
    }

    // #region Methods
    get x(): number { return super.x }

    set x(newValue: number) { super.x = newValue - this.width / 2};

    get y(): number { return super.y; }

    set y(newValue: number) { super.y = newValue - this.height / 2};

    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.BOTTLE.splash[0]);
        this.imgs['splash'] = await this.addAnimation(ImgHub.BOTTLE.splash);
    }

    protected customAni(): void {
        if(this.visible && !this.viewed) {
            this.playAnmation('splash');
            if(this.imgIndex == 6) {
                this.viewed = true;
                this.afterAnimation?.();
            }
        }
    }

    animate(): void {
        IntervalHub.start(this.customAni.bind(this), 1000 / 4);
    }
    // #endregion
}