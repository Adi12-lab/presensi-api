import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { ProdiService } from './prodi.service';
import { Role } from 'src/role/role.decorator';
import { Role as RoleEnum } from '@prisma/client';
import { ProdiDto } from './prodi.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';

@Controller('prodi')
export class ProdiController {
  constructor(private prodiService: ProdiService) {}

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: ProdiDto) {
    return await this.prodiService.create(payload);
  }

  @Role([RoleEnum.admin, RoleEnum.dosen])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all() {
    return await this.prodiService.all();
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':kode')
  async update(@Param('kode') kode: string, @Body() payload: ProdiDto) {
    return await this.prodiService.update(kode, payload);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':kode')
  async delete(@Param('kode') kode: string) {
    return await this.prodiService.delete(kode);
  }
}
