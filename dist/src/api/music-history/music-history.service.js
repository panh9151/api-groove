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
exports.MusicHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const MusicHistory_entity_1 = require("../../api-entity/MusicHistory.entity");
const typeorm_2 = require("typeorm");
const Music_entity_1 = require("../../api-entity/Music.entity");
let MusicHistoryService = class MusicHistoryService {
    constructor(historyRepo, musicRepo) {
        this.historyRepo = historyRepo;
        this.musicRepo = musicRepo;
    }
    async create(req, body) {
        const id_user = req.user.id_user;
        const { id_music, play_duration } = body;
        const music = await this.musicRepo.find({ where: { id_music } });
        if (!music || music.length !== 1) {
            throw new common_1.NotFoundException("Music not found");
        }
        const newHistory = this.historyRepo.create({
            id_music,
            play_duration,
            id_user,
        });
        const saveHistory = await this.historyRepo.save(newHistory);
        return { newID: saveHistory.id_music_history };
    }
    async findAll(req, limit, offset, id_music_history, id_music, play_duration) {
        const id_user = req.user.id_user;
        const historyRepo = this.historyRepo
            .createQueryBuilder("history")
            .select([
            "history.id_music_history",
            "history.id_music",
            "history.play_duration",
            "history.created_at",
        ])
            .leftJoinAndSelect("history.music", "music")
            .andWhere("history.id_user = :id_user", { id_user })
            .andWhere("music.is_show = 1");
        id_music &&
            historyRepo.andWhere("music.id_music = :id_music", { id_music });
        id_music_history &&
            historyRepo.andWhere("history.id_music_history = :id_music_history", {
                id_music_history,
            });
        play_duration &&
            historyRepo.andWhere("history.play_duration = :play_duration", {
                play_duration,
            });
        limit && historyRepo.take(limit);
        offset && historyRepo.skip(offset);
        const history = await historyRepo.getMany();
        return { data: history };
    }
};
exports.MusicHistoryService = MusicHistoryService;
exports.MusicHistoryService = MusicHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(MusicHistory_entity_1.MusicHistory)),
    __param(1, (0, typeorm_1.InjectRepository)(Music_entity_1.Music)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MusicHistoryService);
//# sourceMappingURL=music-history.service.js.map