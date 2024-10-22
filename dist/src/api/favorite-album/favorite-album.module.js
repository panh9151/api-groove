"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteAlbumModule = void 0;
const common_1 = require("@nestjs/common");
const favorite_album_service_1 = require("./favorite-album.service");
const favorite_album_controller_1 = require("./favorite-album.controller");
const typeorm_1 = require("@nestjs/typeorm");
const Album_entity_1 = require("../../api-entity/Album.entity");
const FavoriteAlbumDetail_entity_1 = require("../../api-entity/FavoriteAlbumDetail.entity");
let FavoriteAlbumModule = class FavoriteAlbumModule {
};
exports.FavoriteAlbumModule = FavoriteAlbumModule;
exports.FavoriteAlbumModule = FavoriteAlbumModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Album_entity_1.Album, FavoriteAlbumDetail_entity_1.FavoriteAlbumDetail])],
        controllers: [favorite_album_controller_1.FavoriteAlbumController],
        providers: [favorite_album_service_1.FavoriteAlbumService],
    })
], FavoriteAlbumModule);
//# sourceMappingURL=favorite-album.module.js.map