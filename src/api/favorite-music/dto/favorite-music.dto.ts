import { IsString } from "class-validator";

export class CreateFavoriteMusicDto {
  @IsString()
  id_music: string;
}
