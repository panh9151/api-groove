import { Injectable, NestMiddleware } from "@nestjs/common";
import { jwtVerify } from "jose";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "./entities/auth-user.entity";
import { Repository } from "typeorm";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly secretToken;
  constructor(
    @InjectRepository(AuthUser) private authUserRepository: Repository<AuthUser>
  ) {
    this.secretToken = new TextEncoder().encode(
      process.env.ACCESS_TOKEN_SECRET
    );
  }

  async use(req: any, res: any, next: () => void) {
    const token = req.headers["token"];

    // Kiểm tra sự tồn tại của token
    if (!token) {
      req.user = null;
      next();
      return;
    }

    try {
      // Xác thực token
      const decoded = await jwtVerify(token, this.secretToken);

      // Lưu thông tin người dùng vào req.user nếu cần
      req.user = decoded.payload;
      const id_user = decoded.payload.id as string;

      const currentUser = await this.authUserRepository.findOne({
        where: { id_user: id_user },
      });

      if (currentUser) {
        // Thêm thông tin user vào request
        req.user = currentUser;
      }

      next(); // Tiếp tục với middleware hoặc route tiếp theo
    } catch (error) {
      res.status(401).send("Invalid token"); // Gửi phản hồi chuỗi khi token không hợp lệ
    }
  }
}
