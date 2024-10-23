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
exports.ForgotPasswordService = void 0;
const User_entity_1 = require("./../../../api-entity/User.entity");
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const crypto = require("crypto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ForgotPasswordService = class ForgotPasswordService {
    constructor(mailerService, userRepository) {
        this.mailerService = mailerService;
        this.userRepository = userRepository;
    }
    async forgotPassword(email, req) {
        const resetToken = crypto.randomBytes(32).toString("hex");
        const tokenExpireTime = Date.now() + 300000;
        const userList = await this.userRepository.find({ where: { email } });
        if (userList.length !== 1) {
            throw new common_1.NotFoundException("Email not found");
        }
        const resetLink = `${req.protocol}://${req.get("host")}/reset-password/` + resetToken;
        await this.mailerService.sendMail({
            to: email,
            subject: "Reset Your Password",
            text: `We received a request to reset your password. If you made this request, please click the link below to reset your password. If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.\n\nReset link: ${resetLink}`,
        });
        const result = await this.userRepository.update({ email }, { reset_token: resetToken, reset_token_expired: tokenExpireTime });
        if (result.affected === 0) {
            throw new common_1.NotFoundException("User not found");
        }
        return {
            message: "Password reset email sent successfully.",
        };
    }
};
exports.ForgotPasswordService = ForgotPasswordService;
exports.ForgotPasswordService = ForgotPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        typeorm_2.Repository])
], ForgotPasswordService);
//# sourceMappingURL=forgot-password.service.js.map