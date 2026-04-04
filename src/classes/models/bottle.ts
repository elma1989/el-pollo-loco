import { BaseState, Collectable } from "../collectable.js";
import { GravitalObject } from "../gravital-object.js";
import { ImgHub } from "../img-hub.js";
import { IntervalHub } from "../interval-hub.js";
import { Splash } from "./splash.js";

type Direction = 'right' | 'left';

export class Bottle extends Collectable<BaseState> {
    private offsetChanged: boolean = false;
    private _splash: Splash | null = null;
    private direction: Direction = 'right';

    constructor() {
        super(GravitalObject.toGround(96), 128, 128, 10);
        this.offset = {
            top: 50,
            right: 40,
            left: 70,
            bottom: 20
        }
    }

    // #region Methods
    get splash(): Splash | null { return this._splash; }

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
            this.move(this.direction == 'right' ? 7 : -7);
        }
    }

    protected jump(speed: number): void {
        this.jumping = true;
        this.fallingSpeed = -speed;
    }

    /** Will be executed, if character throws bottle.
     * @param direction - Direction to throw.
     */
    throw(direction: Direction): void {
        this.direction = direction;
        this.jump(30);
        this.state = 'thrown';
    }

    /**
     * Assigns a splash for this bottle.
     * @param splash Instance of Splash.
     */
    addSplash(splash: Splash) {
        this._splash = splash;
    }

    /** Destroys this bottle. */
    destroy() {
        if (this.splash) {
            this.splash.x = this.x + this.width / 2;
            this.splash.y = this.y + this.height / 2;
            this.splash.activate();
            this._splash = null;
        }
    }
    // #endregion
}