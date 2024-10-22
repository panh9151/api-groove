import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
export declare class PlaylistController {
    private readonly playlistService;
    constructor(playlistService: PlaylistService);
    create(createPlaylistDto: CreatePlaylistDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePlaylistDto: UpdatePlaylistDto): string;
    remove(id: string): string;
}
