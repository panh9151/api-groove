import { CloudinaryService } from "./../../../cloudinary/cloudinary.service";
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminGuard } from "../../../guard/admin/admin.guard";
import { DeleteDto } from "./dto/delete.dto";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("upload-audio")
@ApiTags("upload")
@UseGuards(AdminGuard)
export class UploadAudioController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @ApiOperation({ summary: "Upload ảnh - Yêu cầu admin" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Tải lên tệp với key là file",
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary", // Định nghĩa file upload
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ["audio/mpeg", "audio/mp3", "audio/mp4"];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return callback(
            new BadRequestException(
              "Only audio files (mpeg, mp3, mp4) are allowed!"
            ),
            false
          );
        }
        callback(null, true);
      },
    })
  )
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    // return file;
    if (!file) {
      throw new BadRequestException("No file uploaded.");
    }
    const uploadedFile = await this.cloudinaryService.uploadFile(file);
    return { message: "Upload audio successfully", url: uploadedFile.url };
  }

  @Delete("")
  @ApiOperation({ summary: "Xóa ảnh - Yêu cầu admin" })
  async deleteAudio(@Body() body: DeleteDto) {
    const { url } = body;
    // Extract public_id using regex
    const regex = /\/([^\/]+)\/([^\/]+)$/;
    const matches = url.match(regex);

    if (!matches || matches.length < 3) {
      throw new BadRequestException(
        "No public_id could be extracted from the URL."
      );
    }

    const public_id = `${matches[2]}`.replace(/\.(mp4|webm|mp3)$/i, "");

    if (!public_id) throw new BadRequestException("Failed to get id");

    await this.cloudinaryService.deleteAudio(public_id);
    return { message: "Audio deleted successfully" };
  }
}
