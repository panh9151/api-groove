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
exports.Artist = void 0;
const typeorm_1 = require("typeorm");
const Album_entity_1 = require("./Album.entity");
let Artist = class Artist {
};
exports.Artist = Artist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Artist.prototype, "id_artist", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Artist.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, unique: true }),
    __metadata("design:type", String)
], Artist.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "url_cover", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], Artist.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Artist.prototype, "last_update", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "tinyint", default: 1 }),
    __metadata("design:type", Boolean)
], Artist.prototype, "is_show", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Album_entity_1.Album, (album) => album.artist),
    __metadata("design:type", Array)
], Artist.prototype, "albums", void 0);
exports.Artist = Artist = __decorate([
    (0, typeorm_1.Entity)("Artist")
], Artist);
//# sourceMappingURL=Artist.entity.js.map