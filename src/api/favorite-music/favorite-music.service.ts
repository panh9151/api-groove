import { FavoriteMusic } from "./../../api-entity/FavoriteMusic.entity";
import { Music } from "./../../api-entity/Music.entity";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateFavoriteMusicDto } from "./dto/favorite-music.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FavoriteMusicService {
  constructor(
    @InjectRepository(Music) private readonly musicRepo: Repository<Music>,
    @InjectRepository(FavoriteMusic)
    private readonly favoriteRepo: Repository<FavoriteMusic>
  ) {}

  async create(body: CreateFavoriteMusicDto, req: any) {
    const id_user = req.user.id_user;
    const { id_music } = body;

    // Check existing music
    const existingMusic = await this.musicRepo.find({ where: { id_music } });
    if (!existingMusic || existingMusic.length !== 1)
      throw new NotFoundException("Music not found");

    // Check if already liked
    const existingFavoriteMusic = await this.favoriteRepo.find({
      where: { id_user, id_music },
    });
    if (!existingFavoriteMusic || existingFavoriteMusic.length !== 0)
      throw new ConflictException("The music is already in your favorites");

    // Update db
    const favoriteMusic = this.favoriteRepo.create({
      id_user,
      id_music,
    });

    await this.favoriteRepo.save(favoriteMusic);

    return { message: "Music favorited successfully" };
  }

  async findAll(limit: number, offset: number, req: any) {
    const id_user = req.user.id_user;

    const favoriteMusicRepo = this.favoriteRepo
      .createQueryBuilder("fa")
      .leftJoinAndSelect("fa.music", "music")
      .leftJoinAndSelect("music.artists", "mad")
      .leftJoinAndSelect("mad.artist", "artist")
      .leftJoinAndSelect("music.types", "mtd")
      .leftJoinAndSelect("mtd.type", "type")
      .leftJoinAndSelect("music.id_composer", "id_composer")
      .andWhere("fa.id_user = :id_user", { id_user })
      .andWhere("music.is_show = 1");

    // Apply limit and offset if provided
    if (limit) {
      favoriteMusicRepo.take(limit);
    }
    if (offset) {
      favoriteMusicRepo.skip(offset);
    }

    // Process the result
    let favoriteMusicList: any[] = await favoriteMusicRepo.getMany();
    favoriteMusicList = favoriteMusicList.map((music) => {
      const last_update = music.music.last_update;
      const artists = music.music.artists.map((artist) => artist.artist);
      const types = music.music.types.map((type) => type.type);
      const composer = music.music?.id_composer?.name;

      delete music.music.artists;
      delete music.music.types;
      delete music.music.id_composer;

      return {
        ...music.music,
        last_update,
        artists,
        types,
        composer,
      };
    });

    return { data: favoriteMusicList };
  }

  async remove(req: any, id_music: string) {
    const id_user = req.user.id_user;

    // Check if the music exists in favorites
    const existingFavoriteMusic = await this.favoriteRepo.find({
      where: { id_user, id_music },
    });
    if (existingFavoriteMusic.length !== 1) {
      throw new NotFoundException("The music is not in your favorites");
    }

    // Update db - Remove favorite
    await this.favoriteRepo.delete({ id_user, id_music });

    return { message: "Music unfavorited successfully" };
  }
}
