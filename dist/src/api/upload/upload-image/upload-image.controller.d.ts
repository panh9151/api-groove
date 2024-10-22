import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { DeleteDto } from "./dto/delete.dto";
export declare class UploadImageController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadImage(file: Express.Multer.File): Promise<{
        message: string;
        url: any;
    }>;
    deleteImage(body: DeleteDto): Promise<{
        message: string;
    }>;
}
