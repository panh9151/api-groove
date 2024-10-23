import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors();
  // app.enableCors({
  //   origin: "*", // Cho phép mọi nguồn truy cập
  //   methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "HEAD"], // Các phương thức được phép
  //   allowedHeaders: ["Content-Type", "Authorization", "token"], // Cho phép mọi header
  //   credentials: true, // Nếu cần thiết
  // });
  await app.listen(3000);
}
bootstrap();
