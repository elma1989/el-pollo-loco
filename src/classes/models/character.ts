import { AnimatedObject } from "../animated-object.js";
import { ImgHub } from "../img-hub.js";
import { IntervalHub } from "../interval-hub.js";

/** Represents the main character Pepe. */
export class Character extends AnimatedObject {
    private idleCounter: number = 0;
    private idle: boolean = true;

    constructor() {
        super(0, 0, 610, 1200);
        this.scale(0.2);
    }

    async load(): Promise<void> {
        this.img  = await this.loadImage(ImgHub.CHARACTER.idle[0]);
        this.imgs['idle'] = await this.addAnimation(ImgHub.CHARACTER.idle);
        this.imgs['longidle'] = await this.addAnimation(ImgHub.CHARACTER.longIdle);
    }

    // #region Animation
    /** Increases idle counter. */
    private increaseIdleCounter = () => {
        if(this.idle)
            this.idleCounter++;
    }

    /** Starts the interval for idle counter. */
    startIdleCounterInterval(): void {
        IntervalHub.start(this.increaseIdleCounter, 1000);
    }

    /** Special aninmation for Pape. */
    private pepeAni = () => {
        if (this.idle && this.idleCounter >= 10)
            this.playAnimationLoop('longidle')
        else if (this.idle && this.idleCounter >= 5) 
            this.playAnimationLoop('idle');
    }

    animate(): void {
        IntervalHub.start(this.pepeAni, 1000 / this.frequency);
    }

    /** Disables the idle state */
    private disableIdle(): void {
        this.idle = false;
        this.idleCounter = 0;
    }
    // #endregion
}