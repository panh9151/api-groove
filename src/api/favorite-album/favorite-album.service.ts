import { Album } from "./../../api-entity/Album.entity";
import { FavoriteAlbumDetail } from "./../../api-entity/FavoriteAlbumDetail.entity";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateFavoriteAlbumDto } from "./dto/favorite-album.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FavoriteAlbumService {
  constructor(
    @InjectRepository(Album) private readonly albumRepo: Repository<Album>,
    @InjectRepository(FavoriteAlbumDetail)
    private readonly favoriteRepo: Repository<FavoriteAlbumDetail>
  ) {}

  async create(body: CreateFavoriteAlbumDto, req: any) {
    const id_user = req.user.id_user;
    const { id_album } = body;

    // Check existing album
    const existingAlbum = await this.albumRepo.find({ where: { id_album } });
    if (!existingAlbum || existingAlbum.length !== 1)
      throw new NotFoundException("Album not found");

    // Check if already liked
    const existingFavoriteAlbum = await this.favoriteRepo.find({
      where: { id_user, id_album },
    });
    if (!existingFavoriteAlbum || existingFavoriteAlbum.length !== 0)
      throw new ConflictException("The album is already in your favorites");

    // Update db
    const favoriteAlbum = this.favoriteRepo.create({
      id_user,
      id_album,
    });

    await this.favoriteRepo.save(favoriteAlbum);

    return { message: "Album favorited successfully" };
  }

  async findAll(limit: number, offset: number, req: any) {
    const id_user = req.user.id_user;

    const favoriteAlbumRepo = this.favoriteRepo
      .createQueryBuilder("fa")
      .andWhere("fa.id_user = :id_user", { id_user })
      .leftJoinAndSelect("fa.album", "album")
      .leftJoinAndSelect("album.artist", "artist");

    if (limit) {
    }

    let favoriteAlbumList: any[] = await favoriteAlbumRepo.getMany();

    favoriteAlbumList = favoriteAlbumList.map((album) => {
      const last_update = album.last_update;
      return {
        last_update,
        ...album.album,
      };
    });

    return { data: favoriteAlbumList };
  }

  async remove(req: any, body: CreateFavoriteAlbumDto) {
    const id_user = req.user.id_user;
    const { id_album } = body;

    // Check existing album
    const existingAlbum = await this.albumRepo.find({ where: { id_album } });
    if (!existingAlbum || existingAlbum.length !== 1)
      throw new NotFoundException("Album not found");

    // Check if the album exists in favorites
    const existingFavoriteAlbum = await this.favoriteRepo.find({
      where: { id_user, id_album },
    });
    if (existingFavoriteAlbum.length !== 1) {
      throw new ConflictException("The album is not in your favorites");
    }

    // Update db - Remove favorite
    await this.favoriteRepo.delete({ id_user, id_album });

    return { message: "Album unfavorited successfully" };
  }
}
