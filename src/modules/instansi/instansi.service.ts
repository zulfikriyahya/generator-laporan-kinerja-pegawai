import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateInstansiDto } from './dto/create-instansi.dto';
import { UpdateInstansiDto } from './dto/update-instansi.dto';

@Injectable()
export class InstansiService {
  private readonly logger = new Logger(InstansiService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Create new instansi
   */
  async create(createInstansiDto: CreateInstansiDto) {
    this.logger.log('Creating new instansi');

    const instansi = await this.prisma.instansi.create({
      data: createInstansiDto,
    });

    this.logger.log(`Instansi created: ${instansi.id}`);
    return instansi;
  }

  /**
   * Get all instansi
   */
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.instansi.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.instansi.count(),
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
   * Get active instansi
   */
  async findActive() {
    return this.prisma.instansi.findFirst({
      where: { isActive: true },
    });
  }

  /**
   * Get instansi by id
   */
  async findOne(id: string) {
    const instansi = await this.prisma.instansi.findUnique({
      where: { id },
      include: {
        reports: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!instansi) {
      throw new NotFoundException(`Instansi dengan ID ${id} tidak ditemukan`);
    }

    return instansi;
  }

  /**
   * Update instansi
   */
  async update(id: string, updateInstansiDto: UpdateInstansiDto) {
    const exists = await this.prisma.instansi.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Instansi dengan ID ${id} tidak ditemukan`);
    }

    const updated = await this.prisma.instansi.update({
      where: { id },
      data: updateInstansiDto,
    });

    this.logger.log(`Instansi updated: ${id}`);
    return updated;
  }

  /**
   * Set as active instansi
   */
  async setActive(id: string) {
    // Deactivate all other instansi
    await this.prisma.instansi.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // Activate selected instansi
    const updated = await this.prisma.instansi.update({
      where: { id },
      data: { isActive: true },
    });

    this.logger.log(`Instansi set as active: ${id}`);
    return updated;
  }

  /**
   * Delete instansi
   */
  async remove(id: string) {
    const exists = await this.prisma.instansi.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Instansi dengan ID ${id} tidak ditemukan`);
    }

    await this.prisma.instansi.delete({
      where: { id },
    });

    this.logger.log(`Instansi deleted: ${id}`);
    return { message: 'Instansi berhasil dihapus' };
  }
}
