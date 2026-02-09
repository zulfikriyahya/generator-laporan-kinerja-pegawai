import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsInt,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

enum Gender {
  L = 'L',
  P = 'P',
}

enum JenisPegawai {
  PNS = 'PNS',
  PPPK = 'PPPK',
  HONORER = 'HONORER',
  GTT = 'GTT',
  PTT = 'PTT',
  GURU = 'GURU',
}

enum StatusPegawai {
  AKTIF = 'AKTIF',
  CUTI = 'CUTI',
  TUGAS_BELAJAR = 'TUGAS_BELAJAR',
  NON_AKTIF = 'NON_AKTIF',
}

export class CreatePegawaiDto {
  @ApiProperty({
    example: '198501012010011001',
    description: '18 digit NIP',
    minLength: 18,
    maxLength: 18,
  })
  @IsString()
  @MinLength(18)
  @MaxLength(18)
  nip: string;

  @ApiProperty({
    example: '1234567890123456',
    description: '16 digit NUPTK (Optional)',
    required: false,
    minLength: 16,
    maxLength: 16,
  })
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  nuptk?: string;

  @ApiProperty({
    example: '3601010101900001',
    description: '16 digit NIK (Optional)',
    required: false,
    minLength: 16,
    maxLength: 16,
  })
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  nik?: string;

  @ApiProperty({
    example: 'Ahmad Dahlan, S.Pd',
    description: 'Full name with academic titles',
  })
  @IsString()
  nama: string;

  @ApiProperty({
    example: 'Pandeglang',
    description: 'Place of birth',
    required: false,
  })
  @IsOptional()
  @IsString()
  tempatLahir?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth (YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  tanggalLahir?: string;

  @ApiProperty({
    example: 'L',
    enum: Gender,
    description: 'Gender (L=Male, P=Female)',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    example: 'PNS',
    enum: JenisPegawai,
    description: 'Employment type',
  })
  @IsEnum(JenisPegawai)
  jenisPegawai: JenisPegawai;

  @ApiProperty({
    example: 'AKTIF',
    enum: StatusPegawai,
    description: 'Employment status',
    default: 'AKTIF',
    required: false,
  })
  @IsOptional()
  @IsEnum(StatusPegawai)
  statusPegawai?: StatusPegawai;

  @ApiProperty({
    example: 'III/a',
    description: 'Rank/Golongan (Optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  golongan?: string;

  @ApiProperty({
    example: 'Guru Ahli Pertama',
    description: 'Official position title',
  })
  @IsString()
  jabatan: string;

  @ApiProperty({
    example: 'MTsN 1 Pandeglang',
    description: 'Work unit name',
  })
  @IsString()
  unitKerja: string;

  @ApiProperty({
    example: 'Jl. Raya Labuan Km 10 Pandeglang',
    description: 'Residential address',
    required: false,
  })
  @IsOptional()
  @IsString()
  alamat?: string;

  @ApiProperty({
    example: '081234567890',
    description: 'Mobile phone number',
    required: false,
  })
  @IsOptional()
  @IsString()
  hp?: string;

  @ApiProperty({
    example: 'ahmad.dahlan@gmail.com',
    description: 'Personal email address',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'S1 Pendidikan Matematika',
    description: 'Last education',
    required: false,
  })
  @IsOptional()
  @IsString()
  pendidikan?: string;

  @ApiProperty({
    example: 5,
    description: 'Years of service',
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  masaKerjaTahun?: number;

  @ApiProperty({
    example: 6,
    description: 'Months of service',
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  masaKerjaBulan?: number;

  @ApiProperty({
    example: 'base64_encoded_image...',
    description: 'Profile photo',
    required: false,
  })
  @IsOptional()
  @IsString()
  fotoPegawai?: string;
}

export class UpdatePegawaiDto {
  @ApiProperty({ required: false, example: '198501012010011001' })
  @IsOptional()
  @IsString()
  @MinLength(18)
  @MaxLength(18)
  nip?: string;

  @ApiProperty({ required: false, example: '1234567890123456' })
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  nuptk?: string;

  @ApiProperty({ required: false, example: '3601010101900001' })
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  nik?: string;

  @ApiProperty({ required: false, example: 'Ahmad Dahlan' })
  @IsOptional()
  @IsString()
  nama?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tempatLahir?: string;

  @ApiProperty({ required: false, example: '1990-01-01' })
  @IsOptional()
  @IsDateString()
  tanggalLahir?: string;

  @ApiProperty({ required: false, enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ required: false, enum: JenisPegawai })
  @IsOptional()
  @IsEnum(JenisPegawai)
  jenisPegawai?: JenisPegawai;

  @ApiProperty({ required: false, enum: StatusPegawai })
  @IsOptional()
  @IsEnum(StatusPegawai)
  statusPegawai?: StatusPegawai;

  @ApiProperty({ required: false, example: 'III/a' })
  @IsOptional()
  @IsString()
  golongan?: string;

  @ApiProperty({ required: false, example: 'Guru Madya' })
  @IsOptional()
  @IsString()
  jabatan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  unitKerja?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  alamat?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hp?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  pendidikan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  masaKerjaTahun?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  masaKerjaBulan?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fotoPegawai?: string;
}
