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
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const follow_service_1 = require("./follow.service");
const create_follow_dto_1 = require("./dto/create-follow.dto");
const update_follow_dto_1 = require("./dto/update-follow.dto");
const user_guard_1 = require("../../guard/user/user.guard");
let FollowController = class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    createForUser(req, body) {
        return this.followService.create(body, req);
    }
    getForArtist(limit, offset, id_artist) {
        return this.followService.findByArtist(limit, offset, id_artist);
    }
    getForUser(req) {
        return this.followService.findByUser(req);
    }
    removeForUser(req, body) {
        return this.followService.remove(body, req);
    }
};
exports.FollowController = FollowController;
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.Post)("me"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_follow_dto_1.CreateFollowDto]),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "createForUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("limit")),
    __param(1, (0, common_1.Query)("offset")),
    __param(2, (0, common_1.Query)("id_artist")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "getForArtist", null);
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.Get)("me"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "getForUser", null);
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.Delete)("me"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_follow_dto_1.UpdateFollowDto]),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "removeForUser", null);
exports.FollowController = FollowController = __decorate([
    (0, common_1.Controller)("follow"),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
//# sourceMappingURL=follow.controller.js.map