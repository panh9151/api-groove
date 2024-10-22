import { Module } from "@nestjs/common";
import { UploadImageController } from "./upload-image.controller";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
  imports: [CloudinaryModule],
  controllers: [UploadImageController],
  providers: [],
})
export class UploadImageModule {}
