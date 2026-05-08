export class SoundPathManager {
    private static prefix: string = '';

    private static GAME: Record<string, string> = {};
    private static CHARACTER: Record<string, string> = {};

    private constructor() {}

    static init(): void {
        this.setPrefix();
        this.createGame();
        this.createCharactersSounds();
    }

    static get game(): Record<string, string> { return this.GAME; }

    static get character(): Record<string, string> { return this.CHARACTER; }

    private static setPrefix(): void {
        const host = location.hostname;
        const local = host == 'localhost' || host == '127.0.0.1';
        const daServer = host.endsWith('developerakademie.net');

        SoundPathManager.prefix = (local ? '' : daServer ? '/el-pollo-loco' : '/projects/el-pollo-loco') + '/assets/sounds';
    }

    // #region Create Sounds
    private static createGame(): void {
        this.GAME = {
            music: `${this.prefix}/music.mp3`,
            start: `${this.prefix}/start.mp3`
        }
    }

    private static createCharactersSounds(): void {
        this.CHARACTER = {
            sleep: `${this.prefix}/character/snoring.mp3`,
            walk: `${this.prefix}/character/walk.mp3`,
            jump: `${this.prefix}/character/jump.wav`,
            hurt: `${this.prefix}/character/hurt.mp3`,
            dead: `${this.prefix}/character/dead.wav`
        }
    }
    // #endregion
}