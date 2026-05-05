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

    // #region Methods
    static init(): void {
        this.loadStorage();
        this.masterGain.connect(this.ctx.destination);
        this.musicGain.connect(this.masterGain);
    }

    static get soundEnabled(): boolean { return this._soundEnabled; }

    static set soundEnabled(state: boolean) {
        this._soundEnabled = state;
        this.save();
    }

    static get musicEnabled(): boolean { return this._musicEnabled; }

    static set musicEnabled(state: boolean) {
        this._musicEnabled = state;
        this.save();
    }

    // #region Storage
    /** Saves sound settings in local storage. */
    private static save() {
        const data = {
            sound: this.soundEnabled,
            music: this.musicEnabled
        };
        localStorage.setItem('sndSettings', JSON.stringify(data));
    }

    /** Load sound settings from local storage. */
    private static loadStorage() {
        const stored = localStorage.getItem('sndSettings');
        if (stored) {
            const settings = JSON.parse(stored);
            this._soundEnabled = settings.sound;
            this._musicEnabled = settings.music;
        }
    }
    // #endregion

    // #region Sound-Control
    static toggleSound(): void {
        this.soundEnabled = !this.soundEnabled;
    }

    static toggleMusic(): void {
        this.musicEnabled = !this.musicEnabled;
    }
    // #endregion
    // #endregion
}