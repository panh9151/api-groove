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
exports.MusicHistoryController = void 0;
const common_1 = require("@nestjs/common");
const music_history_service_1 = require("./music-history.service");
const create_music_history_dto_1 = require("./dto/create-music-history.dto");
const user_guard_1 = require("../../guard/user/user.guard");
let MusicHistoryController = class MusicHistoryController {
    constructor(musicHistoryService) {
        this.musicHistoryService = musicHistoryService;
    }
    create(req, body) {
        return this.musicHistoryService.create(req, body);
    }
    findAll(req, limit, offset, id_music_history, id_music, play_duration) {
        return this.musicHistoryService.findAll(req, +limit, +offset, id_music_history, id_music, play_duration);
    }
};
exports.MusicHistoryController = MusicHistoryController;
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.Post)("me"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_music_history_dto_1.CreateMusicHistoryDto]),
    __metadata("design:returntype", void 0)
], MusicHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.Get)("me"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("offset")),
    __param(3, (0, common_1.Query)("id_music_history")),
    __param(4, (0, common_1.Query)("id_music")),
    __param(5, (0, common_1.Query)("play_duration")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], MusicHistoryController.prototype, "findAll", null);
exports.MusicHistoryController = MusicHistoryController = __decorate([
    (0, common_1.Controller)("music-history"),
    __metadata("design:paramtypes", [music_history_service_1.MusicHistoryService])
], MusicHistoryController);
//# sourceMappingURL=music-history.controller.js.map