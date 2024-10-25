import { Type } from "./../../api-entity/Type.entity";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>
  ) {}

  async create(body: CreateTypeDto) {
    // Check slug
    if (body.slug) {
      const typeBySlug = await this.typeRepository.find({
        where: { slug: body.slug },
      });
      if (typeBySlug && typeBySlug.length > 0)
        throw new ConflictException("Slug already existed");
    }

    // Add to db
    const newType = this.typeRepository.create({
      name: body.name,
      slug: body.slug,
      created_at: body.created_at,
      is_show: body.is_show,
    });
    const savedType = await this.typeRepository.save(newType);
    return { newID: savedType.id_type };
  }

  async findAll(
    limit: string,
    offset: string,
    id_type: string,
    name: string,
    slug: string,
    is_show: 0 | 1,
    req: any
  ) {
    const type = this.typeRepository
      .createQueryBuilder("type")
      .select([
        "type.id_type",
        "type.name",
        "type.slug",
        "type.created_at",
        "type.is_show",
      ]);

    // Apply filters based on the parameters
    id_type && type.andWhere("type.id_type = :id_type", { id_type });
    name && type.andWhere("type.name LIKE :name", { name: `%${name}%` });
    slug && type.andWhere("type.slug = :slug", { slug });
    is_show in [0, 1] && type.andWhere("type.is_show = :is_show", { is_show });

    // Apply visible rows by role
    req?.user?.role !== "admin" && type.andWhere("type.is_show = 1", {});

    // Apply limit and offset
    limit && type.take(parseInt(limit));
    offset && type.skip(parseInt(offset));

    return { data: await type.getMany() };
  }

  async findOne(id: string, req: any) {
    const type = await this.typeRepository
      .createQueryBuilder("type")
      .andWhere("type.id_type = :id_type", { id_type: id });

    // Apply visible rows by role
    req.user.role !== "admin" && type.andWhere("type.is_show = 1", {});

    const result = await type.getOne();

    if (!result) throw new NotFoundException("Type not found");

    return { data: result };
  }

  async update(id: string, body: UpdateTypeDto) {
    // Check slug
    if (body.slug) {
      const typeBySlug = await this.typeRepository.find({
        where: { slug: body.slug },
      });
      if (typeBySlug && typeBySlug.length > 0)
        throw new ConflictException("Slug already existed");
    }

    // Update db
    const existingType = await this.typeRepository.findOne({
      where: { id_type: id },
    });

    if (!existingType) {
      throw new NotFoundException(`Type not found`);
    }
    Object.assign(existingType, body);

    return { success: "Updated successfully" };
  }

  async remove(id: string) {
    // Kiểm tra xem bản ghi có tồn tại không
    const result = await this.typeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Type not found`);
    } else {
      return { message: "Deleted successfully" };
    }
  }
}
