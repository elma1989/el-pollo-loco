export class SoundPathManager {
    private static prefix: string = '';

    private static GAME: Record<string, string> = {}

    private constructor() {}

    static init(): void {
        this.setPrefix();
    }


    private static setPrefix(): void {
        const host = location.hostname;
        const local = host == 'localhost' || host == '127.0.0.1';
        const daServer = host.endsWith('developerakademie.net');

        SoundPathManager.prefix = (local ? '' : daServer ? '/el-pollo-loco' : '/projects/el-pollo-loco') + '/assets/sounds';
    }

}