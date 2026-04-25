import { Game } from "./classes/game.js";

/** Will be executed on load. */
function init(): void {
    const game = new Game();
    game.init();
}

init();