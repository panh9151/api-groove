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
exports.VerifyEmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const typeorm_1 = require("@nestjs/typeorm");
const verify_email_entity_1 = require("./entities/verify-email.entity");
const typeorm_2 = require("typeorm");
let VerifyEmailService = class VerifyEmailService {
    constructor(mailerService, verifyEmailRepository) {
        this.mailerService = mailerService;
        this.verifyEmailRepository = verifyEmailRepository;
    }
    async verifyEmail(body) {
        const { email } = body;
        const userList = await this.verifyEmailRepository.find({
            where: { email },
        });
        if (userList.length !== 0)
            throw new common_1.ConflictException("Email is already exist");
        const randomCode = Math.floor(100000 + Math.random() * 900000);
        await this.mailerService.sendMail({
            to: email,
            subject: `${randomCode} - Confirm Your Email Address`,
            text: `We have received your account registration request with this email address. To complete the registration process, please confirm your email address by entering the verification code. \n\nVerification code: ${randomCode}`,
        });
        return { message: "Verify code sended" };
    }
};
exports.VerifyEmailService = VerifyEmailService;
exports.VerifyEmailService = VerifyEmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(verify_email_entity_1.VerifyEmailEntity)),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        typeorm_2.Repository])
], VerifyEmailService);
//# sourceMappingURL=verify-email.service.js.map