import { DrawableObject } from "../drawable-object.js";
import { Game } from "../game.js";
import { IntervalHub } from "../interval-hub.js";
import { MovableObject } from "../movable-object.js";
import { Layer0 } from "./layer0.js";
import { Layer1 } from "./layer1.js";
import { Layer2 } from "./layer2.js";
import { Sky } from "./sky.js";

export class Level {
    private drawnObjects: DrawableObject[] = [];

    constructor() {
        this.createObjects();
    }

    // #region Methods
    /** Creates all objects. */
    private createObjects(): void {
        this.drawnObjects = [
            new Sky(0), new Sky(1),
            new Layer0(0), new Layer0(1),
            new Layer1(0), new Layer1(1),
            new Layer2(0), new Layer2(1),
        ]
    }

    /** Loads all drawn objects in cache. */
    async loadObjects(): Promise<void> {
        await Promise.all(
            this.drawnObjects.map(async (object) => 
                await object.load()
            )
        );
        this.drawAll();
    }

    /** Draws all drawings */
    private drawAll(): void {
        this.clearCanvas();
        this.drawnObjects.forEach(drawing => {
            drawing.draw();
        });
        const self = this;
        requestAnimationFrame(() => self.drawAll());
    }

    /** Clears canvas. */
    private clearCanvas(): void {
        const canvas = Game.canvas;
        const ctx = Game.ctx;
        if (canvas && ctx) 
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /** Updates all objects. */
    private update: () => void = () => {
        this.drawnObjects.forEach(dO => {
            if (dO instanceof MovableObject)
                dO.act();
        });
    }

    /** Starts the game. */
    startGame(): void {
        Game.run = true;
        IntervalHub.start(this.update, 1000 / MovableObject.fps)
    }
    // #endregion
}