import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
export declare class PlaylistService {
    create(createPlaylistDto: CreatePlaylistDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePlaylistDto: UpdatePlaylistDto): string;
    remove(id: number): string;
}
