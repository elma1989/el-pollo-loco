import { TouchingObject } from "./touching-object.js";

type HealthState = 'idle' | 'longidle' | 'walk' | 'alert' | 'attack' | 'injured' | 'dieing';

export abstract class HealthyObject extends TouchingObject {
    static inuaralbleTime: number = 700;
    private _health: number = 100;
    private _state: HealthState = 'idle';
    onInjure?: (health: number) => void;
    onDead?: () => void;

    constructor(x:number, y: number, width:number, height:number) {
        super(x, y, width, height);
    }
    
    get state(): HealthState { return this._state; }

    set state(state: HealthState) {this._state = state; }

    get health(): number {return this._health; }

    get dead(): boolean { return this.state == 'dieing'; }

    act(): void {
        this.falling();
        if (this.state == 'dieing') {
            if (this.imgIndex == this.imgs['dead'].length) {
                setTimeout(() => this.onDead?.(), 700);
            }
        } else this.healthyAct();
    }

    /** Act-method for objects are alive. */
    protected abstract healthyAct(): void;

    /**
     * Will be excueted, if an healthy object has injured.
     * @param damage - 0..100 - percent of health, which injure coast.
     */
    injure(damage: number) {
        if (this.state != 'attack' && this.state != 'injured' && damage > 0 && damage <= 100) {
            this._health -= damage;
            if(this.health <= 0) {
                this.state = 'dieing'
            } else {
                this.state = 'injured';
                this.onInjure?.(this.health);
                setTimeout(() => {this.state = 'walk'}, HealthyObject.inuaralbleTime);
            }
        }
    }

    /** It's used for attack. */
    hit(): void {
        this.state = 'attack';
    }

    /** Brings a creature to life. */
    bringToLife(): void {
        this.state = 'walk';
    }
}