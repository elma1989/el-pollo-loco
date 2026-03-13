import { MovableObject } from "./movable-object.js";

/** A movabel oject, which is animated. */
export abstract class AnimatedObject extends MovableObject {
    protected frequency: number  = 5;
    protected imgs: Record<string, HTMLImageElement[]> = {};
    private currentImage: number = 0;
    private currentAnimation: string | null = null;

    /**
     * Creates an animated obejct.
     * @param x - X-Pos of object.
     * @param y - Y-Pos of oject.
     * @param width - Width of object
     * @param height - Height of object.
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    // #region Methods
    /**
     * Loads images of array in carche.
     * @param paths - Array of path
     * @returns Array of images
     */
    protected async addAnimation(paths: string[]): Promise<HTMLImageElement[]> {
        const imgArr: HTMLImageElement[] = [];
        for( const path of paths) {
            const img: HTMLImageElement = await this.loadImage(path);
            imgArr.push(img);
        }
        return imgArr;
    }

    /** Will be excecuted by lavel ater load. */
    animate() {

    }

    /** Changes image to next image. */
    private changeImage(): void {
        if (this.currentAnimation
            && this.imgs[this.currentAnimation]
            && this.currentImage < this.imgs[this.currentAnimation].length
        ) this.img = this.imgs[this.currentAnimation][this.currentImage++];
    }

    /**
     * Plays an animtaion
     * @param name - Name of animation
     */
    protected playAnmation(name: string) {
        if (this.currentAnimation != name) this.currentImage = 0;
        this.currentAnimation = name;
        this.changeImage();
        if (this.currentImage == this.imgs[this.currentAnimation].length)
            this.currentAnimation = null
    }
    
    /**
     * Loops an animations.
     * @param name - Name of anination.
     */
    protected playAnimationLoop(name: string) {
        if (this.currentAnimation != name) this.currentImage = 0;
        this.currentAnimation = name;
        this.changeImage();
        if (this.currentImage == this.imgs[this.currentAnimation].length)
            this.currentImage = 0;
    }
    // #endregion
}