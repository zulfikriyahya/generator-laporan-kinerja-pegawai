import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async generateReport(dto: CreateReportDto, userId: string) {
    this.logger.log(`Generating report for user: ${userId}`);

    const pegawai = await this.prisma.pegawai.findUnique({
      where: { userId },
      include: { akademik: true },
    });

    if (!pegawai) {
      throw new NotFoundException('Data pegawai tidak ditemukan');
    }

    const instansi = await this.prisma.instansi.findFirst({
      where: { isActive: true },
    });

    if (!instansi) {
      throw new BadRequestException('Data instansi tidak ditemukan');
    }

    const aiResult = await this.aiService.generateReport({
      model: dto.modelAI,
      bulan: dto.bulan,
      tahun: dto.tahun,
      pegawai: {
        nama: pegawai.nama,
        nip: pegawai.nip,
        jabatan: pegawai.jabatan,
        golongan: pegawai.golongan ?? undefined,
        unitKerja: pegawai.unitKerja,
        jenisPegawai: pegawai.jenisPegawai,
        masaKerjaTahun: pegawai.masaKerjaTahun,
        masaKerjaBulan: pegawai.masaKerjaBulan,
      },
      kinerja: {
        tugasPokok: dto.tugasPokok,
        tugasTambahan: dto.tugasTambahan,
        targetTahunan: dto.targetTahunan,
        hambatan: dto.hambatan,
        solusi: dto.solusi,
      },
      akademik: pegawai.akademik
        ? {
            kurikulum: pegawai.akademik.kurikulum,
            tahunPelajaran: pegawai.akademik.tahunPelajaran,
            semester: pegawai.akademik.semester,
            mapel: pegawai.akademik.mapel,
            kelas: pegawai.akademik.kelas,
            jamMengajar: pegawai.akademik.jamMengajar,
            jumlahSiswa: pegawai.akademik.jumlahSiswa,
            ekskul: pegawai.akademik.ekskul ?? undefined,
          }
        : undefined,
      maxTokens: dto.tokenLimit || 2000,
      customInstruction: dto.customInstruction,
    });

    if (!aiResult.success || !aiResult.content) {
      throw new BadRequestException(`Gagal generate laporan: ${aiResult.error}`);
    }

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.report.findFirst({
        where: {
          pegawaiId: pegawai.id,
          bulan: dto.bulan,
          tahun: dto.tahun,
        },
      });

      if (existing) {
        throw new BadRequestException(`Laporan untuk periode ${dto.bulan}/${dto.tahun} sudah ada`);
      }

      const count = await tx.report.count({
        where: { bulan: dto.bulan, tahun: dto.tahun },
      });

      const nomorUrut = String(count + 1).padStart(3, '0');
      const bulanStr = String(dto.bulan).padStart(2, '0');
      const nomorDokumen = `${nomorUrut}/LPKP/${bulanStr}/${dto.tahun}`;

      const report = await tx.report.create({
        data: {
          pegawaiId: pegawai.id,
          instansiId: instansi.id,
          userId,
          bulan: dto.bulan,
          tahun: dto.tahun,
          tugasPokok: dto.tugasPokok,
          tugasTambahan: dto.tugasTambahan,
          targetTahunan: dto.targetTahunan,
          hambatan: dto.hambatan,
          solusi: dto.solusi,
          content: aiResult.content!,
          modelAI: dto.modelAI,
          tokensUsed: aiResult.tokensUsed || 0,
          nomorDokumen,
          status: 'DRAFT',
        },
        include: {
          pegawai: {
            select: {
              nama: true,
              nip: true,
              jabatan: true,
            },
          },
          instansi: {
            select: {
              header3: true,
            },
          },
        },
      });

      this.logger.log(`Report created via transaction: ${report.id}`);
      return report;
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    options?: {
      userId?: string;
      status?: string;
      bulan?: number;
      tahun?: number;
    },
  ) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (options?.userId) where.userId = options.userId;
    if (options?.status) where.status = options.status;
    if (options?.bulan) where.bulan = options.bulan;
    if (options?.tahun) where.tahun = options.tahun;

    const [data, total] = await Promise.all([
      this.prisma.report.findMany({
        where,
        skip,
        take: limit,
        include: {
          pegawai: {
            select: {
              nama: true,
              nip: true,
              jabatan: true,
            },
          },
          instansi: {
            select: {
              header3: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.report.count({ where }),
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

  async findOne(id: string) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        pegawai: {
          include: {
            akademik: true,
          },
        },
        instansi: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!report) {
      throw new NotFoundException('Laporan tidak ditemukan');
    }

    return report;
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    const report = await this.prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      throw new NotFoundException('Laporan tidak ditemukan');
    }

    const updated = await this.prisma.report.update({
      where: { id },
      data: {
        ...updateReportDto,
        status: updateReportDto.status as any,
      },
      include: {
        pegawai: {
          select: {
            nama: true,
            nip: true,
          },
        },
      },
    });

    this.logger.log(`Report updated: ${id}`);
    return updated;
  }

  async submitReport(id: string) {
    const report = await this.findOne(id);

    if (report.status !== 'DRAFT') {
      throw new BadRequestException('Hanya laporan dengan status DRAFT yang bisa disubmit');
    }

    const updated = await this.prisma.report.update({
      where: { id },
      data: {
        status: 'SUBMITTED',
        publishedAt: new Date(),
      },
    });

    this.logger.log(`Report submitted: ${id}`);
    return updated;
  }

  async approveReport(id: string) {
    const report = await this.findOne(id);

    if (report.status !== 'SUBMITTED') {
      throw new BadRequestException('Hanya laporan yang sudah disubmit yang bisa diapprove');
    }

    const updated = await this.prisma.report.update({
      where: { id },
      data: { status: 'APPROVED' },
    });

    this.logger.log(`Report approved: ${id}`);
    return updated;
  }

  async remove(id: string) {
    const report = await this.prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      throw new NotFoundException('Laporan tidak ditemukan');
    }

    await this.prisma.report.delete({
      where: { id },
    });

    this.logger.log(`Report deleted: ${id}`);
    return { message: 'Laporan berhasil dihapus' };
  }

  async getStatistics(userId?: string) {
    const where = userId ? { userId } : {};

    const [total, byStatus, byMonth] = await Promise.all([
      this.prisma.report.count({ where }),
      this.prisma.report.groupBy({
        by: ['status'],
        where,
        _count: true,
      }),
      this.prisma.report.groupBy({
        by: ['bulan', 'tahun'],
        where,
        _count: true,
        orderBy: {
          tahun: 'desc',
        },
        take: 12,
      }),
    ]);

    return {
      total,
      byStatus,
      byMonth,
    };
  }
}
