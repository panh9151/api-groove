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
exports.FavoriteAlbumDetail = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Album_entity_1 = require("./Album.entity");
let FavoriteAlbumDetail = class FavoriteAlbumDetail {
};
exports.FavoriteAlbumDetail = FavoriteAlbumDetail;
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], FavoriteAlbumDetail.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], FavoriteAlbumDetail.prototype, "id_album", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.id_user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "id_user" }),
    __metadata("design:type", User_entity_1.User)
], FavoriteAlbumDetail.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Album_entity_1.Album, (album) => album.id_album, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "id_album" }),
    __metadata("design:type", Album_entity_1.Album)
], FavoriteAlbumDetail.prototype, "album", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], FavoriteAlbumDetail.prototype, "last_update", void 0);
exports.FavoriteAlbumDetail = FavoriteAlbumDetail = __decorate([
    (0, typeorm_1.Entity)("FavoriteAlbum")
], FavoriteAlbumDetail);
//# sourceMappingURL=FavoriteAlbumDetail.entity.js.map