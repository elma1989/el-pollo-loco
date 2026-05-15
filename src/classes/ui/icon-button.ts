import { Button } from "../button.js";

/** A button, which has an icon. */
export abstract class IconButton extends Button {

    protected paths: Record<string, string> = {};
    private _icons: {
        on: HTMLImageElement,
        off: HTMLImageElement
    } = {
        on: new Image(),
        off: new Image()
    }
    private currentIcon: string = ''
    
    /**
     * Creates an icon-button.
     * @param id - Id of button.
     * @param visible - Visibility (defaul: false)
     */
    constructor (id: string, visible: boolean = false) {
        super(id, visible);
    }

    get icons(): Record<string, HTMLImageElement> { return this._icons };

    get icon(): string { return this.currentIcon; }

    set icon(name: string) {
        const icon = this.icons[name];
        if (icon && this.element) {
            this.element.innerHTML = '';
            this.element.appendChild(icon);
            this.currentIcon = name;
        }
    }

    abstract load(): Promise<void>;

    // #region Load / Decode
    /**
     * Loads an icon from url.
     * @param url - Url to load.
     * @returns HTMLElement form image if url found
     */
    private async loadIcon(name: 'on' | 'off', url: string): Promise<void> {
        try {
            const img = new Image();
            img.src = url;
            await img.decode();
            this._icons[name] = img
        } catch {
            throw new Error(`Image "${url} could not load`);
        }
    }

    /** Loads all Icons form object. */
    protected async loadAllIcons(): Promise<void> {
        await Promise.all(Object.entries(this.paths).map(([name, url]) => {
            return this.loadIcon(name == 'on' ? 'on' : 'off', url);
        }));
    }

    /** Shows icon on on-state. */
    showOn(): void {
        this.icon = 'on';
    }

    /** Show icon on off-state. */
    showOff(): void {
        this.icon = 'off';
    }
    // #endregion
}