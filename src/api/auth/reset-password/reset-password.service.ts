import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { ResetPassworđto } from "./dto/reset-password.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ResetPasswordEntity } from "./entities/reset-password.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";

@Injectable()
export class ResetPasswordService {
  @InjectRepository(ResetPasswordEntity)
  private readonly resetPasswordRepository: Repository<ResetPasswordEntity>;

  async resetPasword(body: ResetPassworđto, token: string) {
    const { newPassword } = body;

    // Check token
    const userWithToken = await this.resetPasswordRepository
      .createQueryBuilder("user")
      .andWhere("user.reset_token = :reset_token", { reset_token: token })
      .andWhere("user.reset_token_expired > :reset_token_expired", {
        reset_token_expired: Date.now(),
      })
      .getOne();

    // Check existing token
    if (!userWithToken)
      throw new BadRequestException("Token not found or expired");

    // Check same password
    const match = await bcrypt.compare(newPassword, userWithToken.password);
    if (match) {
      throw new ConflictException("New password and old password are the same");
    }

    // Hash password and update db
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    this.resetPasswordRepository.update(
      { id_user: userWithToken.id_user },
      { reset_token: null, reset_token_expired: null, password: hashedPassword }
    );

    return { message: "Reset password successfully" };
  }
}
