"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteMusicModule = void 0;
const FavoriteMusic_entity_1 = require("./../../api-entity/FavoriteMusic.entity");
const Music_entity_1 = require("./../../api-entity/Music.entity");
const common_1 = require("@nestjs/common");
const favorite_music_service_1 = require("./favorite-music.service");
const favorite_music_controller_1 = require("./favorite-music.controller");
const typeorm_1 = require("@nestjs/typeorm");
let FavoriteMusicModule = class FavoriteMusicModule {
};
exports.FavoriteMusicModule = FavoriteMusicModule;
exports.FavoriteMusicModule = FavoriteMusicModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([FavoriteMusic_entity_1.FavoriteMusic, Music_entity_1.Music])],
        controllers: [favorite_music_controller_1.FavoriteMusicController],
        providers: [favorite_music_service_1.FavoriteMusicService],
    })
], FavoriteMusicModule);
//# sourceMappingURL=favorite-music.module.js.map