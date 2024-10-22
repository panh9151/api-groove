"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlaylistDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_playlist_dto_1 = require("./create-playlist.dto");
class UpdatePlaylistDto extends (0, mapped_types_1.PartialType)(create_playlist_dto_1.CreatePlaylistDto) {
}
exports.UpdatePlaylistDto = UpdatePlaylistDto;
//# sourceMappingURL=update-playlist.dto.js.map