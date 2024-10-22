import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Query,
} from "@nestjs/common";
import { CreateFollowDto } from "./dto/create-follow.dto";
import { UpdateFollowDto } from "./dto/update-follow.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Follow } from "src/api-entity/Follow.entity";
import { Repository } from "typeorm";
import { Artist } from "src/api-entity/Artist.entity";

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private readonly followRepo: Repository<Follow>,
    @InjectRepository(Artist) private readonly artistRepo: Repository<Artist>
    // @InjectRepository(Follow) follow: Repository<Follow>
  ) {}

  async create(body: CreateFollowDto, req: any) {
    const { id_artist } = body;
    const id_user = req.user.id_user;

    // Check existing artist
    const artist = await this.artistRepo.find({ where: { id_artist } });
    if (artist.length !== 1) throw new NotFoundException("Artist not found");

    // Check followed artist
    const followArtist = await this.followRepo
      .createQueryBuilder("follow")
      .andWhere("follow.id_user = :id_user", { id_user })
      .andWhere("follow.id_artist = :id_artist", { id_artist })
      .getMany();

    if (followArtist.length !== 0)
      throw new ConflictException("Artist already followed");

    // Update db
    const newFollow = this.followRepo.create({ id_artist, id_user });
    const saveFollow = await this.followRepo.save(newFollow);

    return { message: "Follow successfully" };
  }

  async findByUser(req: any) {
    const id_user = req.user.id_user;

    const result: any[] = await this.followRepo
      .createQueryBuilder("follow")
      .select([
        "follow.created_at as follow_at",
        "artist.name as name",
        "artist.slug as slug",
        "artist.url_cover as url_cover",
        "artist.is_show as is_show",
      ])
      .leftJoin("follow.user", "user")
      .leftJoin("follow.artist", "artist")
      .andWhere("follow.id_user = :id_user", { id_user })
      .andWhere("artist.is_show = 1")
      .getRawMany();
    return {
      data: result,
    };
  }

  async remove(body: UpdateFollowDto, req: any) {
    const { id_artist } = body;
    const id_user = req.user.id_user;

    // Check if follow exist
    const follow = await this.followRepo.findOne({
      where: { id_artist, id_user },
    });
    if (!follow) throw new NotFoundException("Follow not found");

    // Update db
    await this.followRepo.remove(follow);

    return { message: "Unfollow successfully" };
  }

  async findByArtist(limit: number, offset: number, id_artist: string) {
    if (!id_artist) throw new BadRequestException("Missing id_artist");

    // Check existing id_artist
    const existingArtist = await this.artistRepo
      .createQueryBuilder("artist")
      .andWhere("artist.id_artist = :id_artist", { id_artist })
      .getMany();

    if (existingArtist.length !== 1) {
      throw new NotFoundException("Artist not found");
    }

    const result: any[] = await this.followRepo
      .createQueryBuilder("follow")
      .select([
        "follow.created_at as follow_at",
        "user.fullname as fullname",
        "user.url_avatar as url_avatar",
      ])
      .leftJoin("follow.user", "user")
      .leftJoin("follow.artist", "artist")
      .andWhere("follow.id_artist = :id_artist", { id_artist })
      .getRawMany();
    return {
      data: result,
    };
  }
}
