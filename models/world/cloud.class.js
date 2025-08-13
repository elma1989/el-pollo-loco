import { Actor } from '../actor/actor.class.js';

export class Cloud extends Actor {

    canvas;

    constructor(width, height, canvas) {
        super(Cloud.randomX(canvas), Cloud.randomY(), width, height);
        this.canvas = canvas;
    }

    // #region Methods
    static randomX(canvas) {
        return 2 * canvas.width + Math.random() * canvas.width;
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