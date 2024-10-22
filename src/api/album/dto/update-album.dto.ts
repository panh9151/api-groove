import { IsOptional } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateAlbumDto } from "./create-album.dto";
import { IsString } from "class-validator";

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsOptional()
  name;
}
