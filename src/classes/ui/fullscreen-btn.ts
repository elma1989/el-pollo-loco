import { ImgHub } from "../img-hub.js";
import { IconButton } from "./icon-button.js";

export class FullscreenButton extends IconButton {
    constructor() {
        super('btn-fullscreen', true);
        this.paths = {
            on: ImgHub.BUTTON.full.on,
            off: ImgHub.BUTTON.full.off
        }
    }

}