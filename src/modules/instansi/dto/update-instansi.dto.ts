import { PartialType } from '@nestjs/swagger';
import { CreateInstansiDto } from './create-instansi.dto';

export class UpdateInstansiDto extends PartialType(CreateInstansiDto) {}
