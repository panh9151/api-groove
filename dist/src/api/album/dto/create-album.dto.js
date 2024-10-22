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
exports.CreateAlbumDto = exports.ShowStatus = void 0;
const class_validator_1 = require("class-validator");
const music_album_dto_1 = require("./music-album.dto");
const class_transformer_1 = require("class-transformer");
var ShowStatus;
(function (ShowStatus) {
    ShowStatus[ShowStatus["HIDDEN"] = 0] = "HIDDEN";
    ShowStatus[ShowStatus["VISIBLE"] = 1] = "VISIBLE";
})(ShowStatus || (exports.ShowStatus = ShowStatus = {}));
class CreateAlbumDto {
    constructor() {
        this.is_show = 1;
    }
}
exports.CreateAlbumDto = CreateAlbumDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "id_artist", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateAlbumDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAlbumDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAlbumDto.prototype, "url_cover", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAlbumDto.prototype, "release_date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAlbumDto.prototype, "publish_by", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(ShowStatus, { message: "is_show must be 0 or 1" }),
    __metadata("design:type", Number)
], CreateAlbumDto.prototype, "is_show", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => music_album_dto_1.MusicALbum),
    __metadata("design:type", Array)
], CreateAlbumDto.prototype, "musics", void 0);
//# sourceMappingURL=create-album.dto.js.map