import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { SignJWT } from "jose";
import { LoginDto } from "./dto/login.dto";
import { Repository } from "typeorm";
import { LoginEntity } from "./entities/login.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";

@Injectable()
export class LoginService {
  private readonly secretToken;
  constructor(
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>
  ) {
    this.secretToken = new TextEncoder().encode(
      process.env.ACCESS_TOKEN_SECRET
    );
  }
  async login(email: string, password: string) {
    const user = await this.loginRepository
      .createQueryBuilder("user")
      .andWhere("user.email = :email", { email: email })
      .getOne();

    // Check existing user
    if (!user) {
      throw new NotFoundException();
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException("Invalid credentials");

    // Check banned
    if (user.role !== "admin" && user.is_banned === 1)
      throw new ForbiddenException();

    const accessToken = await new SignJWT({ id: user.id_user })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      // .setExpirationTime("24h")
      .sign(this.secretToken);
    return { accessToken };
  }
}
