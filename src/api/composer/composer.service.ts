import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateComposerDto } from "./dto/create-composer.dto";
import { UpdateComposerDto } from "./dto/update-composer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Composer } from "../../api-entity/Composer.entity";
import { Repository } from "typeorm";

@Injectable()
export class ComposerService {
  constructor(
    @InjectRepository(Composer)
    private readonly composerRepo: Repository<Composer>
  ) {}

  async create(body: CreateComposerDto) {
    const { name } = body;

    const newComposer = this.composerRepo.create({ name });
    const saveComposer = await this.composerRepo.save(newComposer);

    return { newID: saveComposer.id_composer };
  }

  async findAll() {
    const composerList = await this.composerRepo
      .createQueryBuilder("composer")
      .getMany();

    return { data: composerList };
  }

  async findOne(id: string) {
    const composer = await this.composerRepo
      .createQueryBuilder("composer")
      .andWhere("composer.id_composer = :id", { id })
      .leftJoinAndSelect("composer.musics", "music")
      .getOne();

    return { data: composer };
  }

  async update(id: string, body: UpdateComposerDto) {
    const result = await this.composerRepo.update(id, body);

    if (result.affected === 0) {
      throw new NotFoundException(`Composer not found`);
    }

    return { message: `Composer updated successfully` };
  }

  async remove(id: string) {
    const result = await this.composerRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Composer not found`);
    }

    return { message: `Composer removed successfully` };
  }
}
