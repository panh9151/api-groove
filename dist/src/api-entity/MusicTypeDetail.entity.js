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
exports.MusicTypeDetail = void 0;
const typeorm_1 = require("typeorm");
const Music_entity_1 = require("./Music.entity");
const Type_entity_1 = require("./Type.entity");
let MusicTypeDetail = class MusicTypeDetail {
};
exports.MusicTypeDetail = MusicTypeDetail;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], MusicTypeDetail.prototype, "id_music", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], MusicTypeDetail.prototype, "id_type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Music_entity_1.Music, (music) => music.types),
    (0, typeorm_1.JoinColumn)({ name: "id_music" }),
    __metadata("design:type", Music_entity_1.Music)
], MusicTypeDetail.prototype, "music", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Type_entity_1.Type, (type) => type.music),
    (0, typeorm_1.JoinColumn)({ name: "id_type" }),
    __metadata("design:type", Type_entity_1.Type)
], MusicTypeDetail.prototype, "type", void 0);
exports.MusicTypeDetail = MusicTypeDetail = __decorate([
    (0, typeorm_1.Entity)("MusicTypeDetail")
], MusicTypeDetail);
//# sourceMappingURL=MusicTypeDetail.entity.js.map