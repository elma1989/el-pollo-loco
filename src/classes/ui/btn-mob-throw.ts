import { ImgHub } from "../img-hub.js";
import { MobileControlButton } from "./btn-mobile-ctrl.js";

export class MobileThrowButton extends MobileControlButton {
    constructor() {
        super('btn-mob-throw');
        this.paths = {
            on: ImgHub.BUTTON.bottle.on,
            off: ImgHub.BUTTON.bottle.off
        }
    }

    async load(): Promise<void> {
        await this.loadAllIcons();
        this.showOff();
    }
}