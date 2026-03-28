import { AnimatedObject } from "../animated-object.js";
import { DrawableObject } from "../drawable-object.js";
import { Game } from "../game.js";
import { HealthyObject } from "../healthy-object.js";
import { IntervalHub } from "../interval-hub.js";
import { MovableObject } from "../movable-object.js";
import { Character } from "./character.js";
import { ChickenM } from "./chicken-m.js";
import { ChickenS } from "./chicken-s.js";
import { Clouds } from "./clouds.js";
import { Layer0 } from "./layer0.js";
import { Layer1 } from "./layer1.js";
import { Layer2 } from "./layer2.js";
import { Sky } from "./sky.js";

export class Level {
    private drawnObjects: DrawableObject[] = [];
    static cameraX: number = 0;

    constructor() {
        this.createObjects();
    }

    // #region Methods
    /** Creates all objects. */
    // #region Loading
    private createObjects(): void {
        this.drawnObjects = [
            new Sky(0), new Sky(1),
            new Layer0(0), new Layer0(1),
            new Layer1(0), new Layer1(1),
            new Layer2(0), new Layer2(1),
            new Clouds(0), new Clouds(1), new Clouds(2), new Clouds(3),
            new ChickenM(), new ChickenS(),
            new ChickenM(), new ChickenS(),
            new ChickenM(), new ChickenS(),
            new ChickenM(), new ChickenS(),
            new ChickenM(), new ChickenS(),
            new Character()
        ]
    }

    /** Loads all drawn objects in cache. */
    async loadObjects(): Promise<void> {
        await Promise.all(
            this.drawnObjects.map(async (object) => 
                await object.load()
            )
        );
        this.animateAll();
        this.enablePepeIdleInterval();
        this.drawAll();
    }
    // #endregion

    // #region Drawing
    /** Draws all drawings */
    private drawAll(): void {
        if (Game.ctx) {
            this.clearCanvas();
            Game.ctx.translate(Level.cameraX, 0);
            this.drawnObjects.forEach(drawing => {
                if(this.isPepeFacingLeft(drawing)) this.mirrorHorizontally(drawing)
                else {
                    if(drawing instanceof HealthyObject) {
                        if(!drawing.dead) drawing.draw();
                    }
                    else drawing.draw();
                }
            });
            Game.ctx.translate(-Level.cameraX, 0);

            const self = this;
            requestAnimationFrame(() => self.drawAll());
        }
    }

    /** Clears canvas. */
    private clearCanvas(): void {
        const canvas = Game.canvas;
        const ctx = Game.ctx;
        if (canvas && ctx) 
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Checks, if Pepe is watching left.
     * @param dO - Instace of DrawableObject
     * @returns true, if Pepe watches left.
     */
    private isPepeFacingLeft(dO: DrawableObject): boolean { 
        if(dO instanceof Character) {
            const character = dO as Character;
            return character.facingLeft;
        }
        return false;
    }

    /**
     * Mirrors a DrawableObject horizontally.
     * @param dO - DrawableObject to mirror
     */
    private mirrorHorizontally(dO: DrawableObject): void {
        const ctx = Game.ctx;
        if (ctx) {
            ctx.save();
            ctx.scale(-1, 1);
            dO.x = -dO.x -dO.width;
            dO.draw();
            dO.x = -dO.x -dO.width;
            ctx.restore();
        }
    }
    // #endregion

    // #region Update
    /** Updates all objects. */
    private update: () => void = () => {
        this.drawnObjects.forEach(dO => {
            if (dO instanceof MovableObject)
                dO.act();
        });
    }

    /** Starts all animations. */
    private animateAll() {
        this.drawnObjects.forEach(animation => {
            if (animation instanceof AnimatedObject) {
                animation.animate();
            }
        });
    }

    /** Enabeles Pepe's idle interval. */
    private enablePepeIdleInterval(): void {
        const pepe: Character = this.drawnObjects[this.drawnObjects.length - 1] as Character;
        pepe.startIdleCounterInterval();
    }
    // #endregion

    /** Starts the game. */
    startGame(): void {
        Game.run = true;
        IntervalHub.start(this.update, 1000 / MovableObject.fps);
    }
    // #endregion
}