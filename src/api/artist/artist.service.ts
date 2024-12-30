import { Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { FindQueryDto } from "./dto/find-query.dto";
import { ArtistEntity } from "./entities/artist.entity";
import { Follow } from "./entities/follow.entity";

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    // Check existing slug
    const existingArtist = await this.artistRepository
      .createQueryBuilder("artist")
      .andWhere("artist.slug = :slug", { slug: createArtistDto.slug })
      .andWhere("artist.slug <> :slug", { slug: null })
      .getOne();

    if (existingArtist) {
      throw new ConflictException("Slug already existed");
    }

    const artist = this.artistRepository.create(createArtistDto);
    const newArtist = await this.artistRepository.save(artist);
    return { newID: newArtist.id_artist };
  }

  async findAll(req: any, count: any, query: FindQueryDto) {
    const { name, slug, is_show, id_artist } = query;
    const { limit, offset } = count;
    const artist = this.artistRepository
      .createQueryBuilder("artist")
      .leftJoin(Follow, "f", "artist.id_artist = f.id_artist")
      .select([
        "artist.id_artist as id_artist",
        "artist.name as name",
        "artist.slug as slug",
        "artist.url_cover as url_cover",
        "artist.created_at as created_at",
        "artist.last_update as last_update",
        "artist.is_show as is_show",
        "COUNT(f.id_user) AS followers",
      ]);

    // Apply filters based on the parameters
    const getByParam = (
      param,
      value,
      repo,
      absolute: boolean = false,
      queryBy: "and" | "or" = "and"
    ) => {
      if (value !== null && value !== undefined && value !== "") {
        if (absolute === true) value = `%${value}%`;
        if (queryBy === "and") {
          repo.andWhere(`${param} = :value`, {
            value,
          });
        } else {
          repo.orWhere(`${param} = :value`, {
            value,
          });
        }
      }
    };

    getByParam("artist.id_artist", id_artist, artist);
    getByParam("artist.name", name, artist, true);
    getByParam("artist.slug", slug, artist);
    getByParam("artist.is_show", is_show, artist);

    // Apply visible rows by role
    req?.user?.role !== "admin" && artist.andWhere("artist.is_show = 1", {});

    //
    artist.groupBy("artist.id_artist");

    // Apply limit and offset
    limit && artist.take(limit as number);
    offset && artist.skip(offset as number);

    // Get data
    const returnedData = await artist.getRawMany();
    returnedData.forEach((artist) => {
      artist.followers = parseInt(artist.followers);
    });

    // Check not found
    if (
      returnedData &&
      returnedData.length === 1 &&
      Object.values(returnedData[0]).every(
        (value) => value === null || value === 0
      )
    ) {
      return [];
    }

    return { data: returnedData };
  }

  async findOne(req: any, id: string) {
    const artist = await this.artistRepository
      .createQueryBuilder("artist")
      .leftJoin(Follow, "f", "artist.id_artist = f.id_artist")
      .select([
        "artist.id_artist AS id_artist",
        "artist.name AS name",
        "artist.slug AS slug",
        "artist.url_cover AS url_cover",
        "artist.created_at AS created_at",
        "artist.last_update AS last_update",
        "artist.is_show AS is_show",
        "COUNT(f.id_user) AS followers",
      ])
      .where("artist.id_artist = :id_artist", { id_artist: id });

    // Apply visible rows by role
    req?.user?.role !== "admin" && artist.andWhere("artist.is_show = 1", {});
    const result = await artist.getRawOne();
    result.followers = parseInt(result.followers);

    // Check not found
    if (
      result &&
      Object.values(result).every((value) => value === null || value === 0)
    ) {
      throw new NotFoundException("Artist not found");
    }

    return { data: result };
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    // Check existing slug
    const existingArtist = await this.artistRepository
      .createQueryBuilder("artist")
      .andWhere("artist.slug = :slug", { slug: updateArtistDto.slug })
      .andWhere("artist.slug <> :slug", { slug: null })
      .getOne();

    if (existingArtist) {
      throw new ConflictException("Slug already existed");
    }

    const artist = await this.artistRepository.findOne({
      where: { id_artist: id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist not found`);
    }

    Object.assign(artist, updateArtistDto);
    return this.artistRepository.save(artist);
  }

  async remove(id: string) {
    const result = await this.artistRepository.delete(id);

    // if (result.affected === 0) {
    //   throw new NotFoundException(`Artist not found`);
    // }

    return { message: "Delete artist successfully" };
  }
}
