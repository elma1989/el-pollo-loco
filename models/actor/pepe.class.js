import { MortalActor } from './actor.class.js';
import { ImgHelper } from '../helper/imghelper.class.js';
import { IntervalHub } from '../helper/intervalhub.class.js';
import { AudioHub } from '../helper/audiohub.class.js';
import { Level } from '../world/level.class.js';
import { Keyboard } from '../helper/keyboard.class.js';
import { Bottle } from './collectable.class.js';
import { Boss } from './boss.class.js';
import { BossHealthBar } from './statusbar.class.js';

/** Represents the main-character. */
export class Pepe extends MortalActor {

    // #region Attributes
    longIdle = false;
    idleStarted = false;
    idleSince = 0;
    facingLeft = false;
    isJumping = false;
    coins = 0;
    bottles = 0;
    jumpSoundPlayed = false;
    bossSpawned = false;
    world;
    // #endregion

    /**
     * Creates the mein-character Pepe.
     * @param {Level} level - Level on which Pepe lives.
     * @param {HTMLElement} canvas - Canvas-Object, on which Pepe is drawn.
     */
    constructor(level, canvas) {
        super(0, 610, 1200, level);
        this.scale(0.25);
        this.ground(canvas);
        this.y = this.groundLevel;
        this.offset.left = 35;
        this.offset.right = 55;
        this.offset.top = 155;
        this.offset.bottom = 40;
        IntervalHub.startInverval(this.pepeWalkInterval, 1000 / 60);
    }

    async loadAll() {
        await this.loadImages(ImgHelper.PEPE.dead);
        await this.loadImages(ImgHelper.PEPE.jump);
        await this.loadImages(ImgHelper.PEPE.hurt);
        await this.loadImages(ImgHelper.PEPE.walk);
        await this.loadImages(ImgHelper.PEPE.idle);
        await this.loadImages(ImgHelper.PEPE.longIdle);
        this.animate();
    }

    // #region Methods
    pepeAni = () => {
        if (this.dieing) this.handleDieing();
        else if (this.isJumping) this.handleJumping();
        else if (this.injured) this.handleInjuring();
        else if (this.isWalking()) {
            this.playAnimation(ImgHelper.PEPE.walk);
            AudioHub.playOne(AudioHub.PEPE.walk);
        }
        else if (!this.longIdle) {
            this.startIdle();
            this.playAnimation(ImgHelper.PEPE.idle);
            AudioHub.stopOne(AudioHub.PEPE.walk);
        } else {
            this.playAnimation(ImgHelper.PEPE.longIdle);
            AudioHub.playOne(AudioHub.PEPE.snoring);
        }
    }
    
    /** Pepes Inverval for move on canvas. */
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
        this.touchingChicken();
        this.touchingBoss();
        this.throwBottle();
        this.spawnBoss();
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

    /** Pepe walks left. */
    walkLeft() {
        if (this.canWalkLeft() && Keyboard.LEFT) {
            this.facingLeft = true;
            this.move(-5);
        }
    }

    /** Pepe walks right. */
    walkRight() {
        if (this.canWalkRight() && Keyboard.RIGHT) {
            this.facingLeft = false;
            this.move(5);
        }
    }

    /** Pepe jumps. */
    jump() {
        if (this.isOnGround() && Keyboard.SPACE) {
            this.animationCounter = 0;
            this.idleStarted = false;
            this.longIdle = false;
            this.isJumping = true;
            this.playSingleAnimation(ImgHelper.PEPE.jump);
            this.rise(15);
        }
    }

    /** Pepe throws a bottle. */
    throwBottle() {
        if (!this.dieing && this.bottles >= 20 && !this.level.thrownBottle && Keyboard.CTRL) {
            this.bottles -= 20;
            this.level.thrownBottle = new Bottle(this.level, this.world.canvas);
            this.level.thrownBottle.loadAll();
            this.level.thrownBottle.thrown = true;
            this.level.thrownBottle.x = this.rx + this.rwidth;
            this.level.thrownBottle.y = this.ry;
            this.level.thrownBottle.directionLeft = this.facingLeft;
            this.level.thrownBottle.speedY = -20;
            this.longIdle = false;
            this.idleStarted = false;
        }
    }

    /** Let Pepe spawn the boss. */
    spawnBoss() {
        if(this.x >= 2000 && !this.bossSpawned) {
            this.level.boss.active = true;
            this.level.statusbars.push(new BossHealthBar());
            this.level.statusbars[3].loadAll();
            this.level.statusbars[3].world = this.world;
            AudioHub.playOne(AudioHub.ENEMY.boss);
            this.bossSpawned = true;
        }
    }
    // #region Animation-Handling
    /** Handles the dieing-procedure. */
    handleDieing() {
        if (!this.died) {
            this.playSingleAnimation(ImgHelper.PEPE.dead);
            AudioHub.stopOne(AudioHub.PEPE.walk);
            if (!this.deadSoundPlayed) {
                AudioHub.playOne(AudioHub.PEPE.dead);
                this.deadSoundPlayed = true;
            }
            if (this.animationPlayed) {
                this.died = true;
                this.level.screens[2].visible = true;
                this.world.endGame();
            }
        }
    }

    /** Handles the jump-procedure. */
    handleJumping() {
        this.playSingleAnimation(ImgHelper.PEPE.jump);
        AudioHub.stopOne(AudioHub.PEPE.walk);
        if (!this.jumpSoundPlayed) AudioHub.playOne(AudioHub.PEPE.jump);
        if (this.animationPlayed) {
            this.isJumping = false;
            this.animationPlayed = false;
        }
        if (this.isOnGround()) this.jumpSoundPlayed = false;
    }

    /** Handles the injuring-procedure. */
    handleInjuring() {
        this.playAnimation(ImgHelper.PEPE.hurt);
            if (!this.hurtSoundPlayed) {
                AudioHub.stopOne(AudioHub.PEPE.walk);
                AudioHub.playOne(AudioHub.PEPE.hurt);
                this.hurtSoundPlayed = true;
            }
    }
    // #endregion
    // #region Checks
    isWalking() {
        if (this.dieing || this.died || this.world.endOfGame) return false;
        const walking = Keyboard.LEFT || Keyboard.RIGHT;
        if (walking) {
            if (this.animationCounter > 5) this.animationCounter = 0;
            this.idleStarted = false;
            this.longIdle = false;
        }
        return walking;
    }

    /** Checks if Pepe can walk left. */
    canWalkLeft() {
        return this.x >= 0 && !this.dieing && !this.injured && !this.world.endOfGame;
    }

    /** Check if Pepe can walk right. */
    canWalkRight() {
        return this.x <= 2400 && !this.dieing && !this.injured && !this.world.endOfGame;
    }
    // #endregion

    // #region Collision
    /** Manages collision with a coin. */
    touchingCoin() {
        if (this.isTouchingOneOf(this.level.coins)) {
            const coin = this.getTouching(this.level.coins);
            coin.collected = true;
            this.coins += 20;
            AudioHub.playOne(AudioHub.COLLECTABLES.coin);
        }
    }

    /** Manages collision with a bottle */
    touchingBottle() {
        if (this.isTouchingOneOf(this.level.bottles)) {
            const bottle = this.getTouching(this.level.bottles);
            bottle.collected = true;
            this.bottles += 20;
            AudioHub.playOne(AudioHub.COLLECTABLES.bottle.collect);
        }
    }

    /** Manages collision width small chicken or normal ckicken. */
    touchingChicken() {
        if (this.isTouchingOneOf(this.level.enemies)) {
            const chicken = this.getTouching(this.level.enemies);
            if (this.falling) {
                chicken.hit(100);
            } else if(!chicken.dieing) {
                this.animationCounter = 0;
                this.hit(10);
                this.idleStarted = false;
                this.longIdle = false;
            }
        }
    }

    /** Mangeges collision with boss. */
    touchingBoss() {
        if (this.level.boss && this.isTouching(this.level.boss) && !this.level.boss.dieing) {
            this.animationCounter = 0;
                this.hit(34);
                this.idleStarted = false;
                this.longIdle = false;
        }
    }
    // #endregion
    // #endregion
}