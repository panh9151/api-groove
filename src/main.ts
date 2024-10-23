import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ["http://localhost:3000", "https://your-frontend-domain.com"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"], // Các header mà bạn sử dụng
    // credentials: true, // Uncomment nếu cần bật credentials
  });

  // Sử dụng ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000);
}
bootstrap();
