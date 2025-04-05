import { Module, forwardRef } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LaucherModule } from 'src/laucher/laucher.module';

@Module({
  imports: [PrismaModule, forwardRef(() => LaucherModule)],
  providers: [PaymentMethodService],
  controllers: [PaymentMethodController],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
