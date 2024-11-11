import { Album } from "./../../api-entity/Album.entity";
import { Follow } from "./../artist/entities/follow.entity";
import { Music } from "./../../api-entity/Music.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Follow) private readonly followRepo: Repository<Follow>,
    @InjectRepository(Album) private readonly albumRepo: Repository<Album>,
    @InjectRepository(Music) private readonly musicRepo: Repository<Music>
  ) {}

  async findAll(req) {
    const id_user = req.user.id_user;
    let followList: any[] = await this.followRepo.find({
      where: { id_user },
      relations: ["artist"],
    });

    followList = followList.map((i) => {
      return {
        follow_at: i.created_at,
        ...i.artist,
      };
    });

    // Notification
    const notifications = [];
    await Promise.all(
      followList.map(async (follow) => {
        const artistId = follow.id_artist;
        const followAt = follow.follow_at;

        // Lấy album mới từ nghệ sĩ sau thời gian follow và is_show = 0
        const newAlbums = await this.albumRepo.find({
          where: {
            id_artist: artistId,
            created_at: MoreThan(followAt),
            is_show: 1,
          },
        });

        // Lấy bài hát mới từ nghệ sĩ sau thời gian follow và is_show = 0
        const newMusic = await this.musicRepo
          .createQueryBuilder("music")
          .andWhere("music.is_show = 1")
          .andWhere("music.created_at > :date", { date: followAt })
          .andWhere("artist.id_artist = :id_artist", { id_artist: artistId })
          .leftJoinAndSelect("music.artists", "mad")
          .leftJoinAndSelect("mad.artist", "artist")
          .getMany();

        newAlbums.map((album) => {
          notifications.push({
            msg: `Nghệ sĩ ${follow.name} vừa thêm mới album '${album.name}'`,
            url: `/albumdetail/${album.id_album}`,
            time: album.created_at,
          });
        });

        newMusic.map((music) => {
          notifications.push({
            msg: `Nghệ sĩ ${follow.name} vừa thêm bài hát mới với tên '${music.name}'`,
            url: `/musicdetail/${music.id_music}`,
            time: music.created_at,
          });
        });

        // Định dạng dữ liệu thông báo cho từng nghệ sĩ
        // return {
        //   artist: {
        //     id_artist: artistId,
        //     name: follow.name,
        //     slug: follow.slug,
        //     url_cover: follow.url_cover,
        //   },
        //   follow_at: followAt,
        //   new_albums: newAlbums,
        //   new_music: newMusic,
        //   msg: `Nghệ sĩ ${follow.name} vừa thêm một bài hát mới!`,
        //   url: `/musicdetail/${idMusic}`,
        //   noti_time: ``,
        // };
      })
    );

    return notifications;
  }
}
