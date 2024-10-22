import { ConflictException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/register.entity";

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly registerRepository: Repository<UserEntity>
  ) {}

  async registerUser(body: RegisterDto) {
    // Check existing email
    const existingUser = await this.registerRepository.findOne({
      where: { email: body.email },
    });

    if (existingUser) {
      throw new ConflictException("Email already existed");
    }

    // Update db
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const newUser = this.registerRepository.create({
      ...body,
      password: hashedPassword,
    });
    const savedType = await this.registerRepository.save(newUser);

    return { id: savedType.id_user };
  }
}
