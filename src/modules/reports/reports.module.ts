import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportQueue } from './queues/report.queue';
import { ReportProcessor } from './processors/report.processor';
import { DocxExportService } from './services/docx-export.service';
import { PdfExportService } from './services/pdf-export.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'report-generation',
    }),
    AiModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService, ReportQueue, ReportProcessor, DocxExportService, PdfExportService],
  exports: [ReportsService, DocxExportService, PdfExportService],
})
export class ReportsModule {}
