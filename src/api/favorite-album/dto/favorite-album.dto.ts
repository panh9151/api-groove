import { IsString } from "class-validator";

export class CreateFavoriteAlbumDto {
  @IsString()
  id_album: string;
}
