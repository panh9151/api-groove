import { CloudinaryModule } from "./../../../cloudinary/cloudinary.module";
import { Module } from "@nestjs/common";
import { UploadImageController } from "./upload-image.controller";

@Module({
  imports: [CloudinaryModule],
  controllers: [UploadImageController],
  providers: [],
})
export class UploadImageModule {}
