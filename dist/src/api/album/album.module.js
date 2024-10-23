"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumModule = void 0;
const MusicAlbum_entity_1 = require("./../../api-entity/MusicAlbum.entity");
const Music_entity_1 = require("./../../api-entity/Music.entity");
const Artist_entity_1 = require("./../../api-entity/Artist.entity");
const Album_entity_1 = require("./../../api-entity/Album.entity");
const common_1 = require("@nestjs/common");
const album_service_1 = require("./album.service");
const album_controller_1 = require("./album.controller");
const typeorm_1 = require("@nestjs/typeorm");
let AlbumModule = class AlbumModule {
};
exports.AlbumModule = AlbumModule;
exports.AlbumModule = AlbumModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Album_entity_1.Album, Artist_entity_1.Artist, Music_entity_1.Music, MusicAlbum_entity_1.MusicAlbum])],
        controllers: [album_controller_1.AlbumController],
        providers: [album_service_1.AlbumService],
    })
], AlbumModule);
//# sourceMappingURL=album.module.js.map