import { Game } from "./game.js";

export abstract class DrawableObject {
    // #region Attributes
    x: number;
    private _y: number = 0;
    private _width: number;
    private _height: number;
    protected img: HTMLImageElement | null = null;
    // #endregion

    /**
     * Creates an object to draw.
     * @param x - X-Postion of object.
     * @param y - Y-Position of object.
     * @param width - Width of object.
     * @param height - Height of object.
     */
    constructor(x: number, y: number, width: number, height:number) {
        this._width = width;
        this._height = height;
        this.x = x;
        this.y = y;
    }

    // #region Methods

    get width(): number  { return this._width; }

    get height(): number { return this._height; }

    get y(): number { return this._y; }

    set y(newPos: number) {
        const canvas = Game.canvas;
        if (!canvas || newPos < 0) this._y = 0;
        else {
            const maxY = canvas.height - this.height;
            this._y = newPos <= maxY ? newPos : maxY;
        }
    }
    // #endregion

    // #region Loading
    /** Implemntes complete loading process. */
    abstract load(): Promise<void>;

    /**
     * Loads an image in cache.
     * @param path - Path from image.
     */
    protected async loadImage(path: string): Promise<HTMLImageElement> {
        const resp = await fetch(path);
        if(!resp.ok) {
            this.img = null;
            throw new Error(`HTTP-Error: ${resp.status}`);
        }
        return this.getImage(path);
    }

    /**
     * Creates an HTMLImageElemnt from path.
     * @param path - Path from image.
     * @returns HTMLImageElemnt
     */
    private async getImage(path: string): Promise<HTMLImageElement> {
        const img = new Image();
        return new Promise(resolve => {
            img.src = path;
            img.onload = () => resolve(img);
        });
    }
    // #endregion
    
    // #region Drawing
    /** Draws an object. */
    draw(): void {
        if (!Game.ctx || !this.img) return;
        Game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Scales an object.
     * @param factor - Factor for scale.
     */
    protected scale(factor: number): void {
        this._width *= factor;
        this._height *= factor;
    }
    // #endregion
    // #endregion
}