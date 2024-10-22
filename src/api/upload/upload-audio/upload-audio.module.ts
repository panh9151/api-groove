import { CloudinaryModule } from "./../../../cloudinary/cloudinary.module";
import { Module } from "@nestjs/common";
import { UploadAudioController } from "./upload-audio.controller";

@Module({
  imports: [CloudinaryModule],
  controllers: [UploadAudioController],
  providers: [],
})
export class UploadAudioModule {}
