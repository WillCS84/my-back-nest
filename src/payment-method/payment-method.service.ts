import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentMethodDto } from './dto/create.payment-mathod.dto';

import { UpdatePaymentMethodDto } from './dto/update.payment-mehod.dto';
import { LaunchesService } from 'src/laucher/laucher.service';

@Injectable()
export class PaymentMethodService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => LaunchesService))
    private readonly launchesServices: LaunchesService,
  ) {}

  async create(data: CreatePaymentMethodDto) {
    return await this.prisma.paymentMethod.create({ data });
  }

  async findAll() {
    return await this.prisma.paymentMethod.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.paymentMethod.findUnique({
      where: { id_payment_method: id },
    });
  }

  async update(id: number, data: UpdatePaymentMethodDto) {
    const paymentMethodExists = await this.findOne(id);

    if (!paymentMethodExists) {
      throw new BadRequestException('Método de pagamento não encontrado!');
    }

    return await this.prisma.paymentMethod.update({
      where: { id_payment_method: id },
      data,
    });
  }

  async remove(id: number) {
    const paymentMethodExists = await this.findOne(id);

    if (!paymentMethodExists) {
      throw new BadRequestException('Método de pagamento não encontrado!');
    }

    const linkedLaunches =
      await this.launchesServices.getLaunchesByPaymentMethod(id);

    if (linkedLaunches.length > 0) {
      throw new BadRequestException(
        'Este método de pagamento está vinculado a lançamentos e não pode ser deletado.',
      );
    }

    return await this.prisma.paymentMethod.delete({
      where: { id_payment_method: id },
    });
  }
}
