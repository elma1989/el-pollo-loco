import { AnimatedActor } from './actor.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';

/** Represents a statusbar
 * @class 
 */
class Statusbar extends AnimatedActor {

    value = 0;
    xfix;
    world;

    /**
     * Creates a statubar.
     * @param {number} y - Y-Positon of bar.
     * @param {number} x - X-Posistion of bar
     */
    constructor(x, y) {
        super(x, y, 595,158);
        this.xfix = x;
        this.scale(0.4);
    }

    act() {
        this.x = -this.world.cameraXPos + this.xfix;
    }

    // #region Methods
    /** Calculate the current Index of Image-Array. */
    calcIndex() {
        if (this.value < 0) return 0;
        return Math.ceil(this.value / 20);
    }
}

/** Statusbar for Health of Pepe */
export class PepeHealthBar extends Statusbar {

    /** Creates Pepe's Health-Bar. */
    constructor() {
        super(0,0);
        this.value = 100;
    }

    async loadAll() {
        await this.loadImages(ImgHelper.STATUSBAR.health);
    }

    act() {
        super.act();
        this.value = this.world.level.pepe.health;
        this.img = this.imageCache[ImgHelper.STATUSBAR.health[this.calcIndex()]];
    }
}

/** Statusbar for Pepes botles */
export class BottleBar extends Statusbar {

    /** Creates Pepe's bottle bar. */
    constructor() {
        super(0, 50);
        this.value = 0;
    }

    async loadAll() {
        await this.loadImages(ImgHelper.STATUSBAR.bottles);
    }

    act() {
        super.act();
        this.value = this.world.level.pepe.bottles;
        this.img = this.imageCache[ImgHelper.STATUSBAR.bottles[this.calcIndex()]];
    }
}

/** Statusbar for Pepe's Coins. */
export class CoinBar extends Statusbar {

    /** Creates Pepe"s coin bar. */
    constructor() {
        super(0,100);
        this.value = 0;
    }

    async loadAll() {
        await this.loadImages(ImgHelper.STATUSBAR.coins);
    }

    act() { 
        super.act();
        this.value = this.world.level.pepe.coins;
        this.img = this.imageCache[ImgHelper.STATUSBAR.coins[this.calcIndex()]];
    }
}

/** Statubar for boss health. */
export class BossHealthBar extends Statusbar {
    
    /** Creates boss health bar. */
    constructor() {
        super(562,0);
        this.value = 100;
    }

    async loadAll() {
        await this.loadImages(ImgHelper.STATUSBAR.boss);
    }

    act() {
        super.act();
        this.value = (this.world.level.boss) ? this.world.level.boss.health : 100;
        this.img = this.imageCache[ImgHelper.STATUSBAR.boss[this.calcIndex()]];
    }
}