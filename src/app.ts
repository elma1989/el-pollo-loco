import { Level } from "./classes/models/level.js";

const level = new Level();

/** Will be executed on load. */
async function init(): Promise<void> {
    await level.loadObjects();
    level.startGame();
}

init();