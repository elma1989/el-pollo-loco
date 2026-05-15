import { ImgHub } from "../img-hub.js";
import { MobileControlButton } from "./btn-mobile-ctrl.js";

export class MobileLeftButton extends MobileControlButton {
    constructor() {
        super('btn-mob-left');
        this.paths = {
            on: ImgHub.BUTTON.left.on,
            off: ImgHub.BUTTON.left.off
        }
    }
}