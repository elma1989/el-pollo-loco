type SoundMap = Record<string, AudioBuffer>;

export class SoundManager {
    private static ctx: AudioContext = new AudioContext();
    private static _soundEnabled: boolean = true;
    private static _musicEnabled: boolean = true;
    private static buffers: SoundMap = {};

    private static masterGain = this.ctx.createGain();
    private static musicGain = this.ctx.createGain();
    private static musicSource: AudioBufferSourceNode | null = null;

    private constructor() {}
}