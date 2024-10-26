import { Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  async getProfile(req: any) {
    const user = await this.profileRepository
      .createQueryBuilder("user")
      .select([
        "user.email",
        "user.role",
        "user.fullname",
        "user.phone",
        "user.gender",
        "user.url_avatar",
        "user.birthday",
        "user.country",
        "user.created_at",
        "user.last_update",
      ])
      .andWhere("user.id_user = :id_user", { id_user: req.user.id_user })
      .getOne();

    if (!user) throw new NotFoundException("User not found");

    return user;
  }
}
