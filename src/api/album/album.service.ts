import { MusicAlbum } from "./../../api-entity/MusicAlbum.entity";
import { Artist } from "./../../api-entity/Artist.entity";
import { Music } from "./../../api-entity/Music.entity";
import { Album } from "./../../api-entity/Album.entity";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private readonly albumRepo: Repository<Album>,
    @InjectRepository(Music) private readonly musicRepo: Repository<Music>,
    @InjectRepository(Artist) private readonly artistRepo: Repository<Artist>,
    @InjectRepository(MusicAlbum)
    private readonly musicAlbumRepo: Repository<MusicAlbum>
  ) {}

  async create(body: CreateAlbumDto) {
    const {
      id_artist,
      name,
      slug,
      url_cover,
      release_date,
      publish_by,
      is_show = 1,
      musics,
    } = body;

    // Check unique slug
    if (slug) {
      const album = await this.albumRepo.find({ where: { slug } });

      if (album.length !== 0)
        throw new ConflictException("Slug already existed");
    }

    // Check exiting music
    if (musics && musics.length > 0) {
      const music = await this.musicRepo
        .createQueryBuilder("music")
        .select(["music.id_music"])
        .andWhere(
          `music.id_music in ('${musics.map((music) => music.id_music).join("', '")}')`
        )
        .getMany();

      if (music.length !== musics.length)
        throw new NotFoundException("Music not found");
    }

    // Check existing artist
    if (id_artist) {
      const artist = await this.artistRepo
        .createQueryBuilder("artist")
        .select(["artist.id_artist"])
        .andWhere("artist.id_artist = :id_artist", { id_artist })
        .getMany();

      if (artist.length !== 1) throw new NotFoundException("Artist not found");
    }

    // Update db
    const newAlbum = this.albumRepo.create({
      id_artist,
      name,
      slug,
      url_cover,
      release_date,
      publish_by,
      is_show,
    });
    const saveAlbum = await this.albumRepo.save(newAlbum);

    // Add musics
    if (musics && musics.length > 0) {
      const newMusicAlbumRecords = musics.map((music) => ({
        id_music: music.id_music,
        id_album: saveAlbum.id_album,
        index_order: music.index_order,
      }));
      await this.musicAlbumRepo.save(newMusicAlbumRecords);
    }

    return { newID: saveAlbum.id_album };
  }

  async findAll(
    req: any,
    limit: number,
    offset: number,
    id_album: string,
    id_artist: string,
    name: string,
    slug: string,
    publish_by: string,
    is_show: 0 | 1
  ) {
    const album = this.albumRepo
      .createQueryBuilder("album")
      .leftJoinAndSelect("album.artist", "artist")
      .leftJoinAndSelect("album.musics", "musics")
      .leftJoinAndSelect("musics.music", "music");

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

    getByParam("album.id_album", id_album, album);
    getByParam("album.id_artist", id_artist, album);
    getByParam("album.name", name, album, true);
    getByParam("album.slug", slug, album);
    getByParam("album.publish_by", publish_by, album, true);
    getByParam("album.is_show", is_show, album);

    // Apply visible rows by role
    req?.user?.role !== "admin" && album.andWhere("album.is_show = 1", {});

    // Apply limit and offset
    limit && album.take(limit);
    offset && album.skip(offset);

    let result: any[] = await album.getMany();

    result.map((i) => {
      i.musics = i.musics.map((music) => {
        return {
          index_order: music.index_order,
          ...music.music,
        };
      });
    });

    return { data: result };
  }

  async findOne(id: string) {
    const album = this.albumRepo
      .createQueryBuilder("album")
      .leftJoinAndSelect("album.artist", "artist")
      .leftJoinAndSelect("album.musics", "musics")
      .leftJoinAndSelect("musics.music", "music")
      .leftJoinAndSelect("music.artists", "mad")
      .leftJoinAndSelect("mad.artist", "am")
      .leftJoinAndSelect("music.id_composer", "composer")
      .andWhere("album.id_album = :id_album", { id_album: id });

    const result: any = await album.getOne();
    if (!result) throw new NotFoundException("Album not found");

    result.musics = result.musics.map((music) => {
      return {
        index_order: music.index_order,
        ...music.music,
      };
    });

    return { data: result };
  }

  async update(id_album: string, body: UpdateAlbumDto) {
    const {
      id_artist,
      name,
      slug,
      url_cover,
      release_date,
      publish_by,
      is_show,
      musics,
    } = body;

    // Check if album exists
    const existingAlbum = await this.albumRepo.findOne({ where: { id_album } });
    if (!existingAlbum) throw new NotFoundException("Album not found");

    // Check unique slug
    if (slug && slug !== existingAlbum.slug) {
      const albumWithSlug = await this.albumRepo.find({ where: { slug } });
      if (albumWithSlug.length !== 0)
        throw new ConflictException("Slug already exists");
    }

    // Check existing artist
    if (id_artist) {
      const artist = await this.artistRepo
        .createQueryBuilder("artist")
        .select(["artist.id_artist"])
        .andWhere("artist.id_artist = :id_artist", { id_artist })
        .getOne();

      if (!artist) throw new NotFoundException("Artist not found");
    }

    // Check existing musics
    if (musics && musics.length > 0) {
      const validMusics = await this.musicRepo
        .createQueryBuilder("music")
        .select(["music.id_music"])
        .andWhere(
          `music.id_music in ('${musics.map((music) => music.id_music).join("', '")}')`
        )
        .getMany();

      if (validMusics.length !== musics.length)
        throw new NotFoundException("Music not found");
    }

    // Update album in the database
    const updatedAlbum = this.albumRepo.merge(existingAlbum, {
      id_artist,
      name,
      slug,
      url_cover,
      release_date,
      publish_by,
      is_show,
    });

    await this.albumRepo.save(updatedAlbum);
    await this.musicAlbumRepo.delete({ id_album });

    const newMusicAlbumRecords = musics.map((music) => ({
      id_music: music.id_music,
      id_album,
      index_order: music.index_order,
    }));

    // Save records
    await this.musicAlbumRepo.save(newMusicAlbumRecords);

    return { message: "Update successfully" };
  }

  async remove(id_album: string) {
    // Check if album exists
    const album = await this.albumRepo.findOne({ where: { id_album } });
    if (!album) throw new NotFoundException("Album not found");

    // Delete the album
    await this.albumRepo.delete(id_album);

    return { message: "Album deleted successfully" };
  }
}
