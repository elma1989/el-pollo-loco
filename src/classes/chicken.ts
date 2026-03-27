import { HealthyObject } from "./healthy-object.js";

export abstract class Chicken extends HealthyObject {
    static offset: number = 500;

    constructor(width: number, height: number) {
        super(Chicken.randomX(), width, height);
        Chicken.next();
    }

    /**
     * Gets random x-pos for chicken.
     * @returns Random x-pos for chicken.
     */
    static randomX(): number {
        return Math.random() * 200 + Chicken.offset;
    }

    /** Increases offset for next chicken. */
    static next(): void {
        Chicken.offset += 300
    }
}