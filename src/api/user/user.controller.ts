import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AdminGuard } from "src/guard/admin/admin.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll(
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("id_user") id_user: string,
    @Query("email") email: string,
    @Query("role") role: string,
    @Query("fullname") fullname: string,
    @Query("phone") phone: string,
    @Query("gender") gender: string,
    @Query("birthday") birthday: string,
    @Query("country") country: string,
    @Query("is_banned") is_banned: 0 | 1,
    @Query("id_google") id_google: string
  ) {
    return this.userService.findAll(
      +limit,
      +offset,
      id_user,
      email,
      role,
      fullname,
      phone,
      gender,
      birthday,
      country,
      is_banned,
      id_google
    );
  }

  @UseGuards(AdminGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
