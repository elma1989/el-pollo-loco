import { SoundPathManager } from "./snd-path-mgr.js";

SoundPathManager.init();

export const soundData = {
    'game/music': SoundPathManager.game.music,
    'game/start': SoundPathManager.game.start
}