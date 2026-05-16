import { ImgHub } from "../img-hub.js";
import { MobileControlButton } from "./btn-mobile-ctrl.js";

export class MobileRightButton extends MobileControlButton {
    constructor() {
        super('btn-mob-right');
        this.paths = {
            on: ImgHub.BUTTON.right.on,
            off: ImgHub.BUTTON.right.off
        }
    }

    async load(): Promise<void> {
        await this.loadAllIcons();
        this.showOff();
    }
}