import { Enemy } from './enemy.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';
import { Level } from '../world/level.class.js';

/** Repesents the final enemy. */
export class Boss extends Enemy {

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
        this.offset.top = 250;
        this.offset.left = 120;
        this.offset.bottom = 160;
        this.offset.right = 100;
    }
}