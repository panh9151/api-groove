"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicService = void 0;
const Type_entity_1 = require("./../../api-entity/Type.entity");
const Artist_entity_1 = require("./../../api-entity/Artist.entity");
const MusicTypeDetail_entity_1 = require("./../../api-entity/MusicTypeDetail.entity");
const MusicArtist_entity_1 = require("./../../api-entity/MusicArtist.entity");
const Lyrics_entity_1 = require("./../../api-entity/Lyrics.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Music_entity_1 = require("../../api-entity/Music.entity");
let MusicService = class MusicService {
    constructor(musicRepository, lyricsRepository, musicArtistRepo, musicTypeRepo, artistRepo, typeRepo) {
        this.musicRepository = musicRepository;
        this.lyricsRepository = lyricsRepository;
        this.musicArtistRepo = musicArtistRepo;
        this.musicTypeRepo = musicTypeRepo;
        this.artistRepo = artistRepo;
        this.typeRepo = typeRepo;
    }
    async create(body) {
        if (body.artists && body.artists.length > 0) {
            const artistList = await this.artistRepo
                .createQueryBuilder("artist")
                .select(["artist.id_artist"])
                .orWhere(`artist.id_artist in ('${body.artists.join("', '")}')`)
                .getMany();
            if (artistList.length !== body.artists.length) {
                throw new common_1.NotFoundException("Artists not found");
            }
        }
        if (body.types && body.types.length > 0) {
            const typeList = await this.typeRepo
                .createQueryBuilder("type")
                .select(["type.id_type"])
                .orWhere(`type.id_type in ('${body.types.join("', '")}')`)
                .getMany();
            if (typeList.length !== body.types.length) {
                throw new common_1.NotFoundException("Types not found");
            }
        }
        if (body.slug) {
            const musicByslug = await this.musicRepository
                .createQueryBuilder("music")
                .select("music.id_music")
                .andWhere("music.slug = :slug", { slug: body.slug })
                .getMany();
            if (musicByslug.length !== 0) {
                throw new common_1.ConflictException("Music's slug already existed");
            }
        }
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
        if (body.artists && body.artists.length > 0) {
            const artistsToAdd = body.artists.map(async (artist) => {
                const newArtist = this.musicArtistRepo.create({
                    id_artist: artist,
                    id_music: saveMusic.id_music,
                });
                await this.musicArtistRepo.save(newArtist);
            });
        }
        if (body.types && body.types.length > 0) {
            const typesToAdd = body.types.map(async (type) => {
                const newType = this.musicTypeRepo.create({
                    id_type: type,
                    id_music: saveMusic.id_music,
                });
                await this.musicTypeRepo.save(newType);
            });
        }
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
    async findAll(limit, offset, id_music, name, slug, total_duration, producer, composer, is_show, id_type, id_artist, req) {
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
            .leftJoin("music.musicHistories", "mh")
            .leftJoin("music.favoriteMusics", "fm")
            .leftJoin("music.artists", "mad")
            .leftJoin("mad.artist", "a")
            .leftJoin("music.types", "mtd")
            .leftJoin("mtd.type", "ty")
            .leftJoin("music.lyrics", "lyrics");
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
        req?.user?.role !== "admin" && musicRepo.andWhere("music.is_show = 1", {});
        musicRepo.groupBy("music.id_music");
        limit && musicRepo.take(limit);
        offset && musicRepo.skip(offset);
        const musics = await musicRepo.getRawMany();
        musics.map((music) => {
            music.favorite = +music.favorite;
            music.view = +music.view;
            music.types = JSON.parse(music.types);
            music.artists = JSON.parse(music.artists);
            music.lyrics = JSON.parse(music.lyrics);
            if (music.artists &&
                music.artists.length === 1 &&
                Object.values(music.artists[0]).every((value) => value === null || value === 0)) {
                music.artists = [];
            }
            if (music.types &&
                music.types.length === 1 &&
                Object.values(music.types[0]).every((value) => value === null || value === 0)) {
                music.types = [];
            }
            if (music.lyrics &&
                music.lyrics.length === 1 &&
                Object.values(music.lyrics[0]).every((value) => value === null || value === 0)) {
                music.lyrics = [];
            }
        });
        return musics;
    }
    async findOne(id, req) {
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
            .leftJoin("music.musicHistories", "mh")
            .leftJoin("music.favoriteMusics", "fm")
            .leftJoin("music.artists", "mad")
            .leftJoin("mad.artist", "a")
            .leftJoin("music.types", "mtd")
            .leftJoin("mtd.type", "ty")
            .leftJoin("music.lyrics", "lyrics")
            .andWhere("music.id_music = :id_music", { id_music: id });
        req?.user?.role !== "admin" && musicRepo.andWhere("music.is_show = 1", {});
        const music = await musicRepo.getRawOne();
        music.favorite = +music.favorite;
        music.view = +music.view;
        music.types = JSON.parse(music.types);
        music.artists = JSON.parse(music.artists);
        music.lyrics = JSON.parse(music.lyrics);
        if (music.artists &&
            music.artists.length === 1 &&
            Object.values(music.artists[0]).every((value) => value === null || value === 0)) {
            music.artists = [];
        }
        if (music.types &&
            music.types.length === 1 &&
            Object.values(music.types[0]).every((value) => value === null || value === 0)) {
            music.types = [];
        }
        if (music.lyrics &&
            music.lyrics.length === 1 &&
            Object.values(music.lyrics[0]).every((value) => value === null || value === 0)) {
            music.lyrics = [];
        }
        return music;
    }
    async update(id, body) {
        const music = await this.musicRepository.findOne({
            where: { id_music: id },
        });
        if (!music) {
            throw new common_1.NotFoundException("Music not found");
        }
        if (body.artists && body.artists.length > 0) {
            const artistList = await this.artistRepo
                .createQueryBuilder("artist")
                .select(["artist.id_artist"])
                .orWhere(`artist.id_artist in ('${body.artists.join("', '")}')`)
                .getMany();
            if (artistList.length !== body.artists.length) {
                throw new common_1.NotFoundException("Artists not found");
            }
        }
        if (body.types && body.types.length > 0) {
            const typeList = await this.typeRepo
                .createQueryBuilder("type")
                .select(["type.id_type"])
                .orWhere(`type.id_type in ('${body.types.join("', '")}')`)
                .getMany();
            if (typeList.length !== body.types.length) {
                throw new common_1.NotFoundException("Types not found");
            }
        }
        if (body.slug && body.slug !== music.slug) {
            const musicBySlug = await this.musicRepository
                .createQueryBuilder("music")
                .select("music.id_music")
                .andWhere("music.slug = :slug", { slug: body.slug })
                .getOne();
            if (musicBySlug) {
                throw new common_1.ConflictException("Music's slug already existed");
            }
        }
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
    async remove(id) {
        const music = await this.musicRepository.findOne({
            where: { id_music: id },
        });
        if (!music) {
            throw new common_1.NotFoundException("Music not found");
        }
        await this.musicRepository.delete(id);
        return { message: "Music deleted successfully" };
    }
};
exports.MusicService = MusicService;
exports.MusicService = MusicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Music_entity_1.Music)),
    __param(1, (0, typeorm_1.InjectRepository)(Lyrics_entity_1.Lyrics)),
    __param(2, (0, typeorm_1.InjectRepository)(MusicArtist_entity_1.MusicArtist)),
    __param(3, (0, typeorm_1.InjectRepository)(MusicTypeDetail_entity_1.MusicTypeDetail)),
    __param(4, (0, typeorm_1.InjectRepository)(Artist_entity_1.Artist)),
    __param(5, (0, typeorm_1.InjectRepository)(Type_entity_1.Type)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MusicService);
//# sourceMappingURL=music.service.js.map