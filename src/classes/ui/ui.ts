import { Button } from "../button.js";
import { TextButton } from "../text-button.js";
import { CloseControlButton } from "./btn-close-ctrl.js";
import { CloeseImpressumButton } from "./btn-close-impressum.js";
import { ControlOverlayButton } from "./btn-ctrl-overlay.js";
import { ImpressumButton } from "./btn-impressum.js";
import { RunButton } from "./btn-run.js";
import { IconButton } from "./icon-button.js";
import { Impressum } from "./impressum.js";
import { MusicButton } from "./music-btn.js";
import { ControlOverlay } from "./overlay-control.js";
import { SfxButton } from "./sfx-btn.js";

export class UI {
    overlays: Record<string, any> = {};
    btns: {
        text: Record<string, TextButton>,
        close: Record<string, Button>
        icon: Record<string, Record<string, IconButton>>
    } = {
            text: {
                run: new RunButton(),
                control: new ControlOverlayButton(),
                impressum: new ImpressumButton()
            },
            close: {
                control: new CloseControlButton(),
                impressum: new CloeseImpressumButton()
            },
            icon: {
                sound: {
                    music: new MusicButton(),
                    sfx: new SfxButton()
                }
            }
        }

    constructor() {
        this.createElements();
    }

    private createElements(): void {
        this.overlays = {
            control: new ControlOverlay(),
            impressum: new Impressum()
        }
    }
}