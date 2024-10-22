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
exports.MusicHistory = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Music_entity_1 = require("./Music.entity");
let MusicHistory = class MusicHistory {
};
exports.MusicHistory = MusicHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], MusicHistory.prototype, "id_music_history", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MusicHistory.prototype, "id_music", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MusicHistory.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.id_user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "id_user" }),
    __metadata("design:type", User_entity_1.User)
], MusicHistory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Music_entity_1.Music, (music) => music.id_music, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "id_music" }),
    __metadata("design:type", Music_entity_1.Music)
], MusicHistory.prototype, "music", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], MusicHistory.prototype, "play_duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], MusicHistory.prototype, "created_at", void 0);
exports.MusicHistory = MusicHistory = __decorate([
    (0, typeorm_1.Entity)("MusicHistory")
], MusicHistory);
//# sourceMappingURL=MusicHistory.entity.js.map