import { HTMLCustomElement } from "./html-custom-elment.js";

/** Represents a button form UI. */
export abstract class Button extends HTMLCustomElement {
    private _disabled: boolean = false;
    onPointerDown?: () => void;

    /**
     * Creates a Button-Object.
     * @param id - Id of buttton.
     * @param visible - Visibility of button. Default: true.
     * @param disabled - Disables button. Default: false.
     */
    constructor(id: string, visible: boolean = true, disabled: boolean = false) {
        super(id, visible);
        this.disabled = disabled;
        this.addPointerDownEvent();
    }

    get btnElement(): HTMLButtonElement | null {
        return this.element ? this.element as HTMLButtonElement : null;
    }

    get disabled(): boolean { return this._disabled; }

    set disabled(state: boolean) {
        if (this.btnElement) this.btnElement.disabled = state;
        this._disabled = state;
    }

    /** Adds pointer-enter-event-listener for this button. */
    private addPointerDownEvent(): void {
        if (this.btnElement) {
            this.btnElement.addEventListener('pointerdown', () => {
                this.onPointerDown?.()
            });
        }
    }
}