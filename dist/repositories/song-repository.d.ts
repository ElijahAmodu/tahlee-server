export interface SongRow {
    id: string;
    name: string;
    artist: string;
    audio_url: string;
    image_url: string | null;
    duration: number;
    added_by: string;
    created_at: string;
}
declare class SongRepository {
    create(data: {
        name: string;
        artist: string;
        audio_url: string;
        image_url: string | null;
        duration: number;
        added_by: string;
    }): Promise<SongRow>;
}
declare const _default: SongRepository;
export default _default;
//# sourceMappingURL=song-repository.d.ts.map