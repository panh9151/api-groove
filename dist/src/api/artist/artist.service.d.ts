import { Repository } from "typeorm";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { FindQueryDto } from "./dto/find-query.dto";
import { ArtistEntity } from "./entities/artist.entity";
export declare class ArtistService {
    private readonly artistRepository;
    constructor(artistRepository: Repository<ArtistEntity>);
    create(createArtistDto: CreateArtistDto): Promise<{
        newID: string;
    }>;
    findAll(req: any, count: any, query: FindQueryDto): Promise<any[] | {
        data: any[];
    }>;
    findOne(req: any, id: string): Promise<{
        data: any;
    }>;
    update(id: string, updateArtistDto: UpdateArtistDto): Promise<ArtistEntity>;
    remove(id: string): Promise<void>;
}
