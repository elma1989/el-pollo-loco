import { RunButton } from "./btn-run.js";

export class UI {
    btns: {text: {run: RunButton}}

    constructor() {
        this.btns = {
            text: {
                run: new RunButton()
            }
        }
    }
}