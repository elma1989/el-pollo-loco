import { Air, Desert } from './background.class.js';

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
            new Desert(canvas)
        ]
    }
}