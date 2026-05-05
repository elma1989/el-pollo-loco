import { KeyListener } from "./key-listener.js";
import { Level } from "./models/level.js";
import { SoundPathManager } from "./sound/snd-path-mgr.js";
import { UI } from "./ui/ui.js";

type OverlayType = 'control' | 'impressum';

export class Game {

    static run: boolean = false;
    loaded: boolean = false;
    level: Level;
    ui: UI;
    
    constructor() {
        new KeyListener();
        this.level = new Level();
        this.ui = new UI();
    }

    // #region Methods
    async init(): Promise<void> {
        SoundPathManager.init();
        this.handlePointerEvents();
        this.handleEndGame();
        await this.level.loadObjects();
        this.level.drawAll();   
        this.enableRunButton();
    }

    static get canvas(): HTMLCanvasElement | null {
        return document.querySelector('canvas');
    }

    static get ctx(): CanvasRenderingContext2D | null {
        const canvas: HTMLCanvasElement | null = Game.canvas;
        return canvas ? canvas.getContext('2d') : null;
    }

    // #region Events
    private handlePointerEvents(): void {
        this.handleRunButton();
        this.handleOverlayButtons();
    }

    private handleRunButton(): void {
        this.ui.btns.text.run.onPointerDown = () => {
            if (this.loaded) {
                this.level.removeTitleScreen();
                this.hideTextButtons();
                this.level.startGame();
            }
        }
    }

    private handleOverlayButtons(): void {
        this.handleOverlayButton('control');
        this.handleOverlayButton('impressum');
        this.handleOverlayCloseButton('control');
        this.handleOverlayCloseButton('impressum');
    }

    private handleOverlayButton(type: OverlayType): void {
        this.ui.btns.text[type].onPointerDown = () => {
            this.ui.overlays[type].open();
        }
    }

    private handleOverlayCloseButton(type: OverlayType): void {
        this.ui.btns.close[type].onPointerDown = () => {
            this.ui.overlays[type].close();
        }
    }

    private handleEndGame(): void {
        this.level.onEndGame = async () => {
            this.disableRunButton();
            this.showTextButtons();
            this.level = new Level();
            this.init();
        }
    }
    // #endregion

    // #region UI - Control
    private enableRunButton(): void {
        this.ui.btns.text.run.disabled = false
        this.ui.btns.text.run.description = 'Start';
        this.loaded = true;
    }

    private disableRunButton(): void {
        this.ui.btns.text.run.disabled = true;
        this.ui.btns.text.run.description = 'LOADING';
        this.loaded = false;
    }

    private showTextButtons(): void {
        Object.keys(this.ui.btns.text).forEach((key) => this.ui.btns.text[key].visible = true)
    }

    private hideTextButtons(): void {
        Object.keys(this.ui.btns.text).forEach((key) => this.ui.btns.text[key].visible = false)
    }
    // #endregion
    // #endregion
}