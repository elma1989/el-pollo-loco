import { Overlay } from "../overlay.js";
import { Template } from "../template.js";

export class Impressum extends Overlay {
    constructor() {
        super('impressum');
        this.create();
    }

    private addImpressumContent(): void {
        const body = document.getElementById('overlay-impressum-body');
        if (body) body.innerHTML = Template.impressum();
    }

    create(): void {
        if (this.element) {
            this.element.innerHTML = Template.overlay('impressum');
            this.addImpressumContent();
        }
    }
}