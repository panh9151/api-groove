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
exports.Lyrics = void 0;
const typeorm_1 = require("typeorm");
const Music_entity_1 = require("./Music.entity");
const uuid_1 = require("uuid");
let Lyrics = class Lyrics {
    constructor() {
        this.id_lyrics = (0, uuid_1.v4)();
    }
};
exports.Lyrics = Lyrics;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Lyrics.prototype, "id_lyrics", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lyrics.prototype, "id_music", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Music_entity_1.Music, (music) => music.id_music, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "id_music" }),
    __metadata("design:type", Music_entity_1.Music)
], Lyrics.prototype, "music", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Lyrics.prototype, "lyrics", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Lyrics.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Lyrics.prototype, "end_time", void 0);
exports.Lyrics = Lyrics = __decorate([
    (0, typeorm_1.Entity)("Lyrics")
], Lyrics);
//# sourceMappingURL=Lyrics.entity.js.map