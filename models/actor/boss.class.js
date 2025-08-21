import { Enemy } from './enemy.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';
import { Level } from '../world/level.class.js';
import { IntervalHub } from '../helper/intervalhub.class.js';
import { AudioHub } from '../helper/audiohub.class.js';

/** Repesents the final enemy. */
export class Boss extends Enemy {

    alert = false;

    /**
     * Creates the boss.
     * @param {Level} level - Level on witch boss lives.
     * @param {HTMLElement} canvas Canvas-Object, on whitch boss is drawn.
     */
    constructor(level, canvas) {
        super(1045, 1217, level);
        this.scale(0.5);
        this.x = 3200 - this.width;
        this.ground(canvas);
        this.groundLevel += 60;
        this.y = this.groundLevel;
        this.loadImage(ImgHelper.ENEMY.boss.walk[0]);
        this.loadImages(ImgHelper.ENEMY.boss.alert);
        this.loadImages(ImgHelper.ENEMY.boss.hurt);
        this.loadImages(ImgHelper.ENEMY.boss.dead);
        this.offset.top = 250;
        this.offset.left = 120;
        this.offset.bottom = 160;
        this.offset.right = 100;
        this.animate();
    }

    // #region Methods
    act() {
        super.act();
        this.touchingBottle();
        if (!this.injured) {
            this.hurtAnimationPlayed = false;
            this.hurtSoundPlayed = false;
        }
    }

    aniBoss = () => {
        if (!this.alert) {
            this.playSingleAnimation(ImgHelper.ENEMY.boss.alert);
            if (this.animationPlayed) {
                this.alert = true;
                this.animationPlayed = false;
            }
        }
        else if (this.dieing) {
            if(!this.died) {
                this.playSingleAnimation(ImgHelper.ENEMY.boss.dead);
                if (this.animationPlayed) {
                    this.died = true;
                    this.animationPlayed = false;
                }
            }
        }
        else if (this.injured && !this.hurtAnimationPlayed) {
            this.playSingleAnimation(ImgHelper.ENEMY.boss.hurt);
            if (!this.hurtSoundPlayed) {
                AudioHub.playOne(AudioHub.ENEMY.chicken);
                this.hurtSoundPlayed = true;
            }
            if (this.animationPlayed) {
                this.hurtAnimationPlayed = true;
                this.animationPlayed = false;
            }
        }
    }

    animate() {
        IntervalHub.startInverval(this.aniBoss, 1000 / 10);
    }

    touchingBottle() {
        if(this.level.thrownBottle && this.isTouching(this.level.thrownBottle)) {
            this.hit(34);
            this.animationCounter = 0;
            this.level.thrownBottle.groundLevel = this.level.thrownBottle.y;
        }
    }
    // #endregion
}