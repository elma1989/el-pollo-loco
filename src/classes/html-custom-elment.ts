/** References to HTML-Elements. */
export abstract class HTMLCustomElement {
    private _element: HTMLElement | null = null;
    private _visible: boolean = false;

    /**
     * Creates a reference to a HTMLElement
     * @param id - Id of HTMLElement
     * @param visible - Visiblitiy of Element, Default: true
     */
    constructor(id: string, visible: boolean = true) {
        this.element = id;
        this.visible = visible;
    }

    get element(): HTMLElement | null { return this._element; }

    set element(id: string) {
        this._element = document.getElementById(id);
    }

    get visible(): boolean { return this._visible; }

    set visible(state: boolean) {
        if (this.element) {
            if (state) this.element.classList.remove('d-none');
            else this._element?.classList.add('d-none');
            this._visible = state;
        } else this._visible = false;
    }
}