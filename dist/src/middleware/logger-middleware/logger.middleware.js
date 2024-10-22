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
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jose_1 = require("jose");
const typeorm_1 = require("@nestjs/typeorm");
const auth_user_entity_1 = require("./entities/auth-user.entity");
const typeorm_2 = require("typeorm");
let LoggerMiddleware = class LoggerMiddleware {
    constructor(authUserRepository) {
        this.authUserRepository = authUserRepository;
        this.secretToken = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    }
    async use(req, res, next) {
        const token = req.headers["token"];
        if (!token) {
            req.user = null;
            next();
            return;
        }
        try {
            const decoded = await (0, jose_1.jwtVerify)(token, this.secretToken);
            req.user = decoded.payload;
            const id_user = decoded.payload.id;
            const currentUser = await this.authUserRepository.findOne({
                where: { id_user: id_user },
            });
            if (currentUser) {
                req.user = currentUser;
            }
            next();
        }
        catch (error) {
            res.status(401).send("Invalid token");
        }
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_user_entity_1.AuthUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map