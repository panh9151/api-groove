"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInforModule = void 0;
const common_1 = require("@nestjs/common");
const update_infor_service_1 = require("./update-infor.service");
const update_infor_controller_1 = require("./update-infor.controller");
const typeorm_1 = require("@nestjs/typeorm");
const update_infor_entity_1 = require("./entities/update-infor.entity");
let UpdateInforModule = class UpdateInforModule {
};
exports.UpdateInforModule = UpdateInforModule;
exports.UpdateInforModule = UpdateInforModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([update_infor_entity_1.UpdateInforEntity])],
        controllers: [update_infor_controller_1.UpdateInforController],
        providers: [update_infor_service_1.UpdateInforService],
    })
], UpdateInforModule);
//# sourceMappingURL=update-infor.module.js.map