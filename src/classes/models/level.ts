import { AnimatedObject } from "../animated-object.js";
import { Chicken } from "../chicken.js";
import { BaseState, Collectable } from "../collectable.js";
import { DrawableObject } from "../drawable-object.js";
import { Game } from "../game.js";
import { HealthyObject } from "../healthy-object.js";
import { IntervalHub } from "../interval-hub.js";
import { MovableObject } from "../movable-object.js";
import { TouchingObject } from "../touching-object.js";
import { Character } from "./character.js";
import { ChickenM } from "./chicken-m.js";
import { ChickenS } from "./chicken-s.js";
import { Clouds } from "./clouds.js";
import { Coin } from "./coin.js";
import { Layer0 } from "./layer0.js";
import { Layer1 } from "./layer1.js";
import { Layer2 } from "./layer2.js";
import { Sky } from "./sky.js";

export class Level {
    private drawnObjects: DrawableObject[] = [];
    static cameraX: number = 0;
    private character: Character | null = null;
    private chickens: Chicken[] = [];
    private collectables: Collectable<BaseState>[] = [];
    private coins: number = 0;

    constructor() {
        this.createObjects();
    }

    // #region Methods
    /** Creates all objects. */
    // #region Loading
    private createObjects(): void {
        this.character = new Character();
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
            new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), 
            this.character
        ]

        this.sepparateLists();
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
                if (drawing instanceof TouchingObject) drawing.calcRealRect();
                this.drawObject(drawing);
            });
            Game.ctx.translate(-Level.cameraX, 0);

            const self = this;
            requestAnimationFrame(() => self.drawAll());
        }
    }

    /**
     * Draws a single object.
     * @param drawing - Object to draw.
     */
    private drawObject(drawing: DrawableObject) {
        if(this.isPepeFacingLeft(drawing)) this.mirrorHorizontally(drawing)
        else {
            if(drawing instanceof HealthyObject) {
                if(!drawing.dead) drawing.draw();
            }
            else if (drawing instanceof Collectable) {
                if(drawing.state == 'idle') drawing.draw();
            }
            else drawing.draw();
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
        if (dO instanceof HealthyObject && !dO.dead && ctx) {
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

    // #region Collision
    /** Manages any collisions with character. */
    handleCharacterTouching(): void  {
        const character = this.character;
        if (!character) return;
        this.handleChickenCollision(character);
        this.handleCollectableCollision(character);
    }

    /**
     * Manages collisions between characte and chickens.
     * @param character - Instance of character
     */
    private handleChickenCollision(character: Character): void {
        this.chickens.forEach(chicken => {
            if (character.isTouching(chicken)) {
                if (character.wasFalling) {
                    character.hit();
                    chicken.injure(100);
                    character.resetFalling();
                } else {
                    character.injure(33);
                }
            } 
        });
    }

    /**
     * Mangages collision between Character and Collectables.
     * @param character - Instance of character
     */
    private handleCollectableCollision(character: Character): void {
        this.collectables.forEach(collectable => {
            if(character.isTouching(collectable)) {
                if (collectable instanceof Coin) {
                    this.coins += collectable.value;
                    this.remove(collectable);
                }
            }
        });
    }
    // #endregion

    // #region Objectmangement
    /**Removes an object from the world. */
    private remove(object: DrawableObject) {
        const index = this.drawnObjects.indexOf(object);
        if (index != -1) {
            this.drawnObjects.splice(index, 1);
            this.sepparateLists();
        }
    }

    /** Seppartes main object list to diffrent lists. */
    private sepparateLists(): void {
        this.chickens = this.drawnObjects.filter(dO => dO instanceof Chicken);
        this.collectables = this.drawnObjects.filter(dO => dO instanceof Collectable);
    }
    // #endregion

    /** Starts the game. */
    startGame(): void {
        Game.run = true;
        IntervalHub.start(this.update, 1000 / MovableObject.fps);
        IntervalHub.start(this.handleCharacterTouching.bind(this), 1000 / 100);
    }
    // #endregion
}