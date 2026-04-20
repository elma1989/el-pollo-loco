import { TouchingObject } from "./touching-object.js";

type HealthState = 'idle' | 'longidle' | 'walk' | 'alert' | 'attack' | 'injured' | 'dieing';

export abstract class HealthyObject extends TouchingObject {
    static inuaralbleTime: number = 700;
    private _health: number = 100;
    public state: HealthState = 'idle';
    onInjure?: (health: number) => void;
    onDead?: () => void;

    constructor(x:number, y: number, width:number, height:number) {
        super(x, y, width, height);
    }
    
    get health(): number {return this._health; }

    act(): void {
        this.falling();
        if (this.state == 'dieing') {
            if (this.imgIndex == this.imgs['dead'].length) this.onDead?.();
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
            this.state = 'injured';
            this._health -= damage;
            this.onInjure?.(this.health);
            if(this.health <= 0) {
                this.state = 'dieing'
            } else {
                setTimeout(() => {this.state = 'walk'}, HealthyObject.inuaralbleTime);
            }
        }
    }

    /** Brings a creature to life. */
    bringToLife(): void {
        this.state = 'walk';
    }
}