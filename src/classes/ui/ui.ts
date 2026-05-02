import { CloseControlButton } from "./btn-close-ctrl.js";
import { CloeseImpressumButton } from "./btn-close-impressum.js";
import { ControlOverlayButton } from "./btn-ctrl-overlay.js";
import { ImpressumButton } from "./btn-impressum.js";
import { RunButton } from "./btn-run.js";
import { Impressum } from "./impressum.js";
import { ControlOverlay } from "./overlay-control.js";

export class UI {
    btns: Record<string,any> = {};
    overlays: Record<string, any> = {};

    constructor() {
        this.createElements();
    }

    private createElements(): void {
        this.overlays = {
            control: new ControlOverlay(),
            impressum: new Impressum()
        }

        this.btns = {
            text: {
                run: new RunButton(),
                control: new ControlOverlayButton(),
                impressum: new ImpressumButton()
            },
            close: {
                control: new CloseControlButton(),
                impressum: new CloeseImpressumButton()
            }
        }
    }
}