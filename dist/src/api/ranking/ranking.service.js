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
exports.RankingService = void 0;
const Music_entity_1 = require("./../../api-entity/Music.entity");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
let RankingService = class RankingService {
    constructor(musicRepo) {
        this.musicRepo = musicRepo;
    }
    async findAll(limit, offset, duration) {
        if (!duration)
            throw new common_1.BadRequestException("Missing duration");
        if (!limit && limit !== 0)
            limit = 100;
        if (!offset && offset !== 0)
            offset = 0;
        const rankingMusicRepo = this.musicRepo
            .createQueryBuilder("music")
            .leftJoinAndSelect("music.musicHistories", "mh")
            .leftJoinAndSelect("music.favoriteMusics", "fm")
            .leftJoinAndSelect("music.artists", "mad")
            .leftJoinAndSelect("mad.artist", "a")
            .leftJoinAndSelect("music.types", "mtd")
            .leftJoinAndSelect("mtd.type", "ty")
            .leftJoinAndSelect("music.lyrics", "lyrics");
        if (duration === "day") {
            rankingMusicRepo.andWhere(`mh.created_at BETWEEN NOW() - INTERVAL 1 DAY AND NOW()`);
        }
        else if (duration === "week") {
            rankingMusicRepo.andWhere(`mh.created_at BETWEEN NOW() - INTERVAL 1 WEEK AND NOW()`);
        }
        else if (duration === "month") {
            rankingMusicRepo.andWhere(`mh.created_at BETWEEN NOW() - INTERVAL 1 MONTH AND NOW()`);
        }
        limit && rankingMusicRepo.take(limit);
        offset && rankingMusicRepo.skip(offset);
        let rankingMusicList = await rankingMusicRepo.getMany();
        rankingMusicList = rankingMusicList.map((music) => {
            const view = music.musicHistories.length;
            const favorite = music.favoriteMusics.length;
            delete music.musicHistories;
            delete music.favoriteMusics;
            music.types = music.types.map((type) => type.type);
            music.artists = music.artists.map((artist) => artist.artist);
            return {
                view,
                favorite,
                ...music,
            };
        });
        return { data: rankingMusicList };
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Music_entity_1.Music)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RankingService);
//# sourceMappingURL=ranking.service.js.map