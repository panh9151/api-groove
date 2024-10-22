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
exports.MusicPlaylistDetail = void 0;
const typeorm_1 = require("typeorm");
const Music_entity_1 = require("./Music.entity");
const Playlist_entity_1 = require("./Playlist.entity");
let MusicPlaylistDetail = class MusicPlaylistDetail {
};
exports.MusicPlaylistDetail = MusicPlaylistDetail;
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], MusicPlaylistDetail.prototype, "id_playlist", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], MusicPlaylistDetail.prototype, "id_music", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], MusicPlaylistDetail.prototype, "index_order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Playlist_entity_1.Playlist, (playlist) => playlist.id_playlist, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Playlist_entity_1.Playlist)
], MusicPlaylistDetail.prototype, "playlist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Music_entity_1.Music, (music) => music.id_music, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Music_entity_1.Music)
], MusicPlaylistDetail.prototype, "music", void 0);
exports.MusicPlaylistDetail = MusicPlaylistDetail = __decorate([
    (0, typeorm_1.Entity)("MusicPlaylistDetail")
], MusicPlaylistDetail);
//# sourceMappingURL=MusicPlaylist.js.map