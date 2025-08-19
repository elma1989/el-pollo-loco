class MyAudio {

    sound;
    loaded = false;

    constructor(path) {
        this.sound = new Audio(path)
    }
}