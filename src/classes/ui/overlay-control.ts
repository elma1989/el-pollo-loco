import { ControlItem } from "../../interfaces/control-item.js";
import { ImgHub } from "../img-hub.js";
import { Overlay } from "../overlay.js";
import { Template } from "../template.js";

export class ControlOverlay extends Overlay {
    private controls: ControlItem[] = [
        {
            path: ImgHub.SCREEN.walk,
            action: 'walk',
            keys: ['←','→']
        }, {
            path: ImgHub.SCREEN.jump,
            action: 'jump',
            keys: ['SPACE']
        }, {
            path: ImgHub.BOTTLE.rotation[1],
            action: 'throw',
            keys: ['LCTRL']
        }
    ];

    constructor() {
        super('overlay-control');
        this.create();
    }

    create(): void {
        if (this.element) {
            this.element.innerHTML = Template.overlay('control');
            this.createControlContainer();
        }
    }

    private createControlItems(): string {
        let result = '';
        this.controls.forEach((ctrl, i) => {
            result += Template.controlItem(ctrl, this.createKeys(i));
        })
        return result
    }

    private createControlContainer(): void {
        const body = document.getElementById('overlay-control-body');
        if (body) {
            const controlContainer = document.createElement('div');
            controlContainer.id = 'control-container';
            controlContainer.classList.add('w-full');
            controlContainer.classList.add('flex');
            controlContainer.innerHTML = this.createControlItems();
            body.appendChild(controlContainer);
        }
    }

    /**
     * Concats teplates for keys of a control.
     * @param index - Index of control.
     * @returns Tepmplate for keys of control
     */
    private createKeys(index: number): string {
        let keys = '';
        if (index < 0 || index >= this.controls.length) return '';
        this.controls[index].keys.forEach(key => keys += Template.controlKey(key));
        return keys;
    }
}