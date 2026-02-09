import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  /**
   * Create and send notification
   */
  async create(
    userId: string,
    data: {
      title: string;
      message: string;
      type:
        | 'INFO'
        | 'SUCCESS'
        | 'WARNING'
        | 'ERROR'
        | 'REPORT_SUBMITTED'
        | 'REPORT_APPROVED'
        | 'REPORT_REJECTED';
      metadata?: any;
    },
  ) {
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        title: data.title,
        message: data.message,
        type: data.type,
        metadata: data.metadata,
      },
    });

    // Send real-time notification via WebSocket
    this.notificationsGateway.sendToUser(userId, notification);

    this.logger.log(`Notification created for user ${userId}: ${notification.id}`);
    return notification;
  }

  /**
   * Get user notifications
   */
  async findByUser(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notification.count({ where: { userId } }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        unreadCount: await this.getUnreadCount(userId),
      },
    };
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  /**
   * Mark as read
   */
  async markAsRead(id: string, userId: string) {
    const notification = await this.prisma.notification.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return { success: true };
  }

  /**
   * Mark all as read
   */
  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return { success: true };
  }

  /**
   * Delete notification
   */
  async remove(id: string, userId: string) {
    await this.prisma.notification.deleteMany({
      where: {
        id,
        userId,
      },
    });

    return { success: true };
  }

  /**
   * Send report notification
   */
  async sendReportNotification(
    userId: string,
    type: 'SUBMITTED' | 'APPROVED' | 'REJECTED',
    report: any,
  ) {
    const messages = {
      SUBMITTED: {
        title: 'Laporan Disubmit',
        message: `Laporan kinerja bulan ${report.bulan}/${report.tahun} telah disubmit untuk approval`,
        type: 'REPORT_SUBMITTED' as const,
      },
      APPROVED: {
        title: 'Laporan Disetujui',
        message: `Laporan kinerja bulan ${report.bulan}/${report.tahun} telah disetujui`,
        type: 'REPORT_APPROVED' as const,
      },
      REJECTED: {
        title: 'Laporan Ditolak',
        message: `Laporan kinerja bulan ${report.bulan}/${report.tahun} ditolak. Silakan periksa dan revisi.`,
        type: 'REPORT_REJECTED' as const,
      },
    };

    const config = messages[type];

    return this.create(userId, {
      ...config,
      metadata: {
        reportId: report.id,
        bulan: report.bulan,
        tahun: report.tahun,
      },
    });
  }
}
