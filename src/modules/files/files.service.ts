import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/common/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);
  private readonly uploadPath: string;
  private readonly maxFileSize: number;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    this.uploadPath = this.config.get('UPLOAD_DEST') || './uploads';
    this.maxFileSize = parseInt(this.config.get('MAX_FILE_SIZE') || '10485760', 10);

    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  /**
   * Upload single file
   */
  async uploadFile(file: Express.Multer.File, uploadedBy: string, category: string = 'OTHER') {
    this.logger.log(`Uploading file: ${file.originalname}`);

    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File terlalu besar. Maksimal ${this.maxFileSize / 1024 / 1024}MB`,
      );
    }

    const fileRecord = await this.prisma.fileUpload.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
        url: `/uploads/${file.filename}`,
        uploadedBy,
        category: category as any,
      },
    });

    this.logger.log(`File uploaded: ${fileRecord.id}`);
    return fileRecord;
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(
    files: Express.Multer.File[],
    uploadedBy: string,
    category: string = 'OTHER',
  ) {
    const uploadedFiles = await Promise.all(
      files.map((file) => this.uploadFile(file, uploadedBy, category)),
    );

    return uploadedFiles;
  }

  /**
   * Get file by id
   */
  async findOne(id: string) {
    return this.prisma.fileUpload.findUnique({
      where: { id },
    });
  }

  /**
   * Get all files with pagination
   */
  async findAll(page: number = 1, limit: number = 10, category?: string) {
    const skip = (page - 1) * limit;
    const where = category ? { category: category as any } : {};

    const [data, total] = await Promise.all([
      this.prisma.fileUpload.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.fileUpload.count({ where }),
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
   * Delete file
   */
  async remove(id: string) {
    const file = await this.prisma.fileUpload.findUnique({
      where: { id },
    });

    if (!file) {
      throw new BadRequestException('File tidak ditemukan');
    }

    // Delete physical file
    try {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (error) {
      this.logger.error(`Failed to delete physical file: ${error.message}`);
    }

    // Delete from database
    await this.prisma.fileUpload.delete({
      where: { id },
    });

    this.logger.log(`File deleted: ${id}`);
    return { message: 'File berhasil dihapus' };
  }

  /**
   * Process base64 image and save to disk
   */
  async saveBase64Image(
    base64Data: string,
    uploadedBy: string,
    category: string = 'OTHER',
  ): Promise<any> {
    // Extract base64 content
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new BadRequestException('Invalid base64 format');
    }

    const mimetype = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const size = buffer.length;

    // Validate size
    if (size > this.maxFileSize) {
      throw new BadRequestException(
        `File terlalu besar. Maksimal ${this.maxFileSize / 1024 / 1024}MB`,
      );
    }

    // Generate filename
    const ext = mimetype.split('/')[1];
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
    const filepath = path.join(this.uploadPath, filename);

    // Save to disk
    fs.writeFileSync(filepath, buffer);

    // Save to database
    const fileRecord = await this.prisma.fileUpload.create({
      data: {
        filename,
        originalName: filename,
        mimetype,
        size,
        path: filepath,
        url: `/uploads/${filename}`,
        uploadedBy,
        category: category as any,
      },
    });

    this.logger.log(`Base64 image saved: ${fileRecord.id}`);
    return fileRecord;
  }

  /**
   * Get storage statistics
   */
  async getStatistics() {
    const [totalFiles, totalSize, byCategory] = await Promise.all([
      this.prisma.fileUpload.count(),
      this.prisma.fileUpload.aggregate({
        _sum: {
          size: true,
        },
      }),
      this.prisma.fileUpload.groupBy({
        by: ['category'],
        _count: true,
        _sum: {
          size: true,
        },
      }),
    ]);

    return {
      totalFiles,
      totalSize: totalSize._sum.size || 0,
      byCategory,
    };
  }
}
