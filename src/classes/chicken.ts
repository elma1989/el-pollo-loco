import { GravitalObject } from "./gravital-object.js";
import { HealthyObject } from "./healthy-object.js";
import { IntervalHub } from "./interval-hub.js";

export abstract class Chicken extends HealthyObject {
    static offset: number = 500;

    constructor(width: number, height: number) {
        super(Chicken.randomX(), GravitalObject.toGround(height), width, height);
        Chicken.next();
    }

    // #region Methods

    protected customAni(): void {
        if(this.dieing) {
            this.playAnmation('dead');
            setTimeout(() => { this.dieingAnimationPlayed(); }, 1000)
        }
        else this.playAnimationLoop('walk');
    }

    animate(): void {
        IntervalHub.start(this.customAni.bind(this), 1000 / 4);
    }

    /**
     * Gets random x-pos for chicken.
     * @returns Random x-pos for chicken.
     */
    static randomX(): number {
        return Math.random() * 200 + Chicken.offset;
    }

    /** Increases offset for next chicken. */
    static next(): void {
        Chicken.offset += 300
    }
    // #endregion
}