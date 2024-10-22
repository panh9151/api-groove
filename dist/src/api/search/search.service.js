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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Artist_entity_1 = require("../../api-entity/Artist.entity");
const Album_entity_1 = require("../../api-entity/Album.entity");
const Music_entity_1 = require("../../api-entity/Music.entity");
let SearchService = class SearchService {
    constructor(musicRepo, artistRepo, albumRepo) {
        this.musicRepo = musicRepo;
        this.artistRepo = artistRepo;
        this.albumRepo = albumRepo;
    }
    async findAll(req, search_text) {
        if (!search_text)
            throw new common_1.BadRequestException("Missing search_text");
        let role = req?.user?.role === "admin" ? "admin" : "user";
        const musicRepo = this.musicRepo
            .createQueryBuilder("music")
            .leftJoinAndSelect("music.lyrics", "lyrics")
            .leftJoinAndSelect("music.artists", "mad")
            .leftJoinAndSelect("mad.artist", "artist")
            .leftJoinAndSelect("music.types", "mtd")
            .leftJoinAndSelect("mtd.type", "type")
            .andWhere(`
        (
          (lyrics.lyrics LIKE CONCAT('%', '${search_text}', '%')
          OR lyrics.id_lyrics = '${search_text}'
          OR music.name LIKE CONCAT('%', '${search_text}', '%')
          OR music.id_music = '${search_text}')
        )
        `);
        role !== "admin" && musicRepo.andWhere("music.is_show = 1");
        const musicList = await musicRepo.getMany();
        musicList.map((music) => {
            music.artists = music.artists.map((artist) => {
                return artist.artist;
            });
            music.types = music.types.map((type) => {
                return type.type;
            });
        });
        const albumRepo = this.albumRepo
            .createQueryBuilder("album")
            .leftJoinAndSelect("album.artist", "artist")
            .leftJoinAndSelect("album.musics", "mad")
            .leftJoinAndSelect("mad.music", "music")
            .andWhere(`
          (album.name LIKE :search_text OR album.id_album = :_search_text
          OR artist.id_artist = :_search_text
          OR artist.name LIKE :search_text
          OR music.id_music = :_search_text
          OR music.name LIKE :search_text)
        `, { search_text: `%${search_text}%`, _search_text: search_text });
        role !== "admin" && albumRepo.andWhere("album.is_show = 1");
        const albumList = await albumRepo.getMany();
        albumList.map((album) => {
            album.musics = album.musics.map((music) => {
                return {
                    ...music.music,
                    index_order: music.index_order,
                };
            });
        });
        const artistRepo = this.artistRepo.createQueryBuilder("artist").andWhere(`
          (artist.name LIKE :search_text 
          OR artist.id_artist = :_search_text)
        `, { search_text: `%${search_text}%`, _search_text: search_text });
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
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Music_entity_1.Music)),
    __param(1, (0, typeorm_1.InjectRepository)(Artist_entity_1.Artist)),
    __param(2, (0, typeorm_1.InjectRepository)(Album_entity_1.Album)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map