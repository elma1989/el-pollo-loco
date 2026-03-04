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
}