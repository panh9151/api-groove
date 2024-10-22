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
exports.AlbumController = void 0;
const common_1 = require("@nestjs/common");
const album_service_1 = require("./album.service");
const create_album_dto_1 = require("./dto/create-album.dto");
const update_album_dto_1 = require("./dto/update-album.dto");
const admin_guard_1 = require("../../guard/admin/admin.guard");
let AlbumController = class AlbumController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    findAll(req, limit, offset, id_album, id_artist, name, slug, publish_by, is_show) {
        return this.albumService.findAll(req, +limit, +offset, id_album, id_artist, name, slug, publish_by, is_show);
    }
    findOne(id) {
        return this.albumService.findOne(id);
    }
    create(createAlbumDto) {
        return this.albumService.create(createAlbumDto);
    }
    update(id, body) {
        return this.albumService.update(id, body);
    }
    remove(id) {
        return this.albumService.remove(id);
    }
};
exports.AlbumController = AlbumController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("offset")),
    __param(3, (0, common_1.Query)("id_album")),
    __param(4, (0, common_1.Query)("id_artist")),
    __param(5, (0, common_1.Query)("name")),
    __param(6, (0, common_1.Query)("slug")),
    __param(7, (0, common_1.Query)("publish_by")),
    __param(8, (0, common_1.Query)("is_show")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String, String, Number]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_album_dto_1.CreateAlbumDto]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_album_dto_1.UpdateAlbumDto]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "remove", null);
exports.AlbumController = AlbumController = __decorate([
    (0, common_1.Controller)("album"),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], AlbumController);
//# sourceMappingURL=album.controller.js.map