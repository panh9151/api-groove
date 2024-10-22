import { Profile } from "./entities/profile.entity";
import { Repository } from "typeorm";
export declare class ProfileService {
    private readonly profileRepository;
    constructor(profileRepository: Repository<Profile>);
    getProfile(req: any): Promise<Profile>;
}
