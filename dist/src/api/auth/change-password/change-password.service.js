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
exports.ChangePasswordService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const change_password_entity_1 = require("./entities/change-password.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let ChangePasswordService = class ChangePasswordService {
    constructor(changePasswordEntity) {
        this.changePasswordEntity = changePasswordEntity;
    }
    async changePassword(req, body) {
        const id = req?.user?.id_user;
        const { newPassword, oldPassword } = body;
        if (!id)
            throw new common_1.UnauthorizedException();
        if (newPassword == oldPassword)
            throw new common_1.BadRequestException("New password and old password are the same");
        const match = await bcrypt.compare(oldPassword, req.user.password);
        if (match) {
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            const user = await this.changePasswordEntity.findOne({
                where: { id_user: id },
            });
            this.changePasswordEntity.update(id, { password: hashedPassword });
            return { message: "Change password successfully" };
        }
        else
            throw new common_1.BadRequestException("Wrong password");
    }
};
exports.ChangePasswordService = ChangePasswordService;
exports.ChangePasswordService = ChangePasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(change_password_entity_1.ChangePasswordEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ChangePasswordService);
//# sourceMappingURL=change-password.service.js.map