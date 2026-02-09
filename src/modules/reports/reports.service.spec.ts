import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { DeepMockProxy } from 'jest-mock-extended';
// Gunakan relative path ke folder test root
import { createMockContext } from '../../../test/prisma.mock';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ReportsService', () => {
  let service: ReportsService;
  let prismaMock: DeepMockProxy<PrismaService>;
  let aiServiceMock: Partial<AiService>;

  beforeEach(async () => {
    // Setup Mock Prisma
    const mockContext = createMockContext();
    prismaMock = mockContext.prisma as unknown as DeepMockProxy<PrismaService>;

    // Setup Mock AI Service
    aiServiceMock = {
      generateReport: jest.fn().mockResolvedValue({
        success: true,
        content: '# Laporan Kinerja\n\nIsi laporan...',
        tokensUsed: 100,
        model: 'gpt-mock',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: AiService, useValue: aiServiceMock },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateReport', () => {
    const userId = 'user-123';
    const dto = {
      modelAI: 'gpt',
      bulan: 1,
      tahun: 2025,
      tugasPokok: 'Mengajar',
      tokenLimit: 1000,
    };

    it('should generate report successfully', async () => {
      // 1. Mock Data Pegawai
      prismaMock.pegawai.findUnique.mockResolvedValue({
        id: 'pegawai-1',
        nama: 'Budi',
        userId: userId,
        // ... field lain
      } as any);

      // 2. Mock Data Instansi
      prismaMock.instansi.findFirst.mockResolvedValue({
        id: 'instansi-1',
        isActive: true,
      } as any);

      // 3. Mock Check Existing
      prismaMock.report.findFirst.mockResolvedValue(null);

      // 4. Mock Count untuk Nomor Dokumen
      prismaMock.report.count.mockResolvedValue(10);

      // 5. Mock Create Report
      prismaMock.report.create.mockResolvedValue({
        id: 'report-new',
        status: 'DRAFT',
        content: '# Laporan Kinerja\n\nIsi laporan...',
      } as any);

      const result = await service.generateReport(dto, userId);

      // EKSPEKTASI YANG BENAR: harus menyertakan include: { akademik: true }
      expect(prismaMock.pegawai.findUnique).toHaveBeenCalledWith({
        where: { userId },
        include: { akademik: true },
      });

      expect(aiServiceMock.generateReport).toHaveBeenCalled();
      expect(prismaMock.report.create).toHaveBeenCalled();
      expect(result.id).toEqual('report-new');
    });

    it('should throw error if pegawai not found', async () => {
      prismaMock.pegawai.findUnique.mockResolvedValue(null);

      await expect(service.generateReport(dto, userId)).rejects.toThrow(NotFoundException);
    });

    it('should throw error if report already exists', async () => {
      prismaMock.pegawai.findUnique.mockResolvedValue({ id: 'p1' } as any);
      prismaMock.instansi.findFirst.mockResolvedValue({ id: 'i1' } as any);

      // Simulasi report sudah ada
      prismaMock.report.findFirst.mockResolvedValue({ id: 'existing-report' } as any);

      await expect(service.generateReport(dto, userId)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return paginated reports', async () => {
      const mockReports = [{ id: 'r1' }, { id: 'r2' }];
      prismaMock.report.findMany.mockResolvedValue(mockReports as any);
      prismaMock.report.count.mockResolvedValue(2);

      const result = await service.findAll(1, 10);

      expect(result.data).toHaveLength(2);
      expect(result.meta.total).toBe(2);
      expect(prismaMock.report.findMany).toHaveBeenCalled();
    });
  });
});
