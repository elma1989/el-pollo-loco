import { AnimatedObject } from "../animated-object.js";
import { Game } from "../game.js";
import { ImgHub } from "../img-hub.js";
import { IntervalHub } from "../interval-hub.js";
import { KeyListener } from "../key-listener.js";
import { Level } from "./level.js";

/** Represents the main character Pepe. */
export class Character extends AnimatedObject {
    private idleCounter: number = 0;
    private idle: boolean = true;
    private speed: number = 10;
    facingLeft: boolean = false;

    constructor() {
        super(0, 0, 610, 1200);
        this.scale(0.2);
    }

    // #region Methods
    async load(): Promise<void> {
        this.img  = await this.loadImage(ImgHub.CHARACTER.idle[0]);
        this.imgs['idle'] = await this.addAnimation(ImgHub.CHARACTER.idle);
        this.imgs['longidle'] = await this.addAnimation(ImgHub.CHARACTER.longIdle);
        this.imgs['walk'] = await this.addAnimation(ImgHub.CHARACTER.walk);
    }

    act(): void {
        this.movement();
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
        if (this.isWalking())
            this.playAnimationLoop('walk')
        else if (this.idle && this.idleCounter >= 5)
            this.playAnimationLoop('longidle')
        else if (this.idle) 
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

    // #region Movment
    private isWalkingLeft(): boolean { return this.x - this.speed >= 0 && KeyListener.KEY.left && !KeyListener.KEY.right; }
    
    private isWalkingRight(): boolean { 
        const canvas = Game.canvas;
        if (!canvas) return false;
        return this.x + this.speed <= 2 * canvas.width - this.width && !KeyListener.KEY.left && KeyListener.KEY.right; 
    }
    
    private isWalking(): boolean { return this.isWalkingLeft() || this.isWalkingRight() }

    /** Manages the movment of Pepe. */
    private movement():void {
        const canvas = Game.canvas;
        if (this.isWalking()) this.disableIdle()
        else this.idle = true;
        if (this.isWalkingLeft()) {
            this.facingLeft = true;
            this.move(-this.speed);
        };
        if (this.isWalkingRight()) {
            this.move(this.speed);
            this.facingLeft = false;
        }
        if(canvas && this.x <= canvas.width) {
            Level.cameraX = -this.x;
        }
    }
    // #endregion
    // #endregion
}