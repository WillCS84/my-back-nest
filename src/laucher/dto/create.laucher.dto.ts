// create-launch.dto.ts
import {
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
  IsUUID,
  IsNotEmpty,
  Min,
} from 'class-validator';

export enum LaunchStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}

export class CreateLaunchDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  value: number;

  @IsDateString()
  launch_date: string;

  @IsEnum(LaunchStatus)
  status: LaunchStatus;

  @IsNumber()
  category_id: string;

  @IsNumber()
  payment_method_id: string;
}
