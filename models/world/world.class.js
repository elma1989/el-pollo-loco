import { Level } from './level.class.js';
import { DrawableObject, Actor, TouchingActor} from '../actor/actor.class.js';

/** Represents the world. */
export class World {
    
    level;
    canvas;
    ctx;
    static cameraXPos = 0;

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.level = new Level(this.canvas);
        this.draw();
    }

    // #region Methods
    // #region Draw
    /** Draws the world. */
    draw() {
        this.ctx.translate(World.cameraXPos, 0);

        this.drawObjects(this.level.backgrounds);
        this.drawObjects(this.level.collectables);
        this.drawObjects(this.level.enemies);
        this.drawSingleObject(this.level.pepe);

        this.ctx.translate(-World.cameraXPos, 0);

        // console.log(World.cameraXPos);

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

    /**
     * Draws a frame around the total image.
     * @param {DrawableObject} dO - Object for fram.
     */
    drawImgFrame(dO) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '3';
        this.ctx.strokeStyle = 'blue';
        this.ctx.rect(dO.x, dO.y, dO.width, dO.height);
        this.ctx.stroke();
    }
    
    /**
     * Draws a real frame around an image.
     * @param {TouchingActor} tA - Object for real frame.
     */
    drawOffsetFrame(tA) {
        if (tA instanceof TouchingActor) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '3';
            this.ctx.strokeStyle = 'red';
            this.ctx.rect(tA.rx, tA.ry, tA.rwidth, tA.rheight);
            this.ctx.stroke();
        }
    }
    // #endregion
    
    // #region Clear
    /**
     * Deletes all collect collecables.
     * @param {Array.Collectable} arr - Collecten to check
     * @returns Collection with collectables not found
     */
    clearCollected (arr) {
        return arr.filter(col => !col.collected)
    }

    /**
     * Deleetes all enemies, who passed away.
     * @param {Array.MortalActor} arr - Collection of enemies
     * @returns Collection with enemies, who stayed alive.
     */
    clearDead (arr) {
        return arr.filter(mA =>  !mA.died)
    }
    // #endregion
    // #endregion
}