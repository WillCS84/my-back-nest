import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { LaunchesService } from 'src/laucher/laucher.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => LaunchesService))
    private readonly laucherService: LaunchesService,
  ) {}

  async create(data: CreateCategoryDto) {
    return await this.prisma.category.create({ data });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const teste = await this.prisma.category.findUnique({
      where: { id_category: id },
    });

    console.log('teste', teste);
    return teste;
  }

  async update(id: number, data: UpdateCategoryDto) {
    const categoryExists = await this.findOne(id);

    if (!categoryExists) {
      throw new BadRequestException('Categoria não encontrada!');
    }

    return await this.prisma.category.update({
      where: { id_category: id },
      data,
    });
  }

  async remove(id: number) {
    const categoryExists = await this.findOne(id);

    if (!categoryExists) {
      throw new BadRequestException('Categoria não encontrada!');
    }

    const linkedLaunches = await this.laucherService.getLaunchesByCategory(id);

    if (linkedLaunches.length > 0) {
      throw new BadRequestException(
        'Esta categoria está vinculada a lançamentos e não pode ser deletada.',
      );
    }

    return await this.prisma.category.delete({ where: { id_category: id } });
  }
}
