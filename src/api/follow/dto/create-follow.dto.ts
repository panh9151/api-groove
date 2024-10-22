import { IsString } from "class-validator";

export class CreateFollowDto {
  @IsString()
  id_artist;
}
