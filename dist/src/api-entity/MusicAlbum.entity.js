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
exports.MusicAlbum = void 0;
const typeorm_1 = require("typeorm");
const Music_entity_1 = require("./Music.entity");
const Album_entity_1 = require("./Album.entity");
let MusicAlbum = class MusicAlbum {
};
exports.MusicAlbum = MusicAlbum;
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], MusicAlbum.prototype, "id_music", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], MusicAlbum.prototype, "id_album", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], MusicAlbum.prototype, "index_order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Music_entity_1.Music, (music) => music.musicAlbumDetail, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "id_music" }),
    __metadata("design:type", Music_entity_1.Music)
], MusicAlbum.prototype, "music", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Album_entity_1.Album, (album) => album.musics, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "id_album" }),
    __metadata("design:type", Album_entity_1.Album)
], MusicAlbum.prototype, "album", void 0);
exports.MusicAlbum = MusicAlbum = __decorate([
    (0, typeorm_1.Entity)("MusicAlbumDetail")
], MusicAlbum);
//# sourceMappingURL=MusicAlbum.entity.js.map