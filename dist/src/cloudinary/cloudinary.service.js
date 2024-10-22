"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const streamifier = require("streamifier");
let CloudinaryService = class CloudinaryService {
    uploadFile(file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
            streamifier.createReadStream(file?.buffer).pipe(uploadStream);
        });
    }
    async deleteAudio(publicId) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.destroy(publicId, { resource_type: "video" }, (error, result) => {
                if (error) {
                    return reject(new common_1.BadRequestException(`Error deleting file: ${error.message || error}`));
                }
                if (result.result !== "ok") {
                    return reject(new common_1.BadRequestException("Failed to delete file, file may not exist or is invalid."));
                }
                resolve(result);
            });
        });
    }
    async deleteImage(publicId) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    return reject(new common_1.BadRequestException(`Error deleting file: ${error.message || error}`));
                }
                if (result.result !== "ok") {
                    return reject(new common_1.BadRequestException("Failed to delete file, file may not exist or is invalid."));
                }
                resolve(result);
            });
        });
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map