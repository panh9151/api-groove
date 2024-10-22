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
exports.ResetPasswordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reset_password_entity_1 = require("./entities/reset-password.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
let ResetPasswordService = class ResetPasswordService {
    async resetPasword(body, token) {
        const { newPassword } = body;
        const userWithToken = await this.resetPasswordRepository
            .createQueryBuilder("user")
            .andWhere("user.reset_token = :reset_token", { reset_token: token })
            .andWhere("user.reset_token_expired > :reset_token_expired", {
            reset_token_expired: Date.now(),
        })
            .getOne();
        if (!userWithToken)
            throw new common_1.BadRequestException("Token not found or expired");
        const match = await bcrypt.compare(newPassword, userWithToken.password);
        if (match) {
            throw new common_1.ConflictException("New password and old password are the same");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        this.resetPasswordRepository.update({ id_user: userWithToken.id_user }, { reset_token: null, reset_token_expired: null, password: hashedPassword });
        return { message: "Reset password successfully" };
    }
};
exports.ResetPasswordService = ResetPasswordService;
__decorate([
    (0, typeorm_1.InjectRepository)(reset_password_entity_1.ResetPasswordEntity),
    __metadata("design:type", typeorm_2.Repository)
], ResetPasswordService.prototype, "resetPasswordRepository", void 0);
exports.ResetPasswordService = ResetPasswordService = __decorate([
    (0, common_1.Injectable)()
], ResetPasswordService);
//# sourceMappingURL=reset-password.service.js.map