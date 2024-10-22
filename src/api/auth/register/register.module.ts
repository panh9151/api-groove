import { Module } from "@nestjs/common";
import { RegisterService } from "./register.service";
import { RegisterController } from "./register.controller";
import { RegisterDto } from "./dto/register.dto";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/register.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
