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
exports.Follow = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Artist_entity_1 = require("./Artist.entity");
let Follow = class Follow {
};
exports.Follow = Follow;
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Follow.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Follow.prototype, "id_artist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.id_user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "id_user" }),
    __metadata("design:type", User_entity_1.User)
], Follow.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Artist_entity_1.Artist, (artist) => artist.id_artist, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "id_artist" }),
    __metadata("design:type", Artist_entity_1.Artist)
], Follow.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Follow.prototype, "created_at", void 0);
exports.Follow = Follow = __decorate([
    (0, typeorm_1.Entity)("Follow")
], Follow);
//# sourceMappingURL=Follow.entity.js.map