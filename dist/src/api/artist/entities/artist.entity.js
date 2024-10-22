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
exports.ArtistEntity = exports.ShowStatus = void 0;
const typeorm_1 = require("typeorm");
var ShowStatus;
(function (ShowStatus) {
    ShowStatus[ShowStatus["HIDDEN"] = 0] = "HIDDEN";
    ShowStatus[ShowStatus["VISIBLE"] = 1] = "VISIBLE";
})(ShowStatus || (exports.ShowStatus = ShowStatus = {}));
let ArtistEntity = class ArtistEntity {
};
exports.ArtistEntity = ArtistEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ArtistEntity.prototype, "id_artist", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ArtistEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ArtistEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ArtistEntity.prototype, "url_cover", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ArtistEntity.prototype, "last_update", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ArtistEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ShowStatus, default: ShowStatus.VISIBLE }),
    __metadata("design:type", Number)
], ArtistEntity.prototype, "is_show", void 0);
exports.ArtistEntity = ArtistEntity = __decorate([
    (0, typeorm_1.Entity)("Artist")
], ArtistEntity);
//# sourceMappingURL=artist.entity.js.map