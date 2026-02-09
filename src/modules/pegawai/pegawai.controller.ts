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
import { PegawaiService } from './pegawai.service';
import { CreatePegawaiDto } from './dto/create-pegawai.dto';
import { UpdatePegawaiDto } from './dto/update-pegawai.dto';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser, Roles } from '../auth/decorators';

@ApiTags('pegawai')
@Controller('pegawai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PegawaiController {
  constructor(private readonly pegawaiService: PegawaiService) {}

  @Post()
  @ApiOperation({ summary: 'Create pegawai data' })
  @ApiResponse({ status: 201, description: 'Pegawai created successfully' })
  create(@Body() createPegawaiDto: CreatePegawaiDto, @GetUser('id') userId: string) {
    return this.pegawaiService.create(createPegawaiDto, userId);
  }

  @Get()
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Get all pegawai' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.pegawaiService.findAll(parseInt(page || '1'), parseInt(limit || '10'), search);
  }

  @Get('statistics')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Get pegawai statistics' })
  getStatistics() {
    return this.pegawaiService.getStatistics();
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user pegawai data' })
  getMyData(@GetUser('id') userId: string) {
    return this.pegawaiService.findByUserId(userId);
  }

  @Get('nip/:nip')
  @ApiOperation({ summary: 'Get pegawai by NIP' })
  findByNip(@Param('nip') nip: string) {
    return this.pegawaiService.findByNip(nip);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pegawai by ID' })
  findOne(@Param('id') id: string) {
    return this.pegawaiService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update pegawai' })
  update(@Param('id') id: string, @Body() updatePegawaiDto: UpdatePegawaiDto) {
    return this.pegawaiService.update(id, updatePegawaiDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete pegawai' })
  remove(@Param('id') id: string) {
    return this.pegawaiService.remove(id);
  }
}
