import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
  Body,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';

@ApiTags('files')
@Controller('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload single file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        category: {
          type: 'string',
          enum: ['FOTO_PEGAWAI', 'LOGO_INSTANSI', 'TTD', 'LAMPIRAN', 'DOKUMEN', 'OTHER'],
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') userId: string,
    @Body('category') category?: string,
  ) {
    return this.filesService.uploadFile(file, userId, category);
  }

  @Post('upload-multiple')
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @GetUser('id') userId: string,
    @Body('category') category?: string,
  ) {
    return this.filesService.uploadMultipleFiles(files, userId, category);
  }

  @Post('upload-base64')
  @ApiOperation({ summary: 'Upload base64 encoded image' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'string',
          description: 'Base64 encoded image data',
        },
        category: {
          type: 'string',
          enum: ['FOTO_PEGAWAI', 'LOGO_INSTANSI', 'TTD', 'LAMPIRAN', 'DOKUMEN', 'OTHER'],
        },
      },
    },
  })
  async uploadBase64(
    @Body('data') base64Data: string,
    @GetUser('id') userId: string,
    @Body('category') category?: string,
  ) {
    return this.filesService.saveBase64Image(base64Data, userId, category);
  }

  @Get()
  @ApiOperation({ summary: 'Get all files' })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
  ) {
    return this.filesService.findAll(parseInt(page || '1'), parseInt(limit || '10'), category);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get storage statistics' })
  getStatistics() {
    return this.filesService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get file by ID' })
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete file' })
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
