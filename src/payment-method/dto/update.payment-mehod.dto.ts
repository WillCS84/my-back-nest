import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentMethodDto } from './create.payment-mathod.dto';

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {}
