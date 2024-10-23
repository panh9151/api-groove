"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicModule = void 0;
const MusicArtist_entity_1 = require("./../../api-entity/MusicArtist.entity");
const Type_entity_1 = require("./../../api-entity/Type.entity");
const Artist_entity_1 = require("./../../api-entity/Artist.entity");
const MusicTypeDetail_entity_1 = require("./../../api-entity/MusicTypeDetail.entity");
const Lyrics_entity_1 = require("./../../api-entity/Lyrics.entity");
const Music_entity_1 = require("./../../api-entity/Music.entity");
const common_1 = require("@nestjs/common");
const music_service_1 = require("./music.service");
const music_controller_1 = require("./music.controller");
const typeorm_1 = require("@nestjs/typeorm");
let MusicModule = class MusicModule {
};
exports.MusicModule = MusicModule;
exports.MusicModule = MusicModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                Music_entity_1.Music,
                Lyrics_entity_1.Lyrics,
                MusicArtist_entity_1.MusicArtist,
                MusicTypeDetail_entity_1.MusicTypeDetail,
                Artist_entity_1.Artist,
                Type_entity_1.Type,
            ]),
        ],
        controllers: [music_controller_1.MusicController],
        providers: [music_service_1.MusicService],
    })
], MusicModule);
//# sourceMappingURL=music.module.js.map