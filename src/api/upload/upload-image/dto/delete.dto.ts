import { IsString, IsUrl } from "class-validator";

export class DeleteDto {
  @IsString()
  url: string;
}
