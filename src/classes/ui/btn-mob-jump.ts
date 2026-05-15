import { ImgHub } from "../img-hub.js";
import { MobileControlButton } from "./btn-mobile-ctrl.js";

export class MobileJumpButton extends MobileControlButton {
    constructor() {
        super('btn-mob-jump');
        this.paths = {
            on: ImgHub.BUTTON.up.on,
            off: ImgHub.BUTTON.up.off
        }
    }

    async load(): Promise<void> {
        await this.loadAllIcons();
        this.showOff();
    }
}