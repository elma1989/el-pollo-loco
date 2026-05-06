export class SoundPathManager {
    private static prefix: string = '';

    private static GAME: Record<string, string> = {}

    private constructor() {}

    static init(): void {
        this.setPrefix();
        this.createGame();
    }

    static get game(): Record<string, string> { return this.GAME; }


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
    // #endregion
}