import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LaunchesService } from './laucher.service';
import { Prisma } from '@prisma/client';
import { CreateLaunchDto } from './dto/create.laucher.dto';
import { UpdateLaucherDto } from './dto/update.laucher.dto';

@Controller('launchers')
export class LaucherController {
  constructor(private readonly launchesService: LaunchesService) {}

  @Post()
  async create(@Body() dto: CreateLaunchDto) {
    return await this.launchesService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.launchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.launchesService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateLaucherDto) {
    return await this.launchesService.update(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.launchesService.remove(+id);
  }
}
