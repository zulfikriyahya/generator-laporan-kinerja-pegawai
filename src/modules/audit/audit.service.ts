import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Log audit event
   */
  async log(data: {
    userId: string;
    action: string;
    entity: string;
    entityId?: string;
    oldData?: any;
    newData?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    try {
      const auditLog = await this.prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          entity: data.entity,
          entityId: data.entityId,
          oldData: data.oldData,
          newData: data.newData,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
        },
      });

      this.logger.log(
        `Audit: ${data.action} on ${data.entity}${data.entityId ? ` (${data.entityId})` : ''} by user ${data.userId}`,
      );

      return auditLog;
    } catch (error) {
      this.logger.error(`Failed to create audit log: ${error.message}`);
      // Don't throw error - audit logging should not break the main flow
      return null;
    }
  }

  /**
   * Get audit logs with filters
   */
  async findAll(
    page: number = 1,
    limit: number = 50,
    filters?: {
      userId?: string;
      entity?: string;
      action?: string;
      startDate?: Date;
      endDate?: Date;
    },
  ) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (filters?.userId) where.userId = filters.userId;
    if (filters?.entity) where.entity = filters.entity;
    if (filters?.action) where.action = filters.action;

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get audit logs for specific entity
   */
  async findByEntity(entity: string, entityId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: {
          entity,
          entityId,
        },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({
        where: {
          entity,
          entityId,
        },
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get user activity
   */
  async getUserActivity(userId: string, page: number = 1, limit: number = 50) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where: { userId } }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get statistics
   */
  async getStatistics(startDate?: Date, endDate?: Date) {
    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const [total, byAction, byEntity, byUser] = await Promise.all([
      this.prisma.auditLog.count({ where }),
      this.prisma.auditLog.groupBy({
        by: ['action'],
        where,
        _count: true,
        orderBy: {
          _count: {
            action: 'desc',
          },
        },
      }),
      this.prisma.auditLog.groupBy({
        by: ['entity'],
        where,
        _count: true,
        orderBy: {
          _count: {
            entity: 'desc',
          },
        },
      }),
      this.prisma.auditLog.groupBy({
        by: ['userId'],
        where,
        _count: true,
        orderBy: {
          _count: {
            userId: 'desc',
          },
        },
        take: 10,
      }),
    ]);

    return {
      total,
      byAction,
      byEntity,
      topUsers: byUser,
    };
  }

  /**
   * Clean old logs (retention policy)
   */
  async cleanOldLogs(daysToKeep: number = 90) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const deleted = await this.prisma.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    this.logger.log(`Cleaned ${deleted.count} audit logs older than ${daysToKeep} days`);

    return {
      deleted: deleted.count,
      cutoffDate,
    };
  }
}
