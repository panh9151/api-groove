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
exports.ArtistService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const artist_entity_1 = require("./entities/artist.entity");
const follow_entity_1 = require("./entities/follow.entity");
let ArtistService = class ArtistService {
    constructor(artistRepository) {
        this.artistRepository = artistRepository;
    }
    async create(createArtistDto) {
        const existingArtist = await this.artistRepository
            .createQueryBuilder("artist")
            .andWhere("artist.slug = :slug", { slug: createArtistDto.slug })
            .andWhere("artist.slug <> :slug", { slug: null })
            .getOne();
        if (existingArtist) {
            throw new common_1.ConflictException("Slug already existed");
        }
        const artist = this.artistRepository.create(createArtistDto);
        const newArtist = await this.artistRepository.save(artist);
        return { newID: newArtist.id_artist };
    }
    async findAll(req, count, query) {
        const { name, slug, is_show, id_artist } = query;
        const { limit, offset } = count;
        const artist = this.artistRepository
            .createQueryBuilder("artist")
            .leftJoin(follow_entity_1.Follow, "f", "artist.id_artist = f.id_artist")
            .select([
            "artist.id_artist",
            "artist.name",
            "artist.slug",
            "artist.url_cover",
            "artist.created_at",
            "artist.last_update",
            "COUNT(f.id_user) AS followers",
        ]);
        id_artist &&
            artist.andWhere("artist.id_artist = :id_artist", {
                id_artist: id_artist,
            });
        name && artist.andWhere("artist.name like :name", { name: `%${name}%` });
        slug && artist.andWhere("artist.slug = :slug", { slug: slug });
        is_show in [0 | 1] &&
            artist.andWhere("artist.is_show = :is_show", { is_show: is_show });
        req?.user?.role !== "admin" && artist.andWhere("artist.is_show = 1", {});
        artist.groupBy("artist.id_artist");
        limit && artist.take(limit);
        offset && artist.skip(offset);
        const returnedData = await artist.getRawMany();
        returnedData.forEach((artist) => {
            artist.followers = parseInt(artist.followers);
        });
        if (returnedData &&
            returnedData.length === 1 &&
            Object.values(returnedData[0]).every((value) => value === null || value === 0)) {
            return [];
        }
        return { data: returnedData };
    }
    async findOne(req, id) {
        const artist = await this.artistRepository
            .createQueryBuilder("artist")
            .leftJoin(follow_entity_1.Follow, "f", "artist.id_artist = f.id_artist")
            .select([
            "artist.id_artist AS id_artist",
            "artist.name AS name",
            "artist.slug AS slug",
            "artist.url_cover AS url_cover",
            "artist.created_at AS created_at",
            "artist.last_update AS last_update",
            "COUNT(f.id_user) AS followers",
        ])
            .where("artist.id_artist = :id_artist", { id_artist: id });
        req?.user?.role !== "admin" && artist.andWhere("artist.is_show = 1", {});
        const result = await artist.getRawOne();
        result.followers = parseInt(result.followers);
        if (result &&
            Object.values(result).every((value) => value === null || value === 0)) {
            throw new common_1.NotFoundException("Artist not found");
        }
        return { data: result };
    }
    async update(id, updateArtistDto) {
        const existingArtist = await this.artistRepository
            .createQueryBuilder("artist")
            .andWhere("artist.slug = :slug", { slug: updateArtistDto.slug })
            .andWhere("artist.slug <> :slug", { slug: null })
            .getOne();
        if (existingArtist) {
            throw new common_1.ConflictException("Slug already existed");
        }
        const artist = await this.artistRepository.findOne({
            where: { id_artist: id },
        });
        if (!artist) {
            throw new common_1.NotFoundException(`Artist not found`);
        }
        Object.assign(artist, updateArtistDto);
        return this.artistRepository.save(artist);
    }
    async remove(id) {
        const result = await this.artistRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Artist with ID ${id} not found`);
        }
    }
};
exports.ArtistService = ArtistService;
exports.ArtistService = ArtistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(artist_entity_1.ArtistEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ArtistService);
//# sourceMappingURL=artist.service.js.map