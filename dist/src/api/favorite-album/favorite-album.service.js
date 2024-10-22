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
exports.FavoriteAlbumService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Album_entity_1 = require("../../api-entity/Album.entity");
const typeorm_2 = require("typeorm");
const FavoriteAlbumDetail_entity_1 = require("../../api-entity/FavoriteAlbumDetail.entity");
let FavoriteAlbumService = class FavoriteAlbumService {
    constructor(albumRepo, favoriteRepo) {
        this.albumRepo = albumRepo;
        this.favoriteRepo = favoriteRepo;
    }
    async create(body, req) {
        const id_user = req.user.id_user;
        const { id_album } = body;
        const existingAlbum = await this.albumRepo.find({ where: { id_album } });
        if (!existingAlbum || existingAlbum.length !== 1)
            throw new common_1.NotFoundException("Album not found");
        const existingFavoriteAlbum = await this.favoriteRepo.find({
            where: { id_user, id_album },
        });
        if (!existingFavoriteAlbum || existingFavoriteAlbum.length !== 0)
            throw new common_1.NotFoundException("The album is already in your favorites");
        const favoriteAlbum = this.favoriteRepo.create({
            id_user,
            id_album,
        });
        await this.favoriteRepo.save(favoriteAlbum);
        return { message: "Album favorited successfully" };
    }
    async findAll(limit, offset, req) {
        const id_user = req.user.id_user;
        const favoriteAlbumRepo = this.favoriteRepo
            .createQueryBuilder("fa")
            .andWhere("fa.id_user = :id_user", { id_user })
            .leftJoinAndSelect("fa.album", "album")
            .leftJoinAndSelect("album.artist", "artist");
        if (limit) {
        }
        let favoriteAlbumList = await favoriteAlbumRepo.getMany();
        favoriteAlbumList = favoriteAlbumList.map((album) => {
            const last_update = album.last_update;
            return {
                last_update,
                ...album.album,
            };
        });
        return { data: favoriteAlbumList };
    }
    async remove(req, body) {
        const id_user = req.user.id_user;
        const { id_album } = body;
        const existingFavoriteAlbum = await this.favoriteRepo.find({
            where: { id_user, id_album },
        });
        if (existingFavoriteAlbum.length !== 1) {
            throw new common_1.NotFoundException("The album is not in your favorites");
        }
        await this.favoriteRepo.delete({ id_user, id_album });
        return { message: "Album unfavorited successfully" };
    }
};
exports.FavoriteAlbumService = FavoriteAlbumService;
exports.FavoriteAlbumService = FavoriteAlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Album_entity_1.Album)),
    __param(1, (0, typeorm_1.InjectRepository)(FavoriteAlbumDetail_entity_1.FavoriteAlbumDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FavoriteAlbumService);
//# sourceMappingURL=favorite-album.service.js.map