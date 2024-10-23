"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicHistoryModule = void 0;
const Music_entity_1 = require("./../../api-entity/Music.entity");
const MusicHistory_entity_1 = require("./../../api-entity/MusicHistory.entity");
const common_1 = require("@nestjs/common");
const music_history_service_1 = require("./music-history.service");
const music_history_controller_1 = require("./music-history.controller");
const typeorm_1 = require("@nestjs/typeorm");
let MusicHistoryModule = class MusicHistoryModule {
};
exports.MusicHistoryModule = MusicHistoryModule;
exports.MusicHistoryModule = MusicHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([MusicHistory_entity_1.MusicHistory, Music_entity_1.Music])],
        controllers: [music_history_controller_1.MusicHistoryController],
        providers: [music_history_service_1.MusicHistoryService],
    })
], MusicHistoryModule);
//# sourceMappingURL=music-history.module.js.map