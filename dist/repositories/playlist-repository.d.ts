export interface PlaylistRow {
    id: string;
    name: string;
    image_url: string | undefined;
    owner_id: string;
    mode: string;
    created_at: string;
    updated_at: string;
}
declare class PlaylistsRepository {
    create(data: {
        name: string;
        image_url: string | undefined;
        owner_id: string;
    }): Promise<PlaylistRow>;
    findPlaylist(playlistId: string): Promise<PlaylistRow | null>;
    deleteByOwnerId(playlistId: string): Promise<void>;
}
declare const _default: PlaylistsRepository;
export default _default;
//# sourceMappingURL=playlist-repository.d.ts.map