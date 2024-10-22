import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ChangePasswordDto } from "./dto/change-password.dto";
import * as bcrypt from "bcryptjs";
import { ChangePasswordEntity } from "./entities/change-password.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ChangePasswordService {
  constructor(
    @InjectRepository(ChangePasswordEntity)
    private readonly changePasswordEntity: Repository<ChangePasswordEntity>
  ) {}

  async changePassword(req: any, body: ChangePasswordDto) {
    const id = req?.user?.id_user;
    const { newPassword, oldPassword } = body;
    if (!id) throw new UnauthorizedException();

    // Compare both
    if (newPassword == oldPassword)
      throw new BadRequestException(
        "New password and old password are the same"
      );

    // Verify old password
    const match = await bcrypt.compare(oldPassword, req.user.password);
    if (match) {
      // Get user and update db
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      const user = await this.changePasswordEntity.findOne({
        where: { id_user: id },
      });
      this.changePasswordEntity.update(id, { password: hashedPassword });

      return { message: "Change password successfully" };
    } else throw new BadRequestException("Wrong password");
  }
}
