import { Level } from './level.class.js';
import { DrawableObject, Actor, TouchingActor} from '../actor/actor.class.js';
import { Pepe } from '../actor/pepe.class.js';
import { AudioHub } from '../../helper/audiohub.class.js';

/** Represents the world. */
export class World {
    
    level;
    canvas;
    ctx;
    cameraXPos = 0;
    startScreenViewed = false;
    fullLoaded = false;
    endOfGame = false;
    
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.level = new Level(this.canvas);
        this.setWorld();
        this.loadAssets();
        this.draw();
    }

    // #region Methods
    /** Sets this world a character Attribute */
    setWorld() {
        this.level.pepe.world = this;
        this.level.statusbars[0].world = this;
        this.level.statusbars[1].world = this;
        this.level.statusbars[2].world = this;
        this.level.pepe.world = this;
        this.level.boss.world = this;
    }

    // #region Loads
    async loadAssets() {
        await this.loadBackgrounds();
        await this.loadCoins();
        await this.loadBottles();
        await this.loadEnemies();
        await this.loadPepe();
        await this.loadStatusbars();
        await this.loadScreens();
        this.fullLoaded = true;
        this.activateStartBtn();
        
    }

    async loadBackgrounds() {
        for (const background of this.level.backgrounds) {
            await background.loadAll();
        }
    }

    async loadCoins() {
        for (const coin of this.level.coins) {
            await coin.loadAll();
        }
    }

    async loadBottles() {
        for (const bottle of this.level.bottles) {
            await bottle.loadAll();
        }
    }

    async loadEnemies() {
        for (const enemy of this.level.enemies) {
            await enemy.loadAll();
        }
        await this.level.boss.loadAll();
    }

    async loadPepe() {
        this.level.pepe.loadAll();
    }

    async loadStatusbars() {
        for (const statusbar of this.level.statusbars) {
            await statusbar.loadAll();
        }
    }

    async loadScreens() {
        for (const screen of this.level.screens) {
            await screen.loadAll();
        }
    }
    // #endregion

    // #region Draw
    /** Draws the world. */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.cameraXPos, 0);

        this.drawObjects(this.level.backgrounds);
        this.drawChickens();
        this.drawCollectables();
        
        this.drawSingleObject(this.level.pepe);

        this.drawObjects(this.level.statusbars);

        this.ctx.translate(-this.cameraXPos, 0);

        this.drawScreens();

        requestAnimationFrame(() => {
            this.draw();
        });
    }

    /**
     * Draws an object.
     * @param {DrawableObject} dO - Object to draw.
     */
    drawSingleObject(dO) {
        if (dO instanceof Actor && this.startScreenViewed && !this.endOfGame) dO.act();
        if (this.pepeFacingLeft(dO)) {
            this.flipImg(dO);
        }
        if (dO.img.src) this.ctx.drawImage(dO.img, dO.x, dO.y, dO.width, dO.height);
        if (this.pepeFacingLeft(dO)) {
            this.backflipImg(dO);
        }
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

    /** Draws all collectabeles */
    drawCollectables() {
        this.level.coins = this.clearCollected(this.level.coins);
        this.drawObjects(this.level.coins);
        this.level.bottles = this.clearCollected(this.level.bottles);
        this.drawObjects(this.level.bottles);
        if (this.level.thrownBottle) this.drawSingleObject(this.level.thrownBottle);
    }

    /** Draws all chickens. */
    drawChickens() {
        this.level.enemies = this.clearDead(this.level.enemies);
        this.drawObjects(this.level.enemies);
        if (this.level.boss.active) {
            this.drawSingleObject(this.level.boss);
        }
    }

    /** Draws the screens. */
    drawScreens() {
        this.level.screens.forEach( screen => {
            if (screen.visible) {
                this.drawSingleObject(screen);
            }
        })
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

    /**
     * Mirrors image vertically.
     * @param {DrawableObject} dO - Object to draw.
     */
    flipImg(dO) {
        this.ctx.save();
        this.ctx.translate(dO.width, 0);
        this.ctx.scale(-1, 1);
        dO.x = -dO.x
    }

    /**
     * Restores the previous setting before flip.
     * @param {DrawableObject} dO - Object is drawn.
     */
    backflipImg(dO) {
        this.ctx.restore();
            dO.x = -dO.x
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
    // #region Checks
    /**
     * Controls Pepes direction.
     * @param {Pepe} pepe - Intance of main character.
     * @returns true, if Pepe is watching left.
     */
    pepeFacingLeft(pepe) {
        return pepe instanceof Pepe && pepe.facingLeft
    }
    // #endregion

    // #region Btn-Mangament
    /** Activates the start button. */
    activateStartBtn() {
        const startBtn = document.getElementById('start-btn');
        startBtn.textContent = 'START';
        startBtn.removeAttribute('disabled');
        startBtn.addEventListener('click', () => {
            this.startScreenViewed = true;
            this.level.screens[0].visible = false;
            document.getElementById('control-btns').classList.add('d-none');
            AudioHub.playOne(AudioHub.BACKGROUND);
            AudioHub.playOne(AudioHub.GAME);
        });
    }

    endGame() {
        document.getElementById('end-btns').classList.remove('d-none');
        AudioHub.stopAll();
        this.endOfGame = true;
    }
    // #endreqion
    // #endregion
}