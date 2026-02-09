import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreatePegawaiDto } from './dto/create-pegawai.dto';
import { UpdatePegawaiDto } from './dto/update-pegawai.dto';

@Injectable()
export class PegawaiService {
  private readonly logger = new Logger(PegawaiService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Create new pegawai
   */
  async create(createPegawaiDto: CreatePegawaiDto, userId: string) {
    this.logger.log(`Creating pegawai for user: ${userId}`);

    // Check if user already has pegawai
    const existing = await this.prisma.pegawai.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new BadRequestException('User sudah memiliki data pegawai');
    }

    // Check NIP uniqueness
    if (createPegawaiDto.nip) {
      const existingNip = await this.prisma.pegawai.findUnique({
        where: { nip: createPegawaiDto.nip },
      });

      if (existingNip) {
        throw new BadRequestException('NIP sudah terdaftar');
      }
    }

    const pegawai = await this.prisma.pegawai.create({
      data: {
        ...createPegawaiDto,
        userId,
      },
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
    });

    this.logger.log(`Pegawai created: ${pegawai.id}`);
    return pegawai;
  }

  /**
   * Get all pegawai with pagination
   */
  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { nama: { contains: search } },
            { nip: { contains: search } },
            { jabatan: { contains: search } },
            { unitKerja: { contains: search } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.pegawai.findMany({
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
              isActive: true,
            },
          },
          akademik: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.pegawai.count({ where }),
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
   * Get pegawai by id
   */
  async findOne(id: string) {
    const pegawai = await this.prisma.pegawai.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isActive: true,
          },
        },
        akademik: true,
        reports: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            bulan: true,
            tahun: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!pegawai) {
      throw new NotFoundException(`Pegawai dengan ID ${id} tidak ditemukan`);
    }

    return pegawai;
  }

  /**
   * Get pegawai by user id
   */
  async findByUserId(userId: string) {
    const pegawai = await this.prisma.pegawai.findUnique({
      where: { userId },
      include: {
        akademik: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });

    if (!pegawai) {
      throw new NotFoundException('Data pegawai tidak ditemukan untuk user ini');
    }

    return pegawai;
  }

  /**
   * Get pegawai by NIP
   */
  async findByNip(nip: string) {
    const pegawai = await this.prisma.pegawai.findUnique({
      where: { nip },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        akademik: true,
      },
    });

    if (!pegawai) {
      throw new NotFoundException(`Pegawai dengan NIP ${nip} tidak ditemukan`);
    }

    return pegawai;
  }

  /**
   * Update pegawai
   */
  async update(id: string, updatePegawaiDto: UpdatePegawaiDto) {
    const pegawai = await this.prisma.pegawai.findUnique({
      where: { id },
    });

    if (!pegawai) {
      throw new NotFoundException(`Pegawai dengan ID ${id} tidak ditemukan`);
    }

    // Check NIP uniqueness if changed
    if (updatePegawaiDto.nip && updatePegawaiDto.nip !== pegawai.nip) {
      const existingNip = await this.prisma.pegawai.findUnique({
        where: { nip: updatePegawaiDto.nip },
      });

      if (existingNip) {
        throw new BadRequestException('NIP sudah terdaftar');
      }
    }

    const updated = await this.prisma.pegawai.update({
      where: { id },
      data: updatePegawaiDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        akademik: true,
      },
    });

    this.logger.log(`Pegawai updated: ${id}`);
    return updated;
  }

  /**
   * Delete pegawai
   */
  async remove(id: string) {
    const pegawai = await this.prisma.pegawai.findUnique({
      where: { id },
    });

    if (!pegawai) {
      throw new NotFoundException(`Pegawai dengan ID ${id} tidak ditemukan`);
    }

    await this.prisma.pegawai.delete({
      where: { id },
    });

    this.logger.log(`Pegawai deleted: ${id}`);
    return { message: 'Pegawai berhasil dihapus' };
  }

  /**
   * Get statistics
   */
  async getStatistics() {
    const [total, byJenis, byStatus, byJabatan] = await Promise.all([
      this.prisma.pegawai.count(),
      this.prisma.pegawai.groupBy({
        by: ['jenisPegawai'],
        _count: true,
      }),
      this.prisma.pegawai.groupBy({
        by: ['statusPegawai'],
        _count: true,
      }),
      this.prisma.pegawai.groupBy({
        by: ['jabatan'],
        _count: true,
        orderBy: {
          _count: {
            jabatan: 'desc',
          },
        },
        take: 5,
      }),
    ]);

    return {
      total,
      byJenis,
      byStatus,
      topJabatan: byJabatan,
    };
  }
}
