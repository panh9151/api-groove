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
exports.Follow = exports.ShowStatus = void 0;
const typeorm_1 = require("typeorm");
const artist_entity_1 = require("./artist.entity");
const User_entity_1 = require("../../../api-entity/User.entity");
var ShowStatus;
(function (ShowStatus) {
    ShowStatus[ShowStatus["HIDDEN"] = 0] = "HIDDEN";
    ShowStatus[ShowStatus["VISIBLE"] = 1] = "VISIBLE";
})(ShowStatus || (exports.ShowStatus = ShowStatus = {}));
let Follow = class Follow {
};
exports.Follow = Follow;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Follow.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Follow.prototype, "id_artist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => artist_entity_1.ArtistEntity, (artist) => artist.id_artist, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", artist_entity_1.ArtistEntity)
], Follow.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.id_user, { onDelete: "CASCADE" }),
    __metadata("design:type", User_entity_1.User)
], Follow.prototype, "user", void 0);
exports.Follow = Follow = __decorate([
    (0, typeorm_1.Entity)("Follow")
], Follow);
//# sourceMappingURL=follow.entity.js.map