/** Manges all intervals. */
export class IntervalHub {
    static intervals: number[] = [];
    
    private constructor() {};

    /**
     * Adds a new interval in static array.
     * @param fn - Function to execute.
     * @param time - Time (ms) to repeat
     */
    static start(fn: () => void, time: number): void {
        IntervalHub.intervals.push(
            setInterval(() => {
                fn();
            }, time)
        )
    }

    /** Clears all intervals. */
    static stopAll(): void {
        IntervalHub.intervals.forEach(interval => 
            clearInterval(interval)
        );
    }
}