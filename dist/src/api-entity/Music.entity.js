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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
const typeorm_1 = require("typeorm");
const MusicTypeDetail_entity_1 = require("./MusicTypeDetail.entity");
const MusicHistory_entity_1 = require("./MusicHistory.entity");
const FavoriteMusic_entity_1 = require("./FavoriteMusic.entity");
const MusicArtist_entity_1 = require("./MusicArtist.entity");
const uuid_1 = require("uuid");
const MusicAlbum_entity_1 = require("./MusicAlbum.entity");
const Lyrics_entity_1 = require("./Lyrics.entity");
let Music = class Music {
    constructor() {
        this.id_music = (0, uuid_1.v4)();
    }
};
exports.Music = Music;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Music.prototype, "id_music", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Music.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, unique: true }),
    __metadata("design:type", String)
], Music.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Music.prototype, "url_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Music.prototype, "url_cover", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Music.prototype, "total_duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Music.prototype, "producer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Music.prototype, "composer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Music.prototype, "release_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], Music.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Music.prototype, "last_update", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "tinyint", default: 1 }),
    __metadata("design:type", Number)
], Music.prototype, "is_show", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MusicHistory_entity_1.MusicHistory, (musicHistory) => musicHistory.music),
    __metadata("design:type", Array)
], Music.prototype, "musicHistories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FavoriteMusic_entity_1.FavoriteMusic, (favoriteMusic) => favoriteMusic.music),
    __metadata("design:type", Array)
], Music.prototype, "favoriteMusics", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MusicArtist_entity_1.MusicArtist, (musicArtistDetail) => musicArtistDetail.music),
    __metadata("design:type", Array)
], Music.prototype, "artists", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MusicTypeDetail_entity_1.MusicTypeDetail, (musicTypeDetail) => musicTypeDetail.music),
    __metadata("design:type", Array)
], Music.prototype, "types", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MusicAlbum_entity_1.MusicAlbum, (musicAlbum) => musicAlbum.music),
    __metadata("design:type", Array)
], Music.prototype, "musicAlbumDetail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Lyrics_entity_1.Lyrics, (lyrics) => lyrics.music),
    __metadata("design:type", Array)
], Music.prototype, "lyrics", void 0);
exports.Music = Music = __decorate([
    (0, typeorm_1.Entity)("Music")
], Music);
//# sourceMappingURL=Music.entity.js.map