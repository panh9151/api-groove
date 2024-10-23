import { CloudinaryService } from "./../../../cloudinary/cloudinary.service";
import { DeleteDto } from "./dto/delete.dto";
export declare class UploadAudioController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadAudio(file: Express.Multer.File): Promise<{
        message: string;
        url: any;
    }>;
    deleteAudio(body: DeleteDto): Promise<{
        message: string;
    }>;
}
