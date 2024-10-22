import { CloudinaryResponse } from "./cloudinary/cloudinary-response";
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>;
    deleteAudio(publicId: string): Promise<any>;
    deleteImage(publicId: string): Promise<any>;
}
