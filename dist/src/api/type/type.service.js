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
exports.TypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Type_entity_1 = require("../../api-entity/Type.entity");
let TypeService = class TypeService {
    constructor(typeRepository) {
        this.typeRepository = typeRepository;
    }
    async create(body) {
        if (body.slug) {
            const typeBySlug = await this.typeRepository.find({
                where: { slug: body.slug },
            });
            if (typeBySlug && typeBySlug.length > 0)
                throw new common_1.ConflictException("Slug already existed");
        }
        const newType = this.typeRepository.create({
            name: body.name,
            slug: body.slug,
            created_at: body.created_at,
            is_show: body.is_show,
        });
        const savedType = await this.typeRepository.save(newType);
        return { newID: savedType.id_type };
    }
    async findAll(limit, offset, id_type, name, slug, is_show, req) {
        const type = this.typeRepository
            .createQueryBuilder("type")
            .select([
            "type.id_type",
            "type.name",
            "type.slug",
            "type.created_at",
            "type.is_show",
        ]);
        id_type && type.andWhere("type.id_type = :id_type", { id_type });
        name && type.andWhere("type.name LIKE :name", { name: `%${name}%` });
        slug && type.andWhere("type.slug = :slug", { slug });
        is_show in [0, 1] && type.andWhere("type.is_show = :is_show", { is_show });
        req?.user?.role !== "admin" && type.andWhere("type.is_show = 1", {});
        limit && type.take(parseInt(limit));
        offset && type.skip(parseInt(offset));
        return { data: await type.getMany() };
    }
    async findOne(id, req) {
        const type = await this.typeRepository
            .createQueryBuilder("type")
            .andWhere("type.id_type = :id_type", { id_type: id });
        req.user.role !== "admin" && type.andWhere("type.is_show = 1", {});
        const result = await type.getOne();
        if (!result)
            throw new common_1.NotFoundException("Type not found");
        return { data: result };
    }
    async update(id, body) {
        if (body.slug) {
            const typeBySlug = await this.typeRepository.find({
                where: { slug: body.slug },
            });
            if (typeBySlug && typeBySlug.length > 0)
                throw new common_1.ConflictException("Slug already existed");
        }
        const existingType = await this.typeRepository.findOne({
            where: { id_type: id },
        });
        if (!existingType) {
            throw new common_1.NotFoundException(`Type not found`);
        }
        Object.assign(existingType, body);
        return { success: "Updated successfully" };
    }
    async remove(id) {
        const result = await this.typeRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Type not found`);
        }
        else {
            return { message: "Deleted successfully" };
        }
    }
};
exports.TypeService = TypeService;
exports.TypeService = TypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Type_entity_1.Type)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeService);
//# sourceMappingURL=type.service.js.map