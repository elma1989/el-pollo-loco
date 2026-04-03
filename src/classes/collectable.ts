import { TouchingObject } from "./touching-object.js";

export type BaseState = 'idle' | 'collected' | 'thrown';

/** Things to collect. */
export abstract class Collectable<TState extends BaseState> extends TouchingObject {
    static offset: number = 100;
    private _state: TState = 'idle' as TState;
    private _value: number;

    /**
     * Creates a coolectable obejct
     * @param y - Y-Pos of object.
     * @param width - Width of object.
     * @param height - Height of object.
     * @param value - Value of object.
     */
    constructor(y:number, width:number, height:number, value:number) {
        super(Collectable.xPos(), y, width, height);
        this._value = value;
        Collectable.next();
    }

    get state(): TState { return this._state; }

    set state(state: TState) { this._state = state; }

    get value(): number { return this._value; }

    // #rregion Methods
    /**
     * Gerates a random x-pos.
     * @returns Rendom x-pos.
     */
    static xPos(): number {
        return Math.random() * 200 + Collectable.offset;
    }

    /** Increases collecables' offset after create */
    static next(): void {
        Collectable.offset += 100;
    }

    /** Will be execurted, if this object was been collected. */
    collect(): void {
        this._state = 'collected' as TState
    }
    // #endregion
}