import { Injectable, BadRequestException } from '@nestjs/common';

import { CreateLaunchDto } from './dto/create.laucher.dto';
import { CategoryService } from 'src/category/category.service';
import { PaymentMethodService } from 'src/payment-method/payment-method.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateLaucherDto } from './dto/update.laucher.dto';

@Injectable()
export class LaunchesService {
  constructor(
    private readonly categoriesServices: CategoryService,
    private readonly paymentMethodServices: PaymentMethodService,
    private readonly prisma: PrismaService,
  ) {}
  async create(dto: CreateLaunchDto) {
    const categoryExists = await this.categoriesServices.findOne(
      +dto.category_id,
    );

    if (!categoryExists) {
      throw new BadRequestException('Categoria inválida.');
    }

    const paymentMethodExists = await this.paymentMethodServices.findOne(
      +dto.payment_method_id,
    );

    if (!paymentMethodExists) {
      throw new BadRequestException('Método de pagamento inválido.');
    }

    return await this.prisma.laucher.create({
      data: {
        description: dto.description,
        value: dto.value,
        launch_date: new Date(dto.launch_date),
        status: dto.status,
        category_id: +dto.category_id,
        payment_method_id: +dto.payment_method_id,
      },
      include: {
        category: true,
        paymentMethod: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.laucher.findMany({
      include: { category: true, paymentMethod: true },
    });
  }

  async findOne(id: number) {
    return await this.prisma.laucher.findUnique({
      where: { id_laucher: id },
      include: { category: true, paymentMethod: true },
    });
  }

  async update(id: number, data: UpdateLaucherDto) {
    const laucherExists = await this.findOne(id);

    if (!laucherExists) {
      throw new BadRequestException('Lançamento não encontrado!');
    }

    if (!data.payment_method_id) {
      throw new BadRequestException('Método de pagamento é obrigatório!');
    }

    const paymentMethodExists = await this.paymentMethodServices.findOne(
      +data.payment_method_id,
    );

    if (!paymentMethodExists) {
      throw new BadRequestException('Método de pagamento não encontrado!');
    }

    if (!data.category_id) {
      throw new BadRequestException('Categoria é obrigatório!');
    }

    const categoryExists = await this.categoriesServices.findOne(
      +data.category_id,
    );

    if (!categoryExists) {
      throw new BadRequestException('Categoria não encontrada!');
    }

    const newData = {
      description: data.description,
      value: data.value,
      launch_date: data.launch_date ? new Date(data.launch_date) : undefined,
      status: data.status,
      category_id: +data.category_id,
      payment_method_id: +data.payment_method_id,
    };

    return await this.prisma.laucher.update({
      where: { id_laucher: id },
      data: newData,
      include: { category: true, paymentMethod: true },
    });
  }

  async remove(id: number) {
    const laucherExists = await this.findOne(id);

    if (!laucherExists) {
      throw new BadRequestException('Lançamento não encontrado!');
    }

    return await this.prisma.laucher.delete({ where: { id_laucher: id } });
  }

  async getLaunchesByCategory(id: number) {
    return await this.prisma.laucher.findMany({
      where: { category_id: id },
      include: { category: true },
    });
  }

  async getLaunchesByPaymentMethod(id: number) {
    return await this.prisma.laucher.findMany({
      where: { id_laucher: id },
      include: { paymentMethod: true },
    });
  }
}
