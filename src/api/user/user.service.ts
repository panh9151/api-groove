import { User } from "./../../api-entity/User.entity";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async create(body: CreateUserDto) {
    const {
      email,
      password,
      role = "user",
      fullname,
      phone,
      gender,
      url_avatar,
      birthday,
      country,
      is_banned,
    } = body;

    // Check unique email
    const userWithEmail = await this.userRepo.find({ where: { email } });
    if (userWithEmail && userWithEmail.length > 0) {
      throw new ConflictException("Email already existed");
    }

    // Check unique phone
    if (phone) {
      const userWithPhone = await this.userRepo.find({ where: { phone } });
      if (userWithPhone && userWithPhone.length > 0) {
        throw new ConflictException("Phone already existed");
      }
    }

    // Update db
    const newUser = this.userRepo.create({
      email,
      password,
      role,
      fullname,
      phone,
      gender,
      url_avatar,
      birthday,
      country,
      is_banned,
    });

    const saveUser = await this.userRepo.save(newUser);

    return { newID: saveUser.id_user };
  }

  async findAll(
    limit: number,
    offset: number,
    id_user: string,
    email: string,
    role: string,
    fullname: string,
    phone: string,
    gender: string,
    birthday: string,
    country: string,
    is_banned: 0 | 1,
    id_google: string
  ) {
    const userRepo = this.userRepo
      .createQueryBuilder("user")
      .select([
        "user.id_user",
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
        "user.is_banned",
        "user.id_google",
      ]);

    // Apply filters based on the parameters
    const getByParam = (
      param,
      value,
      repo,
      notAbsolute: boolean = false,
      queryBy: "and" | "or" = "and"
    ) => {
      if (value !== null && value !== undefined && value !== "") {
        if (notAbsolute === true) value = `%${value}%`;
        if (queryBy === "and") {
          repo.andWhere(`${param} = :value`, {
            value,
          });
        } else {
          repo.orWhere(`${param} = :value`, {
            value,
          });
        }
      }
    };

    getByParam("user.id_user", id_user, userRepo);
    getByParam("user.email", email, userRepo);
    getByParam("user.role", role, userRepo);
    getByParam("user.fullname", fullname, userRepo, true);
    getByParam("user.phone", phone, userRepo);
    getByParam("user.gender", gender, userRepo);
    getByParam("user.birthday", birthday, userRepo, true);
    getByParam("user.country", country, userRepo, true);
    getByParam("user.is_banned", is_banned, userRepo);
    getByParam("user.id_google", id_google, userRepo);

    // Apply limit and offset
    limit && userRepo.take(limit);
    offset && userRepo.skip(offset);

    return { data: await userRepo.getMany() };
  }

  async findOne(id: string) {
    const userRepo = this.userRepo
      .createQueryBuilder("user")
      .select([
        "user.id_user",
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
        "user.is_banned",
        "user.id_google",
      ]);

    return { data: await userRepo.getOne() };
  }

  async update(id: string, body: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id_user: id } });
    if (!user) {
      throw new ConflictException("User not found");
    }

    let {
      email,
      password,
      role,
      fullname,
      phone,
      gender,
      url_avatar,
      birthday,
      country,
      is_banned,
    } = body;

    if (!birthday) birthday = new Date(birthday) as any;

    // Check unique email
    if (email && email !== user.email) {
      const userWithEmail = await this.userRepo.findOne({ where: { email } });
      if (userWithEmail) {
        throw new ConflictException("Email already existed");
      }
      user.email = email;
    }

    // Check unique phone
    if (phone && phone !== user.phone) {
      const userWithPhone = await this.userRepo.findOne({ where: { phone } });
      if (userWithPhone) {
        throw new ConflictException("Phone already existed");
      }
      user.phone = phone;
    }

    // Cập nhật các trường khác nếu có trong request body
    const result = await this.userRepo.update(id, {
      email,
      password,
      role,
      fullname,
      phone,
      gender,
      url_avatar,
      birthday,
      country,
      is_banned,
    });

    if (result.affected === 0) {
      throw new NotFoundException("User not found or nothing was updated");
    }

    return { message: `Updated successfully` };
  }

  // async remove(id: string) {
  //   const user = await this.userRepo.findOne({ where: { id_user: id } });
  //   if (!user) {
  //     throw new ConflictException("User not found");
  //   }

  //   await this.userRepo.delete(id);
  //   return { message: `Delete user successfully` };
  // }
}
