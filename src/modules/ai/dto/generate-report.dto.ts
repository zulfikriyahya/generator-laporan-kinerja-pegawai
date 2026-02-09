import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class PegawaiDataDto {
  @ApiProperty()
  @IsString()
  nama: string;

  @ApiProperty()
  @IsString()
  nip: string;

  @ApiProperty()
  @IsString()
  jabatan: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  golongan?: string;

  @ApiProperty()
  @IsString()
  unitKerja: string;

  @ApiProperty()
  @IsString()
  jenisPegawai: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  masaKerjaTahun?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  masaKerjaBulan?: number;
}

class AkademikDataDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  kurikulum?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tahunPelajaran?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  semester?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mapel?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  kelas?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  jamMengajar?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  jumlahSiswa?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ekskul?: string;
}

class KinerjaDataDto {
  @ApiProperty()
  @IsString()
  tugasPokok: string;

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
}

export class GenerateReportDto {
  @ApiProperty({
    example: 'gemini',
    enum: ['gemini', 'claude', 'gpt', 'groq', 'deepseek', 'together'],
    description: 'AI model to use for generation',
  })
  @IsEnum(['gemini', 'claude', 'gpt', 'groq', 'deepseek', 'together'])
  model: string;

  @ApiProperty({ example: 1, minimum: 1, maximum: 12 })
  @IsNumber()
  @Min(1)
  @Max(12)
  bulan: number;

  @ApiProperty({ example: 2025 })
  @IsNumber()
  tahun: number;

  @ApiProperty({ type: PegawaiDataDto })
  @ValidateNested()
  @Type(() => PegawaiDataDto)
  pegawai: PegawaiDataDto;

  @ApiProperty({ type: KinerjaDataDto })
  @ValidateNested()
  @Type(() => KinerjaDataDto)
  kinerja: KinerjaDataDto;

  @ApiProperty({ type: AkademikDataDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AkademikDataDto)
  akademik?: AkademikDataDto;

  @ApiProperty({ example: 2000, default: 2000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(500)
  @Max(8000)
  maxTokens?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customInstruction?: string;
}
