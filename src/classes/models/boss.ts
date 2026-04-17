import { Game } from "../game.js";
import { GravitalObject } from "../gravital-object.js";
import { HealthyObject } from "../healthy-object.js";
import { ImgHub } from "../img-hub.js";
import { IntervalHub } from "../interval-hub.js";

type BossState = 'idle' | 'walk' | 'alert' | 'attack' | 'hurt';

export class Boss extends HealthyObject {
    private _state: BossState = 'idle';
    private attactTimer: number = 0;
    
    constructor() {
        const width = 1045 * 0.3;
        const height = 1217 * 0.3;
        const canvas = Game.canvas;
        const xPos = canvas ? 2 * canvas.width - width : 0;
        super(xPos, GravitalObject.toGround(height - 50), width, height); //1045x1217
        this.offset = {
            top: 140,
            right: 60,
            bottom: 90,
            left: 80
        }
    }

    // #region Methods
    get state(): BossState { return this._state; }

    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.BOSS.walk[0]);
        this.imgs['walk'] = await this.addAnimation(ImgHub.BOSS.walk);
        this.imgs['alert'] = await this.addAnimation(ImgHub.BOSS.alert);
        this.imgs['attack'] = await this.addAnimation(ImgHub.BOSS.attact);
        this.imgs['hurt'] = await this.addAnimation(ImgHub.BOSS.hurt);
        this.imgs['dead'] = await this.addAnimation(ImgHub.BOSS.dead);
    }

    act(): void {
        if (!this.dead) {
            if(this.state == 'walk') {
                this.move(-3);
                if(this.attactTimer == 5) this._state = 'alert'
            }
            if(this.state == 'attack') this.move(-4);
            this.reset();
        }
    }

    // #region Animation
    protected customAni(): void {
        if (this.state != 'idle') {
            if(this.dieing) {
                this.playAnmation('dead');
                if (this.imgIndex == this.imgs['dead'].length) this.dieingAnimationPlayed();
            } else {
                this.playAnmation(this.state);
                switch(this.state) {
                    case 'hurt':
                        this.finshHurtAnimation();
                        break;

                    case 'alert':
                        this.finishAlertAnimation();
                        break;

                    case 'attack':
                        this.finishAttackAnimation();
                        break;

                    case 'walk':
                        this.repeatWalkAnimation();
                }
            }
        }
    }

    /** Sequence to finish hurt-animation. */
    private finshHurtAnimation() {
        if (this.imgIndex == this.imgs['hurt'].length) {
            this.attactTimer = 0;
            this._state = 'walk';
        }
    }

    /** Sequence to finish alert-animation. */
    private finishAlertAnimation() {
        if (this.imgIndex == this.imgs['alert'].length) this._state = 'attack';
    }

    private finishAttackAnimation() {
        if (this.imgIndex == this.imgs['attack'].length) {
            this._state = 'walk';
            this.attactTimer = 0;
        }
    }

    /** Repeats walk-animation. */
    private repeatWalkAnimation() {
        if (this.imgIndex == this.imgs['walk'].length) this.imgIndex = 0;
    }

    animate(): void {
        IntervalHub.start(this.customAni.bind(this), 1000 / 4);
    }
    // #endregion
    
    // #region Attack
    /** Will be executed to start boss walking */
    activate(): void {
        this._state = 'walk';
        IntervalHub.start(this.increaseAttackTimer, 1000);
    }

    /** Increases attack-timer. */
    private increaseAttackTimer = () => {
        this.attactTimer++;
    }

    /** Resets x-Pos of boss, if he walks out. */
    private reset(): void {
        const canvas = Game.canvas;
        if (canvas && this.x < -this.width) this.x = 2 * canvas.width - this.width;
    }

    // #endretion
    // #endregion
}