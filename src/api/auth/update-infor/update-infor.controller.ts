import {
  Controller,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UpdateInforService } from "./update-infor.service";
import { UpdateInforDto } from "./dto/update-infor.dto";
import { UserGuard } from "../../../guard/user/user.guard";

@Controller("update-infor")
export class UpdateInforController {
  constructor(private readonly updateInforService: UpdateInforService) {}

  @UseGuards(UserGuard)
  @Patch("")
  update(@Request() req: any, @Body() body: UpdateInforDto) {
    const id_user = req.user.id_user;

    return this.updateInforService.updateUser(id_user, body);
  }
}
