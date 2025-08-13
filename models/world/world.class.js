import { Level } from './level.class.js'
import { DrawableObject, Actor } from '../actor/actor.class.js';

/** Represents the world. */
export class World {
    
    level;
    canvas;
    ctx;

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.level = new Level(this.canvas);
        this.draw();
    }

    /** Draws the world. */
    draw() {

        this.drawObjects(this.level.backgrounds);

        requestAnimationFrame(() => {
            this.draw();
        });
    }

    /**
     * Draws an object.
     * @param {DrawableObject} dO - Object to draw.
     */
    drawSingleObject(dO) {
        if (dO instanceof Actor) dO.act();
        if (dO.img.src) this.ctx.drawImage(dO.img, dO.x, dO.y, dO.width, dO.height);
    }

    /**
     * Draws a collection.
     * @param {Array.DrawableObject} arr - Collection to draw.
     */
    drawObjects(arr) {
        if (arr.length > 0) {
            arr.forEach(dO => {
                this.drawSingleObject(dO);
            });
        }
    }
}