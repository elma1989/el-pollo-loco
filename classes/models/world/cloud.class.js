import { Actor } from '../actor/actor.class.js';
import { ImgHelper } from '../../helper/imghelper.class.js';

/** Respesents a cloud. */
class Cloud extends Actor {

    canvas;

    /**
     * Creats a cloude
     * @param {number} width - Width of Cloude
     * @param {number} height - Height of Cloude.
     * @param {HTMLElement} canvas - Canvas-Object, on which cloud is drawn.
     */
    constructor(width, height, canvas) {
        super(Cloud.randomX(canvas), Cloud.randomY(), width, height);
        this.scale(0.5);
        this.canvas = canvas;
    }

    // #region Methods
    static randomX(canvas) {
        return 4 * canvas.width + Math.random() * canvas.width;
    }

    static randomY() {
        return Math.random() * 150;
    }

    act() {
        this.move(-2);
        if (this.x < -this.width) {
            this.x = Cloud.randomX(this.canvas);
            this.y = Cloud.randomY();
        }
    }
    // #endregion
}

/** Represents a small cloud. */
export class SCloud extends Cloud {

    /**
     * Creates a small cloud.
     * @param {HTMLElement} canvas - Canvas-Object on which small cloud is drawn.
     */
    constructor(canvas) {
        super(390, 141, canvas);
        this.loadImage(ImgHelper.BACKGROUND.clouds.small);
    }
}

/** Respresents a medium cloud */
export class MCloud extends Cloud {

    /**
     * Creates a medium cloude
     * @param {HTMLElement} canvas - Canvas-on which medium cloud is drawn.
     */
    constructor(canvas) {
        super(566, 200, canvas);
        this.loadImage(ImgHelper.BACKGROUND.clouds.medium);
    }
}

/** Represents a large cloud. */
export class LCloud extends Cloud {

    /**
     * Creates a large cloud.
     * @param {HTMLElement} canvas - Canvas-Object, on which large cloud is drawn.
     */
    constructor(canvas) {
        super(650, 208, canvas);
        this.loadImage(ImgHelper.BACKGROUND.clouds.large);
    }
}