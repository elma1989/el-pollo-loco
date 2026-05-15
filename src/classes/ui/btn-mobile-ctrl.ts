import { IconButton } from "./icon-button.js";

export abstract class MobileControlButton extends IconButton {
    
    onPointerUp?: () => void;
    
    constructor(id: string) {
        super(id, false);
        this.addLeaveEvent();
    }

    private addLeaveEvent(): void {
        if (!this.element) return;
        this.element.addEventListener('pointerup', () => {
            this.onPointerUp?.();
        });
    }
}