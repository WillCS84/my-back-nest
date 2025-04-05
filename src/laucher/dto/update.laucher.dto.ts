import { PartialType } from '@nestjs/mapped-types';
import { CreateLaunchDto } from './create.laucher.dto';

export class UpdateLaucherDto extends PartialType(CreateLaunchDto) {}
