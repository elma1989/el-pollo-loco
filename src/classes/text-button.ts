import { Button } from "./button.js";

export abstract class TextButton extends Button {
    private _deescription: string = '';

    constructor(id: string, description: string, visible: boolean = true, disabled: boolean = false) {
        super(id, visible, disabled);
        this.description = description;        
    }

    get description(): string { return this._deescription; }

    set description(value: string) {
        if (this.btnElement) {
            this.btnElement.innerText = value;
            this._deescription = value;
        }
    }
}