import { AnimatedActor } from './actor.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';
import { IntervalHub } from '../helper/intervalhub.class.js';

/** Represents a statusbar
 * @class 
 */
class Statusbar extends AnimatedActor {

    value = 0;
    xfix;

    /**
     * 
     * @param {number} y - Y-Positon of bar.
     * @param {number} x -X-Posistion of bar
     */
    constructor(x, y) {
        super(x, y, 595,158);
        this.xfix = x;
        this.scale(0.4);
        IntervalHub.startInverval(this.statusbarMoveInt, 1000 / 60);
    }

    // #region Methods
    /** Calculate the current Index of Image-Array. */
    calcIndex() {
        if (this.value < 0) return 0;
        return Math.ceil(this.value / 20);
    }

    statusbarMoveInt = () => {
        this.x = -this.world.cameraXPos + this.xfix;
    }
}

/** Statusbar for Health of Pepe */
export class PepeHealthBar extends Statusbar {

    /** Creates Pepe's Health-Bar. */
    constructor() {
        super(0,0);
        this.loadImages(ImgHelper.STATUSBAR.health);
        this.value = 100;
    }

    act() {
        this.value = this.world.level.pepe.health;
        this.img = this.imageCache[ImgHelper.STATUSBAR.health[this.calcIndex()]];
    }
}

/** Statusbar for Pepes botles */
export class BottleBar extends Statusbar {

    /** Creates Pepe's bottle bar. */
    constructor() {
        super(0, 50);
        this.loadImages(ImgHelper.STATUSBAR.bottles);
        this.value = 0;
    }

    act() {
        this.value = this.world.level.pepe.bottles;
        this.img = this.imageCache[ImgHelper.STATUSBAR.bottles[this.calcIndex()]];
    }
}

/** Statusbar for Pepe's Coins. */
export class Coinbar extends Statusbar {

    constructor() {
        super(0,100);
        this.loadImages(ImgHelper.STATUSBAR.coins);
        this.value = 0;
    }

    act() { 
        this.value = this.world.level.pepe.coins;
        this.img = this.imageCache[ImgHelper.STATUSBAR.coins[this.calcIndex()]];
    }
}