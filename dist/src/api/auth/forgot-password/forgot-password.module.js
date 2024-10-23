"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordModule = void 0;
const User_entity_1 = require("./../../../api-entity/User.entity");
const common_1 = require("@nestjs/common");
const forgot_password_service_1 = require("./forgot-password.service");
const forgot_password_controller_1 = require("./forgot-password.controller");
const mailer_1 = require("@nestjs-modules/mailer");
const typeorm_1 = require("@nestjs/typeorm");
const reset_token_entity_1 = require("./entities/reset-token.entity");
let ForgotPasswordModule = class ForgotPasswordModule {
};
exports.ForgotPasswordModule = ForgotPasswordModule;
exports.ForgotPasswordModule = ForgotPasswordModule = __decorate([
    (0, common_1.Module)({
        imports: [mailer_1.MailerModule, typeorm_1.TypeOrmModule.forFeature([reset_token_entity_1.ResetTokenEntity, User_entity_1.User])],
        controllers: [forgot_password_controller_1.ForgotPasswordController],
        providers: [forgot_password_service_1.ForgotPasswordService],
    })
], ForgotPasswordModule);
//# sourceMappingURL=forgot-password.module.js.map