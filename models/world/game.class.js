import { Keyboard } from '../helper/keyboard.class.js';
import { World } from './world.class.js'

/** Does the game control. */
export class Game {
    
    world;
    
    constructor() {
        new Keyboard();
        this.world = new World();
    }
}