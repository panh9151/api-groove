"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadAudioModule = void 0;
const cloudinary_module_1 = require("./../../../cloudinary/cloudinary.module");
const common_1 = require("@nestjs/common");
const upload_audio_controller_1 = require("./upload-audio.controller");
let UploadAudioModule = class UploadAudioModule {
};
exports.UploadAudioModule = UploadAudioModule;
exports.UploadAudioModule = UploadAudioModule = __decorate([
    (0, common_1.Module)({
        imports: [cloudinary_module_1.CloudinaryModule],
        controllers: [upload_audio_controller_1.UploadAudioController],
        providers: [],
    })
], UploadAudioModule);
//# sourceMappingURL=upload-audio.module.js.map