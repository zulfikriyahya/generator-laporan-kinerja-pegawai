import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ReportQueue {
  constructor(@InjectQueue('report-generation') private reportQueue: Queue) {}

  async addReportGenerationJob(data: any) {
    return this.reportQueue.add('generate-report', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }

  async addExportJob(reportId: string, format: 'pdf' | 'docx') {
    return this.reportQueue.add(
      'export-report',
      { reportId, format },
      {
        attempts: 2,
        backoff: {
          type: 'fixed',
          delay: 1000,
        },
      },
    );
  }

  async getJobStatus(jobId: string) {
    const job = await this.reportQueue.getJob(jobId);
    if (!job) {
      return null;
    }

    return {
      id: job.id,
      status: await job.getState(),
      progress: job.progress,
      data: job.data,
      returnvalue: job.returnvalue,
      failedReason: job.failedReason,
    };
  }
}
