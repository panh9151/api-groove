"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailModule = void 0;
const common_1 = require("@nestjs/common");
const verify_email_service_1 = require("./verify-email.service");
const verify_email_controller_1 = require("./verify-email.controller");
const mailer_1 = require("@nestjs-modules/mailer");
const typeorm_1 = require("@nestjs/typeorm");
const verify_email_entity_1 = require("./entities/verify-email.entity");
let VerifyEmailModule = class VerifyEmailModule {
};
exports.VerifyEmailModule = VerifyEmailModule;
exports.VerifyEmailModule = VerifyEmailModule = __decorate([
    (0, common_1.Module)({
        imports: [mailer_1.MailerModule, typeorm_1.TypeOrmModule.forFeature([verify_email_entity_1.VerifyEmailEntity])],
        controllers: [verify_email_controller_1.VerifyEmailController],
        providers: [verify_email_service_1.VerifyEmailService],
    })
], VerifyEmailModule);
//# sourceMappingURL=verify-email.module.js.map