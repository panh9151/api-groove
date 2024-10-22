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
exports.Album = void 0;
const typeorm_1 = require("typeorm");
const Artist_entity_1 = require("./Artist.entity");
const MusicAlbum_entity_1 = require("./MusicAlbum.entity");
let Album = class Album {
};
exports.Album = Album;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Album.prototype, "id_album", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Album.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, unique: true }),
    __metadata("design:type", String)
], Album.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Album.prototype, "url_cover", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Album.prototype, "release_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Album.prototype, "publish_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], Album.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Album.prototype, "last_update", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "tinyint", default: 1 }),
    __metadata("design:type", Number)
], Album.prototype, "is_show", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Album.prototype, "id_artist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Artist_entity_1.Artist, (artist) => artist.albums, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "id_artist" }),
    __metadata("design:type", Artist_entity_1.Artist)
], Album.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MusicAlbum_entity_1.MusicAlbum, (musicAlbum) => musicAlbum.album),
    __metadata("design:type", Array)
], Album.prototype, "musics", void 0);
exports.Album = Album = __decorate([
    (0, typeorm_1.Entity)("Album")
], Album);
//# sourceMappingURL=Album.entity.js.map