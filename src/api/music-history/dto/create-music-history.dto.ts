import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateMusicHistoryDto {
  @IsString()
  id_music: string;

  @IsInt()
  @IsOptional()
  play_duration: number;
}
