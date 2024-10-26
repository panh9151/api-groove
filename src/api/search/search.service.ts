import { ApiOperation } from "@nestjs/swagger";
import { Album } from "./../../api-entity/Album.entity";
import { Artist } from "./../../api-entity/Artist.entity";
import { Music } from "./../../api-entity/Music.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Music) private readonly musicRepo: Repository<Music>,
    @InjectRepository(Artist) private readonly artistRepo: Repository<Artist>,
    @InjectRepository(Album) private readonly albumRepo: Repository<Album>
  ) {}

  @ApiOperation({ summary: "Tìm kiếm" })
  async findAll(req, search_text: string) {
    if (!search_text) throw new BadRequestException("Missing search_text");

    let role = req?.user?.role === "admin" ? "admin" : "user";

    // Search by music name/id_music
    const musicRepo = this.musicRepo
      .createQueryBuilder("music")
      .leftJoinAndSelect("music.artists", "mad")
      .leftJoinAndSelect("mad.artist", "artist")
      .leftJoinAndSelect("music.types", "mtd")
      .leftJoinAndSelect("mtd.type", "type")
      .andWhere(
        `
        (
          (music.name LIKE CONCAT('%', '${search_text}', '%')
          OR music.id_music = '${search_text}')
        )
        `
      );

    role !== "admin" && musicRepo.andWhere("music.is_show = 1");

    const musicList: any[] = await musicRepo.getMany();

    musicList.map((music) => {
      music.artists = music.artists.map((artist) => {
        return artist.artist;
      });

      music.types = music.types.map((type) => {
        return type.type;
      });
    });

    // Search by album name/id_album, music name/id_music
    const albumRepo = this.albumRepo
      .createQueryBuilder("album")
      .leftJoinAndSelect("album.artist", "artist")
      .leftJoinAndSelect("album.musics", "mad")
      .leftJoinAndSelect("mad.music", "music")
      .andWhere(
        `
          (album.name LIKE :search_text OR album.id_album = :_search_text
          OR artist.id_artist = :_search_text
          OR artist.name LIKE :search_text
          OR music.id_music = :_search_text
          OR music.name LIKE :search_text)
        `,
        { search_text: `%${search_text}%`, _search_text: search_text }
      );

    role !== "admin" && albumRepo.andWhere("album.is_show = 1");

    const albumList: any[] = await albumRepo.getMany();

    albumList.map((album) => {
      album.musics = album.musics.map((music) => {
        return {
          ...music.music,
          index_order: music.index_order,
        };
      });
    });

    // Search by artist name/id_artist
    const artistRepo = this.artistRepo.createQueryBuilder("artist").andWhere(
      `
          (artist.name LIKE :search_text 
          OR artist.id_artist = :_search_text)
        `,
      { search_text: `%${search_text}%`, _search_text: search_text }
    );

    role !== "admin" && artistRepo.andWhere("artist.is_show = 1");

    const artistList = await artistRepo.getMany();

    return {
      data: {
        musicList,
        albumList,
        artistList,
      },
    };
  }
}
