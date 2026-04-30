import { HTMLCustomElement } from "./html-custom-elment.js";

export abstract class Overlay extends HTMLCustomElement {

    /**
     * Creates an Ovelay.
     * @param id - Id of element.
     */
    constructor(id: string) {
        super(id, false);
        this.transparent = true;
    }

    get transparent(): boolean { return this.element ? this.element.classList.contains('transparent') : false }

    set transparent(state: boolean) {
        if (this.element) this.element.classList.toggle('transparent', state);
    }

    /** Opens the overlay. */
    open(): void {
        this.visible = true;
        this.transparent = true;

        requestAnimationFrame(() => this.transparent = false );
    }

    /** Closes the overlay. */
    close(): Promise<void> {
        return new Promise(resolve => {
            const el = this.element;
            if (!el) return;
            let done: boolean = false;

            const finish = () => {
                if (done) return;
                done = true;
                el.removeEventListener('transitionend', onEnd);
                this.visible = false;
                resolve();
            }

            const onEnd = (e: TransitionEvent) => {
                if (e.target == el) finish()
            }

            el.addEventListener('transitionend', onEnd);
            setTimeout(finish, 400);
            this.transparent = true;
        });
    }

    abstract create(): void
}