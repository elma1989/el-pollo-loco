import { MortalActor } from './actor.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';
import { IntervalHub } from '../helper/intervalhub.class.js';
import { Level } from '../world/level.class.js';
import { Keyboard } from '../helper/keyboard.class.js';

/** Represents the main-character. */
export class Pepe extends MortalActor {

    // #region Attributes
    longIdle = false;
    idleStarted = false;
    idleSince = 0;
    facingLeft = false;
    // #endregion

    /**
     * Creates the mein-character Pepe.
     * @param {Level} level - Level on which Pepe lives.
     * @param {HTMLElement} canvas - Canvas-Object, on which Pepe is drawn.
     */
    constructor(level, canvas) {
        super(0, 610, 1200, level);
        this.scale(0.25);
        this.loadImages(ImgHelper.PEPE.walk);
        this.loadImages(ImgHelper.PEPE.idle);
        this.loadImages(ImgHelper.PEPE.longIdle);
        this.animate();
        this.ground(canvas);
        this.y = this.groundLevel;
        this.offset.left = 35;
        this.offset.right = 55;
        this.offset.top = 155;
        this.offset.bottom = 40;
    }

    // #region Methods
    pepeAni = () => {
        if (this.isWalking()) this.playAnimation(ImgHelper.PEPE.walk);
        else if (!this.longIdle) {
            this.startIdle();
            this.playAnimation(ImgHelper.PEPE.idle);
        } else this.playAnimation(ImgHelper.PEPE.longIdle);
    }

    animate() {
        IntervalHub.startInverval(this.pepeAni, 1000 / 2);
    }

    act() {
        super.act();
        this.changeIdle();
        this.walkLeft();
        this.walkRight();
    }

    /** Starts iddle. */
    startIdle() {
        if(!this.idleStarted) {
            this.idleSince = Date.now();
            this.idleStarted = true;
        }
    }

    /** Canges to long idle. */
    changeIdle() {
        if (this.idleStarted && Date.now() - this.idleSince >= 10000) this.longIdle = true;
    }

    walkLeft() {
        if (this.canWalkLeft() && Keyboard.LEFT) {
            this.facingLeft = true;
            this.move(-5);
        }
    }

    walkRight() {
        if (this.canWalkRight() && Keyboard.RIGHT) {
            this.facingLeft = false;
            this.move(5);
        }
    }
    // #region Checks
    isWalking() {
        if (this.dieing || this.died) return false;
        const walking = Keyboard.LEFT || Keyboard.RIGHT;
        if (walking) {
            if (this.animationCounter > 5) this.animationCounter = 0;
            this.idleStarted = false;
            this.longIdle = false;
        }
        return walking;
    }

    canWalkLeft() {
        return this.x >= 0;
    }

    canWalkRight() {
        return this.x <= 2400;
    }
    // #endregion
    // #endregion
}