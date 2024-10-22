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
exports.FavoriteMusicController = void 0;
const common_1 = require("@nestjs/common");
const favorite_music_service_1 = require("./favorite-music.service");
const favorite_music_dto_1 = require("./dto/favorite-music.dto");
const user_guard_1 = require("../../guard/user/user.guard");
let FavoriteMusicController = class FavoriteMusicController {
    constructor(favoriteMusicService) {
        this.favoriteMusicService = favoriteMusicService;
    }
    create(body, req) {
        return this.favoriteMusicService.create(body, req);
    }
    findAll(req, limit, offset) {
        return this.favoriteMusicService.findAll(+limit, +offset, req);
    }
    delete(req, body) {
        return this.favoriteMusicService.remove(req, body);
    }
};
exports.FavoriteMusicController = FavoriteMusicController;
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.Post)("me"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favorite_music_dto_1.CreateFavoriteMusicDto, Object]),
    __metadata("design:returntype", void 0)
], FavoriteMusicController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.Get)("me"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("offset")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], FavoriteMusicController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.Delete)("me"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, favorite_music_dto_1.CreateFavoriteMusicDto]),
    __metadata("design:returntype", void 0)
], FavoriteMusicController.prototype, "delete", null);
exports.FavoriteMusicController = FavoriteMusicController = __decorate([
    (0, common_1.Controller)("favorite-music"),
    __metadata("design:paramtypes", [favorite_music_service_1.FavoriteMusicService])
], FavoriteMusicController);
//# sourceMappingURL=favorite-music.controller.js.map