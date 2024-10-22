import { ProfileService } from "./profile.service";
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(req: any): Promise<import("./entities/profile.entity").Profile>;
}
