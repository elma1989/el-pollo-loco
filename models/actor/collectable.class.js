import { Collectable } from './actor.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';
import { IntervalHub } from '../helper/intervalhub.class.js';

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

    // #region Attributes
    thrown = false;
    directionLeft = false;
    splashing = false;
    splashed = false;
    // #endregion

    constructor(level, canvas) {
        super(400, 400, level);
        this.loadImage(ImgHelper.COLLECTABLE.bottle.ground);
        this.loadImages(ImgHelper.COLLECTABLE.bottle.flip);
        this.loadImages(ImgHelper.COLLECTABLE.bottle.splash);
        this.scale(0.25);
        this.animate();
        this.ground(canvas);
        this.y = this.groundLevel;
        this.offset.left = 50;
        this.offset.right = 30;
        this.offset.top = 25;
        this.offset.bottom = 15;
        this.calcRealFrame();
    }

    // #region Methods
    act() {
        super.act();
        if (this.thrown) {
            const speedX = this.directionLeft ? -5 : 5;
            this.move(speedX);
        }
        if (this.thrown && this.isOnGround()){
            this.thrown = false;
            this.splashing = true;
            this.animationCounter = 0;
        }
    }

    bottleAni = () => { 
        if(this.thrown) {
            this.playSingleAnimation(ImgHelper.COLLECTABLE.bottle.flip);
        }
        if (this.splashing & !this.splashed) {
            this.playSingleAnimation(ImgHelper.COLLECTABLE.bottle.splash);
            if (this.animationPlayed) this.splashed = true;
        }
    }

    animate() {
        IntervalHub.startInverval(this.bottleAni, 1000 / 10);
    }
    // #endregion
}