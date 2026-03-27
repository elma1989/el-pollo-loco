import { Game } from "../game.js";
import { HealthyObject } from "../healthy-object.js";
import { ImgHub } from "../img-hub.js";
import { IntervalHub } from "../interval-hub.js";
import { KeyListener } from "../key-listener.js";
import { Level } from "./level.js";

/** Represents the main character Pepe. */
export class Character extends HealthyObject {
    private idleCounter: number = 0;
    private idle: boolean = true;
    private speed: number = 10;
    private _facingLeft: boolean = false;
    private isHurtPlaying: boolean = false;

    constructor() {
        super(0, 122, 240);  // 610 x 1200 * 0.2
        this.offset = {
            top: 130,
            right: 50,
            bottom: 40,
            left: 40
        }
    }

    // #region Methods
    get facingLeft(): boolean { return this._facingLeft; }

    async load(): Promise<void> {
        this.img  = await this.loadImage(ImgHub.CHARACTER.idle[0]);
        this.imgs['idle'] = await this.addAnimation(ImgHub.CHARACTER.idle);
        this.imgs['longidle'] = await this.addAnimation(ImgHub.CHARACTER.longIdle);
        this.imgs['walk'] = await this.addAnimation(ImgHub.CHARACTER.walk);
        this.imgs['jump'] = await this.addAnimation(ImgHub.CHARACTER.jump);
        this.imgs['hurt'] = await this.addAnimation(ImgHub.CHARACTER.hurt);
        this.imgs['dead'] = await this.addAnimation(ImgHub.CHARACTER.dead);
    }

    act(): void {
        this.movement();
        this.falling();
        if(KeyListener.KEY.space) {
            this.idleCounter = 0;
            this.jump(25);
        }
    }

    injure(damage: number): void {
        if (!this.dead) {
            super.injure(damage);
            this.isHurtPlaying = true;
        }
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
        if (this.dieing) {
            this.playAnmation('dead');
            if (this.imgIndex == 7) this.dieingAnimationPlayed();
        }
        else if (this.isHurtPlaying) {   
            this.playAnmation('hurt');
            if (this.imgIndex == 3) this.isHurtPlaying = false;
        } else if (this.jumping || this.fallingJump) 
            this.playAnmation('jump');
        else if (this.isWalking())
            this.playAnimationLoop('walk');
        else if (this.idle && this.idleCounter >= 5)
            this.playAnimationLoop('longidle');
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
            this._facingLeft = true;
            this.move(-this.speed);
        };
        if (this.isWalkingRight()) {
            this.move(this.speed);
            this._facingLeft = false;
        }
        if(canvas && this.x <= canvas.width) {
            Level.cameraX = -this.x;
        }
    }
    // #endregion
    // #endregion
}