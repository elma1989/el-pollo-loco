import { Game } from './classes/models/world/game.class.js';
import { IntervalHub } from './classes/helper/intervalhub.class.js';
import { Background, Air, Desert } from './classes/models/world/background.class.js';
import { Collectable } from './classes/models/actor/actor.class.js';
import { Enemy } from './classes/models/actor/enemy.class.js';

let game = new Game();

document.getElementById('btn-restart').addEventListener('click', () => {
    reset();
})

/** Reseets the complete game. */
function reset() {
    IntervalHub.stopInvervals();
    document.getElementById('end-btns').classList.add('d-none');
    document.getElementById('control-btns').classList.remove('d-none');
    game = null;
    resetStaticAttributes();
    game = new Game();
}

/** resets the static attibutes */
function resetStaticAttributes() {
    Background.xPos = 0;
    Collectable.xPos = 200;
    Air.xPos = 0;
    Desert.xPos = 0;
    Desert.curImgIndex = 0;
    Desert.curLayer = 0;
    Enemy.enemyOffest = 500;
}