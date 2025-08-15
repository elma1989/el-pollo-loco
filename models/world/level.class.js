import { Air, Desert } from './background.class.js';
import { SCloud, MCloud, LCloud } from './cloud.class.js';
import { Coin, Bottle } from '../actor/collectable.class.js';

/** Sumrizes all Object of the world. */
export class Level {
    
    backgrounds;
    collectables;

    constructor(canvas) {
        this.createBackgrounds(canvas);
        this.createCollectables(canvas);
    }

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
}