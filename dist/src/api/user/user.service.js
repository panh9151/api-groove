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
exports.UserService = void 0;
const User_entity_1 = require("./../../api-entity/User.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(body) {
        const { email, password, role = "user", fullname, phone, gender, url_avatar, birthday, country, is_banned, } = body;
        const userWithEmail = await this.userRepo.find({ where: { email } });
        if (userWithEmail && userWithEmail.length > 0) {
            throw new common_1.ConflictException("Email already existed");
        }
        if (phone) {
            const userWithPhone = await this.userRepo.find({ where: { phone } });
            if (userWithPhone && userWithPhone.length > 0) {
                throw new common_1.ConflictException("Phone already existed");
            }
        }
        const newUser = this.userRepo.create({
            email,
            password,
            role,
            fullname,
            phone,
            gender,
            url_avatar,
            birthday,
            country,
            is_banned,
        });
        const saveUser = await this.userRepo.save(newUser);
        return { newID: saveUser.id_user };
    }
    async findAll(limit, offset, id_user, email, role, fullname, phone, gender, birthday, country, is_banned, id_google) {
        const userRepo = this.userRepo
            .createQueryBuilder("user")
            .select([
            "user.id_user",
            "user.email",
            "user.role",
            "user.fullname",
            "user.phone",
            "user.gender",
            "user.url_avatar",
            "user.birthday",
            "user.country",
            "user.created_at",
            "user.last_update",
            "user.is_banned",
            "user.id_google",
        ]);
        id_user && userRepo.andWhere("userid_user = id_user", { id_user });
        email && userRepo.andWhere("user.email = :email", { email });
        role && userRepo.andWhere("user.role = :role", { role });
        fullname &&
            userRepo.andWhere("user.fullname like :fullname", {
                fullname: `%${fullname}%`,
            });
        phone && userRepo.andWhere("user.phone = :phone", { phone });
        gender && userRepo.andWhere("user.gender = :gender", { gender });
        birthday &&
            userRepo.andWhere("user.birthday like :birthday", {
                birthday: `%${birthday}%`,
            });
        country &&
            userRepo.andWhere("user.country like :country", {
                country: `%${country}%`,
            });
        is_banned &&
            userRepo.andWhere("user.is_banned = :is_banned", { is_banned });
        id_google &&
            userRepo.andWhere("user.id_google = :id_google", { id_google });
        limit && userRepo.take(limit);
        offset && userRepo.skip(offset);
        return { data: await userRepo.getMany() };
    }
    async findOne(id) {
        const userRepo = this.userRepo
            .createQueryBuilder("user")
            .select([
            "user.id_user",
            "user.email",
            "user.role",
            "user.fullname",
            "user.phone",
            "user.gender",
            "user.url_avatar",
            "user.birthday",
            "user.country",
            "user.created_at",
            "user.last_update",
            "user.is_banned",
            "user.id_google",
        ]);
        return { data: await userRepo.getOne() };
    }
    async update(id, body) {
        const user = await this.userRepo.findOne({ where: { id_user: id } });
        if (!user) {
            throw new common_1.ConflictException("User not found");
        }
        const { email, password, role, fullname, phone, gender, url_avatar, birthday, country, is_banned, } = body;
        if (email && email !== user.email) {
            const userWithEmail = await this.userRepo.findOne({ where: { email } });
            if (userWithEmail) {
                throw new common_1.ConflictException("Email already existed");
            }
            user.email = email;
        }
        if (phone && phone !== user.phone) {
            const userWithPhone = await this.userRepo.findOne({ where: { phone } });
            if (userWithPhone) {
                throw new common_1.ConflictException("Phone already existed");
            }
            user.phone = phone;
        }
        const result = await this.userRepo.update(id, {
            email,
            password,
            role,
            fullname,
            phone,
            gender,
            url_avatar,
            birthday,
            country,
            is_banned,
        });
        if (result.affected === 0) {
            throw new common_1.ConflictException("User not found or nothing was updated");
        }
        return { message: `Updated successfully` };
    }
    async remove(id) {
        const user = await this.userRepo.findOne({ where: { id_user: id } });
        if (!user) {
            throw new common_1.ConflictException("User not found");
        }
        await this.userRepo.delete(id);
        return { message: `Delete user successfully` };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map