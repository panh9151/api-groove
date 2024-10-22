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
exports.Type = void 0;
const typeorm_1 = require("typeorm");
const MusicTypeDetail_entity_1 = require("./MusicTypeDetail.entity");
let Type = class Type {
};
exports.Type = Type;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Type.prototype, "id_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Type.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, unique: true }),
    __metadata("design:type", String)
], Type.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], Type.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "tinyint", default: 1 }),
    __metadata("design:type", Number)
], Type.prototype, "is_show", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MusicTypeDetail_entity_1.MusicTypeDetail, (musicTypeDetail) => musicTypeDetail.type),
    __metadata("design:type", Array)
], Type.prototype, "music", void 0);
exports.Type = Type = __decorate([
    (0, typeorm_1.Entity)("Type"),
    (0, typeorm_1.Unique)(["slug"])
], Type);
//# sourceMappingURL=Type.entity.js.map