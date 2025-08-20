
/** An object, which is drwan */
export class DrawableObject {
    
    // #region Attributes
    x;
    y;
    width;
    height;
    img;
    // #endregion

    /**
     * Creates an object to draw.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     */
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
        this.img = new Image();
    }

    // #region Methods
    /**
     * Loads image for draw.
     * @param {string} path - Path of Image.
     */
    loadImage(path) {
        this.img.src = path;
    }

    /**
     * Scales an object.
     * @param {number} factor - Factor to scale.
     */
    scale(factor) {
        this.width *= factor;
        this.height *= factor;
    }
    // #endregion
}

/** Respresents a drawable object, wiche can execute somethings. */
export class Actor extends DrawableObject {

    /**
     * Creates an Actor.
     * @param {number} x - X-Pos of Actor.
     * @param {number} y - Y-Pos of Actor.
     * @param {number} width - Width of Actor.
     * @param {number} height - Height of Actor.
     */
    constructor(x, y, width, height) {
        super(x, y, width, height)
    }

    // #region Methods
    /**
     * Thins to do during the run time.
     * Can modified by subclass.
     */
    act() {

    }

    /**
     * Moves an actor in horizontel direction above the canvas.
     * @param {number} speed - Speed in pixel per draw.
     */
    move(speed) {
        this.x += speed;
    }
    // #endregion
}

/** An Actor, who is animated */
export class AnimatedActor extends Actor {
    
    // #region Attributes
    animationStarted = false;
    animationPlayed = false;
    animationCounter = 0;
    imageCache = {};
    // #endregion

    /**
     * Creates an animated actor.
     * @param {number} x - X-Pos. of actor.
     * @param {number} y - Y-Pos. of actor.
     * @param {number} width - Width of actor.
     * @param {number} height - Height of actor.
     */
    constructor(x, y, width, height) {
        super(x, y, width, height)
    }

    // #region Methods
    /**
     * Loads a collection of images in cache.
     * @param {Array.string} arr - Collection of image paths.
     */
    loadImages(arr) {
        if (arr.length > 0) {
            arr.forEach( path => {
                const img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            })
        }
    }

    /**
     * Executes the animation.
     * Con modified by subclass.
     */
    animate() {

    }

    /**
     * Plays a Collection of Animation in Loop.
     * @param {Array.string} arr - Paths to animation.
     */
    playAnimation(arr) {
        this.nextAnimationImg(arr);
        if (this.animationCounter == arr.length) this.animationCounter = 0;
    }

    /**
     * Plays a collection of animation once only.
     * @param {Array.string} arr - Paths to animation
     */
    playSingleAnimation(arr) {
        if (!this.animationStarted && !this.animationPlayed) {
            this.animationCounter = 0;
            this.animationStarted = true;
        }
        this.nextAnimationImg(arr);
        if (this.animationCounter == arr.length) {
            this.animationStarted = false;
            this.animationPlayed = true;
            this.animationCounter = 0;
        }
    }

    /**
     * Changes to next image from 
     * @param {Array.string} arr - Path to animtation
     */
    nextAnimationImg(arr) {
        const path = arr[this.animationCounter++];
        this.img = this.imageCache[path]
    }
    // #endregion
}

/** An Actor. who alplies gravity. */
export class GraviActor extends AnimatedActor {

    // #region Attributes
    groundLevel;
    acceleration = 0.5;
    speedY = 0;
    falling = false;
    rising = false;
    // #endregion Attributes

    /**
     * Creates an actor with gravity.
     * @param {number} x - X-Pos. of actor.
     * @param {number} width - Width of actor.
     * @param {number} height - height of actor.
     */
    constructor(x, width, height) {
        super(x, 0, width, height);
        
    }
    // #region Methods
    /**
     * Sets the ground Level.
     * @param {HTMLElement} canvas - Canvas-Object, on which actor is drawn
     */
    ground(canvas) {
        this.groundLevel = canvas.height - this.height - 30;
    }

    /**
     * Checks, if the actor is on ground.
     * @returns true, if actor is on ground.
     */
    isOnGround() {
        return this.y >= this.groundLevel;
    }

    /** The falling-process. */
    fall() {
        this.speedY += this.acceleration;
        this.y += this.speedY;
        this.falling = true;
    }

    /** Actor touches down on groud. */
    land() {
        this.speedY = 0;
        this.y = this.groundLevel;
        this.falling = false;
    }

    /** Makes the gravity possible. */
    aplyGravity() {
        if (this.speedY >= 0) this.rising = false;
        if (this.isOnGround() && !this.rising) this.land()
        else this.fall();
    }

    /**
     * Moves an actor against the grabity.
     * @param {number} speed - Intial speed for rising.
     */
    rise(speed) {
        this.rising = true;
        this.speedY = -speed;
    }

    act() {
        this.aplyGravity();
    }
    // #endregion
}

/** An Actor, who has colision */
export class TouchingActor extends GraviActor {
    
    // #region Attributes
    level;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
    rx;
    ry;
    rwidth;
    rheight;
    // #endregion

    constructor(x, width, height, level) {
        super(x, width, height);
        this.level = level;
    }

    // #region Methods
    /** Calculatees the real frame. */
    calcRealFrame() {
        this.rx = this.x + this.offset.left;
        this.ry = this.y + this.offset.top;
        this.rwidth = this.width - this.offset.left - this.offset.right;
        this.rheight = this.height - this.offset.top - this.offset.bottom;
    }

    /**
     * Checks, if actors touches.
     * @param {TouchingActor} tA - Reference-Object to check
     * @returns true, if teir touches each other.
     */
    isTouching(tA) {
        return this.rx + this.rwidth > tA.rx &&
            this.ry + this.rheight > tA.ry &&
            this.rx < tA.rx + tA.rwidth &&
            this.ry < tA.ry + tA.rheight
    }

    /**
     * Checks, if the actor is touching a member of collection.
     * @param {Array.TouchingActor} arr - Collectin to check
     * @returns true, if this actor touches a member of collectiln.
     */
    isTouchingOneOf(arr) {
        if (arr.length == 0) return false;
        return arr.some(tA => this.isTouching(tA));
    }

    /**
     * Gets the colliding object.
     * @param {Array.TouchingActor} arr - Collection to check.
     * @returns null, if not toches, or collection is empty.
     */
    getTouching(arr) {
        for (let i = 0; i < arr.length; i++ ) {
            if (this.isTouching(arr[i])) return arr[i];
        }
        return null;
    }

    act() {
        super.act();
        this.calcRealFrame();
    }
    // #endregion
}

/** An Actor, who can be collected */
export class Collectable extends TouchingActor {

    // #region Attributes
    collected = false;
    static xPos = 200;
    // #endregion

    constructor(width, height, level) {
        super(Collectable.xPos, width, height, level);
        Collectable.xPos += 200;
    }

    // #region Method
    /**
     * Instructions to collect this actor.
     * Can modified by subclass
     */
    collect() {

    }

    act() {
        super.act();
        this.collect();
    }
    // #endregion
}

/** An Actor, who can die */
export class MortalActor extends TouchingActor {

    // #region Attributes
    health = 100;
    died = false;
    dieing = false;
    injured = false;
    injuredSince = 0;
    hurtSoundPlayed = false;
    deadSoundPlayed = false;
    // #endregion

    constructor(x, width, height, level) {
        super(x, width, height, level);
    }

    // #region Methods
    /** Sets the dieing-flag, if empty health. */
    emptyHelth() {
        if (!this.died && this.health <= 0) this.dieing = true;
    }

    /**
     * Will execurte to injure the actor.
     * @param {number} power - Value to decrese health.
     */
    hit(power) {
        if (!this.injured) {
            this.health -= power;
            this.injured = true;
            this.injuredSince = Date.now();
        }
    }

    /** Desables the injure-protection after a hit. */
    disableInjured() {
        if (this.injured && Date.now() - this.injuredSince >= 3000) {
            this.injured = false;
            this.hurtSoundPlayed = false;
        }
    }

    act() {
        super.act();
        this.emptyHelth();
        this.disableInjured();
    }
    // #endregion
}