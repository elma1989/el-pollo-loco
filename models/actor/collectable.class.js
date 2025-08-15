import { Collectable } from './actor.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';

export class Coin extends Collectable {

    constructor(level, canvas) {
        super(300, 300, level);
        this.loadImage(ImgHelper.COLLECTABLE.coin);
        this.scale(0.5);
        this.ground(canvas);
        this.y = this.groundLevel;
        this.offset.top = 60;
        this.offset.left = 60;
        this.offset.right = 60;
        this.offset.bottom = 60;
        this.calcRealFrame();
    }

    ground(canvas) {
        this.groundLevel = canvas.height - this.height - 200;
    }
}

export class Bottle extends Collectable {

    constructor(level, canvas) {
        super(400, 400, level);
        this.loadImage(ImgHelper.COLLECTABLE.bottle.ground);
        this.scale(0.25);
        this.ground(canvas);
        this.y = this.groundLevel;
        this.offset.left = 50;
        this.offset.right = 30;
        this.offset.top = 25;
        this.offset.bottom = 15;
        this.calcRealFrame();
    }
}