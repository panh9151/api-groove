import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateMusicHistoryDto {
  @IsString()
  @IsOptional()
  id_music: string;

  @IsInt()
  @IsOptional()
  play_duration: number;
}
