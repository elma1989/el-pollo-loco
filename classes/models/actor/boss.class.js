import { Enemy } from './enemy.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';
import { Level } from '../world/level.class.js';
import { IntervalHub } from '../helper/intervalhub.class.js';
import { AudioHub } from '../helper/audiohub.class.js';

/** Repesents the final enemy. */
export class Boss extends Enemy {

    alert = false;
    attack = false;
    active = false;
    world;

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
        this.offset.top = 250;
        this.offset.left = 120;
        this.offset.bottom = 160;
        this.offset.right = 100;
        this.animate();
    }

    // #region Methods

    async loadAll() {
        await this.loadImages(ImgHelper.ENEMY.boss.alert);
        await this.loadImages(ImgHelper.ENEMY.boss.hurt);
        await this.loadImages(ImgHelper.ENEMY.boss.dead);
        await this.loadImages(ImgHelper.ENEMY.boss.attack);
        await this.loadImages(ImgHelper.ENEMY.boss.walk);
    }
    act() {
        if (this.active) {
            super.act();
            this.touchingBottle();
            if (!this.injured) {
                this.hurtAnimationPlayed = false;
                this.hurtSoundPlayed = false;
            }
            const speed = this.attack ? -5 : -1
            if (!this.dieing) this.move(speed);
        }
    }

    aniBoss = () => {
        if (!this.alert) this.handleAlert();
        else if (this.dieing) this.handleDieing();
        else if (this.injured && !this.hurtAnimationPlayed) this.handleInjuring()
        else if (this.attack) this.handleAttack();
        else this.playAnimation(ImgHelper.ENEMY.boss.walk);
    }

    animate() {
        IntervalHub.startInverval(this.aniBoss, 1000 / 10);
    }

    /** Manges touching bottle by boss. */
    touchingBottle() {
        if(this.level.thrownBottle && this.isTouching(this.level.thrownBottle)) {
            this.hit(34);
            this.animationCounter = 0;
            this.level.thrownBottle.groundLevel = this.level.thrownBottle.y;
        }
    }
    // #region Handling
    /** Handels the anmation on spawn of boss. */
    handleAlert() {
        this.playSingleAnimation(ImgHelper.ENEMY.boss.alert);
        if (this.animationPlayed) {
            this.alert = true;
            this.animationPlayed = false;
        }
    }

    /** Handles dieing of boss. */
    handleDieing() {
        if(!this.died) {
            this.playSingleAnimation(ImgHelper.ENEMY.boss.dead);
            if (this.animationPlayed) {
                this.died = true;
                this.animationPlayed = false;
                this.level.screens[1].visible = true;
                this.world.endGame();
            }
        }
    }

    /** Handles the injuring of boss. */
    handleInjuring() {
        this.playSingleAnimation(ImgHelper.ENEMY.boss.hurt);
        if (!this.hurtSoundPlayed) {
            AudioHub.playOne(AudioHub.ENEMY.chicken);
            this.hurtSoundPlayed = true;
        }
        if (this.animationPlayed) {
            this.hurtAnimationPlayed = true;
            this.animationPlayed = false;
            this.attack = true;
            this.animationCounter = 0;
        }
    }

    /** Hanles the attack-animation of boss. */
    handleAttack() {
        this.playSingleAnimation(ImgHelper.ENEMY.boss.attack);
        if (this.animationPlayed) {
            this.attack = false;
            this.animationPlayed = false;
        }
    }
    // #endregion
    // #endregion
}