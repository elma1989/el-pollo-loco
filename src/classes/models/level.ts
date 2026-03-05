import { DrawableObject } from "../drawable-object.js";
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
        this.drawnObjects.forEach(drawing => {
            drawing.draw();
        });
        const self = this;
        requestAnimationFrame(() => self.drawAll());
    }
    // #endregion
}