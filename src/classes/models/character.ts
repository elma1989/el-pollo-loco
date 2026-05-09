import { BaseState, Collectable } from "../collectable.js";
import { Game } from "../game.js";
import { GravitalObject } from "../gravital-object.js";
import { HealthState, HealthyObject } from "../healthy-object.js";
import { ImgHub } from "../img-hub.js";
import { IntervalHub } from "../interval-hub.js";
import { KeyListener } from "../key-listener.js";
import { SoundManager } from "../sound/snd-mgr.js";
import { Bottle } from "./bottle.js";

/** Represents the main character Pepe. */
export class Character extends HealthyObject {
    static readonly offsetX: number = 100;
    private idleCounter: number = 0;
    private speed: number = 10;
    private _facingLeft: boolean = false;
    private bottles: Bottle[] = [];
    private hasBottleThrown: boolean = false;
    private isInvulerable: boolean = false;
    onChangeBottle?: (count: number) => void;
    private coins: number = 0;
    onChangeCoin?: (count: number) => void;
    onRunOut?: () => void;
    private runOutEmmited: boolean = false;
    private walkSound: {stop: () => void} | null = null;
    private snorSound: {stop: () => void} | null = null;
    private deadSoundPlayed: boolean = false;

    constructor() {
        super(Character.offsetX, GravitalObject.toGround(240), 122, 240);  // 610 x 1200 * 0.2
        this.offset = {
            top: 130,
            right: 50,
            bottom: 40,
            left: 40
        }
    }

    // #region Methods
    get state(): HealthState { return super.state; }

    set state(state: HealthState) {
        if(this.state != state) {
            if (state == 'walk') this.playWalkSound();
            else this.stopWalkSound();
            if (state == 'longidle') this.playSnor();
            else this.stopSnor();
            super.state = state;
        }
    }

    get facingLeft(): boolean { return this._facingLeft; }

    get numberBottles(): number { return this.bottles.length; }

    async load(): Promise<void> {
        this.img  = await this.loadImage(ImgHub.CHARACTER.idle[0]);
        this.imgs['idle'] = await this.addAnimation(ImgHub.CHARACTER.idle);
        this.imgs['longidle'] = await this.addAnimation(ImgHub.CHARACTER.longIdle);
        this.imgs['walk'] = await this.addAnimation(ImgHub.CHARACTER.walk);
        this.imgs['jump'] = await this.addAnimation(ImgHub.CHARACTER.jump);
        this.imgs['hurt'] = await this.addAnimation(ImgHub.CHARACTER.hurt);
        this.imgs['dead'] = await this.addAnimation(ImgHub.CHARACTER.dead);
    }

    healthyAct(): void {
        const canvas = Game.canvas;
        this.movement();
        if(KeyListener.KEY.space) {
            this.jump(25);
        }
        if (KeyListener.KEY.ctrl) {
            this.throwBottle();
        }
        if (this.state == 'attack') setTimeout(() => this.state = 'idle', 700);
        if (!this.runOutEmmited && canvas && this.x >= canvas.width) {
            this.onRunOut?.();
            this.runOutEmmited = true;
        }
        if (this.state == 'jump' && !this.jumping && this.isOnGround()) this.state = 'idle';
        if (this.idleCounter >= 5) this.state = 'longidle';
    }

    protected jump(speed: number): void {
        this.wakeUp();
        this.state = 'jump';
        this.playJump();
        super.jump(speed);
    }

    injure(damage: number): void {
        if (this.state == 'attack' || this.isInvulerable || damage < 1 || damage > 100) return;
        this.health -= damage;
        this.onInjure?.(this.health);
        if(this.health <= 0) {
            this.state = 'dieing';
            if (!this.deadSoundPlayed) {
                SoundManager.play('character/dead');
                this.deadSoundPlayed = true;
            }
        } else {
            this.state = 'injured';
            SoundManager.play('character/hurt');
            this.isInvulerable = true;
            setTimeout(() => {
                this.state = 'idle',
                this.idleCounter = 0;
                this.isInvulerable = false;
            }, 1400);
        }
    }

    // #region Animation
    /** Increases idle counter. */
    private increaseIdleCounter = () => {
        if(this.state == 'idle')
            this.idleCounter++;
    }

    /** Starts the interval for idle counter. */
    startIdleCounterInterval(): void {
        IntervalHub.start(this.increaseIdleCounter, 1000);
    }

    /** Special aninmation for Pape. */
    protected customAni(): void {
        switch(this.state) {
            case 'dieing':
                this.playAnmation('dead');
                break;
            case 'injured':
                this.playAnmation('hurt');
                break;
            case 'walk':
                this.playAnimationLoop('walk');
                break;
            case 'idle':
                this.playAnimationLoop('idle');
                break;
            case 'longidle':
                this.playAnimationLoop('longidle');
        }
    }

    animate(): void {
        IntervalHub.start(this.customAni.bind(this), 1000 / this.frequency);
    }

    /** Let Pepe wake up. */
    private wakeUp() {
        if (this.state == 'longidle') {
            this.idleCounter = 0
            this.state = 'idle';
        }
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
        if (this.state == 'dieing') return;
        if (this.state == 'idle' || this.state == 'longidle' || this.state == 'walk') {
            if (this.isWalking()) {
                this.wakeUp();
                this.state = 'walk';
            } else if (this.state == 'walk') this.state = 'idle';
        }
        if (this.isWalkingLeft()) {
            this._facingLeft = true;
            this.move(-this.speed);
        };
        if (this.isWalkingRight()) {
            this.move(this.speed);
            this._facingLeft = false;
        }
    }
    // #endregion
    
    // #region Collect
    /** Adds a bottle to backpack. */
    addBottle(bottle: Bottle): void {
        this.bottles.push(bottle);
        this.onChangeBottle?.(this.bottles.length);
    }

    /** Will be exetuted to throw a bottle. */
    private throwBottle(): void {
        if (this.numberBottles > 0 && !this.hasBottleThrown) {
            this.wakeUp();
            const bottle = this.bottles.splice(0, 1)[0];
            this.onChangeBottle?.(this.bottles.length);
            bottle.x = this._facingLeft ? this.x : this.x + this.width - this.offset.right;
            bottle.y = this.y - bottle.height + this.offset.top;
            bottle.throw(this.facingLeft ? 'left' : 'right');
            this.hasBottleThrown = true;
            setTimeout(() => {this.hasBottleThrown = false}, 700);
        }
    }

    /** Adds a coin to counter, */
    addCoin(): void {
        this.coins += 20;
        this.onChangeCoin?.(this.coins);
    }

    /**
     * Will be executed, if Pepe collect an item.
     * @param item - Item to collect
     */
    collect(item: Collectable<BaseState>) {
        if (item.state == 'idle') {
            item.collect(this);
        }
    }
    // #endregion
    
    // #region Sound
    private playWalkSound(): void {
        if (!this.walkSound) this.walkSound = SoundManager.play('character/walk');
    }

    private stopWalkSound(): void {
        if (this.walkSound) {
            this.walkSound.stop();
            this.walkSound = null;
        }
    }

    private playJump(): void {
        if (this.isOnGround()) SoundManager.play('character/jump');
    }

    private playSnor(): void {
        if (!this.snorSound) this.snorSound = SoundManager.play('character/sleep', true);
    }

    public stopSnor(): void {
        if (this.snorSound) {
            this.snorSound.stop();
            this.snorSound = null;
        }
    }
    // #endregion
    // #endregion
}