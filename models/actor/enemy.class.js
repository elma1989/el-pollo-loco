import { MortalActor } from './actor.class.js'

class Enemy extends MortalActor {

    // #region Attributes
    static enemyOffest = 500;
    // #endregion

    constructor(width, height, level) {
        super(Enemy.randomPos(), width, height, level);
        Enemy.nextEnemy();
    }

    /**
     * Gets the X-Possition of the next enemy.
     * @returns {number} X-Pos for enemy.
     */
    static randomPos() {
        return Enemy.enemyOffest + 100 * Math.random();
    }

    /** Increds the enemy-offset. */
    static nextEnemy() {
        Enemy += 300;
    }

    act() {
        super.act();
        this.move(-2);
    }
}