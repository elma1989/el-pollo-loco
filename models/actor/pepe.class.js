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
    world;
    isJumping = false;
    coins = 0;
    bottles = 0;
    // #endregion

    /**
     * Creates the mein-character Pepe.
     * @param {Level} level - Level on which Pepe lives.
     * @param {HTMLElement} canvas - Canvas-Object, on which Pepe is drawn.
     */
    constructor(level, canvas) {
        super(0, 610, 1200, level);
        this.scale(0.25);
        this.loadImages(ImgHelper.PEPE.jump);
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
        IntervalHub.startInverval(this.pepeWalkInterval, 1000 / 60);
    }

    // #region Methods
    pepeAni = () => {
        if (this.isJumping) {
            this.playSingleAnimation(ImgHelper.PEPE.jump);
            if (this.animationPlayed) {
                this.isJumping = false;
                this.animationPlayed = false;
            }
        }
        else if (this.isWalking()) this.playAnimation(ImgHelper.PEPE.walk);
        else if (!this.longIdle) {
            this.startIdle();
            this.playAnimation(ImgHelper.PEPE.idle);
        } else this.playAnimation(ImgHelper.PEPE.longIdle);
    }

    pepeWalkInterval = () => {
        this.walkLeft();
        this.walkRight();
        this.world.cameraXPos = -this.x;
    }

    animate() {
        IntervalHub.startInverval(this.pepeAni, 1000 / 5);
    }

    act() {
        super.act();
        this.changeIdle();
        this.jump();
        this.touchingCoin();
        this.touchingBottle();
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

    jump() {
        if (this.isOnGround() && Keyboard.SPACE) {
            this.animationCounter = 0;
            this.idleStarted = false;
            this.longIdle = false;
            this.isJumping = true;
            this.rise(15);
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

    // #region Collision
    /** Manages collision with a coin. */
    touchingCoin() {
        if (this.isTouchingOneOf(this.level.coins)) {
            const coin = this.getTouching(this.level.coins);
            coin.collected = true;
            this.coins += 20;
        }
    }

    /** Manages collision with a bottle */
    touchingBottle() {
        if (this.isTouchingOneOf(this.level.bottles)) {
            const bottle = this.getTouching(this.level.bottles);
            bottle.collected = true;
            this.bottles += 20;
        }
    }
    // #endregion
    // #endregion
}