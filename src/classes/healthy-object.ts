import { TouchingObject } from "./touching-object.js";

export abstract class HealthyObject extends TouchingObject {
    static inuaralbleTime: number = 700;
    private _health: number = 100;
    private _dieing: boolean = false;
    private _dead: boolean = false;
    private _injured: boolean = false;
    private hitProcess: boolean = false;
    onInjure?: (health: number) => void;
    onDead?: () => void;

    constructor(x:number, y: number, width:number, height:number) {
        super(x, y, width, height);
    }

    act(): void {
        this.falling();
    }

    get dieing(): boolean { return this._dieing; }

    get injdured(): boolean { return this._injured; }

    get dead(): boolean { return this._dead; }

    get health(): number {return this._health; }

    get protected(): boolean { return this.hitProcess; }

    /**
     * Will be excueted, if an healthy object has injured.
     * @param damage - 0..100 - percent of health, which injure coast.
     */
    injure(damage: number) {
        if (!this.hitProcess && !this.dead && !this._injured && damage > 0 && damage <= 100) {
            this._injured = true;
            this._health -= damage;
            this.onInjure?.(this.health);
            if(this.health <= 0) this._dieing = true;
            setTimeout(() => {this._injured = false}, HealthyObject.inuaralbleTime);
        }
    }

    /** Will be executed, if dieing-animation completly played. */
    protected dieingAnimationPlayed() {
        if(this.dieing) {
            this._dieing = false;
            this._dead = true;
            this.onDead?.();
        }
    }

    /** Will be executed character for enemy. */
    hit(): void {
        this.hitProcess = true;
        setTimeout(() => {this.hitProcess = false}, 700)
    }
}