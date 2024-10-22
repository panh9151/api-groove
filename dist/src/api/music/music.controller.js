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
exports.MusicController = void 0;
const common_1 = require("@nestjs/common");
const music_service_1 = require("./music.service");
const create_music_dto_1 = require("./dto/create-music.dto");
const update_music_dto_1 = require("./dto/update-music.dto");
const admin_guard_1 = require("../../guard/admin/admin.guard");
let MusicController = class MusicController {
    constructor(musicService) {
        this.musicService = musicService;
    }
    create(body) {
        return this.musicService.create(body);
    }
    findAll(limit, offset, id_music, name, slug, total_duration, producer, composer, is_show, id_type, id_artist, req) {
        return this.musicService.findAll(limit, offset, id_music, name, slug, total_duration, producer, composer, is_show, id_type, id_artist, req);
    }
    findOne(id, req) {
        return this.musicService.findOne(id, req);
    }
    update(id, updateMusicDto) {
        return this.musicService.update(id, updateMusicDto);
    }
    remove(id) {
        return this.musicService.remove(id);
    }
};
exports.MusicController = MusicController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_music_dto_1.CreateMusicDto]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("limit")),
    __param(1, (0, common_1.Query)("offset")),
    __param(2, (0, common_1.Query)("id_music")),
    __param(3, (0, common_1.Query)("name")),
    __param(4, (0, common_1.Query)("slug")),
    __param(5, (0, common_1.Query)("total_duration")),
    __param(6, (0, common_1.Query)("producer")),
    __param(7, (0, common_1.Query)("composer")),
    __param(8, (0, common_1.Query)("is_show")),
    __param(9, (0, common_1.Query)("id_type")),
    __param(10, (0, common_1.Query)("id_artist")),
    __param(11, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_music_dto_1.UpdateMusicDto]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "remove", null);
exports.MusicController = MusicController = __decorate([
    (0, common_1.Controller)("music"),
    __metadata("design:paramtypes", [music_service_1.MusicService])
], MusicController);
//# sourceMappingURL=music.controller.js.map