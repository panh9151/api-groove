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
exports.AlbumService = void 0;
const MusicAlbum_entity_1 = require("./../../api-entity/MusicAlbum.entity");
const Artist_entity_1 = require("./../../api-entity/Artist.entity");
const Music_entity_1 = require("./../../api-entity/Music.entity");
const Album_entity_1 = require("./../../api-entity/Album.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AlbumService = class AlbumService {
    constructor(albumRepo, musicRepo, artistRepo, musicAlbumRepo) {
        this.albumRepo = albumRepo;
        this.musicRepo = musicRepo;
        this.artistRepo = artistRepo;
        this.musicAlbumRepo = musicAlbumRepo;
    }
    async create(body) {
        const { id_artist, name, slug, url_cover, release_date, publish_by, is_show = 1, musics, } = body;
        if (slug) {
            const album = await this.albumRepo.find({ where: { slug } });
            if (album.length !== 0)
                throw new common_1.NotFoundException("slug already existed");
        }
        if (musics && musics.length > 0) {
            const music = await this.musicRepo
                .createQueryBuilder("music")
                .select(["music.id_music"])
                .andWhere(`music.id_music in ('${musics.map((music) => music.id_music).join("', '")}')`)
                .getMany();
            if (music.length !== musics.length)
                throw new common_1.NotFoundException("Music not found");
        }
        if (id_artist) {
            const artist = await this.artistRepo
                .createQueryBuilder("artist")
                .select(["artist.id_artist"])
                .andWhere("artist.id_artist = :id_artist", { id_artist })
                .getMany();
            if (artist.length !== 1)
                throw new common_1.NotFoundException("Artist not found");
        }
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
    async findAll(req, limit, offset, id_album, id_artist, name, slug, publish_by, is_show) {
        const album = this.albumRepo
            .createQueryBuilder("album")
            .leftJoinAndSelect("album.artist", "artist")
            .leftJoinAndSelect("album.musics", "musics")
            .leftJoinAndSelect("musics.music", "music");
        id_album &&
            album.andWhere("album.id_album = :id_album", { id_album: id_album });
        id_artist && album.andWhere("album.id_artist = :id_artist", { id_artist });
        name && album.andWhere("album.name like :name", { name: `%${name}%` });
        slug && album.andWhere("album.slug = :slug", { slug });
        publish_by &&
            album.andWhere("album.publish_by like :publish_by", {
                publish_by: `%${publish_by}%`,
            });
        is_show &&
            album.andWhere("album.is_show like :is_show", {
                is_show,
            });
        req?.user?.role !== "admin" && album.andWhere("album.is_show = 1", {});
        limit && album.take(limit);
        offset && album.skip(offset);
        let result = await album.getMany();
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
    async findOne(id) {
        const album = this.albumRepo
            .createQueryBuilder("album")
            .leftJoinAndSelect("album.artist", "artist")
            .leftJoinAndSelect("album.musics", "musics")
            .leftJoinAndSelect("musics.music", "music")
            .andWhere("album.id_album = :id_album", { id_album: id });
        const result = await album.getOne();
        if (!result)
            throw new common_1.NotFoundException("Album not found");
        result.musics = result.musics.map((music) => {
            return {
                index_order: music.index_order,
                ...music.music,
            };
        });
        return { data: result };
    }
    async update(id_album, body) {
        const { id_artist, name, slug, url_cover, release_date, publish_by, is_show, musics, } = body;
        const existingAlbum = await this.albumRepo.findOne({ where: { id_album } });
        if (!existingAlbum)
            throw new common_1.NotFoundException("Album not found");
        if (slug && slug !== existingAlbum.slug) {
            const albumWithSlug = await this.albumRepo.find({ where: { slug } });
            if (albumWithSlug.length !== 0)
                throw new common_1.NotFoundException("Slug already exists");
        }
        if (id_artist) {
            const artist = await this.artistRepo
                .createQueryBuilder("artist")
                .select(["artist.id_artist"])
                .andWhere("artist.id_artist = :id_artist", { id_artist })
                .getOne();
            if (!artist)
                throw new common_1.NotFoundException("Artist not found");
        }
        if (musics && musics.length > 0) {
            const validMusics = await this.musicRepo
                .createQueryBuilder("music")
                .select(["music.id_music"])
                .andWhere(`music.id_music in ('${musics.map((music) => music.id_music).join("', '")}')`)
                .getMany();
            if (validMusics.length !== musics.length)
                throw new common_1.NotFoundException("Music not found");
        }
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
        await this.musicAlbumRepo.save(newMusicAlbumRecords);
        return { message: "Update successfully" };
    }
    async remove(id_album) {
        const album = await this.albumRepo.findOne({ where: { id_album } });
        if (!album)
            throw new common_1.NotFoundException("Album not found");
        await this.albumRepo.delete(id_album);
        return { message: "Album deleted successfully" };
    }
};
exports.AlbumService = AlbumService;
exports.AlbumService = AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Album_entity_1.Album)),
    __param(1, (0, typeorm_1.InjectRepository)(Music_entity_1.Music)),
    __param(2, (0, typeorm_1.InjectRepository)(Artist_entity_1.Artist)),
    __param(3, (0, typeorm_1.InjectRepository)(MusicAlbum_entity_1.MusicAlbum)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AlbumService);
//# sourceMappingURL=album.service.js.map