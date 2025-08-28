export class IntervalHub {

    static intervals = [];

    static startInverval(fn, time) {
        const interval = setInterval(() => {
            fn();
        }, time);
        IntervalHub.intervals.push(interval);
    }

    static stopInvervals() {
        if (IntervalHub.intervals.length > 0) {
            IntervalHub.intervals.forEach(clearInterval);
        }
    }
}