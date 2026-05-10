import { SoundPathManager } from "./snd-path-mgr.js";

SoundPathManager.init();

export const soundData = {
    'game/music': SoundPathManager.game.music,
    'game/start': SoundPathManager.game.start,
    'character/sleep': SoundPathManager.character.sleep,
    'character/walk': SoundPathManager.character.walk,
    'character/jump': SoundPathManager.character.jump,
    'character/hurt': SoundPathManager.character.hurt,
    'character/dead': SoundPathManager.character.dead,
    'enemy/s/dead': SoundPathManager.enemy.deadS,
    'enemy/m/dead': SoundPathManager.enemy.deadM,
    'boss/approach': SoundPathManager.enemy.bossApproach,
    'boss/hurt': SoundPathManager.enemy.deadM,
    'boss/dead': SoundPathManager.enemy.deadM,
    'collectable/coin/collect': SoundPathManager.collectable.collectCoin,
    'collectable/bottle/collect': SoundPathManager.collectable.collectBottle,
    'collectable/bottle/break': SoundPathManager.collectable.breakBottle
}