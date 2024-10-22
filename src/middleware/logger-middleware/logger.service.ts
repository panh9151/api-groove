import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthUser } from "./entities/auth-user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUserRepository: Repository<AuthUser>
  ) {}

  async findUser(id_user: string): Promise<AuthUser | null> {
    try {
      const currentUser = await this.authUserRepository
        .createQueryBuilder("user")
        .andWhere("user.id_user LIKE :id_user", { id_user: `%${id_user}%` })
        .getOne();

      if (!currentUser) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      return currentUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        "Bad Request: Invalid query or data",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
