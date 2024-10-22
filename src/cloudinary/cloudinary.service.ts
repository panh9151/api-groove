import { BadRequestException, Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryResponse } from "./cloudinary/cloudinary-response";
const streamifier = require("streamifier");

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      // Log file information
      //   console.log("Received file:", {
      //     originalname: file?.originalname,
      //     mimetype: file?.mimetype,
      //     size: file?.size,
      //     bufferLength: file?.buffer ? file?.buffer.length : 0,
      //   });

      // Check if the file and its buffer are valid
      //   if (!file || !file?.buffer || file?.buffer.length === 0) {
      //     return reject(new Error("Invalid file or file buffer"));
      //   }

      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      streamifier.createReadStream(file?.buffer).pipe(uploadStream);
    });
  }

  async deleteAudio(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: "video" },
        (error, result) => {
          if (error) {
            // Trả về lỗi server nếu có lỗi trong quá trình gọi Cloudinary
            return reject(
              new BadRequestException(
                `Error deleting file: ${error.message || error}`
              )
            );
          }
          if (result.result !== "ok") {
            // Nếu kết quả trả về từ Cloudinary không phải là 'ok', báo lỗi BadRequest
            return reject(
              new BadRequestException(
                "Failed to delete file, file may not exist or is invalid."
              )
            );
          }
          resolve(result);
        }
      );
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          // Trả về lỗi server nếu có lỗi trong quá trình gọi Cloudinary
          return reject(
            new BadRequestException(
              `Error deleting file: ${error.message || error}`
            )
          );
        }
        if (result.result !== "ok") {
          // Nếu kết quả trả về từ Cloudinary không phải là 'ok', báo lỗi BadRequest
          return reject(
            new BadRequestException(
              "Failed to delete file, file may not exist or is invalid."
            )
          );
        }
        resolve(result);
      });
    });
  }
}
