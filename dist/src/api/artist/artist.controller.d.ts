import { ArtistService } from "./artist.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { ShowStatus } from "./dto/find-query.dto";
export declare class ArtistController {
    private readonly artistService;
    constructor(artistService: ArtistService);
    create(createArtistDto: CreateArtistDto): Promise<{
        newID: string;
    }>;
    findAll(req: any, limit: string, offset: string, id_artist: string, slug: string, name: string, is_show: ShowStatus): Promise<any[] | {
        data: any[];
    }>;
    findOne(req: any, id: string): Promise<{
        data: any;
    }>;
    update(id: string, updateArtistDto: UpdateArtistDto): Promise<import("./entities/artist.entity").ArtistEntity>;
    remove(id: string): Promise<void>;
}
