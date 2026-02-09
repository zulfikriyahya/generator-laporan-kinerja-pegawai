import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    example: 'gemini',
    enum: ['gemini', 'claude', 'gpt', 'groq', 'deepseek', 'together'],
    description: 'AI model to use for generation',
  })
  @IsEnum(['gemini', 'claude', 'gpt', 'groq', 'deepseek', 'together'])
  modelAI: string;

  @ApiProperty({
    example: 1,
    minimum: 1,
    maximum: 12,
    description: 'Month of the report (1-12)',
  })
  @IsNumber()
  @Min(1)
  @Max(12)
  bulan: number;

  @ApiProperty({
    example: 2025,
    description: 'Year of the report',
  })
  @IsNumber()
  tahun: number;

  @ApiProperty({
    example:
      'Merencanakan dan melaksanakan pembelajaran, mengevaluasi dan menilai hasil pembelajaran',
    description: 'Main duties description for AI context',
  })
  @IsString()
  tugasPokok: string;

  @ApiProperty({
    example: 'Wali Kelas VII-A, Anggota Tim Penjamin Mutu, Piket Harian',
    description: 'Additional duties (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  tugasTambahan?: string;

  @ApiProperty({
    example: 'Meningkatkan nilai rata-rata kelas menjadi 80, Lulus 100%',
    description: 'Annual performance targets',
    required: false,
  })
  @IsOptional()
  @IsString()
  targetTahunan?: string;

  @ApiProperty({
    example: 'Sarana prasarana multimedia terbatas, koneksi internet lambat',
    description: 'Obstacles encountered during the month',
    required: false,
  })
  @IsOptional()
  @IsString()
  hambatan?: string;

  @ApiProperty({
    example: 'Menggunakan media pembelajaran sederhana, tethering hotspot pribadi',
    description: 'Solutions applied to obstacles',
    required: false,
  })
  @IsOptional()
  @IsString()
  solusi?: string;

  @ApiProperty({
    example: 2000,
    default: 2000,
    minimum: 500,
    maximum: 8000,
    description: 'Max tokens for AI generation',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(500)
  @Max(8000)
  tokenLimit?: number;

  @ApiProperty({
    example: 'Fokuskan pada kegiatan remedial dan pengayaan',
    description: 'Additional custom instruction for AI',
    required: false,
  })
  @IsOptional()
  @IsString()
  customInstruction?: string;
}

export class UpdateReportDto {
  @ApiProperty({
    example: '# Laporan Kinerja\n\n...',
    description: 'Markdown content of the report',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    required: false,
    enum: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'ARCHIVED'],
    example: 'SUBMITTED',
  })
  @IsOptional()
  @IsEnum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'ARCHIVED'])
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tugasPokok?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tugasTambahan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  targetTahunan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hambatan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  solusi?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  metadata?: any;
}
