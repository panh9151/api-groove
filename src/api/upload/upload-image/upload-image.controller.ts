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
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { AdminGuard } from "../../../guard/admin/admin.guard";
import { DeleteDto } from "./dto/delete.dto";

@Controller("upload-image")
@UseGuards(AdminGuard)
export class UploadImageController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return callback(
            new BadRequestException(
              "Only image files (jpeg, jpg, png, gif, webp) are allowed!"
            ),
            false
          );
        }
        callback(null, true);
      },
    })
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("No file uploaded.");
    }
    const uploadedFile = await this.cloudinaryService.uploadFile(file);
    return { message: "Upload image successfully", url: uploadedFile.url };
  }

  @Delete("")
  async deleteImage(@Body() body: DeleteDto) {
    const { url } = body;
    // Extract public_id using regex
    const regex = /\/([^\/]+)\/([^\/]+)$/;
    const matches = url.match(regex);

    if (!matches || matches.length < 3) {
      throw new BadRequestException(
        "No public_id could be extracted from the URL."
      );
    }

    const public_id = `${matches[2]}`.replace(
      /\.(jpg|jpeg|png|gif|webp)$/i,
      ""
    );

    if (!public_id) throw new BadRequestException("Failed to get id");

    await this.cloudinaryService.deleteImage(public_id);
    return { message: "Image deleted successfully" };
  }
}
