import { Type } from "./../../api-entity/Type.entity";
import { Artist } from "./../../api-entity/Artist.entity";
import { MusicTypeDetail } from "./../../api-entity/MusicTypeDetail.entity";
import { MusicArtist } from "./../../api-entity/MusicArtist.entity";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Music } from "../../api-entity/Music.entity";
import { Composer } from "../../api-entity/Composer.entity";

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
    @InjectRepository(MusicArtist)
    private readonly musicArtistRepo: Repository<MusicArtist>,
    @InjectRepository(MusicTypeDetail)
    private readonly musicTypeRepo: Repository<MusicTypeDetail>,
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
    @InjectRepository(Type)
    private readonly typeRepo: Repository<Type>,
    @InjectRepository(Composer)
    private readonly composerRepo: Repository<Composer>
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

    // Check existing composer
    if (body.composer) {
      const composer = await this.composerRepo
        .createQueryBuilder("composer")
        .select("composer.id_composer")
        .andWhere("composer.id_composer = :composer", {
          composer: body.composer,
        })
        .getMany();

      if (composer.length !== 1) {
        throw new ConflictException("Composer not found");
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

    // Add types
    if (body.types && body.types.length > 0) {
      const typesToAdd = body.types.map(async (type) => {
        const newType = this.musicTypeRepo.create({
          id_type: type,
          id_music: saveMusic.id_music,
        });

        await this.musicTypeRepo.save(newType);
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
    producer,
    composer,
    is_show,
    id_type,
    id_artist,
    req: any
  ) {
    const musicRepo = this.musicRepository
      .createQueryBuilder("music")
      .leftJoinAndSelect("music.musicHistories", "mh") // Join bảng lịch sử nghe nhạc (music history)
      .leftJoinAndSelect("music.favoriteMusics", "fm") // Join bảng yêu thích (favorite music)
      .leftJoinAndSelect("music.artists", "mad") // Join bảng quan hệ nhiều-nhiều giữa music và artist
      .leftJoinAndSelect("mad.artist", "a") // Join bảng nghệ sĩ (artist)
      .leftJoinAndSelect("music.types", "mtd") // Join bảng quan hệ nhiều-nhiều giữa music và type
      .leftJoinAndSelect("mtd.type", "ty") // Join bảng thể loại (type)
      .leftJoinAndSelect("music.id_composer", "composer");

    // Apply filters based on the parameters
    id_music && musicRepo.andWhere("music.id_music = :id_music", { id_music });
    name && musicRepo.andWhere("music.name = :name", { name });
    slug && musicRepo.andWhere("music.slug = :slug", { slug });
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
    let musics: any[] = await musicRepo.getMany();

    //Parse data
    musics = musics.map((music) => {
      music.favorite = music.favoriteMusics
        ? music.favoriteMusics.length
        : null;
      music.vỉew = music.musicHistories ? music.musicHistories.length : null;
      music.composer = music.id_composer ? music.id_composer : null;

      delete music.musicHistories;
      delete music.favoriteMusics;
      delete music.id_composer;

      return musics;
    });

    return { data: musics };
  }

  async findOne(id: string, req: any) {
    const musicRepo = this.musicRepository
      .createQueryBuilder("music")
      .leftJoinAndSelect("music.musicHistories", "mh") // Join bảng lịch sử nghe nhạc (music history)
      .leftJoinAndSelect("music.favoriteMusics", "fm") // Join bảng yêu thích (favorite music)
      .leftJoinAndSelect("music.artists", "mad") // Join bảng quan hệ nhiều-nhiều giữa music và artist
      .leftJoinAndSelect("mad.artist", "a") // Join bảng nghệ sĩ (artist)
      .leftJoinAndSelect("music.types", "mtd") // Join bảng quan hệ nhiều-nhiều giữa music và type
      .leftJoinAndSelect("mtd.type", "ty") // Join bảng thể loại (type)
      .leftJoinAndSelect("music.id_composer", "composer")
      .andWhere("music.id_music = :id_music", { id_music: id });

    // Apply visible rows by role
    req?.user?.role !== "admin" && musicRepo.andWhere("music.is_show = 1", {});

    // Get data
    const music: any = await musicRepo.getOne();
    if (!music) throw new NotFoundException("Music not found");
    music.favorite = music.favoriteMusics ? music.favoriteMusics.length : null;
    music.view = music.musicHistories ? music.musicHistories.length : null;
    music.composer = music.id_composer ? music.id_composer : null;

    delete music.musicHistories;
    delete music.favoriteMusics;
    delete music.id_composer;

    return { data: music };
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
      producer: body.producer ?? music.producer,
      // composer: body.composer ?? music.composer,
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
