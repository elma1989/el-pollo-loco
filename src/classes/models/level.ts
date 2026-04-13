import { AnimatedObject } from "../animated-object.js";
import { Chicken } from "../chicken.js";
import { BaseState, Collectable } from "../collectable.js";
import { DrawableObject } from "../drawable-object.js";
import { Game } from "../game.js";
import { HealthyObject } from "../healthy-object.js";
import { IntervalHub } from "../interval-hub.js";
import { MovableObject } from "../movable-object.js";
import { Statusbar } from "../statusbar.js";
import { TouchingObject } from "../touching-object.js";
import { BossHealthbar } from "./boss-healthbar.js";
import { Boss } from "./boss.js";
import { Bottle } from "./bottle.js";
import { Character } from "./character.js";
import { CharacterHealthbar } from "./characterhealthbar.js";
import { ChickenM } from "./chicken-m.js";
import { ChickenS } from "./chicken-s.js";
import { Clouds } from "./clouds.js";
import { Coin } from "./coin.js";
import { Layer0 } from "./layer0.js";
import { Layer1 } from "./layer1.js";
import { Layer2 } from "./layer2.js";
import { Sky } from "./sky.js";
import { Splash } from "./splash.js";

export class Level {
    private drawnObjects: DrawableObject[] = [];
    static cameraX: number = 0;
    private character: Character = new Character();
    private boss: Boss = new Boss();
    private chickens: Chicken[] = [];
    private creatures: HealthyObject[] = [];
    private collectables: Collectable<BaseState>[] = [];
    private bottles: Bottle[] = [];
    private splashes: Splash[] = [];
    private statusbars: Statusbar[] = [
        new CharacterHealthbar(), new BossHealthbar()
    ];
    private coins: number = 0;

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
            new Bottle(), new Coin(), new Bottle(),
            new Bottle(), new Coin(), new Bottle(),
            new Bottle(), new Coin(), new Bottle(),
            new Bottle(), new Coin(), new Bottle(),
            new Splash(), new Splash(), new Splash(), new Splash(), 
            new Splash(), new Splash(), new Splash(), new Splash(), 
            this.boss,
            this.character
        ]
        this.drawnObjects.push(...this.statusbars);

        this.sepparateLists();
        this.assignSplashToBottle();
        this.handleEvents();
    }

    /** Loads all drawn objects in cache. */
    async loadObjects(): Promise<void> {
        await Promise.all(
            this.drawnObjects.map(async (object) => 
                await object.load()
            )
        );
        this.animateAll();
        this.character.startIdleCounterInterval();
        this.drawAll();
    }
    // #endregion
    
    // #region Events
    /** Runs the workflow for events from objects. */
    private handleEvents(): void {
        this.handleCharatermovment();
        this.handleInjureEvents();
    }

    /** Handles all events with injury. */
    private handleInjureEvents() {
        this.character.onInjure = (health) => {
            this.statusbars[0].value = health;
        }

        this.boss.onInjure = (health) => {
            this.statusbars[1].value = health;
        }
    }
    /** Handles movment of character. */
    private handleCharatermovment() {
        const canvas = Game.canvas;
        if (!canvas) return;

        this.character.onRunOut = () => {
            this.boss.activate();
            this.statusbars[1].setVisible();
        }

        this.character.onMove = (x) => {
            if (x <= canvas.width) {
                this.statusbars[0].x = x;
                this.statusbars[1].x = x + canvas.width - Statusbar.statusWidth;
            }
        }
    }

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
            if (drawing instanceof Collectable) {
                if(drawing.state != 'collected') drawing.draw();
            }
            else if (drawing instanceof Splash) {
                if(drawing.active) drawing.draw();
            } else if (drawing instanceof Statusbar) {
                if(drawing.view) drawing.draw();
            } else drawing.draw();
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
    // #endregion

    // #region Collision
    /** Manages any collisions with character. */
    private handleCharacterTouching(): void  {
        const character = this.character;
        if (!character) return;
        this.handleChickenCollision();
        this.handleBossCollision();
        this.handleCollectableCollision();
    }

    /** Manages collisions between characte and chickens. */
    private handleChickenCollision(): void {
        this.chickens.forEach(chicken => {
            if (this.character.isTouching(chicken)) {
                if (this.character.wasFalling) {
                    this.character.hit();
                    chicken.injure(100);
                    this.character.resetFalling();
                } else {
                    this.character.injure(33);
                }
            } 
        });
    }

    /** Handles collision between Charcter and Boss. */
    private handleBossCollision() {
        if (this.character.isTouching(this.boss)) this.character.injure(33);
        this.bottles.forEach(bottle => {
            if (this.boss.isTouching(bottle) && bottle.state == 'thrown') {
                this.boss.injure(20);
                bottle.destroy();
            }
        })
    }

    /**
     * Mangages collision between Character and Collectables.
     * @param character - Instance of character
     */
    private handleCollectableCollision(): void {
        this.collectables.forEach(collectable => {
            if(this.character.isTouching(collectable)) {
                this.character.collect(collectable);
            }
        });
    }

    /** Manages collision of bottles. */
    private handleBottleCollision(): void {
        this.bottles.forEach(bottle => {
            if (bottle.state == 'thrown') {
                let touchedEnemy = false;
                this.chickens.forEach(chicken => {
                    if (bottle.isTouching(chicken)) {
                        chicken.injure(100);
                        touchedEnemy = true;
                    }
                }) 
                if(bottle.isOnGround() || touchedEnemy) {
                    bottle.destroy();
                    this.remove(bottle);
                }
            }
        })
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
        this.creatures = this.drawnObjects.filter(dO => dO instanceof HealthyObject);
        this.chickens = this.creatures.filter(creature => creature instanceof Chicken);
        this.collectables = this.drawnObjects.filter(dO => dO instanceof Collectable);
        this.bottles = this.collectables.filter(collect => collect instanceof Bottle);
        this.splashes = this.drawnObjects.filter(dO => dO instanceof Splash);
    }

    /** Assigns a splash for each bottle. */
    private assignSplashToBottle(): void {
        this.bottles.forEach((bottle, i) => {
            bottle.addSplash(this.splashes[i]);
        });
    }

    /** Removes complete viewed splashes. */
    private removeFullSplashes(): void {
        this.splashes.forEach(splash => {
            if(splash.viewed) this.remove(splash);
        });
    }

    /** Removes creatures, which already died. */
    private removeDeaths(): void {
        this.creatures.forEach(creature => {
            if (creature.dead) this.remove(creature)
        });
    }
    // #endregion

    // #region Game-Loop.
    /** Includes all methods, which should be executeed quickly. */
    fastLoop(): void {
        this.handleCharacterTouching();
        this.handleBottleCollision();
    }

    /** Includes all method, which can be executed slowly. */
    slowLoop(): void {
        this.removeFullSplashes();
        this.removeDeaths();
    }
    /** Starts the game. */
    startGame(): void {
        Game.run = true;
        IntervalHub.start(this.update, 1000 / MovableObject.fps);
        IntervalHub.start(this.fastLoop.bind(this), 1000 / 100);
        IntervalHub.start(this.slowLoop.bind(this), 1000 / 4);
    }
    // #endregion
    // #endregion
}