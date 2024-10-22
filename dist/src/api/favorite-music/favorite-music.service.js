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
exports.FavoriteMusicService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Music_entity_1 = require("../../api-entity/Music.entity");
const FavoriteMusic_entity_1 = require("../../api-entity/FavoriteMusic.entity");
let FavoriteMusicService = class FavoriteMusicService {
    constructor(musicRepo, favoriteRepo) {
        this.musicRepo = musicRepo;
        this.favoriteRepo = favoriteRepo;
    }
    async create(body, req) {
        const id_user = req.user.id_user;
        const { id_music } = body;
        const existingMusic = await this.musicRepo.find({ where: { id_music } });
        if (!existingMusic || existingMusic.length !== 1)
            throw new common_1.NotFoundException("Music not found");
        const existingFavoriteMusic = await this.favoriteRepo.find({
            where: { id_user, id_music },
        });
        if (!existingFavoriteMusic || existingFavoriteMusic.length !== 0)
            throw new common_1.NotFoundException("The music is already in your favorites");
        const favoriteMusic = this.favoriteRepo.create({
            id_user,
            id_music,
        });
        await this.favoriteRepo.save(favoriteMusic);
        return { message: "Music favorited successfully" };
    }
    async findAll(limit, offset, req) {
        const id_user = req.user.id_user;
        const favoriteMusicRepo = this.favoriteRepo
            .createQueryBuilder("fa")
            .leftJoinAndSelect("fa.music", "music")
            .leftJoinAndSelect("music.artists", "mad")
            .leftJoinAndSelect("mad.artist", "artist")
            .leftJoinAndSelect("music.types", "mtd")
            .leftJoinAndSelect("mtd.type", "type")
            .leftJoinAndSelect("music.lyrics", "lyrics")
            .andWhere("fa.id_user = :id_user", { id_user })
            .andWhere("music.is_show = 1");
        if (limit) {
            favoriteMusicRepo.take(limit);
        }
        if (offset) {
            favoriteMusicRepo.skip(offset);
        }
        let favoriteMusicList = await favoriteMusicRepo.getMany();
        favoriteMusicList = favoriteMusicList.map((music) => {
            const last_update = music.music.last_update;
            const artists = music.music.artists.map((artist) => artist.artist);
            const types = music.music.types.map((type) => type.type);
            delete music.music.artists;
            delete music.music.types;
            return {
                last_update,
                artists,
                types,
                ...music.music,
            };
        });
        return { data: favoriteMusicList };
    }
    async remove(req, body) {
        const id_user = req.user.id_user;
        const { id_music } = body;
        const existingFavoriteMusic = await this.favoriteRepo.find({
            where: { id_user, id_music },
        });
        if (existingFavoriteMusic.length !== 1) {
            throw new common_1.NotFoundException("The music is not in your favorites");
        }
        await this.favoriteRepo.delete({ id_user, id_music });
        return { message: "Music unfavorited successfully" };
    }
};
exports.FavoriteMusicService = FavoriteMusicService;
exports.FavoriteMusicService = FavoriteMusicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Music_entity_1.Music)),
    __param(1, (0, typeorm_1.InjectRepository)(FavoriteMusic_entity_1.FavoriteMusic)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FavoriteMusicService);
//# sourceMappingURL=favorite-music.service.js.map