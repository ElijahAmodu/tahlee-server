import { SongRow } from "../repositories/song-repository";
declare class SongServices {
    createSong(data: {
        name: string;
        artist: string;
        audio_url: string;
        image_url?: string | undefined;
        duration: number;
        added_by: string;
    }): Promise<SongRow>;
}
declare const _default: SongServices;
export default _default;
//# sourceMappingURL=song-service.d.ts.map