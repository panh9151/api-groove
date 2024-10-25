import { IsString } from "class-validator";

export class CreateComposerDto {
  @IsString()
  name: string;
}
