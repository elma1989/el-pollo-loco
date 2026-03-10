import { KeyListener } from "./classes/key-listener.js";
import { Level } from "./classes/models/level.js";

const level = new Level();

/** Will be executed on load. */
async function init(): Promise<void> {
    new KeyListener();
    await level.loadObjects();
    level.startGame();
}

init();