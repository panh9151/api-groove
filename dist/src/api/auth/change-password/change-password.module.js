"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordModule = void 0;
const common_1 = require("@nestjs/common");
const change_password_service_1 = require("./change-password.service");
const change_password_controller_1 = require("./change-password.controller");
const typeorm_1 = require("@nestjs/typeorm");
const change_password_entity_1 = require("./entities/change-password.entity");
let ChangePasswordModule = class ChangePasswordModule {
};
exports.ChangePasswordModule = ChangePasswordModule;
exports.ChangePasswordModule = ChangePasswordModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([change_password_entity_1.ChangePasswordEntity])],
        controllers: [change_password_controller_1.ChangePasswordController],
        providers: [change_password_service_1.ChangePasswordService],
    })
], ChangePasswordModule);
//# sourceMappingURL=change-password.module.js.map