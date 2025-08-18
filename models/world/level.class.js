import { Air, Desert } from './background.class.js';
import { SCloud, MCloud, LCloud } from './cloud.class.js';
import { Coin, Bottle } from '../actor/collectable.class.js';
import { Chick, Chicken } from '../actor/enemy.class.js';
import { Pepe } from '../actor/pepe.class.js';

/** Sumrizes all Object of the world. */
export class Level {
    
    backgrounds;
    collectables;
    enemies;
    pepe;

    /**
     * Creates the level.
     * @class
     * @param {HTMLElement} canvas - Canvas-Object for draw.
     */
    constructor(canvas) {
        this.createBackgrounds(canvas);
        this.createCollectables(canvas);
        this.createEnemies(canvas);
        this.pepe = new Pepe(this, canvas);
    }

    /**
     * Creates the backgrounds.
     * @param {HTMLElement} canvas - Canvas-Object on wich backgrouds are drown.
     */
    createBackgrounds(canvas) {
        this.backgrounds = [
            new Air(canvas),
            new Air(canvas),
            new Air(canvas),
            new Air(canvas),
            new Desert(canvas),
            new Desert(canvas),
            new Desert(canvas),
            new Desert(canvas),
            new Desert(canvas),
            new Desert(canvas),
            new Desert(canvas),
            new Desert(canvas),
            new Desert(canvas),
            new Desert(canvas),
            new Desert(canvas),
            new Desert(canvas),
            new SCloud(canvas),
            new SCloud(canvas),
            new SCloud(canvas),
            new MCloud(canvas),
            new MCloud(canvas),
            new LCloud(canvas),
            new SCloud(canvas),
            new MCloud(canvas),
            new MCloud(canvas),
            new LCloud(canvas)
        ]
    }


    /**
     * Creates collectabels.
     * @param {HTMLElement} canvas - Canvas-Object, on which, collectables are drawn.
     */
    createCollectables(canvas) {
        this.collectables = [
            new Coin(this, canvas),
            new Bottle(this, canvas),
            new Coin(this, canvas),
            new Bottle(this, canvas),
            new Coin(this, canvas),
            new Bottle(this, canvas),
            new Coin(this, canvas),
            new Bottle(this, canvas),
            new Coin(this, canvas),
            new Bottle(this, canvas)
        ]
    }

    createEnemies(canvas) {
        this.enemies = [
            new Chick(this, canvas),
            new Chicken(this, canvas),
            new Chick(this, canvas),
            new Chicken(this, canvas),
            new Chick(this, canvas),
            new Chicken(this, canvas),
            new Chick(this, canvas),
            new Chicken(this, canvas),
            new Chick(this, canvas),
            new Chicken(this, canvas),
        ]
    }
}