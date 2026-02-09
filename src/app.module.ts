import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { BullModule } from '@nestjs/bullmq';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PegawaiModule } from './modules/pegawai/pegawai.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AiModule } from './modules/ai/ai.module';
import { FilesModule } from './modules/files/files.module';
import { InstansiModule } from './modules/instansi/instansi.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuditModule } from './modules/audit/audit.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Logger
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transports: [
          new winston.transports.Console({
            level: config.get('LOG_LEVEL') || 'info',
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.colorize(),
              winston.format.printf(({ timestamp, level, message, context }) => {
                return `${timestamp} [${context}] ${level}: ${message}`;
              }),
            ),
          }),
          new winston.transports.File({
            filename: `${config.get('LOG_FILE_PATH') || './logs'}/error.log`,
            level: 'error',
          }),
          new winston.transports.File({
            filename: `${config.get('LOG_FILE_PATH') || './logs'}/combined.log`,
          }),
        ],
      }),
    }),

    // Rate Limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: parseInt(config.get('RATE_LIMIT_TTL') || '60', 10) * 1000,
            limit: parseInt(config.get('RATE_LIMIT_MAX') || '100', 10),
          },
        ],
      }),
    }),

    // BullMQ (Queue)
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST') || 'localhost',
          port: parseInt(config.get('REDIS_PORT') || '6379', 10),
          password: config.get('REDIS_PASSWORD'),
          db: parseInt(config.get('REDIS_DB') || '0', 10),
        },
        prefix: config.get('QUEUE_PREFIX') || 'ekinerja',
      }),
    }),

    // Database
    PrismaModule,

    // Feature Modules
    AuthModule,
    UsersModule,
    PegawaiModule,
    ReportsModule,
    AiModule,
    FilesModule,
    InstansiModule,
    NotificationsModule,
    AuditModule,
    HealthModule,
  ],
})
export class AppModule {}
