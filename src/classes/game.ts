import { DisplayDetector } from "./display-detactor.js";
import { KeyListener } from "./key-listener.js";
import { Level } from "./models/level.js";
import { SoundManager } from "./sound/snd-mgr.js";
import { soundData } from "./sound/sound-data.js";
import { UI } from "./ui/ui.js";

type OverlayType = 'control' | 'impressum';
type SoundControlType = 'music' | 'sfx';
type MobControlType = 'left' | 'right' | 'jump' | 'throw';

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
        this.handleMobileControl();
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
                if(this.display.isMobile) this.showMobilControl();
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
        this.handleLandscapeEvents();
        this.handleMobileEvents();
        this.display.emitStartEvent();
    }

    private handleLandscapeEvents() {
        this.display.onSwitchPortrait = () => {
            this.ui.overlays.landscape.open();
            this.hideTextButtons();
            this.hideMobileControl();
            this.hideCanvas();
        }
        this.display.onSwitchLandscape = () => {
            this.ui.overlays.landscape.close();
            this.showCanvas();
            if (!Game.run) this.showTextButtons();
            else if (this.display.isMobile) this.showMobilControl();
        }
    }

    private handleMobileEvents(): void {
        this.display.onSwitchMobile = () => {
            if (Game.run) this.showMobilControl();
        }
        this.display.onSwitchDesktop = () => this.hideMobileControl();
    }

    private handleMobileControl(): void {
        const btnTypes: MobControlType[] = ['left', 'right', 'jump', 'throw'];
        btnTypes.forEach(type => {
            this.handleMobEnter(type);
            this.handleMobLeave(type);
        });
    }

    private handleMobEnter(ctrl: MobControlType) {
        const btn = this.ui.btns.icon.mobileControl[ctrl];
        btn.onPointerDown = () => {
            btn.showOn();
            switch(ctrl) {
                case 'left':
                    KeyListener.KEY.left = true;
                    break;
                case 'right':
                    KeyListener.KEY.right = true;
                    break;
                case 'jump':
                    KeyListener.KEY.space = true;
                    break;
                case 'throw':
                    KeyListener.KEY.ctrl = true;
            }
        }
    }

    private handleMobLeave(ctrl: MobControlType) {
        const btn = this.ui.btns.icon.mobileControl[ctrl]
        btn.onPointerUp = () => {
            btn.showOff();
            switch(ctrl) {
                case 'left':
                    KeyListener.KEY.left = false;
                    break;
                case 'right':
                    KeyListener.KEY.right = false;
                    break;
                case 'jump':
                    KeyListener.KEY.space = false;
                    break;
                case 'throw':
                    KeyListener.KEY.ctrl = false;
            }
        }
    }

    private handleEndGame(): void {
        this.level.onEndGame = async () => {
            SoundManager.stopMusic();
            this.disableRunButton();
            this.hideMobileControl();
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

    private showCanvas(): void {
        const canvas = Game.canvas;
        if (canvas) canvas.classList.remove('d-none');
    }

    private hideCanvas(): void {
        const canvas = Game.canvas;
        if (canvas) canvas.classList.add('d-none');
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

    private showMobilControl() {
        Object.values(this.ui.btns.icon.mobileControl).forEach(btn => btn.show());
    }

    private hideMobileControl() {
        Object.values(this.ui.btns.icon.mobileControl).forEach(btn => btn.hide());
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