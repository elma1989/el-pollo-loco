import { TextButton } from "../text-button.js";

export class RunButton extends TextButton {
    constructor() {
        super('btn-run', 'LOADING', true, true);
    }
}