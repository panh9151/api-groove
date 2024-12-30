import { User } from "./../../../api-entity/User.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import * as crypto from "crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async forgotPassword(email: string, req: any) {
    // Create crypto code
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpireTime = Date.now() + 300000; // Expired in 5 minutes

    // Check existing user
    const userList = await this.userRepository.find({ where: { email } });
    if (userList.length !== 1) {
      throw new NotFoundException("Email not found");
    }

    // Get reset link
    const resetLink =
      `https://groove-puce.vercel.app/reset-password/` + resetToken;
    // const resetLink =
    //   `${req.protocol}://${req.get("host")}/reset-password/` + resetToken;

    // Send mail
    await this.mailerService.sendMail({
      to: email,
      subject: "Reset Your Password",
      text: `We received a request to reset your password. If you made this request, please click the link below to reset your password. 
      If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.
      \n\nReset link: ${resetLink}`,
    });

    // Update db
    const result = await this.userRepository.update(
      { email },
      { reset_token: resetToken, reset_token_expired: tokenExpireTime }
    );

    // if (result.affected === 0) {
    //   throw new NotFoundException("User not found");
    // }

    return {
      message: "Password reset email sent successfully.",
    };
  }
}
