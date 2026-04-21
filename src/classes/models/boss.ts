import { Game } from "../game.js";
import { GravitalObject } from "../gravital-object.js";
import { HealthyObject } from "../healthy-object.js";
import { ImgHub } from "../img-hub.js";
import { IntervalHub } from "../interval-hub.js";

export class Boss extends HealthyObject {
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
    async load(): Promise<void> {
        this.img = await this.loadImage(ImgHub.BOSS.walk[0]);
        this.imgs['walk'] = await this.addAnimation(ImgHub.BOSS.walk);
        this.imgs['alert'] = await this.addAnimation(ImgHub.BOSS.alert);
        this.imgs['attack'] = await this.addAnimation(ImgHub.BOSS.attact);
        this.imgs['hurt'] = await this.addAnimation(ImgHub.BOSS.hurt);
        this.imgs['dead'] = await this.addAnimation(ImgHub.BOSS.dead);
    }

    healthyAct(): void {
        if (this.state != 'idle') {
            if(this.state == 'walk' || this.state == 'attack') {
                this.move(-3);
                this.attactTimer++;
                if(this.attactTimer == 5) this.state = 'alert'
            }
            if(this.state == 'attack') this.move(-4);
            this.reset();
        }
    }

    // #region Animation
    protected customAni(): void {
        if (this.state == 'idle') return

        if (this.state == 'dieing') this.playAnmation('dead');
        else switch(this.state) {
            case 'injured':
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

    /** Sequence to finish hurt-animation. */
    private finshHurtAnimation() {
        this.playAnmation('hurt');
        if (this.imgIndex == this.imgs['hurt'].length) {
            this.attactTimer = 0;
            this.state = 'walk';
        }
    }

    /** Sequence to finish alert-animation. */
    private finishAlertAnimation() {
        this.playAnmation('alert');
        if (this.imgIndex == this.imgs['alert'].length) this.state = 'attack';
    }

    private finishAttackAnimation() {
        this.playAnmation('attack');
        if (this.imgIndex == this.imgs['attack'].length) {
            this.state = 'walk';
            this.attactTimer = 0;
        }
    }

    /** Repeats walk-animation. */
    private repeatWalkAnimation() {
        this.playAnmation('walk');
        if (this.imgIndex == this.imgs['walk'].length) this.imgIndex = 0;
    }

    animate(): void {
        IntervalHub.start(this.customAni.bind(this), 1000 / 4);
    }
    // #endregion
    
    // #region Attack
    /** Resets x-Pos of boss, if he walks out. */
    private reset(): void {
        const canvas = Game.canvas;
        if (canvas && this.x < -this.width) this.x = 2 * canvas.width - this.width;
    }
    // #endretion
    // #endregion
}