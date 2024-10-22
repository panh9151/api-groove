import { Controller, Get, Body, Request, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UserGuard } from "src/guard/user/user.guard";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(UserGuard)
  @Get()
  getProfile(@Request() req: any) {
    return this.profileService.getProfile(req);
  }
}
