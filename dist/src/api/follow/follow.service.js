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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Follow_entity_1 = require("../../api-entity/Follow.entity");
const typeorm_2 = require("typeorm");
const Artist_entity_1 = require("../../api-entity/Artist.entity");
let FollowService = class FollowService {
    constructor(followRepo, artistRepo) {
        this.followRepo = followRepo;
        this.artistRepo = artistRepo;
    }
    async create(body, req) {
        const { id_artist } = body;
        const id_user = req.user.id_user;
        const artist = await this.artistRepo.find({ where: { id_artist } });
        if (artist.length !== 1)
            throw new common_1.NotFoundException("Artist not found");
        const followArtist = await this.followRepo
            .createQueryBuilder("follow")
            .andWhere("follow.id_user = :id_user", { id_user })
            .andWhere("follow.id_artist = :id_artist", { id_artist })
            .getMany();
        if (followArtist.length !== 0)
            throw new common_1.ConflictException("Artist already followed");
        const newFollow = this.followRepo.create({ id_artist, id_user });
        const saveFollow = await this.followRepo.save(newFollow);
        return { message: "Follow successfully" };
    }
    async findByUser(req) {
        const id_user = req.user.id_user;
        const result = await this.followRepo
            .createQueryBuilder("follow")
            .select([
            "follow.created_at as follow_at",
            "artist.name as name",
            "artist.slug as slug",
            "artist.url_cover as url_cover",
            "artist.is_show as is_show",
        ])
            .leftJoin("follow.user", "user")
            .leftJoin("follow.artist", "artist")
            .andWhere("follow.id_user = :id_user", { id_user })
            .andWhere("artist.is_show = 1")
            .getRawMany();
        return {
            data: result,
        };
    }
    async remove(body, req) {
        const { id_artist } = body;
        const id_user = req.user.id_user;
        const follow = await this.followRepo.findOne({
            where: { id_artist, id_user },
        });
        if (!follow)
            throw new common_1.NotFoundException("Follow not found");
        await this.followRepo.remove(follow);
        return { message: "Unfollow successfully" };
    }
    async findByArtist(limit, offset, id_artist) {
        if (!id_artist)
            throw new common_1.BadRequestException("Missing id_artist");
        const existingArtist = await this.artistRepo
            .createQueryBuilder("artist")
            .andWhere("artist.id_artist = :id_artist", { id_artist })
            .getMany();
        if (existingArtist.length !== 1) {
            throw new common_1.NotFoundException("Artist not found");
        }
        const result = await this.followRepo
            .createQueryBuilder("follow")
            .select([
            "follow.created_at as follow_at",
            "user.fullname as fullname",
            "user.url_avatar as url_avatar",
        ])
            .leftJoin("follow.user", "user")
            .leftJoin("follow.artist", "artist")
            .andWhere("follow.id_artist = :id_artist", { id_artist })
            .getRawMany();
        return {
            data: result,
        };
    }
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Follow_entity_1.Follow)),
    __param(1, (0, typeorm_1.InjectRepository)(Artist_entity_1.Artist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FollowService);
//# sourceMappingURL=follow.service.js.map