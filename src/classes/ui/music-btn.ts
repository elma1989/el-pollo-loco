import { ImgHub } from "../img-hub.js";
import { SoundManager } from "../sound/snd-mgr.js";
import { IconButton } from "./icon-button.js";

export class MusicButton extends IconButton {
    constructor() {
        super('btn-music');
        this.paths = {
            on: ImgHub.BUTTON.music.on,
            off: ImgHub.BUTTON.music.off
        }
    }

    async load(): Promise<void> {
        await this.loadAllIcons();
        this.icon = SoundManager.musicEnabled ? 'on': 'off';
    }
}