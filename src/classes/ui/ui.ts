import { CloseControlButton } from "./btn-close-ctrl.js";
import { ControlOverlayButton } from "./btn-ctrl-overlay.js";
import { RunButton } from "./btn-run.js";
import { ControlOverlay } from "./overlay-control.js";

export class UI {
    btns: Record<string,any> = {};
    overlays: Record<string, any> = {};

    constructor() {
        this.createElements();
    }

    private createElements(): void {
        this.overlays = {
            control: new ControlOverlay()
        }

        this.btns = {
            text: {
                run: new RunButton(),
                controls: new ControlOverlayButton()
            },
            close: {
                controls: new CloseControlButton()
            }
        }
    }
}