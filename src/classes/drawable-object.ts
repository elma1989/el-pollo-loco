import { Game } from "./game.js";

export abstract class DrawableObject {
    // #region Attributes
    protected x: number;
    protected y: number;
    private width: number;
    private height: number;
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
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // #region Methods
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
        this.width *= factor;
        this.height *= factor;
    }
    // #endregion
    // #endregion
}