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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistController = void 0;
const common_1 = require("@nestjs/common");
const artist_service_1 = require("./artist.service");
const create_artist_dto_1 = require("./dto/create-artist.dto");
const update_artist_dto_1 = require("./dto/update-artist.dto");
const admin_guard_1 = require("../../guard/admin/admin.guard");
const find_query_dto_1 = require("./dto/find-query.dto");
let ArtistController = class ArtistController {
    constructor(artistService) {
        this.artistService = artistService;
    }
    create(createArtistDto) {
        return this.artistService.create(createArtistDto);
    }
    findAll(req, limit, offset, id_artist, slug, name, is_show) {
        const count = { limit, offset };
        const query = {
            id_artist,
            slug,
            name,
            is_show,
        };
        return this.artistService.findAll(req, count, query);
    }
    findOne(req, id) {
        return this.artistService.findOne(req, id);
    }
    update(id, updateArtistDto) {
        return this.artistService.update(id, updateArtistDto);
    }
    remove(id) {
        return this.artistService.remove(id);
    }
};
exports.ArtistController = ArtistController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_artist_dto_1.CreateArtistDto]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("offset")),
    __param(3, (0, common_1.Query)("id_artist")),
    __param(4, (0, common_1.Query)("slug")),
    __param(5, (0, common_1.Query)("name")),
    __param(6, (0, common_1.Query)("is_show")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, Number]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_artist_dto_1.UpdateArtistDto]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "remove", null);
exports.ArtistController = ArtistController = __decorate([
    (0, common_1.Controller)("artist"),
    __metadata("design:paramtypes", [artist_service_1.ArtistService])
], ArtistController);
//# sourceMappingURL=artist.controller.js.map