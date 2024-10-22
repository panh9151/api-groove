import { IsString, IsUrl } from "class-validator";

export class DeleteDto {
  @IsString()
  @IsUrl()
  url: string;
}
