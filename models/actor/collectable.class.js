import { Collectable} from './actor.class.js';
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