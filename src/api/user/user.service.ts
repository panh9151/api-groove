import { User } from "./../../api-entity/User.entity";
import { ConflictException, Injectable } from "@nestjs/common";
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
    id_user && userRepo.andWhere("userid_user = id_user", { id_user });
    email && userRepo.andWhere("user.email = :email", { email });
    role && userRepo.andWhere("user.role = :role", { role });
    fullname &&
      userRepo.andWhere("user.fullname like :fullname", {
        fullname: `%${fullname}%`,
      });
    phone && userRepo.andWhere("user.phone = :phone", { phone });
    gender && userRepo.andWhere("user.gender = :gender", { gender });
    birthday &&
      userRepo.andWhere("user.birthday like :birthday", {
        birthday: `%${birthday}%`,
      });
    country &&
      userRepo.andWhere("user.country like :country", {
        country: `%${country}%`,
      });
    is_banned &&
      userRepo.andWhere("user.is_banned = :is_banned", { is_banned });
    id_google &&
      userRepo.andWhere("user.id_google = :id_google", { id_google });

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

    const {
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
      throw new ConflictException("User not found or nothing was updated");
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
