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
exports.UpdateInforService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const update_infor_entity_1 = require("./entities/update-infor.entity");
let UpdateInforService = class UpdateInforService {
    constructor(updateInforRepository) {
        this.updateInforRepository = updateInforRepository;
    }
    async updateUser(id, body) {
        const existingUser = await this.updateInforRepository.findOne({
            where: { phone: body.phone },
        });
        if (existingUser) {
            throw new common_1.ConflictException("Email already exists");
        }
        const user = await this.updateInforRepository.findOne({
            where: { id_user: id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        const updatedUser = this.updateInforRepository.merge(user, body);
        await this.updateInforRepository.save(updatedUser);
        return { message: "Update user information successfully" };
    }
};
exports.UpdateInforService = UpdateInforService;
exports.UpdateInforService = UpdateInforService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(update_infor_entity_1.UpdateInforEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UpdateInforService);
//# sourceMappingURL=update-infor.service.js.map