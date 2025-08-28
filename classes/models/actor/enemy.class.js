import { Level } from '../world/level.class.js';
import { MortalActor } from './actor.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';
import { IntervalHub } from '../helper/intervalhub.class.js';
import { AudioHub } from '../helper/audiohub.class.js';

/** Respesents the enemies. */
export class Enemy extends MortalActor {

    // #region Attributes
    static enemyOffest = 500;
    // #endregion

    /**
     * Creates an enemy.
     * @param {number} width - Width of enemy.
     * @param {number} height - Height of enemy.
     * @param {Level} level - Level on which enemy lives.
     */
    constructor(width, height, level) {
        super(Enemy.randomPos(), width, height, level);
        Enemy.nextEnemy();
    }

    /**
     * Gets the X-Possition of the next enemy.
     * @returns {number} X-Pos for enemy.
     */
    static randomPos() {
        return Enemy.enemyOffest + 200 * Math.random();
    }

    /** Increds the enemy-offset. */
    static nextEnemy() {
        Enemy.enemyOffest += 300;
    }

    act() {
        super.act();
        if (this instanceof Chick || this instanceof Chicken) {
            this.move(-1);
            if (this.level.thrownBottle && this.isTouching(this.level.thrownBottle)) this.hit(100);
        }
    }

    enemyAni = () => {};

    animate() {
        IntervalHub.startInverval(this.enemyAni, 1000 / 2);
    }

}

/** Respesents a litte chicken. */
export class Chick extends Enemy {

    /**
     * Creates a chick.
     * @param {Level} level - Level on wiche chick lives.
     * @param {HTMLElement} canvas - Canvas-Object on witich chick is drawn
     */
    constructor (level, canvas) {
        super(236, 210, level);
        this.scale(0.25);
        this.ground(canvas);
        this.y = this.groundLevel;
        this.offset.left = 10;
        this.offset.right = 10;
        this.offset.top = 10;
        this.offset.bottom = 10;
    }

    async loadAll() {
        await this.loadImages(ImgHelper.ENEMY.chick.walk);
        this.animate();
    }

    enemyAni = () => {
        if (!this.dieing) this.playAnimation(ImgHelper.ENEMY.chick.walk);
        else {
            this.loadImage(ImgHelper.ENEMY.chick.dead);
            if (!this.deadSoundPlayed) {
                AudioHub.playOne(AudioHub.ENEMY.chick);
                this.deadSoundPlayed = true;
            }
            setTimeout(() => {
                this.died = true;
            }, 1000);
        }
    }

    act() {
        super.act();
        if (this.isOnGround()) this.rise(10);
    }
}

export class Chicken extends Enemy {
    /**
     * Creates a chicken.
     * @param {Level} level - Level on which, chicken lives.
     * @param {HTMLElement} canvas - Canvas-Object on which chicken is drawn.
     */
    constructor(level, canvas) {
        super(248, 243, level);
        this.scale(0.5);
        this.loadImages(ImgHelper.ENEMY.chicken.walk);
        this.animate();
        this.ground(canvas);
        this.y = this.groundLevel;
        this.offset.top = 40;
        this.offset.bottom = 35;
        this.offset.left = 25;
        this.offset.right = 20;
    }

    enemyAni = () => {
        if (!this.dieing) this.playAnimation(ImgHelper.ENEMY.chicken.walk);
        else {
            this.loadImage(ImgHelper.ENEMY.chicken.dead);
            if (!this.deadSoundPlayed) {
                AudioHub.playOne(AudioHub.ENEMY.chicken);
                this.deadSoundPlayed = true;
            }
            setTimeout(() => {
                this.died = true;
            }, 1000);
        }
    }
}