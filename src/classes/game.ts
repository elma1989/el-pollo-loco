import { DisplayDetector } from "./display-detactor.js";
import { KeyListener } from "./key-listener.js";
import { Level } from "./models/level.js";
import { SoundManager } from "./sound/snd-mgr.js";
import { soundData } from "./sound/sound-data.js";
import { UI } from "./ui/ui.js";

type OverlayType = 'control' | 'impressum';
type SoundControlType = 'music' | 'sfx';

export class Game {

    static run: boolean = false;
    loaded: boolean = false;
    level: Level;
    ui: UI;
    display: DisplayDetector;
    
    constructor() {
        new KeyListener();
        this.level = new Level();
        this.ui = new UI();
        this.display = new DisplayDetector();
    }

    // #region Methods
    async init(): Promise<void> {
        SoundManager.init();
        this.handlePointerEvents();
        this.handleDisplayEvents();
        this.handleEndGame();
        await this.level.loadObjects();
        this.level.drawAll();
        await SoundManager.preLoadAll(soundData);
        await this.loadIconButtons();
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
        this.ui.btns.text.run.onPointerDown = async () => {
            if (this.loaded) {
                SoundManager.createContext();
                await SoundManager.decodeAll();
                this.level.removeTitleScreen();
                this.hideTextButtons();
                this.showSoundButtons();
                SoundManager.play('game/start');
                SoundManager.playMusic();
                this.level.startGame();
            }
        }
    }

    private handleOverlayButtons(): void {
        this.handleOverlayButton('control');
        this.handleOverlayButton('impressum');
        this.handleOverlayCloseButton('control');
        this.handleOverlayCloseButton('impressum');
        this.handleSoundControlButton('music');
        this.handleSoundControlButton('sfx');
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

    private handleSoundControlButton(control: SoundControlType) {
        this.ui.btns.icon.sound[control].onPointerDown = () => {
            this.togleSound(control);
        }
    }

    private handleDisplayEvents() {
        this.display.onSwitchPortrait = () => {
            this.ui.overlays.landscape.open();
            this.hideTextButtons();
        }
        this.display.onSwitchLandscape = () => {
            this.ui.overlays.landscape.close();
            if (!Game.run) this.showTextButtons();
        }
        this.display.emitStartEvent();
    }

    private handleEndGame(): void {
        this.level.onEndGame = async () => {
            SoundManager.stopMusic();
            this.disableRunButton();
            this.hideSoundButtons();
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


    private showSoundButtons() {
        Object.values(this.ui.btns.icon.sound).forEach(btn => btn.show());
    }

    private hideSoundButtons() {
        Object.values(this.ui.btns.icon.sound).forEach(btn => btn.hide());
    }

    private async loadIconButtons(): Promise<void> {
        await Promise.all(Object.values(this.ui.btns.icon).map(group => 
            Object.values(group).map(btn => btn.load())));
    }
    // #endregion

    private togleSound(control: SoundControlType) {
        const music = this.ui.btns.icon.sound.music;
        const sfx = this.ui.btns.icon.sound.sfx;
        if (control == 'music') SoundManager.toggleMusic();
        else SoundManager.toggleSound();
        if (SoundManager.musicEnabled) music.showOn();
        else music.showOff();
        if (SoundManager.soundEnabled) sfx.showOn();
        else sfx.showOff();
    }
    // #endregion
}