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
exports.FavoriteAlbumController = void 0;
const common_1 = require("@nestjs/common");
const favorite_album_service_1 = require("./favorite-album.service");
const favorite_album_dto_1 = require("./dto/favorite-album.dto");
const user_guard_1 = require("../../guard/user/user.guard");
let FavoriteAlbumController = class FavoriteAlbumController {
    constructor(favoriteAlbumService) {
        this.favoriteAlbumService = favoriteAlbumService;
    }
    create(body, req) {
        return this.favoriteAlbumService.create(body, req);
    }
    findAll(req, limit, offset) {
        return this.favoriteAlbumService.findAll(+limit, +offset, req);
    }
    delete(req, body) {
        return this.favoriteAlbumService.remove(req, body);
    }
};
exports.FavoriteAlbumController = FavoriteAlbumController;
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.Post)("me"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favorite_album_dto_1.CreateFavoriteAlbumDto, Object]),
    __metadata("design:returntype", void 0)
], FavoriteAlbumController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.Get)("me"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("offset")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], FavoriteAlbumController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.Delete)("me"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, favorite_album_dto_1.CreateFavoriteAlbumDto]),
    __metadata("design:returntype", void 0)
], FavoriteAlbumController.prototype, "delete", null);
exports.FavoriteAlbumController = FavoriteAlbumController = __decorate([
    (0, common_1.Controller)("favorite-album"),
    __metadata("design:paramtypes", [favorite_album_service_1.FavoriteAlbumService])
], FavoriteAlbumController);
//# sourceMappingURL=favorite-album.controller.js.map