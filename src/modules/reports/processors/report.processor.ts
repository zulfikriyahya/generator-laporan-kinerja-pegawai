import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ReportsService } from '../reports.service';
import { DocxExportService } from '../services/docx-export.service';
import { PdfExportService } from '../services/pdf-export.service';

@Processor('report-generation')
export class ReportProcessor extends WorkerHost {
  private readonly logger = new Logger(ReportProcessor.name);

  constructor(
    private reportsService: ReportsService,
    private docxExportService: DocxExportService,
    private pdfExportService: PdfExportService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);

    switch (job.name) {
      case 'generate-report':
        return this.handleGenerateReport(job);
      case 'export-report':
        return this.handleExportReport(job);
      default:
        throw new Error(`Unknown job type: ${job.name}`);
    }
  }

  private async handleGenerateReport(job: Job) {
    const { dto, userId } = job.data;

    try {
      await job.updateProgress(10);
      this.logger.log(`Generating report for user: ${userId}`);

      const result = await this.reportsService.generateReport(dto, userId);

      await job.updateProgress(100);
      this.logger.log(`Report generated successfully: ${result.id}`);

      return result;
    } catch (error) {
      this.logger.error(`Failed to generate report: ${error.message}`);
      throw error;
    }
  }

  private async handleExportReport(job: Job) {
    const { reportId, format } = job.data;

    try {
      await job.updateProgress(20);
      this.logger.log(`Exporting report ${reportId} as ${format}`);

      const report = await this.reportsService.findOne(reportId);

      await job.updateProgress(50);

      let buffer: Buffer;
      if (format === 'docx') {
        buffer = await this.docxExportService.generate(report);
      } else if (format === 'pdf') {
        buffer = await this.pdfExportService.generate(report);
      } else {
        throw new Error(`Unsupported format: ${format}`);
      }

      await job.updateProgress(100);
      this.logger.log(`Report exported successfully: ${buffer.length} bytes`);

      return {
        reportId,
        format,
        size: buffer.length,
        success: true,
      };
    } catch (error) {
      this.logger.error(`Failed to export report: ${error.message}`);
      throw error;
    }
  }
}
