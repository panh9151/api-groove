import { UserGuard } from "./../../guard/user/user.guard";
import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseGuards(UserGuard)
  findAll(@Request() req: any) {
    return this.notificationService.findAll(req);
  }
}
