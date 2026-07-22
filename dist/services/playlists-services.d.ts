import { PlaylistRow } from "../repositories/playlist-repository";
declare class PlaylistServices {
    createPlaylist(data: {
        name: string;
        image_url?: string | undefined;
        owner_id: string;
    }): Promise<PlaylistRow>;
}
declare const _default: PlaylistServices;
export default _default;
//# sourceMappingURL=playlists-services.d.ts.map