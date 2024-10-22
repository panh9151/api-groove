import { CreateMusicDto } from "./create-music.dto";
export declare enum ShowStatus {
    HIDDEN = 0,
    VISIBLE = 1
}
declare const UpdateMusicDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMusicDto>>;
export declare class UpdateMusicDto extends UpdateMusicDto_base {
    name: string;
}
export {};
