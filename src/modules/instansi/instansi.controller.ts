import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { InstansiService } from './instansi.service';
import { CreateInstansiDto } from './dto/create-instansi.dto';
import { UpdateInstansiDto } from './dto/update-instansi.dto';
import { JwtAuthGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';

@ApiTags('instansi')
@Controller('instansi')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InstansiController {
  constructor(private readonly instansiService: InstansiService) {}

  @Post()
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Create new instansi' })
  @ApiResponse({ status: 201, description: 'Instansi created successfully' })
  create(@Body() createInstansiDto: CreateInstansiDto) {
    return this.instansiService.create(createInstansiDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all instansi' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.instansiService.findAll(parseInt(page || '1'), parseInt(limit || '10'));
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active instansi' })
  findActive() {
    return this.instansiService.findActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get instansi by ID' })
  findOne(@Param('id') id: string) {
    return this.instansiService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Update instansi' })
  update(@Param('id') id: string, @Body() updateInstansiDto: UpdateInstansiDto) {
    return this.instansiService.update(id, updateInstansiDto);
  }

  @Patch(':id/set-active')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Set instansi as active' })
  setActive(@Param('id') id: string) {
    return this.instansiService.setActive(id);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete instansi' })
  remove(@Param('id') id: string) {
    return this.instansiService.remove(id);
  }
}
