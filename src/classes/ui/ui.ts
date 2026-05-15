import { Button } from "../button.js";
import { TextButton } from "../text-button.js";
import { CloseControlButton } from "./btn-close-ctrl.js";
import { CloeseImpressumButton } from "./btn-close-impressum.js";
import { ControlOverlayButton } from "./btn-ctrl-overlay.js";
import { ImpressumButton } from "./btn-impressum.js";
import { MobileJumpButton } from "./btn-mob-jump.js";
import { MobileLeftButton } from "./btn-mob-left.js";
import { MobileRightButton } from "./btn-mob-right.js";
import { MobileThrowButton } from "./btn-mob-throw.js";
import { MobileControlButton } from "./btn-mobile-ctrl.js";
import { RunButton } from "./btn-run.js";
import { IconButton } from "./icon-button.js";
import { Impressum } from "./impressum.js";
import { MusicButton } from "./music-btn.js";
import { ControlOverlay } from "./overlay-control.js";
import { SwitchLandscape } from "./overlay-landscape.js";
import { SfxButton } from "./sfx-btn.js";

export class UI {
    overlays: Record<string, any> = {
        control: new ControlOverlay(),
        impressum: new Impressum(),
        landscape: new SwitchLandscape()
    };
    btns: {
        text: Record<string, TextButton>,
        close: Record<string, Button>
        icon: {
            sound: Record<string, IconButton>,
            mobileControl: Record<string, MobileControlButton>
        }
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
                },
                mobileControl: {
                    left: new MobileLeftButton(),
                    right: new MobileRightButton(),
                    jump: new MobileJumpButton(),
                    throw: new MobileThrowButton()
                }
            }
        }
}