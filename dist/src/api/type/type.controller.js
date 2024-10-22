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
exports.TypeController = void 0;
const common_1 = require("@nestjs/common");
const type_service_1 = require("./type.service");
const create_type_dto_1 = require("./dto/create-type.dto");
const update_type_dto_1 = require("./dto/update-type.dto");
const admin_guard_1 = require("../../guard/admin/admin.guard");
let TypeController = class TypeController {
    constructor(typeService) {
        this.typeService = typeService;
    }
    create(body) {
        return this.typeService.create(body);
    }
    async findAll(req, limit, offset, id_type, name, slug, is_show) {
        return this.typeService.findAll(limit, offset, id_type, name, slug, is_show, req);
    }
    findOne(req, id) {
        return this.typeService.findOne(id, req);
    }
    update(id, body) {
        return this.typeService.update(id, body);
    }
    remove(id) {
        return this.typeService.remove(id);
    }
};
exports.TypeController = TypeController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_type_dto_1.CreateTypeDto]),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("offset")),
    __param(3, (0, common_1.Query)("id_type")),
    __param(4, (0, common_1.Query)("name")),
    __param(5, (0, common_1.Query)("slug")),
    __param(6, (0, common_1.Query)("is_show")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, Number]),
    __metadata("design:returntype", Promise)
], TypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_type_dto_1.UpdateTypeDto]),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "remove", null);
exports.TypeController = TypeController = __decorate([
    (0, common_1.Controller)("type"),
    __metadata("design:paramtypes", [type_service_1.TypeService])
], TypeController);
//# sourceMappingURL=type.controller.js.map