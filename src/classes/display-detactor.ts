import { Game } from "./game.js";

export class DisplayDetector {
    private mobile: boolean;
    private landscape: boolean;
    onSwitchMobile?: () => void;
    onSwitchDesktop?: () => void;
    onSwitchLandscape?: () => void;
    onSwitchPortrait?: () => void;

    constructor() {
        this.mobile = this.isDisplayMobile();
        this.landscape = this.isDisplayLandscape();
        this.addReziseEvent();
    }

    // #region Methods

    get isMobile(): boolean { return this.mobile; }

    get isLandscape(): boolean { return this.landscape; }

    /**
     * Checks, if display is mobile
     * @returns true, if display is mobile
     */
    private isDisplayMobile(): boolean {
        const canvas = Game.canvas;
        if (!canvas) return false;
        return window.innerWidth <= canvas.width;
    }

    /**
     * Checks, if display is landscape.
     * @returns true, if display is mobile.
     */
    private isDisplayLandscape(): boolean {
        return window.innerWidth > window.innerHeight;
    }

    /** Emits events from start-values. */
    emitStartEvent(): void {
        if (this.isMobile) this.onSwitchMobile?.();
        else this.onSwitchDesktop?.();
        if (this.isLandscape) this.onSwitchLandscape?.();
        else this.onSwitchPortrait?.();
    }

    /** Checks display after resize. */
    private checkDisplay(): void {
        if (!this.isMobile && this.isDisplayMobile()) {
            this.mobile = true;
            this.onSwitchMobile?.();
        }
        if (this.isMobile && !this.isDisplayMobile()) {
            this.mobile = false;
            this.onSwitchDesktop?.();
        }
        if (!this.isLandscape && this.isDisplayLandscape()) {
            this.landscape = true;
            this.onSwitchLandscape?.();
        }
        if (this.isLandscape && !this.isDisplayLandscape()) {
            this.landscape = false;
            this.onSwitchPortrait?.();
        }
    }

    private debounce(fn: () => void, delay: number): () => void {
        let timeout: undefined | number;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fn();
            }, delay);
        }
    }

    private addReziseEvent(): void  {
        window.addEventListener(
            'resize',
            this.debounce(() => this.checkDisplay(), 500)
        );
    }
    // #endregion
}