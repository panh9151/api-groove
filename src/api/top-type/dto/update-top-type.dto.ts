import { PartialType } from '@nestjs/swagger';
import { CreateTopTypeDto } from './create-top-type.dto';

export class UpdateTopTypeDto extends PartialType(CreateTopTypeDto) {}
