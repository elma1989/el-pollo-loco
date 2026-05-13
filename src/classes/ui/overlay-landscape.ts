import { ImgHub } from "../img-hub.js";
import { Overlay } from "../overlay.js";
import { Template } from "../template.js";

export class SwitchLandscape extends Overlay {
    constructor() {
        super('switch-landscape');
        this.create();
    }

    create(): void {
        if (this.element) this.element.innerHTML = Template.overlay('landscape', '', false);
        this.createImage();
    }

    /** Inserts the smartphone image. */
    createImage(): void {
        const parent = document.getElementById('overlay-landscape-body');
        const img = new Image();
        if (parent) {
            img.src = ImgHub.SCREEN.landscape;
            img.id = 'overlay-landscape-img'
            parent.appendChild(img);
        }
    }
}