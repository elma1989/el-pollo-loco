import { ImgHub } from "../img-hub.js";
import { SoundManager } from "../sound/snd-mgr.js";
import { IconButton } from "./icon-button.js";

export class SfxButton extends IconButton {
    constructor() {
        super('btn-sfx');
        this.paths = {
            on: ImgHub.BUTTON.sfx.on,
            off: ImgHub.BUTTON.sfx.off
        }
    }

    async load(): Promise<void> {
        await this.loadAllIcons();
        this.icon = SoundManager.soundEnabled ? 'on' : 'off';
    }
}