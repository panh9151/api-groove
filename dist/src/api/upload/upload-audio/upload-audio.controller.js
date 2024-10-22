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
exports.UploadAudioController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../../../cloudinary/cloudinary.service");
const admin_guard_1 = require("../../../guard/admin/admin.guard");
const delete_dto_1 = require("./dto/delete.dto");
let UploadAudioController = class UploadAudioController {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    async uploadAudio(file) {
        if (!file) {
            throw new common_1.BadRequestException("No file uploaded.");
        }
        const uploadedFile = await this.cloudinaryService.uploadFile(file);
        return { message: "Upload audio successfully", url: uploadedFile.url };
    }
    async deleteAudio(body) {
        const { url } = body;
        const regex = /\/([^\/]+)\/([^\/]+)$/;
        const matches = url.match(regex);
        if (!matches || matches.length < 3) {
            throw new common_1.BadRequestException("No public_id could be extracted from the URL.");
        }
        const public_id = `${matches[2]}`.replace(/\.(mp4|webm|mp3)$/i, "");
        if (!public_id)
            throw new common_1.BadRequestException("Failed to get id");
        await this.cloudinaryService.deleteAudio(public_id);
        return { message: "Audio deleted successfully" };
    }
};
exports.UploadAudioController = UploadAudioController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        fileFilter: (req, file, callback) => {
            const allowedMimeTypes = ["audio/mpeg", "audio/mp3", "audio/mp4"];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                return callback(new common_1.BadRequestException("Only audio files (mpeg, mp3, mp4) are allowed!"), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadAudioController.prototype, "uploadAudio", null);
__decorate([
    (0, common_1.Delete)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_dto_1.DeleteDto]),
    __metadata("design:returntype", Promise)
], UploadAudioController.prototype, "deleteAudio", null);
exports.UploadAudioController = UploadAudioController = __decorate([
    (0, common_1.Controller)("upload-audio"),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService])
], UploadAudioController);
//# sourceMappingURL=upload-audio.controller.js.map