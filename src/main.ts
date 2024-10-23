import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*",
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "token"], // Thêm các header mà bạn đang sử dụng
      credentials: true,
    },
  });
  // app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
