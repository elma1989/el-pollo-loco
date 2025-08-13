import { Air, Desert } from './background.class.js';
import { SCloud, MCloud, LCloud } from './cloud.class.js';

/** Sumrizes all Object of the world. */
export class Level {
    
    backgrounds;

    constructor(canvas) {
        this.createBackgrounds(canvas);
    }

    createBackgrounds(canvas) {
        this.backgrounds = [
            new Air(canvas),
            new Air(canvas),
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
}