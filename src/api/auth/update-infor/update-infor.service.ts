import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateInforDto } from "./dto/update-infor.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateInforEntity } from "./entities/update-infor.entity";

@Injectable()
export class UpdateInforService {
  constructor(
    @InjectRepository(UpdateInforEntity)
    private readonly updateInforRepository: Repository<UpdateInforEntity>
  ) {}

  async updateUser(id: string, body: UpdateInforDto) {
    // Check existing phone
    const existingUser = await this.updateInforRepository.findOne({
      where: { phone: body.phone },
    });

    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    // Update db
    const user = await this.updateInforRepository.findOne({
      where: { id_user: id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const updatedUser = this.updateInforRepository.merge(user, body);
    await this.updateInforRepository.save(updatedUser);

    return { message: "Update user information successfully" };
  }
}
