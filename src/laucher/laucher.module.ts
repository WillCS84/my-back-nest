import { Module, forwardRef } from '@nestjs/common';
import { LaucherController } from './laucher.controller';
import { LaunchesService } from './laucher.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryModule } from 'src/category/category.module';
import { PaymentMethodModule } from 'src/payment-method/payment-method.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => CategoryModule),
    forwardRef(() => PaymentMethodModule),
  ],
  controllers: [LaucherController],
  providers: [LaunchesService],
  exports: [LaunchesService],
})
export class LaucherModule {}
