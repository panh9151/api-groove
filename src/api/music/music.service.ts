import { Type } from "./../../api-entity/Type.entity";
import { Artist } from "./../../api-entity/Artist.entity";
import { MusicTypeDetail } from "./../../api-entity/MusicTypeDetail.entity";
import { MusicArtist } from "./../../api-entity/MusicArtist.entity";
import { Lyrics } from "./../../api-entity/Lyrics.entity";
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Music } from "../../api-entity/Music.entity";

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
    @InjectRepository(Lyrics)
    private readonly lyricsRepository: Repository<Lyrics>,
    @InjectRepository(MusicArtist)
    private readonly musicArtistRepo: Repository<MusicArtist>,
    @InjectRepository(MusicTypeDetail)
    private readonly musicTypeRepo: Repository<MusicTypeDetail>,
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
    @InjectRepository(Type)
    private readonly typeRepo: Repository<Type>
  ) {}

  async create(body: CreateMusicDto) {
    // Check artists exist
    if (body.artists && body.artists.length > 0) {
      const artistList = await this.artistRepo
        .createQueryBuilder("artist")
        .select(["artist.id_artist"])
        .orWhere(`artist.id_artist in ('${body.artists.join("', '")}')`)
        .getMany();

      if (artistList.length !== body.artists.length) {
        throw new NotFoundException("Artists not found");
      }
    }

    // Check types exist
    if (body.types && body.types.length > 0) {
      const typeList = await this.typeRepo
        .createQueryBuilder("type")
        .select(["type.id_type"])
        .orWhere(`type.id_type in ('${body.types.join("', '")}')`)
        .getMany();

      if (typeList.length !== body.types.length) {
        throw new NotFoundException("Types not found");
      }
    }

    // Check unique slug
    if (body.slug) {
      const musicByslug = await this.musicRepository
        .createQueryBuilder("music")
        .select("music.id_music")
        .andWhere("music.slug = :slug", { slug: body.slug })
        .getMany();

      if (musicByslug.length !== 0) {
        throw new ConflictException("Music's slug already existed");
      }
    }

    // Add music
    const newMusic = this.musicRepository.create({
      name: body.name,
      slug: body.slug,
      url_path: body.url_path,
      url_cover: body.url_cover,
      total_duration: body.total_duration,
      producer: body.producer,
      composer: body.composer,
      release_date: body.release_date,
      is_show: body.is_show,
    });

    const saveMusic = await this.musicRepository.save(newMusic);

    // Add artists
    if (body.artists && body.artists.length > 0) {
      const artistsToAdd = body.artists.map(async (artist) => {
        const newArtist = this.musicArtistRepo.create({
          id_artist: artist,
          id_music: saveMusic.id_music,
        });

        await this.musicArtistRepo.save(newArtist);
      });
    }

    // // Add types
    if (body.types && body.types.length > 0) {
      const typesToAdd = body.types.map(async (type) => {
        const newType = this.musicTypeRepo.create({
          id_type: type,
          id_music: saveMusic.id_music,
        });

        await this.musicTypeRepo.save(newType);
      });
    }

    // Add lyrics
    if (body.lyrics && body.lyrics.length > 0) {
      const lyricsToAdd = body.lyrics.map(async (lyric) => {
        const newLyric = this.lyricsRepository.create({
          id_music: saveMusic.id_music,
          lyrics: lyric.lyrics,
          start_time: lyric.start_time,
          end_time: lyric.end_time,
        });

        await this.lyricsRepository.save(newLyric);
      });
    }

    return { newID: saveMusic.id_music };
  }

  async findAll(
    limit,
    offset,
    id_music,
    name,
    slug,
    total_duration,
    producer,
    composer,
    is_show,
    id_type,
    id_artist,
    req: any
  ) {
    const musicRepo = this.musicRepository
      .createQueryBuilder("music")
      .select([
        "music.id_music as id_music",
        "music.name as name",
        "music.slug as slug",
        "music.url_path as url_path",
        "music.url_cover as url_cover",
        "music.total_duration as total_duration",
        "music.producer as producer",
        "music.composer as composer",
        "music.release_date as release_date",
        "music.created_at as created_at",
        "music.last_update as last_update",
        "music.is_show as is_show",
        "COUNT(DISTINCT mh.id_music_history) AS view",
        "COUNT(DISTINCT fm.id_music) AS favorite",
        `IFNULL(CONCAT('[', GROUP_CONCAT(
        DISTINCT JSON_OBJECT(
          'id_artist', a.id_artist,
          'name', a.name,
          'slug', a.slug,
          'url_cover', a.url_cover,
          'created_at', a.created_at,
          'last_update', a.last_update,
          'is_show', a.is_show
        ) SEPARATOR ','), ']'), '[]') AS artists`,
        `IFNULL(CONCAT('[', GROUP_CONCAT(
        DISTINCT JSON_OBJECT(
          'id_type', ty.id_type,
          'name', ty.name,
          'slug', ty.slug,
          'created_at', ty.created_at,
          'is_show', ty.is_show
        ) SEPARATOR ','), ']'), '[]') AS types`,
        `IFNULL(CONCAT('[', GROUP_CONCAT(
        DISTINCT JSON_OBJECT(
          'id_lyrics', lyrics.id_lyrics, 
          'lyrics', lyrics.lyrics,       
          'start_time', lyrics.start_time,
          'end_time', lyrics.end_time
        ) SEPARATOR ','), ']'), '[]') AS lyrics`,
      ])
      .leftJoin("music.musicHistories", "mh") // Join bảng lịch sử nghe nhạc (music history)
      .leftJoin("music.favoriteMusics", "fm") // Join bảng yêu thích (favorite music)
      .leftJoin("music.artists", "mad") // Join bảng quan hệ nhiều-nhiều giữa music và artist
      .leftJoin("mad.artist", "a") // Join bảng nghệ sĩ (artist)
      .leftJoin("music.types", "mtd") // Join bảng quan hệ nhiều-nhiều giữa music và type
      .leftJoin("mtd.type", "ty") // Join bảng thể loại (type)
      .leftJoin("music.lyrics", "lyrics");
    // .leftJoinAndSelect("music.lyrics", "lyrics"); // Join bảng thể loại (lyrics)

    // Apply filters based on the parameters
    id_music && musicRepo.andWhere("music.id_music = :id_music", { id_music });
    name && musicRepo.andWhere("music.name = :name", { name });
    slug && musicRepo.andWhere("music.slug = :slug", { slug });
    total_duration &&
      musicRepo.andWhere("music.total_duration = :total_duration", {
        total_duration: `%${total_duration}%`,
      });
    producer &&
      musicRepo.andWhere("music.producer = :producer", {
        producer: `%${producer}%`,
      });
    composer &&
      musicRepo.andWhere("music.composer = :composer", {
        composer: `%${composer}%`,
      });
    is_show &&
      musicRepo.andWhere("music.is_show = :is_show", {
        is_show: `%${is_show}%`,
      });
    id_type && musicRepo.andWhere("music.id_type = :id_type", { id_type });
    id_artist &&
      musicRepo.andWhere("music.id_artist = :id_artist", { id_artist });

    // Apply visible rows by role
    req?.user?.role !== "admin" && musicRepo.andWhere("music.is_show = 1", {});

    // Group by id_music
    musicRepo.groupBy("music.id_music");

    // Apply limit and offset
    limit && musicRepo.take(limit);
    offset && musicRepo.skip(offset);

    // Get data
    const musics = await musicRepo.getRawMany();
    // return musics;
    // Parse types
    musics.map((music: any) => {
      // View & Favorite
      music.favorite = +music.favorite;
      music.view = +music.view;

      // JSON
      music.types = JSON.parse(music.types);
      music.artists = JSON.parse(music.artists);
      music.lyrics = JSON.parse(music.lyrics);

      // Check null Artist
      if (
        music.artists &&
        music.artists.length === 1 &&
        Object.values(music.artists[0]).every(
          (value) => value === null || value === 0
        )
      ) {
        music.artists = [];
      }

      // Check null Type
      if (
        music.types &&
        music.types.length === 1 &&
        Object.values(music.types[0]).every(
          (value) => value === null || value === 0
        )
      ) {
        music.types = [];
      }

      // Check null Lyrics
      if (
        music.lyrics &&
        music.lyrics.length === 1 &&
        Object.values(music.lyrics[0]).every(
          (value) => value === null || value === 0
        )
      ) {
        music.lyrics = [];
      }
    });

    return { data: musics };
  }

  async findOne(id: string, req: any) {
    const musicRepo = this.musicRepository
      .createQueryBuilder("music")
      .select([
        "music.id_music as id_music",
        "music.name as name",
        "music.slug as slug",
        "music.url_path as url_path",
        "music.url_cover as url_cover",
        "music.total_duration as total_duration",
        "music.producer as producer",
        "music.composer as composer",
        "music.release_date as release_date",
        "music.created_at as created_at",
        "music.last_update as last_update",
        "music.is_show as is_show",
        "COUNT(DISTINCT mh.id_music_history) AS view",
        "COUNT(DISTINCT fm.id_music) AS favorite",
        `IFNULL(CONCAT('[', GROUP_CONCAT(
        DISTINCT JSON_OBJECT(
          'id_artist', a.id_artist,
          'name', a.name,
          'slug', a.slug,
          'url_cover', a.url_cover,
          'created_at', a.created_at,
          'last_update', a.last_update,
          'is_show', a.is_show
        ) SEPARATOR ','), ']'), '[]') AS artists`,
        `IFNULL(CONCAT('[', GROUP_CONCAT(
        DISTINCT JSON_OBJECT(
          'id_type', ty.id_type,
          'name', ty.name,
          'slug', ty.slug,
          'created_at', ty.created_at,
          'is_show', ty.is_show
        ) SEPARATOR ','), ']'), '[]') AS types`,
        `IFNULL(CONCAT('[', GROUP_CONCAT(
        DISTINCT JSON_OBJECT(
          'id_lyrics', lyrics.id_lyrics, 
          'lyrics', lyrics.lyrics,       
          'start_time', lyrics.start_time,
          'end_time', lyrics.end_time
        ) SEPARATOR ','), ']'), '[]') AS lyrics`,
      ])
      .leftJoin("music.musicHistories", "mh") // Join bảng lịch sử nghe nhạc (music history)
      .leftJoin("music.favoriteMusics", "fm") // Join bảng yêu thích (favorite music)
      .leftJoin("music.artists", "mad") // Join bảng quan hệ nhiều-nhiều giữa music và artist
      .leftJoin("mad.artist", "a") // Join bảng nghệ sĩ (artist)
      .leftJoin("music.types", "mtd") // Join bảng quan hệ nhiều-nhiều giữa music và type
      .leftJoin("mtd.type", "ty") // Join bảng thể loại (type)
      .leftJoin("music.lyrics", "lyrics")
      .andWhere("music.id_music = :id_music", { id_music: id });
    // Apply visible rows by role
    req?.user?.role !== "admin" && musicRepo.andWhere("music.is_show = 1", {});

    // Get data
    const music = await musicRepo.getRawOne();
    // return musics;
    // Parse types
    // View & Favorite
    music.favorite = +music.favorite;
    music.view = +music.view;

    // JSON
    music.types = JSON.parse(music.types);
    music.artists = JSON.parse(music.artists);
    music.lyrics = JSON.parse(music.lyrics);

    // Check null Artist
    if (
      music.artists &&
      music.artists.length === 1 &&
      Object.values(music.artists[0]).every(
        (value) => value === null || value === 0
      )
    ) {
      music.artists = [];
    }

    // Check null Type
    if (
      music.types &&
      music.types.length === 1 &&
      Object.values(music.types[0]).every(
        (value) => value === null || value === 0
      )
    ) {
      music.types = [];
    }

    // Check null Lyrics
    if (
      music.lyrics &&
      music.lyrics.length === 1 &&
      Object.values(music.lyrics[0]).every(
        (value) => value === null || value === 0
      )
    ) {
      music.lyrics = [];
    }

    return music;
  }

  async update(id: string, body: UpdateMusicDto) {
    const music = await this.musicRepository.findOne({
      where: { id_music: id },
    });

    if (!music) {
      throw new NotFoundException("Music not found");
    }

    // Check artists exist
    if (body.artists && body.artists.length > 0) {
      const artistList = await this.artistRepo
        .createQueryBuilder("artist")
        .select(["artist.id_artist"])
        .orWhere(`artist.id_artist in ('${body.artists.join("', '")}')`)
        .getMany();

      if (artistList.length !== body.artists.length) {
        throw new NotFoundException("Artists not found");
      }
    }

    // Check types exist
    if (body.types && body.types.length > 0) {
      const typeList = await this.typeRepo
        .createQueryBuilder("type")
        .select(["type.id_type"])
        .orWhere(`type.id_type in ('${body.types.join("', '")}')`)
        .getMany();

      if (typeList.length !== body.types.length) {
        throw new NotFoundException("Types not found");
      }
    }

    // Check unique slug
    if (body.slug && body.slug !== music.slug) {
      const musicBySlug = await this.musicRepository
        .createQueryBuilder("music")
        .select("music.id_music")
        .andWhere("music.slug = :slug", { slug: body.slug })
        .getOne();

      if (musicBySlug) {
        throw new ConflictException("Music's slug already existed");
      }
    }

    // Update music fields
    await this.musicRepository.update(id, {
      name: body.name ?? music.name,
      slug: body.slug ?? music.slug,
      url_path: body.url_path ?? music.url_path,
      url_cover: body.url_cover ?? music.url_cover,
      total_duration: body.total_duration ?? music.total_duration,
      producer: body.producer ?? music.producer,
      composer: body.composer ?? music.composer,
      release_date: body.release_date ?? music.release_date,
      is_show: body.is_show ?? music.is_show,
    });

    // Update artists
    if (body.artists) {
      await this.musicArtistRepo.delete({ id_music: id });
      const artistsToAdd = body.artists.map(async (artist) => {
        const newArtist = this.musicArtistRepo.create({
          id_artist: artist,
          id_music: id,
        });

        await this.musicArtistRepo.save(newArtist);
      });
    }

    // Update types
    if (body.types) {
      await this.musicTypeRepo.delete({ id_music: id });
      const typesToAdd = body.types.map(async (type) => {
        const newType = this.musicTypeRepo.create({
          id_type: type,
          id_music: id,
        });

        await this.musicTypeRepo.save(newType);
      });
    }

    // Update lyrics
    if (body.lyrics) {
      await this.lyricsRepository.delete({ id_music: id });
      const lyricsToAdd = body.lyrics.map(async (lyric) => {
        const newLyric = this.lyricsRepository.create({
          id_music: id,
          lyrics: lyric.lyrics,
          start_time: lyric.start_time,
          end_time: lyric.end_time,
        });

        await this.lyricsRepository.save(newLyric);
      });
    }

    return { message: "Music updated successfully" };
  }

  async remove(id: string) {
    const music = await this.musicRepository.findOne({
      where: { id_music: id },
    });

    if (!music) {
      throw new NotFoundException("Music not found");
    }

    await this.musicRepository.delete(id);

    return { message: "Music deleted successfully" };
  }
}
