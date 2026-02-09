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
  HttpCode,
  HttpStatus,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser, Roles } from '../auth/decorators';
import { DocxExportService } from './services/docx-export.service';
import { PdfExportService } from './services/pdf-export.service';

@ApiTags('reports')
@Controller('reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly docxExportService: DocxExportService,
    private readonly pdfExportService: PdfExportService,
  ) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate new report using AI' })
  @ApiResponse({ status: 201, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async generateReport(@Body() dto: CreateReportDto, @GetUser('id') userId: string) {
    return this.reportsService.generateReport(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reports with filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'bulan', required: false, type: Number })
  @ApiQuery({ name: 'tahun', required: false, type: Number })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('bulan') bulan?: string,
    @Query('tahun') tahun?: string,
    @GetUser('id') userId?: string,
  ) {
    return this.reportsService.findAll(parseInt(page || '1'), parseInt(limit || '10'), {
      userId,
      status,
      bulan: bulan ? parseInt(bulan) : undefined,
      tahun: tahun ? parseInt(tahun) : undefined,
    });
  }

  @Get('my-reports')
  @ApiOperation({ summary: 'Get current user reports' })
  async getMyReports(
    @GetUser('id') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reportsService.findAll(parseInt(page || '1'), parseInt(limit || '10'), { userId });
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get reports statistics' })
  async getStatistics(@GetUser('id') userId?: string) {
    return this.reportsService.getStatistics(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report by ID' })
  async findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update report' })
  async update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Post(':id/submit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit report for approval' })
  async submitReport(@Param('id') id: string) {
    return this.reportsService.submitReport(id);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Approve report' })
  async approveReport(@Param('id') id: string) {
    return this.reportsService.approveReport(id);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Reject report' })
  async rejectReport(@Param('id') id: string, @Body('reason') reason: string) {
    return this.reportsService.update(id, {
      status: 'REJECTED',
      metadata: { reason },
    } as UpdateReportDto);
  }

  @Get(':id/export/docx')
  @ApiOperation({ summary: 'Export report to DOCX' })
  async exportDOCX(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const report = await this.reportsService.findOne(id);
    const buffer = await this.docxExportService.generate(report);

    const filename = `Laporan_Kinerja_${report.pegawai.nama}_${report.bulan}_${report.tahun}.docx`;

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length,
    });

    return new StreamableFile(buffer);
  }

  @Get(':id/export/pdf')
  @ApiOperation({ summary: 'Export report to PDF' })
  async exportPDF(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const report = await this.reportsService.findOne(id);
    const buffer = await this.pdfExportService.generate(report);

    const filename = `Laporan_Kinerja_${report.pegawai.nama}_${report.bulan}_${report.tahun}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length,
    });

    return new StreamableFile(buffer);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete report' })
  async remove(@Param('id') id: string) {
    return this.reportsService.remove(id);
  }
}
