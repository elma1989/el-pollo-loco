import { MortalActor } from './actor.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';
import { IntervalHub } from '../helper/intervalhub.class.js';
import { Level } from '../world/level.class.js';

/** Represents the main-character. */
export class Pepe extends MortalActor {

    // #region Attributes
    longIdle = false;
    idleStarted = false;
    idleSince = 0;
    // #endregion

    /**
     * Creates the mein-character Pepe.
     * @param {Level} level - Level on which Pepe lives.
     * @param {HTMLElement} canvas - Canvas-Object, on which Pepe is drawn.
     */
    constructor(level, canvas) {
        super(0, 610, 1200, level);
        this.scale(0.25);
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

    pepeAni = () => {
        if (!this.longIdle) {
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
    }

    startIdle() {
        if(!this.idleStarted) {
            this.idleSince = Date.now();
            this.idleStarted = true;
        }
    }

    changeIdle() {
        if (this.idleStarted && Date.now() - this.idleSince >= 10000) this.longIdle = true;
    }
}