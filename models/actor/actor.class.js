
/** An object, which is drwan */
export class DrawableObject {
    
    x;
    y;
    width;
    height;
    img;

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

    /**
     * Loads image for draw.
     * @param {string} path - Path of Image.
     */
    loadImage(path) {
        this.img.src = path;
    }
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

    /**
     * Thins to do during the run time.
     * Can modified by subclass.
     */
    act() {

    }
}