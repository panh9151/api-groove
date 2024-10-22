import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Lấy thông tin người dùng từ request

    // Kiểm tra quyền truy cập dựa trên thông tin người dùng
    if (user) {
      // Kiểm tra quyền của người dùng (ví dụ: role hoặc id)
      return user.role === "admin"; // Điều kiện xác thực quyền truy cập
    }
  }
}
