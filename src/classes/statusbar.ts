import { AnimatedObject } from "./animated-object.js";

/** It is used for representation of a status bar. */
export abstract class Statusbar extends AnimatedObject {
    private _value: number;
    private visible: boolean;
    private _name: string;

    /**
     * Creates a status bar.
     * @param x - X-Pos of bar.
     * @param y - Y-Pos of bar.
     * @param name - Name of animation.
     * @param value - Startvalue of bar.
     * @param visible - Viesibilty: Default true;
     */
    constructor(x: number, y: number, name: string, value: number, visible: boolean = true) {
        super(x, y, 300, 80);
        this._name = name;
        this._value = value;
        this.visible = visible;
    }

    // #region Methods
    get name(): string { return this._name; }

    get value(): number { return this._value; }

    set value(v: number) {
        this._value = v >= 0 ? ( v <= 100 ? v : 100) : 0;
        this.updateProcesss();
    }

    get view(): boolean { return this.visible; }

    /** Updates schema of bar. */
    private updateProcesss() {
        const index = this.value <= 0 ? 0 : (this.value < 20 ? 1 : Math.floor(this.value / 20));
        this.img = this.imgs[this.name][index];
    }

    /** Activates vilibility. */
    setVisible(): void {
        this.visible = true;
    }
    // #endregion
}