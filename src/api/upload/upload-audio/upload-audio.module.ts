import { Module } from "@nestjs/common";
import { UploadAudioController } from "./upload-audio.controller";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
  imports: [CloudinaryModule],
  controllers: [UploadAudioController],
  providers: [],
})
export class UploadAudioModule {}
