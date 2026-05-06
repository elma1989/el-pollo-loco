type SoundMap = Record<string, AudioBuffer>;

export class SoundManager {
    private static ctx: AudioContext | null = null;
    private static _soundEnabled: boolean = true;
    private static _musicEnabled: boolean = true;
    private static rawBuffers: Record<string, ArrayBuffer> = {};
    private static buffers: SoundMap = {};

    private static masterGain: GainNode | null = null;
    private static musicGain: GainNode | null = null;
    private static music: { stop: () => void} | null = null;

    private constructor() {}

    // #region Methods
    static init(): void {
        this.loadStorage();
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
        if (this.musicEnabled) {
            if(!this.music) this.playMusic();
        } else {
            if (this.music) this.stopMusic();
        }
    }

    /**
     * Plays a sound
     * @param name - Name of sound.
     * @returns Sorce-Node or null if not avilable.
     */
    static play(name: string): { stop: () => void} | null {
        if (!this.soundEnabled || !this.ctx) return null;
        const buffer = this.buffers[name];
        if (!buffer) {
            console.warn(`Sound "${name}" not decoded`);
            return null;
        }
        
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);
        return {
            stop: () => source.stop(0)
        }
    }

    /** Starts the background music. */
    static playMusic(): void {
        if (this.musicEnabled) {
            const music = this.play('game/music');
            if (music) this.music = music;
        }
    }

    static stopMusic(): void {
        const music = this.music;
        if (music) {
            music.stop();
            this.music = null;
        }
    }
    // #endregion

    // #region Sever-Management
    /**
     * Gets an ArrayBuffer for a sound.
     * @param url - Url from sound.
     * @returns null if url not found.
     */
    private static async preloadSound(url: string): Promise<ArrayBuffer | null> {
        const response = await fetch(url);
        if (!response.ok) return null;
        return response.arrayBuffer();
    }

    /**
     * Adds an ArrayBuffer to the map.
     * @param name - Name of ArrayBuffer.
     * @param url - Url of sound.
     */
    private static async addArrayBuffer(name: string, url: string): Promise<void> {
        if (this.rawBuffers[name]) return;
        const raw = await this.preloadSound(url);
        if (raw) this.rawBuffers[name] = raw;
    }

    /**
     * Preloads all sounds from a map.
     * @param sounds - Map of names and url
     */
    static async preLoadAll(sounds: Record<string, string>): Promise<void> {
        await Promise.all(Object.entries(sounds).map(([name, url]) => this.addArrayBuffer(name, url)));
    }

    /** Creates context after user-input. */
    static createContext(): void {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.musicGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.musicGain.connect(this.masterGain);
    }

    /**
     * Decodes a preloaded sound from raw-data.
     * @param name Name of Sound.
     */
    private static async decode(name: string): Promise<void> {
        if (!this.ctx) {
            console.warn('Context is not active.');
            return
        }
        if (!this.rawBuffers[name]) {
            console.warn(`Sound "${name}" is not loaded.`);
            return
        }
        if (this.buffers[name]) return;
        const buffer = await this.ctx.decodeAudioData(this.rawBuffers[name]);
        this.buffers[name] = buffer;
    }

    /** Decodes all raw datas. */
    static async decodeAll(): Promise<void> {
        await Promise.all(Object.keys(this.rawBuffers).map(name => this.decode(name)));
    }
    // #endregion
    // #endregion
}