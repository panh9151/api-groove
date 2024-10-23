import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // app.enableCors();
  app.enableCors({
    origin: ["http:localhost:3000", "http:localhost:30010"], // Cho phép mọi nguồn truy cập
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Các phương thức được phép
    allowedHeaders: ["Content-Type", "Authorization", "token"], // Cho phép mọi header
    // credentials: true, // Nếu cần thiết
  });
  await app.listen(3000);
}
bootstrap();
