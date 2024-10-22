import { IsString, IsInt, IsDate, IsOptional } from "class-validator";

export class LyricsDto {
  // id_music: string;

  @IsString()
  lyrics: string;

  @IsOptional()
  @IsInt()
  start_time: number;

  @IsOptional()
  @IsInt()
  end_time: number;
}
