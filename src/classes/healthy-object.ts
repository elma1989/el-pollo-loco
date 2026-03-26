import { GravitalObject } from "./gravital-object.js";
import { TouchingObject } from "./touching-object.js";

export abstract class HealthyObject extends TouchingObject {
    static inuaralbleTime: number = 700;
    private health: number = 100;
    private _dieing: boolean = false;
    private _dead: boolean = false;
    private _injured: boolean = false;

    constructor(x:number, width:number, height:number) {
        super(x, GravitalObject.toGround(height), width, height);
    }

    act(): void {
        this.falling();
    }

    get dieing(): boolean { return this._dieing; }

    get injdured(): boolean { return this._injured; }

    get dead(): boolean { return this._dead; }

    /**
     * Will be excueted, if an healthy object has injured.
     * @param damage - 0..100 - percent of health, which injure coast.
     */
    injure(damage: number) {
        if (damage > 0 && damage <= 100) {
            this._injured = true;
            this.health -= damage;
            if(this.health <= 0) this._dieing = true;
            setTimeout(() => {this._injured = false}, HealthyObject.inuaralbleTime);
        }
    }

    /** Will be executed, if dieing-animation completly played. */
    protected dieingAnimationPlayed() {
        if(this.dieing) {
            this._dieing = false;
            this._dead = true;
        }
    }
}